/**
 * Google Gemini AI Integration Engine
 * Connects directly to Google Generative Language API.
 * Supports Gemini 2.5 Flash, 2.0 Flash, and 1.5 Flash models.
 */

export type GeminiModel =
  | 'gemini-3.6-flash'
  | 'gemini-3.8-flash'
  | 'gemini-3.5-flash'
  | 'gemini-3.1-pro-preview'
  | 'gemini-2.5-flash'
  | 'gemini-flash-latest'
  | string;
export type AssetTargetType = 'svg' | 'html-css' | 'canvas-js';

const STORAGE_KEY_API_KEY = 'vf_gemini_api_key';
const STORAGE_KEY_MODEL = 'vf_gemini_model';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return (localStorage.getItem(STORAGE_KEY_API_KEY) || '').trim();
}

export function setStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  const cleanKey = key.trim();
  if (!cleanKey) {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY_API_KEY, cleanKey);
  }
}

export function getStoredModel(): string {
  if (typeof window === 'undefined') return 'gemini-3.6-flash';
  const saved = localStorage.getItem(STORAGE_KEY_MODEL);
  if (saved && saved.trim()) {
    const clean = saved.trim();
    if (clean === 'gemini-2.0-flash' || clean === 'gemini-2.5-flash') {
      return 'gemini-3.6-flash';
    }
    return clean;
  }
  return 'gemini-3.6-flash';
}

export function setStoredModel(model: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_MODEL, model.trim());
}

/**
 * Extracts clean code from Gemini output, stripping Markdown fences and explanations
 */
export function extractCodeBlock(rawText: string, targetType: AssetTargetType): string {
  let cleaned = rawText.trim();

  // Pattern 1: Look for markdown code fence matching the target
  const fenceRegex = /```(?:svg|xml|html|css|javascript|js|jsx)?\s*([\s\S]*?)```/gi;
  const matches: string[] = [];
  let match;
  while ((match = fenceRegex.exec(cleaned)) !== null) {
    if (match[1]?.trim()) {
      matches.push(match[1].trim());
    }
  }

  if (matches.length > 0) {
    if (targetType === 'svg') {
      // Find fence containing <svg
      const svgMatch = matches.find((m) => m.includes('<svg'));
      if (svgMatch) cleaned = svgMatch;
      else cleaned = matches[0];
    } else if (targetType === 'html-css') {
      // Combine if html and css are in separate fences
      if (matches.length > 1) {
        cleaned = matches.join('\n\n');
      } else {
        cleaned = matches[0];
      }
    } else {
      cleaned = matches[0];
    }
  }

  // Pattern 2: For SVG, extract from <svg to </svg>
  if (targetType === 'svg') {
    const svgStart = cleaned.indexOf('<svg');
    const svgEnd = cleaned.lastIndexOf('</svg>');
    if (svgStart !== -1 && svgEnd !== -1) {
      cleaned = cleaned.substring(svgStart, svgEnd + 6);
    }
  }

  return cleaned.trim();
}

/**
 * System prompts tailored to produce optimal code for vector graphics, icons, and favicons
 */
