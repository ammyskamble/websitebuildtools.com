import React from 'react';
import { GeminiStudio } from '../components/gemini/GeminiStudio';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';

export const GeminiStudioPage: React.FC = () => {
  const geminiFaqs = [
    {
      question: 'How does Google Gemini generate scalable SVG vectors and favicons?',
      answer:
        'VectorForge prompts Google Gemini models (Gemini 2.5 Flash, 2.0 Flash, or 1.5 Flash) with strict vector design constraints. Gemini constructs clean, high-contrast, scalable XML <svg> tags with coordinate geometry, gradients, and shapes tailored for crisp rendering at tiny 16x16 favicon sizes as well as ultra-high 4K resolutions.',
    },
    {
      question: 'Can I import and convert HTML + CSS or Canvas JavaScript graphics into SVG and Favicons?',
      answer:
        'Yes! The Code Importer tab allows you to paste raw SVG, modern HTML + CSS badges/art, or JavaScript/Java-style HTML5 Canvas 2D scripts. VectorForge automatically detects the language, renders it in a sandboxed GPU canvas, and enables 1-click export to clean vector SVG, multi-resolution PNG, or multi-size Windows .ico files.',
    },
    {
      question: 'Is my Google Gemini API key and artwork kept private?',
      answer:
        'Absolutely. VectorForge operates 100% client-side in your browser. Your Gemini API key is stored strictly in your local browser localStorage and requests are dispatched directly from your browser to Google API endpoints. Your images, code, and keys are never sent to any intermediary server.',
    },
    {
      question: 'How do I obtain a free Google Gemini API key?',
      answer:
        'Visit Google AI Studio at aistudio.google.com, sign in with your Google account, click "Create API key", and paste it into the Gemini Studio. The free tier gives you ample requests per minute to design all your icons, logos, and favicons.',
    },
    {
      question: 'What files are included in the Favicon Pack ZIP download?',
      answer:
        'The one-click Favicon Pack bundles a multi-resolution favicon.ico (16x16, 32x32, 48x48), a modern vector favicon.svg, an apple-touch-icon.png (180x180), android-chrome-192x192.png, android-chrome-512x512.png, and a valid site.webmanifest JSON file.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Interactive Studio */}
      <GeminiStudio />

      {/* Educational Guide Section */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block mb-2">
            AI Vector & Code Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How to generate, import, and convert code to production assets
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Transform natural language ideas or code snippets into production-ready web assets in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="font-bold text-white text-base">Prompt or Paste Code</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Describe your desired emblem or paste existing code (SVG markup, HTML+CSS components, or Canvas JS scripts).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-white text-base">Live Sandbox Preview</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Inspect your visual in real-time across dark, light, and transparent backgrounds. Verify sharpness and colors.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-white text-base">Export SVG, PNG & Favicon</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Download clean vector SVG, multi-resolution PNGs up to 2048px, or full production favicon packages (.ico + ZIP).
            </p>
          </div>
        </div>
      </section>

      {/* Format Comparison */}
      <ComparisonTable />

      {/* FAQs */}
      <FaqAccordion
        title="Google Gemini AI & Code Importer FAQs"
        description="Frequently asked questions about generating SVG vectors, importing HTML/CSS/Canvas code, and exporting favicons."
        items={geminiFaqs}
      />
    </div>
  );
};
