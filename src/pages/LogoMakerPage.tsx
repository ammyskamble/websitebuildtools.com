import { LogoStudio } from '../components/studio/LogoStudio';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const LogoMakerPage: React.FC = () => {
  const breadcrumbsList = [{ name: 'Tools', path: '/tools/logo-maker' }, { name: 'Logo & Icon Studio' }];
  const faqs = [
    {
      question: 'What is a squircle and why is it preferred for modern app icons?',
      answer:
        'A squircle is a mathematical superellipse curve that blends a square and a circle seamlessly without harsh corner tangency breaks. Popularized by Apple iOS and modern UI design systems, it creates a much softer and more organic silhouette than standard rounded corners.',
    },
    {
      question: 'Can I use custom SVG code or my own uploaded vector artwork?',
      answer:
        'Absolutely! In the icon browser modal, click "Upload SVG File" or paste raw XML markup. VectorForge preserves all path data, allowing you to combine your unique artwork with squircle backgrounds, gradient mesh glows, and high-DPI raster exports.',
    },
    {
      question: 'What resolution should I export for my website logo or mobile app?',
      answer:
        'For websites and web applications, export SVG for infinite DPI clarity and tiny byte size. For app stores, social media profile pictures, and splash screens, export PNG at 1024x1024 (2x) or 2048x2048 (4x) for crisp display on high-density Retina screens.',
    },
    {
      question: 'Is my logo copyright protected and free for commercial use?',
      answer:
        'Yes. All generated SVG files, canvas graphics, and export bundles are 100% yours with no licensing restrictions, watermarks, or attribution requirements. VectorForge is an open web utility running locally in your browser.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SeoHead
        title="Fast Logo & Icon Studio (SVG, High-DPI PNG & Astro) — VectorForge"
        description="Craft modern, high-contrast vector logos and brand icons with squircles, linear gradients, and 1-click export to SVG, 4K PNG, WebP, and Astro."
        breadcrumbs={breadcrumbsList.map((b) => ({
          name: b.name,
          url: b.path || window.location.pathname,
        }))}
        faqs={faqs}
        softwareApp={{
          name: 'VectorForge Logo Studio',
          description: 'Fast Logo & Icon Studio (100% Client-Side)',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'All',
          price: '0',
          ratingValue: '4.9',
          reviewCount: '1240',
        }}
      />

      <Breadcrumbs items={breadcrumbsList} />

      {/* Studio Tool */}
      <LogoStudio />

      {/* SEO Step-by-Step Guide */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block mb-2">
            Step-by-Step Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How to craft a modern vector logo in under 60 seconds
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Follow these best practices to create an iconic brand mark that scales flawlessly across favicons, app headers, and billboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="font-bold text-white text-base">Select Shape & Background</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Choose an iOS squircle, hexagon, or shield frame. Apply curated gradients like Hyper Blue or Cyberpunk, or use transparent alpha for header logos.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-white text-base">Pick an Icon or Monogram</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Search over 800+ categorized vector icons or upload your custom vector. Adjust scale, rotation, stroke width, and drop shadow elevation.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-border">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-white text-base">Export High-DPI Assets</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Download pure vector SVG for web code, or rasterize up to 4096px (8x Ultra-HD) PNGs. Send directly to Favicon Suite with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <ComparisonTable />

      {/* FAQs */}
      <FaqAccordion
        title="Logo Maker & Vector FAQs"
        description="Common technical questions on vector manipulation, resolution, and licensing."
        items={faqs}
      />
    </div>
  );
};
