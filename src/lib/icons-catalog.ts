import React from 'react';
import {
  // Mobile & System UI
  Battery, BatteryCharging, BatteryLow, Wifi, WifiOff, Signal, Bluetooth,
  Phone, PhoneCall, MessageSquare, MessageCircle, Mic, MicOff, Volume, Volume1, Volume2, VolumeX,
  Bell, BellOff, Shield, ShieldCheck, ShieldAlert, Lock, Unlock, Key,
  Fingerprint, QrCode, Power, Settings, Sliders, ToggleLeft, ToggleRight,
  Share, Share2, Download, Upload, Trash, Trash2, Edit, Edit2, Edit3,
  Eye, EyeOff, Copy, RefreshCw, Repeat, Shuffle, Layers,
  Compass, MapPin, Navigation, Navigation2, Map, Home, User, UserCheck, UserPlus, Users,
  Calendar, Clock, Search, Menu, MoreVertical, MoreHorizontal,
  Check, CheckCircle2, AlertCircle, AlertTriangle, AlertOctagon, HelpCircle, Info, X, XCircle,
  
  // Tech & Internet
  Code, Terminal, Cpu, Database, Server, Globe, Cloud, CloudRain, CloudLightning,
  GitBranch, GitCommit, GitPullRequest, Laptop, Smartphone, Tablet, Monitor, HardDrive,
  Network, Hash, AtSign, Rss, Cast, Plug, Radio, Satellite, Box, Package, Activity,

  // Creative & Design
  Palette, PenTool, Brush, Wand2, Droplets, Contrast, Sun, Moon, Star, Sparkles,
  Zap, Flame, Rocket, Feather, Scissors, Paperclip, Crown, Bookmark, Heart,
  Aperture, Filter, ZoomIn, ZoomOut,

  // Business & Commerce
  Briefcase, Building, ShoppingCart, ShoppingBag, CreditCard, DollarSign, Wallet,
  Store, Tag, Percent, Receipt, TrendingUp, TrendingDown, Target, Award, Trophy,
  BarChart, BarChart2, PieChart, Mail, Send, Truck, Printer, Gauge,

  // Media & Entertainment
  Camera, Video, VideoOff, Film, Clapperboard, Image, Play, Pause, Rewind, FastForward,
  Headphones, Music, Speaker, Disc, Tv, Maximize, Maximize2, Minimize, Minimize2,

  // Shapes & Geometry
  Hexagon, Square, Circle, Triangle, Diamond, Grid, LayoutGrid, Crosshair,

  // Nature & Real World
  Leaf, Flower2, Coffee, Plane, Anchor, Gift, Wind, Watch, Smile, ThumbsUp, ThumbsDown,

  // Navigation & Direction
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ArrowUpRight, ArrowDownRight, ArrowDownLeft, ArrowUpLeft,
  ChevronRight, ChevronLeft, ChevronUp, ChevronDown, List
} from 'lucide-react';

export type CategoryType =
  | 'All'
  | 'Emojis'
  | 'Mobile UI'
  | 'Tech'
  | 'Design'
  | 'Business'
  | 'Media'
  | 'Nature'
  | 'Shapes'
  | 'Arrows & UI';

export type EmojiSubcategory =
  | 'All'
  | 'Smileys & Faces'
  | 'Hands & Gestures'
  | 'Animals & Nature'
  | 'Food & Drink'
  | 'Activities & Games'
  | 'Travel & Places'
  | 'Objects & Tech'
  | 'Symbols & Hearts';

export interface IconItem {
  id: string;
  name: string;
  category: CategoryType;
  keywords: string[];
  emoji?: string;
  emojiSubcategory?: EmojiSubcategory;
  icon?: React.ComponentType<{ className?: string; size?: number; color?: string; strokeWidth?: number }>;
  svgPath?: string;
}

/**
 * Dynamically converts Lucide icon nodes to inline SVG markup
 */
export function renderLucideToSvgMarkup(iconComp: any): string {
  try {
    if (!iconComp) return '';
    const element = iconComp.render ? iconComp.render({}) : null;
    const node = element?.props?.icon?.node;
    if (Array.isArray(node)) {
      return node
        .map(([tag, attrs]: [string, Record<string, any>]) => {
          const attrPairs = Object.entries(attrs)
            .filter(([k]) => k !== 'key')
            .map(([k, v]) => `${k}="${v}"`)
            .join(' ');
          return `<${tag} ${attrPairs} />`;
        })
        .join('');
    }
  } catch {
    // fallback gracefully
  }
  return '';
}

/**
 * Generates standalone SVG code for any Unicode Emoji
 */
