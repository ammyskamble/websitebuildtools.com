import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Layers, Wand2, Terminal, Calculator, FileCode } from 'lucide-react';
import { SeoFaqItem, SEO_FAQS } from '../../data/seoFaqs';

export interface LegacyFaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items?: (SeoFaqItem | LegacyFaqItem)[];
  title?: string;
  description?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items = SEO_FAQS,
  title = 'Frequently Asked Questions & Technical Specifications',
  description = 'Detailed answers, mathematical formulas, and step-by-step Adobe Photoshop & Illustrator guides for vectors, favicons, and image conversion.'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLang, setSelectedLang] = useState<string>('all');

  const filteredItems = items.filter((item) => {
    // Check if it's an extended SeoFaqItem
    const seoItem = item as SeoFaqItem;
    if (selectedCategory !== 'all' && seoItem.category && seoItem.category !== selectedCategory) {
      return false;
    }
    if (selectedLang !== 'all' && seoItem.language && seoItem.language !== selectedLang) {
      return false;
    }
    return true;
  });

  return (
    <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6" id="faq-section">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>SEO Knowledge & Technical FAQs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>

      {/* Filter Chips / Language & Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 rounded-2xl glass-card border border-dark-border">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">Topic:</span>
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'svg', label: 'SVG Standards' },
            { id: 'favicon', label: 'Favicon & ICO' },
            { id: 'converter', label: 'PNG to SVG' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-dark-hover/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Language Quick Filters */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">Language:</span>
          {[
            { id: 'all', label: 'All', flag: '🌐' },
            { id: 'en', label: 'EN', flag: '🇺🇸' },
            { id: 'pt', label: 'PT', flag: '🇧🇷' },
            { id: 'de', label: 'DE', flag: '🇩🇪' }
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-all ${
                selectedLang === lang.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-dark-hover/50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Semantic <details> and <summary> Accordions */}
      <div className="space-y-4">
        {filteredItems.map((item, idx) => {
          const seoItem = item as SeoFaqItem;
          const hasPhotoshop = Boolean(seoItem.photoshopSteps && seoItem.photoshopSteps.length > 0);
          const hasIllustrator = Boolean(seoItem.illustratorSteps && seoItem.illustratorSteps.length > 0);
          const hasFormula = Boolean(seoItem.mathFormula);
          const hasCode = Boolean(seoItem.codeSnippet);

          return (
            <details
              key={seoItem.id || `faq-${idx}`}
              className="group glass-card rounded-2xl border border-dark-border overflow-hidden transition-all duration-300 hover:border-brand-500/40 open:border-brand-500/50 open:bg-[#0c101c]/80"
              {...(idx === 0 ? { open: true } : {})}
            >
              {/* Semantic <summary> Header */}
              <summary className="list-none w-full cursor-pointer px-6 py-4 flex items-center justify-between gap-4 select-none hover:bg-dark-hover/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Category / Language Pill */}
                  {seoItem.language && (
                    <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {seoItem.language === 'pt' ? '🇧🇷 PT' : seoItem.language === 'de' ? '🇩🇪 DE' : '🇺🇸 EN'}
                    </span>
                  )}
                  <h3 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-brand-300 transition-colors truncate">
                    {item.question}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {(hasPhotoshop || hasIllustrator) && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
                      <Sparkles className="w-3 h-3" />
                      <span>Ps / Ai Guide</span>
                    </span>
                  )}
                  {hasFormula && (
                    <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <Calculator className="w-3 h-3" />
                      <span>Math Formula</span>
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 group-open:text-brand-400 transition-transform duration-200" />
                </div>
              </summary>

              {/* Collapsible Content */}
              <div className="px-6 pb-6 pt-2 border-t border-dark-border/40 text-xs sm:text-sm text-slate-300 space-y-5 animate-in fade-in">
                {/* Core Answer */}
                <p className="leading-relaxed text-slate-300 font-normal">
                  {item.answer}
                </p>

                {/* Mathematical Formula Callout */}
                {hasFormula && seoItem.mathFormula && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Mathematical Formulation: {seoItem.mathFormula.name}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20 font-mono text-xs sm:text-sm text-amber-200 overflow-x-auto whitespace-pre-wrap">
                      {seoItem.mathFormula.formula}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      {seoItem.mathFormula.explanation}
                    </p>
                  </div>
                )}

                {/* Adobe Software Step-by-Step Instructions */}
                {(hasPhotoshop || hasIllustrator) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Adobe Illustrator Card */}
                    {hasIllustrator && (
                      <div className="p-4 rounded-xl bg-[#1a0a03]/50 border border-amber-600/30 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold text-amber-400 text-xs">
                            <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px] border border-amber-500/30">
                              Ai
                            </span>
                            <span>Adobe Illustrator Workflow</span>
                          </span>
                          <span className="text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded">Vector Native</span>
                        </div>
                        <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 leading-relaxed">
                          {seoItem.illustratorSteps!.map((step, sIdx) => (
                            <li key={sIdx} className="text-slate-300">
                              <span className="text-slate-200">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Adobe Photoshop Card */}
                    {hasPhotoshop && (
                      <div className="p-4 rounded-xl bg-[#031528]/50 border border-blue-600/30 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold text-blue-400 text-xs">
                            <span className="w-5 h-5 rounded bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[10px] border border-blue-500/30">
                              Ps
                            </span>
                            <span>Adobe Photoshop Workflow</span>
                          </span>
                          <span className="text-[10px] text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded">Raster/Path Prep</span>
                        </div>
                        <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 leading-relaxed">
                          {seoItem.photoshopSteps!.map((step, sIdx) => (
                            <li key={sIdx} className="text-slate-300">
                              <span className="text-slate-200">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}

                {/* Code Snippet Box */}
                {hasCode && seoItem.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-dark-border bg-black/60">
                    <div className="px-4 py-2 bg-dark-card/60 border-b border-dark-border flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 font-mono text-brand-300">
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Ready-to-Paste HTML &lt;head&gt; / SVG Markup</span>
                      </span>
                      <span className="uppercase text-[10px] tracking-wider text-slate-500">
                        {seoItem.codeSnippet.language}
                      </span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{seoItem.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
};
