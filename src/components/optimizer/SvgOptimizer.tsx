import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles, Download, Copy, Check, Upload, Sliders,
  Eye, Code2, ArrowRight, Shield, Zap, RefreshCw, Layers
} from 'lucide-react';
import { optimizeSvg, formatSvgCode, OptimizeOptions, OptimizationResult } from '../../lib/svg-optimizer';
import { downloadText } from '../../lib/canvas-renderer';
import { convertSvgToAstroComponent, downloadAstroFile } from '../../lib/astro-generator';
import { InstantAssetExporter } from '../ui/InstantAssetExporter';

const DEFAULT_SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" viewBox="0 0 500 500" width="500" height="500">
  <!-- Generator: Adobe Illustrator 28.0, SVG Export Plug-In -->
  <!-- Inkscape metadata and editor comments -->
  <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" id="namedview1" />
  <metadata id="metadata1234">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format></cc:Work>
    </rdf:RDF>
  </metadata>
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0.000000%" stop-color="#3b82f6" />
      <stop offset="100.000000%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
  <g id="unused-empty-group"></g>
  <g id="hidden-layer" style="display:none">
    <circle cx="100.23456" cy="100.65432" r="50.12345" fill="#ff0000" />
  </g>
  <rect x="25.43219" y="25.87654" width="449.12345" height="449.12345" rx="90.54321" fill="url(#g1)" />
  <path d="M 150.12345 150.98765 L 250.67891 350.43210 L 350.87654 150.34567 Z" fill="#ffffff" />
  <circle cx="250.45678" cy="110.12345" r="30.56789" fill="#ffffff" />
