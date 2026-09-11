/**
 * Canvas & SVG High-DPI Rendering Utilities
 * Handles SVG markup, Data URLs, raster images, and Blob conversion with high resilience.
 */

export interface RenderOptions {
  width: number;
  height: number;
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number; // 0.1 to 1.0 for jpeg/webp
  backgroundColor?: string; // transparent if not set
}

/**
 * Loads an SVG string, Data URI, or Image source into an HTMLImageElement safely
 */
export function loadSvgOrImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Case 1: Already a Data URL or external URL (PNG, JPG, WebP, SVG Data URL)
    if (
      source.startsWith('data:image/') ||
      source.startsWith('blob:') ||
      source.startsWith('http://') ||
      source.startsWith('https://')
    ) {
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(new Error('Failed to load image from Data URL: ' + err));
      img.src = source;
      return;
    }

    // Case 2: Raw SVG string markup (<svg ...)
    let svgMarkup = source.trim();
    if (!svgMarkup.includes('xmlns=')) {
      svgMarkup = svgMarkup.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // If SVG has no width/height, infer from viewBox or inject fallback
    if (!svgMarkup.includes('width=') || !svgMarkup.includes('height=')) {
      const vbMatch = svgMarkup.match(/viewBox=["']([0-9.\s-]+)["']/);
      if (vbMatch) {
        const parts = vbMatch[1].trim().split(/\s+/);
        if (parts.length === 4) {
          const w = parseFloat(parts[2]);
          const h = parseFloat(parts[3]);
          if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
            svgMarkup = svgMarkup.replace('<svg', `<svg width="${w}" height="${h}"`);
          }
        }
      } else {
        svgMarkup = svgMarkup.replace('<svg', '<svg width="512" height="512"');
      }
    }

    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to parse SVG into image element: ' + err));
    };

    img.src = url;
  });
}

/**
 * Backward-compatible alias for loadSvgOrImage
 */
export const loadSvgImage = loadSvgOrImage;

/**
 * Loads any Image source (File, Data URL, Object URL, SVG string) into an HTMLImageElement
 */
export function loadImageSource(src: string | File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (typeof src === 'string') {
      loadSvgOrImage(src).then(resolve).catch(reject);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(src);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    img.src = objectUrl;
  });
}

/**
 * Renders an SVG string OR raster image to a canvas at target resolution and returns a Blob
 */
export async function renderSvgToBlob(
  source: string,
  options: RenderOptions
): Promise<Blob> {
  const { width, height, format = 'png', quality = 0.95, backgroundColor } = options;

  const img = await loadSvgOrImage(source);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Apply background if provided or if format is JPEG (which doesn't support alpha)
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  } else if (format === 'jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  // Draw image scaled to target dimensions
  ctx.drawImage(img, 0, 0, width, height);

  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob returned null'));
      },
      mimeType,
      quality
    );
  });
}

/**
 * Trigger browser file download from Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Trigger download from text/code content
 */
export function downloadText(content: string, filename: string, mimeType = 'image/svg+xml'): void {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(blob, filename);
}
