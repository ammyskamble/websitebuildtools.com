import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SvgToPngPage } from './pages/SvgToPngPage';
import { PortugueseHomePage } from './pages/PortugueseHomePage';
import { PortugueseSvgToPngPage } from './pages/PortugueseSvgToPngPage';
import { GermanHomePage } from './pages/GermanHomePage';
import { LogoMakerPage } from './pages/LogoMakerPage';
import { FaviconGeneratorPage } from './pages/FaviconGeneratorPage';
import { SvgOptimizerPage } from './pages/SvgOptimizerPage';
import { ConverterPage } from './pages/ConverterPage';
import { PicsvgAlternativePage } from './pages/PicsvgAlternativePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';

// Canonical redirect & Scroll to top helper on route change
function CanonicalRedirect() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // If loaded on *.pages.dev, immediately redirect to https://svgfav.com
    if (typeof window !== 'undefined' && window.location.hostname.endsWith('.pages.dev')) {
      window.location.replace(`https://svgfav.com${pathname}${search}${hash}`);
    }
  }, [pathname, search, hash]);

  return null;
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CanonicalRedirect />
        <div className="min-h-screen flex flex-col bg-dark-bg text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white font-sans antialiased transition-colors duration-200">
          <Navbar />

        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
            {/* Core Home & Localized Language Studios */}
            <Route path="/" element={<SvgToPngPage />} />
            <Route path="/studio" element={<HomePage />} />
            <Route path="/vector-studio" element={<HomePage />} />
            <Route path="/pt" element={<PortugueseHomePage />} />
            <Route path="/pt/" element={<PortugueseHomePage />} />
            <Route path="/pt/conversor-png-para-svg" element={<PortugueseHomePage />} />
            <Route path="/pt/conversor-png-para-svg.html" element={<PortugueseHomePage />} />
            <Route path="/pt-br/conversor-svg-para-png" element={<PortugueseSvgToPngPage />} />
            <Route path="/pt-br/conversor-svg-para-png.html" element={<PortugueseSvgToPngPage />} />
            <Route path="/pt/conversor-svg-para-png" element={<PortugueseSvgToPngPage />} />
            <Route path="/pt/conversor-svg-para-png.html" element={<PortugueseSvgToPngPage />} />
            <Route path="/de" element={<GermanHomePage />} />
            <Route path="/de/" element={<GermanHomePage />} />
            <Route path="/de/png-in-svg-umwandeln" element={<GermanHomePage />} />
            <Route path="/de/png-in-svg-umwandeln.html" element={<GermanHomePage />} />

            {/* Standalone Programmatic Utility Tools */}
            <Route path="/favicon-generator" element={<FaviconGeneratorPage />} />
            <Route path="/svg-optimizer" element={<SvgOptimizerPage />} />
            <Route path="/tools/logo-maker" element={<LogoMakerPage />} />
            <Route path="/tools/favicon-generator" element={<FaviconGeneratorPage />} />
            <Route path="/tools/svg-optimizer" element={<SvgOptimizerPage />} />
            {/* Gemini AI routes removed — redirect to 404 */}
            <Route path="/tools/gemini-ai" element={<NotFoundPage />} />
            <Route path="/tools/ai-generator" element={<NotFoundPage />} />
            <Route path="/ai-svg-generator" element={<NotFoundPage />} />
            <Route path="/html-to-svg" element={<NotFoundPage />} />
            <Route path="/css-to-svg" element={<NotFoundPage />} />
            <Route path="/canvas-to-svg" element={<NotFoundPage />} />
            <Route path="/svg-to-favicon-pack" element={<NotFoundPage />} />

            {/* High-Intent Programmatic SEO Conversion Hub */}
            <Route path="/convert" element={<ConverterPage mode="png-to-svg" />} />
            <Route path="/converters" element={<ConverterPage mode="png-to-svg" />} />

            {/* Direct High-Value SEO Landing Pages */}
            <Route path="/png-to-svg" element={<ConverterPage mode="png-to-svg" />} />
            <Route path="/jpg-to-svg" element={<ConverterPage mode="jpg-to-svg" />} />
            <Route path="/image-to-svg" element={<ConverterPage mode="image-to-svg" />} />
            <Route path="/svg-to-png" element={<Navigate to="/" replace />} />
            <Route path="/svg-to-jpg" element={<ConverterPage mode="svg-to-jpg" />} />
            <Route path="/svg-to-ico" element={<ConverterPage mode="svg-to-ico" />} />
            <Route path="/svg-to-data-uri" element={<ConverterPage mode="svg-to-data-uri" />} />
            <Route path="/svg-to-astro" element={<ConverterPage mode="svg-to-astro" />} />

            {/* Canonical /convert/* sub-routes */}
            <Route path="/convert/png-to-svg" element={<ConverterPage mode="png-to-svg" />} />
            <Route path="/convert/jpg-to-svg" element={<ConverterPage mode="jpg-to-svg" />} />
            <Route path="/convert/image-to-svg" element={<ConverterPage mode="image-to-svg" />} />
            <Route path="/convert/svg-to-png" element={<Navigate to="/" replace />} />
            <Route path="/convert/svg-to-jpg" element={<ConverterPage mode="svg-to-jpg" />} />
            <Route path="/convert/svg-to-ico" element={<ConverterPage mode="svg-to-ico" />} />
            <Route path="/convert/svg-to-data-uri" element={<ConverterPage mode="svg-to-data-uri" />} />
            <Route path="/convert/svg-to-astro" element={<ConverterPage mode="svg-to-astro" />} />

            {/* Competitor Alternative Landing Page */}
            <Route path="/alternatives/picsvg" element={<PicsvgAlternativePage />} />
            <Route path="/picsvg-alternative" element={<PicsvgAlternativePage />} />

            {/* Standard Legal & Informational Pages with i18n Routing */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/:lang/privacy-policy" element={<PrivacyPolicyPage />} />

            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="/:lang/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="/terms" element={<TermsConditionsPage />} />
            <Route path="/:lang/terms" element={<TermsConditionsPage />} />

            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/:lang/about-us" element={<AboutUsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/:lang/about" element={<AboutUsPage />} />

            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/:lang/contact-us" element={<ContactUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/:lang/contact" element={<ContactUsPage />} />

            {/* Error Pages & Handlers */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/500" element={<ServerErrorPage />} />

            {/* Fallback to 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  </ThemeProvider>
  );
};

export default App;