export function getEmojiSvg(emoji: string, size = 512): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <text x="${size / 2}" y="${size / 2 + Math.round(size * 0.04)}" font-size="${Math.round(size * 0.72)}" text-anchor="middle" dominant-baseline="central" font-family="'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif">${emoji}</text>
</svg>`;
}

export const CATEGORIES: CategoryType[] = [
  'All',
  'Emojis',
  'Mobile UI',
  'Tech',
  'Design',
  'Business',
  'Media',
  'Nature',
  'Shapes',
  'Arrows & UI',
];

export const EMOJI_SUBCATEGORIES: EmojiSubcategory[] = [
  'All',
  'Smileys & Faces',
  'Hands & Gestures',
  'Animals & Nature',
  'Food & Drink',
  'Activities & Games',
  'Travel & Places',
  'Objects & Tech',
  'Symbols & Hearts',
];

// ==========================================
// 1. MOBILE INTERFACE & SYSTEM ICONS
// ==========================================
const MOBILE_ICONS: IconItem[] = [
  { id: 'battery-charging', name: 'Battery Charging', category: 'Mobile UI', keywords: ['power', 'charge', 'mobile', 'ios', 'android'], icon: BatteryCharging },
  { id: 'battery-full', name: 'Battery Full', category: 'Mobile UI', keywords: ['power', 'energy', 'phone', 'device'], icon: Battery },
  { id: 'battery-low', name: 'Battery Low', category: 'Mobile UI', keywords: ['power', 'empty', 'urgent', 'warning'], icon: BatteryLow },
  { id: 'wifi', name: 'Wi-Fi Signal', category: 'Mobile UI', keywords: ['internet', 'connection', 'wireless', 'network', 'online'], icon: Wifi },
  { id: 'wifi-off', name: 'Wi-Fi Off', category: 'Mobile UI', keywords: ['offline', 'disconnect', 'airplane'], icon: WifiOff },
  { id: 'signal', name: 'Cellular Signal', category: 'Mobile UI', keywords: ['network', 'reception', '5g', 'lte', 'bars'], icon: Signal },
  { id: 'bluetooth', name: 'Bluetooth', category: 'Mobile UI', keywords: ['wireless', 'connect', 'audio', 'airpods'], icon: Bluetooth },
  { id: 'smartphone', name: 'Smartphone', category: 'Mobile UI', keywords: ['mobile', 'iphone', 'android', 'device', 'phone'], icon: Smartphone },
  { id: 'tablet', name: 'Tablet', category: 'Mobile UI', keywords: ['ipad', 'screen', 'device', 'touch'], icon: Tablet },
  { id: 'phone', name: 'Phone Call', category: 'Mobile UI', keywords: ['call', 'contact', 'telephone', 'dial'], icon: Phone },
  { id: 'phone-call', name: 'Calling', category: 'Mobile UI', keywords: ['ring', 'talk', 'voice', 'support'], icon: PhoneCall },
  { id: 'message-square', name: 'Message SMS', category: 'Mobile UI', keywords: ['chat', 'sms', 'text', 'imessage', 'talk'], icon: MessageSquare },
  { id: 'message-circle', name: 'Chat Bubble', category: 'Mobile UI', keywords: ['whatsapp', 'conversation', 'comment'], icon: MessageCircle },
  { id: 'mic', name: 'Microphone', category: 'Mobile UI', keywords: ['voice', 'record', 'audio', 'siri', 'assistant'], icon: Mic },
  { id: 'mic-off', name: 'Mute Mic', category: 'Mobile UI', keywords: ['mute', 'silence', 'quiet'], icon: MicOff },
  { id: 'volume-2', name: 'Volume High', category: 'Mobile UI', keywords: ['sound', 'audio', 'speaker', 'loud'], icon: Volume2 },
  { id: 'volume-1', name: 'Volume Low', category: 'Mobile UI', keywords: ['sound', 'audio', 'quiet'], icon: Volume1 },
  { id: 'volume-x', name: 'Mute Audio', category: 'Mobile UI', keywords: ['silent', 'quiet', 'off'], icon: VolumeX },
  { id: 'bell', name: 'Notification Bell', category: 'Mobile UI', keywords: ['alert', 'alarm', 'push', 'remind', 'notice'], icon: Bell },
  { id: 'bell-off', name: 'Do Not Disturb', category: 'Mobile UI', keywords: ['dnd', 'silent', 'quiet', 'notifications'], icon: BellOff },
  { id: 'qr-code', name: 'QR Code', category: 'Mobile UI', keywords: ['scan', 'barcode', 'camera', 'pay'], icon: QrCode },
  { id: 'fingerprint', name: 'Biometric / TouchID', category: 'Mobile UI', keywords: ['security', 'faceid', 'auth', 'login', 'secure'], icon: Fingerprint },
  { id: 'lock', name: 'Lock Secure', category: 'Mobile UI', keywords: ['security', 'password', 'private', 'protect'], icon: Lock },
  { id: 'unlock', name: 'Unlocked', category: 'Mobile UI', keywords: ['open', 'access', 'public'], icon: Unlock },
  { id: 'key', name: 'Key Pass', category: 'Mobile UI', keywords: ['auth', 'password', 'token', 'crypto'], icon: Key },
  { id: 'shield-check', name: 'Shield Verified', category: 'Mobile UI', keywords: ['security', 'safe', 'protect', 'ssl'], icon: ShieldCheck },
  { id: 'shield-alert', name: 'Shield Alert', category: 'Mobile UI', keywords: ['warning', 'security', 'threat'], icon: ShieldAlert },
  { id: 'home', name: 'Home Screen', category: 'Mobile UI', keywords: ['main', 'dashboard', 'house', 'app'], icon: Home },
  { id: 'user', name: 'User Profile', category: 'Mobile UI', keywords: ['account', 'avatar', 'person', 'login'], icon: User },
  { id: 'users', name: 'Group / Team', category: 'Mobile UI', keywords: ['contacts', 'community', 'people'], icon: Users },
  { id: 'user-plus', name: 'Add Contact', category: 'Mobile UI', keywords: ['new user', 'invite', 'friend'], icon: UserPlus },
  { id: 'calendar', name: 'Calendar / Date', category: 'Mobile UI', keywords: ['schedule', 'agenda', 'day', 'month', 'events'], icon: Calendar },
  { id: 'clock', name: 'Clock / Alarm', category: 'Mobile UI', keywords: ['time', 'timer', 'stopwatch', 'history'], icon: Clock },
  { id: 'watch', name: 'Smartwatch', category: 'Mobile UI', keywords: ['apple watch', 'wearable', 'fitness'], icon: Watch },
  { id: 'camera', name: 'Camera Lens', category: 'Mobile UI', keywords: ['photo', 'picture', 'snap', 'video'], icon: Camera },
  { id: 'image', name: 'Photos Gallery', category: 'Mobile UI', keywords: ['album', 'pictures', 'wallpapers'], icon: Image },
  { id: 'compass', name: 'Compass / Safari', category: 'Mobile UI', keywords: ['navigation', 'direction', 'explore', 'north'], icon: Compass },
  { id: 'map-pin', name: 'Location GPS', category: 'Mobile UI', keywords: ['map', 'place', 'travel', 'pin'], icon: MapPin },
  { id: 'navigation-2', name: 'GPS Arrow', category: 'Mobile UI', keywords: ['route', 'drive', 'directions'], icon: Navigation2 },
  { id: 'map', name: 'Map View', category: 'Mobile UI', keywords: ['geography', 'earth', 'streets'], icon: Map },
  { id: 'settings', name: 'Settings Gear', category: 'Mobile UI', keywords: ['configure', 'options', 'system', 'preferences'], icon: Settings },
  { id: 'sliders', name: 'Control Center / Sliders', category: 'Mobile UI', keywords: ['adjust', 'filter', 'tune', 'equalizer'], icon: Sliders },
  { id: 'toggle-right', name: 'Toggle Switch On', category: 'Mobile UI', keywords: ['switch', 'active', 'state', 'enable'], icon: ToggleRight },
  { id: 'toggle-left', name: 'Toggle Switch Off', category: 'Mobile UI', keywords: ['switch', 'inactive', 'disable'], icon: ToggleLeft },
  { id: 'power', name: 'Power Button', category: 'Mobile UI', keywords: ['turn off', 'restart', 'shutdown', 'boot'], icon: Power },
  { id: 'share-2', name: 'Share Sheet', category: 'Mobile UI', keywords: ['send', 'social', 'export', 'link'], icon: Share2 },
  { id: 'download', name: 'Download App / File', category: 'Mobile UI', keywords: ['save', 'get', 'install', 'cloud'], icon: Download },
  { id: 'upload', name: 'Upload to Cloud', category: 'Mobile UI', keywords: ['send', 'backup', 'export'], icon: Upload },
  { id: 'trash-2', name: 'Trash Bin', category: 'Mobile UI', keywords: ['delete', 'remove', 'clean', 'clear'], icon: Trash2 },
  { id: 'edit-3', name: 'Edit Pencil', category: 'Mobile UI', keywords: ['write', 'compose', 'modify', 'pen'], icon: Edit3 },
  { id: 'eye', name: 'Show / Eye', category: 'Mobile UI', keywords: ['view', 'visible', 'preview', 'password'], icon: Eye },
  { id: 'eye-off', name: 'Hide / Hidden', category: 'Mobile UI', keywords: ['secret', 'private', 'hidden'], icon: EyeOff },
  { id: 'copy', name: 'Copy Clipboard', category: 'Mobile UI', keywords: ['duplicate', 'paste', 'text'], icon: Copy },
  { id: 'refresh-cw', name: 'Pull to Refresh', category: 'Mobile UI', keywords: ['reload', 'sync', 'update'], icon: RefreshCw },
  { id: 'search', name: 'Spotlight Search', category: 'Mobile UI', keywords: ['find', 'lookup', 'query', 'magnifier'], icon: Search },
  { id: 'menu', name: 'Hamburger Menu', category: 'Mobile UI', keywords: ['drawer', 'navigation', 'options', 'bars'], icon: Menu },
  { id: 'more-horizontal', name: 'More Options (Dots)', category: 'Mobile UI', keywords: ['actions', 'overflow', 'menu'], icon: MoreHorizontal },
  { id: 'check-circle-2', name: 'Success Checkmark', category: 'Mobile UI', keywords: ['done', 'approved', 'complete', 'verified'], icon: CheckCircle2 },
  { id: 'alert-circle', name: 'Alert Notification', category: 'Mobile UI', keywords: ['warning', 'info', 'error', 'badge'], icon: AlertCircle },
];

// ==========================================
// 2. TECH, INTERNET & DEVELOPER ICONS
// ==========================================
const TECH_ICONS: IconItem[] = [
  { id: 'code', name: 'Code Brackets', category: 'Tech', keywords: ['html', 'developer', 'syntax', 'programming', 'web'], icon: Code },
  { id: 'terminal', name: 'Terminal Console', category: 'Tech', keywords: ['cli', 'bash', 'command', 'powershell', 'dev'], icon: Terminal },
  { id: 'cpu', name: 'Microchip CPU', category: 'Tech', keywords: ['processor', 'hardware', 'silicon', 'intel', 'ai'], icon: Cpu },
  { id: 'database', name: 'Database Storage', category: 'Tech', keywords: ['sql', 'postgres', 'storage', 'data', 'cloud'], icon: Database },
  { id: 'server', name: 'Cloud Server', category: 'Tech', keywords: ['backend', 'hosting', 'rack', 'aws', 'docker'], icon: Server },
  { id: 'globe', name: 'World Wide Web', category: 'Tech', keywords: ['internet', 'global', 'earth', 'domain', 'url'], icon: Globe },
  { id: 'cloud', name: 'Cloud Infrastructure', category: 'Tech', keywords: ['saas', 'sync', 'network', 'storage'], icon: Cloud },
  { id: 'cloud-lightning', name: 'Cloud Fast / Edge', category: 'Tech', keywords: ['serverless', 'edge', 'speed', 'cdn'], icon: CloudLightning },
  { id: 'git-branch', name: 'Git Branch', category: 'Tech', keywords: ['github', 'vcs', 'merge', 'repo', 'code'], icon: GitBranch },
  { id: 'git-pull-request', name: 'Pull Request', category: 'Tech', keywords: ['pr', 'code review', 'github', 'commit'], icon: GitPullRequest },
  { id: 'git-commit', name: 'Git Commit', category: 'Tech', keywords: ['save', 'history', 'version'], icon: GitCommit },
  { id: 'laptop', name: 'MacBook / Laptop', category: 'Tech', keywords: ['computer', 'pc', 'workstation', 'coder'], icon: Laptop },
  { id: 'monitor', name: 'Desktop Display', category: 'Tech', keywords: ['screen', '4k', 'workstation', 'monitor'], icon: Monitor },
  { id: 'hard-drive', name: 'Hard Drive SSD', category: 'Tech', keywords: ['storage', 'disk', 'nvme', 'backup'], icon: HardDrive },
  { id: 'network', name: 'Network Mesh', category: 'Tech', keywords: ['nodes', 'blockchain', 'distributed', 'lan'], icon: Network },
  { id: 'hash', name: 'Hash Tag', category: 'Tech', keywords: ['channel', 'slack', 'topic', 'number'], icon: Hash },
  { id: 'at-sign', name: 'At Symbol @', category: 'Tech', keywords: ['mention', 'email', 'social', 'handle'], icon: AtSign },
  { id: 'rss', name: 'RSS Feed', category: 'Tech', keywords: ['podcast', 'blog', 'stream', 'syndication'], icon: Rss },
  { id: 'cast', name: 'Chromecast / AirPlay', category: 'Tech', keywords: ['stream', 'tv', 'broadcast', 'wireless'], icon: Cast },
  { id: 'satellite', name: 'Satellite Orbit', category: 'Tech', keywords: ['space', 'gps', 'starlink', 'telecom'], icon: Satellite },
  { id: 'activity', name: 'Activity Monitor', category: 'Tech', keywords: ['pulse', 'health', 'heartbeat', 'analytics', 'status'], icon: Activity },
  { id: 'plug', name: 'API Plug / Webhook', category: 'Tech', keywords: ['connect', 'integration', 'plugin', 'adapter'], icon: Plug },
  { id: 'package', name: 'NPM Package', category: 'Tech', keywords: ['library', 'module', 'bundle', 'box'], icon: Package },
];

// ==========================================
// 3. CREATIVE, DESIGN & ART ICONS
// ==========================================
const DESIGN_ICONS: IconItem[] = [
  { id: 'palette', name: 'Art Palette', category: 'Design', keywords: ['color', 'art', 'paint', 'theme', 'figma'], icon: Palette },
  { id: 'pen-tool', name: 'Pen Tool Vector', category: 'Design', keywords: ['bezier', 'illustrator', 'draw', 'vector', 'svg'], icon: PenTool },
  { id: 'brush', name: 'Paint Brush', category: 'Design', keywords: ['paint', 'art', 'canvas', 'photoshop'], icon: Brush },
  { id: 'wand2', name: 'Magic Wand AI', category: 'Design', keywords: ['magic', 'ai', 'filter', 'enhance', 'generate'], icon: Wand2 },
  { id: 'sparkles', name: 'Sparkles Star', category: 'Design', keywords: ['magic', 'clean', 'new', 'ai', 'glow', 'vector'], icon: Sparkles },
  { id: 'zap', name: 'Lightning Bolt', category: 'Design', keywords: ['flash', 'energy', 'power', 'fast', 'quick'], icon: Zap },
  { id: 'flame', name: 'Fire Flame', category: 'Design', keywords: ['hot', 'popular', 'trending', 'energy'], icon: Flame },
  { id: 'rocket', name: 'Startup Rocket', category: 'Design', keywords: ['launch', 'speed', 'fly', 'growth', 'space'], icon: Rocket },
  { id: 'droplets', name: 'Droplets Ink', category: 'Design', keywords: ['water', 'ink', 'liquid', 'color'], icon: Droplets },
  { id: 'contrast', name: 'Contrast Theme', category: 'Design', keywords: ['dark mode', 'light mode', 'switch'], icon: Contrast },
  { id: 'sun', name: 'Sun Daylight', category: 'Design', keywords: ['bright', 'weather', 'light', 'morning'], icon: Sun },
  { id: 'moon', name: 'Crescent Moon', category: 'Design', keywords: ['night', 'dark', 'sleep', 'theme'], icon: Moon },
  { id: 'star', name: 'Gold Star', category: 'Design', keywords: ['favorite', 'rating', 'review', 'bookmark'], icon: Star },
  { id: 'crown', name: 'VIP Crown', category: 'Design', keywords: ['king', 'royal', 'premium', 'pro', 'vip'], icon: Crown },
  { id: 'feather', name: 'Quill Feather', category: 'Design', keywords: ['light', 'writer', 'pen', 'poetry'], icon: Feather },
  { id: 'heart', name: 'Heart Like', category: 'Design', keywords: ['love', 'favorite', 'health', 'romance'], icon: Heart },
  { id: 'scissors', name: 'Scissors Crop', category: 'Design', keywords: ['cut', 'trim', 'snip', 'edit'], icon: Scissors },
  { id: 'paperclip', name: 'Paperclip Attach', category: 'Design', keywords: ['attachment', 'file', 'link'], icon: Paperclip },
  { id: 'aperture', name: 'Camera Aperture', category: 'Design', keywords: ['lens', 'focus', 'shutter', 'optics'], icon: Aperture },
  { id: 'layout-grid', name: 'Bento Grid', category: 'Design', keywords: ['layout', 'matrix', 'dashboard', 'tiles'], icon: LayoutGrid },
];

// ==========================================
// 4. BUSINESS, COMMERCE & FINANCE ICONS
// ==========================================
const BUSINESS_ICONS: IconItem[] = [
  { id: 'briefcase', name: 'Executive Briefcase', category: 'Business', keywords: ['job', 'work', 'career', 'portfolio', 'corporate'], icon: Briefcase },
  { id: 'building', name: 'Company HQ', category: 'Business', keywords: ['enterprise', 'city', 'office', 'firm'], icon: Building },
  { id: 'shopping-cart', name: 'Shopping Cart', category: 'Business', keywords: ['ecommerce', 'checkout', 'store', 'buy', 'shop'], icon: ShoppingCart },
  { id: 'shopping-bag', name: 'Shopping Bag', category: 'Business', keywords: ['retail', 'fashion', 'boutique', 'merch'], icon: ShoppingBag },
  { id: 'credit-card', name: 'Credit Card', category: 'Business', keywords: ['payment', 'stripe', 'visa', 'mastercard'], icon: CreditCard },
  { id: 'dollar-sign', name: 'Dollar Currency', category: 'Business', keywords: ['money', 'revenue', 'profit', 'cash', 'usd'], icon: DollarSign },
  { id: 'wallet', name: 'Crypto Wallet', category: 'Business', keywords: ['finance', 'web3', 'bank', 'funds'], icon: Wallet },
  { id: 'trending-up', name: 'Growth Chart', category: 'Business', keywords: ['analytics', 'profit', 'rise', 'stocks', 'bull'], icon: TrendingUp },
  { id: 'trending-down', name: 'Market Drop', category: 'Business', keywords: ['loss', 'bear', 'stocks', 'decline'], icon: TrendingDown },
  { id: 'bar-chart-2', name: 'Analytics Bars', category: 'Business', keywords: ['metrics', 'kpi', 'reports', 'stats'], icon: BarChart2 },
  { id: 'pie-chart', name: 'Pie Chart', category: 'Business', keywords: ['distribution', 'shares', 'percentages'], icon: PieChart },
  { id: 'target', name: 'Bullseye Target', category: 'Business', keywords: ['goal', 'okr', 'aim', 'focus', 'accuracy'], icon: Target },
  { id: 'trophy', name: 'Champion Trophy', category: 'Business', keywords: ['winner', 'cup', 'first place', 'achievement'], icon: Trophy },
  { id: 'award', name: 'Medal Award', category: 'Business', keywords: ['honor', 'badge', 'certificate', 'winner'], icon: Award },
  { id: 'store', name: 'Storefront', category: 'Business', keywords: ['shop', 'market', 'boutique', 'local'], icon: Store },
  { id: 'tag', name: 'Price Tag', category: 'Business', keywords: ['sale', 'discount', 'label', 'offer'], icon: Tag },
  { id: 'percent', name: 'Percentage Discount', category: 'Business', keywords: ['promo', 'deal', 'rate', 'coupon'], icon: Percent },
  { id: 'mail', name: 'Email Inbox', category: 'Business', keywords: ['letter', 'newsletter', 'contact', 'post'], icon: Mail },
  { id: 'send', name: 'Send Paper Plane', category: 'Business', keywords: ['submit', 'deliver', 'telegram', 'dispatch'], icon: Send },
  { id: 'truck', name: 'Delivery Truck', category: 'Business', keywords: ['shipping', 'logistics', 'fast delivery'], icon: Truck },
];

// ==========================================
// 5. MEDIA, AUDIO & ENTERTAINMENT ICONS
// ==========================================
const MEDIA_ICONS: IconItem[] = [
  { id: 'music', name: 'Musical Note', category: 'Media', keywords: ['song', 'melody', 'sound', 'tune', 'spotify'], icon: Music },
  { id: 'headphones', name: 'Headphones', category: 'Media', keywords: ['audio', 'listen', 'podcast', 'music'], icon: Headphones },
  { id: 'play', name: 'Play Media', category: 'Media', keywords: ['start', 'video', 'stream', 'resume'], icon: Play },
  { id: 'pause', name: 'Pause Media', category: 'Media', keywords: ['stop', 'hold', 'wait'], icon: Pause },
  { id: 'fast-forward', name: 'Fast Forward', category: 'Media', keywords: ['next', 'speed', 'skip'], icon: FastForward },
  { id: 'rewind', name: 'Rewind Media', category: 'Media', keywords: ['previous', 'back', 'skip'], icon: Rewind },
  { id: 'video', name: 'Video Camera', category: 'Media', keywords: ['movie', 'record', 'youtube', 'zoom'], icon: Video },
  { id: 'film', name: 'Film Strip', category: 'Media', keywords: ['cinema', 'movie', 'hollywood', 'reel'], icon: Film },
  { id: 'clapperboard', name: 'Director Slate', category: 'Media', keywords: ['scene', 'action', 'studio', 'film'], icon: Clapperboard },
  { id: 'speaker', name: 'Studio Speaker', category: 'Media', keywords: ['bass', 'subwoofer', 'amplifier'], icon: Speaker },
  { id: 'disc', name: 'Vinyl Disc', category: 'Media', keywords: ['album', 'record', 'dj', 'retro'], icon: Disc },
  { id: 'tv', name: 'Smart TV', category: 'Media', keywords: ['screen', 'netflix', 'broadcast', 'streaming'], icon: Tv },
  { id: 'radio', name: 'Radio Player', category: 'Media', keywords: ['fm', 'am', 'broadcast', 'vintage'], icon: Radio },
  { id: 'maximize-2', name: 'Fullscreen View', category: 'Media', keywords: ['expand', 'large', 'zoom'], icon: Maximize2 },
];

// ==========================================
// 6. SHAPES & GEOMETRY
// ==========================================
const SHAPES_ICONS: IconItem[] = [
  { id: 'hexagon', name: 'Polygon Hexagon', category: 'Shapes', keywords: ['honeycomb', 'geometry', 'six sided', 'crypto'], icon: Hexagon },
  { id: 'circle', name: 'Vector Circle', category: 'Shapes', keywords: ['round', 'dot', 'ellipse', 'orbit'], icon: Circle },
  { id: 'square', name: 'Vector Square', category: 'Shapes', keywords: ['cube', 'box', 'geometry', 'quad'], icon: Square },
  { id: 'triangle', name: 'Vector Triangle', category: 'Shapes', keywords: ['delta', 'pyramid', 'trinity', 'sharp'], icon: Triangle },
  { id: 'diamond', name: 'Gem Diamond', category: 'Shapes', keywords: ['rhombus', 'crystal', 'luxury', 'precious'], icon: Diamond },
  { id: 'grid', name: 'Grid Matrix', category: 'Shapes', keywords: ['pattern', 'layout', 'table', 'columns'], icon: Grid },
  { id: 'crosshair', name: 'Precision Crosshair', category: 'Shapes', keywords: ['aim', 'sniper', 'gps', 'calibrate'], icon: Crosshair },
];

// ==========================================
// 7. NATURE & TRAVEL
// ==========================================
const NATURE_ICONS: IconItem[] = [
  { id: 'leaf', name: 'Green Eco Leaf', category: 'Nature', keywords: ['organic', 'plant', 'nature', 'environment', 'bio'], icon: Leaf },
  { id: 'flower-2', name: 'Spring Flower', category: 'Nature', keywords: ['bloom', 'blossom', 'garden', 'flora'], icon: Flower2 },
  { id: 'coffee', name: 'Coffee Cup', category: 'Nature', keywords: ['cafe', 'espresso', 'morning', 'drink', 'tea'], icon: Coffee },
  { id: 'plane', name: 'Jet Plane', category: 'Nature', keywords: ['flight', 'travel', 'vacation', 'airport', 'sky'], icon: Plane },
  { id: 'anchor', name: 'Nautical Anchor', category: 'Nature', keywords: ['navy', 'sea', 'boat', 'ocean', 'marine'], icon: Anchor },
  { id: 'gift', name: 'Gift Box', category: 'Nature', keywords: ['present', 'birthday', 'holiday', 'surprise'], icon: Gift },
  { id: 'wind', name: 'Wind Breeze', category: 'Nature', keywords: ['weather', 'air', 'breeze', 'blow'], icon: Wind },
];

// ==========================================
// 8. ARROWS & UI CONTROLS
// ==========================================
const ARROWS_ICONS: IconItem[] = [
  { id: 'arrow-right', name: 'Arrow Right', category: 'Arrows & UI', keywords: ['next', 'forward', 'proceed'], icon: ArrowRight },
  { id: 'arrow-left', name: 'Arrow Left', category: 'Arrows & UI', keywords: ['back', 'previous', 'return'], icon: ArrowLeft },
  { id: 'arrow-up', name: 'Arrow Up', category: 'Arrows & UI', keywords: ['top', 'ascend', 'rise'], icon: ArrowUp },
  { id: 'arrow-down', name: 'Arrow Down', category: 'Arrows & UI', keywords: ['bottom', 'descend', 'drop'], icon: ArrowDown },
  { id: 'arrow-up-right', name: 'Arrow Up Right', category: 'Arrows & UI', keywords: ['diagonal', 'external', 'jump', 'out'], icon: ArrowUpRight },
  { id: 'chevron-right', name: 'Chevron Right', category: 'Arrows & UI', keywords: ['next', 'more', 'expand'], icon: ChevronRight },
  { id: 'chevron-left', name: 'Chevron Left', category: 'Arrows & UI', keywords: ['back', 'collapse'], icon: ChevronLeft },
  { id: 'chevron-down', name: 'Chevron Down', category: 'Arrows & UI', keywords: ['dropdown', 'expand', 'accordion'], icon: ChevronDown },
  { id: 'list', name: 'List Bullet', category: 'Arrows & UI', keywords: ['menu', 'items', 'tasks', 'todo'], icon: List },
  { id: 'check', name: 'Simple Check', category: 'Arrows & UI', keywords: ['tick', 'ok', 'yes', 'confirm'], icon: Check },
  { id: 'x', name: 'Close X', category: 'Arrows & UI', keywords: ['cancel', 'delete', 'exit', 'dismiss'], icon: X },
];

// ==========================================
// 9. EXTENSIVE EMOJI SUITE (MOBILE & INTERNET)
// ==========================================
const EMOJI_ITEMS: IconItem[] = [
  // --- Smileys & Faces ---
  { id: 'emoji-rocket', name: 'Rocket Launch', category: 'Emojis', emoji: '🚀', emojiSubcategory: 'Travel & Places', keywords: ['rocket', 'launch', 'startup', 'speed', 'space', 'fly'] },
  { id: 'emoji-fire', name: 'Fire Flame', category: 'Emojis', emoji: '🔥', emojiSubcategory: 'Symbols & Hearts', keywords: ['fire', 'flame', 'lit', 'hot', 'popular', 'trending'] },
  { id: 'emoji-sparkles', name: 'Sparkles', category: 'Emojis', emoji: '✨', emojiSubcategory: 'Symbols & Hearts', keywords: ['sparkles', 'stars', 'magic', 'clean', 'ai', 'shiny'] },
  { id: 'emoji-lightning', name: 'High Voltage Bolt', category: 'Emojis', emoji: '⚡', emojiSubcategory: 'Symbols & Hearts', keywords: ['lightning', 'zap', 'electric', 'power', 'fast', 'quick'] },
  { id: 'emoji-gem', name: 'Gem Stone / Diamond', category: 'Emojis', emoji: '💎', emojiSubcategory: 'Objects & Tech', keywords: ['diamond', 'gem', 'crystal', 'precious', 'luxury', 'crypto'] },
  { id: 'emoji-heart-red', name: 'Red Heart', category: 'Emojis', emoji: '❤️', emojiSubcategory: 'Symbols & Hearts', keywords: ['love', 'heart', 'romance', 'favorite', 'red'] },
  { id: 'emoji-heart-fire', name: 'Heart on Fire', category: 'Emojis', emoji: '❤️‍🔥', emojiSubcategory: 'Symbols & Hearts', keywords: ['passion', 'intense', 'love', 'burning', 'hot'] },
  { id: 'emoji-heart-blue', name: 'Blue Heart', category: 'Emojis', emoji: '💙', emojiSubcategory: 'Symbols & Hearts', keywords: ['love', 'blue', 'loyalty', 'peace'] },
  { id: 'emoji-heart-purple', name: 'Purple Heart', category: 'Emojis', emoji: '💜', emojiSubcategory: 'Symbols & Hearts', keywords: ['love', 'purple', 'royal', 'glamour'] },
  { id: 'emoji-heart-black', name: 'Black Heart', category: 'Emojis', emoji: '🖤', emojiSubcategory: 'Symbols & Hearts', keywords: ['love', 'dark', 'black', 'sleek'] },
  { id: 'emoji-star-gold', name: 'Glowing Star', category: 'Emojis', emoji: '⭐', emojiSubcategory: 'Symbols & Hearts', keywords: ['star', 'rating', 'favorite', 'gold', 'winner'] },
  { id: 'emoji-crown', name: 'Royal Crown', category: 'Emojis', emoji: '👑', emojiSubcategory: 'Objects & Tech', keywords: ['king', 'queen', 'royal', 'vip', 'leader', 'winner'] },
  { id: 'emoji-100', name: 'Hundred Points', category: 'Emojis', emoji: '💯', emojiSubcategory: 'Symbols & Hearts', keywords: ['100', 'perfect', 'score', 'keep it real'] },
  { id: 'emoji-cool-sunglasses', name: 'Smiling with Sunglasses', category: 'Emojis', emoji: '😎', emojiSubcategory: 'Smileys & Faces', keywords: ['cool', 'shades', 'sun', 'confident', 'chill', 'boss'] },
  { id: 'emoji-grin-star', name: 'Star-Struck', category: 'Emojis', emoji: '🤩', emojiSubcategory: 'Smileys & Faces', keywords: ['star', 'excited', 'wow', 'fascinated', 'celebrity'] },
  { id: 'emoji-party-face', name: 'Partying Face', category: 'Emojis', emoji: '🥳', emojiSubcategory: 'Smileys & Faces', keywords: ['party', 'celebrate', 'confetti', 'cheers', 'birthday'] },
  { id: 'emoji-laughing-tears', name: 'Tears of Joy', category: 'Emojis', emoji: '😂', emojiSubcategory: 'Smileys & Faces', keywords: ['laugh', 'funny', 'haha', 'lol', 'happy'] },
  { id: 'emoji-rofl', name: 'Rolling on Floor Laughing', category: 'Emojis', emoji: '🤣', emojiSubcategory: 'Smileys & Faces', keywords: ['rofl', 'hilarious', 'laughing', 'joke'] },
  { id: 'emoji-mind-blown', name: 'Exploding Head / Mind Blown', category: 'Emojis', emoji: '🤯', emojiSubcategory: 'Smileys & Faces', keywords: ['mind blown', 'shock', 'epic', 'genius', 'unbelievable'] },
  { id: 'emoji-thinking', name: 'Thinking Face', category: 'Emojis', emoji: '🤔', emojiSubcategory: 'Smileys & Faces', keywords: ['think', 'ponder', 'idea', 'curious', 'hmm'] },
  { id: 'emoji-salute', name: 'Saluting Face', category: 'Emojis', emoji: '🫡', emojiSubcategory: 'Smileys & Faces', keywords: ['salute', 'respect', 'yes sir', 'honor', 'duty'] },
  { id: 'emoji-smug', name: 'Smirking Face', category: 'Emojis', emoji: '😏', emojiSubcategory: 'Smileys & Faces', keywords: ['smirk', 'flirt', 'clever', 'sly'] },
  { id: 'emoji-pleading', name: 'Pleading Eyes', category: 'Emojis', emoji: '🥺', emojiSubcategory: 'Smileys & Faces', keywords: ['cute', 'please', 'puppy eyes', 'beg'] },
  { id: 'emoji-angel', name: 'Smiling Angel with Halo', category: 'Emojis', emoji: '😇', emojiSubcategory: 'Smileys & Faces', keywords: ['angel', 'halo', 'innocent', 'good', 'blessed'] },
  { id: 'emoji-devil-horns', name: 'Smiling Devil', category: 'Emojis', emoji: '😈', emojiSubcategory: 'Smileys & Faces', keywords: ['devil', 'horns', 'wicked', 'mischief', 'game'] },
  { id: 'emoji-robot', name: 'Robot Face', category: 'Emojis', emoji: '🤖', emojiSubcategory: 'Smileys & Faces', keywords: ['bot', 'ai', 'automation', 'machine', 'cyber'] },
  { id: 'emoji-ghost', name: 'Ghost', category: 'Emojis', emoji: '👻', emojiSubcategory: 'Smileys & Faces', keywords: ['ghost', 'halloween', 'spooky', 'snapchat', 'fun'] },
  { id: 'emoji-skull', name: 'Skull', category: 'Emojis', emoji: '💀', emojiSubcategory: 'Smileys & Faces', keywords: ['dead', 'skeleton', 'danger', 'pirate', 'edgy'] },
  { id: 'emoji-alien', name: 'Alien Creature', category: 'Emojis', emoji: '👽', emojiSubcategory: 'Smileys & Faces', keywords: ['alien', 'ufo', 'extraterrestrial', 'sci-fi'] },
  { id: 'emoji-clown', name: 'Clown Face', category: 'Emojis', emoji: '🤡', emojiSubcategory: 'Smileys & Faces', keywords: ['clown', 'circus', 'joke', 'foolish'] },

  // --- Hands & Gestures ---
  { id: 'emoji-thumbs-up', name: 'Thumbs Up', category: 'Emojis', emoji: '👍', emojiSubcategory: 'Hands & Gestures', keywords: ['like', 'approve', 'yes', 'great', 'ok'] },
  { id: 'emoji-thumbs-down', name: 'Thumbs Down', category: 'Emojis', emoji: '👎', emojiSubcategory: 'Hands & Gestures', keywords: ['dislike', 'no', 'bad', 'reject'] },
  { id: 'emoji-clapping', name: 'Clapping Hands', category: 'Emojis', emoji: '👏', emojiSubcategory: 'Hands & Gestures', keywords: ['applause', 'bravo', 'congrats', 'cheer'] },
  { id: 'emoji-raised-hands', name: 'Raising Hands', category: 'Emojis', emoji: '🙌', emojiSubcategory: 'Hands & Gestures', keywords: ['celebrate', 'hooray', 'hallelujah', 'cheers'] },
  { id: 'emoji-handshake', name: 'Handshake Deal', category: 'Emojis', emoji: '🤝', emojiSubcategory: 'Hands & Gestures', keywords: ['deal', 'partner', 'agreement', 'business', 'welcome'] },
  { id: 'emoji-victory', name: 'Peace / Victory Sign', category: 'Emojis', emoji: '✌️', emojiSubcategory: 'Hands & Gestures', keywords: ['peace', 'victory', 'two', 'chill'] },
  { id: 'emoji-rock-on', name: 'Sign of the Horns / Rock On', category: 'Emojis', emoji: '🤘', emojiSubcategory: 'Hands & Gestures', keywords: ['rock', 'metal', 'music', 'party', 'cool'] },
  { id: 'emoji-call-me', name: 'Call Me Hand', category: 'Emojis', emoji: '🤙', emojiSubcategory: 'Hands & Gestures', keywords: ['shaka', 'call', 'hang loose', 'chill'] },
  { id: 'emoji-praying', name: 'Folded Hands / Prayer', category: 'Emojis', emoji: '🙏', emojiSubcategory: 'Hands & Gestures', keywords: ['pray', 'thank you', 'grateful', 'namaste', 'hope'] },
  { id: 'emoji-muscle', name: 'Flexed Biceps', category: 'Emojis', emoji: '💪', emojiSubcategory: 'Hands & Gestures', keywords: ['strong', 'power', 'gym', 'fitness', 'workout', 'effort'] },
  { id: 'emoji-brain', name: 'Human Brain', category: 'Emojis', emoji: '🧠', emojiSubcategory: 'Hands & Gestures', keywords: ['mind', 'smart', 'intelligence', 'idea', 'genius'] },

  // --- Animals & Nature ---
  { id: 'emoji-dog', name: 'Dog Face', category: 'Emojis', emoji: '🐶', emojiSubcategory: 'Animals & Nature', keywords: ['dog', 'puppy', 'pet', 'cute', 'canine'] },
  { id: 'emoji-cat', name: 'Cat Face', category: 'Emojis', emoji: '🐱', emojiSubcategory: 'Animals & Nature', keywords: ['cat', 'kitten', 'pet', 'feline', 'meow'] },
  { id: 'emoji-fox', name: 'Fox Face', category: 'Emojis', emoji: '🦊', emojiSubcategory: 'Animals & Nature', keywords: ['fox', 'clever', 'metamask', 'wild'] },
  { id: 'emoji-lion', name: 'Lion', category: 'Emojis', emoji: '🦁', emojiSubcategory: 'Animals & Nature', keywords: ['lion', 'king', 'brave', 'wild', 'strength'] },
  { id: 'emoji-tiger', name: 'Tiger', category: 'Emojis', emoji: '🐯', emojiSubcategory: 'Animals & Nature', keywords: ['tiger', 'wild', 'cat', 'fierce'] },
  { id: 'emoji-panda', name: 'Panda', category: 'Emojis', emoji: '🐼', emojiSubcategory: 'Animals & Nature', keywords: ['panda', 'bear', 'bamboo', 'cute'] },
  { id: 'emoji-bear', name: 'Bear', category: 'Emojis', emoji: '🐻', emojiSubcategory: 'Animals & Nature', keywords: ['bear', 'grizzly', 'market', 'wild'] },
  { id: 'emoji-unicorn', name: 'Unicorn', category: 'Emojis', emoji: '🦄', emojiSubcategory: 'Animals & Nature', keywords: ['unicorn', 'startup', 'billion', 'magic', 'fantasy'] },
  { id: 'emoji-eagle', name: 'Eagle', category: 'Emojis', emoji: '🦅', emojiSubcategory: 'Animals & Nature', keywords: ['eagle', 'bird', 'freedom', 'soar'] },
  { id: 'emoji-owl', name: 'Wise Owl', category: 'Emojis', emoji: '🦉', emojiSubcategory: 'Animals & Nature', keywords: ['owl', 'wise', 'night', 'smart', 'duolingo'] },
  { id: 'emoji-bee', name: 'Honeybee', category: 'Emojis', emoji: '🐝', emojiSubcategory: 'Animals & Nature', keywords: ['bee', 'honey', 'worker', 'buzz', 'nature'] },
  { id: 'emoji-butterfly', name: 'Butterfly', category: 'Emojis', emoji: '🦋', emojiSubcategory: 'Animals & Nature', keywords: ['butterfly', 'beauty', 'transform', 'nature', 'wings'] },
  { id: 'emoji-palm-tree', name: 'Palm Tree', category: 'Emojis', emoji: '🌴', emojiSubcategory: 'Animals & Nature', keywords: ['tropical', 'beach', 'vacation', 'summer', 'island'] },
  { id: 'emoji-four-leaf-clover', name: 'Four Leaf Clover', category: 'Emojis', emoji: '🍀', emojiSubcategory: 'Animals & Nature', keywords: ['luck', 'lucky', 'irish', 'green', 'fortune'] },
  { id: 'emoji-cherry-blossom', name: 'Cherry Blossom Flower', category: 'Emojis', emoji: '🌸', emojiSubcategory: 'Animals & Nature', keywords: ['sakura', 'flower', 'japan', 'spring', 'bloom'] },
  { id: 'emoji-sunflower', name: 'Sunflower', category: 'Emojis', emoji: '🌻', emojiSubcategory: 'Animals & Nature', keywords: ['sunflower', 'sun', 'yellow', 'summer'] },
  { id: 'emoji-rainbow', name: 'Rainbow', category: 'Emojis', emoji: '🌈', emojiSubcategory: 'Animals & Nature', keywords: ['rainbow', 'colors', 'sky', 'pride', 'hope'] },
  { id: 'emoji-earth-globe', name: 'Earth Globe Americas', category: 'Emojis', emoji: '🌎', emojiSubcategory: 'Animals & Nature', keywords: ['earth', 'globe', 'world', 'planet', 'environment'] },
  { id: 'emoji-ringed-planet', name: 'Ringed Planet Saturn', category: 'Emojis', emoji: '🪐', emojiSubcategory: 'Animals & Nature', keywords: ['planet', 'saturn', 'space', 'galaxy', 'cosmos'] },

  // --- Food & Drinks ---
  { id: 'emoji-pizza', name: 'Pizza Slice', category: 'Emojis', emoji: '🍕', emojiSubcategory: 'Food & Drink', keywords: ['pizza', 'cheese', 'italian', 'food', 'snack'] },
  { id: 'emoji-burger', name: 'Hamburger', category: 'Emojis', emoji: '🍔', emojiSubcategory: 'Food & Drink', keywords: ['burger', 'fast food', 'dinner', 'beef'] },
  { id: 'emoji-fries', name: 'French Fries', category: 'Emojis', emoji: '🍟', emojiSubcategory: 'Food & Drink', keywords: ['fries', 'potato', 'snack', 'fast food'] },
  { id: 'emoji-sushi', name: 'Sushi Nigiri', category: 'Emojis', emoji: '🍣', emojiSubcategory: 'Food & Drink', keywords: ['sushi', 'japanese', 'fish', 'rice', 'restaurant'] },
  { id: 'emoji-coffee-hot', name: 'Hot Coffee', category: 'Emojis', emoji: '☕', emojiSubcategory: 'Food & Drink', keywords: ['coffee', 'cafe', 'espresso', 'tea', 'morning', 'code'] },
  { id: 'emoji-boba', name: 'Boba Milk Tea', category: 'Emojis', emoji: '🧋', emojiSubcategory: 'Food & Drink', keywords: ['boba', 'bubble tea', 'tapioca', 'drink', 'sweet'] },
  { id: 'emoji-donut', name: 'Glazed Donut', category: 'Emojis', emoji: '🍩', emojiSubcategory: 'Food & Drink', keywords: ['donut', 'dessert', 'sweet', 'bakery'] },
  { id: 'emoji-icecream', name: 'Soft Ice Cream', category: 'Emojis', emoji: '🍦', emojiSubcategory: 'Food & Drink', keywords: ['ice cream', 'dessert', 'summer', 'sweet'] },
  { id: 'emoji-beer-cheers', name: 'Clinking Beer Mugs', category: 'Emojis', emoji: '🍻', emojiSubcategory: 'Food & Drink', keywords: ['beer', 'cheers', 'party', 'bar', 'celebrate'] },
  { id: 'emoji-wine', name: 'Wine Glass', category: 'Emojis', emoji: '🍷', emojiSubcategory: 'Food & Drink', keywords: ['wine', 'champagne', 'drink', 'dinner'] },
  { id: 'emoji-avocado', name: 'Avocado', category: 'Emojis', emoji: '🥑', emojiSubcategory: 'Food & Drink', keywords: ['avocado', 'healthy', 'guac', 'vegan'] },
  { id: 'emoji-strawberry', name: 'Strawberry', category: 'Emojis', emoji: '🍓', emojiSubcategory: 'Food & Drink', keywords: ['strawberry', 'berry', 'fruit', 'sweet'] },

  // --- Activities & Games ---
  { id: 'emoji-gamepad', name: 'Video Game Controller', category: 'Emojis', emoji: '🎮', emojiSubcategory: 'Activities & Games', keywords: ['game', 'gaming', 'playstation', 'xbox', 'nintendo', 'esports'] },
  { id: 'emoji-joystick', name: 'Arcade Joystick', category: 'Emojis', emoji: '🕹️', emojiSubcategory: 'Activities & Games', keywords: ['arcade', 'retro', 'gaming', 'classic'] },
  { id: 'emoji-dice', name: 'Game Die / Dice', category: 'Emojis', emoji: '🎲', emojiSubcategory: 'Activities & Games', keywords: ['dice', 'board game', 'casino', 'random', 'chance'] },
  { id: 'emoji-target-dart', name: 'Direct Hit Bullseye', category: 'Emojis', emoji: '🎯', emojiSubcategory: 'Activities & Games', keywords: ['target', 'bullseye', 'goal', 'accuracy', 'focus'] },
  { id: 'emoji-soccer', name: 'Soccer Ball', category: 'Emojis', emoji: '⚽', emojiSubcategory: 'Activities & Games', keywords: ['soccer', 'football', 'fifa', 'sports', 'match'] },
  { id: 'emoji-basketball', name: 'Basketball', category: 'Emojis', emoji: '🏀', emojiSubcategory: 'Activities & Games', keywords: ['basketball', 'nba', 'dunk', 'sports'] },
  { id: 'emoji-trophy-gold', name: 'Gold Trophy', category: 'Emojis', emoji: '🏆', emojiSubcategory: 'Activities & Games', keywords: ['trophy', 'winner', 'first', 'champion', 'cup'] },
  { id: 'emoji-medal-1st', name: '1st Place Gold Medal', category: 'Emojis', emoji: '🥇', emojiSubcategory: 'Activities & Games', keywords: ['gold', 'first', 'medal', 'winner', 'olympic'] },
  { id: 'emoji-guitar', name: 'Electric Guitar', category: 'Emojis', emoji: '🎸', emojiSubcategory: 'Activities & Games', keywords: ['guitar', 'music', 'rock', 'band', 'concert'] },

  // --- Travel & Vehicles ---
  { id: 'emoji-airplane', name: 'Airplane', category: 'Emojis', emoji: '✈️', emojiSubcategory: 'Travel & Places', keywords: ['plane', 'flight', 'travel', 'vacation', 'trip'] },
  { id: 'emoji-sports-car', name: 'Sports Car', category: 'Emojis', emoji: '🏎️', emojiSubcategory: 'Travel & Places', keywords: ['race car', 'f1', 'speed', 'ferrari', 'supercar'] },
  { id: 'emoji-automobile', name: 'Electric Car', category: 'Emojis', emoji: '🚗', emojiSubcategory: 'Travel & Places', keywords: ['car', 'tesla', 'vehicle', 'drive'] },
  { id: 'emoji-motorcycle', name: 'Motorcycle', category: 'Emojis', emoji: '🏍️', emojiSubcategory: 'Travel & Places', keywords: ['bike', 'moto', 'rider', 'speed'] },
  { id: 'emoji-sailboat', name: 'Sailboat', category: 'Emojis', emoji: '⛵', emojiSubcategory: 'Travel & Places', keywords: ['boat', 'yacht', 'sailing', 'sea', 'ocean'] },
  { id: 'emoji-island', name: 'Desert Island', category: 'Emojis', emoji: '🏝️', emojiSubcategory: 'Travel & Places', keywords: ['island', 'tropical', 'beach', 'paradise'] },
  { id: 'emoji-mountain', name: 'Snow Capped Mountain', category: 'Emojis', emoji: '🏔️', emojiSubcategory: 'Travel & Places', keywords: ['mountain', 'peak', 'hiking', 'nature', 'everest'] },
  { id: 'emoji-tokyo-tower', name: 'Tokyo Tower', category: 'Emojis', emoji: '🗼', emojiSubcategory: 'Travel & Places', keywords: ['tower', 'tokyo', 'japan', 'city', 'landmark'] },

  // --- Objects, Tech & Symbols ---
  { id: 'emoji-laptop-mac', name: 'Laptop Computer', category: 'Emojis', emoji: '💻', emojiSubcategory: 'Objects & Tech', keywords: ['laptop', 'macbook', 'pc', 'code', 'work'] },
  { id: 'emoji-iphone', name: 'Mobile Phone', category: 'Emojis', emoji: '📱', emojiSubcategory: 'Objects & Tech', keywords: ['iphone', 'smartphone', 'mobile', 'call', 'app'] },
  { id: 'emoji-bulb-idea', name: 'Light Bulb / Idea', category: 'Emojis', emoji: '💡', emojiSubcategory: 'Objects & Tech', keywords: ['idea', 'light', 'innovation', 'smart', 'thought'] },
  { id: 'emoji-money-bag', name: 'Money Bag', category: 'Emojis', emoji: '💰', emojiSubcategory: 'Objects & Tech', keywords: ['money', 'cash', 'dollars', 'rich', 'wealth', 'crypto'] },
  { id: 'emoji-credit-card', name: 'Credit Card', category: 'Emojis', emoji: '💳', emojiSubcategory: 'Objects & Tech', keywords: ['credit card', 'pay', 'stripe', 'bank'] },
  { id: 'emoji-chart-increasing', name: 'Chart Increasing', category: 'Emojis', emoji: '📈', emojiSubcategory: 'Objects & Tech', keywords: ['chart', 'growth', 'stocks', 'stonks', 'analytics'] },
  { id: 'emoji-bell-notification', name: 'Bell Notification', category: 'Emojis', emoji: '🔔', emojiSubcategory: 'Objects & Tech', keywords: ['bell', 'alarm', 'alert', 'notice', 'subscribe'] },
  { id: 'emoji-package-box', name: 'Delivery Package', category: 'Emojis', emoji: '📦', emojiSubcategory: 'Objects & Tech', keywords: ['box', 'amazon', 'parcel', 'shipping'] },
  { id: 'emoji-key-auth', name: 'Golden Key', category: 'Emojis', emoji: '🔑', emojiSubcategory: 'Objects & Tech', keywords: ['key', 'unlock', 'security', 'auth', 'access'] },
  { id: 'emoji-padlock', name: 'Locked Padlock', category: 'Emojis', emoji: '🔒', emojiSubcategory: 'Objects & Tech', keywords: ['lock', 'security', 'private', 'safety'] },
  { id: 'emoji-shield-protect', name: 'Security Shield', category: 'Emojis', emoji: '🛡️', emojiSubcategory: 'Objects & Tech', keywords: ['shield', 'defense', 'security', 'guard'] },
  { id: 'emoji-palette-paint', name: 'Artist Palette', category: 'Emojis', emoji: '🎨', emojiSubcategory: 'Objects & Tech', keywords: ['art', 'color', 'paint', 'design', 'creative'] },
  { id: 'emoji-magnifier', name: 'Magnifying Glass', category: 'Emojis', emoji: '🔍', emojiSubcategory: 'Objects & Tech', keywords: ['search', 'find', 'lookup', 'inspect', 'detective'] },
  { id: 'emoji-gear-settings', name: 'Settings Gear', category: 'Emojis', emoji: '⚙️', emojiSubcategory: 'Objects & Tech', keywords: ['gear', 'settings', 'options', 'machinery'] },
  { id: 'emoji-check-green', name: 'Checkmark Green', category: 'Emojis', emoji: '✅', emojiSubcategory: 'Symbols & Hearts', keywords: ['check', 'done', 'yes', 'verified', 'approved'] },
  { id: 'emoji-cross-red', name: 'Red Cross Mark', category: 'Emojis', emoji: '❌', emojiSubcategory: 'Symbols & Hearts', keywords: ['no', 'cancel', 'wrong', 'delete', 'error'] },
  { id: 'emoji-warning-sign', name: 'Warning Sign', category: 'Emojis', emoji: '⚠️', emojiSubcategory: 'Symbols & Hearts', keywords: ['warning', 'alert', 'caution', 'danger'] },
  { id: 'emoji-flag-checkered', name: 'Checkered Flag', category: 'Emojis', emoji: '🏁', emojiSubcategory: 'Symbols & Hearts', keywords: ['finish', 'race', 'winner', 'complete'] },
];

// ==========================================
// MASTER EXPORT CATALOG
// ==========================================
export const ICONS_CATALOG: IconItem[] = [
  ...MOBILE_ICONS,
  ...TECH_ICONS,
  ...DESIGN_ICONS,
  ...BUSINESS_ICONS,
  ...MEDIA_ICONS,
  ...SHAPES_ICONS,
  ...NATURE_ICONS,
  ...ARROWS_ICONS,
  ...EMOJI_ITEMS,
];
