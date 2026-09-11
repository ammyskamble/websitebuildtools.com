import React from 'react';
import {
  // Brand & Tech
  Code, Terminal, Cpu, Database, Server, Globe, Cloud, Shield, Lock, Key,
  Layers, Box, Feather, Sparkles, Zap, Flame, Rocket, Compass, Satellite,
  GitBranch, GitPullRequest, Laptop, Smartphone,
  
  // UI & Design
  Palette, PenTool, Brush, Wand2, Droplets, Contrast,
  Sun, Moon, Star, Heart, Bookmark, Crown,
  
  // Business, Commerce & Finance
  Briefcase, Building, ShoppingCart, ShoppingBag, CreditCard, DollarSign, Wallet,
  TrendingUp, Target, Award, Trophy, Users, Mail, Send,
  
  // Media, Audio & Creative
  Camera, Video, Image, Play, Headphones, Music, Mic,
  
  // Shapes & Geometry
  Hexagon, Square, Circle, Triangle, Diamond, Grid, LayoutGrid, RefreshCw,
  
  // Nature, Travel & Real-World
  MapPin, Anchor, Plane, Leaf, Flower2, Coffee, Gift, Clock,
  
  // Arrows & Navigation
  ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, Settings, Sliders, Search
} from 'lucide-react';

export interface IconItem {
  id: string;
  name: string;
  category: 'Tech' | 'Design' | 'Business' | 'Media' | 'Shapes' | 'Nature' | 'Arrows' | 'UI';
  keywords: string[];
  icon: React.ComponentType<{ className?: string; size?: number; color?: string; strokeWidth?: number }>;
}

