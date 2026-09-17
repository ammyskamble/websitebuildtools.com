// Mapping of high-priority routes to their SEO titles, descriptions, and canonicals
const ROUTE_METADATA = {
  '/png-to-svg': {
    title: 'Free PNG to SVG Converter (Client-Side) — SvgFav',
    description: 'Convert PNG to SVG vector free online with zero server uploads. High-precision vectorizer for logos, sketches, Cricut cut files, and graphics.',
  },
  '/jpg-to-svg': {
    title: 'Free JPG to SVG Converter (Client-Side) — SvgFav',
    description: 'Convert JPG to SVG vector free online with zero server uploads. Trace photos, sketches, and logos into infinitely scalable vectors.',
  },
  '/image-to-svg': {
    title: 'Universal Image to SVG Vectorizer (Client-Side) — SvgFav',
    description: 'Convert any image (PNG, JPG, WebP) to clean SVG vectors for Cricut Design Space, Glowforge laser cutters, and embroidery machines.',
  },
  '/svg-to-jpg': {
    title: 'Convert SVG to High-Quality JPG with Solid Background | SvgFav',
    description: 'Convert SVG vectors to JPG with custom background colors and quality tuning. 100% client-side conversion with zero server uploads and sub-pixel quality.',
  },
  '/svg-to-ico': {
    title: 'Convert SVG to Multi-Size Favicon ICO (16, 32, 48px) | SvgFav',
    description: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads and crisp alpha transparency.',
  },
  '/svg-to-data-uri': {
    title: 'Convert SVG to CSS Data URI & Base64 Online | SvgFav',
    description: 'Convert SVG to optimized CSS background-image Data URIs and clean Base64 strings. UTF-8 URL encoded with zero file weight waste.',
  },
  '/svg-to-astro': {
    title: 'Convert SVG to Astro Component Online | SvgFav',
    description: 'Transform SVG markup into production-ready .astro components with prop forwarding, TypeScript interfaces, and zero bundle bloat.',
  },
  '/convert': {
    title: 'Free Online Vector & Favicon Converters | SvgFav',
    description: 'High-speed browser-based SVG, PNG, JPG, and ICO converters with zero server uploads and complete privacy.',
  },
  '/favicon-generator': {
    title: 'Free Favicon Generator & Converter | SvgFav',
    description: 'Generate multi-platform favicon packs (ICO, Apple Touch, Android Chrome, SVG) in seconds directly in your browser.',
  },
  '/svg-optimizer': {
    title: 'Free SVG Optimizer & Minifier (Client-Side) | SvgFav',
    description: 'Clean, minify, and optimize SVG code directly in your browser. Remove unnecessary metadata, comments, and redundant nodes.',
  },
  '/tools/logo-maker': {
    title: 'Free Vector Logo Maker & Studio | SvgFav',
    description: 'Create modern vector logos, icons, and marks right in your browser with instant SVG and high-resolution PNG export.',
  },
  '/alternatives/picsvg': {
    title: 'Best Picsvg Alternative — Ad-Free, No 4MB Limit & 100% Private | SvgFav',
    description: 'Looking for a Picsvg alternative? SvgFav offers ad-free in-browser SVG vectorization with no 4MB limit and zero server uploads.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | SvgFav.com',
    description: 'Read the privacy policy for SvgFav.com. All vector processing, rasterization, and conversion happen 100% client-side in your browser.',
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | SvgFav.com',
    description: 'Terms and conditions governing the use of SvgFav.com free in-browser vector converters and favicon tools.',
  },
  '/about-us': {
    title: 'About SvgFav.com — Modern Client-Side Vector Studio',
    description: 'Learn about SvgFav.com, our mission to build private, ultra-fast client-side vector utilities, and the engineering behind our tools.',
  },
  '/contact-us': {
    title: 'Contact Us | SvgFav.com',
    description: 'Get in touch with the SvgFav.com team for inquiries, bug reports, feature requests, or partnership opportunities.',
  },
  '/studio': {
    title: 'SvgFav Vector Studio & Logo Suite (Client-Side)',
    description: 'Free in-browser vector & favicon studio. Convert PNG to SVG, generate multi-resolution favicon.ico packs, and optimize SVG code with zero server uploads.',
  },
  '/pt': {
    title: 'SvgFav.com — Conversor PNG para SVG e Gerador de Favicon Online',
    description: 'Conversor SVG online gratuito e gerador de favicon. Converta PNG em SVG, JPG em SVG e gere pacotes favicon.ico 100% no navegador com total privacidade.',
  },
  '/pt-br/conversor-svg-para-png': {
    title: 'Conversor SVG para PNG Grátis em Alta Resolução (300 DPI) | SvgFav',
    description: 'Converta arquivos SVG para PNG com fundo transparente ou sólido, resolução de até 300 DPI e conversão em lote. 100% privado no navegador.',
  },
  '/pt/conversor-png-para-svg': {
    title: 'Conversor PNG para SVG Grátis (100% no Navegador) — SvgFav',
    description: 'Converta imagens PNG para SVG vetor grátis diretamente no navegador. Sem upload para servidores, 100% privado e com precisão geométrica instantânea.',
  },
  '/pt/about-us': {
    title: 'Sobre Nós | SvgFav.com — Estúdio Vetorial Seguro e Gratuito',
    description: 'Conheça a história e tecnologia por trás do SvgFav.com. Conversão de imagens em SVG e criação de favicons 100% no navegador sem uploads para servidores.',
  },
  '/pt/contact-us': {
    title: 'Fale Conosco & Suporte | SvgFav.com — Central de Atendimento',
    description: 'Entre em contato com a equipe do SvgFav.com para tirar dúvidas sobre conversão vetorial, sugestões ou suporte técnico.',
  },
  '/pt/privacy-policy': {
    title: 'Política de Privacidade | SvgFav.com — 100% no Navegador e LGPD',
    description: 'Política de privacidade do SvgFav.com. Operamos 100% no navegador sem upload de arquivos para servidores externos. Conforme LGPD e GDPR.',
  },
  '/pt/terms-and-conditions': {
    title: 'Termos de Uso | SvgFav.com — Estúdio Vetorial Online Gratuito',
    description: 'Termos e condições do SvgFav.com. Propriedade intelectual 100% sua para uso comercial e pessoal de todos os vetores e favicons gerados.',
  },
  '/de': {
    title: 'SvgFav.com — Kostenloser Online SVG-Konverter & Favicon Generator',
    description: 'Kostenloser Online SVG-Konverter und Favicon Generator. PNG zu SVG, JPG zu SVG konvertieren und Favicon-Pakete 100% im Browser erstellen. DSGVO-konform.',
  },
  '/de/png-in-svg-umwandeln': {
    title: 'PNG in SVG umwandeln kostenlos online — SvgFav',
    description: 'Wandeln Sie PNG-Bilder und Fotos in scharfe SVG-Vektoren um. Ohne Registrierung, 100% im Browser und DSGVO-konform.',
  },
  '/de/about-us': {
    title: 'Über uns | SvgFav.com — Das datenschutzfreundliche Vektor-Studio',
    description: 'Erfahren Sie mehr über SvgFav.com. Unsere Mission: Schnelle, kostenfreie Vektorkonvertierung und Favicon-Erstellung direkt im Browser ohne Server-Uploads.',
  },
  '/de/contact-us': {
    title: 'Kontakt & Support | SvgFav.com — Hilfecenter & Entwickler-Support',
    description: 'Kontaktieren Sie das Team von SvgFav.com bei Fragen zu Vektorkonvertierung, Favicon-Erstellung, Fehlermeldungen oder Partnerschaften.',
  },
  '/de/privacy-policy': {
    title: 'Datenschutzerklärung | SvgFav.com — Keine Server-Uploads & DSGVO-konform',
    description: 'Datenschutzerklärung von SvgFav.com. 100% clientseitige Verarbeitung im Browser. Keine Dateiübertragungen auf fremde Server. Vollständig DSGVO-konform.',
  },
  '/de/terms-and-conditions': {
    title: 'Nutzungsbedingungen | SvgFav.com — Kostenloses Vektor-Studio',
    description: 'Nutzungsbedingungen von SvgFav.com. Sie behalten 100% der Urheberrechte an allen erstellten Vektoren und Favicons.',
  },
  '/es': {
    title: 'SvgFav.com — Convertidor SVG y Generador de Favicon Gratis Online',
    description: 'Convertidor SVG y generador de favicons online gratis. Convierte PNG a SVG, JPG a SVG y crea paquetes de favicons 100% en el navegador con privacidad total.',
  },
  '/fr': {
    title: 'SvgFav.com — Convertisseur SVG et Générateur de Favicon Gratuit en Ligne',
    description: 'Convertisseur SVG et générateur de favicons en ligne gratuit. Convertissez PNG en SVG, JPG en SVG et créez des packs favicon 100% dans votre navigateur. Privé et conforme RGPD.',
  },
};