function getSystemInstruction(targetType: AssetTargetType): string {
  switch (targetType) {
    case 'svg':
      return `You are a world-class SVG vector designer and code generator.
Your task is to generate pristine, standalone, valid XML SVG markup for icons, logos, or favicons.
CRITICAL RULES:
1. Output ONLY the valid <svg ...>...</svg> element. Do not include introductory text, markdown commentary, or explanations.
2. The SVG MUST have xmlns="http://www.w3.org/2000/svg", viewBox="0 0 512 512", width="512", height="512".
3. Use modern, beautiful design principles: vibrant color palettes, sleek linear/radial gradients (<defs><linearGradient>...</defs>), rounded geometric elements, smooth curves (<path d="...">), subtle drop shadows or glow filters if appropriate.
4. Ensure the design is high-contrast, scalable, and looks stunning as a favicon at 16x16, 32x32 as well as high-res 512x512.
5. Do NOT reference external fonts, images, or remote URLs. All elements must be pure self-contained SVG vectors.`;

    case 'html-css':
      return `You are an expert front-end UI artist and CSS graphic designer.
Your task is to create standalone HTML and CSS visual art, badges, or icon components.
CRITICAL RULES:
1. Output ONLY a root container element (e.g., <div class="asset-container">...</div>) followed by a <style> tag.
2. The outer container must be styled with width: 512px; height: 512px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; box-sizing: border-box;
3. Use modern CSS: flexbox, CSS grid, linear/radial gradients, border-radius, clip-path, box-shadow, backdrop-filter.
4. Ensure clean, self-contained CSS without external libraries or fonts.
5. Return ONLY the HTML and <style> markup without markdown text or explanations.`;

    case 'canvas-js':
      return `You are an expert HTML5 Canvas & Creative Coding graphic programmer.
Your task is to provide JavaScript canvas drawing commands that render an icon, logo, or artistic emblem onto an HTML5 Canvas context.
CRITICAL RULES:
1. You have a CanvasRenderingContext2D variable named "ctx", and the canvas size is 512x512 (width = 512, height = 512).
2. Use standard 2D context methods: ctx.beginPath(), ctx.arc(), ctx.fillRect(), ctx.createLinearGradient(), ctx.bezierCurveTo(), ctx.fill(), ctx.stroke(), etc.
3. Keep the artwork centered in the 512x512 canvas.
4. Output ONLY the raw executable JavaScript statements or a function body. Do NOT create a canvas element or wrap in an HTML document.`;
  }
}

/**
 * In-Browser Neural Vector Synthesizer
 * Generates custom, dynamic vector assets (SVG, HTML/CSS, Canvas JS) from prompt semantics
 * without requiring any API key.
 */
