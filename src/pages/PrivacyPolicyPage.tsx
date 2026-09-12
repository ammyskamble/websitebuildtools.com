import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Lock, EyeOff, Server, HardDrive, CheckCircle2, Globe, FileText } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { normalizeLang, getCanonicalUrl, getHreflangAlternates } from '../lib/i18n';

export const PrivacyPolicyPage: React.FC = () => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = normalizeLang(lang);
  const canonicalUrl = getCanonicalUrl('privacy-policy', currentLang);
  const hreflangs = getHreflangAlternates('privacy-policy');

  const contentByLang = {
    en: {
      title: 'Privacy Policy | SvgFav.com — Zero Server Uploads & Client-Side Privacy',
      metaDesc: 'SvgFav.com Privacy Policy. We operate 100% in your browser. No files are uploaded to our servers, ensuring total privacy, GDPR, LGPD, and CCPA compliance.',
      heading: 'Privacy Policy',
      subtitle: 'Your privacy is our core architectural principle. Files never leave your browser.',
      lastUpdated: 'Last Updated: September 12, 2026',
      introTitle: '1. The 100% In-Browser Client-Side Architecture',
      introText: 'Unlike traditional online converters that upload your artwork, logos, and proprietary assets to remote cloud servers, SvgFav.com processes everything locally on your machine. Raster vectorization, SVG optimization, and favicon binary generation execute purely in-memory via HTML5 Canvas, WebAssembly, and Web Workers. Zero bytes of your graphical data are ever transmitted to or stored on our servers.',
      sections: [
        {
          title: '2. Information We Do NOT Collect',
          items: [
            'No Image or Vector Files: Your uploaded images (PNG, JPG, SVG) and generated assets remain in temporary browser RAM and are immediately destroyed when you close the tab.',
            'No Personal Identification: We do not require registration, accounts, names, or passwords to use any conversion or export tool.',
            'No Payment Data: All features of SvgFav.com are 100% free with no credit card details requested.',
            'No Cross-Site Tracking: We do not use third-party behavioral cookies, browser fingerprinting, or invasive advertising pixels.'
          ]
        },
        {
          title: '3. Technical Server Logs & Edge Delivery',
          items: [
            'SvgFav.com is hosted on Cloudflare Pages global edge network.',
            'Standard anonymous network routing data (such as truncated IP address and HTTP user-agent header) may be temporarily processed by Cloudflare strictly for DDoS mitigation, edge routing, and network security in accordance with Cloudflare\'s privacy policies.',
            'We do not sell, rent, or monetize any server log data.'
          ]
        },
        {
          title: '4. International Compliance (GDPR, DSGVO, LGPD & CCPA)',
          items: [
            'European Union GDPR (DSGVO) & France RGPD: Because no personal data or files are harvested, SvgFav fulfills the highest standards of data minimization (Article 5) and privacy by design (Article 25).',
            'Brazil LGPD (Lei Geral de Proteção de Dados): Full compliance through zero collection of identifiable personal vectors or sensitive media.',
            'California CCPA/CPRA: SvgFav does not sell or share personal information with third parties for commercial gain.'
          ]
        },
        {
          title: '5. Browser Local Storage',
          items: [
            'We may store anonymous UI preferences (such as your chosen canvas theme, light/dark mode, or custom API key if you opt to use private Gemini models) in your browser\'s local localStorage. This data stays exclusively on your device.'
          ]
        }
      ]
    },
    de: {
      title: 'Datenschutzerklärung | SvgFav.com — Keine Server-Uploads & DSGVO-konform',
      metaDesc: 'Datenschutzerklärung von SvgFav.com. 100% clientseitige Verarbeitung im Browser. Keine Dateiübertragungen auf fremde Server. Vollständig DSGVO-konform.',
      heading: 'Datenschutzerklärung',
      subtitle: 'Datenschutz durch Design: Ihre Grafiken und Dateien verlassen niemals Ihren Computer.',
      lastUpdated: 'Zuletzt aktualisiert: 12. September 2026',
      introTitle: '1. 100% Client-basierte In-Browser Architektur',
      introText: 'Im Gegensatz zu herkömmlichen Online-Konvertern werden bei SvgFav.com weder Quell- noch Zieldateien auf externe Server hochgeladen. Die Vektorisierung, SVG-Optimierung und Erstellung von Favicon-Paketen erfolgen ausschließlich im Arbeitsspeicher Ihres Endgeräts mittels HTML5 Canvas und WebAssembly.',
      sections: [
        {
          title: '2. Daten, die wir NICHT erheben',
          items: [
            'Keine Bild- oder Vektordateien: Ihre Designs verbleiben lokal auf Ihrem Endgerät.',
            'Keine Benutzerkonten: Sie können alle Funktionen ohne Registrierung oder Angabe persönlicher Daten nutzen.',
            'Keine Zahlungsdaten: SvgFav.com ist kostenfrei.',
            'Keine Werbe-Tracker: Keine Third-Party Tracking-Cookies oder Werbepixel.'
          ]
        },
        {
          title: '3. Hosting & Cloudflare Edge CDN',
          items: [
            'Die Website wird über das Cloudflare Pages CDN bereitgestellt.',
            'Verbindungsdaten (wie gekürzte IP-Adressen) werden ausschließlich zur technischen Bereitstellung und DDoS-Abwehr verarbeitet.'
          ]
        },
        {
          title: '4. Einhaltung der DSGVO (GDPR)',
          items: [
            'Grundsatz der Datenminimierung nach Art. 5 DSGVO: Da keine Datenverarbeitung auf externen Servern stattfindet, ist Ihre Privatsphäre technisch garantiert.',
            'Rechte der betroffenen Personen: Da keine personenbezogenen Daten gespeichert werden, entfällt das Risiko von Datenschutzverletzungen.'
          ]
        }
      ]
    },
    pt: {
      title: 'Política de Privacidade | SvgFav.com — 100% no Navegador & LGPD',
      metaDesc: 'Política de Privacidade da SvgFav.com. Processamento 100% local no seu navegador. Zero uploads para servidores externos, em conformidade com a LGPD e GDPR.',
      heading: 'Política de Privacidade',
      subtitle: 'Privacidade em primeiro lugar: seus arquivos nunca saem do seu dispositivo.',
      lastUpdated: 'Última atualização: 12 de setembro de 2026',
      introTitle: '1. Arquitetura 100% Local no Navegador',
      introText: 'A SvgFav.com opera com uma filosofia técnica estrita de privacidade absoluta. A conversão de imagens em SVG, a otimização de vetores e a geração de favicons ocorrem inteiramente dentro do seu navegador via HTML5 Canvas e WebAssembly. Seus arquivos nunca são enviados a servidores remotos.',
      sections: [
        {
          title: '2. Dados que NÃO Coletamos',
          items: [
            'Nenhum arquivo gráfico: Imagens e vetores são mantidos apenas na memória temporária do seu dispositivo.',
            'Sem cadastro ou login: Todas as ferramentas estão disponíveis gratuitamente sem solicitação de email ou senha.',
            'Sem rastreamento invasivo: Não vendemos dados nem utilizamos cookies de rastreamento de terceiros.'
          ]
        },
        {
          title: '3. Conformidade com a LGPD (Lei Geral de Proteção de Dados)',
          items: [
            'Atendimento integral aos princípios de finalidade, adequação e necessidade estabelecidos pela Lei nº 13.709/2018.',
            'Garantia de que dados confidenciais de clientes, designs de marcas e documentos vetoriais permanecem sob custódia exclusiva do usuário.'
          ]
        }
      ]
    },
    fr: {
      title: 'Politique de Confidentialité | SvgFav.com — Conforme RGPD',
      metaDesc: 'Politique de confidentialité de SvgFav.com. Traitement 100% local dans le navigateur sans transfert vers des serveurs distants. Conforme au RGPD européen.',
      heading: 'Politique de Confidentialité',
      subtitle: 'Vos fichiers ne quittent jamais votre navigateur. Traitement vectoriel 100% local.',
      lastUpdated: 'Dernière mise à jour: 12 septembre 2026',
      introTitle: '1. Traitement local sans transfert serveur',
      introText: 'SvgFav.com a été conçu dès l\'origine selon le principe du Privacy by Design. Toutes les opérations de conversion, vectorisation et génération de favicons s\'exécutent dans la mémoire de votre navigateur via HTML5 et WebAssembly.',
      sections: [
        {
          title: '2. Données non collectées',
          items: [
            'Aucune image ni vecteur n\'est téléversé vers un serveur tiers.',
            'Aucune inscription ni compte utilisateur requis.',
            'Zéro cookie publicitaire ou traceur de comportement.'
          ]
        },
        {
          title: '3. Conformité au RGPD Européen',
          items: [
            'Respect strict du principe de minimisation des données (Article 5 du RGPD).',
            'Infrastructure déployée sur le réseau Edge sécurisé de Cloudflare.'
          ]
        }
      ]
    },
    es: {
      title: 'Política de Privacidad | SvgFav.com — 100% en el Navegador',
      metaDesc: 'Política de privacidad de SvgFav.com. Conversión de vectores 100% en el navegador sin subir archivos a servidores externos.',
      heading: 'Política de Privacidad',
      subtitle: 'Tus imágenes y vectores nunca salen de tu ordenador. Máxima privacidad garantizada.',
      lastUpdated: 'Última actualización: 12 de septiembre de 2026',
      introTitle: '1. Procesamiento 100% Local en el Navegador',
      introText: 'SvgFav.com procesa todos los gráficos y vectores directamente en tu navegador mediante HTML5 Canvas y WebAssembly. No subimos tus archivos a servidores externos ni guardamos copias en la nube.',
      sections: [
        {
          title: '2. Información que NO recopilamos',
          items: [
            'No almacenamos tus archivos gráficos ni logotipos.',
            'No requerimos registro de usuarios ni tarjetas de crédito.',
            'No utilizamos cookies de rastreo comercial invasivo.'
          ]
        },
        {
          title: '3. Cumplimiento Legal Internacional',
          items: [
            'Totalmente compatible con las directivas europeas de protección de datos (RGPD / GDPR).',
            'Alojamiento optimizado en la red global de Cloudflare Pages.'
          ]
        }
      ]
    }
  };

  const localized = contentByLang[currentLang] || contentByLang.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SeoHead
        title={localized.title}
        description={localized.metaDesc}
        canonicalUrl={canonicalUrl}
        hreflangAlternates={hreflangs}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Legal', url: '/privacy-policy' },
          { name: localized.heading, url: canonicalUrl }
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Legal' },
          { name: localized.heading }
        ]}
      />

      {/* Language Switcher Bar */}
      <LanguageSelector currentLang={currentLang} baseSlug="privacy-policy" />

      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Zero Server Retention Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{localized.heading}</h1>
        <p className="text-sm text-slate-400 mt-2">{localized.subtitle}</p>
        <span className="inline-block text-xs text-slate-500 mt-2">{localized.lastUpdated}</span>
      </div>

      {/* Trust Highlights Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">100% In-Browser</h4>
          <p className="text-[11px] text-slate-400">All processing is done in client RAM. No server uploads.</p>
        </div>
        <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2">
            <EyeOff className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">No Tracking Cookies</h4>
          <p className="text-[11px] text-slate-400">We do not track you across the web or sell your data.</p>
        </div>
        <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center mb-2">
            <Globe className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">GDPR & LGPD Ready</h4>
          <p className="text-[11px] text-slate-400">Built to comply with the strictest global data standards.</p>
        </div>
      </div>

      {/* Main Content Body */}
      <article className="space-y-8 text-sm text-slate-300 leading-relaxed">
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-dark-border space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>{localized.introTitle}</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">{localized.introText}</p>
        </section>

        {localized.sections.map((section, idx) => (
          <section key={idx} className="glass-card rounded-2xl p-6 sm:p-8 border border-dark-border space-y-4">
            <h2 className="text-lg font-bold text-white">{section.title}</h2>
            <ul className="space-y-2.5">
              {section.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Contact Strip */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900/30 to-violet-900/30 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Have questions about your privacy or data?</h3>
            <p className="text-xs text-slate-400 mt-1">Our engineering team is always transparent about how client-side code runs.</p>
          </div>
          <Link
            to="/contact-us"
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shrink-0 transition-colors shadow-sm shadow-brand-500/30"
          >
            Contact Privacy Officer
          </Link>
        </div>
      </article>
    </div>
  );
};
