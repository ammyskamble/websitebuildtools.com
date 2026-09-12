import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { renderSvgToBlob, downloadBlob, downloadText } from './canvas-renderer';
import { createIcoFromPngs } from './ico-encoder';

export interface FaviconPackOptions {
  appName?: string;
  shortName?: string;
  themeColor?: string;
  backgroundColor?: string;
  baseFilename?: string;
}

export interface CompleteAssetPackOptions extends FaviconPackOptions {
  includeHighResPngs?: boolean;
}

/**
 * Normalizes an SVG string or raster image URL into valid SVG markup
 */
export function normalizeSvgSource(svgOrImageUrl: string): string {
  if (!svgOrImageUrl) return '';
  const trimmed = svgOrImageUrl.trim();
  if (trimmed.startsWith('<svg') || trimmed.includes('<svg')) {
    return trimmed;
  }
  // Wrap raster image Data URL into standard SVG container
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="${trimmed}" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
</svg>`;
}

/**
 * Downloads a single Windows multi-resolution .ICO favicon (16x16, 32x32, 48x48)
 */
export async function downloadSingleFaviconIco(
  svgOrImageUrl: string,
  filename = 'favicon.ico'
): Promise<void> {
  const [blob16, blob32, blob48] = await Promise.all([
    renderSvgToBlob(svgOrImageUrl, { width: 16, height: 16 }),
    renderSvgToBlob(svgOrImageUrl, { width: 32, height: 32 }),
    renderSvgToBlob(svgOrImageUrl, { width: 48, height: 48 }),
  ]);

  const icoBlob = await createIcoFromPngs([
    { pngBlob: blob16, size: 16 },
    { pngBlob: blob32, size: 32 },
    { pngBlob: blob48, size: 48 },
  ]);

  downloadBlob(icoBlob, filename.endsWith('.ico') ? filename : `${filename}.ico`);
}

/**
 * Downloads a single SVG vector file
 */
export function downloadSingleSvg(
  svgContent: string,
  filename = 'vector.svg'
): void {
  const safeSvg = normalizeSvgSource(svgContent);
  const outFilename = filename.endsWith('.svg') ? filename : `${filename}.svg`;
  downloadText(safeSvg, outFilename, 'image/svg+xml;charset=utf-8');
}

/**
 * Generates the standard production favicon package ZIP
 */
export async function generateFaviconPack(
  svgContent: string,
  options: FaviconPackOptions = {}
): Promise<void> {
  const {
    appName = 'My Web Application',
    shortName = 'App',
    themeColor = '#3b82f6',
    backgroundColor = '#ffffff',
    baseFilename = 'favicon-pack',
  } = options;

  const zip = new JSZip();

  // 1. Render required raster sizes
  const [blob16, blob32, blob48, blob180, blob192, blob512] = await Promise.all([
    renderSvgToBlob(svgContent, { width: 16, height: 16 }),
    renderSvgToBlob(svgContent, { width: 32, height: 32 }),
    renderSvgToBlob(svgContent, { width: 48, height: 48 }),
    renderSvgToBlob(svgContent, { width: 180, height: 180 }),
    renderSvgToBlob(svgContent, { width: 192, height: 192 }),
    renderSvgToBlob(svgContent, { width: 512, height: 512 }),
  ]);

  // 2. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoBlob = await createIcoFromPngs([
    { pngBlob: blob16, size: 16 },
    { pngBlob: blob32, size: 32 },
    { pngBlob: blob48, size: 48 },
  ]);

  const safeSvg = normalizeSvgSource(svgContent);

  // 3. Add files to ZIP
  zip.file('favicon.ico', icoBlob);
  zip.file('favicon.svg', safeSvg);
  zip.file('favicon-16x16.png', blob16);
  zip.file('favicon-32x32.png', blob32);
  zip.file('apple-touch-icon.png', blob180);
  zip.file('android-chrome-192x192.png', blob192);
  zip.file('android-chrome-512x512.png', blob512);

  // 4. Generate site.webmanifest
  const webmanifest = {
    name: appName,
    short_name: shortName,
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: themeColor,
    background_color: backgroundColor,
    display: 'standalone',
  };
  zip.file('site.webmanifest', JSON.stringify(webmanifest, null, 2));

  // 5. Generate README.txt with HTML head snippet
  const headSnippet = getHtmlHeadSnippet(themeColor);

  const readme = `VectorForge Favicon Pack
========================

How to install:
1. Extract all files into the root directory of your website (e.g. /public or your web root).
2. Insert the following HTML code into the <head> section of all your web pages:

${headSnippet}

Generated with VectorForge (100% Client-Side Production Studio).
`;

  zip.file('README.txt', readme);

  // 6. Generate ZIP and trigger download
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${baseFilename}.zip`);
}

/**
 * Generates the All-In-One Complete Asset Pack ZIP with ALL required files:
 * SVG vector, Windows .ICO, production favicon suite, High-Res 1024px & 2048px PNGs, and web manifest.
 */
