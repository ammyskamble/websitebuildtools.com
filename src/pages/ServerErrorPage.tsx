import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  RotateCw, 
  Home, 
  LifeBuoy, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Cpu, 
  ShieldAlert 
} from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';

export interface ServerErrorPageProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
}

export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReload = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  const errorMessage = error?.message || 'An unexpected runtime or server processing error occurred while rendering this view.';
  const errorStack = error?.stack || 'No stack trace available.';

  const handleCopy = () => {
    navigator.clipboard.writeText(`Error: ${errorMessage}\n\nStack:\n${errorStack}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <SeoHead
        title="500: Internal Server Error | SvgFav.com"
        description="An unexpected processing error occurred. Try refreshing the page or navigating back to our home studio."
        canonicalUrl="https://svgfav.com/500"
        noindex={true}
      />

      {/* Ambient warning lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Error 500 &bull; Processing Interrupted</span>
        </div>

        {/* Visual 500 Number */}
        <div className="relative select-none">
          <h1 className="text-8xl sm:text-9xl md:text-[10rem] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-slate-200 to-slate-600 leading-none">
            500
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 blur-sm">
            <span className="text-8xl sm:text-9xl md:text-[10rem] font-extrabold tracking-tighter text-amber-400 leading-none">
              500
            </span>
          </div>
        </div>

        {/* Heading & Details */}
        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Internal Studio Error
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Something unexpected occurred during execution. Rest assured, your client-side files remain safe in your local browser memory.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleReload}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium text-sm shadow-glow-sm hover:shadow-glow transition-all duration-200 group cursor-pointer"
          >
            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Reload & Try Again</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-card hover:bg-dark-hover text-slate-200 border border-dark-border font-medium text-sm transition-all duration-200 group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-surface/60 hover:bg-dark-hover text-slate-400 hover:text-slate-200 border border-dark-border/60 font-medium text-sm transition-all duration-200"
          >
            <LifeBuoy className="w-4 h-4 text-slate-400" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Diagnostics & Technical Details Accordion */}
        <div className="pt-6 text-left">
          <div className="glass-panel rounded-xl overflow-hidden border border-dark-border">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 bg-dark-card/40 transition-colors"
            >
              <span className="flex items-center gap-2 font-mono">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Technical Error Diagnostics
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                {detailsOpen ? 'Hide' : 'Show details'}
                {detailsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </button>

            {detailsOpen && (
              <div className="p-4 bg-black/40 border-t border-dark-border/80 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {error?.name || 'Error'}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy stack'}</span>
                  </button>
                </div>
                <p className="text-slate-300 break-words bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  {errorMessage}
                </p>
                {error?.stack && (
                  <div className="max-h-40 overflow-y-auto p-2.5 rounded bg-slate-950/90 text-slate-500 text-[11px] leading-tight whitespace-pre-wrap border border-slate-900">
                    {errorStack}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
