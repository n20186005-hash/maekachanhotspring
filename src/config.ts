/**
 * Canonical site URL.
 *
 * `import.meta.env` is used rather than `process.env` because this module is
 * bundled by Vite (prerendered pages plus the Cloudflare Worker that serves the
 * weather API) where `process` does not exist. At build time Astro/Vite inlines
 * `CURRENT_SITE_DOMAIN` from the environment, so both the static HTML and the
 * runtime endpoint resolve the same base URL.
 */
const envDomain =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.CURRENT_SITE_DOMAIN
    : undefined;

export const siteConfig = {
  name: 'Mae Kachan Hot Spring',
  baseUrl: envDomain ? `https://${envDomain}` : 'https://maekachanhotspring.com',
  slug: 'mae-kachan-hot-spring',
  // All "View on Google Maps" links across the site point here.
  mapsUrl: 'https://maps.app.goo.gl/2yLL4BbfEtDcbof77',
  locales: ['zh', 'en', 'th'] as const,
};

/**
 * Single source of truth for the attraction entity (SEO entity binding).
 * All structured data / meta tags / semantic copy read from here so that the
 * place name, geo coordinates and ratings stay consistent across the site.
 *
 * Values mirror the latest Google Maps listing for the attraction.
 */
export const attraction = {
  fullName: 'Mae Kachan Hot Spring',
  shortName: 'Mae Kachan Hot Spring',
  localName: 'น้ำพุร้อนแม่ขะจาน',
  city: 'Chiang Rai',
  province: 'Chiang Rai Province',
  country: 'Thailand',
  countryCode: 'TH',
  postalCode: '57260',
  streetAddress: 'Moo 6, Pha Soet Phatthana Village, Doi Hang',
  plusCode: '4F76+WV Mae Chedi Mai, Wiang Pa Pao District, Chiang Rai',
  latitude: 19.1138,
  longitude: 99.4613,
  // Latest Google Maps rating snapshot.
  ratingValue: '4.0',
  reviewCount: '11,345',
  reviewCountRaw: '11345',
  ratingSourceName: 'Google Maps',
  ratingUpdated: '2026-09',
  // Primary visual asset, also used as the OG / JSON-LD image node.
  galleryImage: '/gallery/mae-kachan-hot-spring-1.jpg',
  heroImage: '/gallery/mae-kachan-hot-spring-1.jpg',
  // Authoritative .go.th / .org references used for E-E-A-T signalling.
  govtTourismUrl: 'https://www.tourismthailand.org/',
  nationalParksUrl: 'https://park.dnp.go.th/',
  chiangRaiUrl: 'http://www.chiangrai.go.th/',
  sameAs: [
    'https://maps.app.goo.gl/2yLL4BbfEtDcbof77',
    'https://www.tourismthailand.org/',
  ],
};

/** Locale-aware Google Maps embed source (iframe src). */
export function mapsEmbedSrc(lang: string): string {
  return `https://www.google.com/maps?q=${attraction.latitude},${attraction.longitude}&hl=${lang}&z=15&output=embed`;
}

export const ogLocale: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  th: 'th_TH',
};
