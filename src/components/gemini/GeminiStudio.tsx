import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Sparkles, Wand2, Download, Copy, Check, Key, Code,
  Eye, AlertCircle, Loader2, ArrowRight, Shield, ExternalLink
} from 'lucide-react';
import {
  GeminiModel,
  AssetTargetType,
  generateAssetWithGemini,
  getStoredApiKey,
  setStoredApiKey,
  getStoredModel,
  setStoredModel,
  DEMO_PRESETS
} from '../../lib/gemini';
import {
  detectCodeType,
  renderCodeToCanvas,
  exportCodeToSvg,
  exportCodeToPngBlob,
  exportCodeToIcoBlob,
  downloadFile,
  downloadText
} from '../../lib/code-importer';
import { generateFaviconPack } from '../../lib/zip-generator';

export const GeminiStudio: React.FC = () => {
  const navigate = useNavigate();

  // Mode: AI Generation vs Direct Code Import
  const [activeTab, setActiveTab] = useState<'ai' | 'importer'>('ai');

  // AI Generator state
  const [prompt, setPrompt] = useState('Modern electric cyber lightning bolt icon on dark rounded hex shield, neon cyan & violet glow');
  const [aiTarget, setAiTarget] = useState<AssetTargetType>('svg');
  const [model, setModel] = useState<GeminiModel>(getStoredModel());
  const [apiKey, setApiKey] = useState<string>(getStoredApiKey());
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Code & Target
  const [currentCodeType, setCurrentCodeType] = useState<AssetTargetType>('svg');
  const [codeContent, setCodeContent] = useState<string>(DEMO_PRESETS[0].code);

  // Preview & Canvas rendering state
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [previewBg, setPreviewBg] = useState<'checker' | 'dark' | 'light'>('dark');
  const [renderError, setRenderError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Export parameters
  const [pngResolution, setPngResolution] = useState<number>(512);
  const [pngBgColor, setPngBgColor] = useState<string>('transparent');

  const reRenderCanvas = useCallback(async (type: AssetTargetType, code: string) => {
    try {
      setRenderError(null);
      const rendered = await renderCodeToCanvas(type, code, 512);
      const canvas = previewCanvasRef.current;
      if (canvas) {
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, 512, 512);
          ctx.drawImage(rendered, 0, 0);
        }
      }
    } catch (err: any) {
      setRenderError(err?.message || 'Failed to render code onto canvas');
    }
  }, []);

  // Load initial demo
  useEffect(() => {
    reRenderCanvas(currentCodeType, codeContent);
  }, [codeContent, currentCodeType, reRenderCanvas]);

  const handleRunAiGenerate = async () => {
    setIsGenerating(true);
    setRenderError(null);

    try {
      const result = await generateAssetWithGemini(prompt, aiTarget, { apiKey, model });
      setCurrentCodeType(aiTarget);
      setCodeContent(result.code);
    } catch (err: any) {
      setRenderError(err?.message || 'Failed to generate code with Gemini.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCodePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const pasted = e.target.value;
    setCodeContent(pasted);
    const detected = detectCodeType(pasted);
    setCurrentCodeType(detected);
  };

  const handleSelectPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setCurrentCodeType(preset.targetType);
    setCodeContent(preset.code);
    setPrompt(preset.prompt);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadSvg = async () => {
    try {
      setIsExporting(true);
      const svgMarkup = await exportCodeToSvg(currentCodeType, codeContent);
      downloadText(svgMarkup, 'gemini-vector.svg', 'image/svg+xml');
      triggerConfetti();
    } catch (err: any) {
      alert('Error exporting SVG: ' + err?.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPng = async () => {
    try {
      setIsExporting(true);
      const blob = await exportCodeToPngBlob(currentCodeType, codeContent, pngResolution, pngBgColor);
      downloadFile(blob, `gemini-asset-${pngResolution}x${pngResolution}.png`);
      triggerConfetti();
    } catch (err: any) {
      alert('Error exporting PNG: ' + err?.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadIco = async () => {
    try {
      setIsExporting(true);
      const blob = await exportCodeToIcoBlob(currentCodeType, codeContent);
      downloadFile(blob, 'favicon.ico');
      triggerConfetti();
    } catch (err: any) {
      alert('Error exporting Favicon ICO: ' + err?.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadFaviconPack = async () => {
    try {
      setIsExporting(true);
      const svgMarkup = await exportCodeToSvg(currentCodeType, codeContent);
      await generateFaviconPack(svgMarkup, {
        appName: 'Gemini App',
        shortName: 'Gemini',
        themeColor: '#6366f1',
      });
      triggerConfetti();
    } catch (err: any) {
      alert('Error generating Favicon Pack: ' + err?.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSendToFaviconSuite = async () => {
    try {
      const svgMarkup = await exportCodeToSvg(currentCodeType, codeContent);
      sessionStorage.setItem('vf_custom_svg', svgMarkup);
      navigate('/tools/favicon-generator');
    } catch (err: any) {
      alert('Failed to transfer SVG: ' + err?.message);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const quickPrompts = [
    { label: 'Cyber Shield', prompt: 'Futuristic cybersecurity shield with glowing cyan circuits and neon purple core' },
    { label: 'AI Neural Core', prompt: 'Luminous neural processor chip with glowing interconnects, clean vector style' },
    { label: 'Rocket Mascot', prompt: 'Modern minimalist cartoon rocket launching with vibrant orange & violet exhaust flame' },
    { label: 'Crypto Monogram', prompt: 'Geometric luxury crypto monogram badge with golden gradient and dark backing' },
    { label: 'Cloud SaaS', prompt: 'Modern cloud hosting icon with embedded lightning bolt and smooth glass gradient' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Top Banner & Control Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-dark-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Gemini AI & Code Importer Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Vector & Multi-Format Code Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Generate from natural language with Google Gemini or import custom SVG, HTML/CSS, and JavaScript/Java Canvas code.
              Instant GPU rasterization to SVG, high-DPI PNGs, and Favicon (.ico).
            </p>
          </div>

          {/* Quick API Key & Settings Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-brand-500/40 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <Key className={`w-3.5 h-3.5 ${apiKey ? 'text-emerald-400' : 'text-brand-400'}`} />
              <span>{apiKey ? 'Gemini API Key Active' : 'Zero-Key Mode (Active)'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Gemini AI vs Code Importer */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-dark-border/60">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-white hover:bg-dark-hover'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate with Gemini AI</span>
          </button>

          <button
            onClick={() => setActiveTab('importer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'importer'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-glow-sm'
                : 'text-slate-400 hover:text-white hover:bg-dark-hover'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Import Code (SVG / HTML / JS Canvas)</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Controls / Right Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input & Generation Settings */}
        <div className="lg:col-span-6 space-y-6">
          {activeTab === 'ai' ? (
            /* Gemini AI Generator Card */
            <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4" />
                  Gemini Prompt Studio
                </span>
                <span className="text-[11px] text-slate-400">
                  Engine: <strong className="text-white">{apiKey ? model : 'Zero-Key In-Browser'}</strong>
                </span>
              </div>

              {/* API Key & Latest Model Controls */}
              <div className="p-3.5 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className={`w-4 h-4 ${apiKey ? 'text-emerald-400' : 'text-brand-400'}`} />
                    <span className="text-xs font-semibold text-white">
                      {apiKey ? 'Google Gemini API Key Active' : 'Zero-Key Mode (No API Key Required)'}
                    </span>
                  </div>
                  <a
                    href="https://aistudio.google.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Get Free Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Inline API Key input & Model Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-7 flex gap-1.5">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => {
                        const val = e.target.value;
                        setApiKey(val);
                        setStoredApiKey(val);
                        if (val.trim() && (!model || model.includes('2.0') || model.includes('2.5'))) {
                          setModel('gemini-3.6-flash');
                          setStoredModel('gemini-3.6-flash');
                        }
                      }}
                      placeholder="Paste Gemini API key (optional)..."
                      className="w-full px-3 py-1.5 rounded-lg bg-dark-input border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                    />
                    {apiKey && (
                      <button
                        type="button"
                        onClick={() => {
                          setApiKey('');
                          setStoredApiKey('');
                        }}
                        title="Clear API Key"
                        className="px-2 py-1 rounded-lg text-slate-400 hover:text-red-400 bg-dark-hover text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="sm:col-span-5">
                    <select
                      value={model}
                      onChange={(e) => {
                        const m = e.target.value as GeminiModel;
                        setModel(m);
                        setStoredModel(m);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-dark-input border border-dark-border text-xs text-slate-200 focus:outline-none font-medium"
                    >
                      {apiKey.trim() && (
                        <>
                          <option value="gemini-3.6-flash" className="text-brand-400 font-bold bg-dark-bg">
                            ✨ Gemini 3.6 Flash (Official Recommended)
                          </option>
                          <option value="gemini-3.8-flash" className="text-brand-400 font-bold bg-dark-bg">
                            ✨ Gemini 3.8 Flash (Latest Preview)
                          </option>
                        </>
                      )}
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                      <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Deep Reasoning)</option>
                      <option value="gemini-flash-latest">Gemini Flash Latest</option>
                    </select>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  {apiKey
                    ? `Generating via official Google Gemini API using model: ${model}.`
                    : 'Instant in-browser AI generation is active. Paste your API key anytime to unlock Google\'s latest cloud models.'}
                </p>
              </div>

              {/* Prompt Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">Describe your vector icon, logo, or favicon</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  placeholder="e.g. Glowing neon rocket icon with cyan and violet gradients, modern geometric curves..."
                  className="w-full px-4 py-3 rounded-xl bg-dark-input border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors leading-relaxed"
                />
              </div>

              {/* Target Code Format */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Generation Target:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setAiTarget('svg')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      aiTarget === 'svg'
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm'
                        : 'bg-dark-bg/60 border-dark-border text-slate-400 hover:text-white'
                    }`}
                  >
                    Pure SVG (Best)
                  </button>
                  <button
                    onClick={() => setAiTarget('html-css')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      aiTarget === 'html-css'
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm'
                        : 'bg-dark-bg/60 border-dark-border text-slate-400 hover:text-white'
                    }`}
                  >
                    HTML + CSS
                  </button>
                  <button
                    onClick={() => setAiTarget('canvas-js')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      aiTarget === 'canvas-js'
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm'
                        : 'bg-dark-bg/60 border-dark-border text-slate-400 hover:text-white'
                    }`}
                  >
                    Canvas (JS/Java)
                  </button>
                </div>
              </div>

              {/* Quick Prompt Inspiration Chips */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400">Quick Prompt Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((qp, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(qp.prompt)}
                      className="px-2.5 py-1 rounded-lg bg-dark-hover border border-dark-border text-[11px] text-slate-300 hover:text-brand-300 hover:border-brand-500/40 transition-colors"
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Action Button */}
              <button
                onClick={handleRunAiGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini is generating artwork...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Vector with Gemini</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Code Importer & Live Editor Card */
            <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-4 h-4" />
                  Code Importer & Sandbox
                </span>

                {/* Detected Type Badge */}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase font-semibold">
                  Detected: {currentCodeType}
                </span>
              </div>

              {/* Format selection tabs */}
              <div className="flex items-center gap-2">
                {(['svg', 'html-css', 'canvas-js'] as AssetTargetType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCurrentCodeType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      currentCodeType === type
                        ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                        : 'text-slate-400 hover:text-white bg-dark-bg/60 border border-dark-border'
                    }`}
                  >
                    {type === 'svg' ? 'SVG Vector' : type === 'html-css' ? 'HTML + CSS' : 'Canvas (JS/Java)'}
                  </button>
                ))}
              </div>

              {/* Live Code Area */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Paste or edit your code:</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-brand-400 hover:text-brand-300"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <textarea
                  value={codeContent}
                  onChange={handleCodePaste}
                  rows={12}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 border border-dark-border font-mono text-xs text-slate-200 focus:outline-none focus:border-brand-500 leading-relaxed resize-y"
                  placeholder="Paste <svg>...</svg>, HTML+CSS, or Canvas JS code here..."
                />
              </div>

              {/* Demo Preset Selectors */}
              <div className="space-y-1.5 pt-2 border-t border-dark-border/60">
                <span className="text-[11px] font-semibold text-slate-400">Try Pre-Built AI Demos:</span>
                <div className="grid grid-cols-2 gap-2">
                  {DEMO_PRESETS.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => handleSelectPreset(demo)}
                      className="px-2.5 py-2 rounded-xl bg-dark-hover border border-dark-border hover:border-brand-500/40 text-left text-xs text-slate-300 hover:text-brand-300 transition-colors"
                    >
                      <span className="font-semibold block truncate">{demo.title}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{demo.targetType}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Render Error Alert */}
          {renderError && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{renderError}</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live Interactive Sandbox & Export Hub */}
        <div className="lg:col-span-6 space-y-6">
          {/* Visual Sandbox Card */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-bold text-white">Live Canvas Sandbox (512x512)</span>
              </div>

              {/* Background switches */}
              <div className="flex items-center gap-1 bg-dark-bg p-1 rounded-lg border border-dark-border text-xs">
                <button
                  onClick={() => setPreviewBg('dark')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    previewBg === 'dark' ? 'bg-dark-hover text-white' : 'text-slate-400'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setPreviewBg('light')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    previewBg === 'light' ? 'bg-dark-hover text-white' : 'text-slate-400'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setPreviewBg('checker')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    previewBg === 'checker' ? 'bg-dark-hover text-white' : 'text-slate-400'
                  }`}
                >
                  Alpha
                </button>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div
              className={`w-full aspect-square max-w-[420px] mx-auto rounded-2xl border border-dark-border flex items-center justify-center p-6 shadow-2xl transition-all relative overflow-hidden ${
                previewBg === 'dark'
                  ? 'bg-[#0b0f19]'
                  : previewBg === 'light'
                  ? 'bg-slate-100'
                  : 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-[#0b0f19]'
              }`}
            >
              <canvas
                ref={previewCanvasRef}
                className="w-full h-full object-contain drop-shadow-md rounded-xl"
              />
            </div>

            {/* Multi-Platform Simulation Preview Badges */}
            <div className="pt-2 border-t border-dark-border/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Client-Side In-Browser GPU Rasterizer</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">512 × 512 px</span>
            </div>
          </div>

          {/* Export Action Hub */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Instant Multi-Format Exporters
            </span>

            {/* Row 1: SVG & Favicon ICO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadSvg}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-dark-hover hover:bg-brand-500/20 border border-dark-border hover:border-brand-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download SVG Vector</span>
              </button>

              <button
                onClick={handleDownloadIco}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-dark-hover hover:bg-brand-500/20 border border-dark-border hover:border-brand-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download Favicon (.ico)</span>
              </button>
            </div>

            {/* Row 2: PNG with Resolution Selector */}
            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Rasterize High-DPI PNG:</span>
                <div className="flex items-center gap-2">
                  <select
                    value={pngResolution}
                    onChange={(e) => setPngResolution(Number(e.target.value))}
                    className="px-2 py-1 rounded-lg bg-dark-input border border-dark-border text-xs text-white focus:outline-none"
                  >
                    <option value={16}>16 × 16 px (Favicon)</option>
                    <option value={32}>32 × 32 px (Standard Favicon)</option>
                    <option value={48}>48 × 48 px (Desktop Icon)</option>
                    <option value={64}>64 × 64 px (Toolbar)</option>
                    <option value={128}>128 × 128 px (Dock)</option>
                    <option value={180}>180 × 180 px (Apple Touch)</option>
                    <option value={256}>256 × 256 px (PWA)</option>
                    <option value={512}>512 × 512 px (High-Res)</option>
                    <option value={1024}>1024 × 1024 px (Ultra HD)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Background:</span>
                  <button
                    onClick={() => setPngBgColor(pngBgColor === 'transparent' ? '#0f172a' : 'transparent')}
                    className="underline text-brand-400"
                  >
                    {pngBgColor === 'transparent' ? 'Transparent (Alpha)' : 'Dark Solid'}
                  </button>
                </div>

                <button
                  onClick={handleDownloadPng}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>
              </div>
            </div>

            {/* Row 3: Full Production Favicon ZIP Pack */}
            <button
              onClick={handleDownloadFaviconPack}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-glow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Production Favicon Pack (.ZIP)</span>
            </button>

            {/* Pipeline Hand-off actions */}
            <div className="pt-2 border-t border-dark-border/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">Send to other tools:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendToFaviconSuite}
                  className="flex items-center gap-1 text-brand-400 hover:text-brand-300 font-semibold"
                >
                  <span>Favicon Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-600">•</span>
                <button
                  onClick={() => navigate('/tools/logo-maker')}
                  className="flex items-center gap-1 text-slate-300 hover:text-white"
                >
                  <span>Logo Studio</span>
                </button>
                <span className="text-slate-600">•</span>
                <button
                  onClick={() => navigate('/tools/svg-optimizer')}
                  className="flex items-center gap-1 text-slate-300 hover:text-white"
                >
                  <span>SVG Optimizer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-brand-400" />
                <h3 className="text-base font-bold text-white">Google Gemini API Configuration</h3>
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your Google Gemini API key to enable live generation of custom SVG vectors, HTML/CSS art, and Canvas graphics.
              Your key is saved locally in your browser and never leaves your computer.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">Gemini API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2 rounded-xl bg-dark-input border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">Preferred AI Model</label>
              <select
                value={model}
                onChange={(e) => {
                  const m = e.target.value as GeminiModel;
                  setModel(m);
                  setStoredModel(m);
                }}
                className="w-full px-3 py-2 rounded-xl bg-dark-input border border-dark-border text-xs text-white focus:outline-none"
              >
                {apiKey.trim() && (
                  <>
                    <option value="gemini-3.6-flash" className="text-brand-400 font-bold">
                      ✨ Gemini 3.6 Flash (Official Recommended)
                    </option>
                    <option value="gemini-3.8-flash" className="text-brand-400 font-bold">
                      ✨ Gemini 3.8 Flash (Latest Preview)
                    </option>
                  </>
                )}
                <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Deep Reasoning)</option>
                <option value="gemini-flash-latest">Gemini Flash Latest</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/25 text-[11px] text-brand-300">
              Need a free key? Get one instantly from{' '}
              <a
                href="https://aistudio.google.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline text-white inline-flex items-center gap-1"
              >
                Google AI Studio API Keys <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setApiKey('');
                  setStoredApiKey('');
                  setShowApiKeyModal(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Clear Key
              </button>
              <button
                onClick={() => {
                  setStoredApiKey(apiKey);
                  setShowApiKeyModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
