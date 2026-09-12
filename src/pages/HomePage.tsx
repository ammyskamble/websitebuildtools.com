import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Wand2, Zap, Cpu, ChevronRight
} from 'lucide-react';
import { LogoStudio } from '../components/studio/LogoStudio';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { SeoHead } from '../components/seo/SeoHead';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const homeFaqs = [
    {
      question: 'Is VectorForge truly 100% client-side? Are my images uploaded anywhere?',
      answer:
        'Yes! All SVG rendering, canvas rasterization, binary ICO encoding, vectorization, and ZIP generation run entirely inside your browser using HTML5 Canvas, Web Workers, and JavaScript. Your files never leave your computer, ensuring maximum privacy and zero latency.',
    },
    {
      question: 'What formats are included in the Favicon Pack download?',
      answer:
        'The one-click ZIP download bundles multi-resolution favicon.ico (16x16, 32x32, 48x48), modern vector favicon.svg with dark mode support, high-res apple-touch-icon.png (180x180), android-chrome-192x192.png, android-chrome-512x512.png, and a valid site.webmanifest configuration with pre-generated HTML tags.',
    },
    {
      question: 'How does the PNG to SVG vectorizer work without a backend?',
      answer:
        'We execute an in-browser image tracing algorithm that reads pixel luminance directly from an HTML5 Canvas, detects edge contours based on your chosen threshold and smoothing tolerance, and constructs vector SVG polygon paths in real time.',
    },
    {
      question: 'What makes VectorForge faster than other online converters?',
      answer:
        'Traditional tools upload your file to a remote server, queue it, run slow backend scripts, and make you wait for a download link. VectorForge executes with zero network overhead directly on your GPU/CPU via client-side canvas rendering.',
    },
  ];

  return (
    <div className="w-full space-y-16">
      <SeoHead
        title="VectorForge — Free AI SVG Generator, Favicon Suite & Vector Converters"
        description="Lightning-fast, privacy-first vector and asset studio. Generate production favicons, craft logos, optimize SVGs, and convert vectors to high-DPI raster assets. 100% in-browser."
        faqs={homeFaqs}
        softwareApp={{
          name: 'VectorForge',
          description: 'All-in-One SVG, Favicon & Asset Studio (100% Client-Side)',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'All',
          price: '0',
          ratingValue: '4.9',
          reviewCount: '1720',
        }}
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
              <span>Next-Generation Vector & Favicon Engine</span>
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              <span className="text-slate-400">100% In-Browser</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Design, optimize & convert <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                vectors in seconds.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Craft stunning logos, test realistic multi-platform favicons, optimize SVGs, and batch rasterize up to 8x 4K resolution. Private, zero-latency, and free forever.
            </p>
          </div>

          {/* Above-the-fold Interactive Sandbox Studio */}
          <div className="relative">
            <LogoStudio
              onExportFavicon={() => {
                navigate('/tools/favicon-generator');
              }}
            />
          </div>
        </div>
      </section>

      {/* BENTO GRID: Highlighting Standalone Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            An entire vector pipeline in your browser
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            No subscriptions. No file uploads. Everything executes on your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento Card 0: Gemini AI Studio */}
          <div className="glass-card rounded-2xl p-6 border border-brand-500/30 flex flex-col justify-between group hover:border-brand-500/60 transition-all bg-gradient-to-b from-brand-500/5 to-transparent relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  Google Gemini AI
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Generate SVG icons or import HTML/CSS & Canvas JS. Instant GPU rasterization to SVG, PNG, and Favicon (.ico).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-brand-400 font-semibold">AI & Code Sandbox</span>
              <Link
                to="/tools/gemini-ai"
                className="flex items-center gap-1 text-xs font-semibold text-white group-hover:text-brand-400 transition-colors"
              >
                <span>Launch AI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 1: Favicon Generator */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-brand-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                Favicon & App Icon Suite
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Generate multi-resolution <code className="text-brand-300">favicon.ico</code>, Apple Touch icons, Android PWAs, and manifest files with live browser tab and iOS simulators.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-semibold">1-Click ZIP Pack</span>
              <Link
                to="/tools/favicon-generator"
                className="flex items-center gap-1 text-xs font-semibold text-white group-hover:text-brand-400 transition-colors"
              >
                <span>Launch Suite</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: SVG Optimizer */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-violet-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                SVG Optimizer & Cleaner
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Inspired by SVGOMG. Strip illustrator junk, round coordinate decimals, remove comments, and reduce SVG weight by up to 60% with instant visual diff.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-violet-400 font-semibold">Visual Diff & Stats</span>
              <Link
                to="/tools/svg-optimizer"
                className="flex items-center gap-1 text-xs font-semibold text-white group-hover:text-violet-400 transition-colors"
              >
                <span>Clean SVG</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: High-DPI Converters */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                High-DPI Converter Hub
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Batch convert SVGs to PNGs (1x to 8x up to 4096px), JPGs, Windows ICO, or auto-trace PNG images into vectors with client-side edge detection.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-400 font-semibold">Batch Drag & Drop</span>
              <Link
                to="/convert/svg-to-png"
                className="flex items-center gap-1 text-xs font-semibold text-white group-hover:text-blue-400 transition-colors"
              >
                <span>Explore Converters</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Conversion Cards Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Link
            to="/convert/svg-to-png"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-white block">SVG to PNG</span>
            <span className="text-[10px] text-slate-400">Up to 8x Ultra HD</span>
          </Link>
          <Link
            to="/convert/svg-to-jpg"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-white block">SVG to JPG</span>
            <span className="text-[10px] text-slate-400">Quality compression</span>
          </Link>
          <Link
            to="/convert/svg-to-ico"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-white block">SVG to ICO</span>
            <span className="text-[10px] text-slate-400">Multi-size embedded</span>
          </Link>
          <Link
            to="/convert/png-to-svg"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center"
          >
            <span className="text-xs font-bold text-white block">PNG to SVG</span>
            <span className="text-[10px] text-slate-400">Client auto-tracing</span>
          </Link>
          <Link
            to="/convert/svg-to-data-uri"
            className="p-3.5 rounded-xl glass-card border border-dark-border hover:border-brand-500/40 transition-colors text-center col-span-2 sm:col-span-1"
          >
            <span className="text-xs font-bold text-white block">SVG to Data URI</span>
            <span className="text-[10px] text-slate-400">CSS & Base64</span>
          </Link>
        </div>
      </section>

      {/* Format Matrix Table */}
      <ComparisonTable />

      {/* Technical FAQ */}
      <FaqAccordion items={homeFaqs} />
    </div>
  );
};
