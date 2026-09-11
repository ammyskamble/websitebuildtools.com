import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Download, Copy, Check, Palette, Sparkles, Upload, Image as ImageIcon,
  Type, Sliders, ArrowUp, ArrowDown, MoveVertical, MoveHorizontal, RotateCw,
  Plus, Trash2
} from 'lucide-react';
import { ICONS_CATALOG } from '../../lib/icons-catalog';
import { GRADIENT_PRESETS, SOLID_PALETTES, ShapeType } from '../../lib/color-presets';
import { IconPickerModal } from '../ui/IconPickerModal';
import { renderSvgToBlob, downloadBlob, downloadText } from '../../lib/canvas-renderer';

export interface LogoStudioState {
  shape: ShapeType;
  backgroundType: 'gradient' | 'solid' | 'transparent';
  gradientId: string;
  customColor1: string;
  customColor2: string;
  gradientAngle: number;
  solidColor: string;
  hasBorder: boolean;
  borderColor: string;
  borderWidth: number;
  hasShadow: boolean;
  shadowIntensity: number; // 0 to 100

  // Content type
  contentType: 'icon' | 'photo' | 'text';

  // Icon
  iconId: string;
  customSvgMarkup?: string;
  iconColor: string;
  iconScale: number; // 10 to 140%
  iconRotation: number; // -180 to 180
  iconStrokeWidth: number; // 1 to 3
  iconShadow: boolean;
  iconOffsetY: number; // -200 to +200

  // Photo
  photoDataUrl: string;
  photoScale: number; // 10 to 150%
  photoRotation: number; // -180 to 180
  photoOffsetY: number; // -200 to +200 (adjust up/down)
  photoOffsetX: number; // -200 to +200
  photoBorderRadius: number; // 0 to 140px
  photoClipToShape: boolean; // clip to background shape

  // Text
  showTextWithGraphic: boolean; // allow combining icon/photo + text!
  textContent: string; // multi-word or multi-line
  textColor: string;
  textSize: number; // 12 to 120px (large scale option)
  textOffsetY: number; // -220 to +220 (adjust text up/down)
  textOffsetX: number; // -150 to +150
  textLetterSpacing: number; // -2 to 12px
  textFontWeight: '400' | '600' | '800';
  textShadow: boolean;
}

