import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check if user scrolled past 20px for background effect
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'Pricing', value: 'pricing' },
    { label: 'Order Now', value: 'order' },
    { label: 'Contact', value: 'contact' },
    { label: 'Admin Portal', value: 'admin' },
  ];

  const handleNavClick = (pageValue) => {
    setCurrentPage(pageValue);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-950/80 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-600 via-gold-400 to-white transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-gold-500/50 transition-colors">
              <Sparkles className="w-5 h-5 text-gold-400 group-hover:animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                AI FASHION
              </span>
              <span className="font-display font-light text-sm text-gold-500 tracking-[0.2em] block -mt-1 uppercase">
                Studio
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`relative font-sans text-sm tracking-wider uppercase transition-colors cursor-pointer py-1 ${
                  currentPage === item.value 
                    ? 'text-gold-400 font-semibold' 
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.value && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Call To Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => handleNavClick('contact')}
              className="font-sans text-xs tracking-widest uppercase text-white/80 hover:text-white transition-colors cursor-pointer py-2 px-4"
            >
              Get Consultation
            </button>
            
            <button
              onClick={() => handleNavClick('order')}
              className="relative overflow-hidden group bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-medium text-sm tracking-wide py-2.5 px-6 rounded-sm shadow-lg shadow-gold-600/10 hover:shadow-gold-500/20 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>Get Free Sample</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold-400 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark-950/95 border-b border-white/10 py-6 px-4 backdrop-blur-lg transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-left font-sans text-sm tracking-widest uppercase py-3 border-b border-white/5 ${
                  currentPage === item.value ? 'text-gold-400 font-semibold pl-2 border-l-2 border-l-gold-400' : 'text-dark-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-center border border-white/10 hover:border-gold-500 text-white font-sans text-sm tracking-widest uppercase py-3 rounded-sm transition-colors"
              >
                Contact Studio
              </button>
              
              <button
                onClick={() => handleNavClick('order')}
                className="w-full text-center bg-gold-500 hover:bg-gold-400 text-dark-950 font-display font-medium text-sm tracking-widest uppercase py-3 rounded-sm shadow-md transition-colors"
              >
                Get Free Sample
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
