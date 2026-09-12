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

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  applicationCategory?: string;
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

    // 3. Update Canonical Link
    const currentUrl = canonicalUrl || window.location.href.split('?')[0];
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 4. Update OpenGraph Tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': currentUrl,
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
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
    };
  }, [title, description, canonicalUrl, breadcrumbs, faqs, howTo, softwareApp]);

  return null;
};
