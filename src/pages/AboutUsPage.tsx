import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Cpu, Zap, Shield, Heart, Globe, Users, Code, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { normalizeLang, getCanonicalUrl, getHreflangAlternates } from '../lib/i18n';

export const AboutUsPage: React.FC = () => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = normalizeLang(lang);
  const canonicalUrl = getCanonicalUrl('about-us', currentLang);
  const hreflangs = getHreflangAlternates('about-us');

  const contentByLang = {
    en: {
      title: 'About Us | SvgFav.com — The Privacy-First Vector & Favicon Studio',
      metaDesc: 'Learn about SvgFav.com. Our mission is to provide free, private, high-performance vector conversion and favicon engineering 100% in-browser without server uploads.',
      heading: 'About SvgFav.com',
      subtitle: 'Building the open web’s fastest, most private vector and favicon studio.',
      missionTitle: 'Our Mission',
      missionText: 'SvgFav.com was created to solve a persistent frustration with modern creative web utilities: bloated online converters plagued by paywalls, 4MB file limits, invasive ads, and security risks from uploading private assets to remote servers. We engineered SvgFav from the ground up as a 100% client-side studio where vectorization, ICO binary encoding, and SVG optimization execute directly in your browser memory.',
      pillars: [
        {
          icon: Shield,
          title: 'Zero Server Storage',
          desc: 'We never upload, cache, or inspect your files. Your company logos, client artwork, and private assets stay strictly on your local machine.'
        },
        {
          icon: Zap,
          title: 'Zero Latency & Instant Feedback',
          desc: 'Powered by HTML5 Canvas, WebAssembly, and local GPUs, vector conversions update in real-time as you drag sliders.'
        },
        {
          icon: Globe,
          title: 'Global Edge Architecture',
          desc: 'Distributed via Cloudflare Pages edge locations across the United States, India, Germany, France, Canada, Australia, and Brazil.'
        },
        {
          icon: Code,
          title: 'Production-Ready Code',
          desc: 'We do not just output images; we generate genuine Windows multi-frame ICO binaries, Astro components, CSS Data URIs, and PWA manifests.'
        }
      ]
    },
    de: {
      title: 'Über uns | SvgFav.com — Das datenschutzfreundliche Vektor-Studio',
      metaDesc: 'Erfahren Sie mehr über SvgFav.com. Unsere Mission: Schnelle, kostenfreie Vektorkonvertierung und Favicon-Erstellung direkt im Browser ohne Server-Uploads.',
      heading: 'Über SvgFav.com',
      subtitle: 'Das datenschutzfreundliche Studio für Vektoren, Favicons und moderne Webgrafiken.',
      missionTitle: 'Unsere Philosophie',
      missionText: 'Herkömmliche Konverter verlangen oft Gebühren, begrenzen Dateigrößen oder laden Ihre privaten Entwürfe auf ungesicherte Cloud-Server hoch. SvgFav.com eliminiert diese Probleme vollständig durch 100% clientseitige Berechnung. Alle Algorithmen zur Vektorisierung und ICO-Generierung laufen lokal in Ihrem Browser.',
      pillars: [
        {
          icon: Shield,
          title: 'DSGVO-konform durch Design',
          desc: 'Keine Speicherung auf externen Servern. Höchste Sicherheit für Unternehmens- und Kundendaten.'
        },
        {
          icon: Zap,
          title: 'Echtzeit-Berechnung',
          desc: 'Verarbeitung mit WebAssembly und Canvas ohne zeitraubende Upload-Warteschlangen.'
        },
        {
          icon: Globe,
          title: 'Globale Verfügbarkeit',
          desc: 'High-Speed Auslieferung über das Cloudflare Edge-Netzwerk in Europa und weltweit.'
        },
        {
          icon: Code,
          title: 'Entwickler-Standards',
          desc: 'Multi-Frame .ICO Dateien, Astro-Komponenten und sauberes SVG ohne Illustrator-Ballast.'
        }
      ]
    },
    pt: {
      title: 'Sobre Nós | SvgFav.com — Estúdio Vetorial Seguro e Gratuito',
      metaDesc: 'Conheça a história e tecnologia por trás do SvgFav.com. Conversão de imagens em SVG e criação de favicons 100% no navegador sem uploads para servidores.',
      heading: 'Sobre a SvgFav.com',
      subtitle: 'O estúdio de vetores e favicons mais rápido e seguro da web moderna.',
      missionTitle: 'Nossa Missão',
      missionText: 'A SvgFav.com nasceu com o objetivo de democratizar o acesso a ferramentas gráficas de alto padrão sem exigir pagamentos, cadastros ou expor a privacidade dos usuários. Todo o processamento vetorial, desde a conversão de PNG em SVG até a geração de pacotes completos de favicon, ocorre localmente na memória do seu navegador.',
      pillars: [
        {
          icon: Shield,
          title: '100% no Navegador',
          desc: 'Arquivos confidenciais, logotipos de clientes e projetos gráficos nunca saem do seu computador.'
        },
        {
          icon: Zap,
          title: 'Velocidade Instantânea',
          desc: 'Sem filas de processamento. Ajustes em tempo real com renderização via GPU local.'
        },
        {
          icon: Globe,
          title: 'Suporte Internacional',
          desc: 'Infraestrutura acelerada via Cloudflare com baixa latência no Brasil e no mundo.'
        },
        {
          icon: Code,
          title: 'Pronto para Produção',
          desc: 'Gere arquivos .ico reais, componentes Astro, SVG inline e manifests para PWAs.'
        }
      ]
    },
    fr: {
      title: 'À Propos | SvgFav.com — Studio Vectoriel Local et Sécurisé',
      metaDesc: 'Découvrez SvgFav.com, l\'outil de conversion vectorielle et de génération de favicons exécuté 100% dans le navigateur sans transfert sur serveur.',
      heading: 'À Propos de SvgFav.com',
      subtitle: 'La boîte à outils vectorielle moderne, gratuite et respectueuse de votre vie privée.',
      missionTitle: 'Notre Vision',
      missionText: 'SvgFav.com a été conçu pour offrir aux développeurs et graphistes un utilitaire web performant, sans publicité invasive ni abonnement caché, avec une garantie technique absolue : aucun fichier n\'est jamais envoyé vers un serveur.',
      pillars: [
        {
          icon: Shield,
          title: 'Confidentialité Totale',
          desc: 'Traitement local en mémoire vive. Parfait pour les chartes graphiques sous accord de confidentialité.'
        },
        {
          icon: Zap,
          title: 'Performance Brute',
          desc: 'Moteur WebAssembly pour un traçage vectoriel ultra-rapide sans temps d\'attente.'
        },
        {
          icon: Globe,
          title: 'Réseau Edge Cloudflare',
          desc: 'Disponibilité maximale et latence minimale en France et à l\'international.'
        },
        {
          icon: Code,
          title: 'Exports Développeurs',
          desc: 'Fichiers ICO multi-résolutions, composants Astro et code SVG minifié.'
        }
      ]
    },
    es: {
      title: 'Sobre Nosotros | SvgFav.com — Estudio Vectorial en el Navegador',
      metaDesc: 'Conoce más sobre SvgFav.com. Conversión de vectores y generación de favicons 100% en el navegador sin subir archivos a servidores externos.',
      heading: 'Sobre SvgFav.com',
      subtitle: 'Herramientas vectoriales rápidas, gratuitas y privadas para creadores.',
      missionTitle: 'Nuestra Misión',
      missionText: 'En SvgFav.com creemos en herramientas web abiertas, accesibles y respetuosas con la privacidad del creador. Eliminamos la necesidad de subir archivos confidenciales a la nube.',
      pillars: [
        {
          icon: Shield,
          title: 'Privacidad Absoluta',
          desc: 'Tus archivos se procesan 100% en la memoria de tu dispositivo.'
        },
        {
          icon: Zap,
          title: 'Conversión al Instante',
          desc: 'Ajusta la suavidad de las curvas y visualiza los cambios sin demora.'
        },
        {
          icon: Globe,
          title: 'Distribución Global',
          desc: 'Desplegado en la red de alta velocidad de Cloudflare.'
        },
        {
          icon: Code,
          title: 'Calidad Profesional',
          desc: 'Iconos binarios ICO, vectores para corte láser y optimización web.'
        }
      ]
    }
  };

  const localized = contentByLang[currentLang] || contentByLang.en;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SeoHead
        title={localized.title}
        description={localized.metaDesc}
        canonicalUrl={canonicalUrl}
        hreflangAlternates={hreflangs}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Company', url: '/about-us' },
          { name: localized.heading, url: canonicalUrl }
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Company' },
          { name: localized.heading }
        ]}
      />

      <LanguageSelector currentLang={currentLang} baseSlug="about-us" />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Independent Web Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">{localized.heading}</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">{localized.subtitle}</p>
      </div>

      {/* Mission Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-10 border border-dark-border mb-12 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
          <span>{localized.missionTitle}</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{localized.missionText}</p>
      </div>

      {/* Architectural Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {localized.pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-dark-border space-y-3 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Tech Stack Spotlight */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-dark-border mb-12">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-4">
          <Terminal className="w-4 h-4" />
          <span>Engineered with Modern Open Web Standards</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-bg/60 border border-slate-200 dark:border-dark-border/60">
            <span className="font-bold text-slate-900 dark:text-white text-sm block">HTML5 Canvas</span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">GPU Vector Tracing</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-bg/60 border border-slate-200 dark:border-dark-border/60">
            <span className="font-bold text-slate-900 dark:text-white text-sm block">WebAssembly</span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">Near-native speeds</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-bg/60 border border-slate-200 dark:border-dark-border/60">
            <span className="font-bold text-slate-900 dark:text-white text-sm block">Cloudflare Pages</span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">Global Edge CDN</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-bg/60 border border-slate-200 dark:border-dark-border/60">
            <span className="font-bold text-slate-900 dark:text-white text-sm block">Astro Exporter</span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">Typed Components</span>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-900/40 via-purple-900/30 to-slate-900 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg font-bold text-white">Ready to convert or create your vector assets?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">100% free, no credit card, no registration.</p>
        </div>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-glow-sm shrink-0"
        >
          <span>Launch SvgFav Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
