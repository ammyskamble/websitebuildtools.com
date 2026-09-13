import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileQuestion, 
  Home, 
  ArrowLeft, 
  Sparkles, 
  Wand2, 
  Layers, 
  FileCode2, 
  Compass, 
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const recommendedTools = [
    {
      title: 'Favicon Suite',
      desc: 'Multi-frame ICO, Apple Touch & Android PNG generator.',
      path: '/tools/favicon-generator',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-500',
      badge: 'Popular'
    },
    {
      title: 'PNG to SVG Converter',
      desc: '100% in-browser vector tracing with zero server uploads.',
      path: '/convert/png-to-svg',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Core Engine'
    },
    {
      title: 'Logo Maker Studio',
      desc: 'Interactive SVG symbol styling, typography & gradients.',
      path: '/tools/logo-maker',
      icon: Wand2,
      color: 'from-purple-500 to-pink-500',
      badge: 'Creative'
    },
    {
      title: 'SVG Optimizer',
      desc: 'Minify markup, strip metadata and reduce SVG payload.',
      path: '/tools/svg-optimizer',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Performance'
    },
    {
      title: 'SVG to Astro',
      desc: 'Export SVG assets as typed Astro components for your framework.',
      path: '/svg-to-astro',
      icon: FileCode2,
      color: 'from-amber-500 to-orange-500',
      badge: 'Framework'
    },
    {
      title: 'All Converters & Tools',
      desc: 'Browse JPG, ICO, Data-URI, and Astro vector exports.',
      path: '/convert',
      icon: Compass,
      color: 'from-sky-500 to-blue-600',
      badge: 'Hub'
    }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <SeoHead
        title="404: Page Not Found | SvgFav.com — Vector & Favicon Studio"
        description="The requested page or tool cannot be found. Explore our 100% private in-browser vector converters, favicon generator, and logo maker tools."
        canonicalUrl="https://svgfav.com/404"
        noindex={true}
      />

      {/* Background ambient decorative glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Error Badge & Visual Number */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <FileQuestion className="w-4 h-4 text-brand-400" />
          <span>Error 404 &bull; Missing Vector Route</span>
        </div>

        <div className="relative select-none">
          <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 blur-sm">
            <span className="text-8xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tighter text-brand-400 leading-none">
              404
            </span>
          </div>
        </div>

        {/* Heading & Explanation */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Lost in Vector Space
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The page, tool path, or resource you are looking for has been moved, renamed, or never existed in our coordinate grid.
          </p>
        </div>

        {/* Primary Navigation Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-medium text-sm shadow-glow-sm hover:shadow-glow transition-all duration-200 group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Return to Homepage</span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-card hover:bg-dark-hover text-slate-200 border border-dark-border font-medium text-sm transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Hub Grid */}
        <div className="pt-10 border-t border-dark-border/60 text-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Popular Web Tools & Converters
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side &bull; No Uploads
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="glass-card p-4 rounded-xl flex flex-col justify-between group hover:border-brand-500/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-sm text-white shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tool.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors flex items-center justify-between">
                      {tool.title}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
