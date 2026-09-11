import React, { useState, useEffect, useMemo } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import {
  Upload, Download, Copy, Check, Sliders, Image as ImageIcon,
  Sparkles, Layers, RefreshCw, FileCode, ArrowRight, Shield, Zap, AlertCircle
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
  errorMessage?: string;
  convertedBlob?: Blob;
  convertedBlobUrl?: string;
  convertedData?: string;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const DEFAULT_SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="sample-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="500" height="500" rx="120" fill="url(#sample-grad)"/>
  <circle cx="250" cy="250" r="110" fill="none" stroke="#ffffff" stroke-width="24" />
  <circle cx="250" cy="250" r="36" fill="#ffffff" />
</svg>`;

// Default sample raster icon for png-to-svg mode
function createDefaultRasterSample(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(150, 150, 95, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(150, 150, 45, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas.toDataURL('image/png');
}

export const UniversalConverter: React.FC<UniversalConverterProps> = ({ initialMode }) => {
  const [mode, setMode] = useState<ConverterMode>(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Settings
  const [resolutionMultiplier, setResolutionMultiplier] = useState<number>(2); // 1x, 2x, 4x, 8x
  const [customWidth, setCustomWidth] = useState<number>(512);
  const [customHeight, setCustomHeight] = useState<number>(512);
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize sample file tailored to mode
  useEffect(() => {
    if (mode === 'png-to-svg') {
      const sampleImg = createDefaultRasterSample();
      setFiles([
        {
          id: 'sample-raster',
          name: 'sample-icon.png',
          size: Math.round(sampleImg.length * 0.75),
          content: sampleImg,
          status: 'pending',
        },
      ]);
    } else {
      setFiles([
        {
          id: 'sample-vector',
          name: 'sample-vector.svg',
          size: DEFAULT_SAMPLE_SVG.length,
          content: DEFAULT_SAMPLE_SVG,
          status: 'pending',
        },
      ]);
    }
  }, [mode]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    if (uploadedFiles.length === 0) return;

    uploadedFiles.forEach((file) => {
      // 20MB Max File Size limit
      if (file.size > MAX_FILE_SIZE) {
        alert(`File "${file.name}" exceeds the 20MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please select an image under 20MB.`);
        return;
      }

      const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (!content) return;

        const newItem: BatchFileItem = {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          content,
          status: 'pending',
        };

        setFiles((prev) => {
          const cleaned = prev.filter((f) => !f.id.startsWith('sample-'));
          return [...cleaned, newItem];
        });
      };

      if (isSvg && mode !== 'png-to-svg') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });

    // Reset input value so the same file can be re-uploaded if needed
    e.target.value = '';
  };

  // Convert Single Item
  const processItem = async (item: BatchFileItem): Promise<BatchFileItem> => {
    try {
      if (mode === 'svg-to-png') {
        const targetW = Math.max(16, Math.round(customWidth * resolutionMultiplier));
        const targetH = Math.max(16, Math.round(customHeight * resolutionMultiplier));
        const blob = await renderSvgToBlob(item.content, {
          width: targetW,
          height: targetH,
          format: 'png',
          backgroundColor: transparentBg ? undefined : bgColor,
        });
        const url = URL.createObjectURL(blob);
        return { ...item, status: 'done', convertedBlob: blob, convertedBlobUrl: url };
      }

      if (mode === 'svg-to-jpg') {
        const targetW = Math.max(16, Math.round(customWidth * resolutionMultiplier));
        const targetH = Math.max(16, Math.round(customHeight * resolutionMultiplier));
        const blob = await renderSvgToBlob(item.content, {
          width: targetW,
          height: targetH,
          format: 'jpeg',
          quality: jpegQuality,
          backgroundColor: bgColor || '#ffffff',
        });
        const url = URL.createObjectURL(blob);
        return { ...item, status: 'done', convertedBlob: blob, convertedBlobUrl: url };
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
        const url = URL.createObjectURL(icoBlob);
        return { ...item, status: 'done', convertedBlob: icoBlob, convertedBlobUrl: url };
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
          if (item.content.startsWith('data:image/')) {
            uri = item.content;
          } else {
            const encoded = btoa(unescape(encodeURIComponent(item.content)));
            uri = `data:image/svg+xml;base64,${encoded}`;
          }
        } else {
          if (item.content.startsWith('data:image/')) {
            uri = item.content;
          } else {
            uri = `data:image/svg+xml;utf8,${encodeURIComponent(item.content)}`;
          }
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
    } catch (err: any) {
      console.error('Error converting file', item.name, err);
      return {
        ...item,
        status: 'error',
        errorMessage: err?.message || 'Failed to process file format',
      };
    }
  };

  // Convert all items
  const handleConvertAll = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const updated: BatchFileItem[] = [];
      for (const item of files) {
        const res = await processItem(item);
        updated.push(res);
      }
      setFiles(updated);

      const hasSuccess = updated.some((f) => f.status === 'done');
      if (hasSuccess) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Download all as ZIP
  const handleDownloadAllZip = async () => {
    const zip = new JSZip();
    let count = 0;

    for (const item of files) {
      if (item.status !== 'done') continue;

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
        count++;
      } else if (item.convertedData) {
        zip.file(outFilename, item.convertedData);
        count++;
      }
    }

    if (count === 0) {
      alert('Please click "Convert All Files Now" first.');
      return;
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
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
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
              accept=".svg, .png, .jpg, .jpeg, .webp, .ico, .bmp, image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="w-12 h-12 rounded-2xl bg-brand-500/15 text-brand-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">
              Drag & drop {mode === 'png-to-svg' ? 'raster images (PNG, JPG, WebP)' : 'vectors (SVG) or images'} here
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Batch convert multiple files up to <strong className="text-brand-300">20MB each</strong>. 100% processed locally in your browser.
            </p>
            <span className="mt-3 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border text-xs text-slate-200 font-medium group-hover:bg-brand-500/20 group-hover:border-brand-500/40 transition-colors">
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
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    file.status === 'done'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : file.status === 'error'
                      ? 'bg-rose-500/10 border-rose-500/30'
                      : 'bg-dark-surface/60 border-dark-border hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-dark-bg p-1 border border-dark-border flex items-center justify-center shrink-0 overflow-hidden bg-checkered">
                      {file.convertedBlobUrl ? (
                        <img src={file.convertedBlobUrl} alt="converted" className="w-full h-full object-contain" />
                      ) : file.convertedData ? (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: file.convertedData }}
                        />
                      ) : file.content.trim().startsWith('<svg') || file.content.includes('<svg') ? (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: file.content }}
                        />
                      ) : (
                        <img src={file.content} alt={file.name} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white truncate">{file.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                            file.status === 'done'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : file.status === 'error'
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-slate-700/50 text-slate-400'
                          }`}
                        >
                          {file.status}
                        </span>
                      </div>
                      {file.errorMessage && (
                        <p className="text-[10px] text-rose-400 mt-0.5 truncate">{file.errorMessage}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions for Item */}
                  <div className="flex items-center gap-2">
                    {file.status === 'done' ? (
                      <>
                        {mode === 'svg-to-data-uri' ? (
                          <button
                            onClick={() => handleCopySingle(file)}
                            className="px-3 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 text-xs flex items-center gap-1 font-semibold transition-colors"
                          >
                            {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === file.id ? 'Copied!' : 'Copy'}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDownloadSingle(file)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1 font-semibold transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={async () => {
                          const updated = await processItem(file);
                          setFiles((prev) => prev.map((f) => (f.id === file.id ? updated : f)));
                        }}
                        className="px-2.5 py-1 rounded-lg bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-300 text-xs font-medium"
                      >
                        Convert
                      </button>
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
                <span>{isProcessing ? 'Processing files...' : 'Convert All Files Now'}</span>
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
                            ? 'bg-brand-500 text-white shadow-glow-sm'
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
                      className={`py-1.5 rounded-lg font-medium transition-colors ${
                        uriFormat === 'url-encoded' ? 'bg-brand-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      URL Encoded (Smaller)
                    </button>
                    <button
                      onClick={() => setUriFormat('base64')}
                      className={`py-1.5 rounded-lg font-medium transition-colors ${
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
