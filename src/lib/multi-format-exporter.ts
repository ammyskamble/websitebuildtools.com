/**
 * Instant Multi-Format Exporter Engine
 * Provides instant 1-click client-side export to SVG, PNG (1x-8x up to 4096px),
 * WebP, JPEG, Windows .ICO, .astro component, and CSS/HTML Data URIs.
 */

import confetti from 'canvas-confetti';
import { renderSvgToBlob, downloadBlob, downloadText } from './canvas-renderer';
import { createIcoFromPngs } from './ico-encoder';
import { convertSvgToAstroComponent, downloadAstroFile, toPascalCase } from './astro-generator';

export type ExportTargetFormat =
  | 'svg'
  | 'png-512'
  | 'png-1024'
  | 'png-2048'
  | 'png-4096'
  | 'webp-1024'
  | 'jpeg-1024'
  | 'ico'
  | 'apple-touch-icon'
  | 'astro'
  | 'data-uri-css'
  | 'data-uri-base64'
  | 'data-uri-html';

export interface MultiFormatExportOptions {
  baseFilename?: string;
  backgroundColor?: string;
  transparent?: boolean;
  jpegQuality?: number;
  webpQuality?: number;
  triggerConfetti?: boolean;
}

/**
 * Triggers an instant download or clipboard copy for the specified format
 */
export async function exportAssetAs(
  svgOrImageSource: string,
  targetFormat: ExportTargetFormat,
  options: MultiFormatExportOptions = {}
): Promise<{ success: boolean; message: string; copiedText?: string }> {
  const {
    baseFilename = 'vectorforge-asset',
    backgroundColor,
    transparent = true,
    jpegQuality = 0.95,
    webpQuality = 0.95,
    triggerConfetti = true,
  } = options;

  const sanitizedBase = baseFilename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_') || 'asset';

  try {
    // 1. Clean Vector SVG
    if (targetFormat === 'svg') {
      if (svgOrImageSource.trim().startsWith('<svg') || svgOrImageSource.includes('<svg')) {
        downloadText(svgOrImageSource, `${sanitizedBase}.svg`, 'image/svg+xml');
      } else {
        // Wrapped in SVG container
        const wrappedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="${svgOrImageSource}" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
</svg>`;
        downloadText(wrappedSvg, `${sanitizedBase}.svg`, 'image/svg+xml');
      }
      if (triggerConfetti) celebrate();
      return { success: true, message: `Downloaded ${sanitizedBase}.svg` };
    }

    // 2. High-DPI PNGs
    if (targetFormat.startsWith('png-')) {
      const size = parseInt(targetFormat.replace('png-', ''), 10) || 1024;
      const blob = await renderSvgToBlob(svgOrImageSource, {
        width: size,
        height: size,
        format: 'png',
        backgroundColor: transparent ? undefined : backgroundColor || '#ffffff',
      });
      downloadBlob(blob, `${sanitizedBase}-${size}px.png`);
      if (triggerConfetti) celebrate();
      return { success: true, message: `Downloaded ${sanitizedBase}-${size}px.png` };
    }

    // 3. Apple Touch Icon (180x180)
    if (targetFormat === 'apple-touch-icon') {
      const blob = await renderSvgToBlob(svgOrImageSource, {
        width: 180,
        height: 180,
        format: 'png',
        backgroundColor: backgroundColor || '#ffffff',
      });
      downloadBlob(blob, 'apple-touch-icon.png');
      if (triggerConfetti) celebrate();
      return { success: true, message: 'Downloaded apple-touch-icon.png (180x180)' };
    }

    // 4. Modern WebP
    if (targetFormat === 'webp-1024') {
      const blob = await renderSvgToBlob(svgOrImageSource, {
        width: 1024,
        height: 1024,
        format: 'webp',
        quality: webpQuality,
        backgroundColor: transparent ? undefined : backgroundColor,
      });
      downloadBlob(blob, `${sanitizedBase}-1024px.webp`);
      if (triggerConfetti) celebrate();
      return { success: true, message: `Downloaded ${sanitizedBase}-1024px.webp` };
    }

    // 5. Compressed JPEG
    if (targetFormat === 'jpeg-1024') {
      const blob = await renderSvgToBlob(svgOrImageSource, {
        width: 1024,
        height: 1024,
        format: 'jpeg',
        quality: jpegQuality,
        backgroundColor: backgroundColor || '#ffffff',
      });
      downloadBlob(blob, `${sanitizedBase}-1024px.jpg`);
      if (triggerConfetti) celebrate();
      return { success: true, message: `Downloaded ${sanitizedBase}-1024px.jpg` };
    }

    // 6. Windows Multi-Frame Favicon .ICO
    if (targetFormat === 'ico') {
      const [blob16, blob32, blob48] = await Promise.all([
        renderSvgToBlob(svgOrImageSource, { width: 16, height: 16 }),
        renderSvgToBlob(svgOrImageSource, { width: 32, height: 32 }),
        renderSvgToBlob(svgOrImageSource, { width: 48, height: 48 }),
      ]);
      const icoBlob = await createIcoFromPngs([
        { pngBlob: blob16, size: 16 },
        { pngBlob: blob32, size: 32 },
        { pngBlob: blob48, size: 48 },
      ]);
      downloadBlob(icoBlob, `${sanitizedBase}.ico`);
      if (triggerConfetti) celebrate();
      return { success: true, message: `Downloaded ${sanitizedBase}.ico (16/32/48px)` };
    }

    // 7. Astro Framework Component (.astro)
    if (targetFormat === 'astro') {
      const compName = toPascalCase(sanitizedBase || 'VectorIcon');
      let svgContent = svgOrImageSource;
      if (!svgContent.includes('<svg')) {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="${svgOrImageSource}" width="512" height="512" />
</svg>`;
      }
      downloadAstroFile(svgContent, `${compName}.astro`);
      if (triggerConfetti) celebrate();
      return { success: true, message: `Downloaded ${compName}.astro` };
    }

    // 8. Data URIs (CSS background-image, Base64, HTML img)
    if (targetFormat === 'data-uri-css' || targetFormat === 'data-uri-base64' || targetFormat === 'data-uri-html') {
      let dataUri = '';
      if (svgOrImageSource.startsWith('data:image/')) {
        dataUri = svgOrImageSource;
      } else {
        const encoded = btoa(unescape(encodeURIComponent(svgOrImageSource)));
        dataUri = `data:image/svg+xml;base64,${encoded}`;
      }

      let textToCopy = dataUri;
      if (targetFormat === 'data-uri-css') {
        textToCopy = `background-image: url("${dataUri}");`;
      } else if (targetFormat === 'data-uri-html') {
        textToCopy = `<img src="${dataUri}" alt="${sanitizedBase}" width="512" height="512" />`;
      }

      await navigator.clipboard.writeText(textToCopy);
      return {
        success: true,
        message: 'Copied to clipboard!',
        copiedText: textToCopy,
      };
    }

    return { success: false, message: 'Unsupported export format' };
  } catch (err: any) {
    console.error('Error during multi-format export:', err);
    return { success: false, message: err?.message || 'Export failed' };
  }
}

function celebrate() {
  confetti({
    particleCount: 45,
    spread: 60,
    origin: { y: 0.8 },
  });
}