const DEFAULT_SAMPLE_PHOTO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%236366f1"/><stop offset="100%" stop-color="%23ec4899"/></linearGradient></defs><rect width="400" height="400" fill="url(%23pg)"/><circle cx="200" cy="155" r="65" fill="white" opacity="0.95"/><path d="M105 330 C105 235 295 235 295 330 Z" fill="white" opacity="0.95"/><circle cx="310" cy="90" r="28" fill="%23fbbf24"/></svg>`;

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export const LogoStudio: React.FC<{ initialCompact?: boolean; onExportFavicon?: (svg: string) => void }> = ({
  initialCompact = false,
  onExportFavicon,
}) => {
  const [state, setState] = useState<LogoStudioState>({
    shape: 'squircle',
    backgroundType: 'gradient',
    gradientId: 'hyper',
    customColor1: '#3b82f6',
    customColor2: '#8b5cf6',
    gradientAngle: 135,
    solidColor: '#1e293b',
    hasBorder: false,
    borderColor: '#ffffff33',
    borderWidth: 2,
    hasShadow: true,
    shadowIntensity: 40,

    contentType: 'icon',
    iconId: 'sparkles',
    iconColor: '#ffffff',
    iconScale: 56,
    iconRotation: 0,
    iconStrokeWidth: 2,
    iconShadow: true,
    iconOffsetY: 0,

    photoDataUrl: DEFAULT_SAMPLE_PHOTO,
    photoScale: 80,
    photoRotation: 0,
    photoOffsetY: 0,
    photoOffsetX: 0,
    photoBorderRadius: 40,
    photoClipToShape: true,

    showTextWithGraphic: false,
    textContent: 'VectorForge Studio',
    textColor: '#ffffff',
    textSize: 36,
    textOffsetY: 120, // default lower position if combined with icon
    textOffsetX: 0,
    textLetterSpacing: 1,
    textFontWeight: '800',
    textShadow: true,
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [pngResolution, setPngResolution] = useState<number>(1024); // 512, 1024, 2048, 4096
  const [exportFormat, setExportFormat] = useState<'png' | 'svg' | 'webp' | 'jpeg'>('png');
  const [jpegQuality, setJpegQuality] = useState<number>(0.92);

  const currentIconItem = useMemo(() => {
    return ICONS_CATALOG.find((i) => i.id === state.iconId) || ICONS_CATALOG[0];
  }, [state.iconId]);

  const activeGradient = useMemo(() => {
    return GRADIENT_PRESETS.find((g) => g.id === state.gradientId) || GRADIENT_PRESETS[0];
  }, [state.gradientId]);

  const [isOptimizingPhoto, setIsOptimizingPhoto] = useState(false);

  // Handle Photo / Raster file upload (PNG, JPG, WebP, GIF, SVG) with max 20MB limit & offscreen canvas downscaling
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
    if (file.size > MAX_FILE_SIZE) {
      alert(`File "${file.name}" exceeds the 20MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please choose a photo under 20MB.`);
      return;
    }

    setIsOptimizingPhoto(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        setIsOptimizingPhoto(false);
        return;
      }

      // If it's an SVG file, load directly
      if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
        setState((s) => ({
          ...s,
          contentType: 'photo',
          photoDataUrl: rawDataUrl,
        }));
        setIsOptimizingPhoto(false);
        return;
      }

      // Downscale photo client-side to max 1200px to prevent browser DOM hang or re-render lag
      const img = new Image();
      img.onload = () => {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        const maxDim = 1200;

        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          // High quality optimized PNG data URL
          const optimizedDataUrl = canvas.toDataURL('image/png');
          setState((s) => ({
            ...s,
            contentType: 'photo',
            photoDataUrl: optimizedDataUrl,
          }));
        } else {
          setState((s) => ({
            ...s,
            contentType: 'photo',
            photoDataUrl: rawDataUrl,
          }));
        }
        setIsOptimizingPhoto(false);
      };

      img.onerror = () => {
        setState((s) => ({
          ...s,
          contentType: 'photo',
          photoDataUrl: rawDataUrl,
        }));
        setIsOptimizingPhoto(false);
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => {
      setIsOptimizingPhoto(false);
      alert('Error reading uploaded photo.');
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Generate SVG Code string for preview and high-DPI rendering
  const generatedSvg = useMemo(() => {
    const size = 512;
    const center = size / 2;

    // Background shape path
    let shapeMarkup = '';
    let bgFill = 'transparent';
    let gradientDefs = '';

    if (state.shape !== 'transparent' && state.backgroundType !== 'transparent') {
      if (state.backgroundType === 'gradient') {
        const rad = (state.gradientAngle * Math.PI) / 180;
        const x1 = Math.round(50 + Math.sin(rad) * 50);
        const y1 = Math.round(50 - Math.cos(rad) * 50);
        const x2 = Math.round(50 - Math.sin(rad) * 50);
        const y2 = Math.round(50 + Math.cos(rad) * 50);

        gradientDefs = `<linearGradient id="logo-grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
          <stop offset="0%" stop-color="${activeGradient.from}" />
          ${activeGradient.via ? `<stop offset="50%" stop-color="${activeGradient.via}" />` : ''}
          <stop offset="100%" stop-color="${activeGradient.to}" />
        </linearGradient>`;
        bgFill = 'url(#logo-grad)';
      } else {
        bgFill = state.solidColor;
      }
    }

    // Shadow filters
    const shadowFilterDef = state.hasShadow
      ? `<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="${Math.round(state.shadowIntensity * 0.4)}" stdDeviation="${Math.round(
          state.shadowIntensity * 0.5
        )}" flood-color="#000000" flood-opacity="${(state.shadowIntensity / 100).toFixed(2)}" />
        </filter>`
      : '';

    const iconShadowFilterDef = state.iconShadow
      ? `<filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.35" />
        </filter>`
      : '';

    const textShadowFilterDef = state.textShadow
      ? `<filter id="text-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4" />
        </filter>`
      : '';

    const borderStroke = state.hasBorder ? `stroke="${state.borderColor}" stroke-width="${state.borderWidth * 2}"` : '';

    // Shape geometry definition for background and clipPath
    let shapeGeometry = '';
    switch (state.shape) {
      case 'circle':
        shapeGeometry = `<circle cx="${center}" cy="${center}" r="${center - 10}" />`;
        shapeMarkup = `<circle cx="${center}" cy="${center}" r="${center - 10}" fill="${bgFill}" ${borderStroke} ${
          state.hasShadow ? 'filter="url(#shadow)"' : ''
        } />`;
        break;
      case 'square':
        shapeGeometry = `<rect x="10" y="10" width="${size - 20}" height="${size - 20}" rx="0" />`;
        shapeMarkup = `<rect x="10" y="10" width="${size - 20}" height="${size - 20}" rx="0" fill="${bgFill}" ${borderStroke} ${
          state.hasShadow ? 'filter="url(#shadow)"' : ''
        } />`;
        break;
      case 'hexagon':
        shapeGeometry = `<polygon points="256,16 480,136 480,376 256,496 32,376 32,136" />`;
        shapeMarkup = `<polygon points="256,16 480,136 480,376 256,496 32,376 32,136" fill="${bgFill}" ${borderStroke} ${
          state.hasShadow ? 'filter="url(#shadow)"' : ''
        } />`;
        break;
      case 'shield':
        shapeGeometry = `<path d="M256,20 C380,20 480,80 480,210 C480,360 256,492 256,492 C256,492 32,360 32,210 C32,80 132,20 256,20 Z" />`;
        shapeMarkup = `<path d="M256,20 C380,20 480,80 480,210 C480,360 256,492 256,492 C256,492 32,360 32,210 C32,80 132,20 256,20 Z" fill="${bgFill}" ${borderStroke} ${
          state.hasShadow ? 'filter="url(#shadow)"' : ''
        } />`;
        break;
      case 'squircle':
      default:
        shapeGeometry = `<rect x="10" y="10" width="${size - 20}" height="${size - 20}" rx="120" ry="120" />`;
        shapeMarkup = `<rect x="10" y="10" width="${size - 20}" height="${size - 20}" rx="120" ry="120" fill="${bgFill}" ${borderStroke} ${
          state.hasShadow ? 'filter="url(#shadow)"' : ''
        } />`;
        break;
    }

    const clipPathDef = `<clipPath id="shape-clip">${shapeGeometry}</clipPath>`;

    // 1. Photo Markup
    let photoMarkup = '';
    if (state.contentType === 'photo' && state.photoDataUrl) {
      const photoDim = size * (state.photoScale / 100);
      const photoX = (size - photoDim) / 2 + state.photoOffsetX;
      const photoY = (size - photoDim) / 2 + state.photoOffsetY;
      const photoTransform = `transform="translate(${center}, ${center}) rotate(${state.photoRotation}) translate(-${center}, -${center})"`;
      const clipAttr = state.photoClipToShape && state.shape !== 'transparent' ? 'clip-path="url(#shape-clip)"' : '';

      photoMarkup = `<g ${photoTransform} ${clipAttr} ${state.hasShadow ? 'filter="url(#icon-shadow)"' : ''}>
        <image href="${state.photoDataUrl}" x="${photoX}" y="${photoY}" width="${photoDim}" height="${photoDim}" preserveAspectRatio="xMidYMid slice" rx="${!state.photoClipToShape ? state.photoBorderRadius : 0}" />
      </g>`;
    }

    // 2. Icon Markup
    let iconMarkup = '';
    if (state.contentType === 'icon') {
      const contentDim = size * (state.iconScale / 100);
      const offset = (size - contentDim) / 2;
      const iconCenterY = center + state.iconOffsetY;
      const transform = `transform="translate(${center}, ${iconCenterY}) rotate(${state.iconRotation}) translate(-${center}, -${iconCenterY})"`;

      if (state.iconId === 'custom' && state.customSvgMarkup) {
        iconMarkup = `<g ${transform} ${state.iconShadow ? 'filter="url(#icon-shadow)"' : ''}>
          <svg x="${offset}" y="${offset + state.iconOffsetY}" width="${contentDim}" height="${contentDim}" viewBox="0 0 24 24" fill="none" stroke="${state.iconColor}" stroke-width="${state.iconStrokeWidth}">
            ${state.customSvgMarkup.replace(/<svg[^>]*>|<\/svg>/gi, '')}
          </svg>
        </g>`;
      } else {
        iconMarkup = `<g ${transform} ${state.iconShadow ? 'filter="url(#icon-shadow)"' : ''}>
          <svg x="${offset}" y="${offset + state.iconOffsetY}" width="${contentDim}" height="${contentDim}" viewBox="0 0 24 24" fill="none" stroke="${state.iconColor}" stroke-width="${state.iconStrokeWidth}" stroke-linecap="round" stroke-linejoin="round">
            ${getLucidePaths(state.iconId)}
          </svg>
        </g>`;
      }
    }

    // 3. Text Markup (supports multi-line and multi-word brand sentences)
    const shouldRenderText = state.contentType === 'text' || state.showTextWithGraphic;
    let textMarkup = '';
    if (shouldRenderText && state.textContent.trim()) {
      const lines = state.textContent.split('\n');
      const fontSize = state.textSize;
      const lineHeight = fontSize * 1.25;
      const totalHeight = lines.length * lineHeight;
      const baseTextY = center + state.textOffsetY - totalHeight / 2 + fontSize * 0.75;

      const tspans = lines
        .map((line, idx) => {
          return `<tspan x="${center + state.textOffsetX}" dy="${idx === 0 ? 0 : lineHeight}px">${escapeXml(
            line
          )}</tspan>`;
        })
        .join('');

      textMarkup = `<text x="${center + state.textOffsetX}" y="${baseTextY}" font-family="Inter, system-ui, -apple-system, sans-serif" font-weight="${
        state.textFontWeight
      }" font-size="${fontSize}px" letter-spacing="${state.textLetterSpacing}px" fill="${
        state.textColor
      }" text-anchor="middle" ${state.textShadow ? 'filter="url(#text-shadow)"' : ''}>${tspans}</text>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    ${gradientDefs}
    ${shadowFilterDef}
    ${iconShadowFilterDef}
    ${textShadowFilterDef}
    ${clipPathDef}
  </defs>
  ${state.shape !== 'transparent' ? shapeMarkup : ''}
  ${photoMarkup}
  ${iconMarkup}
  ${textMarkup}
</svg>`;
  }, [state, activeGradient]);

  const handleExport = async () => {
    setExporting(true);
    try {
      if (exportFormat === 'svg') {
        downloadText(generatedSvg, 'vectorforge-logo.svg');
      } else {
        const blob = await renderSvgToBlob(generatedSvg, {
          width: pngResolution,
          height: pngResolution,
          format: exportFormat,
          quality: jpegQuality,
          backgroundColor: exportFormat === 'jpeg' ? '#ffffff' : undefined,
        });
        downloadBlob(blob, `vectorforge-logo-${pngResolution}x${pngResolution}.${exportFormat}`);
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error(err);
      alert('Export failed. Please check console.');
    } finally {
      setExporting(false);
    }
  };

  const handleCopySvg = () => {
    navigator.clipboard.writeText(generatedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const IconComponent = currentIconItem.icon;

  return (
    <div className="w-full">
      {/* Studio Header */}
      {!initialCompact && (
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Fast Logo & Icon Studio</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-400 border border-brand-500/30">
                Vector & Photo Canvas
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Design logos with vector icons, uploaded photos, multi-word brand typography, and high-DPI exports.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySvg}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SVG!' : 'Copy SVG'}</span>
            </button>

            {onExportFavicon && (
              <button
                onClick={() => onExportFavicon(generatedSvg)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Send to Favicon Suite</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Middle: Live Interactive Canvas Stage */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full glass-panel rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[440px] shadow-2xl border border-dark-border">
            {/* Ambient Backlight Glow */}
            <div
              className="absolute w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-500"
              style={{
                background:
                  state.backgroundType === 'gradient'
                    ? activeGradient.from
                    : state.solidColor,
              }}
            />

            {/* Canvas Stage Wrapper */}
            <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-2xl p-4 flex items-center justify-center bg-checkered shadow-2xl border border-dark-border/60">
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-200"
                dangerouslySetInnerHTML={{ __html: generatedSvg }}
              />
            </div>

            {/* Shape Buttons Underneath */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 z-10">
              {(['squircle', 'circle', 'square', 'hexagon', 'shield', 'transparent'] as ShapeType[]).map(
                (shape) => (
                  <button
                    key={shape}
                    onClick={() => setState((s) => ({ ...s, shape }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      state.shape === shape
                        ? 'bg-brand-500 text-white shadow-glow-sm scale-105'
                        : 'bg-dark-surface text-slate-400 hover:text-slate-200 hover:bg-dark-hover'
                    }`}
                  >
                    {shape}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Export Settings Card */}
          <div className="w-full mt-4 glass-card rounded-2xl p-5 border border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-dark-surface p-1 rounded-xl border border-dark-border">
                {(['png', 'svg', 'webp', 'jpeg'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setExportFormat(fmt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase transition-colors ${
                      exportFormat === fmt
                        ? 'bg-brand-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {exportFormat !== 'svg' && (
                <select
                  value={pngResolution}
                  onChange={(e) => setPngResolution(Number(e.target.value))}
                  className="bg-dark-surface border border-dark-border text-xs text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-brand-500"
                >
                  <option value={512}>512 x 512 px (1x)</option>
                  <option value={1024}>1024 x 1024 px (2x HD)</option>
                  <option value={2048}>2048 x 2048 px (4x Retina)</option>
                  <option value={4096}>4096 x 4096 px (8x Ultra-HD)</option>
                </select>
              )}

              {exportFormat === 'jpeg' && (
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>Quality:</span>
                  <input
                    type="range"
                    min={0.5}
                    max={1}
                    step={0.05}
                    value={jpegQuality}
                    onChange={(e) => setJpegQuality(Number(e.target.value))}
                    className="w-16 accent-brand-500"
                  />
                  <span>{Math.round(jpegQuality * 100)}%</span>
                </div>
              )}
            </div>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-xs shadow-glow transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{exporting ? 'Rendering...' : `Export ${exportFormat.toUpperCase()}`}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Section 1: Main Graphic Content (Icon vs Photo vs Text) */}
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>Graphic Content Mode</span>
              </div>

              {/* Mode Toggle: Icon vs Photo vs Text */}
              <div className="flex items-center bg-dark-surface rounded-lg p-0.5 border border-dark-border text-xs">
                <button
                  onClick={() => setState((s) => ({ ...s, contentType: 'icon' }))}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    state.contentType === 'icon' ? 'bg-brand-500 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Icon
                </button>
                <button
                  onClick={() => setState((s) => ({ ...s, contentType: 'photo' }))}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    state.contentType === 'photo' ? 'bg-brand-500 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Photo / Image
                </button>
                <button
                  onClick={() => setState((s) => ({ ...s, contentType: 'text' }))}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    state.contentType === 'text' ? 'bg-brand-500 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Text Only
                </button>
              </div>
            </div>

            {/* TAB 1: ICON MODE */}
            {state.contentType === 'icon' && (
              <div className="space-y-3">
                {/* Active Icon Banner */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-surface/80 border border-dark-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {state.iconId === 'custom' ? 'Custom SVG Upload' : currentIconItem.name}
                      </p>
                      <p className="text-[11px] text-slate-400">Click Browse to pick from 800+ icons</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsPickerOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-300 text-xs font-medium transition-colors"
                  >
                    Browse Icons
                  </button>
                </div>

                {/* Sliders: Scale (expanded size), Position Up/Down, Rotation */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">Logo / Icon Size</span>
                    <span className="text-brand-400 font-mono font-bold">{state.iconScale}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={140}
                    value={state.iconScale}
                    onChange={(e) => setState((s) => ({ ...s, iconScale: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>10% (Compact)</span>
                    <span>140% (Ultra Large)</span>
                  </div>
                </div>

                {/* Adjust Icon Up / Down */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MoveVertical className="w-3 h-3 text-slate-400" />
                      <span>Vertical Position (Up / Down)</span>
                    </span>
                    <span className="text-slate-200 font-mono">{state.iconOffsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min={-160}
                    max={160}
                    value={state.iconOffsetY}
                    onChange={(e) => setState((s) => ({ ...s, iconOffsetY: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Move Up</span>
                    <span>Center (0)</span>
                    <span>Move Down</span>
                  </div>
                </div>

                {/* Rotation & Stroke */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Rotation</span>
                      <span className="font-mono">{state.iconRotation}°</span>
                    </div>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      value={state.iconRotation}
                      onChange={(e) => setState((s) => ({ ...s, iconRotation: Number(e.target.value) }))}
                      className="w-full accent-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 mb-1 block">Icon Color</label>
                    <div className="flex items-center gap-2 bg-dark-surface p-1 rounded-lg border border-dark-border">
                      <input
                        type="color"
                        value={state.iconColor}
                        onChange={(e) => setState((s) => ({ ...s, iconColor: e.target.value }))}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={state.iconColor}
                        onChange={(e) => setState((s) => ({ ...s, iconColor: e.target.value }))}
                        className="bg-transparent text-xs text-white uppercase w-full focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PHOTO / IMAGE UPLOAD MODE */}
            {state.contentType === 'photo' && (
              <div className="space-y-4 animate-in fade-in">
                {/* Photo Upload Zone */}
                <div className="flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-xl bg-dark-surface/80 border border-dark-border">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-checkered p-1 border border-dark-border shrink-0 flex items-center justify-center">
                    <img src={state.photoDataUrl} alt="Uploaded logo photo" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <p className="text-xs font-semibold text-white">Custom Photo / Avatar</p>
                    <p className="text-[11px] text-slate-400">Max 20MB • PNG, JPG, WebP, GIF, SVG</p>
                  </div>
                  <label className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold cursor-pointer shadow-glow-sm transition-colors ${isOptimizingPhoto ? 'opacity-70 pointer-events-none' : ''}`}>
                    <Upload className={`w-3.5 h-3.5 ${isOptimizingPhoto ? 'animate-spin' : ''}`} />
                    <span>{isOptimizingPhoto ? 'Optimizing Photo...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*, .svg"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Photo Size Slider (expanded up to 150%) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">Photo / Image Size</span>
                    <span className="text-brand-400 font-mono font-bold">{state.photoScale}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={150}
                    value={state.photoScale}
                    onChange={(e) => setState((s) => ({ ...s, photoScale: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>20% (Badge)</span>
                    <span>100% (Fit)</span>
                    <span>150% (Full Bleed)</span>
                  </div>
                </div>

                {/* Adjust Photo Position Up / Down (Y-offset) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MoveVertical className="w-3 h-3 text-slate-400" />
                      <span>Vertical Position (Up / Down)</span>
                    </span>
                    <span className="text-slate-200 font-mono">{state.photoOffsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    value={state.photoOffsetY}
                    onChange={(e) => setState((s) => ({ ...s, photoOffsetY: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Move Up</span>
                    <span>Center (0)</span>
                    <span>Move Down</span>
                  </div>
                </div>

                {/* Adjust Photo Horizontal Position (Left / Right) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MoveHorizontal className="w-3 h-3 text-slate-400" />
                      <span>Horizontal Position (Left / Right)</span>
                    </span>
                    <span className="text-slate-200 font-mono">{state.photoOffsetX}px</span>
                  </div>
                  <input
                    type="range"
                    min={-160}
                    max={160}
                    value={state.photoOffsetX}
                    onChange={(e) => setState((s) => ({ ...s, photoOffsetX: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                </div>

                {/* Clipping & Corner Radius */}
                <div className="pt-2 border-t border-dark-border/60 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-xs text-slate-200 block font-medium">Clip to Background Shape</span>
                      <span className="text-[10px] text-slate-500">Cuts photo to fit squircle / circle frame</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={state.photoClipToShape}
                      onChange={(e) => setState((s) => ({ ...s, photoClipToShape: e.target.checked }))}
                      className="w-4 h-4 accent-brand-500 rounded"
                    />
                  </label>

                  {!state.photoClipToShape && (
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Photo Corner Radius</span>
                        <span className="font-mono">{state.photoBorderRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={140}
                        value={state.photoBorderRadius}
                        onChange={(e) => setState((s) => ({ ...s, photoBorderRadius: Number(e.target.value) }))}
                        className="w-full accent-brand-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TOGGLE TO COMBINE GRAPHIC + TEXT */}
            {state.contentType !== 'text' && (
              <div className="pt-2 border-t border-dark-border/60">
                <button
                  onClick={() => setState((s) => ({ ...s, showTextWithGraphic: !s.showTextWithGraphic }))}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    state.showTextWithGraphic
                      ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                      : 'bg-dark-surface border-dark-border text-slate-300 hover:text-white hover:bg-dark-hover'
                  }`}
                >
                  <Type className="w-3.5 h-3.5 text-brand-400" />
                  <span>{state.showTextWithGraphic ? '✓ Text Label Enabled' : '+ Add Text Label / Brand Name'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Text / Brand Name Controls (Always visible in 'text' mode or when toggled on) */}
          {(state.contentType === 'text' || state.showTextWithGraphic) && (
            <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Type className="w-4 h-4 text-emerald-400" />
                  <span>Text / Brand Words & Positioning</span>
                </div>
                {state.contentType !== 'text' && (
                  <button
                    onClick={() => setState((s) => ({ ...s, showTextWithGraphic: false }))}
                    className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove Text</span>
                  </button>
                )}
              </div>

              {/* Multi-word and Multi-line Text Area */}
              <div>
                <label className="text-xs text-slate-300 block font-medium mb-1.5">
                  Brand Name & Words (Multi-line supported):
                </label>
                <textarea
                  rows={2}
                  value={state.textContent}
                  onChange={(e) => setState((s) => ({ ...s, textContent: e.target.value }))}
                  placeholder="Enter brand name, company title, or slogan..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-sm font-semibold tracking-wide focus:outline-none focus:border-brand-500 resize-y"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tip: Press Enter to create a new line for subtitles or taglines.
                </span>
              </div>

              {/* Text Size Slider (Increase Size of Text) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">Text Size</span>
                  <span className="text-emerald-400 font-mono font-bold">{state.textSize}px</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={110}
                  value={state.textSize}
                  onChange={(e) => setState((s) => ({ ...s, textSize: Number(e.target.value) }))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>12px (Small Tagline)</span>
                  <span>50px (Brand Title)</span>
                  <span>110px (Massive)</span>
                </div>
              </div>

              {/* Text Vertical Position: ADJUST TEXT UP / DOWN */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <MoveVertical className="w-4 h-4 text-emerald-400" />
                    <span>Adjust Text Position (Up / Down)</span>
                  </span>
                  <span className="font-mono bg-dark-bg/80 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/40">
                    {state.textOffsetY > 0 ? `+${state.textOffsetY}` : state.textOffsetY}px
                  </span>
                </div>
                <input
                  type="range"
                  min={-200}
                  max={200}
                  value={state.textOffsetY}
                  onChange={(e) => setState((s) => ({ ...s, textOffsetY: Number(e.target.value) }))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-0.5"><ArrowUp className="w-2.5 h-2.5" /> Move Text Up</span>
                  <span>Center (0)</span>
                  <span className="flex items-center gap-0.5">Move Text Down <ArrowDown className="w-2.5 h-2.5" /></span>
                </div>
              </div>

              {/* Horizontal Position (Left / Right) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Horizontal Position (Left / Right)</span>
                  <span className="text-slate-200 font-mono">{state.textOffsetX}px</span>
                </div>
                <input
                  type="range"
                  min={-150}
                  max={150}
                  value={state.textOffsetX}
                  onChange={(e) => setState((s) => ({ ...s, textOffsetX: Number(e.target.value) }))}
                  className="w-full accent-brand-500"
                />
              </div>

              {/* Text Weight, Spacing & Color */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Font Weight</label>
                  <div className="flex items-center gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border text-xs">
                    {(['400', '600', '800'] as const).map((w) => (
                      <button
                        key={w}
                        onClick={() => setState((s) => ({ ...s, textFontWeight: w }))}
                        className={`flex-1 py-1 rounded transition-colors ${
                          state.textFontWeight === w ? 'bg-emerald-500 text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        {w === '400' ? 'Normal' : w === '600' ? 'Bold' : 'Heavy'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Text Color</label>
                  <div className="flex items-center gap-2 bg-dark-surface p-1 rounded-lg border border-dark-border">
                    <input
                      type="color"
                      value={state.textColor}
                      onChange={(e) => setState((s) => ({ ...s, textColor: e.target.value }))}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={state.textColor}
                      onChange={(e) => setState((s) => ({ ...s, textColor: e.target.value }))}
                      className="bg-transparent text-xs text-white uppercase w-full focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Background & Styling (Gradients & Solid) */}
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Palette className="w-4 h-4 text-violet-400" />
                <span>Background & Frame Styling</span>
              </div>

              {/* Background Type Toggle */}
              <div className="flex items-center bg-dark-surface rounded-lg p-0.5 border border-dark-border text-xs">
                <button
                  onClick={() => setState((s) => ({ ...s, backgroundType: 'gradient' }))}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    state.backgroundType === 'gradient'
                      ? 'bg-brand-500 text-white font-medium'
                      : 'text-slate-400'
                  }`}
                >
                  Gradient
                </button>
                <button
                  onClick={() => setState((s) => ({ ...s, backgroundType: 'solid' }))}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    state.backgroundType === 'solid'
                      ? 'bg-brand-500 text-white font-medium'
                      : 'text-slate-400'
                  }`}
                >
                  Solid
                </button>
              </div>
            </div>

            {state.backgroundType === 'gradient' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {GRADIENT_PRESETS.map((grad) => (
                    <button
                      key={grad.id}
                      onClick={() => setState((s) => ({ ...s, gradientId: grad.id }))}
                      className={`h-11 rounded-xl p-1 relative border transition-all ${
                        state.gradientId === grad.id
                          ? 'border-white shadow-glow-sm scale-105 ring-2 ring-brand-500/50'
                          : 'border-dark-border hover:border-slate-500'
                      }`}
                      style={{ background: grad.css }}
                      title={grad.name}
                    >
                      <span className="absolute bottom-1 left-2 text-[9px] font-bold text-white drop-shadow-md">
                        {grad.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Gradient Angle</span>
                    <span className="text-slate-200 font-mono">{state.gradientAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={state.gradientAngle}
                    onChange={(e) => setState((s) => ({ ...s, gradientAngle: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                </div>
              </div>
            ) : (
              /* Solid Colors */
              <div className="space-y-3">
                <div className="grid grid-cols-6 gap-2">
                  {SOLID_PALETTES.map((color) => (
                    <button
                      key={color}
                      onClick={() => setState((s) => ({ ...s, solidColor: color }))}
                      className={`h-9 rounded-lg border transition-all ${
                        state.solidColor === color
                          ? 'border-white ring-2 ring-brand-500 shadow-glow-sm scale-105'
                          : 'border-dark-border hover:border-slate-400'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-dark-surface p-2 rounded-xl border border-dark-border">
                  <span className="text-xs text-slate-400">Custom Color:</span>
                  <input
                    type="color"
                    value={state.solidColor}
                    onChange={(e) => setState((s) => ({ ...s, solidColor: e.target.value }))}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={state.solidColor}
                    onChange={(e) => setState((s) => ({ ...s, solidColor: e.target.value }))}
                    className="bg-transparent text-xs text-white uppercase flex-1 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* Shadow & Glow Settings */}
            <div className="pt-2 border-t border-dark-border/60 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-300 font-medium">Drop Shadow</label>
                <input
                  type="checkbox"
                  checked={state.hasShadow}
                  onChange={(e) => setState((s) => ({ ...s, hasShadow: e.target.checked }))}
                  className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                />
              </div>

              {state.hasShadow && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Shadow Elevation</span>
                    <span className="text-slate-200 font-mono">{state.shadowIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={state.shadowIntensity}
                    onChange={(e) => setState((s) => ({ ...s, shadowIntensity: Number(e.target.value) }))}
                    className="w-full accent-brand-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Icon Picker Modal */}
      <IconPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        selectedIconId={state.iconId}
        onSelectIcon={(iconId, customSvg) => {
          setState((s) => ({
            ...s,
            contentType: 'icon',
            iconId,
            customSvgMarkup: customSvg || s.customSvgMarkup,
          }));
        }}
      />
    </div>
  );
};

// SVG Path definitions for popular Lucide icons
function getLucidePaths(iconId: string): string {
  switch (iconId) {
    case 'sparkles':
      return `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />`;
    case 'zap':
      return `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />`;
    case 'flame':
      return `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />`;
    case 'rocket':
      return `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />`;
    case 'code':
      return `<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />`;
    case 'terminal':
      return `<polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" />`;
    case 'shield':
      return `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />`;
    case 'lock':
      return `<rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />`;
    case 'globe':
      return `<circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />`;
    case 'heart':
      return `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />`;
    case 'star':
      return `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />`;
    case 'crown':
      return `<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />`;
    case 'box':
      return `<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />`;
    case 'layers':
      return `<polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />`;
    case 'palette':
      return `<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />`;
    default:
      return `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />`;
  }
}