export function generateProceduralAsset(rawPrompt: string, targetType: AssetTargetType): string {
  const p = rawPrompt.toLowerCase();

  // 1. Determine Color Palette
  let c1 = '#6366f1';
  let c2 = '#3b82f6';
  let accent = '#38bdf8';
  let bgDark = '#090d16';
  let bgDarker = '#030712';

  if (p.includes('cyber') || p.includes('neon') || p.includes('cyan') || p.includes('matrix')) {
    c1 = '#06b6d4';
    c2 = '#8b5cf6';
    accent = '#ec4899';
    bgDark = '#080d1a';
  } else if (p.includes('gold') || p.includes('crypto') || p.includes('coin') || p.includes('luxury') || p.includes('amber') || p.includes('bitcoin')) {
    c1 = '#fbbf24';
    c2 = '#f59e0b';
    accent = '#ffffff';
    bgDark = '#161205';
  } else if (p.includes('emerald') || p.includes('green') || p.includes('mint') || p.includes('nature') || p.includes('leaf') || p.includes('eco')) {
    c1 = '#10b981';
    c2 = '#06b6d4';
    accent = '#6ee7b7';
    bgDark = '#041f17';
  } else if (p.includes('fire') || p.includes('flame') || p.includes('red') || p.includes('hot') || p.includes('ruby')) {
    c1 = '#f43f5e';
    c2 = '#fb923c';
    accent = '#fef08a';
    bgDark = '#1c0709';
  } else if (p.includes('purple') || p.includes('violet') || p.includes('galaxy') || p.includes('cosmic')) {
    c1 = '#a855f7';
    c2 = '#ec4899';
    accent = '#38bdf8';
    bgDark = '#130826';
  } else if (p.includes('blue') || p.includes('saas') || p.includes('cloud') || p.includes('sky') || p.includes('ocean')) {
    c1 = '#38bdf8';
    c2 = '#6366f1';
    accent = '#ffffff';
    bgDark = '#080e21';
  }

  // 2. Determine Background Shape
  let bgShapeMarkup = '';
  if (p.includes('shield')) {
    bgShapeMarkup = `<path d="M256 32 C384 32 464 96 464 224 C464 368 256 480 256 480 C256 480 48 368 48 224 C48 96 128 32 256 32 Z" fill="url(#bgGrad)" stroke="${c1}" stroke-width="8" />`;
  } else if (p.includes('hex') || p.includes('hexagon')) {
    bgShapeMarkup = `<polygon points="256,24 472,148 472,396 256,520 40,396 40,148" fill="url(#bgGrad)" stroke="${c1}" stroke-width="8" />`;
  } else if (p.includes('circle') || p.includes('orb') || p.includes('round')) {
    bgShapeMarkup = `<circle cx="256" cy="256" r="236" fill="url(#bgGrad)" stroke="${c1}" stroke-width="8" />`;
  } else {
    bgShapeMarkup = `<rect width="512" height="512" rx="140" fill="url(#bgGrad)" stroke="${c1}" stroke-opacity="0.3" stroke-width="4" />`;
  }

  // 3. Determine Core Glyph Geometry
  let glyphMarkup = '';
  let canvasGlyphDraw = '';

  if (p.includes('lightning') || p.includes('bolt') || p.includes('electric') || p.includes('power') || p.includes('zap') || p.includes('energy')) {
    glyphMarkup = `
  <path d="M280 72 L144 280 H264 L224 448 L376 232 H256 Z" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="8" stroke-linejoin="round" />
  <circle cx="256" cy="256" r="180" fill="none" stroke="${c1}" stroke-width="4" stroke-dasharray="16 16" opacity="0.4" />`;
    canvasGlyphDraw = `
// Draw Lightning Bolt
ctx.fillStyle = coreGrad;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 8;
ctx.lineJoin = 'round';
ctx.beginPath();
ctx.moveTo(280, 72);
ctx.lineTo(144, 280);
ctx.lineTo(264, 280);
ctx.lineTo(224, 448);
ctx.lineTo(376, 232);
ctx.lineTo(256, 232);
ctx.closePath();
ctx.fill();
ctx.stroke();`;
  } else if (p.includes('rocket') || p.includes('launch') || p.includes('space')) {
    glyphMarkup = `
  <g transform="translate(0, -10)">
    <!-- Exhaust Flame -->
    <path d="M224 336 C224 416 256 460 256 460 C256 460 288 416 288 336 Z" fill="${accent}" opacity="0.9" />
    <path d="M236 336 C236 392 256 424 256 424 C256 424 276 392 276 336 Z" fill="#ffffff" />
    <!-- Fins -->
    <path d="M168 312 L112 376 L168 392 L192 312 Z" fill="url(#coreGrad)" />
    <path d="M344 312 L400 376 L344 392 L320 312 Z" fill="url(#coreGrad)" />
    <!-- Hull -->
    <path d="M256 80 C312 128 344 216 344 320 L168 320 C168 216 200 128 256 80 Z" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="8" stroke-linejoin="round" />
    <circle cx="256" cy="208" r="32" fill="#ffffff" />
    <circle cx="256" cy="208" r="22" fill="${c2}" />
  </g>`;
    canvasGlyphDraw = `
// Draw Rocket
ctx.fillStyle = '${accent}';
ctx.beginPath();
ctx.ellipse(256, 380, 24, 60, 0, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = coreGrad;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(256, 80);
ctx.bezierCurveTo(312, 128, 344, 216, 344, 320);
ctx.lineTo(168, 320);
ctx.bezierCurveTo(168, 216, 200, 128, 256, 80);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.arc(256, 208, 32, 0, Math.PI * 2);
ctx.fill();`;
  } else if (p.includes('brain') || p.includes('ai') || p.includes('neural') || p.includes('intel')) {
    glyphMarkup = `
  <rect x="128" y="128" width="256" height="256" rx="48" fill="none" stroke="url(#coreGrad)" stroke-width="14" />
  <path d="M128 192 H88 M128 256 H72 M128 320 H88 M384 192 H424 M384 256 H440 M384 320 H424 M192 128 V88 M256 128 V72 M320 128 V88 M192 384 V424 M256 384 V440 M320 384 V424" stroke="${c1}" stroke-width="10" stroke-linecap="round" />
  <polygon points="256,168 336,216 336,304 256,352 176,304 176,216" fill="url(#coreGrad)" />
  <circle cx="256" cy="256" r="32" fill="#ffffff" />`;
    canvasGlyphDraw = `
// Draw AI Neural Core
ctx.strokeStyle = coreGrad;
ctx.lineWidth = 14;
ctx.beginPath();
ctx.roundRect(128, 128, 256, 256, 48);
ctx.stroke();

ctx.fillStyle = coreGrad;
ctx.beginPath();
ctx.arc(256, 256, 64, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.arc(256, 256, 32, 0, Math.PI * 2);
ctx.fill();`;
  } else if (p.includes('shield') || p.includes('protect') || p.includes('defense') || p.includes('security')) {
    glyphMarkup = `
  <path d="M256 104 L384 152 V272 C384 352 256 424 256 424 C256 424 128 352 128 272 V152 Z" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="12" stroke-linejoin="round" />
  <path d="M256 160 L328 192 V264 C328 316 256 368 256 368 C256 368 184 316 184 264 V192 Z" fill="#ffffff" opacity="0.9" />
  <circle cx="256" cy="264" r="28" fill="${c1}" />`;
    canvasGlyphDraw = `
// Draw Shield
ctx.fillStyle = coreGrad;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 12;
ctx.lineJoin = 'round';
ctx.beginPath();
ctx.moveTo(256, 104);
ctx.lineTo(384, 152);
ctx.lineTo(384, 272);
ctx.bezierCurveTo(384, 352, 256, 424, 256, 424);
ctx.bezierCurveTo(256, 424, 128, 352, 128, 272);
ctx.lineTo(128, 152);
ctx.closePath();
ctx.fill();
ctx.stroke();`;
  } else if (p.includes('diamond') || p.includes('gem') || p.includes('crystal') || p.includes('jewel')) {
    glyphMarkup = `
  <polygon points="256,96 392,192 256,416 120,192" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="8" stroke-linejoin="round" />
  <polyline points="120,192 256,240 392,192" fill="none" stroke="#ffffff" stroke-width="6" />
  <line x1="256" y1="96" x2="256" y2="416" stroke="#ffffff" stroke-width="6" />
  <polygon points="256,96 200,192 256,240 312,192" fill="#ffffff" opacity="0.3" />`;
    canvasGlyphDraw = `
// Draw Diamond
ctx.fillStyle = coreGrad;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(256, 96);
ctx.lineTo(392, 192);
ctx.lineTo(256, 416);
ctx.lineTo(120, 192);
ctx.closePath();
ctx.fill();
ctx.stroke();`;
  } else if (p.includes('flame') || p.includes('fire') || p.includes('burn')) {
    glyphMarkup = `
  <path d="M256 88 C304 168 384 224 384 320 C384 392 328 440 256 440 C184 440 128 392 128 320 C128 248 184 184 256 88 Z" fill="url(#coreGrad)" />
  <path d="M256 248 C280 288 304 320 304 352 C304 384 280 408 256 408 C232 408 208 384 208 352 C208 320 232 288 256 248 Z" fill="#ffffff" opacity="0.95" />`;
    canvasGlyphDraw = `
// Draw Flame
ctx.fillStyle = coreGrad;
ctx.beginPath();
ctx.moveTo(256, 88);
ctx.bezierCurveTo(304, 168, 384, 224, 384, 320);
ctx.bezierCurveTo(384, 392, 328, 440, 256, 440);
ctx.bezierCurveTo(184, 440, 128, 392, 128, 320);
ctx.bezierCurveTo(128, 248, 184, 184, 256, 88);
ctx.fill();`;
  } else if (p.includes('heart') || p.includes('love') || p.includes('health')) {
    glyphMarkup = `
  <path d="M256 416 C160 320 112 264 112 208 C112 152 156 112 212 112 C240 112 256 136 256 136 C256 136 272 112 300 112 C356 112 400 152 400 208 C400 264 352 320 256 416 Z" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="10" stroke-linejoin="round" />`;
    canvasGlyphDraw = `
// Draw Heart
ctx.fillStyle = coreGrad;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(256, 416);
ctx.bezierCurveTo(160, 320, 112, 264, 112, 208);
ctx.bezierCurveTo(112, 152, 156, 112, 212, 112);
ctx.bezierCurveTo(240, 112, 256, 136, 256, 136);
ctx.bezierCurveTo(256, 136, 272, 112, 300, 112);
ctx.bezierCurveTo(356, 112, 400, 152, 400, 208);
ctx.bezierCurveTo(400, 264, 352, 320, 256, 416);
ctx.closePath();
ctx.fill();
ctx.stroke();`;
  } else if (p.includes('cloud') || p.includes('saas') || p.includes('server')) {
    glyphMarkup = `
  <path d="M168 344 H344 C380 344 408 316 408 280 C408 246 384 218 352 216 C344 168 304 136 256 136 C214 136 178 160 164 200 C132 204 108 232 108 264 C108 300 136 344 168 344 Z" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="10" stroke-linejoin="round" />
  <path d="M264 224 L224 296 H268 L248 352 L296 280 H252 Z" fill="#ffffff" />`;
    canvasGlyphDraw = `
// Draw Cloud
ctx.fillStyle = coreGrad;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 10;
ctx.beginPath();
ctx.arc(200, 272, 64, 0, Math.PI * 2);
ctx.arc(256, 208, 72, 0, Math.PI * 2);
ctx.arc(336, 272, 64, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();`;
  } else {
    // Default: Sleek Futuristic Monogram / Starburst Emblem
    glyphMarkup = `
  <circle cx="256" cy="256" r="160" fill="none" stroke="url(#coreGrad)" stroke-width="16" />
  <polygon points="256,128 344,216 344,304 256,384 168,304 168,216" fill="url(#coreGrad)" />
  <circle cx="256" cy="256" r="48" fill="#ffffff" />
  <circle cx="256" cy="256" r="24" fill="${c1}" />`;
    canvasGlyphDraw = `
// Draw Futuristic Geometric Emblem
ctx.strokeStyle = coreGrad;
ctx.lineWidth = 16;
ctx.beginPath();
ctx.arc(256, 256, 160, 0, Math.PI * 2);
ctx.stroke();

ctx.fillStyle = coreGrad;
ctx.beginPath();
ctx.arc(256, 256, 96, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.arc(256, 256, 48, 0, Math.PI * 2);
ctx.fill();`;
  }

  // 4. Construct according to targetType
  if (targetType === 'svg') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgDark}" />
      <stop offset="100%" stop-color="${bgDarker}" />
    </linearGradient>
    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
  </defs>
  ${bgShapeMarkup}
  ${glyphMarkup}
