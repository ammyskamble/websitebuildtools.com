import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import {
  Upload, Download, Copy, Check, Sliders, Image as ImageIcon,
  Sparkles, Layers, RefreshCw, FileCode, ArrowRight, Shield, Zap,
  Eye, Columns, Maximize2, ZoomIn, ZoomOut, RotateCcw,
  Scissors, Palette, Compass, CheckCircle2, AlertCircle, Link2, Unlink2,
  Trash2, FileArchive, Printer, Globe, Monitor, HelpCircle, Code, Share2
} from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { renderSvgToBlob, downloadBlob, loadSvgOrImage } from '../lib/canvas-renderer';

interface SvgQueueItem {
  id: string;
  name: string;
  size: number;
  rawSvg: string;
  originalWidth: number;
  originalHeight: number;
  previewDataUrl?: string;
  status: 'ready' | 'converting' | 'done' | 'error';
  convertedBlob?: Blob;
  errorMessage?: string;
}

const SAMPLE_SVGS = [
  {
    name: 'vector-star-badge.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="500" height="500" rx="120" fill="url(#g1)"/>
  <path d="M250 80 L300 190 L420 205 L330 290 L355 410 L250 350 L145 410 L170 290 L80 205 L200 190 Z" fill="url(#g2)" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
  <circle cx="250" cy="260" r="45" fill="#ffffff" opacity="0.9"/>
</svg>`
  },
  {
    name: 'cyber-shield-icon.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="500" height="500" rx="100" fill="#0f172a"/>
  <path d="M250 90 L380 150 V260 C380 345 320 405 250 430 C180 405 120 345 120 260 V150 Z" fill="url(#shieldGrad)"/>
  <path d="M220 260 L240 280 L290 230" fill="none" stroke="#ffffff" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }
];

export const SvgToPngPage: React.FC = () => {
  // Conversion configuration state
  const [scaleFactor, setScaleFactor] = useState<number>(2);
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);
  const [aspectLocked, setAspectLocked] = useState<boolean>(true);
  const [baseAspectRatio, setBaseAspectRatio] = useState<number>(1);
  const [dpi, setDpi] = useState<number>(300);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  // Queue state
  const [queue, setQueue] = useState<SvgQueueItem[]>([]);
  const [selectedQueueId, setSelectedQueueId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isConvertingAll, setIsConvertingAll] = useState<boolean>(false);
  const [rawModalOpen, setRawModalOpen] = useState<boolean>(false);
  const [rawSvgInput, setRawSvgInput] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPresetLink, setCopiedPresetLink] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanvasRendering, setIsCanvasRendering] = useState<boolean>(false);

  // Active item for side canvas preview
  const activeItem = queue.find((q) => q.id === selectedQueueId) || queue[0];

  // Initialize configuration from URL search query parameters (e.g. ?width=512&height=512&dpi=300&scale=2)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const w = parseInt(params.get('width') || '');
    const h = parseInt(params.get('height') || '');
    const s = parseInt(params.get('scale') || '');
    const d = parseInt(params.get('dpi') || '');
    const trans = params.get('transparent');
    const bg = params.get('bg');

    if (!isNaN(w) && w >= 16 && w <= 8192) setCustomWidth(w);
    if (!isNaN(h) && h >= 16 && h <= 8192) setCustomHeight(h);
    if (!isNaN(s) && [1, 2, 3, 4].includes(s)) setScaleFactor(s);
    if (!isNaN(d) && d > 0) setDpi(d);
    if (trans === 'false') setIsTransparent(false);
    else if (trans === 'true') setIsTransparent(true);
    if (bg && /^#[0-9a-fA-F]{3,8}$/.test(bg)) setBackgroundColor(bg);
  }, []);

  // Copy shareable preset link for developers & programmatic backlinks
  const handleSharePresetLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://svgfav.com';
    const params = new URLSearchParams();
    params.set('width', customWidth.toString());
    params.set('height', customHeight.toString());
    params.set('scale', scaleFactor.toString());
    params.set('dpi', dpi.toString());
    params.set('transparent', isTransparent.toString());
    if (!isTransparent) params.set('bg', backgroundColor);

    const shareUrl = `${origin}/?${params.toString()}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedPresetLink(true);
        setTimeout(() => setCopiedPresetLink(false), 2500);
      });
    }
  };

  // Helper to parse width/height from SVG markup
  const extractSvgDimensions = (svgContent: string): { width: number; height: number } => {
    let width = 512;
    let height = 512;
    const vbMatch = svgContent.match(/viewBox=["']([0-9.\s-]+)["']/i);
    if (vbMatch) {
      const parts = vbMatch[1].trim().split(/\s+/).map(Number);
      if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
        width = Math.round(parts[2]);
        height = Math.round(parts[3]);
        return { width, height };
      }
    }
    const wMatch = svgContent.match(/width=["']([0-9.]+)px?["']/i);
    const hMatch = svgContent.match(/height=["']([0-9.]+)px?["']/i);
    if (wMatch && hMatch) {
      const w = parseFloat(wMatch[1]);
      const h = parseFloat(hMatch[1]);
      if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
        width = Math.round(w);
        height = Math.round(h);
      }
    }
    return { width, height };
  };

  // Add files to queue
  const addSvgToQueue = useCallback((name: string, content: string, sizeBytes: number) => {
    const { width, height } = extractSvgDimensions(content);
    const id = `svg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const previewDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(content)}`;

    setQueue((prev) => [
      ...prev,
      {
        id,
        name: name.endsWith('.svg') ? name : `${name}.svg`,
        size: sizeBytes,
        rawSvg: content,
        originalWidth: width,
        originalHeight: height,
        previewDataUrl,
        status: 'ready',
      }
    ]);

    setSelectedQueueId(id);
    setBaseAspectRatio(width / height);
    setCustomWidth(Math.round(width * scaleFactor));
    setCustomHeight(Math.round(height * scaleFactor));
  }, [scaleFactor]);

  // Real-time Side Canvas Preview Rendering Effect
  useEffect(() => {
    if (!activeItem) return;
    let isMounted = true;
    setIsCanvasRendering(true);

    const targetW = customWidth || activeItem.originalWidth * scaleFactor;
    const targetH = customHeight || activeItem.originalHeight * scaleFactor;

    loadSvgOrImage(activeItem.rawSvg)
      .then((img) => {
        if (!isMounted) return;
        const canvas = previewCanvasRef.current;
        if (!canvas) return;

        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, targetW, targetH);
        if (!isTransparent) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, targetW, targetH);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetW, targetH);
        setIsCanvasRendering(false);
      })
      .catch((err) => {
        console.error('Canvas render error:', err);
        if (isMounted) setIsCanvasRendering(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeItem, customWidth, customHeight, scaleFactor, isTransparent, backgroundColor]);

  // Global Clipboard paste listener (Ctrl+V anywhere on page)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Ignore if user is typing into text inputs/textareas
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.clipboardData) {
        const text = e.clipboardData.getData('text');
        if (text && text.trim().startsWith('<svg') && text.includes('</svg>')) {
          e.preventDefault();
          addSvgToQueue(`pasted-vector-${Date.now().toString().slice(-4)}.svg`, text, text.length);
          return;
        }

        // Check for dropped file items in clipboard
        if (e.clipboardData.files && e.clipboardData.files.length > 0) {
          for (let i = 0; i < e.clipboardData.files.length; i++) {
            const file = e.clipboardData.files[i];
            if (file.name.endsWith('.svg') || file.type.includes('svg')) {
              e.preventDefault();
              const reader = new FileReader();
              reader.onload = (re) => {
                const content = re.target?.result as string;
                if (content) {
                  addSvgToQueue(file.name, content, file.size);
                }
              };
              reader.readAsText(file);
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [addSvgToQueue]);

  // Scale change handler
  const handleScaleSelect = (factor: number) => {
    setScaleFactor(factor);
    if (queue.length > 0) {
      const first = queue[0];
      setCustomWidth(Math.round(first.originalWidth * factor));
      setCustomHeight(Math.round(first.originalHeight * factor));
    }
  };

  // Custom Width input handler
  const handleWidthChange = (newWidth: number) => {
    setCustomWidth(newWidth);
    if (aspectLocked && baseAspectRatio > 0) {
      setCustomHeight(Math.round(newWidth / baseAspectRatio));
    }
  };

  // Custom Height input handler
  const handleHeightChange = (newHeight: number) => {
    setCustomHeight(newHeight);
    if (aspectLocked && baseAspectRatio > 0) {
      setCustomWidth(Math.round(newHeight * baseAspectRatio));
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('border-brand-500', 'bg-brand-500/10');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-brand-500', 'bg-brand-500/10');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-brand-500', 'bg-brand-500/10');
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        if (file.name.toLowerCase().endsWith('.svg') || file.type.includes('svg')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target?.result as string;
            if (content) {
              addSvgToQueue(file.name, content, file.size);
            }
          };
          reader.readAsText(file);
        }
      });
    }
  };

  // File input change handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        if (file.name.toLowerCase().endsWith('.svg') || file.type.includes('svg')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target?.result as string;
            if (content) {
              addSvgToQueue(file.name, content, file.size);
            }
          };
          reader.readAsText(file);
        }
      });
      e.target.value = '';
    }
  };

  // Convert a single item to PNG Blob
  const convertItemToPng = async (item: SvgQueueItem): Promise<Blob> => {
    const targetW = customWidth || item.originalWidth * scaleFactor;
    const targetH = customHeight || item.originalHeight * scaleFactor;

    return renderSvgToBlob(item.rawSvg, {
      width: targetW,
      height: targetH,
      format: 'png',
      backgroundColor: isTransparent ? undefined : backgroundColor,
    });
  };

  // Convert & Download Single Item
  const handleDownloadSingle = async (item: SvgQueueItem) => {
    try {
      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'converting' } : q))
      );

      const blob = await convertItemToPng(item);
      const downloadName = item.name.replace(/\.svg$/i, '') + `-${customWidth}x${customHeight}.png`;
      downloadBlob(blob, downloadName);

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
      });

      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'done', convertedBlob: blob } : q))
      );
    } catch (err: any) {
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id ? { ...q, status: 'error', errorMessage: err.message } : q
        )
      );
    }
  };

  // Copy PNG image to clipboard
  const handleCopyToClipboard = async (item: SvgQueueItem) => {
    try {
      const blob = item.convertedBlob || (await convertItemToPng(item));
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2500);
      }
    } catch (err) {
      console.error('Clipboard write failed:', err);
    }
  };

  // Convert all & batch ZIP download
  const handleConvertAll = async () => {
    if (queue.length === 0) return;
    setIsConvertingAll(true);

    try {
      if (queue.length === 1) {
        await handleDownloadSingle(queue[0]);
      } else {
        const zip = new JSZip();
        for (let i = 0; i < queue.length; i++) {
          const item = queue[i];
          setQueue((prev) =>
            prev.map((q) => (q.id === item.id ? { ...q, status: 'converting' } : q))
          );
          const blob = await convertItemToPng(item);
          const pngName = item.name.replace(/\.svg$/i, '') + `-${customWidth}x${customHeight}.png`;
          zip.file(pngName, blob);
          setQueue((prev) =>
            prev.map((q) => (q.id === item.id ? { ...q, status: 'done', convertedBlob: blob } : q))
          );
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `svgfav-png-bundle-${Date.now().toString().slice(-4)}.zip`);

        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 },
        });
      }
    } catch (err) {
      console.error('Batch conversion error:', err);
    } finally {
      setIsConvertingAll(false);
    }
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setQueue((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (selectedQueueId === id) {
        setSelectedQueueId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
  };

  // Clear all
  const handleClearAll = () => {
    setQueue([]);
    setSelectedQueueId(null);
    if (previewCanvasRef.current) {
      const ctx = previewCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
      }
    }
  };

  // Handle Raw SVG text modal submission
  const handleRawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rawSvgInput.trim()) {
      addSvgToQueue(`custom-vector-${Date.now().toString().slice(-4)}.svg`, rawSvgInput.trim(), rawSvgInput.length);
      setRawSvgInput('');
      setRawModalOpen(false);
    }
  };

  const breadcrumbsList = [
    { name: 'Converters', path: '/convert' },
    { name: 'SVG to PNG' }
  ];

  const seoBreadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Converters', url: '/convert' },
    { name: 'SVG to PNG Converter', url: 'https://svgfav.com/' }
  ];

  return (
    <div className="w-full space-y-16">
      {/* Exact High-CTR SEO Head & JSON-LD Suite */}
      <SeoHead
        title="SVG to PNG Converter – Free, High-DPI &amp; In-Browser | SvgFav"
        description="Convert SVG to PNG with no upload needed. Free in-browser tool with transparent background support, bulk SVG conversion, and high-DPI 300 DPI output for print and web."
        keywords="svg to png, convert svg to png, svg to transparent png, svg to 300 dpi png, batch convert svg folder to png, client-side converter"
        canonicalUrl="https://svgfav.com/"
        breadcrumbs={seoBreadcrumbs}
        hreflangAlternates={[
          { lang: 'x-default', url: 'https://svgfav.com/' },
          { lang: 'en', url: 'https://svgfav.com/' },
          { lang: 'pt', url: 'https://svgfav.com/pt/' },
          { lang: 'pt-BR', url: 'https://svgfav.com/pt-br/conversor-svg-para-png' },
          { lang: 'de', url: 'https://svgfav.com/de/' },
          { lang: 'fr', url: 'https://svgfav.com/fr/' },
          { lang: 'es', url: 'https://svgfav.com/es/' },
        ]}
        rawSchemaGraph={[
          {
            "@type": "WebApplication",
            "@id": "https://svgfav.com/#app",
            "name": "SvgFav SVG to PNG Converter",
            "url": "https://svgfav.com/",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires HTML5 Canvas and modern browser. Zero installation, 100% client-side.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "100% In-browser client-side vector rasterization",
              "High-DPI up to 300 DPI for print and Retina displays",
              "Custom dimensions and aspect ratio lock",
              "Transparent alpha channel and solid background fills",
              "Batch parallel processing with ZIP bundle export",
              "Interactive live 2D canvas preview with zoom inspection"
            ]
          },
          {
            "@type": "HowTo",
            "@id": "https://svgfav.com/#howto",
            "name": "How to Convert SVG to High-Resolution PNG in 3 Steps",
            "description": "Step-by-step workflow guide to converting vector SVG files into crisp, high-resolution PNG images with transparent background in your browser.",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Drop Vector",
                "text": "Upload .svg markup or files, drag & drop folders, or press Ctrl+V to paste clipboard vectors directly.",
                "url": "https://svgfav.com/#step1"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Select Dimensions",
                "text": "Pick preset web icon sizes (16x16, 32x32, 512x512), apply 1x-4x retina scaling multipliers, or enter custom dimensions with aspect-ratio lock.",
                "url": "https://svgfav.com/#step2"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Download PNG",
                "text": "Instant high-resolution raster output with transparent alpha channel or solid background fill. Download individually or as an auto-bundled .zip file.",
                "url": "https://svgfav.com/#step3"
              }
            ]
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://svgfav.com/#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://svgfav.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Converters",
                "item": "https://svgfav.com/convert"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "SVG to PNG Converter",
                "item": "https://svgfav.com/"
              }
            ]
          },
          {
            "@type": "FAQPage",
            "@id": "https://svgfav.com/#faq",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Why convert SVG to PNG?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While SVG is the modern standard for scalable web code, many platforms do not support vector rendering. Social media platforms (such as OpenGraph preview cards for Twitter, Facebook, and LinkedIn), email newsletter clients (like Gmail and Outlook), legacy graphic software, and Word processors require raster PNG files with transparent backgrounds to display illustrations properly."
                }
              },
              {
                "@type": "Question",
                "name": "How are vector paths rasterized without quality loss?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our engine leverages the browser's native HTML5 Canvas 2D context and GPU rasterization pipeline. Because SVG defines geometric primitives using mathematical Bézier curves and coordinate vectors rather than pixel grids, the browser calculates crisp edges at whatever resolution multiplier you specify (1x up to 4x / 4096px+). Sub-pixel anti-aliasing ensures perfectly smooth borders with zero pixelation or blurry edges."
                }
              },
              {
                "@type": "Question",
                "name": "Are my sensitive design files uploaded to a remote server?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, absolutely never. SvgFav executes 100% locally on your computer using in-browser JavaScript and HTML5 Canvas APIs. Your proprietary logos, client brand designs, and confidential illustrations never leave your device, meaning zero cloud data transmission, zero server logs, and complete privacy compliance."
                }
              },
              {
                "@type": "Question",
                "name": "Can I convert multiple SVG files in batch and export a ZIP?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. You can drag and drop multiple SVG files simultaneously. Our engine processes them in parallel and lets you download a compiled .zip bundle with a single click."
                }
              }
            ]
          }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={breadcrumbsList} />
      </div>

      {/* 1. ABOVE THE FOLD: MINIMAL HERO & INTERACTIVE CONVERTER WITH SIDE CANVAS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Hero (Exact text from Section 2 Blueprint) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 dark:text-brand-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Speed Vector Rasterizer</span>
            <span className="w-1 h-1 rounded-full bg-brand-400" />
            <span className="text-slate-500 dark:text-slate-400">GPU Accelerated</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
            SVG to PNG Converter
          </h1>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Convert vector files to high-resolution raster images in your browser.
          </p>
        </div>

        {/* 2-Column Split Workspace with Side Canvas Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dropzone, Controls & Queue */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 shadow-xl transition-all space-y-6">
            
            {/* Dropzone Area */}
            <div
              ref={dropAreaRef}
              id="drop-area"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-brand-500 dark:hover:border-blue-500 rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-neutral-900/50 group"
            >
              <input
                type="file"
                ref={fileInputRef}
                id="file-input"
                accept=".svg,image/svg+xml"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>

              <div className="text-slate-700 dark:text-neutral-300 text-sm sm:text-base">
                <span className="text-brand-600 dark:text-blue-400 font-semibold underline underline-offset-2">Click to upload</span> or drag and drop SVG files here
              </div>
              
              <p className="text-[11px] text-slate-500 dark:text-neutral-500 mt-1.5">
                Batch processing &bull; Clipboard paste (<kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-[10px] font-mono">Ctrl+V</kbd>) &bull; Max 50MB
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3.5" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setRawModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-medium transition-colors"
                >
                  <Code className="w-3.5 h-3.5 text-brand-500 dark:text-blue-400" />
                  <span>Paste SVG Code</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    const sample = SAMPLE_SVGS[Math.floor(Math.random() * SAMPLE_SVGS.length)];
                    addSvgToQueue(sample.name, sample.svg, sample.svg.length);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 text-brand-600 dark:text-blue-300 text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Sample Icon</span>
                </button>
              </div>
            </div>

            {/* Privacy Badge Micro-Tag */}
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>100% Client-Side: Files never leave your browser.</span>
            </div>

            {/* Configurable Conversion Controls */}
            <div className="pt-5 border-t border-slate-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Scale Factor Multipliers (1x, 2x, 3x, 4x) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1.5">
                  Scale Factor
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleScaleSelect(s)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        scaleFactor === s
                          ? 'bg-brand-600 dark:bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Dimensions with Aspect Ratio Lock */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                    Dimensions (px)
                  </label>
                  <button
                    type="button"
                    onClick={() => setAspectLocked(!aspectLocked)}
                    className="text-xs text-slate-400 hover:text-brand-500 dark:hover:text-blue-400 flex items-center gap-1"
                    title={aspectLocked ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
                  >
                    {aspectLocked ? <Link2 className="w-3.5 h-3.5 text-brand-500" /> : <Unlink2 className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{aspectLocked ? 'Locked' : 'Free'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="16"
                    max="8192"
                    value={customWidth}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 16)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-brand-500"
                    placeholder="W"
                  />
                  <span className="text-slate-400 text-xs font-bold">&times;</span>
                  <input
                    type="number"
                    min="16"
                    max="8192"
                    value={customHeight}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 16)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-brand-500"
                    placeholder="H"
                  />
                </div>

                {/* Quick Aspect/Dimension Presets */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {[
                    { label: '32px Favicon', w: 32, h: 32 },
                    { label: '512px App Icon', w: 512, h: 512 },
                    { label: '1080px Square', w: 1080, h: 1080 },
                    { label: '1920×1080 Web', w: 1920, h: 1080 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setCustomWidth(preset.w);
                        setCustomHeight(preset.h);
                      }}
                      className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 text-[10px] font-medium text-slate-600 dark:text-neutral-400 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background & Transparency */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1.5">
                  Background Fill
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="relative flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="transparent"
                      checked={isTransparent}
                      onChange={(e) => setIsTransparent(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-neutral-700 text-brand-600 dark:text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                      Transparent Alpha
                    </span>
                  </label>

                  {!isTransparent && (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-200 dark:border-neutral-700 cursor-pointer p-0.5 bg-transparent"
                      />
                      <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">{backgroundColor}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* DPI Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1.5">
                  Resolution Density
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[72, 150, 300].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDpi(d)}
                      className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        dpi === d
                          ? 'bg-brand-600 dark:bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {d} DPI
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Shareable Preset Configuration Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-800/40 border border-slate-200 dark:border-neutral-800 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
                <Share2 className="w-3.5 h-3.5 text-brand-500" />
                <span className="font-medium">Share Preset:</span>
                <span className="font-mono text-[11px] text-slate-800 dark:text-neutral-200">
                  {customWidth}&times;{customHeight}px &bull; {dpi} DPI &bull; {scaleFactor}x
                </span>
              </div>
              <button
                type="button"
                onClick={handleSharePresetLink}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-blue-400 text-xs font-semibold transition-colors"
                title="Copy shareable URL with this exact dimension & resolution preset"
              >
                {copiedPresetLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Preset Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Copy Config Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Batch Queue List */}
            {queue.length > 0 && (
              <div className="pt-5 border-t border-slate-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                      Queue ({queue.length})
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Click file to preview on canvas
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {queue.length > 1 && (
                      <button
                        type="button"
                        onClick={handleConvertAll}
                        className="text-xs text-brand-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <FileArchive className="w-3.5 h-3.5" />
                        <span>Download .ZIP</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-neutral-800/80 max-h-64 overflow-y-auto pr-1">
                  {queue.map((item) => {
                    const isSelected = activeItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedQueueId(item.id)}
                        className={`py-2.5 px-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-brand-50/70 dark:bg-blue-950/30 border border-brand-500/40'
                            : 'hover:bg-slate-50 dark:hover:bg-neutral-800/40 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden shrink-0">
                            {item.previewDataUrl ? (
                              <img src={item.previewDataUrl} alt={item.name} className="w-7 h-7 object-contain" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-slate-400" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800 dark:text-neutral-200 truncate">
                                {item.name}
                              </span>
                              {isSelected && (
                                <span className="px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-600 dark:text-blue-400 text-[9px] font-semibold uppercase">
                                  Previewing
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-neutral-400 flex items-center gap-2 mt-0.5">
                              <span>Orig: {item.originalWidth}&times;{item.originalHeight}</span>
                              <span>&bull;</span>
                              <span>Output: {customWidth}&times;{customHeight}px</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleDownloadSingle(item)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-brand-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-neutral-300 transition-colors"
                            title="Download PNG"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Convert All Action Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 dark:text-neutral-400 hidden sm:inline">
                Real-time GPU rasterization with zero server uploads
              </span>

              <button
                type="button"
                onClick={handleConvertAll}
                disabled={queue.length === 0 || isConvertingAll}
                className="w-full sm:w-auto px-6 py-2.5 bg-brand-600 dark:bg-blue-600 hover:bg-brand-500 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isConvertingAll ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Rasterizing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{queue.length > 1 ? `Convert All (${queue.length})` : 'Convert & Download'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Dedicated Side Preview in Canvas for Work Progress */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xl transition-all space-y-4">
              
              {/* Canvas Header with Live Indicator & Zoom */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200">
                    Live Canvas Preview
                  </span>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                    className="p-1 rounded bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 text-xs transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-[10px] font-mono text-slate-700 dark:text-neutral-300 font-medium"
                    title="Reset Zoom"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                    className="p-1 rounded bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 text-xs transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Canvas Viewport Stage with Checkered Alpha Pattern */}
              <div className="relative rounded-xl border border-slate-200 dark:border-neutral-800 overflow-hidden min-h-[300px] max-h-[400px] flex items-center justify-center p-4 bg-slate-100 dark:bg-neutral-950">
                
                {/* Checkered Transparency Background */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, #94a3b8 25%, transparent 25%), 
                      linear-gradient(-45deg, #94a3b8 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #94a3b8 75%), 
                      linear-gradient(-45deg, transparent 75%, #94a3b8 75%)
                    `,
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                  }}
                />

                {/* The Live HTML5 Canvas or Empty Placeholder */}
                <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                  {activeItem ? (
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center',
                        maxWidth: '100%',
                        maxHeight: '340px',
                        objectFit: 'contain',
                      }}
                      className="rounded shadow-lg transition-transform duration-150"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-blue-500/10 border border-brand-500/20 text-brand-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                        <Sparkles className="w-7 h-7 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Canvas Ready</h4>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 max-w-[220px] mt-0.5">
                          Drop an SVG file or load a sample icon to preview real-time sub-pixel rasterization.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const sample = SAMPLE_SVGS[0];
                          addSvgToQueue(sample.name, sample.svg, sample.svg.length);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-blue-950/60 hover:bg-brand-100 dark:hover:bg-blue-900/60 text-brand-600 dark:text-blue-300 text-xs font-semibold border border-brand-200 dark:border-blue-800/80 transition-colors shadow-sm"
                      >
                        Load Sample Vector
                      </button>
                    </div>
                  )}
                </div>

                {/* Floating Dimensions Tag */}
                <div className="absolute bottom-2.5 left-2.5 z-20 px-2.5 py-1 rounded-lg bg-slate-900/80 dark:bg-black/80 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                  <Monitor className="w-3 h-3 text-brand-400" />
                  <span>{customWidth}&times;{customHeight} px &bull; {dpi} DPI</span>
                </div>

                {/* Loading / Rasterizing Indicator Overlay */}
                {isCanvasRendering && activeItem && (
                  <div className="absolute inset-0 z-30 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-semibold text-slate-800 dark:text-white">
                    <RefreshCw className="w-4 h-4 animate-spin text-brand-600 dark:text-blue-400" />
                    <span>Rasterizing to Canvas...</span>
                  </div>
                )}
              </div>

              {/* Active Item Details & Status */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-neutral-400">Active File:</span>
                  <span className="font-bold text-slate-800 dark:text-neutral-200 truncate max-w-[200px]">
                    {activeItem ? activeItem.name : 'Waiting for upload...'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-neutral-400">Format &amp; Alpha:</span>
                  <span className="text-brand-600 dark:text-blue-400 font-medium">
                    PNG ({isTransparent ? 'Transparent Alpha' : `Solid ${backgroundColor}`})
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-neutral-700/40">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Live 2D Canvas Buffer</span>
                  </span>
                  <span>Zero Server Uploads</span>
                </div>
              </div>

              {/* Side Preview Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => activeItem && handleDownloadSingle(activeItem)}
                  disabled={!activeItem || activeItem.status === 'converting'}
                  className="px-3 py-2 rounded-xl bg-brand-600 dark:bg-blue-600 hover:bg-brand-500 dark:hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => activeItem && handleCopyToClipboard(activeItem)}
                  disabled={!activeItem}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-neutral-700 transition-all active:scale-95"
                >
                  {copiedId === activeItem?.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIRECT UTILITY FEATURES (Middle Section from Section 1.B) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Batch SVG to PNG &amp; High-Resolution Raster Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Engineered for developers, web designers, and print workflows with zero cloud latency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: High-DPI / Retina Ready */}
          <div className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              SVG to 300 DPI / 4K PNG for Print
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
              Crisp rasterization at custom DPI (72 DPI for web, 150 DPI for tablets, and 300 DPI for ultra-high-resolution print media) with sub-pixel Bézier curve smoothing.
            </p>
          </div>

          {/* Card 2: Batch Conversion Engine */}
          <div className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Batch Convert SVG Folder to PNG
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
              Drag an entire folder of vector icons and convert in parallel via browser canvas workers. Export individual transparent assets or auto-bundled .zip archives instantly.
            </p>
          </div>

          {/* Card 3: CSS & Web Font Handling */}
          <div className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              SVG to Transparent PNG &amp; Styling
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
              Automatically inlines external SVG styles, gradient defs, custom font glyphs, and alpha channel transparency before GPU canvas rendering.
            </p>
          </div>
        </div>
      </section>

      {/* 3. QUICK TECHNICAL WALKTHROUGH (3-Column Block from Section 1.C) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-blue-400 block mb-1">
              Workflow Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How to Convert SVG to PNG in 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-2">
              Everything runs locally on your computer with zero upload delay or security risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div id="step1" className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500/15 text-brand-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Drop Vector
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Upload .svg markup or files, drag &amp; drop folders, or press <kbd className="font-mono bg-slate-100 dark:bg-neutral-800 px-1 py-0.5 rounded">Ctrl+V</kbd> to paste clipboard vectors directly.
              </p>
            </div>

            <div id="step2" className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Select Dimensions
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Pick preset web icon sizes (16&times;16, 32&times;32, 512&times;512), apply 1x-4x retina scaling multipliers, or enter custom dimensions with aspect-ratio lock.
              </p>
            </div>

            <div id="step3" className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Download PNG
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Instant high-resolution raster output with transparent alpha channel or solid background fill. Download individually or as an auto-bundled .zip file.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. FORMAT SPECIFICATIONS COMPARISON TABLE (SVG VS PNG) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-blue-400">
              Format Specification Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              SVG vs PNG Format Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
              Technical breakdown comparing vector SVG markup against rasterized PNG bitmap images.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-800/60 text-slate-900 dark:text-white font-bold">
                  <th className="p-3 sm:p-4 rounded-tl-xl">Technical Attribute</th>
                  <th className="p-3 sm:p-4 text-brand-600 dark:text-blue-400">Vector SVG (.svg)</th>
                  <th className="p-3 sm:p-4 text-emerald-600 dark:text-emerald-400 rounded-tr-xl">Raster PNG (.png)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80 text-slate-700 dark:text-neutral-300">
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-neutral-100">Image Type</td>
                  <td className="p-3 sm:p-4">Resolution-independent vector path math</td>
                  <td className="p-3 sm:p-4 font-medium">Fixed pixel grid bitmap matrix</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-neutral-100">Scalability &amp; Zoom</td>
                  <td className="p-3 sm:p-4">Infinite crisp scaling without blur or loss</td>
                  <td className="p-3 sm:p-4">Pixelates when zoomed beyond target bounds</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-neutral-100">Transparency Support</td>
                  <td className="p-3 sm:p-4">Alpha channels &amp; clipping path masks</td>
                  <td className="p-3 sm:p-4 font-medium">8-bit &amp; 24-bit full alpha channel transparency</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-neutral-100">File Size Profile</td>
                  <td className="p-3 sm:p-4">Ultra-lightweight for simple icons &amp; logos</td>
                  <td className="p-3 sm:p-4">Optimal for complex graphics &amp; pre-rendered previews</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-neutral-100">Platform Compatibility</td>
                  <td className="p-3 sm:p-4">Modern web browsers, Figma, Illustrator</td>
                  <td className="p-3 sm:p-4 font-medium">100% universal across all apps, social media, print &amp; OS</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold text-slate-900 dark:text-neutral-100">Best Use Case</td>
                  <td className="p-3 sm:p-4">Responsive web UI icons, logos, Cricut vectors</td>
                  <td className="p-3 sm:p-4 font-medium">Social preview cards (OG), email clients, Word, 300 DPI print</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. CONTENT & FAQ ACCORDION (Bottom Section from Section 1.D) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Technical answers on vector rasterization, resolution scaling, and client privacy.
          </p>
        </div>

        {/* FAQ Item 1 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>Why convert SVG to PNG?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            While SVG is the modern standard for scalable web code, many platforms do not support vector rendering. Social media platforms (such as OpenGraph preview cards for Twitter, Facebook, and LinkedIn), email newsletter clients (like Gmail and Outlook), legacy graphic software, and Word processors require raster PNG files with transparent backgrounds to display illustrations properly.
          </div>
        </details>

        {/* FAQ Item 2 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>How are vector paths rasterized without quality loss?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            Our engine leverages the browser’s native HTML5 Canvas 2D context and GPU rasterization pipeline. Because SVG defines geometric primitives using mathematical Bézier curves and coordinate vectors rather than pixel grids, the browser calculates crisp edges at whatever resolution multiplier you specify (1x up to 4x / 4096px+). Sub-pixel anti-aliasing ensures perfectly smooth borders with zero pixelation or blurry edges.
          </div>
        </details>

        {/* FAQ Item 3 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>Are my sensitive design files uploaded to a remote server?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            No, absolutely never. SvgFav executes 100% locally on your computer using in-browser JavaScript and HTML5 Canvas APIs. Your proprietary logos, client brand designs, and confidential illustrations never leave your device, meaning zero cloud data transmission, zero server logs, and complete privacy compliance.
          </div>
        </details>

        {/* FAQ Item 4 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>Can I convert multiple SVG files in batch and export a ZIP?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            Yes. You can drag and drop multiple SVG files simultaneously. Our engine processes them in parallel via browser canvas workers and lets you download a compiled .zip bundle with a single click.
          </div>
        </details>
      </section>

      {/* Raw SVG / URL Input Modal */}
      {rawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-brand-500" />
                <span>Paste SVG Markup Code</span>
              </h3>
              <button
                type="button"
                onClick={() => setRawModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleRawSubmit} className="space-y-4">
              <textarea
                value={rawSvgInput}
                onChange={(e) => setRawSvgInput(e.target.value)}
                placeholder="<svg xmlns='http://www.w3.org/2000/svg' ...>...</svg>"
                rows={7}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-neutral-100 font-mono text-xs focus:outline-none focus:border-brand-500"
                autoFocus
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRawModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!rawSvgInput.trim()}
                  className="px-5 py-2 rounded-lg bg-brand-600 dark:bg-blue-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm disabled:opacity-50"
                >
                  Add Vector to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
