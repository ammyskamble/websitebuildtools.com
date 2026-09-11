import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const formats = [
    {
      format: 'SVG',
      badge: 'Recommended for Vectors',
      scalable: true,
      transparency: true,
      fileSize: 'Ultra Tiny (1-10 KB)',
      support: 'All Modern Browsers (99.8%)',
      bestFor: 'Logos, Favicons, UI Icons, Illustrations',
    },
    {
      format: 'PNG',
      badge: 'High Fidelity Raster',
      scalable: false,
      transparency: true,
      fileSize: 'Medium (20-250 KB)',
      support: 'Universal (100%)',
      bestFor: 'High-res exports, Apple Touch Icon, Android Chrome',
    },
    {
      format: 'ICO',
      badge: 'Legacy Standard',
      scalable: false,
      transparency: true,
      fileSize: 'Small (5-15 KB)',
      support: 'Universal (100%)',
      bestFor: 'Multi-resolution legacy browser tab fallback',
    },
    {
      format: 'WebP',
      badge: 'Modern Web Raster',
      scalable: false,
      transparency: true,
      fileSize: 'Tiny (10-80 KB)',
      support: 'Modern Browsers (97%)',
      bestFor: 'Web graphics with high compression',
    },
    {
      format: 'JPG',
      badge: 'No Alpha Channel',
      scalable: false,
      transparency: false,
      fileSize: 'Medium (30-150 KB)',
      support: 'Universal (100%)',
      bestFor: 'Solid background artwork and photos',
    },
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Image & Vector Format Matrix
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Compare format capabilities to pick the optimal export for your website or design system.
        </p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-dark-border shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-dark-surface/80 border-b border-dark-border text-slate-300 uppercase text-[11px] font-semibold tracking-wider">
            <tr>
              <th className="px-5 py-4">Format</th>
              <th className="px-4 py-4">Vector Scalable</th>
              <th className="px-4 py-4">Transparency</th>
              <th className="px-4 py-4">File Size</th>
              <th className="px-4 py-4">Browser Support</th>
              <th className="px-5 py-4">Recommended Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border/40">
            {formats.map((row, i) => (
              <tr key={i} className="hover:bg-dark-hover/30 transition-colors">
                <td className="px-5 py-4 font-bold text-white whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span>{row.format}</span>
                    {row.format === 'SVG' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-medium border border-brand-500/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Best
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {row.scalable ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                      <Check className="w-4 h-4" /> Infinite DPI
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <X className="w-4 h-4" /> Raster Pixel
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {row.transparency ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <Check className="w-4 h-4" /> Alpha 8-bit
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-400">
                      <X className="w-4 h-4" /> Solid Only
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-slate-300 font-mono text-xs whitespace-nowrap">
                  {row.fileSize}
                </td>
                <td className="px-4 py-4 text-slate-300 whitespace-nowrap">{row.support}</td>
                <td className="px-5 py-4 text-slate-400 text-xs">{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
