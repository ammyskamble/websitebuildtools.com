export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect all *.pages.dev subdomains to the primary custom domain https://svgfav.com
    if (url.hostname.endsWith('.pages.dev')) {
      url.hostname = 'svgfav.com';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
};
