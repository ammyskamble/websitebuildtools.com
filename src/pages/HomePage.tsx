import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Wand2, Zap, Cpu, ChevronRight, Globe, FileImage, ShieldCheck, CheckCircle2, ArrowRight, Lock, Layers
} from 'lucide-react';
import { LogoStudio } from '../components/studio/LogoStudio';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { SeoHead } from '../components/seo/SeoHead';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const rawSchemaGraph = [
    {
      '@type': 'WebApplication',
      '@id': 'https://svgfav.com/#app',
      name: 'SvgFav Vector Studio',
      url: 'https://svgfav.com/',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All',
      browserRequirements: 'HTML5 Canvas, WebAssembly',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Client-side raster to vector conversion',
        'Multi-size favicon generation',
        'Real-time SVG code minification',
        'Zero server data transfer',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://svgfav.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an SVG file and why is it preferred over raster formats?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An SVG is an XML-based vector format using geometric primitives like paths and curves instead of pixel grids, allowing infinite scaling without quality degradation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does client-side vector tracing work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Image pixel buffers are processed locally using Canvas API and WebAssembly to generate Bézier coordinate curves directly inside your browser without uploading files to any server.',
          },
        },
      ],
    },
  ];

  const hreflangAlternates = [
    { lang: 'en', url: 'https://svgfav.com/' },
    { lang: 'pt', url: 'https://svgfav.com/pt/' },
    { lang: 'de', url: 'https://svgfav.com/de/' },
    { lang: 'fr', url: 'https://svgfav.com/fr/' },
    { lang: 'es', url: 'https://svgfav.com/es/' },
    { lang: 'x-default', url: 'https://svgfav.com/' },
  ];

  return (
    <div className="w-full space-y-16">
      <SeoHead
        title="SvgFav — In-Browser Vector &amp; Favicon Studio"
        description="Free in-browser vector & favicon studio. Convert PNG to SVG, generate multi-resolution favicon.ico packs, and optimize SVG code with zero server uploads."
        keywords="brand, general vector tool"
        canonicalUrl="https://svgfav.com/"
        hreflangAlternates={hreflangAlternates}
        rawSchemaGraph={rawSchemaGraph}
      />

      {/* HERO SECTION: Above the Fold Interactive Sandbox */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        {/* Ambient Mesh Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-mesh-gradient pointer-events-none opacity-40 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Titles */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-semibold mb-4 shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Vector &amp; Favicon Engine</span>
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              <span className="text-slate-400">100% In-Browser</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              In-Browser Vector &amp; Favicon Studio
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Design, optimize &amp; convert vectors in seconds. Craft stunning logos, test realistic multi-platform favicons, and optimize SVG code directly on your device.
            </p>
          </div>

          {/* Above-the-fold Interactive Sandbox Studio */}
          <div className="relative">
            <LogoStudio
              onExportFavicon={() => {
                navigate('/favicon-generator');
              }}
            />
          </div>
        </div>
      </section>

      {/* BENTO GRID: Highlighting Standalone Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            An entire vector pipeline in your browser
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            No subscriptions. No file uploads. Everything executes on your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento Card 0: SVG Optimizer */}
          <div className="glass-card rounded-2xl p-6 border border-brand-500/30 flex flex-col justify-between group hover:border-brand-500/60 transition-all bg-gradient-to-b from-brand-500/5 to-transparent relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                  SVG Optimizer
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Minify, clean, and compress SVG files in-browser. Remove redundant markup, strip comments, and shrink file size without losing visual quality.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">Zero Upload</span>
              <Link
                to="/svg-optimizer"
                className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
              >
                <span>Optimize SVG</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 1: Favicon Generator */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-brand-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                Favicon &amp; App Icon Suite
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Generate multi-resolution <code className="text-brand-600 dark:text-brand-300">favicon.ico</code>, Apple Touch icons, Android PWAs, and manifest files with live browser tab and iOS simulators.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">1-Click ZIP Pack</span>
              <Link
                to="/favicon-generator"
                className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
              >
                <span>Launch Suite</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: SVG to Astro */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-violet-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                SVG to Astro Utility
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Convert SVG vectors into typed <code className="text-violet-500 dark:text-violet-300">.astro</code> components with Props interfaces, class:list styling, and zero runtime JavaScript.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold">Frontend Ready</span>
              <Link
                to="/svg-to-astro"
                className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
              >
                <span>Astro Converter</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: High-DPI Converters Hub */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileImage className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                PNG to SVG Vectorizer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Trace raster images into clean vector paths using client-side edge detection. Process logos, drawings, and sketches up to 20MB with zero server uploads.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Client-Side Tracing</span>
              <Link
                to="/png-to-svg"
                className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                <span>Trace Vector</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Conversion Cards Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Link
            to="/png-to-svg"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block">PNG to SVG</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Client auto-tracing</span>
          </Link>
          <Link
            to="/favicon-generator"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block">Favicon Generator</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Multi-size .ICO &amp; ZIP</span>
          </Link>
          <Link
            to="/svg-optimizer"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block">SVG Optimizer</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Minify &amp; strip bloat</span>
          </Link>
          <Link
            to="/svg-to-astro"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block">SVG to Astro</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Typed component code</span>
          </Link>
          <Link
            to="/svg-to-png"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center col-span-2 sm:col-span-1"
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block">SVG to PNG</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Up to 8x Ultra HD</span>
          </Link>
        </div>
      </section>

      {/* Format Matrix Table */}
      <ComparisonTable />

      {/* COMPREHENSIVE KNOWLEDGE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-dark-border space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Section Header */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-400 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>In-Browser Vector Engineering &amp; Favicon Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Client-Side Vector Engine
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              Welcome to <strong>SvgFav.com</strong>, an in-browser vector conversion studio and favicon engineering suite. SvgFav executes entirely within your browser&apos;s local memory using WebAssembly and HTML5 Canvas, eliminating third-party server uploads, processing queues, and bandwidth bottlenecks. Whether generating production-ready favicon packs, tracing high-resolution bitmaps into scalable vector paths, or optimizing complex SVG markup, SvgFav delivers instant, private results on any device.
            </p>
          </div>

          {/* Subsection: Engine Capabilities & Output Formats */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <FileImage className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Engine Capabilities &amp; Output Formats</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Vector conversion transforms pixel-based raster graphics into mathematically calculated geometry. While raster formats like PNG and JPEG record imagery as rigid grids of colored pixels that lose clarity upon magnification, Scalable Vector Graphics (SVG) describe shapes, fills, and strokes through precise coordinate points and Bézier curvature equations. This enables infinite scaling from compact 16px interface symbols to high-resolution billboard displays without distortion.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>High-Precision Raster Vectorization (PNG to SVG)</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Convert logos, signatures, monochrome silhouettes, and line art into clean vector paths. Our client-side luminance thresholding and contour-tracing algorithms synthesize smooth mathematical curves directly in browser memory, ready for Figma, Illustrator, or direct web deployment.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>High-Capacity Image Tracing (JPG to SVG &amp; WebP)</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Vectorize high-resolution photographs, scans, and sketches up to 20MB+. Because image data stays in local memory, processing avoids arbitrary cloud file-size restrictions and queuing delays common in legacy web converters.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Scalable Geometry &amp; Sub-Pixel Precision</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Export mathematical vector outlines with adaptive curve simplification, preserving microscopic corner fidelity and clean geometric coordinates across any display.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Reverse High-DPI Rasterization (SVG to Transparent PNG)</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Export vector designs to high-resolution raster formats for email newsletters, OpenGraph social previews, or print media. Render transparent PNG assets from standard 1x (512px) up to 8x Ultra HD (4096px) with full sub-pixel anti-aliasing.
                </p>
              </div>
            </div>
          </div>

          {/* Favicon Architecture */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Favicon Architecture &amp; Multi-Platform Standards</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A favicon is a visual identity anchor displayed in browser tabs, bookmark shelves, search result snippets, and mobile home screen shortcuts. In the modern multi-device ecosystem, complete favicon support requires a tiered bundle:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-dark-surface/60 border border-dark-border">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">1. Multi-Resolution favicon.ico Binary Container</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  The binary ICO container bundles multiple bitmap mipmaps (16x16, 32x32, and 48x48 pixels) into a single file for legacy desktop environments and server roots.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-dark-surface/60 border border-dark-border">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">2. Modern Vector favicon.svg with Dark Mode Queries</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Chrome, Firefox, Safari, and Edge render SVG favicons natively with sub-pixel sharpness on Retina displays and automatic contrast adaptation via <code>@media (prefers-color-scheme: dark)</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-dark-surface/60 border border-dark-border">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">3. Apple Touch Icons &amp; Android PWA Web Manifests</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Mobile devices require high-density icons (180x180 for iOS home screens and 192x192 / 512x512 PWA icons referenced in a valid <code>site.webmanifest</code>).
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              SvgFav&apos;s standalone <Link to="/favicon-generator" className="text-brand-600 dark:text-brand-400 underline font-medium">Favicon Suite</Link> creates the entire multi-format bundle in a single click with pre-formatted HTML <code>&lt;head&gt;</code> tags.
            </p>
          </div>

          {/* Client-Side Architecture */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Client-Side Architecture: High Performance, Zero Latency &amp; Complete Privacy</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Traditional online converters transmit private files across the internet to remote servers, introducing transfer latency, queue congestion, and potential confidentiality concerns. SvgFav operates on an entirely client-side paradigm:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1.5">
                <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold text-sm mb-1">
                  <Cpu className="w-4 h-4" />
                  <h4>In-Browser Memory Execution</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Contour tracing, raster rendering, and binary encoding execute directly in local device RAM using HTML5 Canvas and WebAssembly. No network data transfer is involved in file processing.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1">
                  <Lock className="w-4 h-4" />
                  <h4>Zero Server Retention</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Proprietary brand marks, vector illustrations, and client assets never leave your computer. SvgFav maintains zero server-side file caches or user tracking databases.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold text-sm mb-1">
                  <Zap className="w-4 h-4" />
                  <h4>Edge CDN Distribution</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Application static assets are served through a global edge CDN, providing immediate initialization and low-latency interaction for developers worldwide.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Semantic <details> Accordion FAQs (Exact structure from Section 3) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Frequently Asked Questions</h2>

        {/* FAQ Item 1 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/70 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>What is an SVG file and why is it preferred over raster formats?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            An SVG (.svg) is an XML-based two-dimensional vector graphics format defined by the W3C. Unlike pixel-grid raster files (PNG, JPEG, WebP), SVG uses coordinate geometry, paths, strokes, and Bézier curves. It scales infinitely to any screen resolution without raster distortion or file size penalties.
          </div>
        </details>

        {/* FAQ Item 2 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/70 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>How does client-side vector tracing work?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            The tracer reads raw image pixel buffers via the browser’s HTML5 Canvas API and WebAssembly. It calculates luminance values using standard rec. 601 coefficients (Y = 0.299R + 0.587G + 0.114B) to establish binary edge boundaries, constructing cubic Bézier segments strictly in local device memory.
          </div>
        </details>
      </section>
    </div>
  );
};

