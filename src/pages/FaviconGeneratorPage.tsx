import { FaviconSuite } from '../components/favicon/FaviconSuite';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const FaviconGeneratorPage: React.FC = () => {
  const breadcrumbsList = [{ name: 'Tools', path: '/favicon-generator' }, { name: 'Production Favicon Suite' }];
  const faqs = [
    {
      question: 'Why do I need both favicon.ico and favicon.svg?',
      answer:
        'Modern browsers (Chrome, Edge, Firefox, Safari) prioritize favicon.svg because it renders sharply at any screen scaling factor and supports CSS dark mode media queries (@media (prefers-color-scheme: dark)). However, favicon.ico remains essential for legacy browsers, desktop shortcuts, and RSS readers. SvgFav.com provides both in the ZIP pack.',
    },
    {
      question: 'What is the apple-touch-icon.png file for?',
      answer:
        'When an iPhone or iPad user taps "Add to Home Screen" in Safari, iOS looks for apple-touch-icon.png (180x180) to render a crisp app-like icon on their home screen. Without it, iOS displays a generic screenshot of your web page.',
    },
    {
      question: 'What is site.webmanifest and why does Google require it?',
      answer:
        'site.webmanifest is a standardized JSON manifest file describing your web application to mobile operating systems. It defines the app name, theme color, display mode (e.g. standalone), and points to the 192x192 and 512x512 PWA icons required for install prompts and Google Search indexing.',
    },
    {
      question: 'Where should I place the favicon files on my server or project?',
      answer:
        'Extract all files directly into the root directory of your website (e.g., /public for Next.js, Vite, or Astro, or the web root for WordPress/Nginx). Then paste the pre-generated <head> snippet into your index.html or base layout template.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SeoHead
        title="Web Favicon Generator: ICO, PNG & Apple Touch Icons — SvgFav"
        description="Generate all web, iOS, Android, and Windows icons in a single click with instant multi-platform live mockups and valid site.webmanifest."
        keywords="favicon generator, svg to ico"
        canonicalUrl="https://svgfav.com/favicon-generator"
        breadcrumbs={breadcrumbsList.map((b) => ({
          name: b.name,
          url: b.path || 'https://svgfav.com/favicon-generator',
        }))}
        faqs={faqs}
        softwareApp={{
          name: 'SvgFav.com Favicon Suite',
          description: 'Production Favicon & App Icon Suite (100% Client-Side)',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'All',
          price: '0',
          ratingValue: '4.9',
          reviewCount: '1890',
        }}
      />

      <Breadcrumbs items={breadcrumbsList} />

      {/* Page Heading for Programmatic SEO */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Browser Favicon &amp; App Icon Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Create production-ready multi-size favicon.ico binaries, 180x180 Apple Touch Icons, and valid site.webmanifest packages in a single click with zero server uploads.
        </p>
      </div>

      {/* Favicon Suite Tool */}
      <FaviconSuite />

      {/* SEO Implementation Guide */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
            Production Deployment Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How to set up production favicons for 100% browser compatibility
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Avoid common favicon caching bugs and broken icons by adhering to the modern HTML5 standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="font-bold text-white text-base">Generate Favicon Pack</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Design from scratch or drop an existing SVG. Verify appearance across Chrome tabs, Google SERP snippet, and iOS home screen simulators.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-white text-base">Extract into /public</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Download the ZIP pack and extract all 8 files (<code className="text-slate-200">favicon.ico</code>, <code className="text-slate-200">favicon.svg</code>, <code className="text-slate-200">manifest</code>) into your project public root.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-white text-base">Paste &lt;head&gt; HTML</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Copy the one-click code snippet and paste it between the <code className="text-brand-300">&lt;head&gt;</code> tags of your website. Deploy with zero cache issues.
            </p>
          </div>
        </div>
      </section>

      {/* Format Comparison */}
      <ComparisonTable />

      {/* FAQs */}
      <FaqAccordion
        title="Favicon & Web App Icon FAQs"
        description="Detailed answers to icon sizing, browser caching, and Google Search favicon indexing."
        items={faqs}
      />
    </div>
  );
};
