import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import {
  Upload, Download, Copy, Check, Sparkles, Layers, RefreshCw,
  Shield, Printer, Code, Link2, Unlink2, Trash2, FileArchive, CheckCircle2,
  ZoomIn, ZoomOut, Monitor
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

const SAMPLE_SVGS_PT = [
  {
    name: 'icone-estrela-vetor.svg',
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
    name: 'escudo-seguranca-vetor.svg',
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

export const PortugueseSvgToPngPage: React.FC = () => {
  // Configuração da conversão
  const [scaleFactor, setScaleFactor] = useState<number>(2);
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);
  const [aspectLocked, setAspectLocked] = useState<boolean>(true);
  const [baseAspectRatio, setBaseAspectRatio] = useState<number>(1);
  const [dpi, setDpi] = useState<number>(300);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  // Fila de arquivos
  const [queue, setQueue] = useState<SvgQueueItem[]>([]);
  const [selectedQueueId, setSelectedQueueId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isCanvasRendering, setIsCanvasRendering] = useState<boolean>(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isConvertingAll, setIsConvertingAll] = useState<boolean>(false);
  const [rawModalOpen, setRawModalOpen] = useState<boolean>(false);
  const [rawSvgInput, setRawSvgInput] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  // Item ativo para visualização lateral
  const activeItem = queue.find((q) => q.id === selectedQueueId) || queue[0];

  // Extrair dimensões do SVG
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

  // Adicionar SVG à fila
  const addSvgToQueue = useCallback((name: string, content: string, sizeBytes: number) => {
    const { width, height } = extractSvgDimensions(content);
    const id = `svg-pt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
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

  // Efeito de renderização do Canvas em tempo real para pré-visualização lateral
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
        console.error('Erro na renderização do canvas:', err);
        if (isMounted) setIsCanvasRendering(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeItem, customWidth, customHeight, scaleFactor, isTransparent, backgroundColor]);

  // Colar da área de transferência (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.clipboardData) {
        const text = e.clipboardData.getData('text');
        if (text && text.trim().startsWith('<svg') && text.includes('</svg>')) {
          e.preventDefault();
          addSvgToQueue(`vetor-colado-${Date.now().toString().slice(-4)}.svg`, text, text.length);
          return;
        }

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

  const handleScaleSelect = (factor: number) => {
    setScaleFactor(factor);
    if (queue.length > 0) {
      const first = queue[0];
      setCustomWidth(Math.round(first.originalWidth * factor));
      setCustomHeight(Math.round(first.originalHeight * factor));
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setCustomWidth(newWidth);
    if (aspectLocked && baseAspectRatio > 0) {
      setCustomHeight(Math.round(newWidth / baseAspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setCustomHeight(newHeight);
    if (aspectLocked && baseAspectRatio > 0) {
      setCustomWidth(Math.round(newHeight * baseAspectRatio));
    }
  };

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
      console.error('Falha ao copiar:', err);
    }
  };

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
        saveAs(zipBlob, `svgfav-png-pacote-${Date.now().toString().slice(-4)}.zip`);

        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 },
        });
      }
    } catch (err) {
      console.error('Erro na conversão em lote:', err);
    } finally {
      setIsConvertingAll(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    setQueue((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (selectedQueueId === id) {
        setSelectedQueueId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
  };

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

  const handleRawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rawSvgInput.trim()) {
      addSvgToQueue(`vetor-personalizado-${Date.now().toString().slice(-4)}.svg`, rawSvgInput.trim(), rawSvgInput.length);
      setRawSvgInput('');
      setRawModalOpen(false);
    }
  };

  const breadcrumbsList = [
    { name: 'Início', path: '/' },
    { name: 'Conversores', path: '/convert' },
    { name: 'SVG para PNG' }
  ];

  // Schema.org JSON-LD oficial do item 5
  const rawSchemaPt = [
    {
      "@type": "WebApplication",
      "name": "Conversor de SVG para PNG Online - SvgFav",
      "url": "https://svgfav.com/pt-br/conversor-svg-para-png",
      "description": "Ferramenta online gratuita para converter arquivo SVG para PNG com fundo transparente e alta resolução diretamente no navegador.",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All",
      "inLanguage": "pt-BR",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      }
    },
    {
      "@type": "FAQPage",
      "inLanguage": "pt-BR",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Por que transformar um arquivo SVG para PNG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O formato PNG com fundo transparente é necessário para garantir compatibilidade com redes sociais, documentos do Office e plataformas de e-mail que não renderizam arquivos vetoriais SVG diretamente."
          }
        },
        {
          "@type": "Question",
          "name": "É seguro converter arquivo SVG para PNG no SvgFav?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. A conversão ocorre 100% no navegador do usuário sem upload para servidores externos, garantindo privacidade e total conformidade com a LGPD."
          }
        }
      ]
    }
  ];

  return (
    <div className="w-full space-y-16">
      {/* 1. Metadados e Tags Técnicas dedicadas para Google Brasil (pt-BR) */}
      <SeoHead
        title="Conversor de SVG para PNG — Grátis, Alta Resolução e 100% Seguro"
        description="Converta arquivo SVG para PNG online com fundo transparente e alta resolução (300 DPI). Conversor de SVG para PNG grátis, rápido e direto no seu navegador."
        keywords="conversor svg para png, converter svg para png, svg para png transparente, transformar svg em png, vetor para png alta resolucao"
        canonicalUrl="https://svgfav.com/pt-br/conversor-svg-para-png"
        ogLocale="pt_BR"
        hreflangAlternates={[
          { lang: 'x-default', url: 'https://svgfav.com/' },
          { lang: 'en', url: 'https://svgfav.com/' },
          { lang: 'pt', url: 'https://svgfav.com/pt/' },
          { lang: 'pt-BR', url: 'https://svgfav.com/pt-br/conversor-svg-para-png' },
          { lang: 'de', url: 'https://svgfav.com/de/' },
          { lang: 'fr', url: 'https://svgfav.com/fr/' },
          { lang: 'es', url: 'https://svgfav.com/es/' }
        ]}
        rawSchemaGraph={rawSchemaPt}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={breadcrumbsList} />
      </div>

      {/* 2. ACIMA DA DOBRA: HERO E CONVERSOR INTERATIVO COM PRÉ-VISUALIZAÇÃO EM CANVAS AO VIVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rasterizador Vetorial de Alta Velocidade &bull; Aceleração por GPU</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
            Conversor de SVG para PNG
          </h1>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Converta arquivos vetoriais SVG em imagens rasterizadas PNG de alta definição diretamente no seu navegador. Rápido, seguro e sem limite de upload.
          </p>
        </div>

        {/* Workspace em Grade de 2 Colunas com Pré-visualização Lateral em Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Esquerda: Dropzone, Controles e Fila de Arquivos */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 shadow-xl transition-all space-y-6">
            
            {/* Área de Dropzone */}
            <div
              ref={dropAreaRef}
              id="drop-area"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-brand-500 dark:hover:border-blue-500 rounded-xl p-6 sm:p-10 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-neutral-900/50 group"
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
              
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div className="text-slate-700 dark:text-neutral-300 text-sm sm:text-base font-medium">
                <span className="text-brand-600 dark:text-blue-400 font-semibold underline underline-offset-2">Clique para enviar</span> ou arraste os arquivos SVG aqui
              </div>
              
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-neutral-500 mt-1.5">
                Suporta conversão em lote &bull; Colar da área de transferência (<kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-[10px] font-mono">Ctrl+V</kbd>) &bull; Máx. 50MB
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setRawModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-medium transition-colors"
                >
                  <Code className="w-3.5 h-3.5 text-brand-500 dark:text-blue-400" />
                  <span>Colar Código SVG / URL</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    const sample = SAMPLE_SVGS_PT[Math.floor(Math.random() * SAMPLE_SVGS_PT.length)];
                    addSvgToQueue(sample.name, sample.svg, sample.svg.length);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 text-brand-600 dark:text-blue-300 text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Testar Ícone de Exemplo</span>
                </button>
              </div>
            </div>

            {/* Micro-tag de Segurança (LGPD) */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <Shield className="w-4 h-4 shrink-0" />
              <span className="text-center text-[11px] sm:text-xs">100% no seu navegador: Seus arquivos nunca são enviados para um servidor externo (Em conformidade com a LGPD).</span>
            </div>

            {/* Personalização Rápida de Saída */}
            <div className="pt-4 border-t border-slate-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              
              {/* Fator de Escala (1x, 2x, 3x, 4x) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1.5">
                  Fator de Escala
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleScaleSelect(s)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        scaleFactor === s
                          ? 'bg-brand-600 dark:bg-blue-600 text-white shadow-md shadow-brand-500/20'
                          : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamanho Personalizado (px) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                    Tamanho (px)
                  </label>
                  <button
                    type="button"
                    onClick={() => setAspectLocked(!aspectLocked)}
                    className="text-xs text-slate-400 hover:text-brand-500 dark:hover:text-blue-400 flex items-center gap-1"
                    title={aspectLocked ? 'Proporção Bloqueada' : 'Proporção Livre'}
                  >
                    {aspectLocked ? <Link2 className="w-3.5 h-3.5 text-brand-500" /> : <Unlink2 className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{aspectLocked ? 'Bloqueado' : 'Livre'}</span>
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
                    placeholder="L"
                  />
                  <span className="text-slate-400 text-xs font-bold">&times;</span>
                  <input
                    type="number"
                    min="16"
                    max="8192"
                    value={customHeight}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 16)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-brand-500"
                    placeholder="A"
                  />
                </div>

                {/* Presets Rápidos de Resolução */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {[
                    { label: '32px Favicon', w: 32, h: 32 },
                    { label: '512px Ícone App', w: 512, h: 512 },
                    { label: '1080px Instagram', w: 1080, h: 1080 },
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

              {/* Fundo Transparente (Alpha) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1.5">
                  Preenchimento de Fundo
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="relative flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="transparent-pt"
                      checked={isTransparent}
                      onChange={(e) => setIsTransparent(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-neutral-700 text-brand-600 dark:text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                      Transparente (Alpha)
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

              {/* Botão de Conversão Principal */}
              <div>
                <button
                  type="button"
                  onClick={handleConvertAll}
                  disabled={queue.length === 0 || isConvertingAll}
                  className="w-full px-4 py-2 bg-brand-600 dark:bg-blue-600 hover:bg-brand-500 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {isConvertingAll ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Rasterizando...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{queue.length > 1 ? `Converter Tudo (${queue.length})` : 'Converter e Baixar'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Fila de Arquivos em Lote */}
            {queue.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                      Fila de Arquivos ({queue.length})
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-[11px] font-mono text-slate-600 dark:text-neutral-400">
                      Destino: {customWidth}&times;{customHeight}px &bull; {dpi} DPI
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
                        <span>Baixar .ZIP</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Limpar</span>
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-neutral-800/80 max-h-64 overflow-y-auto pr-1">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedQueueId(item.id)}
                      className={`py-2.5 px-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all border ${
                        activeItem?.id === item.id
                          ? 'bg-brand-500/10 dark:bg-blue-500/10 border-brand-500/30 dark:border-blue-500/30 ring-1 ring-brand-500/20'
                          : 'hover:bg-slate-50 dark:hover:bg-neutral-800/40 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden shrink-0">
                          {item.previewDataUrl ? (
                            <img src={item.previewDataUrl} alt={item.name} className="w-7 h-7 object-contain" />
                          ) : (
                            <span className="text-slate-400 text-xs">SVG</span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-800 dark:text-neutral-200 truncate flex items-center gap-1.5">
                            <span>{item.name}</span>
                            {activeItem?.id === item.id && (
                              <span className="px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-600 dark:text-blue-400 text-[10px] font-semibold">
                                No Canvas
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 flex items-center gap-2 mt-0.5">
                            <span>Original: {item.originalWidth}&times;{item.originalHeight}</span>
                            <span>&bull;</span>
                            <span className="text-brand-600 dark:text-blue-400 font-medium">
                              Destino: {customWidth}&times;{customHeight}px
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleCopyToClipboard(item)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 text-xs flex items-center gap-1 transition-colors"
                          title="Copiar imagem PNG"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadSingle(item)}
                          disabled={item.status === 'converting'}
                          className="p-1.5 rounded-lg bg-brand-600 dark:bg-blue-600 hover:bg-brand-500 dark:hover:bg-blue-500 text-white text-xs transition-all shadow-sm active:scale-95"
                          title="Baixar PNG"
                        >
                          {item.status === 'converting' ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita: Pré-visualização Lateral Dedicada em Canvas */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xl transition-all space-y-4">
              
              {/* Cabeçalho do Canvas com Indicador em Tempo Real e Zoom */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200">
                    Prévia em Canvas ao Vivo
                  </span>
                </div>

                {/* Controles de Zoom */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                    className="p-1 rounded bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 text-xs transition-colors"
                    title="Diminuir Zoom"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-[10px] font-mono text-slate-700 dark:text-neutral-300 font-medium"
                    title="Redefinir Zoom"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                    className="p-1 rounded bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 text-xs transition-colors"
                    title="Aumentar Zoom"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Área do Canvas com Padrão de Transparência Xadrez */}
              <div className="relative rounded-xl border border-slate-200 dark:border-neutral-800 overflow-hidden min-h-[300px] max-h-[400px] flex items-center justify-center p-4 bg-slate-100 dark:bg-neutral-950">
                
                {/* Fundo Xadrez de Transparência */}
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

                {/* O Elemento HTML5 Canvas ou Placeholder Vazio */}
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
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Canvas Pronto</h4>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 max-w-[220px] mt-0.5">
                          Envie um arquivo SVG ou teste um ícone de exemplo para visualizar a rasterização sub-pixel.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const sample = SAMPLE_SVGS_PT[0];
                          addSvgToQueue(sample.name, sample.svg, sample.svg.length);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-blue-950/60 hover:bg-brand-100 dark:hover:bg-blue-900/60 text-brand-600 dark:text-blue-300 text-xs font-semibold border border-brand-200 dark:border-blue-800/80 transition-colors shadow-sm"
                      >
                        Carregar Vetor Demo
                      </button>
                    </div>
                  )}
                </div>

                {/* Tag Flutuante de Dimensões */}
                <div className="absolute bottom-2.5 left-2.5 z-20 px-2.5 py-1 rounded-lg bg-slate-900/80 dark:bg-black/80 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                  <Monitor className="w-3 h-3 text-brand-400" />
                  <span>{customWidth}&times;{customHeight} px &bull; {dpi} DPI</span>
                </div>

                {/* Overlay de Progresso de Rasterização */}
                {isCanvasRendering && activeItem && (
                  <div className="absolute inset-0 z-30 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-semibold text-slate-800 dark:text-white">
                    <RefreshCw className="w-4 h-4 animate-spin text-brand-600 dark:text-blue-400" />
                    <span>Rasterizando no Canvas...</span>
                  </div>
                )}
              </div>

              {/* Detalhes do Arquivo Ativo */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-neutral-400">Arquivo Ativo:</span>
                  <span className="font-bold text-slate-800 dark:text-neutral-200 truncate max-w-[200px]">
                    {activeItem ? activeItem.name : 'Aguardando envio...'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-neutral-400">Formato &amp; Alpha:</span>
                  <span className="text-brand-600 dark:text-blue-400 font-medium">
                    PNG ({isTransparent ? 'Alpha Transparente' : `Sólido ${backgroundColor}`})
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-neutral-700/40">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Buffer do Canvas 2D ao Vivo</span>
                  </span>
                  <span>Zero Upload para Servidor</span>
                </div>
              </div>

              {/* Ações da Pré-visualização Lateral */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => activeItem && handleDownloadSingle(activeItem)}
                  disabled={!activeItem || activeItem.status === 'converting'}
                  className="px-3 py-2 rounded-xl bg-brand-600 dark:bg-blue-600 hover:bg-brand-500 dark:hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PNG</span>
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
                      <span className="text-emerald-500">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Imagem</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTEÚDO EDUCACIONAL E RECURSOS (SEO TEXT ABAIXO DA FERRAMENTA) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* H2: Como Converter SVG para PNG em 3 Passos Simples */}
        <div className="rounded-3xl p-8 sm:p-12 bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-blue-400 block mb-1">
              Guia Passo a Passo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Como Converter SVG para PNG em 3 Passos Simples
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-2">
              Transforme vetores em imagens bitmap com resolução ultra nítida sem sair do navegador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500/15 text-brand-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Passo 1: Carregue seu Arquivo SVG
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Arraste e solte o arquivo <code>.svg</code>, cole o código vetorial direto da sua área de transferência ou envie uma pasta inteira para conversão em lote.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Passo 2: Defina as Dimensões e Escala
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Escolha tamanhos padrão para web (16&times;16, 32&times;32, 512&times;512 px), aplique multiplicadores para telas Retina (2&times;, 3&times;, 4&times;) ou defina resoluções personalizadas em até 300 DPI.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Passo 3: Baixe em PNG com Transparência
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Obtenha seu arquivo PNG gerado instantaneamente com canal alfa transparente ou cor sólida. Baixe individualmente ou exporte todos agrupados em um único arquivo .ZIP.
              </p>
            </div>
          </div>
        </div>

        {/* H2: Por Que Usar Nosso Conversor de SVG para PNG? */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Por Que Usar Nosso Conversor de SVG para PNG?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Desenvolvido com tecnologia web moderna para designers, ilustradores e desenvolvedores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Rasterização Direta no Navegador (Zero Latência)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                Ao contrário de outros conversores que exigem fila de espera em nuvem, nossa ferramenta utiliza a API Canvas e aceleração gráfica do seu próprio dispositivo.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Pronto para Impressão e Telas Retina
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                Ajuste a densidade de pixels (72 DPI para web ou 300 DPI para impressão gráfica profissional). As curvas de Bézier mantêm a nitidez impecável sem serrilhamento.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Total Privacidade e Proteção de Dados (LGPD)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                Nenhum arquivo de design sensível ou logotipo de cliente é transmitido para servidores terceiros. Seus arquivos permanecem estritamente em sua máquina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO DE PERGUNTAS FREQUENTES (FAQ ACORDEÃO / SCHEMA RICH SNIPPETS) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Perguntas Frequentes sobre a Conversão de SVG em PNG
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Respostas técnicas sobre rasterização de vetores, escalas de resolução e segurança LGPD.
          </p>
        </div>

        {/* FAQ Item 1 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>Por que transformar um arquivo SVG para PNG?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            Embora o SVG seja ideal para design responsivo na web, formatos vetoriais não são aceitos em todas as plataformas. Redes sociais (como cards do WhatsApp, Instagram e LinkedIn), softwares legados, documentos do Microsoft Word e plataformas de e-mail marketing (como Gmail e Outlook) exigem imagens rasterizadas no formato PNG para exibir ilustrações com fundo transparente.
          </div>
        </details>

        {/* FAQ Item 2 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>A conversão de SVG em PNG perde a qualidade da imagem?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            Não. O formato SVG é baseado em coordenadas matemáticas e vetores, permitindo ampliar o tamanho da imagem antes da conversão para qualquer escala desejada (até 4096px+ e 300 DPI). Nosso algoritmo aplica anti-aliasing de sub-pixel para garantir bordas suaves e máxima fidelidade visual.
          </div>
        </details>

        {/* FAQ Item 3 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>É seguro converter meus arquivos e logotipos nesta ferramenta?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            Sim, 100% seguro. O processamento acontece localmente no seu computador através de JavaScript. Nenhum dado ou arquivo é enviado para servidores externos, garantindo conformidade absoluta com a Lei Geral de Proteção de Dados (LGPD).
          </div>
        </details>

        {/* FAQ Item 4 */}
        <details className="group border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 bg-white/80 dark:bg-neutral-900/50 open:bg-white dark:open:bg-neutral-900 transition-colors shadow-sm">
          <summary className="cursor-pointer font-medium text-base sm:text-lg list-none flex justify-between items-center text-slate-900 dark:text-neutral-100 select-none">
            <span>Posso converter múltiplos arquivos SVG para PNG de uma vez?</span>
            <span className="transition-transform group-open:rotate-180 text-slate-400 dark:text-neutral-400 text-xs">▼</span>
          </summary>
          <div className="mt-3 text-slate-700 dark:text-neutral-300 leading-relaxed text-sm">
            Sim. Você pode selecionar dezenas de ícones ou ilustrações simultaneamente, ajustar as configurações em lote e baixar todos os arquivos processados em um único arquivo compactado (.ZIP).
          </div>
        </details>
      </section>

      {/* Modal para Colar SVG / URL */}
      {rawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-brand-500" />
                <span>Colar Código Vetorial SVG</span>
              </h3>
              <button
                type="button"
                onClick={() => setRawModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
              >
                Cancelar
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!rawSvgInput.trim()}
                  className="px-5 py-2 rounded-lg bg-brand-600 dark:bg-blue-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm disabled:opacity-50"
                >
                  Adicionar à Fila
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
