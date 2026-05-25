import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Order from './pages/Order';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import MyTheme from './pages/MyTheme';
import Blog from './pages/Blog';
import { Sparkles } from 'lucide-react';

function App() {
  const getInitialPage = () => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    if (['admin', 'blog', 'portfolio', 'pricing', 'mytheme', 'order', 'contact'].includes(path)) {
      return path;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state changes with URL history
  useEffect(() => {
    const path = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ page: currentPage }, '', path);
    }
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
      if (['admin', 'blog', 'portfolio', 'pricing', 'mytheme', 'order', 'contact'].includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Luxury entrance screen timer (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Global SPA Scroll-to-Top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'mytheme':
        return <MyTheme setCurrentPage={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio setCurrentPage={setCurrentPage} />;
      case 'pricing':
        return <Pricing setCurrentPage={setCurrentPage} />;
      case 'order':
        return <Order />;
      case 'contact':
        return <Contact />;
      case 'blog':
        return <Blog />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      {/* Luxury Interactive Cursor */}
      <Cursor />

      {/* Pre-loader Entrance Reveal */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[9999] bg-[#050507] flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 w-fit mx-auto animate-pulse">
                <Sparkles className="w-10 h-10 text-gold-400" />
              </div>
              <div>
                <motion.h2
                  initial={{ letterSpacing: '0.1em' }}
                  animate={{ letterSpacing: '0.25em' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="font-display font-bold text-2xl md:text-3xl text-white tracking-[0.25em]"
                >
                  AI FASHION
                </motion.h2>
                <span className="font-display font-light text-xs text-gold-500 tracking-[0.4em] block mt-1 uppercase">
                  Studio
                </span>
              </div>
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto mt-4" />
              <p className="text-dark-500 text-[10px] uppercase tracking-[0.2em] font-sans font-light">
                Loading Luxury Workspace
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen relative"
          >
            {/* Elegant Global Nav */}
            {currentPage !== 'admin' && (
              <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}

            {/* Dynamic Page Component with Smooth Animated Slide Transition */}
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Global Footer */}
            {currentPage !== 'admin' && (
              <Footer setCurrentPage={setCurrentPage} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
