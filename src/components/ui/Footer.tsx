import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, Zap, Heart } from 'lucide-react';
import { SvgFavLogo } from './SvgFavLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dark-border bg-dark-bg/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <SvgFavLogo size={32} />
              <span className="font-bold text-white tracking-tight text-base">SvgFav.com</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The high-performance, privacy-first vector and favicon studio. Craft logos, generate production favicon bundles, and convert vector formats 100% in-browser.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero server storage. 100% private.</span>
            </div>
          </div>

          {/* Core Tools */}
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
              <li>
                <Link to="/tools/gemini-ai" className="hover:text-brand-400 transition-colors">
                  Gemini Prompt Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* AI & Code to Vector */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">AI & Code to Vector</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/ai-svg-generator" className="hover:text-brand-400 transition-colors font-medium text-brand-300">
                  AI SVG Generator (Prompt)
                </Link>
              </li>
              <li>
                <Link to="/html-to-svg" className="hover:text-brand-400 transition-colors">
                  HTML to SVG Vector
                </Link>
              </li>
              <li>
                <Link to="/css-to-svg" className="hover:text-brand-400 transition-colors">
                  CSS to SVG Badges
                </Link>
              </li>
              <li>
                <Link to="/canvas-to-svg" className="hover:text-brand-400 transition-colors">
                  Canvas 2D JS to SVG
                </Link>
              </li>
              <li>
                <Link to="/svg-to-favicon-pack" className="hover:text-brand-400 transition-colors">
                  SVG to Favicon Pack
                </Link>
              </li>
            </ul>
          </div>

          {/* Converters */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Vector Converters</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/png-to-svg" className="hover:text-brand-400 transition-colors font-medium text-brand-300/90">
                  PNG to SVG (In-Browser)
                </Link>
              </li>
              <li>
                <Link to="/jpg-to-svg" className="hover:text-brand-400 transition-colors font-medium text-brand-300/90">
                  JPG to SVG (No 4MB Limit)
                </Link>
              </li>
              <li>
                <Link to="/image-to-svg" className="hover:text-brand-400 transition-colors font-medium text-brand-300/90">
                  Image to SVG (Cricut)
                </Link>
              </li>
              <li>
                <Link to="/svg-to-png" className="hover:text-brand-400 transition-colors">
                  SVG to PNG (High-DPI 4K)
                </Link>
              </li>
              <li>
                <Link to="/svg-to-ico" className="hover:text-brand-400 transition-colors">
                  SVG to Windows ICO
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/alternatives/picsvg" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold flex items-center gap-1">
                  <span>⚡ Picsvg Alternative</span>
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

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Company & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy (GDPR / LGPD)
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-brand-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-brand-400 transition-colors">
                  About SvgFav.com
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-brand-400 transition-colors font-medium text-brand-300">
                  Contact Us & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Languages Strip */}
        <div className="mt-10 pt-6 border-t border-dark-border/40 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">International Editions:</span>
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">🇺🇸 United States (EN)</Link>
              <span>·</span>
              <Link to="/de/privacy-policy" className="hover:text-slate-300 transition-colors">🇩🇪 Deutschland (DE)</Link>
              <span>·</span>
              <Link to="/fr/privacy-policy" className="hover:text-slate-300 transition-colors">🇫🇷 France (FR)</Link>
              <span>·</span>
              <Link to="/pt/privacy-policy" className="hover:text-slate-300 transition-colors">🇧🇷 Brasil (PT)</Link>
              <span>·</span>
              <Link to="/es/privacy-policy" className="hover:text-slate-300 transition-colors">🇪🇸 España (ES)</Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/about-us" className="hover:text-slate-300 transition-colors">About</Link>
            <span>·</span>
            <Link to="/contact-us" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-dark-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SvgFav.com Studio. Open web utility.</p>
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
