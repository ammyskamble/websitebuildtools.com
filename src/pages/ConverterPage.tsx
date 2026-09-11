import React from 'react';
import { UniversalConverter } from '../components/converters/UniversalConverter';
import type { ConverterMode } from '../components/converters/UniversalConverter';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';

interface ConverterPageProps {
  mode: ConverterMode;
}

export const ConverterPage: React.FC<ConverterPageProps> = ({ mode }) => {
  const contentConfig: Record<
    ConverterMode,
    {
      guideTitle: string;
      steps: { title: string; desc: string }[];
      faqs: { question: string; answer: string }[];
    }
  > = {
    'svg-to-png': {
      guideTitle: 'How to convert SVG to High-Resolution PNG with transparency',
      steps: [
        {
          title: 'Drag & Drop Vectors',
          desc: 'Drop one or multiple SVG files into the dropzone. You can process an entire batch at once.',
        },
        {
          title: 'Set DPI Scale & Background',
          desc: 'Choose from 1x, 2x, 4x, or 8x (up to 4096px). Toggle transparent alpha or pick a solid background color.',
        },
        {
          title: 'Instant Download',
          desc: 'Click Convert All. Download individual high-DPI PNGs or export the entire bundle as a single ZIP.',
        },
      ],
      faqs: [
        {
          question: 'Why convert SVG to PNG if SVG is already scalable?',
          answer:
            'While SVG is ideal for web code, many platforms (such as OpenGraph preview cards, social media headers, email newsletters, and legacy image viewers) do not support SVG rendering and require high-DPI PNGs.',
        },
        {
          question: 'Can I export ultra high-resolution 4K or 8K images?',
          answer:
            'Yes! With the 4x and 8x DPI multipliers, VectorForge rasterizes vectors up to 4096x4096px with anti-aliasing directly on your GPU canvas.',
        },
      ],
    },
    'svg-to-jpg': {
      guideTitle: 'How to convert SVG to JPG with solid background fill',
      steps: [
        {
          title: 'Upload Vector Graphics',
          desc: 'Select your SVG files. JPG format does not support transparency, so a background color is required.',
        },
        {
          title: 'Choose Background Color',
          desc: 'Pick your background filler (white, black, or brand color) and adjust the compression quality slider.',
        },
        {
          title: 'Export Compressed JPGs',
          desc: 'Save individual files or bulk export a ZIP archive with zero quality loss.',
        },
      ],
      faqs: [
        {
          question: 'Why does JPG require a background color?',
          answer:
            'The JPEG image format specification does not have an alpha (transparency) channel. VectorForge automatically blends your vector onto a solid fill color of your choice.',
        },
        {
          question: 'How does the quality slider affect file size?',
          answer:
            'Setting quality to 85-92% reduces file size by over 60% with virtually indistinguishable visual difference for digital displays.',
        },
      ],
    },
    'svg-to-ico': {
      guideTitle: 'How to convert SVG to multi-size Windows ICO files',
      steps: [
        {
          title: 'Select Vector or Logo',
          desc: 'Upload an SVG logo or icon file. The binary encoder will create 16x16, 32x32, and 48x48 versions.',
        },
        {
          title: 'Multi-Resolution Embedding',
          desc: 'VectorForge renders each frame with crisp anti-aliasing and packages them into a single .ico binary.',
        },
        {
          title: 'Download & Deploy',
          desc: 'Save your favicon.ico file and place it in the root directory of your website for universal browser support.',
        },
      ],
      faqs: [
        {
          question: 'What is a multi-resolution ICO file?',
          answer:
            'A true .ico container holds multiple bitmap frames (16x16 for browser tabs, 32x32 for high-DPI retina bookmarks, 48x48 for desktop shortcuts). Windows and browsers automatically pick the sharpest size.',
        },
        {
          question: 'Is this a fake renamed PNG or real binary ICO?',
          answer:
            'VectorForge constructs a valid binary ICO header, directory index, and embedded image chunks compliant with the Microsoft Windows ICO file format specification.',
        },
      ],
    },
    'png-to-svg': {
      guideTitle: 'How to vectorize raster PNG images into SVG paths',
      steps: [
        {
          title: 'Upload Image or Drawing',
          desc: 'Upload a black & white logo, icon, sketch, or silhouette PNG/JPG image.',
        },
        {
          title: 'Tune Tracing Threshold',
          desc: 'Adjust the luminance threshold and smoothing sliders to dial in the edge precision and contour curvature.',
        },
        {
          title: 'Export Vector SVG',
          desc: 'Download clean vector path code ready to scale infinitely in Figma, Illustrator, or web code.',
        },
      ],
      faqs: [
        {
          question: 'How does the client-side vectorizer work?',
          answer:
            'The algorithm loads your image onto an offscreen canvas, runs luminance thresholding to separate foreground from background, and builds polygon path data (<path d="..." fill-rule="evenodd" />) in real time.',
        },
        {
          question: 'What type of images produce the best vectorization results?',
          answer:
            'High-contrast logos, black & white line drawings, icons, signatures, and glyphs produce the cleanest vector results.',
        },
      ],
    },
    'svg-to-data-uri': {
      guideTitle: 'How to convert SVG into CSS background-image Data URIs',
      steps: [
        {
          title: 'Select or Paste SVG',
          desc: 'Upload an SVG file or paste raw vector markup.',
        },
        {
          title: 'Choose URL-Encoded or Base64',
          desc: 'URL-encoded is smaller and gzip-friendly. Base64 is useful for older CSS preprocessors.',
        },
        {
          title: '1-Click Copy Code',
          desc: 'Copy ready-to-use CSS background-image or HTML <img> markup directly to your clipboard.',
        },
      ],
      faqs: [
        {
          question: 'Why use a Data URI instead of an external SVG file?',
          answer:
            'Data URIs embed the vector graphic directly into your CSS or HTML stylesheet, eliminating an extra HTTP network request and preventing layout shift or flickering during page load.',
        },
        {
          question: 'Should I choose URL-encoded or Base64?',
          answer:
            'URL-encoded (data:image/svg+xml;utf8,...) is almost always recommended because it is ~30% smaller than Base64 and can be gzipped and inspected easily.',
        },
      ],
    },
  };

  const currentConfig = contentConfig[mode];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Active Tool */}
      <UniversalConverter key={mode} initialMode={mode} />

      {/* SEO Step-by-Step Instructions */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block mb-2">
            Step-by-Step Instructions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {currentConfig.guideTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            No server uploads, zero queue wait times, and maximum privacy with browser-native canvas execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {currentConfig.steps.map((step, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-dark-border">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="font-bold text-white text-base">{step.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix */}
      <ComparisonTable />

      {/* FAQs */}
      <FaqAccordion
        title="Technical Format FAQs"
        description="Everything you need to know about vector rendering, file sizes, and browser support."
        items={currentConfig.faqs}
      />
    </div>
  );
};
