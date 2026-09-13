export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect all *.pages.dev subdomains to the primary custom domain https://svgfav.com
    if (url.hostname.endsWith('.pages.dev')) {
      url.hostname = 'svgfav.com';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // Safeguard: Ensure /robots.txt is served cleanly as text/plain without HTML injection
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

    return env.ASSETS.fetch(request);
  }
};
