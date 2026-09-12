import React, { useState, useMemo } from 'react';
import { Search, X, Upload, Sparkles, Flame, Smartphone, Smile, Rocket, Palette, ShoppingBag, Shield, TrendingUp, Compass, Heart, Zap } from 'lucide-react';
import {
  ICONS_CATALOG,
  CATEGORIES,
  EMOJI_SUBCATEGORIES,
  CategoryType,
  EmojiSubcategory,
  getEmojiSvg,
} from '../../lib/icons-catalog';

interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIcon: (iconId: string, customSvg?: string) => void;
  selectedIconId?: string;
}

interface QuickSuggestion {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  filterCategory?: CategoryType;
  filterEmojiSub?: EmojiSubcategory;
  searchQuery?: string;
}

const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  { id: 'trending', label: 'Popular & Trending', icon: Flame, searchQuery: '' },
  { id: 'emojis', label: 'All Emojis', icon: Smile, filterCategory: 'Emojis' },
  { id: 'mobile', label: 'Mobile Interface', icon: Smartphone, filterCategory: 'Mobile UI' },
  { id: 'startups', label: 'Tech & Startups', icon: Rocket, filterCategory: 'Tech' },
  { id: 'design', label: 'Creative & Art', icon: Palette, filterCategory: 'Design' },
  { id: 'ecommerce', label: 'E-Commerce & Store', icon: ShoppingBag, filterCategory: 'Business' },
  { id: 'security', label: 'Security & Auth', icon: Shield, searchQuery: 'security' },
  { id: 'finance', label: 'Finance & Growth', icon: TrendingUp, searchQuery: 'money' },
  { id: 'nature', label: 'Travel & Places', icon: Compass, searchQuery: 'travel' },
  { id: 'hearts', label: 'Hearts & Love', icon: Heart, searchQuery: 'heart' },
  { id: 'actions', label: 'Actions & Controls', icon: Zap, filterCategory: 'Arrows & UI' },
];

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectIcon,
  selectedIconId,
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [activeEmojiSub, setActiveEmojiSub] = useState<EmojiSubcategory>('All');
  const [activeSuggestion, setActiveSuggestion] = useState<string>('trending');
  const [customSvgInput, setCustomSvgInput] = useState('');

  const filteredIcons = useMemo(() => {
    return ICONS_CATALOG.filter((item) => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      // Emoji subcategory filter
      if (activeCategory === 'Emojis' && activeEmojiSub !== 'All') {
        if (item.emojiSubcategory !== activeEmojiSub) {
          return false;
        }
      }

      // Search keyword filter
      if (!search.trim()) return true;

      const q = search.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      const matchEmoji = item.emoji && item.emoji.includes(q);
      return matchName || matchKeywords || matchEmoji;
    });
  }, [search, activeCategory, activeEmojiSub]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ICONS_CATALOG.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = ICONS_CATALOG.filter((i) => i.category === cat).length;
      }
    });
    return counts;
  }, []);

  if (!isOpen) return null;

  const handleSelectSuggestion = (sug: QuickSuggestion) => {
    setActiveSuggestion(sug.id);
    if (sug.filterCategory) {
      setActiveCategory(sug.filterCategory);
      setActiveEmojiSub('All');
    } else {
      setActiveCategory('All');
    }
    if (sug.searchQuery !== undefined) {
      setSearch(sug.searchQuery);
    }
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-dark-border flex items-center justify-between bg-dark-bg/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-600 text-white flex items-center justify-center shadow-glow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base tracking-tight">Vector Icon & Emoji Library</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30 font-semibold">
                  {ICONS_CATALOG.length}+ Assets
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mobile UI icons, internet symbols, and expressive Unicode emojis ready for logos & favicons.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Suggestions Toolbar */}
        <div className="p-4 border-b border-dark-border/70 space-y-3 bg-dark-bg/60">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveSuggestion('');
              }}
              placeholder="Search icons & emojis (e.g., rocket, wifi, battery, heart, fire, smile, lock, money)..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded-md hover:bg-dark-hover"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              Suggestions:
            </span>
            {QUICK_SUGGESTIONS.map((sug) => {
              const SugIcon = sug.icon;
              const isSelected = activeSuggestion === sug.id;
              return (
                <button
                  key={sug.id}
                  onClick={() => handleSelectSuggestion(sug)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-glow-sm'
                      : 'bg-dark-surface/70 text-slate-300 border border-dark-border/60 hover:bg-dark-hover hover:text-white'
                  }`}
                >
                  <SugIcon className="w-3.5 h-3.5 text-brand-400" />
                  <span>{sug.label}</span>
                </button>
              );
            })}
          </div>

          {/* Primary Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none pt-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveEmojiSub('All');
                  setActiveSuggestion('');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : 'bg-dark-surface text-slate-400 hover:text-white hover:bg-dark-hover'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat ? 'bg-black/30 text-white' : 'bg-dark-border text-slate-400'
                }`}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Secondary Emoji Subcategories (Shown when Emojis category is active) */}
          {activeCategory === 'Emojis' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-dark-border/40">
              <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider shrink-0 mr-1">
                Emoji Groups:
              </span>
              {EMOJI_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveEmojiSub(sub)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                    activeEmojiSub === sub
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-dark-surface/60 text-slate-400 hover:text-slate-200 hover:bg-dark-hover'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Counter & Grid */}
        <div className="px-4 py-2 bg-dark-surface/30 border-b border-dark-border/40 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-slate-200">{filteredIcons.length}</strong> {activeCategory === 'Emojis' ? 'emojis' : 'assets'}
            {search && <span> matching "{search}"</span>}
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any icon or emoji to use instantly
          </span>
        </div>

        {/* Icons Grid Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2.5">
            {filteredIcons.map((item) => {
              const isSelected = selectedIconId === item.id;
              const IconComp = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectIcon(item.id, item.emoji ? getEmojiSvg(item.emoji) : undefined);
                    onClose();
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all group relative ${
                    isSelected
                      ? 'bg-brand-500/20 border-brand-500 text-brand-400 shadow-glow-sm scale-105'
                      : 'bg-dark-surface/50 border-dark-border hover:border-brand-500/50 hover:bg-dark-hover text-slate-300 hover:text-white'
                  }`}
                  title={`${item.name} (${item.category})`}
                >
                  {item.emoji ? (
                    <span className="text-2xl sm:text-3xl select-none leading-none transition-transform group-hover:scale-125 duration-150 my-0.5">
                      {item.emoji}
                    </span>
                  ) : IconComp ? (
                    <IconComp className="w-6 h-6 transition-transform group-hover:scale-110 duration-150" />
                  ) : (
                    <Sparkles className="w-6 h-6" />
                  )}

                  <span className="text-[10px] mt-1.5 truncate max-w-full text-slate-400 group-hover:text-slate-200 text-center font-medium">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-dark-surface flex items-center justify-center text-slate-500">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-slate-300 font-medium text-sm">No icons or emojis found for "{search}"</p>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                Try searching for related keywords like <em>fire, phone, wifi, user, chart, heart, rocket, star</em>, or upload your own custom SVG below.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                  setActiveEmojiSub('All');
                }}
                className="mt-2 px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs hover:bg-brand-500/30 transition-colors"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Custom SVG Upload Drawer */}
        <div className="p-3.5 sm:p-4 border-t border-dark-border bg-dark-bg/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-slate-300 text-xs font-medium cursor-pointer transition-colors w-full sm:w-auto justify-center">
            <Upload className="w-3.5 h-3.5 text-brand-400" />
            <span>Upload SVG File</span>
            <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Or paste custom <svg>...</svg> markup here..."
              value={customSvgInput}
              onChange={(e) => setCustomSvgInput(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs text-slate-300 flex-1 sm:w-72 focus:outline-none focus:border-brand-500"
            />
            <button
              onClick={handleCustomSvgSubmit}
              disabled={!customSvgInput.trim()}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white text-xs font-semibold transition-colors shrink-0 shadow-sm"
            >
              Use SVG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
