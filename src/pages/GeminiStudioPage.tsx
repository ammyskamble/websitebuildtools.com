import React from 'react';
import { GeminiStudio } from '../components/gemini/GeminiStudio';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export type GeminiLandingVariant =
  | 'default'
  | 'ai-svg'
  | 'html-to-svg'
  | 'css-to-svg'
  | 'canvas-to-svg'
  | 'svg-to-favicon';

interface GeminiStudioPageProps {
  variant?: GeminiLandingVariant;
}

export const GeminiStudioPage: React.FC<GeminiStudioPageProps> = ({ variant = 'default' }) => {
  const variantConfigs: Record<
    GeminiLandingVariant,
    {
      pageTitle: string;
      metaDescription: string;
      pageH1: string;
      pageBadge: string;
      pageSubtitle: string;
      breadcrumbs: { name: string; path?: string }[];
      initialTab: 'ai' | 'importer';
      initialCodeType?: 'svg' | 'html-css' | 'canvas-js';
      initialPrompt?: string;
    }
  > = {
    default: {
      pageTitle: 'Free AI SVG Generator & Code to Vector Studio | VectorForge',
      metaDescription:
        'Generate clean SVG vectors from natural language text prompts with AI or convert HTML, CSS, and Canvas JavaScript code into scalable SVG and multi-resolution favicons. 100% free & client-side.',
      pageH1: 'Free AI SVG Generator & Multi-Format Code to Vector Studio',
      pageBadge: 'Google Gemini AI & Code Importer Engine',
      pageSubtitle:
        'Generate clean SVG vectors from natural language text prompts with AI or convert HTML, CSS, and Canvas JavaScript code into scalable SVG and multi-resolution favicons. 100% free & client-side.',
      breadcrumbs: [{ name: 'Tools', path: '/tools/logo-maker' }, { name: 'AI Vector Studio' }],
      initialTab: 'ai',
    },
    'ai-svg': {
      pageTitle: 'Free AI SVG Generator — Text to Vector AI Online | VectorForge',
      metaDescription:
        'Create infinite-resolution vector graphics from simple text prompts with AI. 100% free, in-browser SVG generator powered by Google Gemini with instant download.',
      pageH1: 'Free AI SVG Generator — Text to Vector AI Online',
      pageBadge: 'Text to Vector AI Engine',
      pageSubtitle:
        'Describe any icon, mascot, logo, or geometric shape in natural language and watch Google Gemini construct scalable, production-ready vector SVG code in seconds.',
      breadcrumbs: [{ name: 'AI Tools', path: '/tools/gemini-ai' }, { name: 'AI SVG Generator' }],
      initialTab: 'ai',
      initialPrompt: 'A modern cybernetic origami dragon emblem, vibrant gradient wings, clean geometric vector lines, transparent background',
    },
    'html-to-svg': {
      pageTitle: 'Convert HTML to SVG Vector Free (In-Browser GPU Canvas) | VectorForge',
      metaDescription:
        'Convert HTML components, cards, and web markup directly into crisp SVG vectors and high-DPI PNGs. 100% client-side, zero server uploads, instant and secure.',
      pageH1: 'Convert HTML to SVG Vector Free Online',
      pageBadge: 'HTML to Vector Importer',
      pageSubtitle:
        'Paste standard HTML markup and inline styles to instantly rasterize and export as infinite-resolution SVG vectors, high-DPI PNGs, and Windows .ico favicons.',
      breadcrumbs: [{ name: 'Converters', path: '/convert' }, { name: 'HTML to SVG' }],
      initialTab: 'importer',
      initialCodeType: 'html-css',
    },
    'css-to-svg': {
      pageTitle: 'Convert CSS to SVG Vector (Badges, Buttons & Gradients) | VectorForge',
      metaDescription:
        'Convert modern CSS badges, styled cards, neon buttons, and complex gradients into scalable SVG vectors and icons. 100% client-side with instant preview.',
      pageH1: 'Convert CSS to SVG Vector Online',
      pageBadge: 'CSS to Vector Importer',
      pageSubtitle:
        'Transform modern CSS3 UI components, glassmorphism cards, and gradient badges into standalone SVG vector assets without third-party design tools.',
      breadcrumbs: [{ name: 'Converters', path: '/convert' }, { name: 'CSS to SVG' }],
      initialTab: 'importer',
      initialCodeType: 'html-css',
    },
    'canvas-to-svg': {
      pageTitle: 'Convert HTML5 Canvas JavaScript to SVG Vector | VectorForge',
      metaDescription:
        'Convert HTML5 Canvas 2D scripts and generative procedural artwork into clean, infinite-resolution SVG vectors. 100% in-browser with real-time sandbox.',
      pageH1: 'Convert HTML5 Canvas JavaScript to SVG Vector',
      pageBadge: 'Canvas 2D Vectorizer',
      pageSubtitle:
        'Execute HTML5 Canvas 2D rendering scripts client-side in a sandboxed viewport and export mathematical procedural designs directly to SVG vectors.',
      breadcrumbs: [{ name: 'Converters', path: '/convert' }, { name: 'Canvas to SVG' }],
      initialTab: 'importer',
      initialCodeType: 'canvas-js',
    },
    'svg-to-favicon': {
      pageTitle: 'SVG to Favicon Pack Generator (Multi-DPI .ICO, iOS & Android PWA) | VectorForge',
      metaDescription:
        'Turn any SVG into a complete production favicon package with multi-resolution .ico (16x16, 32x32, 48x48), Apple Touch 180px, Android Chrome PWA icons, and web manifest.',
      pageH1: 'SVG to Favicon Pack Generator (Production Suite)',
      pageBadge: 'Multi-DPI Favicon Pack Engine',
      pageSubtitle:
        '1-Click automated production favicon bundle generator. Generates Windows binary .ico, iOS Apple Touch icons, Android PWA manifests, and ready-to-paste HTML tags.',
      breadcrumbs: [{ name: 'Tools', path: '/tools/favicon-generator' }, { name: 'Favicon Pack Generator' }],
      initialTab: 'ai',
      initialPrompt: 'A sleek modern geometric tech logo symbol with vibrant cyan and violet gradients, optimized for 32x32 favicon readability',
    },
  };

  const currentConfig = variantConfigs[variant] || variantConfigs.default;

  const geminiFaqs = [
    {
      question: 'How does Google Gemini generate scalable SVG vectors and favicons?',
      answer:
        'VectorForge prompts Google Gemini models (Gemini 3.6 Flash, 3.8 Flash, or 3.5 Flash) with strict vector design constraints. Gemini constructs clean, high-contrast, scalable XML <svg> tags with coordinate geometry, gradients, and shapes tailored for crisp rendering at tiny 16x16 favicon sizes as well as ultra-high 4K resolutions.',
    },
    {
      question: 'Can I convert HTML + CSS or Canvas JavaScript graphics into SVG and Favicons?',
      answer:
        'Yes! The Code Importer tab allows you to paste raw SVG, modern HTML + CSS badges/art, or JavaScript HTML5 Canvas 2D scripts. VectorForge automatically detects the language, renders it in a sandboxed GPU canvas, and enables 1-click export to clean vector SVG, multi-resolution PNG, or multi-size Windows .ico files.',
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

  const howToSteps = [
    {
      name: 'Prompt or Paste Code',
      text: 'Describe your desired emblem in natural language or paste existing code (SVG markup, HTML+CSS components, or Canvas JS scripts).',
    },
    {
      name: 'Live Sandbox Preview',
      text: 'Inspect your visual in real-time across dark, light, and transparent backgrounds. Verify sharpness, colors, and responsive scalability.',
    },
    {
      name: 'Export SVG, PNG & Favicon',
      text: 'Download clean vector SVG, multi-resolution PNGs up to 2048px, or full production favicon packages (.ico + ZIP).',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Dynamic SEO Head & Structured Data Schemas */}
      <SeoHead
        title={currentConfig.pageTitle}
        description={currentConfig.metaDescription}
        breadcrumbs={currentConfig.breadcrumbs.map((b) => ({
          name: b.name,
          url: b.path || window.location.pathname,
        }))}
        faqs={geminiFaqs}
        howTo={{
          name: currentConfig.pageH1,
          description: currentConfig.pageSubtitle,
          steps: howToSteps,
        }}
        softwareApp={{
          name: currentConfig.pageH1,
          description: currentConfig.metaDescription,
          applicationCategory: 'DesignApplication',
          operatingSystem: 'All',
          price: '0',
          ratingValue: '4.9',
          reviewCount: '1540',
        }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={currentConfig.breadcrumbs} />

      {/* Interactive Studio */}
      <GeminiStudio
        initialTab={currentConfig.initialTab}
        initialCodeType={currentConfig.initialCodeType}
        initialPrompt={currentConfig.initialPrompt}
        pageBadge={currentConfig.pageBadge}
        pageH1={currentConfig.pageH1}
        pageSubtitle={currentConfig.pageSubtitle}
      />

      {/* Educational Guide Section / HowTo Pipeline */}
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
            <h3 className="font-bold text-white text-base">1. Prompt or Paste Code</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Describe your desired emblem or paste existing code (SVG markup, HTML+CSS components, or Canvas JS scripts).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-white text-base">2. Live Sandbox Preview</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Inspect your visual in real-time across dark, light, and transparent backgrounds. Verify sharpness and colors.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-white text-base">3. Export SVG, PNG & Favicon</h3>
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

