import React, { useState, useMemo } from 'react';
import { Search, X, Upload, Sparkles, Folder } from 'lucide-react';
import { ICONS_CATALOG, CATEGORIES, CategoryType, IconItem } from '../../lib/icons-catalog';

interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIcon: (iconId: string, customSvg?: string) => void;
  selectedIconId?: string;
}

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectIcon,
  selectedIconId,
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [customSvgInput, setCustomSvgInput] = useState('');

  const filteredIcons = useMemo(() => {
    return ICONS_CATALOG.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      if (!matchCat) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchName || matchKeywords;
    });
  }, [search, activeCategory]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && content.includes('<svg')) {
        onSelectIcon('custom', content);
        onClose();
      } else {
        alert('Please upload a valid SVG file containing an <svg> element.');
      }
    };
    reader.readAsText(file);
  };

  const handleCustomSvgSubmit = () => {
    if (customSvgInput.includes('<svg')) {
      onSelectIcon('custom', customSvgInput);
      onClose();
    } else {
      alert('Please paste a valid <svg> tag.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Select Vector Icon</h3>
              <p className="text-xs text-slate-400">Search thousands of icons or upload your custom SVG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-dark-border/70 space-y-3 bg-dark-bg/60">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons (e.g., rocket, star, code, heart, shield)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-surface border border-dark-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories Pill List */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : 'bg-dark-surface text-slate-400 hover:text-white hover:bg-dark-hover'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Icons Grid Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
            {filteredIcons.map((item) => {
              const IconComp = item.icon;
              const isSelected = selectedIconId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectIcon(item.id);
                    onClose();
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all group ${
                    isSelected
                      ? 'bg-brand-500/20 border-brand-500 text-brand-400 shadow-glow-sm'
                      : 'bg-dark-surface/50 border-dark-border hover:border-slate-500 hover:bg-dark-hover text-slate-300 hover:text-white'
                  }`}
                  title={item.name}
                >
                  <IconComp className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] mt-1.5 truncate max-w-full text-slate-400 group-hover:text-slate-200">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs">
              No icons found for "{search}". Try another keyword or upload a custom SVG below.
            </div>
          )}
        </div>

        {/* Custom SVG Upload Drawer */}
        <div className="p-4 border-t border-dark-border bg-dark-bg/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-300 text-xs font-medium cursor-pointer transition-colors w-full sm:w-auto justify-center">
            <Upload className="w-3.5 h-3.5 text-brand-400" />
            <span>Upload SVG File</span>
            <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Or paste SVG code directly..."
              value={customSvgInput}
              onChange={(e) => setCustomSvgInput(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border text-xs text-slate-300 flex-1 sm:w-64 focus:outline-none focus:border-brand-500"
            />
            <button
              onClick={handleCustomSvgSubmit}
              disabled={!customSvgInput.trim()}
              className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white text-xs font-medium transition-colors"
            >
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
