import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { HomePage } from './pages/HomePage';
import { LogoMakerPage } from './pages/LogoMakerPage';
import { FaviconGeneratorPage } from './pages/FaviconGeneratorPage';
import { SvgOptimizerPage } from './pages/SvgOptimizerPage';
import { ConverterPage } from './pages/ConverterPage';
import { GeminiStudioPage } from './pages/GeminiStudioPage';
import { PicsvgAlternativePage } from './pages/PicsvgAlternativePage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#080a11] text-slate-100 selection:bg-brand-500 selection:text-white font-sans antialiased">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Core Home & Studios */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/logo-maker" element={<LogoMakerPage />} />
            <Route path="/tools/favicon-generator" element={<FaviconGeneratorPage />} />
            <Route path="/tools/svg-optimizer" element={<SvgOptimizerPage />} />
            <Route path="/tools/gemini-ai" element={<GeminiStudioPage />} />
            <Route path="/tools/ai-generator" element={<GeminiStudioPage variant="ai-svg" />} />

            {/* Dedicated Programmatic AI & Code Landing Routes */}
            <Route path="/ai-svg-generator" element={<GeminiStudioPage variant="ai-svg" />} />
            <Route path="/html-to-svg" element={<GeminiStudioPage variant="html-to-svg" />} />
            <Route path="/css-to-svg" element={<GeminiStudioPage variant="css-to-svg" />} />
            <Route path="/canvas-to-svg" element={<GeminiStudioPage variant="canvas-to-svg" />} />
            <Route path="/svg-to-favicon-pack" element={<GeminiStudioPage variant="svg-to-favicon" />} />

            {/* High-Intent Programmatic SEO Conversion Hub */}
            <Route path="/convert" element={<ConverterPage mode="png-to-svg" />} />
            <Route path="/converters" element={<ConverterPage mode="png-to-svg" />} />

            {/* Direct High-Value SEO Landing Pages */}
            <Route path="/png-to-svg" element={<ConverterPage mode="png-to-svg" />} />
            <Route path="/jpg-to-svg" element={<ConverterPage mode="jpg-to-svg" />} />
            <Route path="/image-to-svg" element={<ConverterPage mode="image-to-svg" />} />
            <Route path="/svg-to-png" element={<ConverterPage mode="svg-to-png" />} />
            <Route path="/svg-to-jpg" element={<ConverterPage mode="svg-to-jpg" />} />
            <Route path="/svg-to-ico" element={<ConverterPage mode="svg-to-ico" />} />
            <Route path="/svg-to-data-uri" element={<ConverterPage mode="svg-to-data-uri" />} />
            <Route path="/svg-to-astro" element={<ConverterPage mode="svg-to-astro" />} />

            {/* Canonical /convert/* sub-routes */}
            <Route path="/convert/png-to-svg" element={<ConverterPage mode="png-to-svg" />} />
            <Route path="/convert/jpg-to-svg" element={<ConverterPage mode="jpg-to-svg" />} />
            <Route path="/convert/image-to-svg" element={<ConverterPage mode="image-to-svg" />} />
            <Route path="/convert/svg-to-png" element={<ConverterPage mode="svg-to-png" />} />
            <Route path="/convert/svg-to-jpg" element={<ConverterPage mode="svg-to-jpg" />} />
            <Route path="/convert/svg-to-ico" element={<ConverterPage mode="svg-to-ico" />} />
            <Route path="/convert/svg-to-data-uri" element={<ConverterPage mode="svg-to-data-uri" />} />
            <Route path="/convert/svg-to-astro" element={<ConverterPage mode="svg-to-astro" />} />

            {/* Competitor Alternative Landing Page */}
            <Route path="/alternatives/picsvg" element={<PicsvgAlternativePage />} />
            <Route path="/picsvg-alternative" element={<PicsvgAlternativePage />} />

            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
