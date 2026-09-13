/**
 * Universal Code Importer & Rasterizer Engine
 * Processes SVG, HTML + CSS, and JavaScript/Java Canvas code,
 * renders into crisp graphics, and converts to SVG, PNG, and Favicon (.ico).
 */

import { createIcoFromPngs, IcoImageSource } from './ico-encoder';

export type AssetTargetType = 'svg' | 'png' | 'canvas' | 'html' | 'css' | 'favicon' | 'webp' | 'jpeg' | 'astro';

export interface CodeRenderResult {
  canvas: HTMLCanvasElement;
  dataUrl: string;
  svgMarkup: string;
}

/**
 * Automatically detects whether raw code is SVG, HTML+CSS, or Canvas JavaScript
 */
export function detectCodeType(rawCode: string): AssetTargetType {
  const code = rawCode.trim();
  if (code.includes('<svg') || (code.startsWith('<?xml') && code.includes('svg'))) {
    return 'svg';
  }
  if (
    code.includes('<div') ||
    code.includes('<style') ||
    code.includes('<span') ||
    code.includes('class=') ||
    code.includes('<!DOCTYPE') ||
    code.includes('<html')
  ) {
    return 'html-css';
  }
  if (
    code.includes('ctx.') ||
    code.includes('beginPath') ||
    code.includes('fillRect') ||
    code.includes('arc(') ||
    code.includes('createLinearGradient') ||
    code.includes('CanvasRenderingContext2D') ||
    code.includes('Math.PI')
  ) {
    return 'canvas-js';
  }
  return 'svg';
}

/**
 * Normalizes SVG markup to ensure standard xmlns and dimensions
 */
export function normalizeSvgMarkup(rawSvg: string): string {
  let markup = rawSvg.trim();

  // Strip XML prolog or doctype if present
  markup = markup.replace(/<\?xml[\s\S]*?\?>/i, '').replace(/<!DOCTYPE[\s\S]*?>/i, '').trim();

  // Extract pure <svg ... </svg>
  const svgStart = markup.indexOf('<svg');
  const svgEnd = markup.lastIndexOf('</svg>');
  if (svgStart !== -1 && svgEnd !== -1) {
    markup = markup.substring(svgStart, svgEnd + 6);
  }

  if (!markup.includes('xmlns=')) {
    markup = markup.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  if (!markup.includes('viewBox=')) {
    // If width and height exist, create viewBox
    const wMatch = markup.match(/width=["']([0-9.]+)["']/);
    const hMatch = markup.match(/height=["']([0-9.]+)["']/);
    if (wMatch && hMatch) {
      markup = markup.replace('<svg', `<svg viewBox="0 0 ${wMatch[1]} ${hMatch[1]}"`);
    } else {
      markup = markup.replace('<svg', '<svg viewBox="0 0 512 512"');
    }
  }

  if (!markup.includes('width=')) {
    markup = markup.replace('<svg', '<svg width="512"');
  }
  if (!markup.includes('height=')) {
    markup = markup.replace('<svg', '<svg height="512"');
  }

  return markup;
}

/**
 * Wraps HTML + CSS code into an SVG ForeignObject document for vector representation and canvas rendering
 */
export function wrapHtmlCssToSvg(htmlCss: string, width = 512, height = 512): string {
  // Separate style and body elements if mixed
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; margin: 0; padding: 0; box-sizing: border-box;">
      ${htmlCss}
    </div>
  </foreignObject>
</svg>`;
}

/**
 * Executes Canvas-JS code in an isolated 2D context
 */
export function executeCanvasCode(
  jsCode: string,
  targetCanvas: HTMLCanvasElement,
  size = 512
): void {
  targetCanvas.width = size;
  targetCanvas.height = size;
  const ctx = targetCanvas.getContext('2d');
  if (!ctx) throw new Error('Could not obtain 2D canvas context');

  ctx.clearRect(0, 0, size, size);

  // Scale context if rendering at resolution other than base 512
  ctx.save();
  if (size !== 512) {
    const scale = size / 512;
    ctx.scale(scale, scale);
  }

  try {
    // Execute script safely with ctx injected
    const runner = new Function('ctx', 'canvas', 'width', 'height', jsCode);
    runner(ctx, targetCanvas, 512, 512);
  } catch (err: any) {
    ctx.restore();
    throw new Error(`JavaScript Canvas execution error: ${err?.message || err}`);
  }

  ctx.restore();
}

/**
 * Master rendering engine: renders any code type (SVG, HTML/CSS, Canvas-JS) onto an HTML5 Canvas
 */
export async function renderCodeToCanvas(
  type: AssetTargetType,
  code: string,
  size = 512
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context');

  if (type === 'canvas-js') {
    executeCanvasCode(code, canvas, size);
    return canvas;
  }

  let svgMarkup = '';
  if (type === 'svg') {
    svgMarkup = normalizeSvgMarkup(code);
  } else if (type === 'html-css') {
    svgMarkup = wrapHtmlCssToSvg(code, size, size);
  }

  // Render SVG onto Canvas using an Image object
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(new Error('Failed to rasterize markup onto canvas: ' + err));
      image.src = url;
    });

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Exports code as a vector SVG string
 */
export async function exportCodeToSvg(type: AssetTargetType, code: string): Promise<string> {
  if (type === 'svg') {
    return normalizeSvgMarkup(code);
  }

  if (type === 'html-css') {
    return wrapHtmlCssToSvg(code, 512, 512);
  }

  // For canvas-js, render to canvas at 1024px and wrap as high-res embedded vector SVG image
  const canvas = await renderCodeToCanvas('canvas-js', code, 1024);
  const dataUrl = canvas.toDataURL('image/png');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <image href="${dataUrl}" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
</svg>`;
}

/**
 * Exports code directly as a PNG Blob at a specified dimension
 */
export async function exportCodeToPngBlob(
  type: AssetTargetType,
  code: string,
  size: number,
  backgroundColor?: string
): Promise<Blob> {
  const renderedCanvas = await renderCodeToCanvas(type, code, size);

  if (backgroundColor && backgroundColor !== 'transparent') {
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = size;
    bgCanvas.height = size;
    const bgCtx = bgCanvas.getContext('2d');
    if (bgCtx) {
      bgCtx.fillStyle = backgroundColor;
      bgCtx.fillRect(0, 0, size, size);
      bgCtx.drawImage(renderedCanvas, 0, 0);
      return new Promise<Blob>((resolve, reject) => {
        bgCanvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to encode PNG Blob'));
        }, 'image/png');
      });
    }
  }

  return new Promise<Blob>((resolve, reject) => {
    renderedCanvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to encode PNG Blob'));
    }, 'image/png');
  });
}

/**
 * Generates a multi-resolution Windows Favicon (.ico) containing 16x16, 32x32, and 48x48 PNG frames
 */
export async function exportCodeToIcoBlob(type: AssetTargetType, code: string): Promise<Blob> {
  const sizes = [16, 32, 48];
  const sources: IcoImageSource[] = [];

  for (const size of sizes) {
    const pngBlob = await exportCodeToPngBlob(type, code, size);
    sources.push({ pngBlob, size });
  }

  return await createIcoFromPngs(sources);
}

/**
 * Triggers file download in browser
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Triggers text file download
 */
export function downloadText(text: string, filename: string, mimeType = 'text/plain'): void {
  const blob = new Blob([text], { type: `${mimeType};charset=utf-8` });
  downloadFile(blob, filename);
}