export async function generateCompleteAssetPack(
  svgOrImageUrl: string,
  options: CompleteAssetPackOptions = {}
): Promise<void> {
  const {
    appName = 'Production Asset Pack',
    shortName = 'Assets',
    themeColor = '#3b82f6',
    backgroundColor = '#ffffff',
    baseFilename = 'all-required-assets',
  } = options;

  const zip = new JSZip();
  const safeSvg = normalizeSvgSource(svgOrImageUrl);

  // Render all required sizes in parallel
  const [
    blob16,
    blob32,
    blob48,
    blob180,
    blob192,
    blob512,
    blob1024,
    blob2048,
    blobWebp,
  ] = await Promise.all([
    renderSvgToBlob(svgOrImageUrl, { width: 16, height: 16 }),
    renderSvgToBlob(svgOrImageUrl, { width: 32, height: 32 }),
    renderSvgToBlob(svgOrImageUrl, { width: 48, height: 48 }),
    renderSvgToBlob(svgOrImageUrl, { width: 180, height: 180 }),
    renderSvgToBlob(svgOrImageUrl, { width: 192, height: 192 }),
    renderSvgToBlob(svgOrImageUrl, { width: 512, height: 512 }),
    renderSvgToBlob(svgOrImageUrl, { width: 1024, height: 1024 }),
    renderSvgToBlob(svgOrImageUrl, { width: 2048, height: 2048 }),
    renderSvgToBlob(svgOrImageUrl, { width: 1024, height: 1024, format: 'webp' }),
  ]);

  // Generate multi-resolution favicon.ico
  const icoBlob = await createIcoFromPngs([
    { pngBlob: blob16, size: 16 },
    { pngBlob: blob32, size: 32 },
    { pngBlob: blob48, size: 48 },
  ]);

  // Core Vector File
  zip.file(`${baseFilename}.svg`, safeSvg);

  // Windows Favicon
  zip.file('favicon.ico', icoBlob);

  // Web & Mobile Icons
  zip.file('favicon-16x16.png', blob16);
  zip.file('favicon-32x32.png', blob32);
  zip.file('favicon-48x48.png', blob48);
  zip.file('apple-touch-icon.png', blob180);
  zip.file('android-chrome-192x192.png', blob192);
  zip.file('android-chrome-512x512.png', blob512);

  // High-DPI Artwork & WebP
  zip.file(`${baseFilename}-1024px.png`, blob1024);
  zip.file(`${baseFilename}-2048px-print.png`, blob2048);
  zip.file(`${baseFilename}-1024px.webp`, blobWebp);

  // Web Manifest
  const webmanifest = {
    name: appName,
    short_name: shortName,
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: themeColor,
    background_color: backgroundColor,
    display: 'standalone',
  };
  zip.file('site.webmanifest', JSON.stringify(webmanifest, null, 2));

  // Astro Layout Snippet
  const astroSnippet = `---
// Generated by VectorForge Complete Asset Pack
interface Props {
  title?: string;
}
const { title = '${appName}' } = Astro.props;
---
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="${themeColor}" />
  <title>{title}</title>
</head>`;
  zip.file('FaviconHead.astro', astroSnippet);

  // README with HTML head snippet
  const headSnippet = getHtmlHeadSnippet(themeColor);
  const readme = `VectorForge Complete All-In-One Asset Pack
=============================================

This bundle contains all required vector, favicon, app icon, and high-DPI raster assets generated from your single input.

INCLUDED FILES:
1. ${baseFilename}.svg          - Infinite-resolution SVG master vector
2. favicon.ico                   - Windows multi-resolution icon (16x16, 32x32, 48x48)
3. favicon-16x16.png             - Classic browser tab favicon
4. favicon-32x32.png             - Modern standard retina tab favicon
5. favicon-48x48.png             - Desktop shortcut icon
6. apple-touch-icon.png          - iOS home screen icon (180x180)
7. android-chrome-192x192.png    - Android home screen icon
8. android-chrome-512x512.png    - Android splash screen / PWA icon
9. ${baseFilename}-1024px.png    - Ultra HD 1024px transparent PNG
10. ${baseFilename}-2048px-print.png - Print-ready 2048px high-DPI transparent PNG
11. ${baseFilename}-1024px.webp  - Next-gen compressed WebP format
12. site.webmanifest             - Complete PWA web manifest
13. FaviconHead.astro            - Ready-to-import Astro component

HOW TO USE IN HTML:
Add this inside your <head> section:

${headSnippet}

100% Client-Side Production by VectorForge.
`;

  zip.file('README.txt', readme);

  const zipContent = await zip.generateAsync({ type: 'blob' });
  saveAs(zipContent, `${baseFilename}-complete-pack.zip`);
}

export function getHtmlHeadSnippet(themeColor = '#3b82f6'): string {
  return `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="${themeColor}">`;
}