class MetaRewriter {
  constructor(meta, canonicalUrl) {
    this.meta = meta;
    this.canonicalUrl = canonicalUrl;
  }

  element(element) {
    const tagName = element.tagName.toLowerCase();

    if (tagName === 'title' && this.meta?.title) {
      element.setInnerContent(this.meta.title);
    }

    if (tagName === 'meta') {
      const name = element.getAttribute('name')?.toLowerCase();
      const property = element.getAttribute('property')?.toLowerCase();

      if (name === 'description' && this.meta?.description) {
        element.setAttribute('content', this.meta.description);
      }
      if (property === 'og:title' && this.meta?.title) {
        element.setAttribute('content', this.meta.title);
      }
      if (property === 'og:description' && this.meta?.description) {
        element.setAttribute('content', this.meta.description);
      }
      if (property === 'og:url') {
        element.setAttribute('content', this.canonicalUrl);
      }
      if (name === 'twitter:title' && this.meta?.title) {
        element.setAttribute('content', this.meta.title);
      }
      if (name === 'twitter:description' && this.meta?.description) {
        element.setAttribute('content', this.meta.description);
      }
    }

    if (tagName === 'link') {
      const rel = element.getAttribute('rel')?.toLowerCase();
      if (rel === 'canonical') {
        element.setAttribute('href', this.canonicalUrl);
      }
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Redirect all *.pages.dev subdomains to the primary custom domain https://svgfav.com
    if (url.hostname.endsWith('.pages.dev')) {
      url.hostname = 'svgfav.com';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // 2. Canonical redirect for legacy /svg-to-png aliases to root
    const cleanPath = (url.pathname.length > 1 && url.pathname.endsWith('/'))
      ? url.pathname.slice(0, -1)
      : url.pathname;

    if (cleanPath === '/svg-to-png' || cleanPath === '/convert/svg-to-png') {
      return Response.redirect('https://svgfav.com/', 301);
    }

    const REDIRECT_MAP = {
      '/tools/favicon-generator': '/favicon-generator',
      '/tools/svg-optimizer': '/svg-optimizer',
      '/picsvg-alternative': '/alternatives/picsvg',
      '/converters': '/convert',
      '/convert/png-to-svg': '/png-to-svg',
      '/convert/jpg-to-svg': '/jpg-to-svg',
      '/convert/image-to-svg': '/image-to-svg',
      '/convert/svg-to-jpg': '/svg-to-jpg',
      '/convert/svg-to-ico': '/svg-to-ico',
      '/convert/svg-to-data-uri': '/svg-to-data-uri',
      '/convert/svg-to-astro': '/svg-to-astro',
    };
    if (REDIRECT_MAP[cleanPath]) {
      return Response.redirect(`https://svgfav.com${REDIRECT_MAP[cleanPath]}`, 301);
    }

    // 3. Safeguard: Ensure /robots.txt is served cleanly as text/plain without HTML injection
    if (url.pathname === '/robots.txt') {
      const assetRes = await env.ASSETS.fetch(request);
      const contentType = assetRes.headers.get('content-type') || '';
      if (assetRes.status === 200 && contentType.includes('text/plain')) {
        return assetRes;
      }
      return new Response(
`# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Disallow aggressive scrapers
User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: ClaudeBot
Disallow: /

# Sitemaps
Sitemap: https://svgfav.com/sitemap.xml
Sitemap: https://svgfav.com/sitemap_index.xml
`,
        {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
          },
        }
      );
    }

    // 4. Ensure sitemaps are served with correct XML Content-Type and caching
    if (url.pathname.endsWith('.xml')) {
      const sitemapRes = await env.ASSETS.fetch(request);
      if (sitemapRes.status === 200) {
        const newHeaders = new Headers(sitemapRes.headers);
        newHeaders.set('Content-Type', 'application/xml; charset=utf-8');
        newHeaders.set('Cache-Control', 'public, max-age=86400');
        return new Response(sitemapRes.body, {
          status: sitemapRes.status,
          headers: newHeaders,
        });
      }
      return sitemapRes;
    }

    // 5. Try fetching the asset directly
    const assetResponse = await env.ASSETS.fetch(request);

    // If the physical asset exists (e.g. static assets, images, icons, robots, exact HTML files)
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    // 6. SPA Route Fallback:
    // If status is 404, check if the request was for a missing static file with an extension
    const isStaticFile = /\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|json|xml|txt|woff|woff2|ttf|eot|wasm|map|webmanifest)$/i.test(url.pathname);
    if (isStaticFile) {
      return assetResponse;
    }

    // 7. For SPA routes (like /png-to-svg, /tools/favicon-generator, /pt, /de, etc.), fetch index.html
    const indexRequest = new Request(new URL('/', request.url), request);
    const indexResponse = await env.ASSETS.fetch(indexRequest);

    // If metadata exists or canonical is needed, rewrite head tags via HTMLRewriter
    const meta = ROUTE_METADATA[cleanPath];
    const canonicalUrl = `https://svgfav.com${cleanPath}`;

    const rewriter = new HTMLRewriter()
      .on('title', new MetaRewriter(meta, canonicalUrl))
      .on('meta[name="description"]', new MetaRewriter(meta, canonicalUrl))
      .on('meta[property="og:title"]', new MetaRewriter(meta, canonicalUrl))
      .on('meta[property="og:description"]', new MetaRewriter(meta, canonicalUrl))
      .on('meta[property="og:url"]', new MetaRewriter(meta, canonicalUrl))
      .on('meta[name="twitter:title"]', new MetaRewriter(meta, canonicalUrl))
      .on('meta[name="twitter:description"]', new MetaRewriter(meta, canonicalUrl))
      .on('link[rel="canonical"]', new MetaRewriter(meta, canonicalUrl));

    if (cleanPath !== '/' && cleanPath !== '') {
      rewriter.on('link[rel="alternate"][hreflang]', {
        element(e) {
          e.remove();
        },
      });
    }

    return rewriter.transform(indexResponse);
  }
};

