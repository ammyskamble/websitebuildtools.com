import React, { useState, useEffect, useMemo, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import {
  Upload, Download, Copy, Check, Sliders, Image as ImageIcon,
  Sparkles, Layers, RefreshCw, FileCode, ArrowRight, Shield, Zap,
  Eye, Columns, Maximize2, ZoomIn, ZoomOut, RotateCcw, SplitSquareVertical,
  Scissors, Palette, Compass, CheckCircle2, AlertCircle
} from 'lucide-react';
import { renderSvgToBlob, downloadBlob, downloadText } from '../../lib/canvas-renderer';
import { createIcoFromPngs } from '../../lib/ico-encoder';
import { vectorizeImageWithStats, VectorizeResult, VectorizeTraceMode } from '../../lib/image-vectorizer';
import { convertSvgToAstroComponent, downloadAstroFile, toPascalCase } from '../../lib/astro-generator';
import { InstantAssetExporter } from '../ui/InstantAssetExporter';

export type ConverterMode =
  | 'svg-to-png'
  | 'svg-to-jpg'
  | 'svg-to-ico'
  | 'png-to-svg'
  | 'jpg-to-svg'
  | 'image-to-svg'
  | 'svg-to-data-uri'
  | 'svg-to-astro';

interface UniversalConverterProps {
  initialMode: ConverterMode;
}

export interface BatchFileItem {
  id: string;
  name: string;
  size: number;
  content: string; // SVG text or image Data URL
  status: 'pending' | 'processing' | 'done' | 'error';
  errorMessage?: string;
  convertedBlob?: Blob;
  convertedBlobUrl?: string;
  convertedData?: string;
  stats?: {
    width: number;
    height: number;
    pathCount: number;
    nodeCount: number;
    originalWidth?: number;
    originalHeight?: number;
  };
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

  // Vectorizer settings (for png-to-svg, jpg-to-svg, image-to-svg)
  const [threshold, setThreshold] = useState<number>(128);
  const [invertVector, setInvertVector] = useState<boolean>(false);
  const [vectorFillColor, setVectorFillColor] = useState<string>('#1e293b');
  const [vectorBgColor, setVectorBgColor] = useState<string>('transparent');
  const [vectorSmoothing, setVectorSmoothing] = useState<number>(2);
  const [traceMode, setTraceMode] = useState<VectorizeTraceMode>('cricut');

  // Data URI settings
  const [uriFormat, setUriFormat] = useState<'url-encoded' | 'base64'>('url-encoded');
  const [uriTarget, setUriTarget] = useState<'css' | 'html' | 'raw'>('css');

  // Files & Selection
  const [files, setFiles] = useState<BatchFileItem[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dual Canvas Preview Controls
  const [previewLayout, setPreviewLayout] = useState<'side-by-side' | 'split-slider' | 'focus-converted' | 'focus-original'>('side-by-side');
  const [splitPosition, setSplitPosition] = useState<number>(50); // percentage 0 - 100
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [canvasBg, setCanvasBg] = useState<'checkered' | 'dark' | 'light' | 'white'>('checkered');
  const [isLiveRendering, setIsLiveRendering] = useState<boolean>(false);
  const [livePreviewResult, setLivePreviewResult] = useState<{
    convertedData?: string;
    convertedBlobUrl?: string;
    stats?: {
      width: number;
      height: number;
      pathCount: number;
      nodeCount: number;
      originalWidth?: number;
      originalHeight?: number;
    };
  } | null>(null);

  const isDraggingSplit = useRef(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  // Initialize sample file tailored to mode
  useEffect(() => {
    if (mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg') {
      const sampleImg = createDefaultRasterSample();
      const sampleId = 'sample-raster';
      setFiles([
        {
          id: sampleId,
          name: mode === 'jpg-to-svg' ? 'sample-logo.jpg' : 'sample-icon.png',
          size: Math.round(sampleImg.length * 0.75),
          content: sampleImg,
          status: 'pending',
        },
      ]);
      setSelectedFileId(sampleId);
    } else {
      const sampleId = 'sample-vector';
      setFiles([
        {
          id: sampleId,
          name: 'sample-vector.svg',
          size: DEFAULT_SAMPLE_SVG.length,
          content: DEFAULT_SAMPLE_SVG,
          status: 'pending',
        },
      ]);
      setSelectedFileId(sampleId);
    }
  }, [mode]);

  // Ensure an active file is selected when files list changes
  useEffect(() => {
    if (files.length > 0 && (!selectedFileId || !files.some((f) => f.id === selectedFileId))) {
      setSelectedFileId(files[0].id);
    }
  }, [files, selectedFileId]);

  // Current active file item
  const activeFile = useMemo(() => {
    return files.find((f) => f.id === selectedFileId) || files[0] || null;
  }, [files, selectedFileId]);

  // Derive source for Instant Multi-Format Exporter
  const activeExportSource = useMemo(() => {
    if (!activeFile) return '';
    if (activeFile.convertedData && activeFile.convertedData.includes('<svg')) {
      return activeFile.convertedData;
    }
    if (livePreviewResult?.convertedData && livePreviewResult.convertedData.includes('<svg')) {
      return livePreviewResult.convertedData;
    }
    if (activeFile.content && activeFile.content.includes('<svg')) {
      return activeFile.content;
    }
    if (activeFile.convertedBlobUrl) {
      return activeFile.convertedBlobUrl;
    }
    if (livePreviewResult?.convertedBlobUrl) {
      return livePreviewResult.convertedBlobUrl;
    }
    return activeFile.content || '';
  }, [activeFile, livePreviewResult]);

  // Live real-time preview computation for active item with debounce
  useEffect(() => {
    if (!activeFile) {
      setLivePreviewResult(null);
      return;
    }

    let isCancelled = false;
    setIsLiveRendering(true);

    const timer = setTimeout(async () => {
      try {
        if (mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg') {
          const statsResult = await vectorizeImageWithStats(activeFile.content, {
            threshold,
            invert: invertVector,
            color: vectorFillColor,
            backgroundColor: vectorBgColor,
            simplifyTolerance: vectorSmoothing,
            traceMode,
            maxDimension: 500,
          });

          if (!isCancelled) {
            setLivePreviewResult({
              convertedData: statsResult.svg,
              stats: {
                width: statsResult.width,
                height: statsResult.height,
                pathCount: statsResult.pathCount,
                nodeCount: statsResult.nodeCount,
                originalWidth: statsResult.originalWidth,
                originalHeight: statsResult.originalHeight,
              },
            });
            setIsLiveRendering(false);
          }
        } else if (mode === 'svg-to-png' || mode === 'svg-to-jpg') {
          const targetW = Math.max(16, Math.round(customWidth * resolutionMultiplier));
          const targetH = Math.max(16, Math.round(customHeight * resolutionMultiplier));
          const isJpeg = mode === 'svg-to-jpg';
          const blob = await renderSvgToBlob(activeFile.content, {
            width: targetW,
            height: targetH,
            format: isJpeg ? 'jpeg' : 'png',
            quality: jpegQuality,
            backgroundColor: isJpeg ? bgColor || '#ffffff' : transparentBg ? undefined : bgColor,
          });

          if (!isCancelled) {
            const url = URL.createObjectURL(blob);
            setLivePreviewResult({
              convertedBlobUrl: url,
              stats: {
                width: targetW,
                height: targetH,
                pathCount: 1,
                nodeCount: targetW * targetH,
              },
            });
            setIsLiveRendering(false);
          }
        } else if (mode === 'svg-to-ico') {
          const [blob16, blob32, blob48] = await Promise.all([
            renderSvgToBlob(activeFile.content, { width: 16, height: 16 }),
            renderSvgToBlob(activeFile.content, { width: 32, height: 32 }),
            renderSvgToBlob(activeFile.content, { width: 48, height: 48 }),
          ]);
          const icoBlob = await createIcoFromPngs([
            { pngBlob: blob16, size: 16 },
            { pngBlob: blob32, size: 32 },
            { pngBlob: blob48, size: 48 },
          ]);
          if (!isCancelled) {
            const url = URL.createObjectURL(icoBlob);
            setLivePreviewResult({
              convertedBlobUrl: url,
              stats: {
                width: 48,
                height: 48,
                pathCount: 3,
                nodeCount: 3,
              },
            });
            setIsLiveRendering(false);
          }
        } else if (mode === 'svg-to-data-uri') {
          let uri = '';
          if (uriFormat === 'base64') {
            const encoded = btoa(unescape(encodeURIComponent(activeFile.content)));
            uri = `data:image/svg+xml;base64,${encoded}`;
          } else {
            uri = `data:image/svg+xml;utf8,${encodeURIComponent(activeFile.content)}`;
          }

          let formatted = uri;
          if (uriTarget === 'css') formatted = `background-image: url("${uri}");`;
          else if (uriTarget === 'html') formatted = `<img src="${uri}" alt="${activeFile.name}" />`;

          if (!isCancelled) {
            setLivePreviewResult({
              convertedData: formatted,
            });
            setIsLiveRendering(false);
          }
        } else if (mode === 'svg-to-astro') {
          const baseName = activeFile.name.replace(/\.[^/.]+$/, '');
          const compName = toPascalCase(baseName || 'AstroIcon');
          const astroStr = convertSvgToAstroComponent(activeFile.content, { componentName: compName });
          if (!isCancelled) {
            setLivePreviewResult({
              convertedData: astroStr,
            });
            setIsLiveRendering(false);
          }
        }
      } catch (err) {
        console.error('Error generating live preview:', err);
        if (!isCancelled) setIsLiveRendering(false);
      }
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [
    activeFile,
    mode,
    threshold,
    invertVector,
    vectorFillColor,
    vectorBgColor,
    vectorSmoothing,
    traceMode,
    resolutionMultiplier,
    transparentBg,
    bgColor,
    jpegQuality,
    uriFormat,
    uriTarget,
    customWidth,
    customHeight,
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    if (uploadedFiles.length === 0) return;

    uploadedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`File "${file.name}" exceeds the 20MB limit. Please select an image under 20MB.`);
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
          const nextList = [...cleaned, newItem];
          setSelectedFileId(newItem.id);
          return nextList;
        });
      };

      if (isSvg && mode !== 'png-to-svg' && mode !== 'jpg-to-svg' && mode !== 'image-to-svg') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });

    e.target.value = '';
  };

  // Convert single item
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

      if (mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg') {
        const res = await vectorizeImageWithStats(item.content, {
          threshold,
          invert: invertVector,
          color: vectorFillColor,
          backgroundColor: vectorBgColor,
          simplifyTolerance: vectorSmoothing,
          traceMode,
        });
        return {
          ...item,
          status: 'done',
          convertedData: res.svg,
          stats: {
            width: res.width,
            height: res.height,
            pathCount: res.pathCount,
            nodeCount: res.nodeCount,
          },
        };
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

      if (mode === 'svg-to-astro') {
        const baseName = item.name.replace(/\.[^/.]+$/, '');
        const compName = toPascalCase(baseName || 'AstroIcon');
        const astroStr = convertSvgToAstroComponent(item.content, { componentName: compName });
        return { ...item, status: 'done', convertedData: astroStr };
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

        if (updated.length === 1 && updated[0].status === 'done') {
          if (mode === 'svg-to-data-uri') {
            handleCopySingle(updated[0]);
          } else {
            handleDownloadSingle(updated[0]);
          }
        }
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
      const isDone = item.status === 'done' || (activeFile?.id === item.id && livePreviewResult?.convertedData);
      if (!isDone) continue;

      const ext =
        mode === 'svg-to-png'
          ? 'png'
          : mode === 'svg-to-jpg'
          ? 'jpg'
          : mode === 'svg-to-ico'
          ? 'ico'
          : (mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg')
          ? 'svg'
          : mode === 'svg-to-astro'
          ? 'astro'
          : 'txt';

      const baseName = item.name.replace(/\.[^/.]+$/, '');
      const outFilename = mode === 'svg-to-astro' ? `${toPascalCase(baseName || 'AstroIcon')}.astro` : `${baseName}.${ext}`;

      if (item.convertedBlob) {
        zip.file(outFilename, item.convertedBlob);
        count++;
      } else if (item.convertedData) {
        zip.file(outFilename, item.convertedData);
        count++;
      } else if (activeFile?.id === item.id && livePreviewResult?.convertedData) {
        zip.file(outFilename, livePreviewResult.convertedData);
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
    const dataToSave = item.convertedData || (activeFile?.id === item.id ? livePreviewResult?.convertedData : '');
    const blobToSave = item.convertedBlob;

    if (mode === 'svg-to-astro') {
      const baseName = item.name.replace(/\.[^/.]+$/, '');
      const compName = toPascalCase(baseName || 'AstroIcon');
      downloadAstroFile(dataToSave || '', `${compName}.astro`);
      return;
    }

    const ext =
      mode === 'svg-to-png'
        ? 'png'
        : mode === 'svg-to-jpg'
        ? 'jpg'
        : mode === 'svg-to-ico'
        ? 'ico'
        : (mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg')
        ? 'svg'
        : 'txt';

    const baseName = item.name.replace(/\.[^/.]+$/, '');
    const outFilename = `${baseName}.${ext}`;

    if (blobToSave) {
      downloadBlob(blobToSave, outFilename);
    } else if (dataToSave) {
      downloadText(
        dataToSave,
        outFilename,
        (mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg') ? 'image/svg+xml' : 'text/plain'
      );
    }
  };

  const handleCopySingle = (item: BatchFileItem) => {
    const dataToCopy = item.convertedData || (activeFile?.id === item.id ? livePreviewResult?.convertedData : '');
    if (dataToCopy) {
      navigator.clipboard.writeText(dataToCopy);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Split-slider drag handlers
  const handleSplitMouseDown = () => {
    isDraggingSplit.current = true;
  };

  const handleSplitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingSplit.current || !splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplitPosition(pct);
  };

  const handleSplitMouseUp = () => {
    isDraggingSplit.current = false;
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
      title: 'Free In-Browser PNG to SVG Converter',
      desc: 'Trace raster PNG images into clean, scalable SVG vector paths 100% in your browser using client-side edge contouring.',
      badge: 'Client Vectorizer',
    },
    'jpg-to-svg': {
      title: 'Free In-Browser JPG / JPEG to SVG Converter',
      desc: 'Convert JPG photographs, scanned drawings, and logos into clean, infinitely scalable vector SVG paths with zero server uploads.',
      badge: '100% Private',
    },
    'image-to-svg': {
      title: 'Universal Image to SVG Vectorizer (Cricut & Laser Ready)',
      desc: 'Trace any image format (PNG, JPG, WebP, BMP) into optimized vector paths for laser cutters, vinyl plotters, Cricut, and graphic design.',
      badge: 'Cricut & Laser Ready',
    },
    'svg-to-data-uri': {
      title: 'SVG to CSS / HTML Data URI Generator',
      desc: 'Encode vector icons into inline background-image url("data:image/svg+xml,...") or Base64 strings for zero-request web assets.',
      badge: 'Zero Network Request',
    },
    'svg-to-astro': {
      title: 'SVG to Astro Component Converter',
      desc: 'Convert raw SVG vectors into reusable, typed .astro components with Props interfaces, class:list support, and customizable sizes.',
      badge: 'Astro Framework',
    },
  };

  const isVectorToRaster = mode === 'svg-to-png' || mode === 'svg-to-jpg' || mode === 'svg-to-ico';
  const isRasterToVector = mode === 'png-to-svg' || mode === 'jpg-to-svg' || mode === 'image-to-svg';

  // Render original file preview
  const renderOriginalCanvas = () => {
    if (!activeFile) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
          <ImageIcon className="w-8 h-8 mb-2 opacity-40" />
          <span>No file selected</span>
        </div>
      );
    }

    const isSvg = activeFile.content.trim().startsWith('<svg') || activeFile.content.includes('<svg');

    return (
      <div
        className="w-full h-full flex items-center justify-center p-4 overflow-hidden transition-transform"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
      >
        {isSvg ? (
          <div
            className="max-w-full max-h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: activeFile.content }}
          />
        ) : (
          <img
            src={activeFile.content}
            alt="Original input"
            className="max-w-full max-h-full object-contain rounded drop-shadow-md select-none"
            style={{ imageRendering: zoomLevel > 1 ? 'pixelated' : 'auto' }}
          />
        )}
      </div>
    );
  };

  // Render converted output preview
  const renderConvertedCanvas = () => {
    const convertedSvg = livePreviewResult?.convertedData || activeFile?.convertedData;
    const convertedUrl = livePreviewResult?.convertedBlobUrl || activeFile?.convertedBlobUrl;

    if (isLiveRendering) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-brand-400 text-xs gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-brand-500" />
          <span className="font-medium">Synthesizing vector paths...</span>
        </div>
      );
    }

    if (mode === 'svg-to-data-uri' && convertedSvg) {
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between overflow-auto">
          <div className="p-3 bg-dark-bg/80 border border-dark-border rounded-xl font-mono text-xs text-brand-300 break-all select-all">
            {convertedSvg}
          </div>
          <div className="mt-3 p-4 rounded-xl border border-dark-border/60 bg-dark-surface/50 text-center">
            <span className="text-[11px] text-slate-400 block mb-2 font-medium">CSS Background Test:</span>
            <div
              className="w-24 h-24 mx-auto rounded-xl border border-brand-500/40 shadow-glow-sm bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: uriFormat === 'base64'
                  ? `url("${btoa(unescape(encodeURIComponent(activeFile?.content || '')))}")`
                  : `url("data:image/svg+xml;utf8,${encodeURIComponent(activeFile?.content || '')}")`,
              }}
            />
          </div>
        </div>
      );
    }

    if (mode === 'svg-to-astro' && convertedSvg) {
      return (
        <div className="w-full h-full p-4 overflow-auto">
          <pre className="p-4 bg-dark-bg/90 border border-dark-border rounded-xl font-mono text-[11px] text-amber-300 leading-relaxed overflow-x-auto select-all">
            {convertedSvg}
          </pre>
        </div>
      );
    }

    if (mode === 'svg-to-ico' && convertedUrl) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-dark-surface/60 border border-dark-border">
            <div className="text-center">
              <img src={convertedUrl} alt="16px preview" className="w-4 h-4 mx-auto mb-1 border border-slate-700 bg-white/10 rounded" />
              <span className="text-[10px] text-slate-400 font-mono">16x16</span>
            </div>
            <div className="text-center">
              <img src={convertedUrl} alt="32px preview" className="w-8 h-8 mx-auto mb-1 border border-slate-700 bg-white/10 rounded" />
              <span className="text-[10px] text-slate-400 font-mono">32x32</span>
            </div>
            <div className="text-center">
              <img src={convertedUrl} alt="48px preview" className="w-12 h-12 mx-auto mb-1 border border-slate-700 bg-white/10 rounded" />
              <span className="text-[10px] text-slate-400 font-mono">48x48</span>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Multi-frame Windows .ICO ready
          </span>
        </div>
      );
    }

    if (convertedUrl) {
      return (
        <div
          className="w-full h-full flex items-center justify-center p-4 overflow-hidden transition-transform"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          <img
            src={convertedUrl}
            alt="Converted raster"
            className="max-w-full max-h-full object-contain drop-shadow-md rounded"
          />
        </div>
      );
    }

    if (convertedSvg) {
      return (
        <div
          className="w-full h-full flex items-center justify-center p-4 overflow-hidden transition-transform"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          <div
            className="max-w-full max-h-full flex items-center justify-center drop-shadow-lg"
            dangerouslySetInnerHTML={{ __html: convertedSvg }}
          />
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
        <Sparkles className="w-8 h-8 opacity-40 text-brand-400" />
        <span>Click "Convert" to render output</span>
      </div>
    );
  };

  const bgStyleClass =
    canvasBg === 'checkered'
      ? 'bg-checkered'
      : canvasBg === 'light'
      ? 'bg-slate-100 text-slate-900'
      : canvasBg === 'white'
      ? 'bg-white text-slate-900'
      : 'bg-[#090d16] text-white';

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
          {(['png-to-svg', 'jpg-to-svg', 'image-to-svg', 'svg-to-png', 'svg-to-ico', 'svg-to-jpg', 'svg-to-data-uri', 'svg-to-astro'] as ConverterMode[]).map(
            (m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  mode === m ? 'bg-brand-500 text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'svg-to-astro' ? 'SVG TO ASTRO' : m.replace(/-/g, ' ').toUpperCase()}
              </button>
            )
          )}
        </div>
      </div>

      {/* Trust Badges Bar: Anti-Picsvg competitive advantage */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-brand-500/10 via-dark-surface/60 to-purple-500/10 border border-brand-500/20 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span><strong className="text-white">100% Client-Side & Private:</strong> Files never leave your browser. Zero server uploads.</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Unlimited Size (No 4MB Limit)</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-brand-400" /> 100% Ad-Free</span>
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> Cricut & Laser Ready</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 UNIFIED 7:5 WORKSPACE GRID (Matching LogoStudio & SvgOptimizer Ratio) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN (lg:col-span-7): HERO CANVAS STAGE & EXPORT BAR */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Main Canvas Card */}
          <div className="glass-panel rounded-3xl border border-dark-border overflow-hidden shadow-2xl space-y-0">
            {/* Canvas Toolbar Header */}
            <div className="px-4 py-3 bg-dark-surface/90 border-b border-dark-border flex flex-wrap items-center justify-between gap-3">
              {/* Active File Label & Selector */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-brand-400" />
                  <span>Visual Studio</span>
                </span>
                {activeFile && (
                  <span className="px-2.5 py-0.5 rounded-md bg-dark-card border border-dark-border text-[11px] font-mono text-brand-300 truncate max-w-[130px] sm:max-w-[180px]">
                    {activeFile.name}
                  </span>
                )}
                {livePreviewResult?.stats && (
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <span>{livePreviewResult.stats.width}×{livePreviewResult.stats.height}px</span>
                    {livePreviewResult.stats.pathCount > 0 && (
                      <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                        {livePreviewResult.stats.pathCount} Paths ({livePreviewResult.stats.nodeCount} Nodes)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Canvas View Controls */}
              <div className="flex items-center gap-2">
                {/* Layout Toggles */}
                <div className="flex items-center gap-1 bg-dark-bg p-1 rounded-lg border border-dark-border text-xs">
                  <button
                    onClick={() => setPreviewLayout('side-by-side')}
                    className={`p-1.5 rounded flex items-center gap-1 transition-colors ${
                      previewLayout === 'side-by-side' ? 'bg-brand-500 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Side-by-Side Dual View"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Side-by-Side</span>
                  </button>
                  <button
                    onClick={() => setPreviewLayout('split-slider')}
                    className={`p-1.5 rounded flex items-center gap-1 transition-colors ${
                      previewLayout === 'split-slider' ? 'bg-brand-500 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Before/After Split Slider"
                  >
                    <SplitSquareVertical className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Split</span>
                  </button>
                  <button
                    onClick={() => setPreviewLayout('focus-converted')}
                    className={`p-1.5 rounded flex items-center gap-1 transition-colors ${
                      previewLayout === 'focus-converted' ? 'bg-brand-500 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Focus Converted Vector"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Output</span>
                  </button>
                </div>

                {/* Canvas Background Theme */}
                <div className="flex items-center gap-1 bg-dark-bg p-1 rounded-lg border border-dark-border">
                  <button
                    onClick={() => setCanvasBg('checkered')}
                    className={`w-5 h-5 rounded border ${canvasBg === 'checkered' ? 'border-brand-400 shadow-glow-sm' : 'border-transparent'} bg-checkered`}
                    title="Transparent Alpha Checkered"
                  />
                  <button
                    onClick={() => setCanvasBg('dark')}
                    className={`w-5 h-5 rounded border ${canvasBg === 'dark' ? 'border-brand-400 shadow-glow-sm' : 'border-transparent'} bg-[#090d16]`}
                    title="Dark Stage"
                  />
                  <button
                    onClick={() => setCanvasBg('white')}
                    className={`w-5 h-5 rounded border ${canvasBg === 'white' ? 'border-brand-400 shadow-glow-sm' : 'border-transparent'} bg-white`}
                    title="Solid White"
                  />
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-dark-bg p-1 rounded-lg border border-dark-border text-xs text-slate-400">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.5, Number((z - 0.25).toFixed(2))))}
                    className="p-1 hover:text-white rounded"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono px-0.5 text-slate-300 w-8 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(3, Number((z + 0.25).toFixed(2))))}
                    className="p-1 hover:text-white rounded"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1 hover:text-white rounded"
                    title="Reset Zoom (100%)"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* The Viewport Stage */}
            <div className="relative w-full min-h-[440px] max-h-[520px] bg-dark-bg/95 flex flex-col justify-center overflow-hidden select-none">
              {/* Layout 1: Side by Side Dual View */}
              {previewLayout === 'side-by-side' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 h-[440px] divide-y sm:divide-y-0 sm:divide-x divide-dark-border">
                  {/* Left Canvas: Original File */}
                  <div className="relative h-full flex flex-col">
                    <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-dark-bg/85 backdrop-blur border border-dark-border/80 text-[10px] font-semibold text-slate-300 flex items-center gap-1 shadow-sm">
                      <ImageIcon className="w-3 h-3 text-slate-400" />
                      <span>Original</span>
                    </div>
                    <div className={`w-full h-full ${bgStyleClass} relative flex items-center justify-center overflow-hidden`}>
                      {renderOriginalCanvas()}
                    </div>
                  </div>

                  {/* Right Canvas: Converted Output */}
                  <div className="relative h-full flex flex-col">
                    <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-dark-bg/85 backdrop-blur border border-dark-border/80 text-[10px] font-semibold text-brand-300 flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3 text-brand-400" />
                      <span>Converted</span>
                    </div>

                    {/* Top Right Quick Actions */}
                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                      {(livePreviewResult?.convertedData || activeFile?.convertedData) && (
                        <button
                          onClick={() => activeFile && handleCopySingle(activeFile)}
                          className="px-2 py-1 rounded-md bg-dark-bg/80 hover:bg-brand-500/30 text-brand-300 text-[10px] font-medium border border-dark-border flex items-center gap-1 shadow-sm transition-colors"
                          title="Copy SVG Code"
                        >
                          {copiedId === activeFile?.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === activeFile?.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                      {activeFile && (
                        <button
                          onClick={() => handleDownloadSingle(activeFile)}
                          className="px-2 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-medium border border-emerald-500/30 flex items-center gap-1 shadow-sm transition-colors"
                          title="Download converted file"
                        >
                          <Download className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                      )}
                    </div>

                    <div className={`w-full h-full ${bgStyleClass} relative flex items-center justify-center overflow-hidden`}>
                      {renderConvertedCanvas()}
                    </div>
                  </div>
                </div>
              )}

              {/* Layout 2: Split Before/After Interactive Drag Slider */}
              {previewLayout === 'split-slider' && (
                <div
                  ref={splitContainerRef}
                  onMouseMove={handleSplitMouseMove}
                  onMouseUp={handleSplitMouseUp}
                  onMouseLeave={handleSplitMouseUp}
                  className={`relative w-full h-[440px] ${bgStyleClass} overflow-hidden cursor-ew-resize`}
                >
                  {/* Full background: Converted Vector */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {renderConvertedCanvas()}
                  </div>

                  {/* Clipped overlay: Original Bitmap */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none border-r-2 border-brand-400 shadow-2xl"
                    style={{ width: `${splitPosition}%` }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        width: splitContainerRef.current ? `${splitContainerRef.current.clientWidth}px` : '100%',
                      }}
                    >
                      {renderOriginalCanvas()}
                    </div>
                  </div>

                  {/* Draggable Divider Handle */}
                  <div
                    onMouseDown={handleSplitMouseDown}
                    className="absolute top-0 bottom-0 -ml-3.5 z-20 flex flex-col items-center justify-center cursor-ew-resize select-none"
                    style={{ left: `${splitPosition}%` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-glow border-2 border-white text-[10px] font-bold">
                      ↔
                    </div>
                  </div>

                  {/* Badges on split */}
                  <div className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded-md bg-dark-bg/85 backdrop-blur border border-dark-border text-[10px] text-slate-300 font-semibold shadow-sm">
                    ◀ Original
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded-md bg-dark-bg/85 backdrop-blur border border-dark-border text-[10px] text-brand-300 font-semibold shadow-sm">
                    Converted Vector ▶
                  </div>
                </div>
              )}

              {/* Layout 3: Focused Views */}
              {previewLayout === 'focus-converted' && (
                <div className={`relative w-full h-[440px] ${bgStyleClass} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-dark-bg/80 backdrop-blur border border-dark-border text-[10px] font-semibold text-brand-300 flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3 text-brand-400" />
                    <span>Full Converted Output</span>
                  </div>
                  {renderConvertedCanvas()}
                </div>
              )}

              {previewLayout === 'focus-original' && (
                <div className={`relative w-full h-[440px] ${bgStyleClass} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-dark-bg/80 backdrop-blur border border-dark-border text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 shadow-sm">
                    <ImageIcon className="w-3 h-3 text-slate-400" />
                    <span>Original Source File</span>
                  </div>
                  {renderOriginalCanvas()}
                </div>
              )}
            </div>

            {/* Multi-file quick selection strip (if multiple files uploaded) */}
            {files.length > 1 && (
              <div className="px-4 py-2 bg-dark-surface/60 border-t border-dark-border flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">
                  Previewing:
                </span>
                {files.map((file, idx) => (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`px-2.5 py-0.5 rounded-md border text-[11px] font-mono transition-colors shrink-0 flex items-center gap-1 ${
                      activeFile?.id === file.id
                        ? 'bg-brand-500/20 border-brand-500/50 text-white font-semibold'
                        : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>#{idx + 1}</span>
                    <span className="truncate max-w-[100px]">{file.name}</span>
                    {file.status === 'done' && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Underneath Canvas: Instant Multi-Format Exporters & Batch Bar */}
          <div className="w-full glass-card rounded-2xl p-4 sm:p-5 border border-dark-border space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-dark-border/60">
              <div className="flex items-center gap-3">
                {isRasterToVector && (
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Scissors className="w-4 h-4 text-amber-400" />
                    <span>
                      Active Engine: <strong className="text-white capitalize">{traceMode} Contour</strong>
                    </span>
                  </div>
                )}
                {isVectorToRaster && (
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Zap className="w-4 h-4 text-brand-400" />
                    <span>
                      DPI: <strong className="text-white">{resolutionMultiplier}x ({customWidth * resolutionMultiplier}px)</strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleConvertAll}
                  disabled={isProcessing || files.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-xs shadow-glow transition-all active:scale-95 disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Processing...' : 'Convert All'}</span>
                </button>

                {files.some((f) => f.status === 'done' || livePreviewResult?.convertedData) && (
                  <button
                    onClick={handleDownloadAllZip}
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-colors"
                    title="Download all converted files as ZIP archive"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ZIP Bundle</span>
                  </button>
                )}
              </div>
            </div>

            {/* Instant Multi-Format Exporters for Active File / Single Input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="text-xs font-bold text-white">Instant Exporters (Single Input):</span>
              </div>
              <InstantAssetExporter
                svgOrImageUrl={activeExportSource}
                baseFilename={activeFile?.name ? activeFile.name.replace(/\.[^/.]+$/, '') : 'converted-asset'}
                appName="Universal Converter"
                layout="bar"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN (lg:col-span-5): REAL-TIME SETTINGS & UPLOAD QUEUE */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Real-Time Engine Settings Panel */}
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-400" />
              <span>Real-Time Engine Settings</span>
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

            {/* Mode: PNG to SVG, JPG to SVG, Image to SVG (Vectorization) */}
            {isRasterToVector && (
              <div className="space-y-3.5 text-xs">
                {/* Vectorizer Mode Preset */}
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Contour Tracing Algorithm</label>
                  <div className="grid grid-cols-3 gap-1.5 bg-dark-surface p-1 rounded-xl border border-dark-border">
                    <button
                      onClick={() => setTraceMode('cricut')}
                      className={`py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors ${
                        traceMode === 'cricut' ? 'bg-brand-500 text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Scissors className="w-3.5 h-3.5 text-amber-300" />
                      <span>Cricut</span>
                    </button>
                    <button
                      onClick={() => setTraceMode('smooth')}
                      className={`py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors ${
                        traceMode === 'smooth' ? 'bg-brand-500 text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                      <span>Smooth</span>
                    </button>
                    <button
                      onClick={() => setTraceMode('detailed')}
                      className={`py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors ${
                        traceMode === 'detailed' ? 'bg-brand-500 text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-blue-300" />
                      <span>Detailed</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Luminance Cutoff Threshold</span>
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
                  <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>Lighter (Dark only)</span>
                    <span>Darker (Capture all)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Path Smoothing & Node Reduction</span>
                    <span className="text-white font-mono">{vectorSmoothing}px</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={vectorSmoothing}
                    onChange={(e) => setVectorSmoothing(Number(e.target.value))}
                    className="w-full accent-brand-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={invertVector}
                      onChange={(e) => setInvertVector(e.target.checked)}
                      className="w-4 h-4 accent-brand-500 rounded"
                    />
                    <span className="text-slate-300 font-medium">Invert Silhouette (Negative Space)</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-slate-400 block mb-1">Path Fill Color</label>
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

                  <div>
                    <label className="text-slate-400 block mb-1">Background Fill</label>
                    <div className="flex items-center gap-2 bg-dark-surface p-1.5 rounded-xl border border-dark-border">
                      <input
                        type="color"
                        value={vectorBgColor === 'transparent' ? '#ffffff' : vectorBgColor}
                        onChange={(e) => setVectorBgColor(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <button
                        onClick={() => setVectorBgColor(vectorBgColor === 'transparent' ? '#ffffff' : 'transparent')}
                        className={`text-[10px] px-1.5 py-1 rounded font-medium ${
                          vectorBgColor === 'transparent' ? 'bg-brand-500/20 text-brand-300' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {vectorBgColor === 'transparent' ? 'Alpha' : 'Solid'}
                      </button>
                    </div>
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

          {/* Card 2: Dropzone & Upload Target */}
          <div className="glass-panel rounded-2xl p-5 border-2 border-dashed border-dark-border hover:border-brand-500/60 transition-colors flex flex-col items-center justify-center text-center relative group">
            <input
              type="file"
              multiple
              accept=".svg, .png, .jpg, .jpeg, .webp, .ico, .bmp, image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-white">
              Drag & drop {isRasterToVector ? 'images (PNG, JPG, WebP)' : 'vectors (SVG) or images'}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Supports up to <strong className="text-brand-300">20MB each</strong>. 100% in-browser.
            </p>
            <span className="mt-2.5 px-3 py-1 rounded-lg bg-dark-surface border border-dark-border text-xs text-slate-200 font-medium group-hover:bg-brand-500/20 group-hover:border-brand-500/40 transition-colors">
              Browse from Computer
            </span>
          </div>

          {/* Card 3: Batch Queue List */}
          <div className="glass-card rounded-2xl p-4 border border-dark-border space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                Files Queue ({files.length})
              </span>
              {files.length > 0 && (
                <button
                  onClick={() => {
                    setFiles([]);
                    setSelectedFileId('');
                  }}
                  className="text-[10px] text-rose-400 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`flex items-center justify-between p-2 rounded-xl border transition-colors cursor-pointer ${
                    activeFile?.id === file.id
                      ? 'border-brand-500 bg-brand-500/15'
                      : file.status === 'done'
                      ? 'bg-emerald-500/10 border-emerald-500/25'
                      : file.status === 'error'
                      ? 'bg-rose-500/10 border-rose-500/25'
                      : 'bg-dark-surface/60 border-dark-border hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-dark-bg p-0.5 border border-dark-border flex items-center justify-center shrink-0 overflow-hidden bg-checkered">
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
                      <p className="text-[11px] font-semibold text-white truncate">{file.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] text-slate-400 font-mono">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                        <span
                          className={`text-[8px] px-1 py-0.2 rounded font-bold uppercase ${
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
                    </div>
                  </div>

                  {/* Actions for Item */}
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    {file.status === 'done' ? (
                      <button
                        onClick={() => handleDownloadSingle(file)}
                        className="p-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-semibold transition-colors"
                        title="Save file"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          const updated = await processItem(file);
                          setFiles((prev) => prev.map((f) => (f.id === file.id ? updated : f)));
                        }}
                        className="px-2 py-0.5 rounded-md bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-300 text-[10px] font-medium"
                      >
                        Convert
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
