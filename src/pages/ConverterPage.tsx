import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Zap, Check, ArrowRight, Sparkles, ExternalLink, FileCode, Copy, Code2, Scissors } from 'lucide-react';
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
  const location = useLocation();
  const isHubPage = location.pathname === '/convert' || location.pathname === '/converters';
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const contentConfig: Record<
    ConverterMode,
    {
      pageTitle: string;
      h1: string;
      keywords: string;
      subtitle: string;
      metaDescription: string;
      guideTitle: string;
      steps: { title: string; desc: string }[];
      faqs: { question: string; answer: string }[];
    }
  > = {
    'png-to-svg': {
      pageTitle: 'Free PNG to SVG Converter (Client-Side) — SvgFav',
      h1: 'Convert PNG to SVG Instantly',
      keywords: 'png to svg, convert png to vector',
      subtitle: 'Vectorize raster PNG images into clean, scalable SVG paths directly in your browser with zero server uploads and zero data leaks.',
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
            'Unlike legacy converters like Picsvg that transmit your artwork to remote web servers, SvgFav.com executes 100% locally on your computer. Your files never leave your device.',
        },
      ],
    },
    'jpg-to-svg': {
      pageTitle: 'Free JPG to SVG Converter (Client-Side) — SvgFav',
      h1: 'Convert JPG to SVG Vector Instantly',
      keywords: 'jpg to svg, convert jpg to vector',
      subtitle: 'Trace JPG photos, sketches, and logos into infinitely scalable vectors without 4MB cloud limits or server uploads.',
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
            'Yes! SvgFav.com calculates luminance and contrast values across your JPG pixels to trace sharp, clean vector paths.',
        },
        {
          question: 'Is it safe to convert proprietary logos and sketches online?',
          answer:
            'Unlike legacy cloud converters like Picsvg that upload your images to external servers, SvgFav.com processes 100% of the vectorization directly inside your browser memory using HTML5 Canvas. Your confidential files never touch any external server.',
        },
        {
          question: 'Is there a 4MB file limit like other tools?',
          answer:
            'No! SvgFav.com has no 4MB restriction. You can easily process large high-resolution JPGs up to 20MB+ smoothly.',
        },
      ],
    },
    'image-to-svg': {
      pageTitle: 'Universal Image to SVG Vectorizer (Client-Side) — SvgFav',
      h1: 'Convert Any Image to SVG Vector',
      keywords: 'image to svg, raster to vector',
      subtitle: 'Convert PNG, JPG, WebP, and BMP images into clean vector paths for design suites, Cricut cut files, and laser cutters.',
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
            'Yes! SvgFav.com traces unified outline polygons with closed vector paths, making them immediately compatible with Cricut Design Space, Silhouette Studio, Glowforge, and xTool without double-line cut errors.',
        },
        {
          question: 'Can I convert hand-drawn sketches or signatures to SVG?',
          answer:
            'Absolutely. Photograph or scan your sketch, upload the image, and adjust the threshold slider to isolate the ink strokes into vector curves.',
        },
        {
          question: 'Why choose SvgFav.com over Picsvg for Cricut and crafts?',
          answer:
            'Picsvg has intrusive video ads, a restrictive 4MB limit, and uploads files to an external server. SvgFav.com gives you unlimited file size, ad-free instant processing, adjustable path smoothing, and 100% privacy.',
        },
      ],
    },
    'svg-to-png': {
      pageTitle: 'Convert SVG to High-DPI PNG (Client-Side) — SvgFav',
      h1: 'Convert SVG to Transparent High-DPI PNG',
      keywords: 'svg to png, rasterize svg',
      subtitle: 'Rasterize vector SVG files into crisp transparent PNGs with up to 8x Ultra HD resolution directly on your GPU canvas.',
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
            'Yes! With the 4x and 8x DPI multipliers, SvgFav.com rasterizes vectors up to 4096x4096px with anti-aliasing directly on your GPU canvas.',
        },
      ],
    },
    'svg-to-jpg': {
      pageTitle: 'Convert SVG to High-Quality JPG with Solid Background | SvgFav',
      h1: 'Convert SVG to JPG with Solid Background',
      keywords: 'svg to jpg, svg to jpeg, vector to jpg, convert svg image',
      subtitle: 'Flatten vector designs onto custom background fills and compress into lightweight, web-optimized JPEG images in browser memory.',
      metaDescription: 'Convert SVG vectors to JPG with custom background colors and quality tuning. 100% client-side conversion with zero server uploads and sub-pixel quality.',
      guideTitle: 'How to convert SVG to JPG with solid background color fill',
      steps: [
        {
          title: 'Upload Vector Graphics',
          desc: 'Select or drag SVG files into the tool. Because the JPEG standard lacks an alpha transparency channel, a solid background color is seamlessly blended.',
        },
        {
          title: 'Choose Background Color & Quality',
          desc: 'Pick a solid background fill (white, black, or custom hex brand color) and set your target JPEG quality between 75% and 100%.',
        },
        {
          title: 'Export Compressed JPGs',
          desc: 'Download individual JPEG images or export all batch-processed files in a consolidated .zip package directly to your disk.',
        },
      ],
      faqs: [
        {
          question: 'Why does the JPEG format require a solid background color?',
          answer:
            'The JPEG (Joint Photographic Experts Group) specification uses discrete cosine transform (DCT) compression designed exclusively for 3-channel RGB/YUV color spaces. Because JPEG does not define an alpha channel, transparent SVG paths must be flattened against a solid background fill.',
        },
        {
          question: 'What is the optimal JPEG quality setting for web graphics?',
          answer:
            'A quality factor between 82% and 88% delivers the optimal balance: it strips unnoticeable high-frequency color data while cutting file size by 60%–75% with zero visible artifacting on standard or high-DPI displays.',
        },
        {
          question: 'Can I batch convert hundreds of SVG icons to JPG?',
          answer:
            'Yes! SvgFav processes your entire vector batch in parallel directly inside your browser memory using HTML5 2D canvas workers, without queue throttling or file size limits.',
        },
      ],
    },
    'svg-to-ico': {
      pageTitle: 'Convert SVG to Multi-Size Favicon ICO (16, 32, 48px) | SvgFav',
      h1: 'Convert SVG to Windows Favicon ICO',
      keywords: 'svg to ico, favicon ico converter, convert svg to favicon, multi resolution ico',
      subtitle: 'Compile vector graphics into compliant Microsoft Windows binary ICO packages containing 16×16, 32×32, and 48×48 frames with sub-pixel alpha rendering.',
      metaDescription: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads and crisp alpha transparency.',
      guideTitle: 'How to compile SVG into multi-resolution binary ICO favicon files',
      steps: [
        {
          title: 'Select Vector or Brand Logo',
          desc: 'Upload a square SVG icon or mark. Our engine automatically parses the vector geometry and prepares multi-resolution raster buffers.',
        },
        {
          title: 'Multi-Frame Sub-Pixel Rasterization',
          desc: 'The vectorizer renders 16×16 (browser tab), 32×32 (Retina bookmark bar), and 48×48 (Windows desktop/taskbar) frames with hardware anti-aliasing.',
        },
        {
          title: 'Binary ICO Structure Assembly',
          desc: 'Encodes an official ICONDIR header, directory index entries, and embedded image chunks into a genuine binary .ico ready to deploy as favicon.ico.',
        },
      ],
      faqs: [
        {
          question: 'What is a multi-resolution ICO file and why is it needed?',
          answer:
            'A genuine .ico container holds multiple resolution frames packed into a single binary stream. When placed at /favicon.ico, browsers and operating systems automatically pick the frame matching the display density (e.g. 16x16 for legacy tabs, 32x32 for high-DPI Retina screens, 48x48 for Windows taskbars), preventing blurry downscaling.',
        },
        {
          question: 'Is this a genuine binary ICO or just a renamed PNG file?',
          answer:
            'SvgFav compiles an authentic binary ICO file conforming to the Microsoft Windows ICO file format specification. It constructs binary ICONDIR headers, ICONDIRENTRY descriptors, and raw image chunk offsets that pass strict browser and OS validation.',
        },
        {
          question: 'How do I bypass aggressive browser favicon caching when testing?',
          answer:
            'Browsers cache favicon.ico aggressively. To see updates immediately, perform a hard refresh (Ctrl+F5 or Cmd+Shift+R) or append a version parameter to your HTML link tag, such as <link rel="icon" href="/favicon.ico?v=2">.',
        },
      ],
    },
    'svg-to-data-uri': {
      pageTitle: 'Convert SVG to CSS Data URI (URL-Encoded & Base64) | SvgFav',
      h1: 'Convert SVG to CSS Data URI',
      keywords: 'svg to data uri, svg to css background, data image svg xml, inline svg data uri',
      subtitle: 'Encode SVG vector markup into URL-safe or Base64 data URIs for zero-HTTP-request CSS backgrounds, mask-image rules, and inline HTML embeds.',
      metaDescription: 'Encode SVG vectors into inline background-image url("data:image/svg+xml,...") and Base64 strings for instant zero-request rendering.',
      guideTitle: 'How to convert SVG into CSS background-image Data URIs',
      steps: [
        {
          title: 'Select or Paste SVG Code',
          desc: 'Drop an SVG file or paste raw vector code directly into the input editor.',
        },
        {
          title: 'Select Encoding Scheme',
          desc: 'Choose URL-encoded (UTF-8) for maximum compression and gzip efficiency, or Base64 for legacy CSS preprocessors.',
        },
        {
          title: '1-Click Copy CSS or HTML Snippet',
          desc: 'Instantly copy ready-to-use CSS background-image, mask-image, or HTML <img> markup directly to your clipboard.',
        },
      ],
      faqs: [
        {
          question: 'Why is URL-encoded SVG superior to Base64 for CSS backgrounds?',
          answer:
            'URL-encoded SVGs (data:image/svg+xml;utf8,...) are approximately 30% smaller than Base64 equivalents because Base64 expands binary and text data by 33%. Furthermore, URL-encoded vectors remain human-readable in DevTools and achieve superior gzip compression ratios.',
        },
        {
          question: 'How does SvgFav prevent CSS syntax errors with SVG Data URIs?',
          answer:
            'Raw SVGs contain characters like # (used in hex colors) and double quotes that break CSS string parsing. SvgFav automatically percent-encodes dangerous characters (e.g. # becomes %23) so your CSS background-image rules never fail.',
        },
        {
          question: 'When should I use Data URIs instead of external SVG files?',
          answer:
            'Data URIs are ideal for critical UI icons, buttons, and spinners because they eliminate additional HTTP network roundtrips and guarantee zero flash of unstyled content (FOUC).',
        },
      ],
    },
    'svg-to-astro': {
      pageTitle: 'Convert SVG to Astro Component Online (Typed & Inlined) | SvgFav',
      h1: 'SVG to Astro Component Converter',
      keywords: 'svg to astro, astro svg inline, astro icon component, svg to astro component',
      subtitle: 'Transform SVG vector markup into typed, production-grade Astro components with Props interfaces, class:list styling, and zero client-side JavaScript.',
      metaDescription: 'Convert SVG icons into typed, production-ready .astro components with Props interfaces and class:list styling support.',
      guideTitle: 'How to convert SVG to production-ready .astro components',
      steps: [
        {
          title: 'Upload SVG Icons or Illustrations',
          desc: 'Select one or more SVG files to convert into native Astro (.astro) components.',
        },
        {
          title: 'Automated AST Component Synthesis',
          desc: 'Cleans redundant XML metadata, extracts viewBox coordinates, and injects Astro TypeScript Props interfaces with class:list and Astro.props spread.',
        },
        {
          title: 'Save .astro Component or ZIP Bundle',
          desc: 'Copy component markup directly or download pre-packaged .astro files ready to import into your Astro src/components/ directory.',
        },
      ],
      faqs: [
        {
          question: 'Why convert SVG to an Astro component instead of an <img> tag?',
          answer:
            'An inlined Astro component compiles to static HTML on the server, allowing you to style vector paths directly with Tailwind CSS utilities (e.g. text-blue-500 fill-current hover:text-blue-600) and override dimensions dynamically via props, which <img> tags cannot do.',
        },
        {
          question: 'Does an inlined Astro SVG component add client-side JavaScript overhead?',
          answer:
            'No! Following Astro\'s zero-JS architecture, .astro components contain zero client-side JavaScript by default. The vector markup is rendered purely into the initial static HTML document, preserving perfect 100/100 Google Lighthouse performance scores.',
        },
        {
          question: 'Does this converter support Astro v3, v4, and v5?',
          answer:
            'Yes. The generated templates utilize standard Astro HTML/SVG Props typing (astroHTML.JSX.SVGAttributes) and the class:list directive fully compatible with Astro v3, v4, and the latest Astro v5 release.',
        },
      ],
    },
  };

  const currentConfig = contentConfig[mode] || contentConfig['png-to-svg'];

  const pageTitle = isHubPage
    ? 'Free Online Vector & Favicon Converters | SvgFav'
    : currentConfig.pageTitle;
  const metaDescription = isHubPage
    ? 'High-speed browser-based SVG, PNG, JPG, and ICO converters with zero server uploads and complete privacy.'
    : currentConfig.metaDescription;
  const canonicalUrl = isHubPage
    ? 'https://svgfav.com/convert'
    : `https://svgfav.com/${mode}`;

  const breadcrumbsList = isHubPage
    ? [{ name: 'Converters', path: '/convert' }]
    : [
        { name: 'Converters', path: '/convert' },
        { name: currentConfig.h1 },
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
        title={pageTitle}
        description={metaDescription}
        keywords={currentConfig.keywords}
        canonicalUrl={canonicalUrl}
        breadcrumbs={breadcrumbsList.map((b) => ({
          name: b.name,
          url: b.path || window.location.pathname,
        }))}
        faqs={currentConfig.faqs}
        howTo={{
          name: currentConfig.guideTitle,
          description: metaDescription,
          steps: howToSteps,
        }}
        softwareApp={{
          name: pageTitle,
          description: metaDescription,
          applicationCategory: 'DesignApplication',
          operatingSystem: 'All',
          price: '0',
          ratingValue: '4.9',
          reviewCount: '1380',
        }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbsList} />

      {/* Primary Page Header for Programmatic SEO */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isHubPage ? 'Online Vector Converters & Code Studio' : currentConfig.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {isHubPage
            ? 'High-speed browser-based SVG, PNG, JPG, and ICO converters with zero server uploads and complete privacy.'
            : currentConfig.subtitle}
        </p>
      </div>

      {/* Active Tool Viewport */}
      <UniversalConverter key={mode} initialMode={mode} />

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
                SvgFav.com processes your files <strong>100% client-side</strong> on your computer's GPU. No files are uploaded to external servers, there are zero 4MB size constraints, and the entire studio is ad-free.
              </p>
            </div>

            <Link
              to="/alternatives/picsvg"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shrink-0 shadow-glow transition-all active:scale-95"
            >
              <span>See Picsvg vs SvgFav.com Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Dedicated Cricut & Cutter Technical Guide for PNG to SVG */}
      {mode === 'png-to-svg' && (
        <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-dark-card to-brand-900/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <Scissors className="w-4 h-4" />
                <span>Craft &amp; Cutting Machine Workflow Guide</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Cricut Design Space &amp; Laser Cutter Optimization
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Generate clean, closed vector paths with zero double-cut line errors for vinyl, paper, and laser cutters.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-semibold shrink-0">
              100% Compatible with Design Space &amp; Glowforge
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. High-Contrast Source</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Use solid black-and-white or transparent PNG silhouettes. High edge contrast produces precise single-contour boundaries without stray anchor points.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Threshold &amp; Curve Tuning</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Adjust the luminance threshold slider to eliminate noise and increase smoothing to reduce blade wear and cut times during vinyl weeding.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Import into Design Space</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In Cricut Design Space, click <em>Upload &gt; Upload Image &gt; Vector</em>. The closed vector polygons load as cuttable layers ready for immediate mat placement.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Astro Developer Utility & Code Copy Snippets */}
      {mode === 'svg-to-astro' && (
        <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-dark-card to-purple-900/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider mb-1">
                <Code2 className="w-4 h-4" />
                <span>Frontend Developer Utility &bull; Typed Astro Code Snippet</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Production-Ready .astro Component Structure
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Zero client-side JavaScript, typed TypeScript props, and seamless Tailwind CSS integration.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const sample = `---
// Icon.astro - Typed, Zero-JS Astro Component
interface Props {
  size?: number | string;
  class?: string;
  fill?: string;
  [key: string]: any;
}

const {
  size = 24,
  class: className,
  fill = "currentColor",
  ...rest
} = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill={fill}
  class:list={["inline-block shrink-0", className]}
  {...rest}
>
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
</svg>`;
                navigator.clipboard.writeText(sample);
                setCopiedSnippet(true);
                setTimeout(() => setCopiedSnippet(false), 2000);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-semibold shrink-0 transition-all active:scale-95"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Copied Snippet!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Astro Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border bg-slate-900 text-slate-100 font-mono text-xs">
            <div className="px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-2 text-amber-400">
                <FileCode className="w-3.5 h-3.5" />
                <span>src/components/Icon.astro</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Astro v3 / v4 / v5</span>
            </div>
            <pre className="p-4 sm:p-6 overflow-x-auto leading-relaxed text-slate-200">
              <code>{`---
// Icon.astro - Typed, Zero-JS Astro Component
interface Props {
  size?: number | string;
  class?: string;
  fill?: string;
  [key: string]: any;
}

const {
  size = 24,
  class: className,
  fill = "currentColor",
  ...rest
} = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill={fill}
  class:list={["inline-block shrink-0", className]}
  {...rest}
>
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
</svg>`}</code>
            </pre>
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

      {/* Cross-Link Callout to Primary SVG to PNG Converter */}
      {mode !== 'svg-to-png' && (
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-brand-900/40 via-blue-900/30 to-purple-900/40 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Need High-DPI Raster Outputs?</span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">Convert SVG to High-Resolution PNG (300 DPI &amp; 4K)</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Free in-browser tool with transparent background support, bulk SVG conversion, custom dimensions, and zero server uploads.
            </p>
          </div>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shrink-0 shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <span>SVG to PNG Converter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      )}

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
