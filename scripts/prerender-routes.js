import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const routes = [
  {
    path: 'png-to-svg',
    title: 'Free PNG to SVG Converter (Client-Side) | SvgFav',
    description: 'Convert PNG to SVG vector free online with zero server uploads. High-precision vectorizer for logos, sketches, Cricut cut files, and graphics.',
  },
  {
    path: 'convert/png-to-svg',
    title: 'Free PNG to SVG Converter (Client-Side) | SvgFav',
    description: 'Convert PNG to SVG vector free online with zero server uploads. High-precision vectorizer for logos, sketches, Cricut cut files, and graphics.',
  },
  {
    path: 'jpg-to-svg',
    title: 'Free JPG to SVG Converter (Client-Side) | SvgFav',
    description: 'Convert JPG to SVG vector free online with zero server uploads. Trace photos, sketches, and logos into infinitely scalable vectors.',
  },
  {
    path: 'convert/jpg-to-svg',
    title: 'Free JPG to SVG Converter (Client-Side) | SvgFav',
    description: 'Convert JPG to SVG vector free online with zero server uploads. Trace photos, sketches, and logos into infinitely scalable vectors.',
  },
  {
    path: 'image-to-svg',
    title: 'Universal Image to SVG Vectorizer (Client-Side) | SvgFav',
    description: 'Convert any image (PNG, JPG, WebP) to clean SVG vectors for Cricut Design Space, Glowforge laser cutters, and embroidery machines.',
  },
  {
    path: 'convert/image-to-svg',
    title: 'Universal Image to SVG Vectorizer (Client-Side) | SvgFav',
    description: 'Convert any image (PNG, JPG, WebP) to clean SVG vectors for Cricut Design Space, Glowforge laser cutters, and embroidery machines.',
  },
  {
    path: 'svg-to-jpg',
    title: 'Convert SVG to High-Quality JPG with Solid Background | SvgFav',
    description: 'Convert SVG vectors to JPG with custom background colors and quality tuning. 100% client-side conversion with zero server uploads and sub-pixel quality.',
  },
  {
    path: 'convert/svg-to-jpg',
    title: 'Convert SVG to High-Quality JPG with Solid Background | SvgFav',
    description: 'Convert SVG vectors to JPG with custom background colors and quality tuning. 100% client-side conversion with zero server uploads and sub-pixel quality.',
  },
  {
    path: 'svg-to-ico',
    title: 'Convert SVG to Multi-Size Favicon ICO (16, 32, 48px) | SvgFav',
    description: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads and crisp alpha transparency.',
  },
  {
    path: 'convert/svg-to-ico',
    title: 'Convert SVG to Multi-Size Favicon ICO (16, 32, 48px) | SvgFav',
    description: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads and crisp alpha transparency.',
  },
  {
    path: 'svg-to-data-uri',
    title: 'Convert SVG to CSS Data URI & Base64 Online | SvgFav',
    description: 'Convert SVG to optimized CSS background-image Data URIs and clean Base64 strings. UTF-8 URL encoded with zero file weight waste.',
  },
  {
    path: 'convert/svg-to-data-uri',
    title: 'Convert SVG to CSS Data URI & Base64 Online | SvgFav',
    description: 'Convert SVG to optimized CSS background-image Data URIs and clean Base64 strings. UTF-8 URL encoded with zero file weight waste.',
  },
  {
    path: 'svg-to-astro',
    title: 'Convert SVG to Astro Component Online | SvgFav',
    description: 'Transform SVG markup into production-ready .astro components with prop forwarding, TypeScript interfaces, and zero bundle bloat.',
  },
  {
    path: 'convert/svg-to-astro',
    title: 'Convert SVG to Astro Component Online | SvgFav',
    description: 'Transform SVG markup into production-ready .astro components with prop forwarding, TypeScript interfaces, and zero bundle bloat.',
  },
  {
    path: 'convert',
    title: 'Free Online Vector & Favicon Converters | SvgFav',
    description: 'High-speed browser-based SVG, PNG, JPG, and ICO converters with zero server uploads and complete privacy.',
  },
  {
    path: 'converters',
    title: 'Free Online Vector & Favicon Converters | SvgFav',
    description: 'High-speed browser-based SVG, PNG, JPG, and ICO converters with zero server uploads and complete privacy.',
  },
  {
    path: 'favicon-generator',
    title: 'Free Favicon Generator & Converter | SvgFav',
    description: 'Generate multi-platform favicon packs (ICO, Apple Touch, Android Chrome, SVG) in seconds directly in your browser.',
  },
  {
    path: 'tools/favicon-generator',
    title: 'Free Favicon Generator & Converter | SvgFav',
    description: 'Generate multi-platform favicon packs (ICO, Apple Touch, Android Chrome, SVG) in seconds directly in your browser.',
  },
  {
    path: 'svg-optimizer',
    title: 'Free SVG Optimizer & Minifier (Client-Side) | SvgFav',
    description: 'Clean, minify, and optimize SVG code directly in your browser. Remove unnecessary metadata, comments, and redundant nodes.',
  },
  {
    path: 'tools/svg-optimizer',
    title: 'Free SVG Optimizer & Minifier (Client-Side) | SvgFav',
    description: 'Clean, minify, and optimize SVG code directly in your browser. Remove unnecessary metadata, comments, and redundant nodes.',
  },
  {
    path: 'tools/logo-maker',
    title: 'Free Vector Logo Maker & Studio | SvgFav',
    description: 'Create modern vector logos, icons, and marks right in your browser with instant SVG and high-resolution PNG export.',
  },
  {
    path: 'picsvg-alternative',
    title: 'Best Picsvg Alternative — Ad-Free, No 4MB Limit & 100% Private | SvgFav',
    description: 'Looking for a Picsvg alternative? SvgFav offers ad-free in-browser SVG vectorization with no 4MB limit and zero server uploads.',
  },
  {
    path: 'alternatives/picsvg',
    title: 'Best Picsvg Alternative — Ad-Free, No 4MB Limit & 100% Private | SvgFav',
    description: 'Looking for a Picsvg alternative? SvgFav offers ad-free in-browser SVG vectorization with no 4MB limit and zero server uploads.',
  },
  {
    path: 'de',
    title: 'Kostenloser SVG zu PNG Konverter (100% im Browser) | SvgFav',
    description: 'Konvertieren Sie SVG-Vektordateien kostenlos und in hoher Auflösung in transparente PNG-Bilder direkt im Browser.',
  },
  {
    path: 'pt',
    title: 'Conversor SVG para PNG Grátis (Alta Resolução) | SvgFav',
    description: 'Converta arquivos vetoriais SVG em imagens PNG nítidas com fundo transparente diretamente no seu navegador.',
  },
  {
    path: 'pt-br/conversor-svg-para-png',
    title: 'Conversor SVG para PNG Grátis (Alta Resolução) | SvgFav',
    description: 'Converta arquivos vetoriais SVG em imagens PNG nítidas com fundo transparente diretamente no seu navegador.',
  },
  {
    path: 'es',
    title: 'Convertidor SVG a PNG y Estudio Vectorial Gratis | SvgFav',
    description: 'Convierte archivos vectoriales SVG en imágenes PNG transparentes de alta resolución directamente en tu navegador.',
  },
  {
    path: 'fr',
    title: 'Convertisseur SVG vers PNG et Studio Vectoriel Gratuit | SvgFav',
    description: 'Convertissez des fichiers vectoriels SVG en images PNG nettes avec fond transparent directement dans votre navigateur.',
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | SvgFav.com',
    description: 'Read the privacy policy for SvgFav.com. All vector processing, rasterization, and conversion happen 100% client-side in your browser.',
  },
  {
    path: 'terms-and-conditions',
    title: 'Terms and Conditions | SvgFav.com',
    description: 'Terms and conditions governing the use of SvgFav.com free in-browser vector converters and favicon tools.',
  },
  {
    path: 'about-us',
    title: 'About SvgFav.com — Modern Client-Side Vector Studio',
    description: 'Learn about SvgFav.com, our mission to build private, ultra-fast client-side vector utilities, and the engineering behind our tools.',
  },
  {
    path: 'contact-us',
    title: 'Contact Us | SvgFav.com',
    description: 'Get in touch with the SvgFav.com team for inquiries, bug reports, feature requests, or partnership opportunities.',
  },
];

console.log(`Pre-rendering static route entry points for ${routes.length} paths...`);

let count = 0;
for (const route of routes) {
  const canonicalUrl = `https://svgfav.com/${route.path}`;

  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

  // Replace Canonical Link
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace Open Graph tags
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  // Replace Twitter Card tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);

  // 1. Write as .html file (e.g. dist/png-to-svg.html) so Clean URLs serves /png-to-svg as 200 OK directly without trailing-slash redirect
  const htmlFilePath = path.join(distDir, `${route.path}.html`);
  fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
  fs.writeFileSync(htmlFilePath, html, 'utf-8');

  // 2. Also write as /index.html (e.g. dist/png-to-svg/index.html) so /png-to-svg/ also serves 200 OK
  const targetDir = path.join(distDir, route.path);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');

  count++;
}

console.log(`Successfully pre-rendered ${count} route entry points.`);

