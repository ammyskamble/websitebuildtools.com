import { HreflangAlternate } from '../components/seo/SeoHead';

export type SupportedLanguage = 'en' | 'de' | 'fr' | 'pt' | 'es';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English (US)', flag: '🇺🇸', locale: 'en_US' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', locale: 'de_DE' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', locale: 'fr_FR' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português (BR)', flag: '🇧🇷', locale: 'pt_BR' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', locale: 'es_ES' },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function normalizeLang(langParam?: string): SupportedLanguage {
  if (!langParam) return DEFAULT_LANGUAGE;
  const clean = langParam.toLowerCase().slice(0, 2);
  const found = SUPPORTED_LANGUAGES.find((l) => l.code === clean);
  return found ? found.code : DEFAULT_LANGUAGE;
}

export function getHreflangAlternates(slug: string): HreflangAlternate[] {
  const cleanSlug = slug.startsWith('/') ? slug.slice(1) : slug;
  
  const alternates: HreflangAlternate[] = [
    { lang: 'en', url: `https://svgfav.com/${cleanSlug}` },
    { lang: 'de', url: `https://svgfav.com/de/${cleanSlug}` },
    { lang: 'fr', url: `https://svgfav.com/fr/${cleanSlug}` },
    { lang: 'pt', url: `https://svgfav.com/pt/${cleanSlug}` },
    { lang: 'es', url: `https://svgfav.com/es/${cleanSlug}` },
    { lang: 'x-default', url: `https://svgfav.com/${cleanSlug}` },
  ];

  return alternates;
}

export function getCanonicalUrl(slug: string, currentLang: SupportedLanguage): string {
  const cleanSlug = slug.startsWith('/') ? slug.slice(1) : slug;
  if (currentLang === 'en') {
    return `https://svgfav.com/${cleanSlug}`;
  }
  return `https://svgfav.com/${currentLang}/${cleanSlug}`;
}
