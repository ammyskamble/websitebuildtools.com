/**
 * Client-Side Raster-to-SVG Vectorizer
 * Analyzes bitmap pixels, applies luminance/alpha thresholding, and traces vector contours.
 * Supports Marching Squares with Bezier smoothing (Cricut/Laser ready) and High-Fidelity Silhouette.
 */

import { loadImageSource } from './canvas-renderer';

export type VectorizeTraceMode = 'smooth' | 'detailed' | 'cricut';

export interface VectorizeOptions {
  threshold: number; // 0 - 255
  invert: boolean;
  color: string;
  backgroundColor: string;
  simplifyTolerance: number; // 1 to 5
  traceMode: VectorizeTraceMode;
  maxDimension?: number;
}

export interface VectorizeResult {
  svg: string;
  width: number;
  height: number;
  pathCount: number;
  nodeCount: number;
  originalWidth: number;
  originalHeight: number;
}

interface Point {
  x: number;
  y: number;
}

/**
 * Douglas-Peucker point reduction algorithm
 */
function simplifyPoints(points: Point[], tolerance: number): Point[] {
  if (points.length <= 2) return points;

  let maxDist = 0;
  let index = 0;
  const end = points.length - 1;

  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(points[i], points[0], points[end]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }

  if (maxDist > tolerance) {
    const left = simplifyPoints(points.slice(0, index + 1), tolerance);
    const right = simplifyPoints(points.slice(index), tolerance);
    return left.slice(0, -1).concat(right);
  }

  return [points[0], points[end]];
}

function perpendicularDistance(pt: Point, lineStart: Point, lineEnd: Point): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const mag = Math.sqrt(dx * dx + dy * dy);
  if (mag === 0) {
    return Math.hypot(pt.x - lineStart.x, pt.y - lineStart.y);
  }
  const u = ((pt.x - lineStart.x) * dx + (pt.y - lineStart.y) * dy) / (mag * mag);
  const clampedU = Math.max(0, Math.min(1, u));
  const projX = lineStart.x + clampedU * dx;
  const projY = lineStart.y + clampedU * dy;
  return Math.hypot(pt.x - projX, pt.y - projY);
}

/**
 * Converts a polygon loop of points into a smooth SVG path with quadratic beziers
 */
function pointsToSmoothPath(points: Point[]): string {
  if (points.length < 3) return '';
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    d += ` Q ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}, ${xc.toFixed(1)} ${yc.toFixed(1)}`;
  }
  d += ` Q ${points[points.length - 1].x.toFixed(1)} ${points[points.length - 1].y.toFixed(1)}, ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} Z`;
  return d;
}

/**
 * Traces binary grid contours into smoothed vector loops
 */
function traceContours(grid: boolean[][], w: number, h: number, tolerance: number): { pathD: string; nodeCount: number; loopCount: number } {
  const visited = Array.from({ length: h }, () => new Uint8Array(w));
  const loops: Point[][] = [];
  let totalNodes = 0;

  // Directions for Moore-Neighbor contour tracing: E, SE, S, SW, W, NW, N, NE
  const dx = [1, 1, 0, -1, -1, -1, 0, 1];
  const dy = [0, 1, 1, 1, 0, -1, -1, -1];

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      if (grid[y][x] && !visited[y][x] && (!grid[y][x - 1] || !grid[y - 1][x])) {
        // Start of new contour
        const loop: Point[] = [];
        let cx = x;
        let cy = y;
        let dir = 0;
        let count = 0;

        while (count < 5000) {
          visited[cy][cx] = 1;
          loop.push({ x: cx, y: cy });

          // Search next clockwise neighbor
          let found = false;
          const startDir = (dir + 5) % 8; // Backtrack slightly
          for (let i = 0; i < 8; i++) {
            const nd = (startDir + i) % 8;
            const nx = cx + dx[nd];
            const ny = cy + dy[nd];
            if (nx >= 0 && nx < w && ny >= 0 && ny < h && grid[ny][nx]) {
              cx = nx;
              cy = ny;
              dir = nd;
              found = true;
              break;
            }
          }

          if (!found || (cx === x && cy === y)) {
            break;
          }
          count++;
        }

        if (loop.length >= 4) {
          const simplified = simplifyPoints(loop, Math.max(1, tolerance * 0.8));
          if (simplified.length >= 3) {
            loops.push(simplified);
            totalNodes += simplified.length;
          }
        }
      }
    }
  }

  let pathD = '';
  for (const loop of loops) {
    pathD += `${pointsToSmoothPath(loop)} `;
  }

  return { pathD: pathD.trim(), nodeCount: totalNodes, loopCount: loops.length };
}

/**
 * Traces run-length spans (High-density raster geometry)
 */
function traceRunLengths(grid: boolean[][], w: number, h: number, step: number): { pathD: string; nodeCount: number; loopCount: number } {
  let pathD = '';
  let count = 0;

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
        count++;
      }
    }
    if (runStart !== -1) {
      pathD += `M${runStart},${y}H${w}V${y + step}H${runStart}Z `;
      count++;
    }
  }

  return { pathD: pathD.trim(), nodeCount: count * 4, loopCount: count };
}

/**
 * Primary Vectorization function with complete metadata
 */
export async function vectorizeImageWithStats(
  imageSource: string | File | Blob,
  options: Partial<VectorizeOptions> = {}
): Promise<VectorizeResult> {
  const {
    threshold = 128,
    invert = false,
    color = '#1e293b',
    backgroundColor = 'transparent',
    simplifyTolerance = 2,
    traceMode = 'cricut',
    maxDimension = 500,
  } = options;

  const img = await loadImageSource(imageSource);
  const origW = img.naturalWidth || img.width || 500;
  const origH = img.naturalHeight || img.height || 500;

  let w = origW;
  let h = origH;
  if (w > maxDimension || h > maxDimension) {
    const ratio = Math.min(maxDimension / w, maxDimension / h);
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

  let traceOutput: { pathD: string; nodeCount: number; loopCount: number };

  if (traceMode === 'cricut' || traceMode === 'smooth') {
    traceOutput = traceContours(grid, w, h, simplifyTolerance);
    // If contour tracing produced no closed loops (e.g. dense noise), fallback cleanly to run-lengths
    if (!traceOutput.pathD) {
      traceOutput = traceRunLengths(grid, w, h, Math.max(1, Math.min(4, simplifyTolerance)));
    }
  } else {
    traceOutput = traceRunLengths(grid, w, h, Math.max(1, Math.min(4, simplifyTolerance)));
  }

  const bgRect =
    backgroundColor && backgroundColor !== 'transparent'
      ? `  <rect width="${w}" height="${h}" fill="${backgroundColor}" />\n`
      : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
${bgRect}  <path d="${traceOutput.pathD}" fill="${color}" fill-rule="evenodd" />
</svg>`;

  return {
    svg,
    width: w,
    height: h,
    pathCount: traceOutput.loopCount,
    nodeCount: traceOutput.nodeCount,
    originalWidth: origW,
    originalHeight: origH,
  };
}

/**
 * Backward-compatible vectorizeImage function
 */
export async function vectorizeImage(
  imageSource: string | File | Blob,
  options: Partial<VectorizeOptions> = {}
): Promise<string> {
  const res = await vectorizeImageWithStats(imageSource, options);
  return res.svg;
}
