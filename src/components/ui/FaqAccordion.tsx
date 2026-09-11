import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  description?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  description = 'Everything you need to know about vector processing, favicon generation, and browser compatibility.'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Technical FAQ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">{description}</p>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-xl overflow-hidden border border-dark-border transition-all duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-dark-hover/40 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-200">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-brand-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-dark-border/40 animate-in fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
