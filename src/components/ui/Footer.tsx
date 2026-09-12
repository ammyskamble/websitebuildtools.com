import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, Zap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dark-border bg-dark-bg/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white tracking-tight text-base">VectorForge</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The high-performance, privacy-first vector and favicon studio. Craft logos, generate production favicon bundles, and convert vector formats 100% in-browser.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero server storage. 100% private.</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Core Studios</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/tools/logo-maker" className="hover:text-brand-400 transition-colors">
                  Fast Logo & Icon Studio
                </Link>
              </li>
              <li>
                <Link to="/tools/favicon-generator" className="hover:text-brand-400 transition-colors">
                  Production Favicon Suite
                </Link>
              </li>
              <li>
                <Link to="/tools/svg-optimizer" className="hover:text-brand-400 transition-colors">
                  SVG Optimizer & Cleaner
                </Link>
              </li>
            </ul>
          </div>

          {/* Converters */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Conversion Hub</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/convert/svg-to-png" className="hover:text-brand-400 transition-colors">
                  SVG to PNG (High-DPI 4K)
                </Link>
              </li>
              <li>
                <Link to="/convert/svg-to-jpg" className="hover:text-brand-400 transition-colors">
                  SVG to JPG
                </Link>
              </li>
              <li>
                <Link to="/convert/svg-to-ico" className="hover:text-brand-400 transition-colors">
                  SVG to Windows ICO
                </Link>
              </li>
              <li>
                <Link to="/convert/png-to-svg" className="hover:text-brand-400 transition-colors">
                  PNG to SVG (Auto-Vectorize)
                </Link>
              </li>
              <li>
                <Link to="/convert/svg-to-data-uri" className="hover:text-brand-400 transition-colors">
                  SVG to CSS Data URI
                </Link>
              </li>
              <li>
                <Link to="/convert/svg-to-astro" className="hover:text-amber-300 transition-colors">
                  SVG to Astro (.astro)
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech & Specifications */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Engine Highlights</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Latency Canvas Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-brand-400" />
                <span>Client-Side Binary ICO Encoder</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Multi-Platform Live Mockups</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>No tracking or file retention</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} VectorForge Studio. Open web utility.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> for developers & designers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
