import zh from './zh.json';
import en from './en.json';
import th from './th.json';
import { siteConfig } from '../config';

export const defaultLang = 'th';
export const languagesList = ['th', 'zh', 'en'] as const;

/** Union of the site's supported locale codes, derived from `languagesList`. */
export type Lang = (typeof languagesList)[number];

export const languages: Record<string, string> = {
  zh: '中文',
  en: 'English',
  th: 'ไทย',
};

const ui: Record<string, any> = { zh, en, th };

export function getLangFromUrl(url: URL): string {
  const seg = url.pathname.split('/').filter(Boolean);
  const lang = seg[0];
  return (languagesList as readonly string[]).includes(lang) ? lang : defaultLang;
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  const messages = ui[lang];
  const t = (key: string): string => {
    const found = key
      .split('.')
      .reduce<any>((o, i) => (o == null ? undefined : o[i]), messages);
    return found ?? '';
  };
  return { lang, messages, t };
}

/**
 * Absolute URLs for one page in every locale.
 *
 * Astro builds directory-format output (`dist/th/index.html`), so the real
 * address of a page always carries a trailing slash. Emitting the slash-less
 * form here used to put `canonical`, `hreflang` and `og:url` in conflict with
 * the URL the host actually serves, which is what let `/th` and `/th/` (and
 * `/en/transport` and `/en/transport/`) both get indexed as separate pages.
 * Keep every variant slash-terminated so there is exactly one address per page.
 */
export function buildAlternates(path = ''): Record<string, string> {
  const base = siteConfig.baseUrl;
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const mk = (l: string) => `${base}/${l}/${clean ? clean + '/' : ''}`;
  return {
    zh: mk('zh'),
    en: mk('en'),
    th: mk('th'),
    xDefault: mk('th'),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  return lang;
}
