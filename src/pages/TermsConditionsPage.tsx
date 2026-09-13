import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, CheckCircle2, ShieldAlert, Award, Scale, HelpCircle } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { normalizeLang, getCanonicalUrl, getHreflangAlternates } from '../lib/i18n';

export const TermsConditionsPage: React.FC = () => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = normalizeLang(lang);
  const canonicalUrl = getCanonicalUrl('terms-and-conditions', currentLang);
  const hreflangs = getHreflangAlternates('terms-and-conditions');

  const contentByLang = {
    en: {
      title: 'Terms & Conditions | SvgFav.com — Free Online Vector Studio',
      metaDesc: 'Terms & Conditions for SvgFav.com. Free web utility for vector conversion and favicon generation. You retain 100% ownership of all created assets.',
      heading: 'Terms & Conditions',
      subtitle: 'Clear, creator-friendly terms. You retain 100% ownership of your work.',
      lastUpdated: 'Last Updated: September 12, 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          text: 'By accessing and utilizing SvgFav.com ("the Service"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.'
        },
        {
          title: '2. 100% Intellectual Property Rights Retained by You',
          text: 'You retain full, exclusive, and unencumbered intellectual property rights, trademarks, and copyrights in any artwork, vector files, logos, and favicons you generate or convert through SvgFav.com. We claim zero ownership, royalty rights, or licensing rights over your creations.'
        },
        {
          title: '3. Permitted & Commercial Use',
          text: 'SvgFav.com is 100% free for both personal and commercial use. You are free to sell logos, deploy favicons on commercial software applications, distribute SVG cutting files, and print merchandise without attribution or license fees.'
        },
        {
          title: '4. Acceptable Use Policy',
          text: 'You agree not to use SvgFav.com to vectorize, generate, or distribute material that violates intellectual property rights of third parties, contains malware, promotes illegal activities, or circumvents platform security.'
        },
        {
          title: '5. Disclaimer of Warranties',
          text: 'The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive for exceptional vectorization accuracy and 99.9% edge uptime via Cloudflare, we do not guarantee uninterrupted or error-free operation.'
        },
        {
          title: '6. Limitation of Liability',
          text: 'Under no circumstances shall SvgFav.com or its contributors be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our tools.'
        }
      ]
    },
    de: {
      title: 'Nutzungsbedingungen | SvgFav.com — Kostenloses Vektor-Studio',
      metaDesc: 'Nutzungsbedingungen von SvgFav.com. Sie behalten 100% der Urheberrechte an allen erstellten Vektoren und Favicons.',
      heading: 'Nutzungsbedingungen',
      subtitle: 'Faire, entwicklerfreundliche Bedingungen: Sie behalten alle Rechte an Ihren Werken.',
      lastUpdated: 'Zuletzt aktualisiert: 12. September 2026',
      sections: [
        {
          title: '1. Geltungsbereich',
          text: 'Mit dem Zugriff auf SvgFav.com erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Die Nutzung unserer Tools ist kostenlos.'
        },
        {
          title: '2. Urheberrechte & Geistiges Eigentum',
          text: 'Sie behalten alle Rechte an Ihren erstellten Vektordateien, Logos und Favicons. SvgFav.com erhebt keinerlei Anspruch auf Ihre Daten oder grafischen Werke.'
        },
        {
          title: '3. Kommerzielle Nutzung',
          text: 'Alle erstellten Grafiken dürfen uneingeschränkt für private sowie gewerbliche Zwecke (z.B. Kundenprojekte, SaaS-Websites, Merchandise) verwendet werden.'
        },
        {
          title: '4. Haftungsausschluss',
          text: 'Die Bereitstellung der Dienste erfolgt ohne Gewähr für ständige Verfügbarkeit oder spezifische Konvertierungsergebnisse.'
        }
      ]
    },
    pt: {
      title: 'Termos e Condições | SvgFav.com — Direitos Totais do Criador',
      metaDesc: 'Termos e Condições da SvgFav.com. Você mantém 100% dos direitos autorais sobre todas as imagens e vetores gerados.',
      heading: 'Termos e Condições de Uso',
      subtitle: 'Termos simples e transparentes: você mantém 100% da propriedade intelectual dos seus designs.',
      lastUpdated: 'Última atualização: 12 de setembro de 2026',
      sections: [
        {
          title: '1. Aceitação dos Termos',
          text: 'Ao acessar e utilizar as ferramentas da SvgFav.com, você concorda em cumprir estes Termos e Condições de Uso.'
        },
        {
          title: '2. Propriedade Intelectual e Direitos Autorais',
          text: 'Você detém total e irrestrita propriedade sobre todos os arquivos vetoriais, logotipos, favicons e códigos gerados. A SvgFav.com não reivindica nenhum direito autoral ou royalties sobre suas criações.'
        },
        {
          title: '3. Uso Comercial Permitido',
          text: 'O uso da plataforma é 100% gratuito tanto para projetos pessoais quanto comerciais, sem necessidade de atribuição de créditos.'
        },
        {
          title: '4. Isenção de Garantias',
          text: 'As ferramentas são disponibilizadas "como estão". Embora utilizemos algoritmos de ponta, não nos responsabilizamos por perdas indiretas decorrentes do uso da ferramenta.'
        }
      ]
    },
    fr: {
      title: 'Conditions d\'Utilisation | SvgFav.com',
      metaDesc: 'Conditions d\'utilisation de SvgFav.com. Vous conservez 100% des droits de propriété intellectuelle sur vos créations.',
      heading: 'Conditions Générales d\'Utilisation',
      subtitle: 'Conditions claires: vous conservez l\'intégralité des droits d\'auteur de vos fichiers.',
      lastUpdated: 'Dernière mise à jour: 12 septembre 2026',
      sections: [
        {
          title: '1. Acceptation des conditions',
          text: 'L\'utilisation des services de SvgFav.com implique l\'acceptation pleine et entière des présentes conditions.'
        },
        {
          title: '2. Propriété intellectuelle',
          text: 'Vous conservez l\'intégralité des droits d\'auteur et de propriété intellectuelle sur les fichiers SVG et favicons créés.'
        },
        {
          title: '3. Utilisation commerciale',
          text: 'L\'utilisation est entièrement libre et gratuite pour tous vos projets personnels ou commerciaux.'
        }
      ]
    },
    es: {
      title: 'Términos y Condiciones | SvgFav.com',
      metaDesc: 'Términos y condiciones de SvgFav.com. Mantienes el 100% de la propiedad intelectual de tus vectores y favicons.',
      heading: 'Términos y Condiciones',
      subtitle: 'Términos abiertos: mantienes la propiedad total de tus diseños y marcas.',
      lastUpdated: 'Última actualización: 12 de septiembre de 2026',
      sections: [
        {
          title: '1. Aceptación',
          text: 'El uso de SvgFav.com constituye la aceptación de estos términos y directrices de uso.'
        },
        {
          title: '2. Derechos de Propiedad',
          text: 'Conservas el 100% de los derechos de propiedad intelectual sobre los gráficos y vectores que exportes.'
        },
        {
          title: '3. Uso Comercial Libre',
          text: 'Puedes utilizar los archivos exportados libremente en productos comerciales, tiendas en línea y aplicaciones.'
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
          { name: 'Legal', url: '/terms-and-conditions' },
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

      <LanguageSelector currentLang={currentLang} baseSlug="terms-and-conditions" />

      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-4">
          <Award className="w-3.5 h-3.5" />
          <span>Creator-First Rights Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{localized.heading}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{localized.subtitle}</p>
        <span className="inline-block text-xs text-slate-500 mt-2">{localized.lastUpdated}</span>
      </div>

      {/* Quick Summary Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Free Forever</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">No hidden fees, subscriptions, or paywalls.</p>
        </div>
        <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-2">
            <Award className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Commercial Rights</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">Sell designs and deploy code without royalty fees.</p>
        </div>
        <div className="p-4 rounded-xl glass-card border border-dark-border space-y-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
            <Scale className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">No Attribution Required</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">Use icons and graphics without linking back.</p>
        </div>
      </div>

      {/* Terms Sections */}
      <article className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {localized.sections.map((section, idx) => (
          <section key={idx} className="glass-card rounded-2xl p-6 sm:p-8 border border-dark-border space-y-2.5">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{section.title}</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{section.text}</p>
          </section>
        ))}

        <div className="p-6 rounded-2xl glass-card border border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Need custom enterprise licensing or SLA?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Reach out to our team for custom integrations.</p>
            </div>
          </div>
          <Link
            to="/contact-us"
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            Contact Support
          </Link>
        </div>
      </article>
    </div>
  );
};