</svg>`.trim();
  }

  if (targetType === 'html-css') {
    return `<div class="asset-container">
  <div class="glass-card">
    <div class="glow-orb"></div>
    <div class="inner-badge">
      <div class="symbol">✨</div>
    </div>
  </div>
</div>

<style>
.asset-container {
  width: 512px;
  height: 512px;
  background: radial-gradient(circle at center, ${bgDark} 0%, ${bgDarker} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
}
.glass-card {
  width: 380px;
  height: 380px;
  border-radius: 96px;
  background: rgba(255, 255, 255, 0.04);
  border: 3px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), inset 0 0 40px ${c1}33;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.glow-orb {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${c1}, ${c2}, ${accent});
  filter: blur(28px);
  opacity: 0.65;
}
.inner-badge {
  position: relative;
  z-index: 2;
  width: 140px;
  height: 140px;
  border-radius: 40px;
  background: linear-gradient(135deg, ${c1}, ${c2});
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
}
.symbol {
  font-size: 64px;
  color: #ffffff;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
}
</style>`.trim();
  }

  // targetType === 'canvas-js'
  return `// In-Browser Creative Canvas Graphic
const cx = 256;
const cy = 256;

// Background
const bgGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 320);
bgGrad.addColorStop(0, '${bgDark}');
bgGrad.addColorStop(1, '${bgDarker}');
ctx.fillStyle = bgGrad;
ctx.beginPath();
ctx.roundRect(0, 0, 512, 512, 140);
ctx.fill();

