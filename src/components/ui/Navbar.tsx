import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, ChevronDown, Wand2, Menu, X, Sun, Moon, Home } from 'lucide-react';
import { SvgFavLogo } from './SvgFavLogo';
import { useTheme } from '../../contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const isConverterActive =
    location.pathname.startsWith('/convert') ||
    [
      '/png-to-svg',
      '/jpg-to-svg',
      '/image-to-svg',
      '/svg-to-png',
      '/svg-to-jpg',
      '/svg-to-ico',
      '/svg-to-data-uri',
      '/svg-to-astro',
    ].includes(location.pathname);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-dark-border/80 bg-white/95 dark:bg-dark-bg/90 backdrop-blur-md transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <SvgFavLogo size={40} className="drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors">
              SvgFav.com
              <span className="text-[10px] px-1.5 py-0.5 font-medium rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30">
                PRO
              </span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1 hidden sm:inline transition-colors">
              All-in-One Vector &amp; Favicon Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover border border-transparent'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/tools/logo-maker"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/tools/logo-maker')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover border border-transparent'
            }`}
          >
            Logo Studio
          </Link>
          <Link
            to="/favicon-generator"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/favicon-generator') || isActive('/tools/favicon-generator')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover border border-transparent'
            }`}
          >
            Favicon Suite
          </Link>
          <Link
            to="/svg-optimizer"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/svg-optimizer') || isActive('/tools/svg-optimizer')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover border border-transparent'
            }`}
          >
            SVG Optimizer
          </Link>

          {/* Converters Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                dropdownOpen
                  ? 'bg-slate-100 dark:bg-dark-hover text-slate-900 dark:text-white border border-slate-300 dark:border-dark-border/60'
                  : isConverterActive
                  ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover border border-transparent'
              }`}
              aria-expanded={dropdownOpen}
            >
              <span>Converters</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1.5 w-64 z-50 animate-in fade-in slide-in-from-top-1"
              >
                <div className="p-2.5 rounded-2xl bg-white dark:bg-dark-card shadow-2xl border border-slate-200 dark:border-dark-border">
                <span className="px-3 py-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Raster To Vector
                </span>
                <Link
                  to="/png-to-svg"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 font-medium">PNG to SVG (Auto-Trace)</span>
                </Link>
                <Link
                  to="/jpg-to-svg"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 font-medium">JPG to SVG (No 4MB Limit)</span>
                </Link>
                <Link
                  to="/image-to-svg"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 font-medium">Image to SVG (Cricut / Laser)</span>
                </Link>

                <div className="my-2 border-t border-slate-100 dark:border-dark-border/60" />

                <span className="px-3 py-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Vector To Raster &amp; Code
                </span>
                <Link
                  to="/"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 font-medium">SVG to PNG (Home Studio)</span>
                </Link>
                <Link
                  to="/convert/svg-to-jpg"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 font-medium">SVG to JPG</span>
                </Link>
                <Link
                  to="/svg-to-ico"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 font-medium">SVG to ICO (Favicon Container)</span>
                </Link>
                <Link
                  to="/convert/svg-to-data-uri"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 font-medium">SVG to Data URI (CSS &amp; Base64)</span>
                </Link>
                <Link
                  to="/svg-to-astro"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-amber-700 dark:text-amber-300 font-medium">SVG to Astro (.astro)</span>
                </Link>

                <div className="my-2 border-t border-slate-100 dark:border-dark-border/60" />

                <Link
                  to="/alternatives/picsvg"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-colors"
                >
                  <span>Picsvg Alternative</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-bold">100% Private</span>
                </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Theme Toggle, Privacy Badge, CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Day / Night Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover border border-slate-200 dark:border-dark-border/60 transition-all flex items-center justify-center group"
            title={theme === 'dark' ? 'Switch to Day theme (Light mode)' : 'Switch to Night theme (Dark mode)'}
            aria-label="Toggle day and night theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-brand-600 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>100% Client-Side</span>
          </div>

          <Link
            to="/favicon-generator"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow transition-all"
          >
            <Wand2 className="w-3.5 h-3.5 text-white" />
            <span className="text-white">Make Favicon</span>
          </Link>
        </div>

        {/* Mobile menu toggle & theme button */}
        <div className="md:hidden flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
            title={theme === 'dark' ? 'Switch to Day theme' : 'Switch to Night theme'}
            aria-label="Toggle day and night theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-brand-600" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-hover"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-bg p-4 space-y-2 animate-in fade-in transition-colors shadow-lg">
          {/* Day / Night Theme Row in Mobile Menu */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs mb-3">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Appearance Theme</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-dark-hover text-slate-800 dark:text-slate-200 font-medium border border-slate-200 dark:border-dark-border transition-colors shadow-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Day Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-brand-600" />
                  <span>Night Mode</span>
                </>
              )}
            </button>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-hover'
            }`}
          >
            <Home className="w-4 h-4 text-brand-500" />
            <span>Home</span>
          </Link>

          <Link
            to="/tools/logo-maker"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/tools/logo-maker')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-hover'
            }`}
          >
            Logo Studio
          </Link>
          <Link
            to="/favicon-generator"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/favicon-generator') || isActive('/tools/favicon-generator')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-hover'
            }`}
          >
            Favicon Suite
          </Link>
          <Link
            to="/svg-optimizer"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/svg-optimizer') || isActive('/tools/svg-optimizer')
                ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-hover'
            }`}
          >
            SVG Optimizer
          </Link>

          <div className="pt-2 border-t border-slate-200 dark:border-dark-border/60">
            <div className="flex items-center justify-between px-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Direct Converters</span>
              <Link
                to="/alternatives/picsvg"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                vs Picsvg
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1.5">
              <Link to="/png-to-svg" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-brand-600 dark:text-brand-300 font-medium hover:bg-slate-100 dark:hover:bg-dark-hover rounded-lg">PNG to SVG</Link>
              <Link to="/jpg-to-svg" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-brand-600 dark:text-brand-300 font-medium hover:bg-slate-100 dark:hover:bg-dark-hover rounded-lg">JPG to SVG</Link>
              <Link to="/image-to-svg" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-brand-600 dark:text-brand-300 font-medium hover:bg-slate-100 dark:hover:bg-dark-hover rounded-lg">Image to SVG</Link>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-hover rounded-lg">SVG to PNG</Link>
              <Link to="/svg-to-ico" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-hover rounded-lg">SVG to ICO</Link>
              <Link to="/svg-to-astro" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-xs text-amber-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-dark-hover rounded-lg">SVG to Astro</Link>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-dark-border/40 px-3">
              <Link
                to="/alternatives/picsvg"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-600"
              >
                <span>⚡ Picsvg Alternative (100% Private)</span>
                <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">Free</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
