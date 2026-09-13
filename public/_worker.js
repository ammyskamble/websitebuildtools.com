// Mapping of high-priority routes to their SEO titles, descriptions, and canonicals
const ROUTE_METADATA = {
  '/png-to-svg': {
    title: 'Free PNG to SVG Converter (Client-Side) — SvgFav',
    description: 'Convert PNG to SVG vector free online with zero server uploads. High-precision vectorizer for logos, sketches, Cricut cut files, and graphics.',
  },
  '/convert/png-to-svg': {
    title: 'Free PNG to SVG Converter (Client-Side) — SvgFav',
    description: 'Convert PNG to SVG vector free online with zero server uploads. High-precision vectorizer for logos, sketches, Cricut cut files, and graphics.',
  },
  '/jpg-to-svg': {
    title: 'Free JPG to SVG Converter (Client-Side) — SvgFav',
    description: 'Convert JPG to SVG vector free online with zero server uploads. Trace photos, sketches, and logos into infinitely scalable vectors.',
  },
  '/convert/jpg-to-svg': {
    title: 'Free JPG to SVG Converter (Client-Side) — SvgFav',
    description: 'Convert JPG to SVG vector free online with zero server uploads. Trace photos, sketches, and logos into infinitely scalable vectors.',
  },
  '/image-to-svg': {
    title: 'Universal Image to SVG Vectorizer (Client-Side) — SvgFav',
    description: 'Convert any image (PNG, JPG, WebP) to clean SVG vectors for Cricut Design Space, Glowforge laser cutters, and embroidery machines.',
  },
  '/convert/image-to-svg': {
    title: 'Universal Image to SVG Vectorizer (Client-Side) — SvgFav',
    description: 'Convert any image (PNG, JPG, WebP) to clean SVG vectors for Cricut Design Space, Glowforge laser cutters, and embroidery machines.',
  },
  '/svg-to-jpg': {
    title: 'Convert SVG to High-Quality JPG with Solid Background | SvgFav',
    description: 'Convert SVG vectors to JPG with custom background colors and quality tuning. 100% client-side conversion with zero server uploads and sub-pixel quality.',
  },
  '/convert/svg-to-jpg': {
    title: 'Convert SVG to High-Quality JPG with Solid Background | SvgFav',
    description: 'Convert SVG vectors to JPG with custom background colors and quality tuning. 100% client-side conversion with zero server uploads and sub-pixel quality.',
  },
  '/svg-to-ico': {
    title: 'Convert SVG to Multi-Size Favicon ICO (16, 32, 48px) | SvgFav',
    description: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads and crisp alpha transparency.',
  },
  '/convert/svg-to-ico': {
    title: 'Convert SVG to Multi-Size Favicon ICO (16, 32, 48px) | SvgFav',
    description: 'Convert SVG to real binary multi-resolution .ico favicon files (16x16, 32x32, 48x48) in your browser with zero server uploads and crisp alpha transparency.',
  },
  '/svg-to-data-uri': {
    title: 'Convert SVG to CSS Data URI & Base64 Online | SvgFav',
    description: 'Convert SVG to optimized CSS background-image Data URIs and clean Base64 strings. UTF-8 URL encoded with zero file weight waste.',
  },
  '/convert/svg-to-data-uri': {
    title: 'Convert SVG to CSS Data URI & Base64 Online | SvgFav',
    description: 'Convert SVG to optimized CSS background-image Data URIs and clean Base64 strings. UTF-8 URL encoded with zero file weight waste.',
  },
  '/svg-to-astro': {
    title: 'Convert SVG to Astro Component Online | SvgFav',
    description: 'Transform SVG markup into production-ready .astro components with prop forwarding, TypeScript interfaces, and zero bundle bloat.',
  },
  '/convert/svg-to-astro': {
    title: 'Convert SVG to Astro Component Online | SvgFav',
    description: 'Transform SVG markup into production-ready .astro components with prop forwarding, TypeScript interfaces, and zero bundle bloat.',
  },
  '/tools/favicon-generator': {
    title: 'Free Favicon Generator & Converter | SvgFav',
    description: 'Generate multi-platform favicon packs (ICO, Apple Touch, Android Chrome, SVG) in seconds directly in your browser.',
  },
  '/favicon-generator': {
    title: 'Free Favicon Generator & Converter | SvgFav',
    description: 'Generate multi-platform favicon packs (ICO, Apple Touch, Android Chrome, SVG) in seconds directly in your browser.',
  },
  '/tools/svg-optimizer': {
    title: 'Free SVG Optimizer & Minifier (Client-Side) | SvgFav',
    description: 'Clean, minify, and optimize SVG code directly in your browser. Remove unnecessary metadata, comments, and redundant nodes.',
  },
  '/svg-optimizer': {
    title: 'Free SVG Optimizer & Minifier (Client-Side) | SvgFav',
    description: 'Clean, minify, and optimize SVG code directly in your browser. Remove unnecessary metadata, comments, and redundant nodes.',
  },
  '/tools/logo-maker': {
    title: 'Free Vector Logo Maker & Studio | SvgFav',
    description: 'Create modern vector logos, icons, and marks right in your browser with instant SVG and high-resolution PNG export.',
  },
  '/picsvg-alternative': {
    title: 'Best Picsvg Alternative — Ad-Free, No 4MB Limit & 100% Private | SvgFav',
    description: 'Looking for a Picsvg alternative? SvgFav offers ad-free in-browser SVG vectorization with no 4MB limit and zero server uploads.',
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

    return rewriter.transform(indexResponse);
  }
};

