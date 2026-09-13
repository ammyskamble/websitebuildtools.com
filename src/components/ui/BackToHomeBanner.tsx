import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

interface BackToHomeBannerProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const BackToHomeBanner: React.FC<BackToHomeBannerProps> = ({
  className = '',
  variant = 'full',
}) => {
  if (variant === 'compact') {
    return (
      <div className={`p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-blue-500/10 border border-brand-500/25 flex flex-wrap items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200">
          <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Need to rasterize vectors?</span>
            <span className="text-slate-600 dark:text-slate-400 ml-1.5 hidden sm:inline">
              Convert SVG to high-res 300 DPI PNG with transparent alpha.
            </span>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-all hover:gap-2 shrink-0"
        >
          <span>Open SVG to PNG Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-brand-900/30 via-slate-900/40 to-purple-900/30 border border-brand-500/30 shadow-lg relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SvgFav Flagship Home Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Looking for High-Resolution SVG to PNG Conversion?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Convert any vector file to pixel-perfect PNG right in your browser. Supports custom dimensions, scale multipliers (1x–4x / 4096px+), 300 DPI print-ready density, transparent alpha channel, and multi-file batch downloads.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <Shield className="w-3.5 h-3.5" /> 100% Client-Side Privacy
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
              <Zap className="w-3.5 h-3.5" /> Zero Queue Waiting
            </span>
            <span>&bull;</span>
            <span>Free &bull; No Uploads</span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Go to SVG to PNG Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-[11px] text-center text-slate-500 dark:text-slate-400">
            SvgFav.com Main Homepage
          </span>
        </div>
      </div>
    </div>
  );
};
