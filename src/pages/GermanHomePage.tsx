import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Wand2, Zap, Cpu, ChevronRight, Globe, FileImage, ShieldCheck, CheckCircle2, ArrowRight, Lock, Layers
} from 'lucide-react';
import { LogoStudio } from '../components/studio/LogoStudio';
import { ComparisonTable } from '../components/ui/ComparisonTable';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { SeoHead } from '../components/seo/SeoHead';
import { SEO_FAQS } from '../data/seoFaqs';

export const GermanHomePage: React.FC = () => {
  const navigate = useNavigate();

  // Filter FAQs auf Deutsch
  const deFaqs = SEO_FAQS.filter((f) => f.language === 'de');

  const rawSchemaGraph = [
    {
      '@type': 'WebApplication',
      '@id': 'https://svgfav.com/de/#webapp',
      name: 'SvgFav Vektor- & Favicon-Studio',
      url: 'https://svgfav.com/de/',
      inLanguage: 'de-DE',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All',
      browserRequirements: 'Erfordert HTML5 Canvas und WebAssembly Unterstützung',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Clientseitige PNG zu SVG Konvertierung im Browser',
        'Multi-Auflösungs Favicon-Generator (.ICO & PWA)',
        'SVG-Optimierung und Bereinigung',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://svgfav.com/de/#faq',
      mainEntity: deFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  const hreflangAlternates = [
    { lang: 'en', url: 'https://svgfav.com/' },
    { lang: 'pt', url: 'https://svgfav.com/pt/' },
    { lang: 'de', url: 'https://svgfav.com/de/' },
    { lang: 'x-default', url: 'https://svgfav.com/' },
  ];

  return (
    <div className="w-full space-y-16">
      <SeoHead
        title="SvgFav.com — Kostenloser Online SVG-Konverter & Favicon Generator"
        description="Kostenloser Online SVG-Konverter und Favicon Generator. PNG zu SVG, JPG zu SVG konvertieren und Favicon-Pakete 100% im Browser erstellen. DSGVO-konform."
        keywords="was ist eine svg datei, was ist svg, ist svg eine vektordatei, PNG zu SVG, SVG-Datei, was ist ein favicon, favicon was ist das, Wie konvertiert man PNG in SVG, svg konvertieren"
        canonicalUrl="https://svgfav.com/de/"
        hreflangAlternates={hreflangAlternates}
        rawSchemaGraph={rawSchemaGraph}
      />

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-mesh-gradient pointer-events-none opacity-40 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-semibold mb-4 shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vektor- &amp; Favicon-Engine der nächsten Generation</span>
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              <span className="text-slate-400">100% im Browser</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Vektoren im Browser erstellen, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                optimieren &amp; konvertieren.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Erstellen Sie Logos, generieren Sie echte Favicon.ico-Pakete für moderne Webseiten, bereinigen Sie SVG-Dateien und vektorisieren Sie Pixelbilder direkt auf Ihrem Gerät. Privat, schnell und DSGVO-konform.
            </p>
          </div>

          {/* Interactive Sandbox Studio */}
          <div className="relative">
            <LogoStudio
              onExportFavicon={() => {
                navigate('/favicon-generator');
              }}
            />
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Ihre Vektor-Pipeline direkt im Browser
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Keine Abonnements. Keine Server-Uploads. Alles läuft lokal auf Ihrem Rechner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: PNG zu SVG */}
          <div className="glass-card rounded-2xl p-6 border border-brand-500/30 flex flex-col justify-between group hover:border-brand-500/60 transition-all bg-gradient-to-b from-brand-500/5 to-transparent relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                PNG zu SVG Konverter
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Vektorisieren Sie Schwarzweiß-Logos, Skizzen und Silhouetten in mathematische Pfade mit lokaler Kantenerkennung via WebAssembly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">100% Clientseitig</span>
              <Link to="/png-to-svg" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Vektorisieren</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Favicon Generator */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-brand-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                Favicon Generator Suite
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Erzeugen Sie echte binäre <code className="text-brand-600 dark:text-brand-300">favicon.ico</code>-Dateien, Apple Touch Icons und Android PWA Manifests mit Live-Vorschau im Browser-Tab.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">ZIP-Paket</span>
              <Link to="/favicon-generator" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Favicon erstellen</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: SVG Optimierer */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-violet-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileImage className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                SVG Optimierer &amp; Bereiniger
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Entfernen Sie überflüssige Illustrator-Metadaten, runden Sie Koordinatendezimalen und reduzieren Sie die Dateigröße um bis zu 60%.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold">SVGOMG Alternative</span>
              <Link to="/svg-optimizer" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                <span>Code bereinigen</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: SVG zu PNG */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                SVG zu PNG Rasterizer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Exportieren Sie Vektoren als hochauflösende transparente PNG-Grafiken bis zu 8x 4096px Ultra HD mit voller Schärfe.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Bis zu 4096px</span>
              <Link to="/svg-to-png" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Rasterisieren</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />

      {/* GERMAN KNOWLEDGE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-dark-border space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-400 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Vektortechnologie &amp; Favicon-Architektur auf Deutsch</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Der umfassende Leitfaden: Was ist eine SVG-Datei &amp; Favicon-Erstellung
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              Willkommen bei <strong>SvgFav.com</strong>, dem führenden 100% browserbasierten Studio für <strong>PNG zu SVG</strong> Vektorisierung und Favicon-Generierung. Im Gegensatz zu herkömmlichen Online-Diensten verlassen Ihre vertraulichen Grafiken niemals Ihren Rechner: Die gesamte Konvertierung erfolgt lokal im Arbeitsspeicher mittels HTML5 Canvas und WebAssembly.
            </p>
          </div>

          {/* Abschnitt 1: Was ist eine SVG-Datei */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <FileImage className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>1. Was ist eine SVG-Datei (SVG-Datei / ist SVG eine Vektordatei)?</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Viele Entwickler und Designer fragen: <strong>was ist eine svg datei</strong> oder <strong>was ist svg</strong>? SVG (Scalable Vector Graphics) ist der vom W3C standardisierte Webstandard für Vektorgrafiken. Im Gegensatz zu Rasterformaten (JPEG, PNG), die aus starren Pixelrastern bestehen und beim Vergrößern unscharf oder verpixelt werden, speichert eine <strong>SVG-Datei</strong> geometrische Formen, Bézier-Kurven und Koordinaten als XML-Code. Daher lässt sich eine Vektordatei verlustfrei auf jede Bildschirm- oder Druckgröße skalieren.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>PNG zu SVG (Wie konvertiert man PNG in SVG?)</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Laden Sie Ihr Logo oder eine Grafik hoch. Der browserbasierte Algorithmus erkennt Pixelübergänge und berechnet mathematische Vektorpfade in Echtzeit – ohne Upload-Wartezeiten oder 4MB-Größenbeschränkungen.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Schneideplotter &amp; Vektordesign (Cricut, Laser &amp; CNC)</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Für präzise Schnittlinien bei Plottern glättet SvgFav die Vektorkonturen automatisch, sodass saubere Einzellinien ohne Ruckeln oder doppelte Messerschnitte entstehen.
                </p>
              </div>
            </div>
          </div>

          {/* Abschnitt 2: Favicon Guide */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>2. Was ist ein Favicon &amp; Favicon: Was ist das?</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ein <strong>Favicon</strong> (kurz für "Favorite Icon") ist das kleine Markensymbol, das in Browser-Tabs, Lesezeichen, Chroniken und in den Google-Suchergebnissen angezeigt wird. Moderne Webstandards verlangen heute ein abgestimmtes Bündel:
            </p>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <p>• <strong>favicon.ico:</strong> Binäres Multi-Frame-Format (16x16, 32x32, 48x48 Pixel) für ältere Browser, Windows-Taskleisten und RSS-Reader.</p>
              <p>• <strong>favicon.svg:</strong> Gestochen scharf auf Retina-Displays mit automatischer Farbanpassung bei System-Dark-Mode.</p>
              <p>• <strong>apple-touch-icon.png:</strong> 180x180 Pixel für den iOS-Home-Bildschirm.</p>
            </div>
          </div>

          {/* Abschnitt 3: DSGVO */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>3. 100% DSGVO-Konformität: Privatsphäre durch Client-Side-Architektur</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Gemäß den strengen Vorgaben der europäischen Datenschutz-Grundverordnung (DSGVO) verarbeitet SvgFav alle Daten nach dem Prinzip "Privacy by Design" (Art. 25 DSGVO). Ihre vertraulichen Firmenlogos, Grafiken und Kundendaten werden niemals an externe Server übertragen oder in Cloud-Caches zwischengespeichert.
            </p>
          </div>
        </article>
      </section>

      {/* FAQs auf Deutsch */}
      <FaqAccordion
        title="Häufig gestellte Fragen (FAQ) &amp; Technische Spezifikationen"
        description="Detaillierte Antworten mit mathematischen Formeln und Schritt-für-Schritt-Anleitungen für Adobe Photoshop &amp; Illustrator."
        items={deFaqs}
      />
    </div>
  );
};
