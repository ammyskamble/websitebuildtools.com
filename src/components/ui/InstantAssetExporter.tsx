import React, { useState } from 'react';
import {
  Download,
  FileCode,
  Globe,
  Archive,
  Sparkles,
  Check,
  Loader2,
  Package,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  downloadSingleSvg,
  downloadSingleFaviconIco,
  generateFaviconPack,
  generateCompleteAssetPack,
} from '../../lib/zip-generator';

export interface InstantAssetExporterProps {
  /** The SVG markup or raster image Data URL */
  svgOrImageUrl: string;
  /** Base filename for exported assets (without extension) */
  baseFilename?: string;
  /** App/Project name for manifest and metadata */
  appName?: string;
  /** Brand theme color for mobile manifest */
  themeColor?: string;
  /** UI presentation style */
  layout?: 'bar' | 'panel';
  /** Additional styling class */
  className?: string;
}

export const InstantAssetExporter: React.FC<InstantAssetExporterProps> = ({
  svgOrImageUrl,
  baseFilename = 'vectorforge-asset',
  appName = 'My Web Application',
  themeColor = '#3b82f6',
  layout = 'bar',
  className = '',
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [successAction, setSuccessAction] = useState<string | null>(null);

  const hasSource = Boolean(svgOrImageUrl && svgOrImageUrl.trim().length > 0);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
  };

  const handleExportSvg = () => {
    if (!hasSource) return;
    try {
      setActiveAction('svg');
      downloadSingleSvg(svgOrImageUrl, `${baseFilename}.svg`);
      setSuccessAction('svg');
      triggerConfetti();
      setTimeout(() => setSuccessAction(null), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to download SVG vector.');
    } finally {
      setActiveAction(null);
    }
  };

  const handleExportIco = async () => {
    if (!hasSource) return;
    try {
      setActiveAction('ico');
      await downloadSingleFaviconIco(svgOrImageUrl, `${baseFilename}.ico`);
      setSuccessAction('ico');
      triggerConfetti();
      setTimeout(() => setSuccessAction(null), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to generate .ICO favicon.');
    } finally {
      setActiveAction(null);
    }
  };

  const handleExportFaviconPack = async () => {
    if (!hasSource) return;
    try {
      setActiveAction('favicon-pack');
      await generateFaviconPack(svgOrImageUrl, {
        appName,
        shortName: appName.slice(0, 12),
        themeColor,
        baseFilename: `${baseFilename}-favicon-pack`,
      });
      setSuccessAction('favicon-pack');
      triggerConfetti();
      setTimeout(() => setSuccessAction(null), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to build production favicon pack.');
    } finally {
      setActiveAction(null);
    }
  };

  const handleExportAllRequired = async () => {
    if (!hasSource) return;
    try {
      setActiveAction('all-required');
      await generateCompleteAssetPack(svgOrImageUrl, {
        appName,
        shortName: appName.slice(0, 12),
        themeColor,
        baseFilename: `${baseFilename}-production`,
      });
      setSuccessAction('all-required');
      triggerConfetti();
      setTimeout(() => setSuccessAction(null), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to build complete asset bundle.');
    } finally {
      setActiveAction(null);
    }
  };

  if (layout === 'bar') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {/* 1. Download SVG Vector */}
        <button
          onClick={handleExportSvg}
          disabled={!hasSource || activeAction !== null}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border hover:border-brand-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all active:scale-95 disabled:opacity-40 shadow-sm"
          title="Download scalable SVG master vector"
        >
          {successAction === 'svg' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : activeAction === 'svg' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-400" />
          ) : (
            <FileCode className="w-3.5 h-3.5 text-brand-400" />
          )}
          <span>Download SVG</span>
        </button>

        {/* 2. Download Favicon (.ico) */}
        <button
          onClick={handleExportIco}
          disabled={!hasSource || activeAction !== null}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border hover:border-purple-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all active:scale-95 disabled:opacity-40 shadow-sm"
          title="Download Windows multi-resolution .ICO (16x16, 32x32, 48x48)"
        >
          {successAction === 'ico' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : activeAction === 'ico' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
          ) : (
            <Globe className="w-3.5 h-3.5 text-purple-400" />
          )}
          <span>Favicon (.ico)</span>
        </button>

        {/* 3. Download Production Favicon Pack (ZIP) */}
        <button
          onClick={handleExportFaviconPack}
          disabled={!hasSource || activeAction !== null}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 font-semibold text-xs transition-all active:scale-95 disabled:opacity-40 shadow-sm"
          title="Download production favicon suite (iOS, Android, PWA, Windows, webmanifest)"
        >
          {successAction === 'favicon-pack' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : activeAction === 'favicon-pack' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          ) : (
            <Archive className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <span>Favicon Pack (.zip)</span>
        </button>

        {/* 4. Download All Required Files (ZIP) */}
        <button
          onClick={handleExportAllRequired}
          disabled={!hasSource || activeAction !== null}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-bold text-xs shadow-glow transition-all active:scale-95 disabled:opacity-40"
          title="1-Click: Download All Required Files (SVG, Favicon .ICO, Favicon Pack, 1K/2K PNGs, and Manifest)"
        >
          {successAction === 'all-required' ? (
            <Check className="w-3.5 h-3.5 text-emerald-300" />
          ) : activeAction === 'all-required' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          )}
          <span>Download All Required Files</span>
        </button>
      </div>
    );
  }

  // layout === 'panel'
  return (
    <div className={`w-full glass-card rounded-2xl p-5 sm:p-6 border border-dark-border space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-border/70">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Instant Multi-Format Exporters</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-mono">
                Single Input Production
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Download SVG, Favicon, Production Favicon Pack, or All Required Files in a single click.
            </p>
          </div>
        </div>

        {/* Highlight All-in-One Button */}
        <button
          onClick={handleExportAllRequired}
          disabled={!hasSource || activeAction !== null}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-bold text-xs shadow-glow transition-all active:scale-95 disabled:opacity-40"
        >
          {successAction === 'all-required' ? (
            <Check className="w-4 h-4 text-emerald-300" />
          ) : activeAction === 'all-required' ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-300" />
          )}
          <span>Download All Required Files (ZIP)</span>
        </button>
      </div>

      {/* Grid of 3 Individual Exporters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: SVG Vector */}
        <button
          onClick={handleExportSvg}
          disabled={!hasSource || activeAction !== null}
          className="group flex flex-col items-start p-3.5 rounded-xl bg-dark-surface/80 hover:bg-dark-surface border border-dark-border hover:border-brand-500/50 transition-all text-left disabled:opacity-40"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
              {successAction === 'svg' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : activeAction === 'svg' ? (
                <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
              ) : (
                <FileCode className="w-4 h-4" />
              )}
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-400">
              .SVG
            </span>
          </div>
          <span className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
            Download SVG Vector
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5">
            Scalable master vector for web, Illustrator, and laser cut.
          </span>
        </button>

        {/* Card 2: Favicon (.ico) */}
        <button
          onClick={handleExportIco}
          disabled={!hasSource || activeAction !== null}
          className="group flex flex-col items-start p-3.5 rounded-xl bg-dark-surface/80 hover:bg-dark-surface border border-dark-border hover:border-purple-500/50 transition-all text-left disabled:opacity-40"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              {successAction === 'ico' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : activeAction === 'ico' ? (
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              ) : (
                <Globe className="w-4 h-4" />
              )}
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">
              .ICO
            </span>
          </div>
          <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
            Download Favicon (.ico)
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5">
            Windows multi-frame binary icon (16x16, 32x32, 48x48).
          </span>
        </button>

        {/* Card 3: Production Favicon Pack */}
        <button
          onClick={handleExportFaviconPack}
          disabled={!hasSource || activeAction !== null}
          className="group flex flex-col items-start p-3.5 rounded-xl bg-dark-surface/80 hover:bg-dark-surface border border-dark-border hover:border-emerald-500/50 transition-all text-left disabled:opacity-40"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              {successAction === 'favicon-pack' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : activeAction === 'favicon-pack' ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              ) : (
                <Archive className="w-4 h-4" />
              )}
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              .ZIP
            </span>
          </div>
          <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
            Production Favicon Pack
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5">
            Complete bundle with manifest, Apple Touch, Android & HTML tags.
          </span>
        </button>
      </div>
    </div>
  );
};
