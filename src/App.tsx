import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { HomePage } from './pages/HomePage';
import { LogoMakerPage } from './pages/LogoMakerPage';
import { FaviconGeneratorPage } from './pages/FaviconGeneratorPage';
import { SvgOptimizerPage } from './pages/SvgOptimizerPage';
import { ConverterPage } from './pages/ConverterPage';

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

            {/* High-Intent Programmatic SEO Conversion Hub */}
            <Route path="/convert" element={<ConverterPage mode="svg-to-png" />} />
            <Route path="/converters" element={<ConverterPage mode="svg-to-png" />} />
            <Route path="/convert/svg-to-png" element={<ConverterPage mode="svg-to-png" />} />
            <Route path="/convert/svg-to-jpg" element={<ConverterPage mode="svg-to-jpg" />} />
            <Route path="/convert/svg-to-ico" element={<ConverterPage mode="svg-to-ico" />} />
            <Route path="/convert/png-to-svg" element={<ConverterPage mode="png-to-svg" />} />
            <Route path="/convert/svg-to-data-uri" element={<ConverterPage mode="svg-to-data-uri" />} />

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
