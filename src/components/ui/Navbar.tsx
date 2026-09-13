import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Shield, ChevronDown, Wand2, RefreshCw, Layers, Compass, Menu, X, ArrowUpRight } from 'lucide-react';
import { SvgFavLogo } from './SvgFavLogo';

export const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-border/80 bg-dark-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <SvgFavLogo size={40} className="drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              SvgFav.com
              <span className="text-[10px] px-1.5 py-0.5 font-medium rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                PRO
              </span>
            </span>
            <span className="text-xs text-slate-400 -mt-1 hidden sm:inline">All-in-One Vector &amp; Favicon Studio</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/tools/logo-maker"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/tools/logo-maker')
                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                : 'text-slate-300 hover:text-white hover:bg-dark-hover'
            }`}
          >
            Logo Studio
          </Link>
          <Link
            to="/tools/favicon-generator"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/tools/favicon-generator')
                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                : 'text-slate-300 hover:text-white hover:bg-dark-hover'
            }`}
          >
            Favicon Suite
          </Link>
          <Link
            to="/tools/svg-optimizer"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/tools/svg-optimizer')
                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                : 'text-slate-300 hover:text-white hover:bg-dark-hover'
            }`}
          >
            SVG Optimizer
          </Link>


          {/* Converters Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              to="/convert/svg-to-png"
              onClick={() => setDropdownOpen(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                location.pathname.startsWith('/convert')
                  ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-dark-hover'
              }`}
            >
              <span>Converters</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
              />
            </Link>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-60 p-2 rounded-xl glass-panel shadow-2xl border border-dark-border z-50 animate-in fade-in slide-in-from-top-2"
                onClick={() => setDropdownOpen(false)}
              >
                <Link
                  to="/convert/svg-to-png"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>SVG to PNG (High-DPI)</span>
                </Link>
                <Link
                  to="/convert/svg-to-jpg"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>SVG to JPG</span>
                </Link>
                <Link
                  to="/png-to-svg"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  <span>PNG to SVG (Vectorize)</span>
                </Link>
                <Link
                  to="/jpg-to-svg"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>JPG to SVG (No 4MB Limit)</span>
                </Link>
                <Link
                  to="/image-to-svg"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Image to SVG (Cricut/Laser)</span>
                </Link>
                <Link
                  to="/svg-to-png"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>SVG to PNG (High-DPI)</span>
                </Link>
                <Link
                  to="/svg-to-ico"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>SVG to ICO (Multi-size)</span>
                </Link>
                <Link
                  to="/svg-to-astro"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>SVG to Astro (.astro)</span>
                </Link>

                <div className="my-1 border-t border-dark-border/60" />

                <span className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  AI & Code To Vector
                </span>
                <Link
                  to="/ai-svg-generator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-brand-300 hover:bg-brand-500/20 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>AI SVG Generator (Text Prompt)</span>
                </Link>
                <Link
                  to="/html-to-svg"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>HTML to SVG Vector</span>
                </Link>
                <Link
                  to="/canvas-to-svg"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  <span>Canvas 2D JS to SVG</span>
                </Link>
                <Link
                  to="/svg-to-favicon-pack"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-brand-500/20 hover:text-brand-300 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>SVG to Favicon Pack</span>
                </Link>

                <div className="my-1 border-t border-dark-border/60" />

                <Link
                  to="/alternatives/picsvg"
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                >
                  <span>Picsvg Alternative</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-200">100% Private</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action & Privacy Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>100% Client-Side</span>
          </div>

          <Link
            to="/tools/favicon-generator"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow transition-all"
          >
            <Wand2 className="w-3.5 h-3.5" />
            Make Favicon
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-hover"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-dark-border bg-dark-bg p-4 space-y-2 animate-in fade-in">
          <Link
            to="/tools/logo-maker"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-dark-hover"
          >
            Logo Studio
          </Link>
          <Link
            to="/tools/favicon-generator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-dark-hover"
          >
            Favicon Suite
          </Link>
          <Link
            to="/tools/svg-optimizer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-dark-hover"
          >
            SVG Optimizer
          </Link>
          <div className="pt-2 border-t border-dark-border/60">
            <div className="flex items-center justify-between px-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Direct Converters</span>
              <Link
                to="/alternatives/picsvg"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-semibold text-brand-400 hover:text-brand-300"
              >
                vs Picsvg
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1.5">
              <Link to="/png-to-svg" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-brand-300 font-medium hover:bg-dark-hover rounded">PNG to SVG</Link>
              <Link to="/jpg-to-svg" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-brand-300 font-medium hover:bg-dark-hover rounded">JPG to SVG</Link>
              <Link to="/image-to-svg" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-brand-300 font-medium hover:bg-dark-hover rounded">Image to SVG</Link>
              <Link to="/svg-to-png" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-slate-300 hover:bg-dark-hover rounded">SVG to PNG</Link>
              <Link to="/svg-to-ico" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-slate-300 hover:bg-dark-hover rounded">SVG to ICO</Link>
              <Link to="/svg-to-astro" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-amber-300 hover:bg-dark-hover rounded">SVG to Astro</Link>
            </div>
            <div className="mt-2 pt-2 border-t border-dark-border/40 px-3">
              <Link
                to="/alternatives/picsvg"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                <span>⚡ Picsvg Alternative (100% Private)</span>
                <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">Free</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
