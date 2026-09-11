import React from 'react';
import { SvgOptimizer } from '../components/optimizer/SvgOptimizer';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';

export const SvgOptimizerPage: React.FC = () => {
  const faqs = [
    {
      question: 'Why do SVGs exported from Figma, Illustrator, or Inkscape have so much bloat?',
      answer:
        'Design software includes heavy metadata, creator tags, custom editor namespaces (e.g., xmlns:inkscape, xmlns:sodipodi), non-standard attributes, and excessive floating point decimal precision (e.g. 14 decimal digits). VectorForge cleans this bloat safely while preserving visual fidelity.',
    },
    {
      question: 'How does SVG optimization improve Google Lighthouse and Core Web Vitals?',
      answer:
        'Inline SVGs and hero vector graphics block DOM parsing if oversized. By stripping 40-70% of unnecessary markup and rounding path coordinates, you reduce Largest Contentful Paint (LCP) and Total Blocking Time (TBT), directly boosting your SEO score.',
    },
    {
      question: 'Does rounding coordinate precision degrade the vector appearance?',
      answer:
        'No. 2 decimal places provides sub-pixel accuracy far sharper than human perception on standard 4K displays. Reducing 10+ trailing decimals on thousands of path coordinates yields enormous byte savings without any visual difference.',
    },
    {
      question: 'Can I format and pretty-print the SVG code before copying?',
      answer:
        'Yes! In the Code Editor tab, click "Format / Prettify" to inspect human-readable indented XML, or switch to "Minified View" for production-ready single-line code.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Optimizer Tool */}
      <SvgOptimizer />

      {/* SEO Educational Section */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-violet-400 uppercase tracking-wider block mb-2">
            Performance Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why clean, optimized vector code matters for modern websites
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            SVGs are XML code delivered over the wire. Unoptimized SVGs waste bandwidth, increase parse times, and degrade page load performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="font-bold text-white text-base">Metadata & Comments</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Design tools embed redundant software timestamps, author names, and XML schemas that serve zero purpose in web production.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-white text-base">Coordinate Precision</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Rounding floating point decimals from 12 digits down to 2 retains microscopic pixel accuracy while shaving off thousands of bytes.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-white text-base">Zero Hidden Layers</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Hidden layers with <code className="text-slate-200">display="none"</code> still consume browser parse cycles. VectorForge cleans them automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <ComparisonTable />

      {/* FAQs */}
      <FaqAccordion
        title="SVG Optimization & Minification FAQs"
        description="Learn how client-side vector minification works and why it outperforms traditional server optimizers."
        items={faqs}
      />
    </div>
  );
};
