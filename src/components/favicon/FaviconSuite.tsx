import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Download, Copy, Check, Sparkles, Upload, Monitor, Smartphone, Globe,
  Terminal, Layers, ArrowRight, Eye, Shield, RefreshCw
} from 'lucide-react';
import { generateFaviconPack, getHtmlHeadSnippet } from '../../lib/zip-generator';
import { getAstroFaviconLayoutSnippet } from '../../lib/astro-generator';
import { renderSvgToBlob } from '../../lib/canvas-renderer';
import { GeminiModal } from '../gemini/GeminiModal';
import { InstantAssetExporter } from '../ui/InstantAssetExporter';

interface FaviconSuiteProps {
  initialSvg?: string;
}

export const FaviconSuite: React.FC<FaviconSuiteProps> = ({ initialSvg }) => {
  // SVG state
  const [svgSource, setSvgSource] = useState<string>(
    initialSvg ||
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="140" fill="url(#g)"/>
  <path d="M160 160 L256 360 L352 160 Z" fill="#ffffff" />
  <circle cx="256" cy="120" r="32" fill="#60a5fa" />
</svg>`
  );

  const [siteName, setSiteName] = useState('VectorForge');
  const [siteUrl, setSiteUrl] = useState('https://vectorforge.dev');
  const [themeColor, setThemeColor] = useState('#3b82f6');
  const [browserMode, setBrowserMode] = useState<'dark' | 'light'>('dark');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [isBundling, setIsBundling] = useState(false);
  const [activeTabPreview, setActiveTabPreview] = useState<'browser' | 'google' | 'ios' | 'android' | 'taskbar'>('browser');
  const [snippetFormat, setSnippetFormat] = useState<'html' | 'astro'>('html');
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);

  // Restore custom SVG if passed from Gemini Studio
  React.useEffect(() => {
    const passedSvg = sessionStorage.getItem('vf_custom_svg');
    if (passedSvg && passedSvg.includes('<svg')) {
      setSvgSource(passedSvg);
      sessionStorage.removeItem('vf_custom_svg');
    }
  }, []);

  const headSnippet = useMemo(() => getHtmlHeadSnippet(themeColor), [themeColor]);
  const astroSnippet = useMemo(() => getAstroFaviconLayoutSnippet(themeColor), [themeColor]);
  const activeSnippet = snippetFormat === 'html' ? headSnippet : astroSnippet;

  // Convert SVG string to data URI for clean preview in mockups
  const svgDataUri = useMemo(() => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgSource)}`;
  }, [svgSource]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text && text.includes('<svg')) {
          setSvgSource(text);
        }
      };
      reader.readAsText(file);
    } else {
      // If user uploads PNG/JPG, wrap it inside an SVG image element
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const wrappedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="${dataUrl}" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
</svg>`;
        setSvgSource(wrappedSvg);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadZip = async () => {
    setIsBundling(true);
    try {
      await generateFaviconPack(svgSource, {
        appName: siteName,
        shortName: siteName.slice(0, 12),
        themeColor,
      });

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error(err);
      alert('Failed to generate bundle. Please ensure valid SVG markup.');
    } finally {
      setIsBundling(false);
    }
  };

  const handleCopyHead = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Production Favicon & App Icon Suite</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Multi-Platform
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate all web, iOS, Android, and Windows icons in a single click with instant multi-platform live mockups.
          </p>
        </div>

        {/* Instant Multi-Format Exporters */}
        <InstantAssetExporter
          svgOrImageUrl={svgSource}
          baseFilename="favicon"
          appName={siteName}
          themeColor={themeColor}
          layout="bar"
        />
      </div>

      {/* Main Grid: Upload & Controls on Left, Realistic Simulators on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Source & Metadata Config */}
        <div className="lg:col-span-5 space-y-5">
          {/* Source Input Card */}
          <div className="glass-panel rounded-2xl p-5 border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-4 h-4 text-brand-400" />
                <span>Favicon Source Asset</span>
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsGeminiModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-300 hover:text-white hover:bg-brand-500/25 text-xs font-medium transition-all shadow-glow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>Generate with Gemini</span>
                </button>

                <label className="text-xs text-slate-400 hover:text-white font-medium cursor-pointer underline flex items-center gap-1">
                  <span>Upload file</span>
                  <input
                    type="file"
                    accept=".svg, .png, .jpg, .webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Live Source Thumbnail & Code toggle */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-dark-surface/60 border border-dark-border">
              <div className="w-16 h-16 rounded-xl bg-checkered p-1.5 border border-dark-border flex items-center justify-center shrink-0">
                <img src={svgDataUri} alt="Favicon source" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">Active Vector Asset</p>
                <p className="text-[11px] text-slate-400">Scalable vector source ready for rasterization</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    512x512
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    SVG Native
                  </span>
                </div>
              </div>
            </div>

            {/* Quick SVG Edit Textarea */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">SVG Markup Code:</label>
              <textarea
                value={svgSource}
                onChange={(e) => setSvgSource(e.target.value)}
                rows={4}
                className="w-full font-mono text-[11px] p-2.5 rounded-xl bg-dark-surface border border-dark-border text-slate-300 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* App Metadata Configuration */}
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Manifest & Meta Tag Settings</span>
            </span>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Website / App Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Website URL (for SERP Mockup)</label>
                <input
                  type="text"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Theme Color</label>
                <div className="flex items-center gap-2 bg-dark-surface p-1.5 rounded-xl border border-dark-border">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="bg-transparent text-xs text-white uppercase flex-1 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Included Files Inventory */}
          <div className="glass-card rounded-2xl p-5 border border-dark-border">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
              Included In Favicon Pack (.zip)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-dark-surface/50 border border-dark-border/60">
                <span className="font-mono text-brand-400 block">favicon.ico</span>
                <span className="text-[10px] text-slate-500">16, 32, 48px embedded</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-surface/50 border border-dark-border/60">
                <span className="font-mono text-purple-400 block">favicon.svg</span>
                <span className="text-[10px] text-slate-500">Infinite vector DPI</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-surface/50 border border-dark-border/60">
                <span className="font-mono text-emerald-400 block">apple-touch-icon</span>
                <span className="text-[10px] text-slate-500">180x180 iOS Retina</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-surface/50 border border-dark-border/60">
                <span className="font-mono text-amber-400 block">android-chrome</span>
                <span className="text-[10px] text-slate-500">192px & 512px PWA</span>
              </div>
              <div className="p-2 rounded-lg bg-dark-surface/50 border border-dark-border/60 col-span-2">
                <span className="font-mono text-blue-400 block">site.webmanifest</span>
                <span className="text-[10px] text-slate-500">PWA compliant JSON configuration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Multi-Platform Live Simulators */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-dark-border space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dark-border/80 pb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-400" />
                  <span>Multi-Platform Live Simulator</span>
                </h3>
                <p className="text-xs text-slate-400">See how your favicon renders on real operating systems and apps</p>
              </div>

              {/* Simulator Tabs */}
              <div className="flex items-center gap-1 bg-dark-surface p-1 rounded-xl border border-dark-border text-xs">
                <button
                  onClick={() => setActiveTabPreview('browser')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTabPreview === 'browser' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Browser
                </button>
                <button
                  onClick={() => setActiveTabPreview('google')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTabPreview === 'google' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Google SERP
                </button>
                <button
                  onClick={() => setActiveTabPreview('ios')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTabPreview === 'ios' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  iOS App
                </button>
                <button
                  onClick={() => setActiveTabPreview('android')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTabPreview === 'android' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Android
                </button>
                <button
                  onClick={() => setActiveTabPreview('taskbar')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTabPreview === 'taskbar' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Windows
                </button>
              </div>
            </div>

            {/* MOCKUP 1: BROWSER TAB SIMULATOR */}
            {activeTabPreview === 'browser' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Chrome / Safari / Firefox tab simulation:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBrowserMode('dark')}
                      className={`px-2.5 py-1 rounded-md text-[11px] ${
                        browserMode === 'dark' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-500'
                      }`}
                    >
                      Dark UI
                    </button>
                    <button
                      onClick={() => setBrowserMode('light')}
                      className={`px-2.5 py-1 rounded-md text-[11px] ${
                        browserMode === 'light' ? 'bg-slate-300 text-slate-900 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      Light UI
                    </button>
                  </div>
                </div>

                <div
                  className={`rounded-xl border overflow-hidden shadow-2xl transition-colors duration-200 ${
                    browserMode === 'dark' ? 'bg-[#181a1f] border-slate-700/80 text-white' : 'bg-[#e2e5e9] border-slate-300 text-slate-900'
                  }`}
                >
                  {/* Browser Window Bar */}
                  <div className={`px-4 pt-3 flex items-center gap-2 border-b ${browserMode === 'dark' ? 'border-slate-800' : 'border-slate-300'}`}>
                    <div className="flex items-center gap-1.5 mr-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* Active Browser Tab */}
                    <div
                      className={`flex items-center gap-2.5 px-4 py-2 rounded-t-lg text-xs max-w-xs ${
                        browserMode === 'dark' ? 'bg-[#282c34] text-slate-200' : 'bg-white text-slate-800 shadow-sm'
                      }`}
                    >
                      <img src={svgDataUri} alt="tab favicon" className="w-4 h-4 rounded-sm shrink-0" />
                      <span className="truncate font-medium">{siteName}</span>
                    </div>

                    {/* Inactive Tab */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-500/40" />
                      <span>Documentation</span>
                    </div>
                  </div>

                  {/* Browser Address Bar */}
                  <div className={`p-2.5 flex items-center gap-3 ${browserMode === 'dark' ? 'bg-[#21252b]' : 'bg-slate-100'}`}>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1 text-xs ${
                      browserMode === 'dark' ? 'bg-[#181a1f] text-slate-300' : 'bg-white text-slate-700'
                    }`}>
                      <span className="text-emerald-500">🔒</span>
                      <span className="font-mono truncate">{siteUrl}</span>
                    </div>
                  </div>

                  {/* Content dummy */}
                  <div className={`p-8 text-center text-xs ${browserMode === 'dark' ? 'text-slate-600 bg-[#1e2227]' : 'text-slate-400 bg-white'}`}>
                    Simulated Web Page Content Viewport
                  </div>
                </div>
              </div>
            )}

            {/* MOCKUP 2: GOOGLE SEARCH SNIPPET */}
            {activeTabPreview === 'google' && (
              <div className="space-y-4 animate-in fade-in">
                <p className="text-xs text-slate-400">Google Search result appearance with verified website favicon:</p>
                <div className="p-6 rounded-2xl bg-[#202124] border border-[#3c4043] text-slate-200 shadow-xl space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#303134] p-1 flex items-center justify-center shrink-0">
                      <img src={svgDataUri} alt="SERP favicon" className="w-4 h-4 rounded-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#dadce0]">{siteName}</p>
                      <p className="text-[11px] text-[#bdc1c6] font-mono">{siteUrl}</p>
                    </div>
                  </div>
                  <h4 className="text-base font-medium text-[#8ab4f8] hover:underline cursor-pointer">
                    {siteName} — The Modern Privacy-First Web Platform
                  </h4>
                  <p className="text-xs text-[#bdc1c6] leading-relaxed">
                    Build lightning-fast web experiences with zero latency. Modern tools designed for developers and teams worldwide.
                  </p>
                </div>
              </div>
            )}

            {/* MOCKUP 3: iOS HOME SCREEN APP ICON */}
            {activeTabPreview === 'ios' && (
              <div className="space-y-4 animate-in fade-in">
                <p className="text-xs text-slate-400">iOS iPhone home screen web clip (apple-touch-icon):</p>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-dark-border flex flex-col items-center justify-center shadow-2xl">
                  <div className="grid grid-cols-3 gap-6 items-center">
                    {/* Simulated iOS icons */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-16 h-16 rounded-[18px] bg-gradient-to-tr from-orange-400 to-amber-500 shadow-lg flex items-center justify-center text-white text-xl font-bold">
                        ☀️
                      </div>
                      <span className="text-[11px] text-white/80 font-medium">Weather</span>
                    </div>

                    {/* VectorForge Generated Icon */}
                    <div className="flex flex-col items-center gap-1.5 scale-110">
                      <div className="w-16 h-16 rounded-[18px] overflow-hidden shadow-2xl ring-2 ring-white/20 p-1 bg-dark-bg flex items-center justify-center">
                        <img src={svgDataUri} alt="iOS icon" className="w-full h-full object-contain rounded-[14px]" />
                      </div>
                      <span className="text-[11px] text-white font-bold drop-shadow">{siteName}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-16 h-16 rounded-[18px] bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg flex items-center justify-center text-white text-xl font-bold">
                        💬
                      </div>
                      <span className="text-[11px] text-white/80 font-medium">Messages</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MOCKUP 4: ANDROID ADAPTIVE ICON */}
            {activeTabPreview === 'android' && (
              <div className="space-y-4 animate-in fade-in">
                <p className="text-xs text-slate-400">Android circular adaptive mask and PWA icon:</p>
                <div className="p-8 rounded-3xl bg-slate-900 border border-dark-border flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-xl ring-2 ring-emerald-500/40 p-2 bg-dark-surface flex items-center justify-center">
                      <img src={svgDataUri} alt="Android circle" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">{siteName} (Round)</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl ring-2 ring-emerald-500/40 p-2 bg-dark-surface flex items-center justify-center">
                      <img src={svgDataUri} alt="Android squircle" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">{siteName} (Squircle)</span>
                  </div>
                </div>
              </div>
            )}

            {/* MOCKUP 5: WINDOWS TASKBAR */}
            {activeTabPreview === 'taskbar' && (
              <div className="space-y-4 animate-in fade-in">
                <p className="text-xs text-slate-400">Windows 11 Centered Taskbar Pinned App Icon:</p>
                <div className="p-4 rounded-2xl bg-[#0f1422] border border-dark-border">
                  <div className="h-14 rounded-xl bg-[#202534]/90 border border-slate-700/60 flex items-center justify-center gap-3 px-4 shadow-xl">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs font-bold">
                      ⊞
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 text-xs">
                      🔍
                    </div>
                    {/* Active App */}
                    <div className="w-9 h-9 rounded-lg bg-slate-700/50 border border-brand-500/40 flex items-center justify-center p-1.5 shadow-glow-sm relative">
                      <img src={svgDataUri} alt="taskbar icon" className="w-full h-full object-contain" />
                      <div className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-brand-400" />
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 text-xs">
                      📁
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Code Snippet Generator */}
          <div className="glass-card rounded-2xl p-5 border border-dark-border space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Integration Snippet</span>
                </span>
                <div className="flex items-center bg-dark-bg/90 p-0.5 rounded-lg border border-dark-border/80 text-xs">
                  <button
                    type="button"
                    onClick={() => setSnippetFormat('html')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      snippetFormat === 'html'
                        ? 'bg-brand-500 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    HTML &lt;head&gt;
                  </button>
                  <button
                    type="button"
                    onClick={() => setSnippetFormat('astro')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                      snippetFormat === 'astro'
                        ? 'bg-brand-500 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Astro Layout</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyHead}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-300 text-xs font-medium transition-colors"
              >
                {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHtml ? 'Copied!' : snippetFormat === 'astro' ? 'Copy Astro Layout' : 'Copy HTML'}</span>
              </button>
            </div>

            {snippetFormat === 'astro' && (
              <p className="text-[11px] text-brand-300/90 bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 rounded-lg">
                💡 <strong>Astro Tip:</strong> Extract generated favicon files into your project's <code className="text-white bg-dark-bg/80 px-1 py-0.5 rounded">public/</code> folder and paste this layout in <code className="text-white bg-dark-bg/80 px-1 py-0.5 rounded">src/layouts/Layout.astro</code>.
              </p>
            )}

            <pre className="p-3.5 rounded-xl bg-dark-bg/90 border border-dark-border text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-72">
              {activeSnippet}
            </pre>
          </div>
      </div>
      </div>

      {/* Dedicated Instant Multi-Format Exporters Panel */}
      <InstantAssetExporter
        svgOrImageUrl={svgSource}
        baseFilename="favicon"
        appName={siteName}
        themeColor={themeColor}
        layout="panel"
      />

      <GeminiModal
        isOpen={isGeminiModalOpen}
        onClose={() => setIsGeminiModalOpen(false)}
        onSelectSvg={(svg) => setSvgSource(svg)}
      />
    </div>
  );
};