// Glow Ring
ctx.strokeStyle = '${c1}44';
ctx.lineWidth = 6;
ctx.beginPath();
ctx.arc(cx, cy, 210, 0, Math.PI * 2);
ctx.stroke();

// Core Gradient
const coreGrad = ctx.createLinearGradient(100, 100, 412, 412);
coreGrad.addColorStop(0, '${c1}');
coreGrad.addColorStop(1, '${c2}');

${canvasGlyphDraw}`.trim();
}

/**
 * Executes a generation request to the Google Gemini API (or In-Browser AI Synthesizer if no key)
 */
export async function generateAssetWithGemini(
  prompt: string,
  targetType: AssetTargetType = 'svg',
  options?: {
    apiKey?: string;
    model?: GeminiModel;
  }
): Promise<{ code: string; rawResponse: string; isProcedural?: boolean }> {
  const apiKey = (options?.apiKey || getStoredApiKey()).trim();

  // ZERO-KEY MODE: If user has not provided an API key, synthesize immediately without error
  if (!apiKey) {
    const synthesized = generateProceduralAsset(prompt, targetType);
    return {
      code: synthesized,
      rawResponse: `Synthesized via In-Browser AI Engine (Zero-Key Mode). Target: ${targetType.toUpperCase()}`,
      isProcedural: true,
    };
  }

  const rawModel = options?.model || getStoredModel();
  let model = rawModel.replace(/^models\//, '').trim() || 'gemini-3.6-flash';
  if (model === 'gemini-2.0-flash' || model === 'gemini-2.5-flash') {
    model = 'gemini-3.6-flash';
  }
  const systemInstruction = getSystemInstruction(targetType);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${prompt}\n\nPlease output only clean code for target: ${targetType.toUpperCase()}.`,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [
        {
          text: systemInstruction,
        },
      ],
    },
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 4096,
    },
  };

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (networkErr: any) {
    throw new Error(
      `Network Error: Failed to reach Google Gemini API. Please check your internet connection or ensure ad-blockers/privacy extensions are not blocking requests to googleapis.com (${networkErr?.message || 'Failed to fetch'}).`
    );
  }

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson?.error?.message || response.statusText;
    } catch {
      errorDetail = response.statusText;
    }

    if (response.status === 400 && (errorDetail.includes('API_KEY_INVALID') || errorDetail.includes('API key not valid'))) {
      throw new Error(
        'Invalid API Key (400): The provided Gemini API Key is not valid. Please visit https://aistudio.google.com/app/apikey, create a key (starts with "AIzaSy..."), and paste it in the key settings.'
      );
    }

    if (response.status === 404) {
      if (errorDetail.includes('gemini-3.6-flash') || model.includes('2.5') || model.includes('2.0')) {
        console.info('Google API recommended upgrading to gemini-3.6-flash, auto-resolving...');
        setStoredModel('gemini-3.6-flash');
        return generateAssetWithGemini(prompt, targetType, { apiKey, model: 'gemini-3.6-flash' });
      }
      throw new Error(
        `Model Not Found (404): ${errorDetail || `The selected model "${model}" was not recognized.`} We recommend using "gemini-3.6-flash".`
      );
    }

    if (response.status === 429) {
      throw new Error(
        'Rate Limit Exceeded (429): Google Gemini free tier quota limit reached (max 15 requests/min). Please wait 30 seconds and try again.'
      );
    }

    if (response.status === 403) {
      throw new Error(
        `Permission / Region Error (403): ${errorDetail}. Note: Google Gemini API may have geographic restrictions or require enabling in your Google Cloud console.`
      );
    }

    throw new Error(`Gemini API Error (${response.status}): ${errorDetail}`);
  }

  const result = await response.json();
  const candidate = result?.candidates?.[0];
  const rawText = candidate?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Gemini API returned an empty response. Please try adjusting your prompt.');
  }

  const extracted = extractCodeBlock(rawText, targetType);
  return {
    code: extracted,
    rawResponse: rawText,
  };
}

