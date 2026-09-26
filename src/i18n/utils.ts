import ko from '@/content/ui.ko.json';
import en from '@/content/ui.en.json';

export const languages = ['ko', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'ko';

const ui = { ko, en } as const;
export type UI = typeof ko;

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : defaultLang;
}

export function useTranslations(lang: Lang): UI {
  return ui[lang];
}

/** '/about' + 'en' → '/en/about' ; '/about' + 'ko' → '/about' */
export function localizePath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '');
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** Strip the language prefix: '/en/about/' → '/about/' */
export function stripLang(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

/** Same page in the other language. */
export function alternatePath(url: URL, target: Lang): string {
  return localizePath(stripLang(url.pathname), target);
}

/** Pick a {ko, en} field. */
export function pick<T>(value: { ko: T; en: T }, lang: Lang): T {
  return value[lang];
}
