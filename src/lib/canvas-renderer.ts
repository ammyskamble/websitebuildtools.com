/**
 * Canvas & SVG High-DPI Rendering Utilities
 */

export interface RenderOptions {
  width: number;
  height: number;
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number; // 0.1 to 1.0 for jpeg/webp
  backgroundColor?: string; // transparent if not set
}

/**
 * Loads an SVG string into an HTMLImageElement
 */
export function loadSvgImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Use Blob URL to ensure all characters and inline styles load accurately
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG into image: ' + err));
    };

    img.src = url;
  });
}

/**
 * Loads any Image source (File, Data URL, Object URL) into an HTMLImageElement
 */
export function loadImageSource(src: string | File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let objectUrl = '';

    if (typeof src === 'string') {
      img.src = src;
    } else {
      objectUrl = URL.createObjectURL(src);
      img.src = objectUrl;
    }

    img.onload = () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      resolve(img);
    };

    img.onerror = (err) => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      reject(err);
    };
  });
}

/**
 * Renders an SVG string to a canvas at a target resolution and returns a Blob
 */
export async function renderSvgToBlob(
  svgString: string,
  options: RenderOptions
): Promise<Blob> {
  const { width, height, format = 'png', quality = 0.95, backgroundColor } = options;

  const img = await loadSvgImage(svgString);

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

  // Draw image at full target resolution
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
