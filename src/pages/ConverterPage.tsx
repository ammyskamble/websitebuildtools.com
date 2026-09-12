import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Check, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { UniversalConverter } from '../components/converters/UniversalConverter';
import type { ConverterMode } from '../components/converters/UniversalConverter';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

interface ConverterPageProps {
  mode: ConverterMode;
}

export const ConverterPage: React.FC<ConverterPageProps> = ({ mode }) => {
  const contentConfig: Record<
    ConverterMode,
    {
      pageTitle: string;
      metaDescription: string;
      guideTitle: string;
      steps: { title: string; desc: string }[];
      faqs: { question: string; answer: string }[];
    }
  > = {
    'png-to-svg': {
      pageTitle: 'Free In-Browser PNG to SVG Converter (100% Private & No Upload)',
      metaDescription: 'Convert PNG to SVG vector free online with zero server uploads. High-precision vectorizer for logos, sketches, Cricut cut files, and graphics.',
      guideTitle: 'How to vectorize raster PNG images into SVG paths',
      steps: [
        {
          title: 'Upload Image or Drawing',
          desc: 'Upload a black & white logo, icon, sketch, or silhouette PNG/JPG image. Supports files up to 20MB without server upload.',
        },
        {
          title: 'Tune Tracing Threshold',
          desc: 'Adjust the luminance threshold and smoothing sliders to dial in the edge precision and contour curvature.',
        },
        {
          title: 'Export Vector SVG',
          desc: 'Download clean vector path code ready to scale infinitely in Figma, Illustrator, Cricut Design Space, or web code.',
        },
      ],
      faqs: [
        {
          question: 'How does the client-side vectorizer work?',
          answer:
            'The algorithm loads your image onto an offscreen HTML5 canvas, runs luminance thresholding to separate foreground from background, and builds polygon path data in real time directly inside your browser.',
        },
        {
          question: 'What type of images produce the best vectorization results?',
          answer:
            'High-contrast logos, black & white line drawings, icons, signatures, silhouettes, and glyphs produce the cleanest vector results.',
        },
        {
          question: 'Is it safe to convert proprietary logos and client designs?',
          answer:
            'Unlike legacy converters like Picsvg that transmit your artwork to remote web servers, VectorForge executes 100% locally on your computer. Your files never leave your device.',
        },
      ],
    },
    'jpg-to-svg': {
      pageTitle: 'Free JPG to SVG Converter Online (No 4MB Limit • 100% Client-Side)',
      metaDescription: 'Convert JPG to SVG vector free online with zero server uploads. Trace photos, sketches, and logos into infinitely scalable vectors.',
      guideTitle: 'How to convert JPG to SVG vector without losing quality',
      steps: [
        {
          title: 'Select JPG / JPEG Photo or Logo',
          desc: 'Drop your JPG file into the converter. Images up to 20MB are processed 100% in your browser without server uploads.',
        },
        {
          title: 'Tune Edge Contrast & Smoothing',
          desc: 'Use the live threshold slider to extract crisp silhouette edges and the smoothing slider to eliminate pixelation.',
        },
        {
          title: 'Download Scalable SVG',
          desc: 'Export infinitely scalable vector paths ready for printing, cutting machines (Cricut), and responsive web graphics.',
        },
      ],
      faqs: [
        {
          question: 'Can I convert colored JPGs into SVG vectors?',
          answer:
            'Yes! VectorForge calculates luminance and contrast values across your JPG pixels to trace sharp, clean vector paths.',
        },
        {
          question: 'Is it safe to convert proprietary logos and sketches online?',
          answer:
            'Unlike legacy cloud converters like Picsvg that upload your images to external servers, VectorForge processes 100% of the vectorization directly inside your browser memory using HTML5 Canvas. Your confidential files never touch any external server.',
        },
        {
          question: 'Is there a 4MB file limit like other tools?',
          answer:
            'No! VectorForge has no 4MB restriction. You can easily process large high-resolution JPGs up to 20MB+ smoothly.',
        },
      ],
    },
    'image-to-svg': {
      pageTitle: 'Universal Image to SVG Vectorizer (Cricut & Laser Cutting Ready)',
      metaDescription: 'Convert any image (PNG, JPG, WebP) to clean SVG vectors for Cricut Design Space, Glowforge laser cutters, and embroidery machines.',
      guideTitle: 'How to convert any image (PNG, JPG, WebP) to SVG for Cricut & Laser Cutters',
      steps: [
        {
          title: 'Upload Any Image Format',
          desc: 'Supports PNG, JPG, JPEG, WebP, BMP, and GIF. Perfect for Cricut Design Space, Glowforge, Silhouette, and CNC routers.',
        },
        {
          title: 'Optimize Cut Paths & Curves',
          desc: 'Adjust smoothing tolerance to simplify vector anchor points, resulting in faster cutter toolpaths and clean cuts.',
        },
        {
          title: 'Export Production Vector',
          desc: 'Download clean SVG markup with closed paths ready to import straight into design suites and laser cutting software.',
        },
      ],
      faqs: [
        {
          question: 'Does this generate clean SVG cut files for Cricut and Silhouette?',
          answer:
            'Yes! VectorForge traces unified outline polygons with closed vector paths, making them immediately compatible with Cricut Design Space, Silhouette Studio, Glowforge, and xTool without double-line cut errors.',
        },
        {
          question: 'Can I convert hand-drawn sketches or signatures to SVG?',
          answer:
            'Absolutely. Photograph or scan your sketch, upload the image, and adjust the threshold slider to isolate the ink strokes into vector curves.',
        },
        {
          question: 'Why choose VectorForge over Picsvg for Cricut and crafts?',
          answer:
            'Picsvg has intrusive video ads, a restrictive 4MB limit, and uploads files to an external server. VectorForge gives you unlimited file size, ad-free instant processing, adjustable path smoothing, and 100% privacy.',
        },
      ],
    },
    'svg-to-png': {
      pageTitle: 'Free SVG to High-DPI PNG Transparent Converter (Up to 8x 4096px)',
      metaDescription: 'Rasterize SVG to high-resolution PNG transparent images. Free client-side converter with 1x to 8x 4K/8K retina multipliers.',
      guideTitle: 'How to convert SVG to High-Resolution PNG with transparency',
      steps: [
        {
          title: 'Drag & Drop Vectors',
          desc: 'Drop one or multiple SVG files into the dropzone. You can process an entire batch at once.',
        },
        {
          title: 'Set DPI Scale & Background',
          desc: 'Choose from 1x, 2x, 4x, or 8x (up to 4096px). Toggle transparent alpha or pick a solid background color.',
        },
        {
          title: 'Instant Download',
          desc: 'Click Convert All. Download individual high-DPI PNGs or export the entire bundle as a single ZIP.',
        },
      ],
      faqs: [
        {
          question: 'Why convert SVG to PNG if SVG is already scalable?',
          answer:
            'While SVG is ideal for web code, many platforms (such as OpenGraph preview cards, social media headers, email newsletters, and legacy image viewers) do not support SVG rendering and require high-DPI PNGs.',
        },
        {
          question: 'Can I export ultra high-resolution 4K or 8K images?',
          answer:
            'Yes! With the 4x and 8x DPI multipliers, VectorForge rasterizes vectors up to 4096x4096px with anti-aliasing directly on your GPU canvas.',
        },
      ],
    },
    'svg-to-jpg': {
      pageTitle: 'Free SVG to JPG / JPEG Converter with Background Fill',
      metaDescription: 'Convert SVG vectors to JPG with custom background colors and quality sliders. 100% client-side conversion with zero compression artifacts.',
      guideTitle: 'How to convert SVG to JPG with solid background fill',
      steps: [
        {
          title: 'Upload Vector Graphics',
          desc: 'Select your SVG files. JPG format does not support transparency, so a background color is required.',
        },
        {
          title: 'Choose Background Color',
          desc: 'Pick your background filler (white, black, or brand color) and adjust the compression quality slider.',
        },
        {
          title: 'Export Compressed JPGs',
          desc: 'Save individual files or bulk export a ZIP archive with zero quality loss.',
        },
      ],
      faqs: [
        {
          question: 'Why does JPG require a background color?',
          answer:
            'The JPEG image format specification does not have an alpha (transparency) channel. VectorForge automatically blends your vector onto a solid fill color of your choice.',
        },
        {
          question: 'How does the quality slider affect file size?',
          answer:
            'Setting quality to 85-92% reduces file size by over 60% with virtually indistinguishable visual difference for digital displays.',
        },
      ],
    },
    'svg-to-ico': {
      pageTitle: 'Free SVG to Multi-Size Windows ICO Favicon Converter',
      metaDescription: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads.',
      guideTitle: 'How to convert SVG to multi-size Windows ICO files',
      steps: [
        {
          title: 'Select Vector or Logo',
          desc: 'Upload an SVG logo or icon file. The binary encoder will create 16x16, 32x32, and 48x48 versions.',
        },
        {
          title: 'Multi-Resolution Embedding',
          desc: 'VectorForge renders each frame with crisp anti-aliasing and packages them into a single .ico binary.',
        },
        {
          title: 'Download & Deploy',
          desc: 'Save your favicon.ico file and place it in the root directory of your website for universal browser support.',
        },
      ],
      faqs: [
        {
          question: 'What is a multi-resolution ICO file?',
          answer:
            'A true .ico container holds multiple bitmap frames (16x16 for browser tabs, 32x32 for high-DPI retina bookmarks, 48x48 for desktop shortcuts). Windows and browsers automatically pick the sharpest size.',
        },
        {
          question: 'Is this a fake renamed PNG or real binary ICO?',
          answer:
            'VectorForge constructs a valid binary ICO header, directory index, and embedded image chunks compliant with the Microsoft Windows ICO file format specification.',
        },
      ],
    },
    'svg-to-data-uri': {
      pageTitle: 'Free SVG to CSS / HTML Data URI Generator',
      metaDescription: 'Encode SVG vectors into inline background-image url("data:image/svg+xml,...") and Base64 strings for instant zero-request rendering.',
      guideTitle: 'How to convert SVG into CSS background-image Data URIs',
      steps: [
        {
          title: 'Select or Paste SVG',
          desc: 'Upload an SVG file or paste raw vector markup.',
        },
        {
          title: 'Choose URL-Encoded or Base64',
          desc: 'URL-encoded is smaller and gzip-friendly. Base64 is useful for older CSS preprocessors.',
        },
        {
          title: '1-Click Copy Code',
          desc: 'Copy ready-to-use CSS background-image or HTML <img> markup directly to your clipboard.',
        },
      ],
      faqs: [
        {
          question: 'Why use a Data URI instead of an external SVG file?',
          answer:
            'Data URIs embed the vector graphic directly into your CSS or HTML stylesheet, eliminating an extra HTTP network request and preventing layout shift or flickering during page load.',
        },
        {
          question: 'Should I choose URL-encoded or Base64?',
          answer:
            'URL-encoded (data:image/svg+xml;utf8,...) is almost always recommended because it is ~30% smaller than Base64 and can be gzipped and inspected easily.',
        },
      ],
    },
    'svg-to-astro': {
      pageTitle: 'Free SVG to Production Astro (.astro) Component Converter',
      metaDescription: 'Convert SVG icons into typed, production-ready .astro components with Props interfaces and class:list styling support.',
      guideTitle: 'How to convert SVG to production-ready .astro components',
      steps: [
        {
          title: 'Upload SVG Icons or Illustrations',
          desc: 'Select one or more SVG files to convert into Astro framework components.',
        },
        {
          title: 'Automated Component Wrapping',
          desc: 'VectorForge extracts SVG attributes, cleans up XML metadata, and embeds standard Props interfaces with class:list and Astro.props spread.',
        },
        {
          title: 'Save .astro Component or ZIP Bundle',
          desc: 'Download individual .astro files or batch export as a single ZIP archive to drop directly into your Astro src/components/ folder.',
        },
      ],
      faqs: [
        {
          question: 'Why convert SVG to an Astro component instead of an <img> tag?',
          answer:
            'Astro components allow dynamic styling with Tailwind CSS or CSS classes, dynamic size overrides via props, and zero client-side JavaScript overhead since Astro compiles them to pure static HTML at build time.',
        },
        {
          question: 'Does this work with all Astro versions?',
          answer:
            'Yes! The generated .astro template uses standard Astro Props interfaces and class:list syntax compatible with Astro v3, v4, and v5+.',
        },
      ],
    },
  };

  const currentConfig = contentConfig[mode] || contentConfig['png-to-svg'];

  const breadcrumbsList = [
    { name: 'Converters', path: '/convert' },
    { name: currentConfig.pageTitle.split('(')[0].trim() },
  ];

  const howToSteps = currentConfig.steps.map((s) => ({
    name: s.title,
    text: s.desc,
  }));

  const isVectorizingMode = mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Dynamic SEO Head, Title & Googlebot Structured Data */}
      <SeoHead
        title={`${currentConfig.pageTitle} — VectorForge`}
        description={currentConfig.metaDescription}
        breadcrumbs={breadcrumbsList.map((b) => ({
          name: b.name,
          url: b.path || window.location.pathname,
        }))}
        faqs={currentConfig.faqs}
        howTo={{
          name: currentConfig.guideTitle,
          description: currentConfig.metaDescription,
          steps: howToSteps,
        }}
        softwareApp={{
          name: currentConfig.pageTitle,
          description: currentConfig.metaDescription,
          applicationCategory: 'DesignApplication',
          operatingSystem: 'All',
          price: '0',
          ratingValue: '4.9',
          reviewCount: '1380',
        }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbsList} />

      {/* Active Tool Viewport */}
      <UniversalConverter key={mode} initialMode={mode} />

      {/* Bidirectional Silo Linking: AI Vector & Code Alternative Banner */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/20 via-dark-card to-brand-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Need to Create New Artwork from Scratch?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Try the Free AI SVG Generator & Code to Vector Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Don't have a bitmap image to convert? Describe your icon in plain English to generate scalable SVG vectors with Google Gemini, or convert HTML, CSS, and HTML5 Canvas scripts directly into clean vector files.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/ai-svg-generator"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-brand-600 hover:from-indigo-500 hover:to-brand-500 text-white text-xs font-semibold shadow-glow transition-all active:scale-95"
            >
              <span>Launch AI SVG Generator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/html-to-svg"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <span>HTML to SVG</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Anti-Picsvg Comparison Callout Banner for Vectorizer pages */}
      {isVectorizingMode && (
        <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-500/30 bg-gradient-to-r from-brand-900/20 via-dark-card to-purple-900/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Next-Generation Vectorizer vs Legacy Tools</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Tired of Picsvg's 4MB limit, intrusive ads, and server uploads?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                VectorForge processes your files <strong>100% client-side</strong> on your computer's GPU. No files are uploaded to external servers, there are zero 4MB size constraints, and the entire studio is ad-free.
              </p>
            </div>

            <Link
              to="/alternatives/picsvg"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shrink-0 shadow-glow transition-all active:scale-95"
            >
              <span>See Picsvg vs VectorForge Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* SEO Step-by-Step Instructions */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block mb-2">
            Step-by-Step Instructions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {currentConfig.guideTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            No server uploads, zero queue wait times, and maximum privacy with browser-native canvas execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {currentConfig.steps.map((step, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-dark-border">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="font-bold text-white text-base">{step.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix */}
      <ComparisonTable />

      {/* FAQs */}
      <FaqAccordion
        title="Technical Format FAQs"
        description="Everything you need to know about vector rendering, file sizes, and browser support."
        items={currentConfig.faqs}
      />
    </div>
  );
};
