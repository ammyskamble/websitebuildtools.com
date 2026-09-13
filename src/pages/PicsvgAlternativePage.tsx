import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, Sparkles, Check, X, ArrowRight, Lock, EyeOff,
  Cpu, Layers, FileCode, CheckCircle2, Scissors, HelpCircle
} from 'lucide-react';
import { UniversalConverter } from '../components/converters/UniversalConverter';
import { FaqAccordion } from '../components/ui/FaqAccordion';

export const PicsvgAlternativePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Best Free Picsvg Alternative (100% Client-Side & Private) — SvgFav.com';
  }, []);

  const comparisonRows = [
    {
      feature: 'File Processing Architecture',
      svgfav: '100% Client-Side (GPU/Canvas/WASM)',
      picsvg: 'Server-Side Processing (Remote Cloud Upload)',
      vfWins: true,
    },
    {
      feature: 'Privacy & Data Security',
      svgfav: 'Zero uploads. Files never leave your browser.',
      picsvg: 'Images uploaded & processed on 3rd-party servers.',
      vfWins: true,
    },
    {
      feature: 'File Size Limits',
      svgfav: 'Unlimited / Up to 20MB+ easily',
      picsvg: 'Strict 4 MB Maximum Limit',
      vfWins: true,
    },
    {
      feature: 'Advertising & Trackers',
      svgfav: '100% Ad-Free Clean UI',
      picsvg: 'Heavy 3rd-party banner & video ads',
      vfWins: true,
    },
    {
      feature: 'Export Options',
      svgfav: 'SVG, High-DPI PNG (up to 8K), JPG, ICO, Data URI, Astro',
      picsvg: 'SVG only',
      vfWins: true,
    },
    {
      feature: 'Batch Processing',
      svgfav: 'Process multiple files at once + 1-Click ZIP bundle',
      picsvg: 'Single file only',
      vfWins: true,
    },
    {
      feature: 'Cricut & Laser Path Optimization',
      svgfav: 'Adjustable contour smoothing & threshold controls',
      picsvg: 'Fixed filter presets with jagged edges',
      vfWins: true,
    },
    {
      feature: 'Integrated Asset Ecosystem',
      svgfav: 'Favicon Suite, Logo Studio, SVG Optimizer',
      picsvg: 'Basic vectorizer only',
      vfWins: true,
    },
  ];

  const faqs = [
    {
      question: 'Why is SvgFav.com the best free alternative to Picsvg?',
      answer:
        'SvgFav.com solves the three biggest issues with Picsvg: strict 4MB file limits, intrusive ads, and privacy risks from uploading confidential files to remote servers. SvgFav.com executes 100% in your browser using HTML5 Canvas and WebAssembly, meaning files never leave your device.',
    },
    {
      question: 'Why does Picsvg impose a 4 MB file limit?',
      answer:
        'Because Picsvg converts files on their remote server infrastructure, large images consume expensive server bandwidth and CPU memory. SvgFav.com uses your computer’s local processing power, eliminating all server bottlenecks and allowing files up to 20MB+ with zero lag.',
    },
    {
      question: 'Is it safe to convert private logos and confidential sketches on Picsvg?',
      answer:
        'When you use server-based converters like Picsvg, your images are transmitted across the internet and stored in temporary server caches. With SvgFav.com, all pixel thresholding and vector path tracing occur in your local browser memory, guaranteeing total privacy for proprietary client logos and confidential artwork.',
    },
    {
      question: 'How do SvgFav.com SVGs compare for Cricut Design Space and laser cutting?',
      answer:
        'Picsvg often generates noisy, disconnected path fragments that cause laser cutters and Cricut cutting blades to tear material or cut multiple times. SvgFav.com includes adjustable smoothing tolerance sliders that produce clean, unified closed polygons ideal for vinyl plotters and laser cutters.',
    },
    {
      question: 'Does SvgFav.com cost anything or require an account?',
      answer:
        'No. SvgFav.com is 100% free with no account creation, no subscriptions, and zero ads.',
    },
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SvgFav.com — Best Picsvg Alternative',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires modern browser with HTML5 Canvas support',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          '100% Client-Side Privacy',
          'No 4MB Limit',
          'Ad-Free Interface',
          'Cricut & Laser Cutter Vector Optimization',
          'Batch Processing with ZIP Export',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-300">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Client-Side • No Server Uploads • Zero 4MB Limits</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The Modern, Private Alternative to <span className="gradient-text">Picsvg</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Convert PNG, JPG, and raster images into clean SVG vectors with <strong>zero server uploads</strong>, no 4MB restrictions, and <strong>100% ad-free</strong> browser processing.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Files Stored on Servers</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No 4 MB Limit</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cricut & Laser Cut Ready</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free & Ad-Free</span>
        </div>
      </section>

      {/* Embedded Live Tool: Ready to convert immediately above the fold */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-400" />
            <span>Try the SvgFav.com Image to SVG Converter Below</span>
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">Drag & drop any image to test live</span>
        </div>
        <UniversalConverter key="picsvg-alt" initialMode="png-to-svg" />
      </section>

      {/* Feature Comparison Table */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-dark-border space-y-6">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block mb-2">
            Detailed Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            SvgFav.com vs. Picsvg Side-by-Side
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            See why thousands of developers, crafters, and graphic designers are switching to SvgFav.com.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-dark-border text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Feature / Capability</th>
                <th className="py-3.5 px-4 font-semibold text-brand-400 bg-brand-500/10 rounded-t-xl">
                  SvgFav.com (Modern)
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-400">Picsvg (Legacy)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60 text-xs">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-dark-surface/40 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">{row.feature}</td>
                  <td className="py-4 px-4 text-emerald-300 font-semibold bg-brand-500/5">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.svgfav}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{row.picsvg}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4 Pillars Why SvgFav.com Wins */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">100% Client-Side Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your images are processed entirely within browser memory using HTML5 Canvas. No server transfers, zero tracking, and complete confidential privacy.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">No 4MB Size Restriction</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unlike Picsvg which crashes or blocks uploads over 4MB, SvgFav.com easily vectorizes high-resolution scans, photos, and posters up to 20MB+.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center">
            <Scissors className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">Cricut & Laser Ready</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Adjustable edge smoothing and threshold filters produce clean, continuous closed cut-paths without the jagged double-cut artifacts common on Picsvg.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">All-in-One Studio Suite</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Beyond image vectorizing, SvgFav.com gives you a full production Favicon Suite, Logo Studio, and SVG Optimizer.
          </p>
        </div>
      </section>

      {/* Cricut & Makers Deep Dive Section */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
            <Scissors className="w-3.5 h-3.5" />
            <span>Dedicated for Makers & Crafters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Designed for Cricut Design Space, Glowforge & CNC Cutting
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Crafters moving from Picsvg to SvgFav.com experience significantly smoother cuts and faster workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-2">
            <h4 className="font-bold text-white text-sm">1. Zero Path Fragmentation</h4>
            <p className="text-xs text-slate-400">
              SvgFav.com connects edge coordinates into unified outline loops, eliminating tiny stray dots that ruin vinyl sheets.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-2">
            <h4 className="font-bold text-white text-sm">2. Adjustable Tolerance</h4>
            <p className="text-xs text-slate-400">
              Simplify anchor points from 1 to 5 to reduce cutting head acceleration time on CNC routers and vinyl cutters.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-2">
            <h4 className="font-bold text-white text-sm">3. Instant SVG Download</h4>
            <p className="text-xs text-slate-400">
              Standard compliant XML with <code className="text-brand-300">viewBox</code> attributes that import seamlessly without scaling errors.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        title="Frequently Asked Questions About Picsvg & SvgFav.com"
        description="Clear answers about file conversion, privacy guarantees, and feature differences."
        items={faqs}
      />
    </div>
  );
};
