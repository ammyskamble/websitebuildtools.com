/**
 * Client-Side Raster-to-SVG Vectorizer
 * Analyzes bitmap pixels, applies luminance/alpha thresholding, and traces vector polygons/paths.
 */

import { loadImageSource } from './canvas-renderer';

export interface VectorizeOptions {
  threshold: number; // 0 - 255
  invert: boolean;
  color: string;
  backgroundColor: string;
  simplifyTolerance: number; // 1 to 5
  scale: number; // downscale factor for performance, 1 = original (capped at max 800px)
}

export async function vectorizeImage(
  imageSource: string | File | Blob,
  options: Partial<VectorizeOptions> = {}
): Promise<string> {
  const {
    threshold = 128,
    invert = false,
    color = '#1e293b',
    backgroundColor = 'transparent',
    simplifyTolerance = 2,
  } = options;

  const img = await loadImageSource(imageSource);

  // Determine working size (cap at 600px max dimension for fast client-side tracing)
  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;
  const maxDim = 500;
  if (w > maxDim || h > maxDim) {
    const ratio = Math.min(maxDim / w, maxDim / h);
    w = Math.round(w * ratio);
    h = Math.round(h * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Cannot get canvas context');

  ctx.drawImage(img, 0, 0, w, h);
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  // Build binary grid
  const grid: boolean[][] = [];
  for (let y = 0; y < h; y++) {
    grid[y] = [];
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a < 50) {
        grid[y][x] = false;
        continue;
      }

      // Standard ITU-R BT.601 luminance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const isForeground = lum < threshold;
      grid[y][x] = invert ? !isForeground : isForeground;
    }
  }

  // Scan horizontal runs to generate clean, optimized path commands
  // This run-length horizontal scan algorithm creates clean, solid SVG polygons
  const step = Math.max(1, Math.min(4, simplifyTolerance));
  let pathD = '';

  for (let y = 0; y < h; y += step) {
    let runStart = -1;
    for (let x = 0; x < w; x += step) {
      const active = grid[y] && grid[y][x];
      if (active && runStart === -1) {
        runStart = x;
      } else if (!active && runStart !== -1) {
        const runEnd = x;
        pathD += `M${runStart},${y}H${runEnd}V${y + step}H${runStart}Z `;
        runStart = -1;
      }
    }
    if (runStart !== -1) {
      pathD += `M${runStart},${y}H${w}V${y + step}H${runStart}Z `;
    }
  }

  const bgRect =
    backgroundColor && backgroundColor !== 'transparent'
      ? `<rect width="${w}" height="${h}" fill="${backgroundColor}" />`
      : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  ${bgRect}
  <path d="${pathD.trim()}" fill="${color}" fill-rule="evenodd" />
</svg>`;
}
