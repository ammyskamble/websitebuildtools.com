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

export const FrenchHomePage: React.FC = () => {
  const navigate = useNavigate();

  // Filtrer les FAQs en français
  const frFaqs = SEO_FAQS.filter((f) => f.language === 'fr');

  const rawSchemaGraph = [
    {
      '@type': 'WebApplication',
      '@id': 'https://svgfav.com/fr/#webapp',
      name: 'SvgFav Studio Vectoriel & Générateur de Favicon en Français',
      url: 'https://svgfav.com/fr/',
      inLanguage: 'fr-FR',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All',
      browserRequirements: 'Nécessite le support HTML5 Canvas et WebAssembly',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Conversion vectorielle locale de PNG et JPG en SVG',
        'Générateur de favicon multi-résolutions (.ICO & PWA)',
        'Optimiseur et nettoyeur de code SVG',
        'Exportation haute résolution SVG vers PNG',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://svgfav.com/fr/#faq',
      mainEntity: frFaqs.map((faq) => ({
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
        title="SvgFav.com — Convertisseur SVG et Générateur de Favicon Gratuit en Ligne"
        description="Convertisseur SVG et générateur de favicons en ligne gratuit. Convertissez PNG en SVG, JPG en SVG et créez des packs favicon 100% dans votre navigateur. Privé et conforme RGPD."
        keywords="convertisseur svg, png en svg, jpg en svg, svg en png, qu'est-ce qu'un fichier svg, creer favicon, generateur favicon gratuit"
        canonicalUrl="https://svgfav.com/fr/"
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
              <span>Moteur Vectoriel &amp; Favicon Nouvelle Génération</span>
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              <span className="text-slate-400">100% dans le Navigateur</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Créez, optimisez et convertissez <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                vos vecteurs dans le navigateur.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Créez des logos, générez des packs de favicon.ico pour la production web, nettoyez vos fichiers SVG et vectorisez des images bitmap localement. Rapide, gratuit et respectueux du RGPD.
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
            Votre suite vectorielle sans installation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Sans abonnement. Sans téléversement distant. Tout s'exécute localement sur votre processeur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: PNG vers SVG */}
          <div className="glass-card rounded-2xl p-6 border border-brand-500/30 flex flex-col justify-between group hover:border-brand-500/60 transition-all bg-gradient-to-b from-brand-500/5 to-transparent relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                Convertisseur PNG en SVG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Vectorisez vos logos, croquis et silhouettes en tracés mathématiques Bézier par détection de contours en WebAssembly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">100% Côté Client</span>
              <Link to="/png-to-svg" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Vectoriser</span>
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
                Générateur de Favicon
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Créez de vrais fichiers binaires <code className="text-brand-600 dark:text-brand-300">favicon.ico</code>, icônes Apple Touch et manifestes PWA pour Android.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Pack ZIP</span>
              <Link to="/favicon-generator" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Créer Favicon</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Optimiseur SVG */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-violet-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileImage className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                Optimiseur et Nettoyeur SVG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Supprimez les métadonnées superflues d'Illustrator, arrondissez les coordonnées et réduisez le poids des fichiers jusqu'à 60%.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold">Alternative SVGOMG</span>
              <Link to="/svg-optimizer" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                <span>Nettoyer le Code</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: SVG vers PNG */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                Convertisseur SVG vers PNG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Exportez vos vecteurs en images PNG transparentes haute résolution jusqu'à 300 DPI et 4K pour l'impression et le web.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Jusqu'à 300 DPI</span>
              <Link to="/" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Convertir en PNG</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />

      {/* FRENCH KNOWLEDGE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-dark-border space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-400 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Technologie Vectorielle et Favicon en Français</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Guide Complet : Format SVG, Vectorisation et Favicons
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              Bienvenue sur <strong>SvgFav.com</strong>, le studio 100% dans le navigateur pour la <strong>conversion vectorielle</strong> et la génération de favicons. Contrairement aux services en ligne conventionnels, vos créations confidentielles ne quittent jamais votre ordinateur : tous les calculs s'opèrent localement via HTML5 Canvas et WebAssembly.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <FileImage className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>1. Qu'est-ce qu'un fichier SVG et quels sont ses avantages ?</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Le format <strong>SVG (Scalable Vector Graphics)</strong> est le standard ouvert pour les images vectorielles recommandé par le W3C. À la différence des formats matriciels (PNG, JPG) basés sur une grille fixe de pixels, un fichier SVG stocke des coordonnées géométriques, des courbes et des chemins en code XML. Cela garantit une mise à l'échelle infinie sans aucune perte de qualité ni flou de pixelisation.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>2. Confidentialité Totale et Conformité RGPD</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Conformément aux normes européennes du Règlement Général sur la Protection des Données (RGPD), SvgFav respecte le principe de "Privacy by Design". Vos logos d'entreprise, créations graphiques et fichiers clients ne sont jamais transmis à des serveurs distants ni enregistrés dans des bases de données.
            </p>
          </div>
        </article>
      </section>

      {/* FAQs en Français */}
      <FaqAccordion
        title="Foire Aux Questions (FAQ) &amp; Spécifications Techniques"
        description="Réponses détaillées sur la vectorisation d'images, les résolutions d'affichage et la confidentialité."
        items={frFaqs}
      />
    </div>
  );
};
