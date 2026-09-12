import React, { useState } from 'react';
import {
  Download, Copy, Check, Sparkles, ChevronDown, Image as ImageIcon,
  FileCode, Layers, Zap, ExternalLink, Shield, Scissors
} from 'lucide-react';
import { exportAssetAs, ExportTargetFormat, MultiFormatExportOptions } from '../../lib/multi-format-exporter';

interface InstantMultiFormatExporterProps {
  source: string; // SVG markup or Image Data URL
  filename?: string;
  className?: string;
  variant?: 'bar' | 'panel' | 'dropdown-only';
  options?: MultiFormatExportOptions;
}

export const InstantMultiFormatExporter: React.FC<InstantMultiFormatExporterProps> = ({
  source,
  filename = 'vectorforge-asset',
  className = '',
  variant = 'bar',
  options = {},
}) => {
  const [activeFormat, setActiveFormat] = useState<ExportTargetFormat | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [pngResolution, setPngResolution] = useState<number>(2048);
  const [transparentAlpha, setTransparentAlpha] = useState<boolean>(true);

  const handleExport = async (format: ExportTargetFormat) => {
    if (!source) return;
    setIsExporting(true);
    setActiveFormat(format);
    setDropdownOpen(false);

    try {
      const res = await exportAssetAs(source, format, {
        ...options,
        baseFilename: filename,
        transparent: transparentAlpha,
      });

      if (res.success) {
        if (format.startsWith('data-uri') || (format === 'svg' && res.copiedText)) {
          setCopiedFormat(format);
          setTimeout(() => setCopiedFormat(null), 2000);
        }
        setStatusMessage(res.message);
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        alert(res.message || 'Export failed. Please check image format.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
      setActiveFormat(null);
    }
  };

  const handleCopySvgCode = async () => {
    if (!source) return;
    try {
      await navigator.clipboard.writeText(source);
      setCopiedFormat('copy-svg');
      setTimeout(() => setCopiedFormat(null), 2000);
      setStatusMessage('Copied raw SVG code!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // VARIANT: FULL PANEL (Card layout matching GeminiStudio)
  // -------------------------------------------------------------
  if (variant === 'panel') {
    return (
      <div className={`glass-card rounded-2xl p-5 border border-dark-border space-y-4 relative ${className}`}>
        <div className="flex items-center justify-between border-b border-dark-border/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Instant Multi-Format Exporters
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Client-Side 0 Server Upload
          </span>
        </div>

        {/* Primary Row: Vector & Framework Formats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* SVG Vector */}
          <button
            onClick={() => handleExport('svg')}
            disabled={isExporting || !source}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-xs font-semibold text-brand-300 hover:text-white transition-all shadow-sm disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>SVG Vector</span>
          </button>

          {/* Windows / Web ICO */}
          <button
            onClick={() => handleExport('ico')}
            disabled={isExporting || !source}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm disabled:opacity-50"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Favicon (.ico)</span>
          </button>

          {/* Astro Component */}
          <button
            onClick={() => handleExport('astro')}
            disabled={isExporting || !source}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-semibold text-amber-300 hover:text-white transition-all shadow-sm disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Astro (.astro)</span>
          </button>

          {/* WebP Next-Gen */}
          <button
            onClick={() => handleExport('webp-1024')}
            disabled={isExporting || !source}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm disabled:opacity-50"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>WebP 1024px</span>
          </button>
        </div>

        {/* Secondary Row: High-DPI PNG Rasterizer */}
        <div className="p-3.5 rounded-xl bg-dark-surface/50 border border-dark-border space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-brand-400" />
              <span className="font-semibold text-white">Rasterize High-DPI PNG:</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={pngResolution}
                onChange={(e) => setPngResolution(Number(e.target.value))}
                className="px-2 py-1 rounded-lg bg-dark-input border border-dark-border text-xs text-white focus:outline-none font-mono"
              >
                <option value={512}>512 × 512 px (1x Standard)</option>
                <option value={1024}>1024 × 1024 px (2x HD)</option>
                <option value={2048}>2048 × 2048 px (4x Retina)</option>
                <option value={4096}>4096 × 4096 px (8x Ultra-HD)</option>
              </select>

              <button
                onClick={() => handleExport(`png-${pngResolution}` as ExportTargetFormat)}
                disabled={isExporting || !source}
                className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-xs transition-all shadow-glow-sm disabled:opacity-50 flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Save PNG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tertiary Row: Quick Clipboard & Code Embeds */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-dark-border/60">
          <span className="text-[11px] text-slate-400">Quick Code Embed:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={handleCopySvgCode}
              className="px-2.5 py-1 rounded-lg bg-dark-surface hover:bg-dark-hover border border-dark-border text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedFormat === 'copy-svg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedFormat === 'copy-svg' ? 'Copied SVG' : 'Copy SVG'}</span>
            </button>

            <button
              onClick={() => handleExport('data-uri-css')}
              className="px-2.5 py-1 rounded-lg bg-dark-surface hover:bg-dark-hover border border-dark-border text-[11px] text-brand-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <FileCode className="w-3 h-3 text-brand-400" />
              <span>CSS Data URI</span>
            </button>

            <button
              onClick={() => handleExport('apple-touch-icon')}
              className="px-2.5 py-1 rounded-lg bg-dark-surface hover:bg-dark-hover border border-dark-border text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ImageIcon className="w-3 h-3 text-emerald-400" />
              <span>iOS Icon</span>
            </button>
          </div>
        </div>

        {/* Toast status */}
        {statusMessage && (
          <div className="absolute left-4 -top-8 z-50 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 shadow-lg backdrop-blur">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT: BAR (Compact horizontal pill row)
  // -------------------------------------------------------------
  return (
    <div className={`relative flex flex-wrap items-center gap-1.5 ${className}`}>
      {variant !== 'dropdown-only' && (
        <div className="flex flex-wrap items-center gap-1 bg-dark-bg/85 p-1 rounded-xl border border-dark-border shadow-sm">
          {/* SVG Vector */}
          <button
            onClick={() => handleExport('svg')}
            disabled={isExporting || !source}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-300 hover:text-white transition-all flex items-center gap-1 disabled:opacity-50"
            title="Download scalable SVG vector file"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>SVG</span>
          </button>

          {/* PNG 2K Retina */}
          <button
            onClick={() => handleExport('png-2048')}
            disabled={isExporting || !source}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-200 hover:text-white transition-all flex items-center gap-1 disabled:opacity-50"
            title="Download 2048x2048 px High-DPI PNG"
          >
            <Download className="w-3 h-3 text-slate-400" />
            <span>PNG 2K</span>
          </button>

          {/* PNG 4K Ultra */}
          <button
            onClick={() => handleExport('png-4096')}
            disabled={isExporting || !source}
            className="hidden sm:flex px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-200 hover:text-white transition-all items-center gap-1 disabled:opacity-50"
            title="Download 4096x4096 px 4K Ultra-HD PNG"
          >
            <Download className="w-3 h-3 text-purple-400" />
            <span>PNG 4K</span>
          </button>

          {/* WebP Next-Gen */}
          <button
            onClick={() => handleExport('webp-1024')}
            disabled={isExporting || !source}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-200 hover:text-white transition-all flex items-center gap-1 disabled:opacity-50"
            title="Download lightweight next-gen WebP image (1024px)"
          >
            <ImageIcon className="w-3 h-3 text-blue-400" />
            <span>WebP</span>
          </button>

          {/* Windows / Web Favicon .ICO */}
          <button
            onClick={() => handleExport('ico')}
            disabled={isExporting || !source}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-200 hover:text-white transition-all flex items-center gap-1 disabled:opacity-50"
            title="Download binary multi-resolution .ico (16, 32, 48px)"
          >
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>.ICO</span>
          </button>

          {/* Astro Component */}
          <button
            onClick={() => handleExport('astro')}
            disabled={isExporting || !source}
            className="hidden sm:flex px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-white transition-all items-center gap-1 disabled:opacity-50"
            title="Download typed .astro framework component"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>.astro</span>
          </button>

          {/* Copy SVG Code */}
          <button
            onClick={handleCopySvgCode}
            disabled={!source}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-300 hover:text-white transition-all flex items-center gap-1"
            title="Copy raw SVG code to clipboard"
          >
            {copiedFormat === 'copy-svg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
            <span>{copiedFormat === 'copy-svg' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      )}

      {/* More Formats Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-3 py-1.5 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span>More Formats</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl bg-[#0d121f] border border-dark-border/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 block py-1">
              Raster Resolutions
            </span>
            <button
              onClick={() => handleExport('png-512')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-dark-hover text-xs text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>PNG 1x (512×512)</span>
              <span className="text-[10px] font-mono text-slate-500">Standard</span>
            </button>
            <button
              onClick={() => handleExport('png-1024')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-dark-hover text-xs text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>PNG 2x (1024×1024)</span>
              <span className="text-[10px] font-mono text-slate-500">HD</span>
            </button>
            <button
              onClick={() => handleExport('jpeg-1024')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-dark-hover text-xs text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>JPEG (Solid Background)</span>
              <span className="text-[10px] font-mono text-slate-500">1024px</span>
            </button>
            <button
              onClick={() => handleExport('apple-touch-icon')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-dark-hover text-xs text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>Apple Touch Icon</span>
              <span className="text-[10px] font-mono text-slate-500">180×180</span>
            </button>

            <div className="my-1 border-t border-dark-border/60" />

            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 block py-1">
              Code & Web Embeds
            </span>
            <button
              onClick={() => handleExport('data-uri-css')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-dark-hover text-xs text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>Copy CSS Data URI</span>
              <span className="text-[10px] text-brand-400 font-mono">background</span>
            </button>
            <button
              onClick={() => handleExport('data-uri-html')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-dark-hover text-xs text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>Copy HTML &lt;img&gt; Tag</span>
              <span className="text-[10px] text-purple-400 font-mono">&lt;img&gt;</span>
            </button>
            <button
              onClick={() => handleExport('data-uri-base64')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-dark-hover text-xs text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>Copy Base64 String</span>
              <span className="text-[10px] text-emerald-400 font-mono">base64</span>
            </button>
          </div>
        )}
      </div>

      {/* Live Toast Feedback Badge */}
      {statusMessage && (
        <div className="absolute left-0 -top-8 z-50 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 shadow-lg backdrop-blur">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
};
