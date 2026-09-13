import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../lib/i18n';

interface LanguageSelectorProps {
  currentLang: SupportedLanguage;
  baseSlug: string; // e.g. "privacy-policy"
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, baseSlug }) => {
  const cleanSlug = baseSlug.startsWith('/') ? baseSlug.slice(1) : baseSlug;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-card border border-dark-border mb-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <span>Select Language / Region:</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = currentLang === lang.code;
          const targetPath = lang.code === 'en' ? `/${cleanSlug}` : `/${lang.code}/${cleanSlug}`;

          return (
            <Link
              key={lang.code}
              to={targetPath}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30 ring-1 ring-brand-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-dark-hover/60 border border-slate-200 dark:border-dark-border/40'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
