import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface HreflangAlternate {
  lang: string;
  url: string;
}

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
  applicationCategory?: string;
  hreflangAlternates?: HreflangAlternate[];
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  howTo?: {
    name: string;
    description: string;
    steps: HowToStep[];
  };
  softwareApp?: {
    name: string;
    description: string;
    operatingSystem?: string;
    applicationCategory?: string;
    price?: string;
    ratingValue?: string;
    reviewCount?: string;
  };
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogImage,
  noindex,
  hreflangAlternates,
  breadcrumbs,
  faqs,
  howTo,
  softwareApp,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update or Create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 2b. Keywords Meta
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 2c. Robots Meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      'content',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Update Canonical Link
    const currentUrl = canonicalUrl || window.location.href.split('?')[0];
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 3b. Update hreflang tags
    // First remove previous dynamic hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    if (hreflangAlternates && hreflangAlternates.length > 0) {
      hreflangAlternates.forEach(alt => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', alt.lang);
        link.setAttribute('href', alt.url);
        document.head.appendChild(link);
      });
    }

    // 4. Update OpenGraph & Twitter Tags
    const ogImageSrc = ogImage || 'https://svgfav.com/og-image.png';
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': currentUrl,
      'og:type': 'website',
      'og:site_name': 'SvgFav.com',
      'og:image': ogImageSrc,
      'og:locale': 'en_US',
      'twitter:card': 'summary_large_image',
      'twitter:site': '@svgfav',
      'twitter:creator': '@svgfav',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImageSrc,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (property.startsWith('twitter:')) {
          tag.setAttribute('name', property);
        } else {
          tag.setAttribute('property', property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 4b. International Alternate Locales for Target Countries (US, IN, DE, FR, CA, AU, BR)
    const alternateLocales = ['en_IN', 'de_DE', 'fr_FR', 'pt_BR', 'en_CA', 'en_AU'];
    alternateLocales.forEach((locale) => {
      let localeTag = document.querySelector(`meta[property="og:locale:alternate"][content="${locale}"]`);
      if (!localeTag) {
        localeTag = document.createElement('meta');
        localeTag.setAttribute('property', 'og:locale:alternate');
        localeTag.setAttribute('content', locale);
        document.head.appendChild(localeTag);
      }
    });

    // 5. Inject JSON-LD Schema
    const scriptId = 'svgfav-jsonld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaGraph: any[] = [];

    // WebApplication / SoftwareApplication Schema
    if (softwareApp) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: softwareApp.name || 'SvgFav.com',
        description: softwareApp.description || description,
        url: currentUrl,
        applicationCategory: softwareApp.applicationCategory || 'DesignApplication',
        operatingSystem: softwareApp.operatingSystem || 'All',
        browserRequirements: 'Requires HTML5 Canvas and WebAssembly capable browser',
        offers: {
          '@type': 'Offer',
          price: softwareApp.price || '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: softwareApp.ratingValue || '4.9',
          ratingCount: softwareApp.reviewCount || '1420',
          bestRating: '5',
          worstRating: '1',
        },
      });
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // HowTo Schema
    if (howTo && howTo.steps.length > 0) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howTo.name,
        description: howTo.description,
        step: howTo.steps.map((s, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: s.name,
          text: s.text,
          url: s.url || currentUrl,
        })),
      });
    }

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url.startsWith('http') ? b.url : `${window.location.origin}${b.url}`,
        })),
      });
    }

    scriptTag.textContent = JSON.stringify(schemaGraph.length === 1 ? schemaGraph[0] : { '@graph': schemaGraph });

    return () => {
      // Cleanup script tag if component unmounts
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
      if (noindex && metaRobots) {
        metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      }
    };
  }, [title, description, canonicalUrl, keywords, ogImage, noindex, hreflangAlternates, breadcrumbs, faqs, howTo, softwareApp]);

  return null;
};
