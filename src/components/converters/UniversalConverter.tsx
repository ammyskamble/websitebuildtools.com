import React, { useState, useEffect, useMemo } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import {
  Upload, Download, Copy, Check, Sliders, Image as ImageIcon,
  Sparkles, Layers, RefreshCw, FileCode, ArrowRight, Shield, Zap
} from 'lucide-react';
import { renderSvgToBlob, downloadBlob, downloadText } from '../../lib/canvas-renderer';
import { createIcoFromPngs } from '../../lib/ico-encoder';
import { vectorizeImage } from '../../lib/image-vectorizer';

export type ConverterMode =
  | 'svg-to-png'
  | 'svg-to-jpg'
  | 'svg-to-ico'
  | 'png-to-svg'
  | 'svg-to-data-uri';

interface UniversalConverterProps {
  initialMode: ConverterMode;
}

interface BatchFileItem {
  id: string;
  name: string;
  size: number;
  content: string; // SVG text or image Data URL
  status: 'pending' | 'processing' | 'done' | 'error';
  convertedBlob?: Blob;
  convertedData?: string;
}

export const UniversalConverter: React.FC<UniversalConverterProps> = ({ initialMode }) => {
  const [mode, setMode] = useState<ConverterMode>(initialMode);

  // Settings
  const [resolutionMultiplier, setResolutionMultiplier] = useState<number>(2); // 1x, 2x, 4x, 8x
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [transparentBg, setTransparentBg] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [jpegQuality, setJpegQuality] = useState<number>(0.92);

  // Vectorizer settings (for png-to-svg)
  const [threshold, setThreshold] = useState<number>(128);
  const [invertVector, setInvertVector] = useState<boolean>(false);
  const [vectorFillColor, setVectorFillColor] = useState<string>('#1e293b');
  const [vectorBgColor, setVectorBgColor] = useState<string>('transparent');
  const [vectorSmoothing, setVectorSmoothing] = useState<number>(2);

  // Data URI settings
  const [uriFormat, setUriFormat] = useState<'url-encoded' | 'base64'>('url-encoded');
  const [uriTarget, setUriTarget] = useState<'css' | 'html' | 'raw'>('css');

  // Files
  const [files, setFiles] = useState<BatchFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Default sample file when empty
  useEffect(() => {
    if (files.length === 0) {
      const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="500" height="500" rx="120" fill="url(#g)"/>
  <circle cx="250" cy="250" r="120" fill="none" stroke="#ffffff" stroke-width="24" />
  <circle cx="250" cy="250" r="40" fill="#ffffff" />
</svg>`;

      setFiles([
        {
          id: 'sample-1',
          name: 'sample-vector.svg',
          size: sampleSvg.length,
          content: sampleSvg,
          status: 'pending',
        },
      ]);
    }
  }, [files.length]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    if (uploadedFiles.length === 0) return;

    const newItems: BatchFileItem[] = [];

    uploadedFiles.forEach((file) => {
      const isSvg = file.type === 'image/svg+xml' || file.name.endsWith('.svg');
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result as string;
        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          content: result,
          status: 'pending',
        });

        if (newItems.length === uploadedFiles.length) {
          setFiles((prev) => [...prev.filter((f) => f.id !== 'sample-1'), ...newItems]);
        }
      };

      if (isSvg && mode !== 'png-to-svg') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });
  };

  // Convert Single Item
  const processItem = async (item: BatchFileItem): Promise<BatchFileItem> => {
    try {
      if (mode === 'svg-to-png') {
        const targetW = customWidth * resolutionMultiplier;
        const targetH = customHeight * resolutionMultiplier;
        const blob = await renderSvgToBlob(item.content, {
          width: targetW,
          height: targetH,
          format: 'png',
          backgroundColor: transparentBg ? undefined : bgColor,
        });
        return { ...item, status: 'done', convertedBlob: blob };
      }

      if (mode === 'svg-to-jpg') {
        const targetW = customWidth * resolutionMultiplier;
        const targetH = customHeight * resolutionMultiplier;
        const blob = await renderSvgToBlob(item.content, {
          width: targetW,
          height: targetH,
          format: 'jpeg',
          quality: jpegQuality,
          backgroundColor: bgColor,
        });
        return { ...item, status: 'done', convertedBlob: blob };
      }

      if (mode === 'svg-to-ico') {
        const [blob16, blob32, blob48] = await Promise.all([
          renderSvgToBlob(item.content, { width: 16, height: 16 }),
          renderSvgToBlob(item.content, { width: 32, height: 32 }),
          renderSvgToBlob(item.content, { width: 48, height: 48 }),
        ]);

        const icoBlob = await createIcoFromPngs([
          { pngBlob: blob16, size: 16 },
          { pngBlob: blob32, size: 32 },
          { pngBlob: blob48, size: 48 },
        ]);
        return { ...item, status: 'done', convertedBlob: icoBlob };
      }

      if (mode === 'png-to-svg') {
        const svgStr = await vectorizeImage(item.content, {
          threshold,
          invert: invertVector,
          color: vectorFillColor,
          backgroundColor: vectorBgColor,
          simplifyTolerance: vectorSmoothing,
        });
        return { ...item, status: 'done', convertedData: svgStr };
      }

      if (mode === 'svg-to-data-uri') {
        let uri = '';
        if (uriFormat === 'base64') {
          const encoded = btoa(unescape(encodeURIComponent(item.content)));
          uri = `data:image/svg+xml;base64,${encoded}`;
        } else {
          uri = `data:image/svg+xml;utf8,${encodeURIComponent(item.content)}`;
        }

        let formattedOutput = uri;
        if (uriTarget === 'css') {
          formattedOutput = `background-image: url("${uri}");`;
        } else if (uriTarget === 'html') {
          formattedOutput = `<img src="${uri}" alt="${item.name}" />`;
        }

        return { ...item, status: 'done', convertedData: formattedOutput };
      }

      return item;
    } catch (err) {
      console.error('Error converting file', item.name, err);
      return { ...item, status: 'error' };
    }
  };

  // Convert all items
  const handleConvertAll = async () => {
    setIsProcessing(true);
    try {
      const updated: BatchFileItem[] = [];
      for (const item of files) {
        const res = await processItem(item);
        updated.push(res);
      }
      setFiles(updated);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Download all as ZIP
  const handleDownloadAllZip = async () => {
    const zip = new JSZip();
    for (const item of files) {
      const ext =
        mode === 'svg-to-png'
          ? 'png'
          : mode === 'svg-to-jpg'
          ? 'jpg'
          : mode === 'svg-to-ico'
          ? 'ico'
          : mode === 'png-to-svg'
          ? 'svg'
          : 'txt';

      const baseName = item.name.replace(/\.[^/.]+$/, '');
      const outFilename = `${baseName}.${ext}`;

      if (item.convertedBlob) {
        zip.file(outFilename, item.convertedBlob);
      } else if (item.convertedData) {
        zip.file(outFilename, item.convertedData);
      }
    }

    const zipContent = await zip.generateAsync({ type: 'blob' });
    saveAs(zipContent, `vectorforge-converted-${mode}.zip`);
  };

  const handleDownloadSingle = (item: BatchFileItem) => {
    const ext =
      mode === 'svg-to-png'
        ? 'png'
        : mode === 'svg-to-jpg'
        ? 'jpg'
        : mode === 'svg-to-ico'
        ? 'ico'
        : mode === 'png-to-svg'
        ? 'svg'
        : 'txt';

    const baseName = item.name.replace(/\.[^/.]+$/, '');
    const outFilename = `${baseName}.${ext}`;

    if (item.convertedBlob) {
      downloadBlob(item.convertedBlob, outFilename);
    } else if (item.convertedData) {
      downloadText(
        item.convertedData,
        outFilename,
        mode === 'png-to-svg' ? 'image/svg+xml' : 'text/plain'
      );
    }
  };

  const handleCopySingle = (item: BatchFileItem) => {
    if (item.convertedData) {
      navigator.clipboard.writeText(item.convertedData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const modeTitles: Record<ConverterMode, { title: string; desc: string; badge: string }> = {
    'svg-to-png': {
      title: 'SVG to High-DPI PNG Converter',
      desc: 'Rasterize scalable vector graphics to crisp, pixel-perfect PNGs with customizable alpha transparency up to 8x 4096px.',
      badge: 'High-DPI 4K/8K',
    },
    'svg-to-jpg': {
      title: 'SVG to JPG / JPEG Converter',
      desc: 'Convert vector illustrations into lightweight JPG images with background color filler and adjustable quality compression.',
      badge: 'Compressed Raster',
    },
    'svg-to-ico': {
      title: 'SVG to Windows ICO Converter',
      desc: 'Embed 16x16, 32x32, and 48x48 multi-resolution frames directly into a single binary .ico file for browser tabs and desktop icons.',
      badge: 'Multi-Res Binary',
    },
    'png-to-svg': {
      title: 'PNG / Image to Vector SVG Converter',
      desc: 'Trace raster pixel images into clean, scalable SVG vector paths 100% in your browser using client-side edge contouring.',
      badge: 'Client Vectorizer',
    },
    'svg-to-data-uri': {
      title: 'SVG to CSS / HTML Data URI Generator',
      desc: 'Encode vector icons into inline background-image url("data:image/svg+xml,...") or Base64 strings for zero-request web assets.',
      badge: 'Zero Network Request',
    },
  };

  return (
    <div className="w-full space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>{modeTitles[mode].title}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-400 border border-brand-500/30">
              {modeTitles[mode].badge}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">{modeTitles[mode].desc}</p>
        </div>

        {/* Quick Mode Switcher */}
        <div className="flex items-center gap-1 bg-dark-card p-1 rounded-xl border border-dark-border overflow-x-auto text-xs">
          {(['svg-to-png', 'svg-to-jpg', 'svg-to-ico', 'png-to-svg', 'svg-to-data-uri'] as ConverterMode[]).map(
            (m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  mode === m ? 'bg-brand-500 text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.replace(/-/g, ' ').toUpperCase()}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Grid: Upload & Batch List on Left, Controls & Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Drag & Drop Zone + Files List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dropzone Card */}
          <div className="glass-panel rounded-2xl p-8 border-2 border-dashed border-dark-border hover:border-brand-500/60 transition-colors flex flex-col items-center justify-center text-center relative group">
            <input
              type="file"
              multiple
              accept={mode === 'png-to-svg' ? '.png, .jpg, .jpeg, .webp' : '.svg'}
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="w-12 h-12 rounded-2xl bg-brand-500/15 text-brand-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">
              Drag & drop {mode === 'png-to-svg' ? 'raster images' : 'SVG vectors'} here
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Support multi-file batch upload. 100% processed locally in your browser.
            </p>
            <span className="mt-3 px-3 py-1 rounded-lg bg-dark-surface border border-dark-border text-[11px] text-slate-300 font-medium">
              Browse Files from Computer
            </span>
          </div>

          {/* Files List Table */}
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Batch Queue ({files.length} {files.length === 1 ? 'file' : 'files'})
              </span>
              {files.length > 0 && (
                <button
                  onClick={() => setFiles([])}
                  className="text-[11px] text-rose-400 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-surface/60 border border-dark-border hover:border-slate-500 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-dark-bg p-1 border border-dark-border flex items-center justify-center shrink-0">
                      {file.content.includes('<svg') ? (
                        <div
                          className="w-full h-full"
                          dangerouslySetInnerHTML={{ __html: file.content }}
                        />
                      ) : (
                        <img src={file.content} alt={file.name} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {(file.size / 1024).toFixed(1)} KB • {file.status.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Actions for Item */}
                  <div className="flex items-center gap-2">
                    {file.status === 'done' ? (
                      <>
                        {mode === 'svg-to-data-uri' ? (
                          <button
                            onClick={() => handleCopySingle(file)}
                            className="p-1.5 rounded-lg bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 text-xs flex items-center gap-1 font-medium"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDownloadSingle(file)}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs flex items-center gap-1 font-medium"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>
                        )}
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">Ready</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Batch Action Buttons */}
            <div className="pt-3 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleConvertAll}
                disabled={isProcessing || files.length === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-xs shadow-glow transition-all active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>{isProcessing ? 'Converting...' : 'Convert All Files Now'}</span>
              </button>

              {files.some((f) => f.status === 'done' && (f.convertedBlob || f.convertedData)) && (
                <button
                  onClick={handleDownloadAllZip}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download All as ZIP</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Specific Converter Controls & Output Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-400" />
              <span>Conversion Settings</span>
            </span>

            {/* Mode: SVG to PNG */}
            {mode === 'svg-to-png' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">DPI Resolution Multiplier</label>
                  <div className="grid grid-cols-4 gap-1.5 bg-dark-surface p-1 rounded-xl border border-dark-border">
                    {[1, 2, 4, 8].map((mult) => (
                      <button
                        key={mult}
                        onClick={() => setResolutionMultiplier(mult)}
                        className={`py-1.5 rounded-lg font-semibold transition-colors ${
                          resolutionMultiplier === mult
                            ? 'bg-brand-500 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {mult}x ({customWidth * mult}px)
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-300">Transparent Background</span>
                    <input
                      type="checkbox"
                      checked={transparentBg}
                      onChange={(e) => setTransparentBg(e.target.checked)}
                      className="w-4 h-4 accent-brand-500 rounded"
                    />
                  </label>
                </div>

                {!transparentBg && (
                  <div>
                    <label className="text-slate-400 block mb-1">Solid Fill Background Color</label>
                    <div className="flex items-center gap-2 bg-dark-surface p-1.5 rounded-xl border border-dark-border">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="bg-transparent text-xs text-white uppercase flex-1 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mode: SVG to JPG */}
            {mode === 'svg-to-jpg' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Background Fill (JPG has no Alpha)</label>
                  <div className="flex items-center gap-2 bg-dark-surface p-1.5 rounded-xl border border-dark-border">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="bg-transparent text-xs text-white uppercase flex-1 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>JPEG Compression Quality</span>
                    <span className="text-white font-mono">{Math.round(jpegQuality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={1}
                    step={0.05}
                    value={jpegQuality}
                    onChange={(e) => setJpegQuality(Number(e.target.value))}
                    className="w-full accent-brand-500"
                  />
                </div>
              </div>
            )}

            {/* Mode: SVG to ICO */}
            {mode === 'svg-to-ico' && (
              <div className="space-y-3 text-xs text-slate-300">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our binary ICO encoder packs multiple resolutions into a single standards-compliant Windows icon file:
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-dark-surface border border-dark-border">
                    <span className="font-bold text-white block">16x16</span>
                    <span className="text-[10px] text-slate-500">Browser tab</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-dark-surface border border-dark-border">
                    <span className="font-bold text-white block">32x32</span>
                    <span className="text-[10px] text-slate-500">Taskbar / retina</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-dark-surface border border-dark-border">
                    <span className="font-bold text-white block">48x48</span>
                    <span className="text-[10px] text-slate-500">Desktop icon</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mode: PNG to SVG (Vectorization) */}
            {mode === 'png-to-svg' && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Luminance Threshold</span>
                    <span className="text-white font-mono">{threshold}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={245}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full accent-brand-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Path Smoothing Tolerance</span>
                    <span className="text-white font-mono">{vectorSmoothing}px</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={vectorSmoothing}
                    onChange={(e) => setVectorSmoothing(Number(e.target.value))}
                    className="w-full accent-brand-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={invertVector}
                      onChange={(e) => setInvertVector(e.target.checked)}
                      className="w-4 h-4 accent-brand-500 rounded"
                    />
                    <span className="text-slate-300">Invert Black/White</span>
                  </label>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Vector Path Fill Color</label>
                  <div className="flex items-center gap-2 bg-dark-surface p-1.5 rounded-xl border border-dark-border">
                    <input
                      type="color"
                      value={vectorFillColor}
                      onChange={(e) => setVectorFillColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={vectorFillColor}
                      onChange={(e) => setVectorFillColor(e.target.value)}
                      className="bg-transparent text-xs text-white uppercase flex-1 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mode: SVG to Data URI */}
            {mode === 'svg-to-data-uri' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Encoding Format</label>
                  <div className="grid grid-cols-2 gap-2 bg-dark-surface p-1 rounded-xl border border-dark-border">
                    <button
                      onClick={() => setUriFormat('url-encoded')}
                      className={`py-1 rounded-lg font-medium transition-colors ${
                        uriFormat === 'url-encoded' ? 'bg-brand-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      URL Encoded (Smaller)
                    </button>
                    <button
                      onClick={() => setUriFormat('base64')}
                      className={`py-1 rounded-lg font-medium transition-colors ${
                        uriFormat === 'base64' ? 'bg-brand-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      Base64 Encoded
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Code Target</label>
                  <div className="grid grid-cols-3 gap-1 bg-dark-surface p-1 rounded-xl border border-dark-border">
                    {(['css', 'html', 'raw'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setUriTarget(t)}
                        className={`py-1 rounded-lg uppercase font-semibold transition-colors ${
                          uriTarget === t ? 'bg-brand-500 text-white' : 'text-slate-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
