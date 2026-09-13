/* Mae Kachan Hot Spring — service worker (PWA offline support) */
const VERSION = 'v1';
const STATIC_CACHE = `mk-static-${VERSION}`;
const RUNTIME_CACHE = `mk-runtime-${VERSION}`;
const OFFLINE_URL = '/offline.html';

const PRECACHE_URLS = [
  '/',
  '/th/',
  '/zh/',
  '/en/',
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: 'reload' })))
      );
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('mk-') && !key.endsWith(VERSION))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle same-origin requests; leave analytics/maps/fonts to the network.
  if (url.origin !== self.location.origin) return;

  // Navigations: network first, then cache, then the offline fallback page.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch (e) {
          const cached = await caches.match(request, { ignoreSearch: true });
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          return offline || Response.error();
        }
      })()
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(request);
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })()
  );
});
