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

export const SpanishHomePage: React.FC = () => {
  const navigate = useNavigate();

  // Filtrar FAQs en español
  const esFaqs = SEO_FAQS.filter((f) => f.language === 'es');

  const rawSchemaGraph = [
    {
      '@type': 'WebApplication',
      '@id': 'https://svgfav.com/es/#webapp',
      name: 'SvgFav Estudio Vectorial y Favicon en Español',
      url: 'https://svgfav.com/es/',
      inLanguage: 'es-ES',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requiere soporte para HTML5 Canvas y WebAssembly',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Conversión client-side de PNG y JPG a SVG en el navegador',
        'Generador de favicons multi-resolución (.ICO y PWA)',
        'Optimizador y limpiador de código SVG',
        'Exportador de SVG a PNG en alta resolución',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://svgfav.com/es/#faq',
      mainEntity: esFaqs.map((faq) => ({
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
    { lang: 'fr', url: 'https://svgfav.com/fr/' },
    { lang: 'es', url: 'https://svgfav.com/es/' },
    { lang: 'x-default', url: 'https://svgfav.com/' },
  ];

  return (
    <div className="w-full space-y-16">
      <SeoHead
        title="SvgFav.com — Convertidor SVG y Generador de Favicon Gratis Online"
        description="Convertidor SVG y generador de favicons online gratis. Convierte PNG a SVG, JPG a SVG y crea paquetes de favicons 100% en el navegador con privacidad total."
        keywords="convertidor svg, png a svg, jpg a svg, svg a png, que es un archivo svg, crear favicon, favicon generator, vectorizador online"
        canonicalUrl="https://svgfav.com/es/"
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
              <span>Motor Vectorial y de Favicon de Nueva Generación</span>
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              <span className="text-slate-400">100% en el Navegador</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Crea, optimiza y convierte <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                vectores directamente en tu navegador.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Diseña logotipos, genera paquetes de favicon.ico para producción web, limpia archivos SVG y vectoriza imágenes de mapa de bits localmente. Rápido, gratuito y 100% privado.
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
            Tu suite vectorial completa sin instalaciones
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Sin suscripciones. Sin subir archivos a servidores. Todo se procesa de forma segura en tu propio ordenador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: PNG a SVG */}
          <div className="glass-card rounded-2xl p-6 border border-brand-500/30 flex flex-col justify-between group hover:border-brand-500/60 transition-all bg-gradient-to-b from-brand-500/5 to-transparent relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                Convertidor PNG a SVG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Vectoriza logotipos, bocetos y siluetas en curvas matemáticas Bézier mediante detección de bordes local en WebAssembly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">100% en el Navegador</span>
              <Link to="/png-to-svg" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Vectorizar</span>
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
                Suite Generadora de Favicon
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Genera archivos binarios reales <code className="text-brand-600 dark:text-brand-300">favicon.ico</code>, iconos Apple Touch y manifiestos PWA para Android.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Paquete ZIP</span>
              <Link to="/favicon-generator" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Crear Favicon</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Optimizador SVG */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-violet-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileImage className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                Optimizador y Limpiador SVG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Elimina metadatos innecesarios de Illustrator e Inkscape, redondea coordenadas y reduce el peso del archivo hasta un 60%.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold">Alternativa SVGOMG</span>
              <Link to="/svg-optimizer" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                <span>Limpiar Código</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: SVG a PNG */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                Rasterizador SVG a PNG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Convierte gráficos vectoriales en imágenes PNG transparentes de alta resolución hasta 300 DPI y 4K para impresión y web.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Hasta 300 DPI</span>
              <Link to="/" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Convertir a PNG</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />

      {/* SPANISH KNOWLEDGE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-dark-border space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-400 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Tecnología Vectorial y Favicons en Español</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Guía Completa: Formato SVG, Vectorización y Favicons
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              Bienvenido a <strong>SvgFav.com</strong>, la suite 100% en el navegador para <strong>conversión de vectores</strong> y generación de favicons. A diferencia de convertidores online tradicionales, tus archivos confidenciales nunca salen de tu ordenador: todo el procesamiento se ejecuta localmente mediante HTML5 Canvas y WebAssembly.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <FileImage className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>1. ¿Qué es un archivo SVG y cuáles son sus ventajas?</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              El formato <strong>SVG (Scalable Vector Graphics)</strong> es el estándar abierto de gráficos vectoriales mantenido por el W3C. A diferencia de los mapas de bits (PNG, JPG) compuestos por una cuadrícula estática de píxeles, un SVG almacena coordenadas geométricas, curvas y trazados en código XML. Esto permite escalar una imagen al infinito sin pixelación ni desenfoque, tanto en pantallas móviles Retina como en vallas publicitarias de gran formato.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>2. Privacidad Absoluta y Conformidad con el RGPD</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              En cumplimiento del Reglamento General de Protección de Datos (RGPD), SvgFav opera bajo el principio de privacidad por diseño. Tus logotipos corporativos, bocetos y diseños jamás se transfieren a la nube ni se almacenan en cachés externas.
            </p>
          </div>
        </article>
      </section>

      {/* FAQs en Español */}
      <FaqAccordion
        title="Preguntas Frecuentes (FAQ) y Especificaciones Técnicas"
        description="Respuestas detalladas sobre conversión vectorial, resolución DPI y privacidad en el navegador."
        items={esFaqs}
      />
    </div>
  );
};
