import React, { useState } from 'react';
import { Sparkles, X, Wand2, Key, AlertCircle, Loader2, Check } from 'lucide-react';
import {
  generateAssetWithGemini,
  getStoredApiKey,
  setStoredApiKey,
  getStoredModel,
  setStoredModel,
  GeminiModel,
  DEMO_PRESETS
} from '../../lib/gemini';
import { exportCodeToSvg } from '../../lib/code-importer';

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSvg: (svgMarkup: string) => void;
  initialPrompt?: string;
}

export const GeminiModal: React.FC<GeminiModalProps> = ({
  isOpen,
  onClose,
  onSelectSvg,
  initialPrompt = '',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt || 'Modern minimalist electric bolt favicon icon, neon cyan on dark violet shield');
  const [model, setModel] = useState<GeminiModel>(getStoredModel());
  const [apiKey, setApiKey] = useState<string>(getStoredApiKey());
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedSvg, setGeneratedSvg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    setStoredApiKey(apiKey);
    setShowKeyInput(false);
    if (apiKey.trim() && (!model || model.includes('2.0') || model.includes('2.5'))) {
      setModel('gemini-3.6-flash');
      setStoredModel('gemini-3.6-flash');
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateAssetWithGemini(prompt, 'svg', { apiKey, model });
      const normalized = await exportCodeToSvg('svg', result.code);
      setGeneratedSvg(normalized);
    } catch (err: any) {
      setError(err?.message || 'Failed to generate SVG with Gemini.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedSvg) {
      onSelectSvg(generatedSvg);
      onClose();
    }
  };

  const quickPrompts = [
    'Electric cyber lightning bolt with glowing cyan outline',
    'Modern geometric crypto diamond emblem on hexagonal shield',
    'Minimalist AI robot brain core with clean rounded vector curves',
    'Vibrant SaaS cloud analytics badge with gradient flame',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-dark-card border border-dark-border rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-dark-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Generate with Google Gemini AI
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  AI Vector
                </span>
              </h3>
              <p className="text-xs text-slate-400">Generate clean scalable SVG icons and favicons using Google Gemini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 py-4 overflow-y-auto flex-1">
          {/* API Key Banner / Config */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-dark-bg/60 border border-dark-border text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Key className={`w-4 h-4 ${apiKey ? 'text-emerald-400' : 'text-brand-400'}`} />
              <span>
                {apiKey ? 'Gemini API Key configured (Live LLM)' : 'Zero-Key Mode (Instant AI Generation Ready)'}
              </span>
            </div>
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-2"
            >
              {showKeyInput ? 'Hide Key' : 'Configure Key'}
            </button>
          </div>

          {showKeyInput && (
            <div className="p-3.5 rounded-xl bg-dark-bg border border-brand-500/30 space-y-2.5 animate-in fade-in">
              <label className="text-xs font-semibold text-slate-200 block">Google Gemini API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-dark-input border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <button
                  onClick={handleSaveKey}
                  className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
                >
                  Save
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Stored safely in your browser localStorage. Free tier API keys available at{' '}
                <a
                  href="https://aistudio.google.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:underline"
                >
                  aistudio.google.com/api-keys
                </a>.
              </p>
            </div>
          )}

          {/* Prompt input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200">What icon or favicon would you like to create?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="e.g. Glowing neon rocket icon with cyan and violet gradients, modern geometric curves..."
              className="w-full px-3.5 py-2 rounded-xl bg-dark-input border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Quick suggestions */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400">Prompt Inspiration:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(qp)}
                  className="text-left px-2.5 py-1 rounded-lg bg-dark-hover hover:bg-brand-500/15 border border-dark-border hover:border-brand-500/30 text-[11px] text-slate-300 hover:text-brand-300 transition-colors"
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selector */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">AI Model:</span>
            <select
              value={model}
              onChange={(e) => {
                const m = e.target.value as GeminiModel;
                setModel(m);
                setStoredModel(m);
              }}
              className="px-2.5 py-1 rounded-lg bg-dark-input border border-dark-border text-xs text-slate-200 focus:outline-none"
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

          {/* Error / Notice message */}
          {error && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Generated Preview */}
          {generatedSvg && (
            <div className="p-4 rounded-xl bg-dark-bg border border-dark-border flex flex-col items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Generated Vector Preview</span>
              <div
                className="w-36 h-36 rounded-2xl bg-[#0b0f19] border border-dark-border flex items-center justify-center p-3 shadow-inner"
                dangerouslySetInnerHTML={{ __html: generatedSvg }}
              />
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-dark-border flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating with Gemini...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>{generatedSvg ? 'Regenerate' : 'Generate Vector'}</span>
                </>
              )}
            </button>

            {generatedSvg && (
              <button
                onClick={handleApply}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Use in Studio</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
