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

export const PortugueseHomePage: React.FC = () => {
  const navigate = useNavigate();

  // Filtrar FAQs apenas em português
  const ptFaqs = SEO_FAQS.filter((f) => f.language === 'pt');

  const rawSchemaGraph = [
    {
      '@type': 'WebApplication',
      '@id': 'https://svgfav.com/pt/#webapp',
      name: 'SvgFav Studio Vetorial e Gerador de Favicon',
      url: 'https://svgfav.com/pt/',
      inLanguage: 'pt-BR',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requer suporte a HTML5 Canvas e WebAssembly',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Conversor PNG para SVG no navegador',
        'Gerador de favicon multirresolução (.ICO e PWA)',
        'Otimização e limpeza de código SVG',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://svgfav.com/pt/#faq',
      mainEntity: ptFaqs.map((faq) => ({
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
        title="SvgFav.com — Conversor PNG para SVG e Gerador de Favicon Online"
        description="Conversor SVG online gratuito e gerador de favicon. Converta PNG em SVG, JPG em SVG e gere pacotes favicon.ico 100% no navegador com total privacidade."
        keywords="conversor png em svg, png para svg, conversor svg, gerador de favicon, favicon o que é, o que é svg, arquivo svg o que é, pmdf svg, svg pmdf, svg para png"
        canonicalUrl="https://svgfav.com/pt/"
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
              <span>Motor Vetorial e de Favicons de Última Geração</span>
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              <span className="text-slate-400">100% no Navegador</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Crie, otimize e converta <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                vetores em segundos.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Crie logotipos profissionais, teste favicons realistas para múltiplos dispositivos, otimize arquivos SVG e converta imagens rasterizadas para vetores matemáticos com máxima privacidade.
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
            Ferramentas vetoriais completas no seu navegador
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Sem cadastro. Sem assinaturas. Nenhum arquivo enviado para servidores externos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Conversor PNG em SVG */}
          <div className="glass-card rounded-2xl p-6 border border-brand-500/30 flex flex-col justify-between group hover:border-brand-500/60 transition-all bg-gradient-to-b from-brand-500/5 to-transparent relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                Conversor PNG em SVG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Vetorize logotipos, assinaturas e silhuetas monocromáticas com detecção de bordas em tempo real via WebAssembly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">100% Local</span>
              <Link to="/png-to-svg" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Vetorizar Imagem</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Gerador de Favicon */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-brand-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                Gerador de Favicon
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Gere pacotes completos com <code className="text-brand-600 dark:text-brand-300">favicon.ico</code> multirresolução, ícones Apple Touch e manifest para Android PWA.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Download ZIP</span>
              <Link to="/favicon-generator" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Criar Favicon</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Otimizador SVG */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-violet-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileImage className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                Otimizador de SVG
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Remova metadados do Illustrator/Inkscape, reduza casas decimais e diminua o peso do arquivo em até 60% sem perda visual.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold">Minificação Rápida</span>
              <Link to="/svg-optimizer" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                <span>Otimizar Código</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: SVG para PNG */}
          <div className="glass-card rounded-2xl p-6 border border-dark-border flex flex-col justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                SVG para PNG (Alta Resolução)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Rasterize arquivos SVG em imagens PNG nítidas com fundo transparente até 8x 4096px Ultra HD.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Até 4096px</span>
              <Link to="/svg-to-png" className="flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Converter SVG</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />

      {/* PORTUGUESE KNOWLEDGE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-dark-border space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-400 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Engenharia Vetorial e Arquitetura de Favicons em Português</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Guia Completo: Conversor PNG para SVG e Criação Profissional de Favicons
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
              O <strong>SvgFav.com</strong> é a principal suíte em português para conversão vetorial e criação de favicons executada 100% no navegador. Diferente de conversores convencionais que transferem suas imagens para servidores remotos, nossa arquitetura processa tudo diretamente na memória RAM do seu computador usando HTML5 Canvas e WebAssembly, garantindo total privacidade e velocidade instantânea.
            </p>
          </div>

          {/* Seção 1: Vetorização */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <FileImage className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>1. Motor de Conversão Vetorial Privado: O Que É SVG e Como Converter</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Muitos usuários se perguntam <strong>o que é svg</strong> ou <strong>arquivo svg o que é</strong>. O formato SVG (Scalable Vector Graphics) é um padrão aberto internacional estabelecido pelo W3C. Enquanto arquivos rasterizados como PNG e JPEG armazenam pixels estáticos que perdem qualidade e ficam pixelados quando ampliados, o SVG armazena coordenadas matemáticas, curvas de Bézier e comandos XML. Isso permite ampliar o arquivo infinitamente sem qualquer perda de nitidez.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Conversor PNG em SVG (png para svg)</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Converta logotipos, ilustrações monocromáticas e desenhos em vetor. Nosso algoritmo calcula o limiar de luminância de cada pixel e traça laços de contorno vetoriais contínuos, prontos para uso em sites, Illustrator ou Figma.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border border-dark-border/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Máquinas de Corte e Brasões Regionais (PMDF SVG, Cricut e Lasers)</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Artesãos e designers brasileiros utilizam o SvgFav para produzir arquivos de corte vetorizados para Cricut, Silhouette e lasers CNC. Se você precisa vetorizar insígnias como o brasão da Polícia Militar (<strong>pmdf svg</strong> / <strong>svg pmdf</strong>) ou ilustrações detalhadas, o filtro de suavização elimina serrilhados nas lâminas de corte.
                </p>
              </div>
            </div>
          </div>

          {/* Seção 2: Favicons */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>2. Arquitetura de Favicons: Favicon o Que É e Como Adicionar no HTML</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Para quem busca entender <strong>favicon o que é</strong> ou <strong>o que é favicon do site</strong>: trata-se do ícone de identificação visual exibido na aba do navegador, no histórico de navegação, na barra de favoritos e nos resultados móveis do Google.
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Com o nosso <strong>gerador de favicon</strong> online, você faz o upload de qualquer imagem ou SVG e baixa um pacote ZIP completo com <code>favicon.ico</code> (16x16, 32x32, 48x48), <code>favicon.svg</code> com suporte a tema escuro, <code>apple-touch-icon.png</code> e <code>site.webmanifest</code> para celulares Android.
            </p>
          </div>

          {/* Seção 3: LGPD */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>3. Total Conformidade com a LGPD: Privacidade no Navegador</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Em cumprimento estrito à Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), o SvgFav adota o princípio de privacidade desde a concepção (Privacy by Design). Nenhum arquivo de cliente, vetor confidencial ou logotipo sob termo de sigilo (NDA) é enviado para servidores em nuvem. O processamento ocorre exclusivamente na memória local do seu navegador.
            </p>
          </div>
        </article>
      </section>

      {/* FAQs em Português */}
      <FaqAccordion
        title="Perguntas Frequentes &amp; Especificações Técnicas (FAQ)"
        description="Respostas completas com fórmulas matemáticas e tutoriais passo a passo para Adobe Photoshop e Illustrator."
        items={ptFaqs}
      />
    </div>
  );
};