</svg>`;

export const SvgOptimizer: React.FC = () => {
  const [rawSvg, setRawSvg] = useState<string>(DEFAULT_SAMPLE_SVG);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'diff' | 'astro'>('preview');
  const [isPretty, setIsPretty] = useState(false);
  const [copiedAstro, setCopiedAstro] = useState(false);

  const [options, setOptions] = useState<OptimizeOptions>({
    removeComments: true,
    removeMetadata: true,
    removeDoctype: true,
    removeEditorData: true,
    removeEmptyContainers: true,
    removeHiddenElements: true,
    collapseWhitespace: true,
    roundPrecision: true,
    precisionDigits: 2,
  });

  const result: OptimizationResult = useMemo(() => {
    return optimizeSvg(rawSvg, options);
  }, [rawSvg, options]);

  const displayedSvgCode = useMemo(() => {
    return isPretty ? formatSvgCode(result.optimizedSvg) : result.optimizedSvg;
  }, [result.optimizedSvg, isPretty]);

  const astroCode = useMemo(() => {
    return convertSvgToAstroComponent(result.optimizedSvg, { componentName: 'OptimizedIcon' });
  }, [result.optimizedSvg]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && content.includes('<svg')) {
        setRawSvg(content);
      } else {
        alert('Please upload a valid SVG file.');
      }
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.optimizedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAstro = () => {
    navigator.clipboard.writeText(astroCode);
    setCopiedAstro(true);
    setTimeout(() => setCopiedAstro(false), 2000);
  };

  const handleDownload = () => {
    downloadText(result.optimizedSvg, 'optimized.svg');
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
    });
  };

  const handleDownloadAstro = () => {
    downloadAstroFile(astroCode, 'OptimizedIcon.astro');
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>SVG Optimizer & Code Cleaner</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30">
              SVGOMG-Engine
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Minify SVG code, strip unnecessary editor junk, round coordinates, and boost web performance.
          </p>
        </div>

        {/* Action Buttons & Instant Exporters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-card text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy SVG'}</span>
          </button>

          <button
            onClick={handleDownloadAstro}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold text-xs transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>.astro</span>
          </button>

          <InstantAssetExporter
            svgOrImageUrl={result.optimizedSvg}
            baseFilename="optimized-vector"
            appName="SVG Optimizer"
            layout="bar"
          />
        </div>
      </div>

      {/* Real-Time Savings Metric Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-dark-border flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Original Size</span>
            <span className="text-base font-bold font-mono text-slate-300">
              {(result.originalBytes / 1024).toFixed(2)} KB
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Optimized Size</span>
            <span className="text-base font-bold font-mono text-emerald-400">
              {(result.optimizedBytes / 1024).toFixed(2)} KB
            </span>
          </div>

          <div className="hidden sm:block border-l border-dark-border pl-6">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Net Reduction</span>
            <span className="text-base font-bold font-mono text-brand-400">
              -{(result.savedBytes / 1024).toFixed(2)} KB
            </span>
          </div>
        </div>

        {/* Big Savings Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
          <Zap className="w-4 h-4" />
          <span>-{result.savingsPercentage}% Smaller</span>
        </div>
      </div>

      {/* Main Grid: Visual Diff / Editor on Left, Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual / Code View */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel rounded-2xl border border-dark-border overflow-hidden">
            {/* View Switcher Header */}
            <div className="p-3 border-b border-dark-border/80 flex items-center justify-between bg-dark-surface/50">
              <div className="flex items-center gap-1 bg-dark-bg p-1 rounded-lg border border-dark-border text-xs">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'preview' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual Preview</span>
                </button>
                <button
                  onClick={() => setViewMode('diff')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'diff' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Side-by-Side Diff</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('code')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'code' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('astro')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'astro' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Astro (.astro)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {viewMode === 'code' && (
                  <button
                    type="button"
                    onClick={() => setIsPretty(!isPretty)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-300"
                  >
                    {isPretty ? 'Minified View' : 'Format / Prettify'}
                  </button>
                )}

                <label className="text-xs px-3 py-1 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-300 cursor-pointer flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload SVG</span>
                  <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* View Contents */}
            {viewMode === 'preview' && (
              <div className="p-8 sm:p-12 flex items-center justify-center min-h-[380px] bg-checkered">
                <div
                  className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-xl flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: result.optimizedSvg }}
                />
              </div>
            )}

            {viewMode === 'diff' && (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-checkered min-h-[380px]">
                {/* Original */}
                <div className="flex flex-col items-center bg-dark-card/90 rounded-xl p-4 border border-dark-border">
                  <span className="text-xs font-semibold text-rose-400 mb-3">
                    Original ({(result.originalBytes / 1024).toFixed(1)} KB)
                  </span>
                  <div
                    className="w-48 h-48 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: result.originalSvg }}
                  />
                </div>

                {/* Optimized */}
                <div className="flex flex-col items-center bg-dark-card/90 rounded-xl p-4 border border-emerald-500/40">
                  <span className="text-xs font-semibold text-emerald-400 mb-3">
                    Optimized ({(result.optimizedBytes / 1024).toFixed(1)} KB)
                  </span>
                  <div
                    className="w-48 h-48 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: result.optimizedSvg }}
                  />
                </div>
              </div>
            )}

            {viewMode === 'code' && (
              <div className="p-4 bg-dark-bg">
                <textarea
                  value={displayedSvgCode}
                  onChange={(e) => setRawSvg(e.target.value)}
                  rows={16}
                  className="w-full font-mono text-xs text-slate-300 bg-transparent focus:outline-none leading-relaxed resize-y"
                  spellCheck={false}
                />
              </div>
            )}

            {viewMode === 'astro' && (
              <div className="p-4 bg-dark-bg space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <span className="text-amber-200">
                    ⚡ <strong>Astro Ready:</strong> Clean component with <code className="text-white bg-dark-bg/80 px-1 py-0.5 rounded">Props</code>, <code className="text-white bg-dark-bg/80 px-1 py-0.5 rounded">class:list</code> and responsive size support.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyAstro}
                      className="px-2.5 py-1 rounded-lg bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-200 text-xs font-medium flex items-center gap-1.5"
                    >
                      {copiedAstro ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAstro ? 'Copied Astro Code!' : 'Copy Code'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadAstro}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-medium flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .astro</span>
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  value={astroCode}
                  rows={16}
                  className="w-full font-mono text-xs text-amber-100/90 bg-dark-bg/60 p-3 rounded-xl border border-dark-border/80 focus:outline-none leading-relaxed resize-y"
                  spellCheck={false}
                />
              </div>
            )}
          </div>

          {/* Dedicated Instant Multi-Format Exporters Panel */}
          <InstantAssetExporter
            svgOrImageUrl={result.optimizedSvg}
            baseFilename="optimized-vector"
            appName="SVG Optimizer"
            layout="panel"
          />
        </div>

        {/* Right Column: Optimization Rules Toggles */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-400" />
                <span>Optimization Rules</span>
              </span>

              <button
                onClick={() =>
                  setOptions({
                    removeComments: true,
                    removeMetadata: true,
                    removeDoctype: true,
                    removeEditorData: true,
                    removeEmptyContainers: true,
                    removeHiddenElements: true,
                    collapseWhitespace: true,
                    roundPrecision: true,
                    precisionDigits: 2,
                  })
                }
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Reset
              </button>
            </div>

            <div className="space-y-3 text-xs divide-y divide-dark-border/40">
              <label className="flex items-center justify-between pt-2 cursor-pointer">
                <div>
                  <span className="text-slate-200 block font-medium">Remove Comments</span>
                  <span className="text-[10px] text-slate-500">Strips &lt;!-- ... --&gt; blocks</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.removeComments}
                  onChange={(e) => setOptions((o) => ({ ...o, removeComments: e.target.checked }))}
                  className="w-4 h-4 accent-brand-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between pt-2 cursor-pointer">
                <div>
                  <span className="text-slate-200 block font-medium">Remove Metadata</span>
                  <span className="text-[10px] text-slate-500">Strips &lt;metadata&gt; & RDF data</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.removeMetadata}
                  onChange={(e) => setOptions((o) => ({ ...o, removeMetadata: e.target.checked }))}
                  className="w-4 h-4 accent-brand-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between pt-2 cursor-pointer">
                <div>
                  <span className="text-slate-200 block font-medium">Strip Editor Data</span>
                  <span className="text-[10px] text-slate-500">Inkscape, Illustrator, Sketch tags</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.removeEditorData}
                  onChange={(e) => setOptions((o) => ({ ...o, removeEditorData: e.target.checked }))}
                  className="w-4 h-4 accent-brand-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between pt-2 cursor-pointer">
                <div>
                  <span className="text-slate-200 block font-medium">Remove Hidden Elements</span>
                  <span className="text-[10px] text-slate-500">Strips display="none" layers</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.removeHiddenElements}
                  onChange={(e) => setOptions((o) => ({ ...o, removeHiddenElements: e.target.checked }))}
                  className="w-4 h-4 accent-brand-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between pt-2 cursor-pointer">
                <div>
                  <span className="text-slate-200 block font-medium">Remove Empty Containers</span>
                  <span className="text-[10px] text-slate-500">Cleans empty &lt;g&gt; groups</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.removeEmptyContainers}
                  onChange={(e) => setOptions((o) => ({ ...o, removeEmptyContainers: e.target.checked }))}
                  className="w-4 h-4 accent-brand-500 rounded"
                />
              </label>

              <div className="pt-2 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-slate-200 block font-medium">Round Coordinates</span>
                    <span className="text-[10px] text-slate-500">Truncates path decimals</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.roundPrecision}
                    onChange={(e) => setOptions((o) => ({ ...o, roundPrecision: e.target.checked }))}
                    className="w-4 h-4 accent-brand-500 rounded"
                  />
                </label>

                {options.roundPrecision && (
                  <div className="flex items-center justify-between bg-dark-surface p-2 rounded-lg border border-dark-border">
                    <span className="text-slate-400 text-[11px]">Precision Decimals</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((d) => (
                        <button
                          key={d}
                          onClick={() => setOptions((o) => ({ ...o, precisionDigits: d }))}
                          className={`px-2 py-0.5 rounded text-xs ${
                            options.precisionDigits === d
                              ? 'bg-brand-500 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
