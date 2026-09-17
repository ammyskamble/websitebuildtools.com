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
  // --- Core English Converters ---
  {
    path: 'png-to-svg',
    title: 'Free PNG to SVG Converter (Client-Side) | SvgFav',
    description: 'Convert PNG to SVG vector free online with zero server uploads. High-precision vectorizer for logos, sketches, Cricut cut files, and graphics.',
    h1: 'Convert PNG to SVG Instantly',
    h1Subtitle: 'Vectorize raster PNG images into clean, scalable SVG paths directly in your browser with zero server uploads.',
    features: [
      { title: 'Sub-Pixel Contour Tracing', desc: 'Converts raster bitmap pixels into clean Bézier curves and sharp vector contours.' },
      { title: 'Cricut & Laser Ready', desc: 'Generates continuous closed paths ideal for vinyl cutting machines, Glowforge, and CNC plotters.' },
      { title: '100% Client-Side Privacy', desc: 'Processed locally in your browser memory via WebAssembly and Canvas. Zero server uploads.' },
    ],
    steps: [
      'Upload PNG or raster image directly to browser memory.',
      'Adjust tracing threshold and smoothing tolerance sliders.',
      'Download clean, scalable SVG vector code or graphic file.',
    ],
    faqs: [
      { q: 'Is my PNG uploaded to a remote server?', a: 'No. All vector path tracing executes 100% locally in your browser memory.' },
      { q: 'Can I use the output SVGs in Cricut Design Space?', a: 'Yes. The generated SVGs contain clean closed paths optimized for Cricut, Silhouette, and Glowforge.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/png-to-svg' },
      { lang: 'de', url: 'https://svgfav.com/de/png-in-svg-umwandeln' },
      { lang: 'pt', url: 'https://svgfav.com/pt/conversor-png-para-svg' },
      { lang: 'x-default', url: 'https://svgfav.com/png-to-svg' },
    ],
  },
  {
    path: 'jpg-to-svg',
    title: 'Free JPG to SVG Converter (Client-Side) | SvgFav',
    description: 'Convert JPG to SVG vector free online with zero server uploads. Trace photos, sketches, and logos into infinitely scalable vectors.',
    h1: 'Convert JPG to SVG Vector Instantly',
    h1Subtitle: 'Trace JPG photos, sketches, and logos into infinitely scalable vectors without 4MB cloud limits or server uploads.',
    features: [
      { title: 'No 4MB Limit', desc: 'Process high-resolution JPG images up to 20MB+ effortlessly using your device GPU.' },
      { title: 'Zero Cloud Storage', desc: 'Files remain strictly inside your browser sandbox and are never uploaded to any remote host.' },
      { title: 'Instant Vector Export', desc: 'Generate scalable vector paths for laser cutting, web development, and digital illustrations.' },
    ],
    steps: [
      'Drag and drop your JPG or JPEG image into the tool.',
      'Fine-tune contrast and threshold settings for crisp outlines.',
      'Save the resulting production-ready SVG file directly.',
    ],
    faqs: [
      { q: 'Can I convert colored JPG photos to SVG?', a: 'High-contrast logos, line art, signatures, and silhouettes produce the best mathematical vectors.' },
      { q: 'Is JPG to SVG free on SvgFav?', a: 'Yes, 100% free with no limits, no watermarks, and no sign-up required.' },
    ],
  },
  {
    path: 'image-to-svg',
    title: 'Universal Image to SVG Vectorizer (Client-Side) | SvgFav',
    description: 'Convert any image (PNG, JPG, WebP) to clean SVG vectors for Cricut Design Space, Glowforge laser cutters, and embroidery machines.',
    h1: 'Universal Image to SVG Vectorizer',
    h1Subtitle: 'Convert PNG, JPG, or WebP images to production-ready vector contours for laser cutting and cutting plotters.',
    features: [
      { title: 'All Formats Supported', desc: 'Drop PNG, JPG, WebP, BMP, or GIF files to vectorize immediately.' },
      { title: 'Silhouette & Cutting Files', desc: 'Generates unified vector paths designed for Cricut Design Space and Silhouette Studio.' },
      { title: 'Private & In-Browser', desc: 'Zero data retention. Conversions run offline in client memory.' },
    ],
    steps: [
      'Select any raster image format from your device.',
      'Tune threshold and smoothing controls for clean cutting paths.',
      'Download SVG and import into cutting machine software.',
    ],
    faqs: [
      { q: 'What cutting machines work with SvgFav SVGs?', a: 'Cricut Explore/Maker, Silhouette Cameo, Glowforge laser cutters, Brother ScanNCut, and CNC routers.' },
    ],
  },
  {
    path: 'svg-to-jpg',
    title: 'Convert SVG to High-Quality JPG with Solid Background | SvgFav',
    description: 'Convert SVG vectors to JPG with custom background colors and quality tuning. 100% client-side conversion with zero server uploads and sub-pixel quality.',
    h1: 'Convert SVG to High-Quality JPG',
    h1Subtitle: 'Flatten vector designs onto custom background fills and compress into lightweight, web-optimized JPEG images in browser memory.',
    features: [
      { title: 'Solid Background Blending', desc: 'Choose white, black, or custom hex background fills because JPG does not support alpha transparency.' },
      { title: 'Custom DPI & Dimensions', desc: 'Render vectors at 1x to 8x scale with sub-pixel anti-aliasing.' },
      { title: 'Batch Compression', desc: 'Convert multiple SVG files in parallel and download a consolidated ZIP pack.' },
    ],
    steps: [
      'Drop your SVG files into the conversion area.',
      'Select background color and JPEG quality setting (75% to 100%).',
      'Download the compressed JPG file or batch ZIP package.',
    ],
    faqs: [
      { q: 'Why does SVG to JPG require a solid background?', a: 'The JPG format lacks transparency (alpha channel), so transparent vector areas must be flattened onto a solid fill.' },
    ],
  },
  {
    path: 'svg-to-ico',
    title: 'Convert SVG to Multi-Size Favicon ICO (16, 32, 48px) | SvgFav',
    description: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads and crisp alpha transparency.',
    h1: 'Convert SVG to Multi-Size Favicon ICO',
    h1Subtitle: 'Generate genuine Windows binary multi-resolution .ico files (16x16, 32x32, 48x48) directly in your browser.',
    features: [
      { title: 'Multi-Frame Binary ICO', desc: 'Embeds 16x16, 32x32, and 48x48 icon frames into a single binary .ico file for full browser compatibility.' },
      { title: 'Retains Transparency', desc: 'Full 32-bit RGBA alpha transparency preserved across all rendered frames.' },
      { title: 'Instant Zero-Upload Encoding', desc: 'Encoded directly in browser memory without sending private graphics to a server.' },
    ],
    steps: [
      'Upload your vector SVG icon.',
      'Inspect generated icon sizes in the real-time preview.',
      'Download the compiled multi-resolution favicon.ico.',
    ],
    faqs: [
      { q: 'Is this a real binary .ico or just a renamed PNG?', a: 'SvgFav generates a genuine binary ICO container conforming strictly to the Microsoft Windows Icon specification.' },
    ],
  },
  {
    path: 'svg-to-data-uri',
    title: 'Convert SVG to CSS Data URI & Base64 Online | SvgFav',
    description: 'Convert SVG to optimized CSS background-image Data URIs and clean Base64 strings. UTF-8 URL encoded with zero file weight waste.',
    h1: 'Convert SVG to CSS Data URI & Base64',
    h1Subtitle: 'Turn SVG vectors into lightweight CSS background-image code snippets and clean Base64 strings instantly.',
    features: [
      { title: 'Optimized UTF-8 URI', desc: 'URL-encodes only unsafe characters for smaller file sizes compared to heavy Base64.' },
      { title: '1-Click CSS Snippet', desc: 'Copy ready-to-paste background-image CSS declarations directly into your stylesheet.' },
      { title: 'HTML Inline Code', desc: 'Generate img src data:image/svg+xml strings with zero external HTTP requests.' },
    ],
    steps: [
      'Paste or drop SVG code into the editor.',
      'Toggle between UTF-8 URL encoding and Base64 format.',
      'Click Copy to clipboard for immediate use in CSS or HTML.',
    ],
    faqs: [
      { q: 'Is UTF-8 Data URI better than Base64 for SVG?', a: 'Yes! UTF-8 URL encoding is typically 20-30% smaller than Base64 and keeps the SVG source readable.' },
    ],
  },
  {
    path: 'svg-to-astro',
    title: 'Convert SVG to Astro Component Online | SvgFav',
    description: 'Transform SVG markup into production-ready .astro components with prop forwarding, TypeScript interfaces, and zero bundle bloat.',
    h1: 'Convert SVG to Astro Component',
    h1Subtitle: 'Convert raw SVG markup into modern .astro component code with TypeScript props and class passthrough.',
    features: [
      { title: 'TypeScript Props Interface', desc: 'Auto-generates Props interface with size, color, and SVGAttributes.' },
      { title: 'Zero Runtime Bloat', desc: 'Renders static HTML at build time for blistering Core Web Vitals.' },
      { title: 'Tailwind Class Forwarding', desc: 'Allows styling the SVG with standard utility classes seamlessly.' },
    ],
    steps: [
      'Upload an SVG or paste vector XML code.',
      'Set component name and customize TypeScript interface options.',
      'Copy the generated .astro component code into your Astro project.',
    ],
    faqs: [
      { q: 'Does this require any external dependencies?', a: 'No dependencies. The resulting component uses native Astro syntax and renders as pure HTML.' },
    ],
  },

  // --- Hub & Tools ---
  {
    path: 'convert',
    title: 'Free Online Vector & Favicon Converters | SvgFav',
    description: 'High-speed browser-based SVG, PNG, JPG, and ICO converters with zero server uploads and complete privacy.',
    h1: 'Online Vector Converters & Code Studio',
    h1Subtitle: 'Fast, free, client-side vector utilities. Convert between SVG, PNG, JPG, ICO, Data URI, and Astro formats with zero server uploads.',
    features: [
      { title: 'PNG to SVG Vectorizer', desc: 'Trace raster graphics into infinitely scalable SVG vectors with sub-pixel smoothing.' },
      { title: 'Favicon ICO Encoder', desc: 'Compile multi-frame 16x16, 32x32, and 48x48 .ico files for modern browsers and legacy shortcuts.' },
      { title: 'SVG to Astro & CSS Data URI', desc: 'Transform vector code into production-ready web components and CSS background strings.' },
    ],
    steps: [
      'Choose your target conversion tool from the directory.',
      'Drag and drop your images or vector files directly into the workspace.',
      'Export crisp, high-resolution assets or copy optimized code snippets.',
    ],
    faqs: [
      { q: 'Are my files kept private during conversion?', a: 'Yes! 100% of image rasterization and path calculations happen locally inside your browser memory. Zero files are uploaded to our servers.' },
      { q: 'Is there a limit on file size or conversions?', a: 'No limits. Convert as many files as you need, up to 20MB+ per file, completely free.' },
    ],
  },
  {
    path: 'favicon-generator',
    title: 'Free Favicon Generator & Converter | SvgFav',
    description: 'Generate multi-platform favicon packs (ICO, Apple Touch, Android Chrome, SVG) in seconds directly in your browser.',
    h1: 'Browser Favicon & App Icon Generator',
    h1Subtitle: 'Generate complete multi-platform favicon suites with ICO, Apple Touch, Android Chrome PWA icons, and valid site.webmanifest in one click.',
    features: [
      { title: 'Complete Favicon Pack in 1 ZIP', desc: 'Includes favicon.ico (multi-size), favicon.svg, apple-touch-icon (180x180), and android-chrome (192 & 512px).' },
      { title: 'Live Multi-Platform Previews', desc: 'Preview your favicon instantly on Google SERP cards, Safari tabs, iOS home screen, and Windows taskbars.' },
      { title: 'Production site.webmanifest', desc: 'Generates valid PWA manifest JSON code ready to drop into your public root folder.' },
    ],
    steps: [
      'Upload your logo or icon image (SVG, PNG, or JPG).',
      'Preview your icon across browser tabs, mobile screens, and search results.',
      'Download the compiled ZIP pack and copy the generated HTML meta snippet.',
    ],
    faqs: [
      { q: 'Why do I need both favicon.ico and favicon.svg?', a: 'Modern browsers prefer SVG favicons for dark-mode support and infinite sharpness, while legacy browsers require multi-frame binary .ico.' },
      { q: 'Where do I place the downloaded favicon files?', a: 'Unzip and extract all files into the root public directory of your website (e.g. /public or web root).' },
    ],
  },
  {
    path: 'svg-optimizer',
    title: 'Free SVG Optimizer & Minifier (Client-Side) | SvgFav',
    description: 'Clean, minify, and optimize SVG code directly in your browser. Remove unnecessary metadata, comments, and redundant nodes.',
    h1: 'SVG Optimizer & Code Cleaner',
    h1Subtitle: 'Strip bloated metadata, reduce decimal precision, remove editor namespaces, and optimize SVG code for faster web performance.',
    features: [
      { title: 'Remove Illustrator / Figma Bloat', desc: 'Eliminates editor comments, proprietary metadata, and redundant tags without visual degradation.' },
      { title: 'Coordinate Precision Rounding', desc: 'Reduces excessive decimal precision on path coordinates to cut file weight by 40% to 70%.' },
      { title: 'Lighthouse & Core Web Vitals', desc: 'Lighter inline SVGs speed up DOM parsing and improve Largest Contentful Paint (LCP).' },
    ],
    steps: [
      'Drop your SVG file or paste raw XML markup.',
      'Adjust precision and optimization parameters.',
      'Download the minified SVG file or copy the cleaned code.',
    ],
    faqs: [
      { q: 'Does optimization degrade visual quality?', a: 'No. The optimizer retains exact mathematical contours while stripping invisible editor junk and excessive decimals.' },
    ],
  },
  {
    path: 'tools/logo-maker',
    title: 'Free Vector Logo Maker & Studio | SvgFav',
    description: 'Create modern vector logos, icons, and marks right in your browser with instant SVG and high-resolution PNG export.',
    h1: 'Free Vector Logo Maker & Studio',
    h1Subtitle: 'Design clean modern logos, marks, and app icons with real-time vector shapes, typography, and instant export.',
    features: [
      { title: 'Geometric Vector Shapes', desc: 'Combine primitives, badges, and emblems into clean geometric logos.' },
      { title: 'High-DPI Raster & Vector Export', desc: 'Export scalable SVG vectors or raster PNGs up to 8x resolution (4096px).' },
      { title: '100% Free for Commercial Use', desc: 'You retain 100% intellectual property rights with zero licensing fees or attribution.' },
    ],
    steps: [
      'Choose a base shape, icon, or typography layout.',
      'Customize colors, gradients, padding, and border radius.',
      'Export production-ready SVG and high-resolution PNG assets.',
    ],
    faqs: [
      { q: 'Can I use logos made here for my business?', a: 'Yes! All assets created with SvgFav are 100% yours to use commercially or trademark.' },
    ],
  },

  // --- Competitor Alternative ---
  {
    path: 'alternatives/picsvg',
    title: 'Best Picsvg Alternative — Ad-Free, No 4MB Limit & 100% Private | SvgFav',
    description: 'Looking for a Picsvg alternative? SvgFav offers ad-free in-browser SVG vectorization with no 4MB limit and zero server uploads.',
    h1: 'Best Free Picsvg Alternative (100% Client-Side & Private)',
    h1Subtitle: 'Ad-free in-browser SVG vectorization with no 4MB file limit, zero server uploads, and precision contour smoothing for Cricut & laser cutters.',
    features: [
      { title: 'No 4MB Upload Limit', desc: 'Process large high-resolution images up to 20MB+ directly using your browser GPU.' },
      { title: 'Zero Cloud Storage / 100% Private', desc: 'Your confidential sketches and client logos never leave your computer.' },
      { title: '100% Ad-Free Clean UI', desc: 'No banner ads, popups, or slow third-party tracker scripts.' },
      { title: 'Cricut & Laser Path Smoothing', desc: 'Generates clean unified closed paths without the noisy jagged path fragments common on Picsvg.' },
    ],
    steps: [
      'Upload your PNG, JPG, or drawing without worrying about 4MB limits.',
      'Adjust contour smoothing and threshold sliders to eliminate noisy artifacts.',
      'Download clean SVG cutting paths ready for Cricut Design Space or laser cutters.',
    ],
    faqs: [
      { q: 'Why is SvgFav a superior alternative to Picsvg?', a: 'SvgFav solves Picsvg’s main flaws: strict 4MB file limits, intrusive advertising, and privacy risks from remote cloud processing. Everything runs in your browser.' },
      { q: 'Does SvgFav charge anything or require an account?', a: 'No. SvgFav is completely free with no registration, no watermarks, and no subscriptions.' },
    ],
  },

  // --- English Company & Legal Pages ---
  {
    path: 'about-us',
    title: 'About SvgFav.com — Modern Client-Side Vector Studio',
    description: 'Learn about SvgFav.com, our mission to build private, ultra-fast client-side vector utilities, and the engineering behind our tools.',
    h1: 'About SvgFav.com',
    h1Subtitle: 'Building the open web’s fastest, most private vector and favicon studio.',
    features: [
      { title: 'Zero Server Storage', desc: 'Files never leave your browser. All vectorization and ICO generation happens locally in memory.' },
      { title: 'Instant GPU Acceleration', desc: 'Powered by HTML5 Canvas and WebAssembly for real-time feedback with zero latency.' },
      { title: 'Global Edge Delivery', desc: 'Served across worldwide Cloudflare Pages edge networks for instant global load times.' },
    ],
    steps: [
      'Client-side execution eliminates cloud latency.',
      'Privacy by design ensures your proprietary artwork remains confidential.',
      'Export production-ready code: SVG, multi-resolution ICO, Astro components, and data URIs.',
    ],
    faqs: [
      { q: 'Who owns the assets created on SvgFav.com?', a: 'You retain 100% ownership and copyright of all graphics, vectors, and favicons created on SvgFav.com.' },
      { q: 'Is SvgFav.com free for commercial use?', a: 'Yes, SvgFav.com is 100% free for both personal and commercial projects.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/about-us' },
      { lang: 'de', url: 'https://svgfav.com/de/about-us' },
      { lang: 'pt', url: 'https://svgfav.com/pt/about-us' },
      { lang: 'x-default', url: 'https://svgfav.com/about-us' },
    ],
  },
  {
    path: 'contact-us',
    title: 'Contact Us | SvgFav.com',
    description: 'Get in touch with the SvgFav.com team for inquiries, bug reports, feature requests, or partnership opportunities.',
    h1: 'Contact SvgFav.com Support & Engineering',
    h1Subtitle: 'Have a question, feedback, or feature suggestion? Get in touch with our engineering team directly.',
    features: [
      { title: 'Direct Email Support', desc: 'Reach us directly at support@svgfav.com for technical questions, bug reports, or partnerships.' },
      { title: 'Fast Response Times', desc: 'Our developer team reviews incoming feedback promptly.' },
      { title: 'Feature Requests', desc: 'We continuously improve SvgFav based on feedback from designers and web developers.' },
    ],
    steps: [
      'Send us an email at support@svgfav.com detailing your question or feedback.',
      'Include details about browser version or file format if reporting an issue.',
      'Receive a response from our engineering team.',
    ],
    faqs: [
      { q: 'What is the official support email for SvgFav.com?', a: 'You can contact us anytime at support@svgfav.com.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/contact-us' },
      { lang: 'de', url: 'https://svgfav.com/de/contact-us' },
      { lang: 'pt', url: 'https://svgfav.com/pt/contact-us' },
      { lang: 'x-default', url: 'https://svgfav.com/contact-us' },
    ],
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | SvgFav.com',
    description: 'Read the privacy policy for SvgFav.com. All vector processing, rasterization, and conversion happen 100% client-side in your browser.',
    h1: 'Privacy Policy — 100% Client-Side Architecture',
    h1Subtitle: 'Your privacy is our core architectural principle. Files never leave your browser sandbox.',
    features: [
      { title: 'Zero File Uploads', desc: 'Your graphics and logos are processed in browser memory and never uploaded to remote servers.' },
      { title: 'GDPR & LGPD Compliant', desc: 'Strict compliance by design through complete data minimization (GDPR Article 5 & 25).' },
      { title: 'No Behavioral Tracking', desc: 'We do not sell data, use invasive tracking pixels, or build behavioral ad profiles.' },
    ],
    steps: [
      'Open any tool in your browser.',
      'Images are loaded exclusively into local browser memory (RAM/Canvas).',
      'Closing your browser tab immediately destroys all temporary data.',
    ],
    faqs: [
      { q: 'Are my files stored on your servers?', a: 'Never. SvgFav operates completely client-side. No images or vector files are transmitted to our servers.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/privacy-policy' },
      { lang: 'de', url: 'https://svgfav.com/de/privacy-policy' },
      { lang: 'pt', url: 'https://svgfav.com/pt/privacy-policy' },
      { lang: 'x-default', url: 'https://svgfav.com/privacy-policy' },
    ],
  },
  {
    path: 'terms-and-conditions',
    title: 'Terms and Conditions | SvgFav.com',
    description: 'Terms and conditions governing the use of SvgFav.com free in-browser vector converters and favicon tools.',
    h1: 'Terms & Conditions — Creator Ownership First',
    h1Subtitle: 'Clear, creator-friendly terms. You retain 100% intellectual property rights and ownership of your creations.',
    features: [
      { title: '100% IP Rights Retained', desc: 'You own full, unencumbered rights to all artwork, logos, and favicons created on SvgFav.com.' },
      { title: 'Commercial Use Permitted', desc: 'Deploy generated favicons and SVGs in commercial software, merchandise, and client projects.' },
      { title: '100% Free Service', desc: 'All tools are provided free of charge with no hidden fees or royalties.' },
    ],
    steps: [
      'Use SvgFav tools freely for personal or commercial projects.',
      'Retain full copyright and trademark rights in your created assets.',
      'No attribution or licensing fees required.',
    ],
    faqs: [
      { q: 'Do I need to credit SvgFav when using converted files?', a: 'No attribution is required. You own 100% of your output files.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/terms-and-conditions' },
      { lang: 'de', url: 'https://svgfav.com/de/terms-and-conditions' },
      { lang: 'pt', url: 'https://svgfav.com/pt/terms-and-conditions' },
      { lang: 'x-default', url: 'https://svgfav.com/terms-and-conditions' },
    ],
  },

  // --- German Pages ---
  {
    path: 'de',
    title: 'SvgFav.com — Kostenloser Online SVG-Konverter & Favicon Generator',
    description: 'Kostenloser Online SVG-Konverter und Favicon Generator. PNG zu SVG, JPG zu SVG konvertieren und Favicon-Pakete 100% im Browser erstellen. DSGVO-konform.',
    h1: 'Kostenloser Online SVG-Konverter & Favicon Generator',
    h1Subtitle: 'Vektoren im Browser erstellen, optimieren und konvertieren. 100% lokal, schnell und DSGVO-konform.',
    features: [
      { title: '100% Clientseitig & DSGVO-konform', desc: 'Ihre Dateien werden nicht auf externe Server hochgeladen. Höchste Sicherheit für Firmen- und Kundendaten.' },
      { title: 'Echte Favicon.ico-Pakete', desc: 'Generieren Sie Multi-Frame .ICO Dateien, Apple Touch Icons und Web-Manifeste in Sekunden.' },
      { title: 'SVG-Code-Optimierung', desc: 'Bereinigen Sie überflüssigen XML-Ballast und reduzieren Sie Ladezeiten für Google Lighthouse.' },
    ],
    steps: [
      'Bild oder Vektordatei im Browser ablegen.',
      'Vektorisierungs- oder Export-Parameter einstellen.',
      'Fertige SVG- oder PNG-Dateien sofort herunterladen.',
    ],
    faqs: [
      { q: 'Ist SvgFav in Deutschland DSGVO-konform?', a: 'Ja, vollständig. Da die Vektorisierung und Favicon-Erstellung zu 100% im Browser des Nutzers abläuft, werden keine Bilddaten übertragen oder gespeichert.' },
    ],
    hreflangs: [
      { lang: 'de', url: 'https://svgfav.com/de/' },
      { lang: 'pt', url: 'https://svgfav.com/pt/' },
      { lang: 'en', url: 'https://svgfav.com/' },
      { lang: 'x-default', url: 'https://svgfav.com/' },
    ],
  },
  {
    path: 'de/png-in-svg-umwandeln',
    title: 'PNG in SVG umwandeln kostenlos online — SvgFav',
    description: 'Wandeln Sie PNG-Bilder und Fotos in scharfe SVG-Vektoren um. Ohne Registrierung, 100% im Browser und DSGVO-konform.',
    h1: 'PNG in SVG umwandeln kostenlos online',
    h1Subtitle: 'Konvertieren Sie PNG-Bilder und Fotos direkt im Browser in scharfe, skalierbare SVG-Vektoren. Ohne Server-Upload und ohne 4MB Limit.',
    features: [
      { title: 'Präzise Konturerkennung', desc: 'Wandelt Pixelgrafiken in saubere Bézier-Kurven für Cricut, Plotter und Lasergravierer um.' },
      { title: 'Ohne Dateigrößenbeschränkung', desc: 'Verarbeiten Sie hochauflösende Bilder ohne die 4MB-Grenze herkömmlicher Tools.' },
      { title: '100% Datenschutz', desc: 'Ihre Entwürfe bleiben auf Ihrem Gerät und werden niemals auf Server übertragen.' },
    ],
    steps: [
      'PNG-Bild in den Upload-Bereich ziehen.',
      'Schwellenwert für Konturschärfe und Glättung anpassen.',
      'Saubere SVG-Vektordatei herunterladen.',
    ],
    faqs: [
      { q: 'Werden meine Bilder auf fremde Server geladen?', a: 'Nein. Die Umwandlung läuft vollständig lokal auf Ihrem Computer im Browser ab.' },
      { q: 'Kann ich die erstellten Vektoren kommerziell nutzen?', a: 'Ja, alle mit SvgFav erstellten Vektordateien stehen Ihnen uneingeschränkt zur Verfügung.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/png-to-svg' },
      { lang: 'de', url: 'https://svgfav.com/de/png-in-svg-umwandeln' },
      { lang: 'pt', url: 'https://svgfav.com/pt/conversor-png-para-svg' },
      { lang: 'x-default', url: 'https://svgfav.com/png-to-svg' },
    ],
  },
  {
    path: 'de/about-us',
    title: 'Über uns | SvgFav.com — Das datenschutzfreundliche Vektor-Studio',
    description: 'Erfahren Sie mehr über SvgFav.com. Unsere Mission: Schnelle, kostenfreie Vektorkonvertierung und Favicon-Erstellung direkt im Browser ohne Server-Uploads.',
    h1: 'Über SvgFav.com — Das datenschutzfreundliche Vektor-Studio',
    h1Subtitle: 'Entwickelt für Designer, Entwickler und Webmaster, die Wert auf Privatsphäre und Geschwindigkeit legen.',
    features: [
      { title: '100% Clientseitige Berechnung', desc: 'Keine Speicherung auf externen Servern. Höchste Sicherheit für Unternehmens- und Kundendaten.' },
      { title: 'Echtzeit-Berechnung', desc: 'Verarbeitung mit WebAssembly und Canvas ohne zeitraubende Upload-Warteschlangen.' },
      { title: 'Globale Verfügbarkeit', desc: 'High-Speed Auslieferung über das Cloudflare Edge-Netzwerk in Europa und weltweit.' },
    ],
    steps: [
      'Lokale Browserverarbeitung ohne Cloud-Latenz.',
      'Volle Rechte an allen erstellten Grafiken und Favicons.',
      'Kostenlose Nutzung für private und gewerbliche Projekte.',
    ],
    faqs: [
      { q: 'Kostet SvgFav.com etwas?', a: 'Nein. Alle Konverter und Favicon-Tools auf SvgFav.com sind 100% kostenlos.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/about-us' },
      { lang: 'de', url: 'https://svgfav.com/de/about-us' },
      { lang: 'pt', url: 'https://svgfav.com/pt/about-us' },
      { lang: 'x-default', url: 'https://svgfav.com/about-us' },
    ],
  },
  {
    path: 'de/contact-us',
    title: 'Kontakt & Support | SvgFav.com — Hilfecenter & Entwickler-Support',
    description: 'Kontaktieren Sie das Team von SvgFav.com bei Fragen zu Vektorkonvertierung, Favicon-Erstellung, Fehlermeldungen oder Partnerschaften.',
    h1: 'Kontakt & Entwickler-Support — SvgFav.com',
    h1Subtitle: 'Haben Sie Fragen, Feedback oder Vorschläge? Schreiben Sie uns direkt an support@svgfav.com.',
    features: [
      { title: 'Direkter E-Mail-Support', desc: 'Schreiben Sie uns an support@svgfav.com für technische Fragen und Feedback.' },
      { title: 'Schnelle Rückmeldung', desc: 'Unser Entwicklerteam beantwortet Anfragen zügig.' },
    ],
    steps: [
      'E-Mail an support@svgfav.com senden.',
      'Feedback oder Fehlerbeschreibung mitteilen.',
      'Schnelle Antwort von unserem Team erhalten.',
    ],
    faqs: [
      { q: 'Wie lautet die Support-E-Mail von SvgFav?', a: 'support@svgfav.com' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/contact-us' },
      { lang: 'de', url: 'https://svgfav.com/de/contact-us' },
      { lang: 'pt', url: 'https://svgfav.com/pt/contact-us' },
      { lang: 'x-default', url: 'https://svgfav.com/contact-us' },
    ],
  },
  {
    path: 'de/privacy-policy',
    title: 'Datenschutzerklärung | SvgFav.com — Keine Server-Uploads & DSGVO-konform',
    description: 'Datenschutzerklärung von SvgFav.com. 100% clientseitige Verarbeitung im Browser. Keine Dateiübertragungen auf fremde Server. Vollständig DSGVO-konform.',
    h1: 'Datenschutzerklärung — 100% Clientseitig & DSGVO-konform',
    h1Subtitle: 'Ihre Privatsphäre ist unser wichtigster Grundsatz. Bilddateien verlassen niemals Ihren Browser.',
    features: [
      { title: 'Keine Datei-Uploads', desc: 'Alle Algorithmen laufen lokal im Arbeitsspeicher Ihres Browsers ab.' },
      { title: 'DSGVO-Konformität', desc: 'Vollständige Einhaltung von Artikel 5 und 25 der europäischen DSGVO.' },
    ],
    steps: [
      'Tool im Browser öffnen.',
      'Berechnung erfolgt ausschließlich im lokalen RAM.',
      'Beim Schließen des Tabs werden alle Daten sofort gelöscht.',
    ],
    faqs: [
      { q: 'Werden meine hochgeladenen Grafiken gespeichert?', a: 'Nein, niemals. Es findet keinerlei Dateiübertragung auf unsere Server statt.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/privacy-policy' },
      { lang: 'de', url: 'https://svgfav.com/de/privacy-policy' },
      { lang: 'pt', url: 'https://svgfav.com/pt/privacy-policy' },
      { lang: 'x-default', url: 'https://svgfav.com/privacy-policy' },
    ],
  },
  {
    path: 'de/terms-and-conditions',
    title: 'Nutzungsbedingungen | SvgFav.com — Kostenloses Vektor-Studio',
    description: 'Nutzungsbedingungen von SvgFav.com. Sie behalten 100% der Urheberrechte an allen erstellten Vektoren und Favicons.',
    h1: 'Nutzungsbedingungen — Urheberrechte bleiben bei Ihnen',
    h1Subtitle: 'Faire, entwicklerfreundliche Bedingungen: Sie behalten alle Rechte an Ihren Werken.',
    features: [
      { title: '100% Urheberrecht', desc: 'Sie behalten alle Rechte an Ihren erstellten Vektoren, Logos und Favicons.' },
      { title: 'Kommerzielle Nutzung erlaubt', desc: 'Kostenlos für persönliche und gewerbliche Zwecke ohne Lizenzgebühren.' },
    ],
    steps: [
      'Tools kostenlos für Web- und Designprojekte nutzen.',
      'Volle Rechte an allen Ausgabedateien behalten.',
      'Keine Namensnennung erforderlich.',
    ],
    faqs: [
      { q: 'Muss ich SvgFav als Quelle angeben?', a: 'Nein, eine Namensnennung ist nicht erforderlich.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/terms-and-conditions' },
      { lang: 'de', url: 'https://svgfav.com/de/terms-and-conditions' },
      { lang: 'pt', url: 'https://svgfav.com/pt/terms-and-conditions' },
      { lang: 'x-default', url: 'https://svgfav.com/terms-and-conditions' },
    ],
  },

  // --- Portuguese Pages ---
  {
    path: 'pt',
    title: 'SvgFav.com — Conversor PNG para SVG e Gerador de Favicon Online',
    description: 'Conversor SVG online gratuito e gerador de favicon. Converta PNG em SVG, JPG em SVG e gere pacotes favicon.ico 100% no navegador com total privacidade.',
    h1: 'Conversor PNG para SVG e Gerador de Favicon Online',
    h1Subtitle: 'Estúdio vetorial e gerador de favicons 100% no navegador. Sem uploads para servidores, rápido e com total privacidade.',
    features: [
      { title: '100% no Navegador', desc: 'Processamento direto no seu computador via WebAssembly. Seus arquivos nunca saem da sua máquina.' },
      { title: 'Pacote de Favicons Completo', desc: 'Gere arquivos .ICO, Apple Touch e PWA em segundos com visualização ao vivo.' },
    ],
    steps: [
      'Arraste suas imagens para a área de trabalho.',
      'Ajuste os parâmetros de conversão ou estilo.',
      'Baixe seus arquivos vetoriais ou pacote ZIP imediatamente.',
    ],
    faqs: [
      { q: 'O SvgFav é seguro e gratuito?', a: 'Sim! É 100% gratuito e seguro, funcionando totalmente no seu navegador sem armazenamento em nuvem.' },
    ],
    hreflangs: [
      { lang: 'pt', url: 'https://svgfav.com/pt/' },
      { lang: 'de', url: 'https://svgfav.com/de/' },
      { lang: 'en', url: 'https://svgfav.com/' },
      { lang: 'x-default', url: 'https://svgfav.com/' },
    ],
  },
  {
    path: 'pt/conversor-png-para-svg',
    title: 'Conversor PNG para SVG Grátis (100% no Navegador) — SvgFav',
    description: 'Converta imagens PNG para SVG vetor grátis diretamente no navegador. Sem upload para servidores, 100% privado e com precisão geométrica instantânea.',
    h1: 'Conversor PNG para SVG Grátis (100% no Navegador)',
    h1Subtitle: 'Transforme imagens PNG em vetores SVG escaláveis com total privacidade, sem limite de 4MB e com suporte a máquinas de corte.',
    features: [
      { title: 'Sem Limite de 4MB', desc: 'Processe arquivos de alta resolução com facilidade diretamente no seu navegador.' },
      { title: 'Compatível com Cricut e Laser', desc: 'Gera curvas contínuas e limpas ideais para plotters de recorte e corte a laser.' },
    ],
    steps: [
      'Envie sua imagem PNG.',
      'Ajuste o limiar de contraste e suavização.',
      'Baixe o arquivo SVG vetorial gerado.',
    ],
    faqs: [
      { q: 'Meus arquivos são enviados para algum servidor?', a: 'Não. O processamento é 100% executado no seu navegador.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/png-to-svg' },
      { lang: 'pt', url: 'https://svgfav.com/pt/conversor-png-para-svg' },
      { lang: 'de', url: 'https://svgfav.com/de/png-in-svg-umwandeln' },
      { lang: 'x-default', url: 'https://svgfav.com/png-to-svg' },
    ],
  },
  {
    path: 'pt/about-us',
    title: 'Sobre Nós | SvgFav.com — Estúdio Vetorial Seguro e Gratuito',
    description: 'Conheça a história e tecnologia por trás do SvgFav.com. Conversão de imagens em SVG e criação de favicons 100% no navegador sem uploads para servidores.',
    h1: 'Sobre a SvgFav.com',
    h1Subtitle: 'O estúdio de vetores e favicons mais rápido e seguro da web moderna.',
    features: [
      { title: 'Privacidade Total (LGPD)', desc: 'Nenhum dado ou arquivo gráfico é transmitido para servidores remotos.' },
      { title: 'Aceleração por GPU', desc: 'Processamento veloz via HTML5 Canvas e WebAssembly.' },
    ],
    steps: [
      'Processamento veloz no navegador.',
      'Total retenção de direitos intelectuais sobre suas criações.',
    ],
    faqs: [
      { q: 'Posso utilizar os arquivos para fins comerciais?', a: 'Sim, você possui 100% dos direitos de uso comercial e pessoal.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/about-us' },
      { lang: 'de', url: 'https://svgfav.com/de/about-us' },
      { lang: 'pt', url: 'https://svgfav.com/pt/about-us' },
      { lang: 'x-default', url: 'https://svgfav.com/about-us' },
    ],
  },
  {
    path: 'pt/contact-us',
    title: 'Fale Conosco & Suporte | SvgFav.com — Central de Atendimento',
    description: 'Entre em contato com a equipe do SvgFav.com para tirar dúvidas sobre conversão vetorial, sugestões ou suporte técnico.',
    h1: 'Fale Conosco & Suporte — SvgFav.com',
    h1Subtitle: 'Envie sua mensagem ou sugestão diretamente para a equipe de engenharia.',
    features: [
      { title: 'Suporte por E-mail', desc: 'Envie um e-mail para support@svgfav.com com suas dúvidas.' },
    ],
    steps: [
      'Envie um e-mail para support@svgfav.com.',
      'Nossa equipe responderá com brevidade.',
    ],
    faqs: [
      { q: 'Qual o e-mail de suporte?', a: 'support@svgfav.com' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/contact-us' },
      { lang: 'de', url: 'https://svgfav.com/de/contact-us' },
      { lang: 'pt', url: 'https://svgfav.com/pt/contact-us' },
      { lang: 'x-default', url: 'https://svgfav.com/contact-us' },
    ],
  },
  {
    path: 'pt/privacy-policy',
    title: 'Política de Privacidade | SvgFav.com — 100% no Navegador e LGPD',
    description: 'Política de privacidade do SvgFav.com. Operamos 100% no navegador sem upload de arquivos para servidores externos. Conforme LGPD e GDPR.',
    h1: 'Política de Privacidade — Conformidade com a LGPD',
    h1Subtitle: 'Sua privacidade em primeiro lugar: arquivos nunca saem do seu computador.',
    features: [
      { title: 'Zero Armazenamento', desc: 'Não salvamos imagens, vetores ou arquivos confidenciais.' },
      { title: 'Conformidade LGPD', desc: 'Privacidade por design com total segurança.' },
    ],
    steps: [
      'Utilize as ferramentas localmente.',
      'Ao fechar a aba, a memória do navegador é liberada.',
    ],
    faqs: [
      { q: 'O site coleta dados pessoais?', a: 'Não coletamos dados pessoais nem exigimos cadastro.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/privacy-policy' },
      { lang: 'de', url: 'https://svgfav.com/de/privacy-policy' },
      { lang: 'pt', url: 'https://svgfav.com/pt/privacy-policy' },
      { lang: 'x-default', url: 'https://svgfav.com/privacy-policy' },
    ],
  },
  {
    path: 'pt/terms-and-conditions',
    title: 'Termos de Uso | SvgFav.com — Estúdio Vetorial Online Gratuito',
    description: 'Termos e condições do SvgFav.com. Propriedade intelectual 100% sua para uso comercial e pessoal de todos os vetores e favicons gerados.',
    h1: 'Termos de Uso — Propriedade Intelectual do Criador',
    h1Subtitle: 'Termos transparentes: você mantém 100% dos direitos autorais de suas obras.',
    features: [
      { title: '100% Direitos Retidos', desc: 'Você é o único proprietário dos vetores e favicons que gerar.' },
      { title: 'Uso Comercial Livre', desc: 'Permitido para produtos comerciais, softwares e clientes.' },
    ],
    steps: [
      'Crie ou converta seus arquivos livremente.',
      'Utilize os arquivos em qualquer projeto comercial.',
    ],
    faqs: [
      { q: 'Preciso pagar royalties?', a: 'Não. O serviço é 100% gratuito sem qualquer cobrança de royalties.' },
    ],
    hreflangs: [
      { lang: 'en', url: 'https://svgfav.com/terms-and-conditions' },
      { lang: 'de', url: 'https://svgfav.com/de/terms-and-conditions' },
      { lang: 'pt', url: 'https://svgfav.com/pt/terms-and-conditions' },
      { lang: 'x-default', url: 'https://svgfav.com/terms-and-conditions' },
    ],
  },
];

console.log(`Pre-rendering static route entry points for ${routes.length} paths...`);

let count = 0;
for (const route of routes) {
  const canonicalUrl = `https://svgfav.com/${route.path}`;

  let html = baseHtml;

  // 1. Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // 2. Replace Meta Description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

  // 3. Replace Canonical Link
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Replace Open Graph tags
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  // 5. Replace Twitter Card tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);

  // 6. Clean and Replace Hreflang Tags
  // Remove existing homepage hreflang tags
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*/gi, '');

  // If route defines its own hreflangs, insert them before </head>
  if (route.hreflangs && route.hreflangs.length > 0) {
    const hreflangTags = route.hreflangs
      .map((h) => `    <link rel="alternate" hreflang="${h.lang}" href="${h.url}" />`)
      .join('\n');
    html = html.replace('</head>', `${hreflangTags}\n  </head>`);
  }

  // 7. Inject Route-Specific JSON-LD Schema
  const schemaObj = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': route.path.includes('about')
          ? 'AboutPage'
          : route.path.includes('contact')
          ? 'ContactPage'
          : route.path.includes('privacy') || route.path.includes('terms')
          ? 'WebPage'
          : 'WebApplication',
        name: route.title,
        description: route.description,
        url: canonicalUrl,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      ...(route.faqs && route.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: route.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  html = html.replace(
    /<script id="svgfav-jsonld-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="svgfav-jsonld-schema" type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n    </script>`
  );

  // 8. Construct & Inject Route-Specific Semantic Body inside <div id="root">
  const featuresHtml = (route.features || [])
    .map(
      (f) => `
          <div style="padding:24px;border:1px solid #e2e8f0;border-radius:16px;">
            <h3 style="font-size:1.2rem;font-weight:700;">${f.title}</h3>
            <p style="color:#64748b;font-size:0.9rem;">${f.desc}</p>
          </div>`
    )
    .join('');

  const stepsHtml = (route.steps || [])
    .map((s, idx) => `<li>${s}</li>`)
    .join('');

  const faqsHtml = (route.faqs || [])
    .map(
      (f) => `
            <h3 style="font-size:1.1rem;font-weight:600;margin-top:16px;">${f.q}</h3>
            <p style="color:#64748b;font-size:0.95rem;">${f.a}</p>`
    )
    .join('');

  const semanticBody = `
    <div id="root">
      <!-- Prerendered Semantic Skeleton for Search Crawlers -->
      <main style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:system-ui,-apple-system,sans-serif;">
        <header style="text-align:center;margin-bottom:30px;">
          <h1 style="font-size:2.5rem;font-weight:800;letter-spacing:-0.03em;">${route.h1 || route.title}</h1>
          <p style="font-size:1.1rem;color:#64748b;max-width:640px;margin:10px auto;">${route.h1Subtitle || route.description}</p>
        </header>

        ${featuresHtml ? `<section style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin:40px 0;">${featuresHtml}</section>` : ''}

        ${stepsHtml ? `<section style="margin:40px 0;">
          <h2 style="font-size:1.8rem;font-weight:700;text-align:center;">Quick Workflow Guide</h2>
          <ol style="margin-top:20px;color:#475569;line-height:1.8;">${stepsHtml}</ol>
        </section>` : ''}

        ${faqsHtml ? `<section style="margin:40px 0;">
          <h2 style="font-size:1.8rem;font-weight:700;text-align:center;">Frequently Asked Questions</h2>
          <div style="margin-top:20px;">${faqsHtml}</div>
        </section>` : ''}
      </main>
    </div>`;

  html = html.replace(/<div id="root">[\s\S]*?<\/main>\s*<\/div>/i, semanticBody.trim());

  // 9. Replace Noscript Fallback
  const noscriptHtml = `
    <noscript>
      <header>
        <h2>${route.h1 || route.title}</h2>
        <p>${route.description}</p>
      </header>
    </noscript>`;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptHtml.trim());

  // 1. Write as .html file (e.g. dist/about-us.html)
  const htmlFilePath = path.join(distDir, `${route.path}.html`);
  fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
  fs.writeFileSync(htmlFilePath, html, 'utf-8');

  // 2. Also write as /index.html (e.g. dist/about-us/index.html)
  const targetDir = path.join(distDir, route.path);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');

  count++;
}

console.log(`Successfully pre-rendered ${count} rich route entry points.`);
