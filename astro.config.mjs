import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.CURRENT_SITE_DOMAIN
    ? `https://${process.env.CURRENT_SITE_DOMAIN}`
    : 'https://maekachanhotspring.com',
  // Pages stay prerendered; only the weather endpoint opts into on-demand
  // rendering via `export const prerender = false`, and the adapter builds the
  // Worker that serves it.
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'th',
    locales: ['zh', 'en', 'th'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
