export const siteConfig = {
  name: 'Mae Kachan Hot Spring',
  baseUrl: 'https://maekachanhotspring.com',
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