/**
 * Built-in ready-to-use demo presets so users can test immediately without an API key
 */
export interface DemoPreset {
  id: string;
  title: string;
  targetType: AssetTargetType;
  prompt: string;
  code: string;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'cyberpunk-shield',
    title: 'Cyberpunk Shield Favicon',
    targetType: 'svg',
    prompt: 'A futuristic cybernetic shield icon with glowing neon cyan and purple accents, high contrast for favicon use',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="cyberBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
    <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#f43f5e" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#cyberBg)" />
  <path d="M256 64 L416 128 V272 C416 368 256 448 256 448 C256 448 96 368 96 272 V128 Z" fill="none" stroke="url(#neonGlow)" stroke-width="24" stroke-linejoin="round" />
  <path d="M256 128 L352 176 V256 C352 320 256 384 256 384 C256 384 160 320 160 256 V176 Z" fill="url(#coreGlow)" opacity="0.85" />
  <circle cx="256" cy="256" r="32" fill="#ffffff" />
  <path d="M256 200 L256 224 M256 288 L256 312 M200 256 L224 256 M288 256 L312 256" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
</svg>`,
  },
  {
    id: 'ai-brain-chip',
    title: 'AI Neural Core',
    targetType: 'svg',
    prompt: 'A luminous AI neural processor chip with glowing neon circuits and a central synthetic crystal',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="chipBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
    <linearGradient id="brainGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="50%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="140" fill="url(#chipBg)"/>
  <rect x="120" y="120" width="272" height="272" rx="40" fill="#1e1b4b" stroke="url(#brainGlow)" stroke-width="12"/>
  <path d="M120 180 H80 M120 256 H70 M120 332 H80 M392 180 H432 M392 256 H442 M392 332 H432 M180 120 V80 M256 120 V70 M332 120 V80 M180 392 V432 M256 392 V442 M332 392 V432" stroke="#60a5fa" stroke-width="10" stroke-linecap="round"/>
  <polygon points="256,160 336,210 336,302 256,352 176,302 176,210" fill="url(#brainGlow)"/>
  <circle cx="256" cy="256" r="28" fill="#ffffff"/>
</svg>`,
  },
  {
    id: 'css-gradient-badge',
    title: 'Modern CSS Glass Badge',
    targetType: 'html-css',
    prompt: 'A modern glassmorphic web badge with gradient border and glowing centered icon',
    code: `<div class="asset-container">
  <div class="glass-card">
    <div class="orb"></div>
    <div class="symbol">⚡</div>
    <div class="brand">NEXUS</div>
  </div>
</div>

<style>
.asset-container {
  width: 512px;
  height: 512px;
  background: radial-gradient(circle at center, #1e1b4b 0%, #030712 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}
.glass-card {
  width: 380px;
  height: 380px;
  border-radius: 90px;
  background: rgba(255, 255, 255, 0.05);
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(139, 92, 246, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.orb {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899);
  filter: blur(20px);
  opacity: 0.7;
}
.symbol {
  font-size: 110px;
  color: #ffffff;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 2;
}
.brand {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 6px;
  color: #e0e7ff;
  position: relative;
  z-index: 2;
}
</style>`,
  },
  {
    id: 'canvas-cosmic-spiral',
    title: 'Canvas Algorithmic Starburst',
    targetType: 'canvas-js',
    prompt: 'A vibrant geometric starburst emblem drawn mathematically with canvas 2D gradients',
    code: `// Set up background
const cx = 256;
const cy = 256;
const bgGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 280);
bgGrad.addColorStop(0, '#1e1b4b');
bgGrad.addColorStop(1, '#090d16');
ctx.fillStyle = bgGrad;
ctx.beginPath();
ctx.roundRect(0, 0, 512, 512, 140);
ctx.fill();

// Draw radial glowing petals
const numPetals = 16;
for (let i = 0; i < numPetals; i++) {
  const angle = (i * Math.PI * 2) / numPetals;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  
  const petalGrad = ctx.createLinearGradient(0, 0, 180, 0);
  petalGrad.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
  petalGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)');
  petalGrad.addColorStop(1, 'rgba(236, 72, 153, 0.2)');
  
  ctx.fillStyle = petalGrad;
  ctx.beginPath();
  ctx.ellipse(90, 0, 90, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Draw central core
const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
coreGrad.addColorStop(0, '#ffffff');
coreGrad.addColorStop(0.4, '#38bdf8');
coreGrad.addColorStop(1, '#818cf8');

ctx.fillStyle = coreGrad;
ctx.beginPath();
ctx.arc(cx, cy, 64, 0, Math.PI * 2);
ctx.fill();

// Outer ring
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 6;
ctx.beginPath();
ctx.arc(cx, cy, 210, 0, Math.PI * 2);
ctx.stroke();`,
  },
];
