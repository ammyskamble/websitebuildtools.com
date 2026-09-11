/**
 * Client-side SVG Optimizer & Code Minifier
 */

export interface OptimizeOptions {
  removeComments?: boolean;
  removeMetadata?: boolean;
  removeDoctype?: boolean;
  removeEditorData?: boolean;
  removeEmptyContainers?: boolean;
  removeHiddenElements?: boolean;
  collapseWhitespace?: boolean;
  roundPrecision?: boolean;
  precisionDigits?: number;
}

export interface OptimizationResult {
  originalSvg: string;
  optimizedSvg: string;
  originalBytes: number;
  optimizedBytes: number;
  savedBytes: number;
  savingsPercentage: number;
}

export function optimizeSvg(
  rawSvg: string,
  options: OptimizeOptions = {}
): OptimizationResult {
  const {
    removeComments = true,
    removeMetadata = true,
    removeDoctype = true,
    removeEditorData = true,
    removeEmptyContainers = true,
    removeHiddenElements = true,
    collapseWhitespace = true,
    roundPrecision = true,
    precisionDigits = 2,
  } = options;

  let cleaned = rawSvg;

  // 1. Remove XML prolog (<?xml ... ?>)
  cleaned = cleaned.replace(/<\?xml[\s\S]*?\?>/gi, '');

  // 2. Remove DOCTYPE
  if (removeDoctype) {
    cleaned = cleaned.replace(/<!DOCTYPE[\s\S]*?>/gi, '');
  }

  // 3. Remove comments
  if (removeComments) {
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  }

  // 4. Remove metadata & desc & title if unneeded
  if (removeMetadata) {
    cleaned = cleaned.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
  }

  // 5. Remove editor data (Inkscape, Sodipodi, Sketch, Illustrator)
  if (removeEditorData) {
    // Remove namespace declarations
    cleaned = cleaned.replace(/\s*xmlns:(?:inkscape|sodipodi|sketch|adobe|vector)="[^"]*"/gi, '');
    // Remove custom editor tags (e.g. <sodipodi:namedview ... />)
    cleaned = cleaned.replace(/<(?:sodipodi|inkscape):[a-z0-9_-]+[\s\S]*?\/>/gi, '');
    cleaned = cleaned.replace(/<(?:sodipodi|inkscape):[a-z0-9_-]+[\s\S]*?<\/(?:sodipodi|inkscape):[a-z0-9_-]+>/gi, '');
    // Remove custom editor attributes (e.g. inkscape:version="...", sodipodi:docname="...")
    cleaned = cleaned.replace(/\s*(?:sodipodi|inkscape|sketch):[a-z0-9_-]+="[^"]*"/gi, '');
    // Remove Sketch export attributes
    cleaned = cleaned.replace(/\s*sketch:type="[^"]*"/gi, '');
  }

  // 6. Remove hidden elements
  if (removeHiddenElements) {
    cleaned = cleaned.replace(/<[a-z0-9_-]+[^>]*(?:display="none"|visibility="hidden"|style="[^"]*display:\s*none[^"]*")[^>]*\/>/gi, '');
    cleaned = cleaned.replace(/<[a-z0-9_-]+[^>]*(?:display="none"|visibility="hidden"|style="[^"]*display:\s*none[^"]*")[^>]*>[\s\S]*?<\/[a-z0-9_-]+>/gi, '');
  }

  // 7. Remove empty containers (<g></g>, <g/>)
  if (removeEmptyContainers) {
    cleaned = cleaned.replace(/<g\s*(?:id="[^"]*")?\s*><\/g>/gi, '');
    cleaned = cleaned.replace(/<g\s*\/>/gi, '');
  }

  // 8. Round coordinates precision in path data
  if (roundPrecision) {
    const factor = Math.pow(10, precisionDigits);
    cleaned = cleaned.replace(/d="([^"]+)"/g, (_, pathData) => {
      const rounded = pathData.replace(/(\d+\.\d{3,})/g, (num: string) => {
        return (Math.round(parseFloat(num) * factor) / factor).toString();
      });
      return `d="${rounded}"`;
    });
  }

  // 9. Collapse whitespace and trim
  if (collapseWhitespace) {
    cleaned = cleaned
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // Calculate byte sizes
  const encoder = new TextEncoder();
  const originalBytes = encoder.encode(rawSvg).length;
  const optimizedBytes = encoder.encode(cleaned).length;
  const savedBytes = Math.max(0, originalBytes - optimizedBytes);
  const savingsPercentage = originalBytes > 0 ? (savedBytes / originalBytes) * 100 : 0;

  return {
    originalSvg: rawSvg,
    optimizedSvg: cleaned,
    originalBytes,
    optimizedBytes,
    savedBytes,
    savingsPercentage: Number(savingsPercentage.toFixed(1)),
  };
}

export function formatSvgCode(svgString: string): string {
  // Simple XML pretty printer for code editor view
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  // normalize
  const tokens = svgString.replace(/>\s*</g, '><').split(/(?=[<])|(?<=>)/g).filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + token + '\n';
    } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<?') && !token.startsWith('<!')) {
      formatted += tab.repeat(indent) + token + '\n';
      indent++;
    } else if (token.startsWith('<') && token.endsWith('/>')) {
      formatted += tab.repeat(indent) + token + '\n';
    } else if (token.trim()) {
      formatted += tab.repeat(indent) + token.trim() + '\n';
    }
  }

  return formatted.trim();
}
