export interface GradientPreset {
  id: string;
  name: string;
  type: 'linear' | 'radial';
  angle?: number;
  from: string;
  to: string;
  via?: string;
  css: string;
  svgDefs: string;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: 'hyper',
    name: 'Hyper Blue',
    type: 'linear',
    angle: 135,
    from: '#3b82f6',
    to: '#8b5cf6',
    css: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs>`,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    type: 'linear',
    angle: 135,
    from: '#f43f5e',
    to: '#8b5cf6',
    via: '#ec4899',
    css: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f43f5e"/><stop offset="50%" stop-color="#ec4899"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs>`,
  },
  {
    id: 'aurora',
    name: 'Emerald Aurora',
    type: 'linear',
    angle: 135,
    from: '#10b981',
    to: '#06b6d4',
    css: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs>`,
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    type: 'linear',
    angle: 135,
    from: '#f97316',
    to: '#e11d48',
    css: 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#e11d48"/></linearGradient></defs>`,
  },
  {
    id: 'midnight',
    name: 'Midnight Indigo',
    type: 'linear',
    angle: 135,
    from: '#1e1b4b',
    to: '#4338ca',
    css: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#4338ca"/></linearGradient></defs>`,
  },
  {
    id: 'neon',
    name: 'Neon Lime',
    type: 'linear',
    angle: 135,
    from: '#84cc16',
    to: '#10b981',
    css: 'linear-gradient(135deg, #84cc16 0%, #10b981 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#84cc16"/><stop offset="100%" stop-color="#10b981"/></linearGradient></defs>`,
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    type: 'linear',
    angle: 135,
    from: '#a855f7',
    to: '#6366f1',
    css: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#a855f7"/><stop offset="100%" stop-color="#6366f1"/></linearGradient></defs>`,
  },
  {
    id: 'monochrome',
    name: 'Dark Obsidian',
    type: 'linear',
    angle: 135,
    from: '#1e293b',
    to: '#0f172a',
    css: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs>`,
  },
  {
    id: 'carbon',
    name: 'Pure Carbon',
    type: 'linear',
    angle: 135,
    from: '#09090b',
    to: '#27272a',
    css: 'linear-gradient(135deg, #09090b 0%, #27272a 100%)',
    svgDefs: `<defs><linearGradient id="forge-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#09090b"/><stop offset="100%" stop-color="#27272a"/></linearGradient></defs>`,
  }
];

export const SOLID_PALETTES = [
  '#3b82f6', // Blue
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#f97316', // Orange
  '#eab308', // Amber
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#0f172a', // Slate Dark
  '#ffffff', // White
  '#000000', // Black
];

export type ShapeType = 'squircle' | 'circle' | 'square' | 'hexagon' | 'shield' | 'transparent';
