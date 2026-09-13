import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileImage,
  Layers,
  Wand2,
  Sparkles,
  Scissors,
  Cpu,
  FileCode,
  Shield,
  ArrowRight,
  ExternalLink,
  Code2,
  Globe,
  Home,
  CheckCircle2
} from 'lucide-react';

interface AllToolsDirectoryProps {
  currentPath?: string;
  className?: string;
}

export const AllToolsDirectory: React.FC<AllToolsDirectoryProps> = ({
  currentPath = '/',
  className = '',
}) => {
  const vectorConverters = [
    {
      name: 'SVG to PNG Converter',
      badge: 'Main Studio',
      path: '/',
      desc: 'High-res rasterizer up to 300 DPI, custom dimensions, transparent alpha & batch queue.',
      icon: Home,
      highlight: true,
      color: 'from-blue-500/20 to-brand-500/20 text-brand-600 dark:text-blue-400 border-brand-500/40',
    },
    {
      name: 'PNG to SVG (Auto-Trace)',
      badge: 'Raster to Vector',
      path: '/png-to-svg',
      desc: 'Vectorize raster PNG silhouettes and line art into clean, scalable SVG paths in-browser.',
      icon: Layers,
      color: 'from-pink-500/15 to-rose-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30',
    },
    {
      name: 'JPG to SVG Vectorizer',
      badge: 'No 4MB Limit',
      path: '/jpg-to-svg',
      desc: 'Trace JPEG photos, sketches, and logos into vectors with zero file size restrictions.',
      icon: FileImage,
      color: 'from-orange-500/15 to-amber-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30',
    },
    {
      name: 'Image to SVG (Cricut)',
      badge: 'Cut File Ready',
      path: '/image-to-svg',
      desc: 'Smooth outline contours optimized for vinyl cutters, laser engravers, and Cricut.',
      icon: Scissors,
      color: 'from-emerald-500/15 to-teal-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    },
    {
      name: 'SVG to Windows ICO',
      badge: 'Favicon Binary',
      path: '/svg-to-ico',
      desc: 'Package 16x16, 32x32, and 48x48 icon frames into true binary .ico container files.',
      icon: Cpu,
      color: 'from-purple-500/15 to-indigo-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    },
    {
      name: 'SVG to JPG Rasterizer',
      badge: 'Solid Background',
      path: '/convert/svg-to-jpg',
      desc: 'Render SVGs with custom solid matte backgrounds and fine-tuned DCT compression.',
      icon: FileImage,
      color: 'from-teal-500/15 to-cyan-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
    },
    {
      name: 'SVG to Data URI',
      badge: 'CSS & Base64',
      path: '/convert/svg-to-data-uri',
      desc: 'Encode vectors into URL-friendly UTF-8 or Base64 strings for CSS background-image.',
      icon: FileCode,
      color: 'from-cyan-500/15 to-sky-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    },
    {
      name: 'SVG to Astro Component',
      badge: '.astro Code',
      path: '/svg-to-astro',
      desc: 'Generate zero-JS Astro components with typed TypeScript props and class passthrough.',
      icon: Code2,
      color: 'from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    },
  ];

  const creativeStudios = [
    {
      name: 'Production Favicon Suite',
      badge: 'Full Bundle',
      path: '/favicon-generator',
      desc: 'Generate .ico, Apple Touch Icon, Android Chrome PWA manifests & HTML meta snippets.',
      icon: Wand2,
    },
    {
      name: 'Fast Logo & Icon Studio',
      badge: 'Vector Canvas',
      path: '/tools/logo-maker',
      desc: 'Design minimalist icons, typography logos, and geometric vector badges in seconds.',
      icon: Sparkles,
    },
    {
      name: 'SVG Optimizer & Cleaner',
      badge: 'Code Minifier',
      path: '/svg-optimizer',
      desc: 'Strip unnecessary metadata, round decimal coordinates, and boost Lighthouse scores.',
      icon: Cpu,
    },
    {
      name: 'Picsvg Alternative',
      badge: '100% Private',
      path: '/alternatives/picsvg',
      desc: 'No 4MB limits, zero server uploads, no intrusive ads — pure client-side tracing.',
      icon: Shield,
    },
  ];

  const internationalEditions = [
    {
      name: 'Conversor SVG para PNG (Brasil)',
      path: '/pt-br/conversor-svg-para-png',
      flag: '🇧🇷',
      desc: 'Converta SVG para PNG em alta resolução (300 DPI) com fundo transparente.',
    },
    {
      name: 'Conversor PNG para SVG (Brasil)',
      path: '/pt/',
      flag: '🇧🇷',
      desc: 'Vetorize imagens PNG e JPG diretamente no navegador sem envio ao servidor.',
    },
    {
      name: 'PNG in SVG umwandeln (Deutsch)',
      path: '/de/',
      flag: '🇩🇪',
      desc: 'Kostenlose Vektorisierung von Rastergrafiken ohne Größenbeschränkung.',
    },
  ];

  const companyLinks = [
    { name: 'About SvgFav.com', path: '/about-us', desc: 'Our mission and client-side architecture' },
    { name: 'Privacy Policy', path: '/privacy-policy', desc: 'GDPR, LGPD & zero-storage compliance' },
    { name: 'Terms of Service', path: '/terms-and-conditions', desc: 'Open web utility usage guidelines' },
    { name: 'Contact & Support', path: '/contact-us', desc: 'Engineering team and bug reports' },
  ];

  return (
    <section className={`space-y-10 pt-8 border-t border-slate-200 dark:border-neutral-800 ${className}`} aria-label="All Tools and Converters Directory">
      {/* Directory Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold border border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Vector Ecosystem</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore All SvgFav Studios &amp; Converters
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
          Every tool operates 100% locally in your browser memory. Zero server uploads, zero queues, and infinite scalability.
        </p>
      </div>

      {/* Vector Converters Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-500" />
          <span>Vector &amp; Raster Converters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vectorConverters.map((tool) => {
            const Icon = tool.icon;
            const isCurrent = currentPath === tool.path;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className={`group relative p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  tool.highlight
                    ? 'bg-gradient-to-br from-brand-500/10 via-white dark:via-neutral-900 to-purple-500/10 border-brand-500/40 shadow-sm hover:border-brand-500 hover:shadow-md'
                    : isCurrent
                    ? 'bg-slate-100 dark:bg-neutral-800 border-slate-300 dark:border-neutral-700 shadow-sm ring-1 ring-brand-500/30'
                    : 'bg-white dark:bg-neutral-900/80 border-slate-200 dark:border-neutral-800 hover:border-brand-500/40 hover:bg-slate-50 dark:hover:bg-neutral-850 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-neutral-800 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700">
                      {tool.badge}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-1.5">
                    <span>{tool.name}</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                  <span>{isCurrent ? 'Current Page' : 'Launch Tool'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Creative Studios & Ecosystem */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-purple-500" />
          <span>Creative Studios &amp; Web Utilities</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creativeStudios.map((tool) => {
            const Icon = tool.icon;
            const isCurrent = currentPath === tool.path;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className={`group p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-100 dark:bg-neutral-800 border-slate-300 dark:border-neutral-700'
                    : 'bg-white dark:bg-neutral-900/80 border-slate-200 dark:border-neutral-800 hover:border-purple-500/40 hover:bg-slate-50 dark:hover:bg-neutral-850 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700">
                      {tool.badge}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                  <span>{isCurrent ? 'Current Page' : 'Open Suite'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* International & Company Strips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* International Hub */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-emerald-500" />
            <span>International Localized Studios</span>
          </div>
          <div className="space-y-2">
            {internationalEditions.map((edition) => (
              <Link
                key={edition.path}
                to={edition.path}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-neutral-700 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{edition.flag}</span>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{edition.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-neutral-400">{edition.desc}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Company & Compliance Links */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-neutral-300 uppercase tracking-wider">
            <Shield className="w-4 h-4 text-brand-500" />
            <span>Trust, Privacy &amp; Company</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {companyLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-neutral-700"
              >
                <span className="font-bold text-xs text-slate-900 dark:text-white block">{item.name}</span>
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 block mt-0.5">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