export const ICONS_CATALOG: IconItem[] = [
  // Tech & Development
  { id: 'sparkles', name: 'Sparkles', category: 'Design', keywords: ['magic', 'ai', 'clean', 'star', 'new'], icon: Sparkles },
  { id: 'zap', name: 'Zap', category: 'Tech', keywords: ['lightning', 'fast', 'energy', 'power', 'quick'], icon: Zap },
  { id: 'flame', name: 'Flame', category: 'Tech', keywords: ['fire', 'hot', 'burn', 'energy', 'popular'], icon: Flame },
  { id: 'rocket', name: 'Rocket', category: 'Tech', keywords: ['launch', 'startup', 'speed', 'fly'], icon: Rocket },
  { id: 'terminal', name: 'Terminal', category: 'Tech', keywords: ['cli', 'bash', 'code', 'dev'], icon: Terminal },
  { id: 'code', name: 'Code', category: 'Tech', keywords: ['programming', 'html', 'developer', 'syntax'], icon: Code },
  { id: 'cpu', name: 'CPU', category: 'Tech', keywords: ['chip', 'processor', 'hardware', 'compute'], icon: Cpu },
  { id: 'database', name: 'Database', category: 'Tech', keywords: ['sql', 'data', 'storage', 'server'], icon: Database },
  { id: 'server', name: 'Server', category: 'Tech', keywords: ['hosting', 'backend', 'cloud', 'rack'], icon: Server },
  { id: 'globe', name: 'Globe', category: 'Tech', keywords: ['world', 'web', 'internet', 'earth'], icon: Globe },
  { id: 'shield', name: 'Shield', category: 'Tech', keywords: ['security', 'protect', 'safe', 'guard'], icon: Shield },
  { id: 'lock', name: 'Lock', category: 'Tech', keywords: ['security', 'password', 'private', 'protect'], icon: Lock },
  { id: 'key', name: 'Key', category: 'Tech', keywords: ['access', 'auth', 'security', 'token'], icon: Key },
  { id: 'cloud', name: 'Cloud', category: 'Tech', keywords: ['storage', 'aws', 'sync', 'online'], icon: Cloud },
  { id: 'git-branch', name: 'Git Branch', category: 'Tech', keywords: ['vcs', 'merge', 'repo', 'github'], icon: GitBranch },
  { id: 'git-pull-request', name: 'Pull Request', category: 'Tech', keywords: ['pr', 'code', 'review'], icon: GitPullRequest },
  { id: 'box', name: 'Box', category: 'Tech', keywords: ['package', 'docker', 'cube', 'container'], icon: Box },
  { id: 'layers', name: 'Layers', category: 'Tech', keywords: ['stack', 'design', 'components', 'levels'], icon: Layers },
  { id: 'laptop', name: 'Laptop', category: 'Tech', keywords: ['computer', 'mac', 'pc', 'device'], icon: Laptop },
  { id: 'smartphone', name: 'Smartphone', category: 'Tech', keywords: ['mobile', 'phone', 'app', 'iphone'], icon: Smartphone },
  { id: 'satellite', name: 'Satellite', category: 'Tech', keywords: ['space', 'orbit', 'signal', 'gps'], icon: Satellite },

  // Design & UI
  { id: 'palette', name: 'Palette', category: 'Design', keywords: ['color', 'art', 'paint', 'theme'], icon: Palette },
  { id: 'pen-tool', name: 'Pen Tool', category: 'Design', keywords: ['vector', 'bezier', 'draw', 'illustrator'], icon: PenTool },
  { id: 'brush', name: 'Brush', category: 'Design', keywords: ['paint', 'draw', 'canvas', 'sketch'], icon: Brush },
  { id: 'wand', name: 'Magic Wand', category: 'Design', keywords: ['magic', 'effect', 'filter', 'ai'], icon: Wand2 },
  { id: 'droplets', name: 'Droplets', category: 'Design', keywords: ['water', 'ink', 'liquid', 'color'], icon: Droplets },
  { id: 'contrast', name: 'Contrast', category: 'Design', keywords: ['dark', 'light', 'mode', 'theme'], icon: Contrast },
  { id: 'sun', name: 'Sun', category: 'Design', keywords: ['light', 'brightness', 'day', 'weather'], icon: Sun },
  { id: 'moon', name: 'Moon', category: 'Design', keywords: ['dark', 'night', 'sleep', 'theme'], icon: Moon },
  { id: 'star', name: 'Star', category: 'Design', keywords: ['rating', 'favorite', 'favorite', 'gold'], icon: Star },
  { id: 'heart', name: 'Heart', category: 'Design', keywords: ['love', 'like', 'health', 'favorite'], icon: Heart },
  { id: 'bookmark', name: 'Bookmark', category: 'Design', keywords: ['save', 'favorite', 'tag', 'read'], icon: Bookmark },
  { id: 'crown', name: 'Crown', category: 'Design', keywords: ['king', 'vip', 'premium', 'royal'], icon: Crown },
  { id: 'feather', name: 'Feather', category: 'Design', keywords: ['light', 'bird', 'quill', 'pen'], icon: Feather },

  // Shapes & Geometry
  { id: 'hexagon', name: 'Hexagon', category: 'Shapes', keywords: ['polygon', 'honeycomb', 'geometry'], icon: Hexagon },
  { id: 'circle', name: 'Circle', category: 'Shapes', keywords: ['round', 'dot', 'shape'], icon: Circle },
  { id: 'square', name: 'Square', category: 'Shapes', keywords: ['box', 'rectangle', 'quad'], icon: Square },
  { id: 'triangle', name: 'Triangle', category: 'Shapes', keywords: ['pyramid', 'delta', 'sharp'], icon: Triangle },
  { id: 'diamond', name: 'Diamond', category: 'Shapes', keywords: ['gem', 'rhombus', 'valuable'], icon: Diamond },
  { id: 'layout-grid', name: 'Layout Grid', category: 'Shapes', keywords: ['grid', 'matrix', 'dashboard', 'bento'], icon: LayoutGrid },
  { id: 'grid', name: 'Grid', category: 'Shapes', keywords: ['pattern', 'table', 'columns'], icon: Grid },
  { id: 'refresh-cw', name: 'Refresh', category: 'Shapes', keywords: ['reload', 'loop', 'sync', 'spin'], icon: RefreshCw },
  { id: 'compass', name: 'Compass', category: 'Shapes', keywords: ['direction', 'safari', 'explore', 'north'], icon: Compass },

  // Business & Commerce
  { id: 'briefcase', name: 'Briefcase', category: 'Business', keywords: ['work', 'job', 'portfolio', 'bag'], icon: Briefcase },
  { id: 'building', name: 'Building', category: 'Business', keywords: ['company', 'enterprise', 'office', 'city'], icon: Building },
  { id: 'shopping-cart', name: 'Cart', category: 'Business', keywords: ['shop', 'store', 'checkout', 'buy'], icon: ShoppingCart },
  { id: 'shopping-bag', name: 'Bag', category: 'Business', keywords: ['store', 'retail', 'fashion'], icon: ShoppingBag },
  { id: 'credit-card', name: 'Card', category: 'Business', keywords: ['payment', 'stripe', 'checkout', 'money'], icon: CreditCard },
  { id: 'dollar-sign', name: 'Dollar', category: 'Business', keywords: ['money', 'finance', 'revenue', 'cost'], icon: DollarSign },
  { id: 'wallet', name: 'Wallet', category: 'Business', keywords: ['crypto', 'web3', 'money', 'finance'], icon: Wallet },
  { id: 'trending-up', name: 'Trending Up', category: 'Business', keywords: ['growth', 'analytics', 'profit', 'chart'], icon: TrendingUp },
  { id: 'target', name: 'Target', category: 'Business', keywords: ['goal', 'focus', 'accuracy', 'aim'], icon: Target },
  { id: 'trophy', name: 'Trophy', category: 'Business', keywords: ['winner', 'champion', 'achievement'], icon: Trophy },
  { id: 'award', name: 'Award', category: 'Business', keywords: ['medal', 'badge', 'honor'], icon: Award },
  { id: 'users', name: 'Users', category: 'Business', keywords: ['team', 'community', 'people', 'group'], icon: Users },
  { id: 'mail', name: 'Mail', category: 'Business', keywords: ['email', 'letter', 'contact', 'inbox'], icon: Mail },
  { id: 'send', name: 'Send', category: 'Business', keywords: ['airplane', 'submit', 'message', 'telegram'], icon: Send },

  // Media & Creative
  { id: 'camera', name: 'Camera', category: 'Media', keywords: ['photo', 'picture', 'snapshot', 'instagram'], icon: Camera },
  { id: 'video', name: 'Video', category: 'Media', keywords: ['record', 'camera', 'movie', 'youtube'], icon: Video },
  { id: 'image', name: 'Image', category: 'Media', keywords: ['picture', 'graphic', 'gallery', 'photo'], icon: Image },
  { id: 'play', name: 'Play', category: 'Media', keywords: ['media', 'start', 'stream', 'audio'], icon: Play },
  { id: 'headphones', name: 'Headphones', category: 'Media', keywords: ['music', 'listen', 'podcast', 'audio'], icon: Headphones },
  { id: 'music', name: 'Music', category: 'Media', keywords: ['song', 'melody', 'tune', 'note'], icon: Music },
  { id: 'mic', name: 'Mic', category: 'Media', keywords: ['podcast', 'record', 'audio', 'voice'], icon: Mic },

  // Nature & Real-world
  { id: 'map-pin', name: 'Location Pin', category: 'Nature', keywords: ['map', 'gps', 'place', 'travel'], icon: MapPin },
  { id: 'anchor', name: 'Anchor', category: 'Nature', keywords: ['boat', 'marine', 'sea', 'dock'], icon: Anchor },
  { id: 'plane', name: 'Plane', category: 'Nature', keywords: ['flight', 'travel', 'airport', 'trip'], icon: Plane },
  { id: 'leaf', name: 'Leaf', category: 'Nature', keywords: ['eco', 'green', 'plant', 'nature'], icon: Leaf },
  { id: 'flower', name: 'Flower', category: 'Nature', keywords: ['bloom', 'floral', 'spring', 'beauty'], icon: Flower2 },
  { id: 'coffee', name: 'Coffee', category: 'Nature', keywords: ['cafe', 'drink', 'morning', 'cup'], icon: Coffee },
  { id: 'gift', name: 'Gift', category: 'Nature', keywords: ['present', 'holiday', 'reward', 'box'], icon: Gift },
  { id: 'clock', name: 'Clock', category: 'Nature', keywords: ['time', 'timer', 'history', 'hour'], icon: Clock },

  // UI & Navigation
  { id: 'arrow-right', name: 'Arrow Right', category: 'Arrows', keywords: ['next', 'forward', 'move'], icon: ArrowRight },
  { id: 'arrow-up-right', name: 'Arrow Up Right', category: 'Arrows', keywords: ['external', 'jump', 'diagonal'], icon: ArrowUpRight },
  { id: 'check-circle', name: 'Check Circle', category: 'UI', keywords: ['success', 'done', 'approved', 'yes'], icon: CheckCircle2 },
  { id: 'alert-triangle', name: 'Alert', category: 'UI', keywords: ['warning', 'caution', 'danger'], icon: AlertTriangle },
  { id: 'settings', name: 'Settings', category: 'UI', keywords: ['gear', 'configure', 'options'], icon: Settings },
  { id: 'sliders', name: 'Sliders', category: 'UI', keywords: ['tune', 'adjust', 'filter', 'control'], icon: Sliders },
  { id: 'search', name: 'Search', category: 'UI', keywords: ['find', 'lookup', 'magnifier', 'explore'], icon: Search },
];

export const CATEGORIES = ['All', 'Tech', 'Design', 'Shapes', 'Business', 'Media', 'Nature', 'Arrows', 'UI'] as const;
export type CategoryType = typeof CATEGORIES[number];
