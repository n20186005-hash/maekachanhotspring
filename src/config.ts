export const siteConfig = {
  name: 'Mae Kachan Hot Spring',
  baseUrl: (typeof process !== 'undefined' && process.env.CURRENT_SITE_DOMAIN) 
    ? `https://${process.env.CURRENT_SITE_DOMAIN}` 
    // @ts-ignore
    : (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.CURRENT_SITE_DOMAIN) 
      // @ts-ignore
      ? `https://${import.meta.env.CURRENT_SITE_DOMAIN}` 
      : 'https://maekachanhotspring.com',
  slug: 'mae-kachan-hot-spring',
  // All "View on Google Maps" links across the site point here.
  mapsUrl: 'https://maps.app.goo.gl/ZZikK9mrpPbkWhWP8',
  locales: ['zh', 'en', 'th'] as const,
};

export const ogLocale: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  th: 'th_TH',
};
