import React from 'react';
import { Sparkles, MessageSquare, Instagram, Mail, ArrowUp } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (pageValue) => {
    setCurrentPage(pageValue);
    scrollToTop();
  };

  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gold-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 cursor-pointer mb-6" onClick={() => handleNavClick('home')}>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Sparkles className="w-5 h-5 text-gold-400" />
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
            <p className="text-dark-400 text-sm max-w-md mb-6 font-light leading-relaxed">
              We revolutionize ethnic fashion photography. By leveraging cutting-edge generative AI, we transform simple product photographs into world-class editorial fashion model photoshoots for saree shops and luxury clothing brands worldwide.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-500 hover:text-gold-400 flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-white group-hover:text-gold-400 transition-colors" />
              </a>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-500 hover:text-gold-400 flex items-center justify-center transition-all duration-300 group"
              >
                <MessageSquare className="w-4 h-4 text-white group-hover:text-gold-400 transition-colors" />
              </a>
              <a 
                href="mailto:support@aifashionstudio.com" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-500 hover:text-gold-400 flex items-center justify-center transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-white group-hover:text-gold-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Studio Navigation
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', value: 'home' },
                { label: 'Portfolio Gallery', value: 'portfolio' },
                { label: 'Pricing Plans', value: 'pricing' },
                { label: 'Place an Order', value: 'order' },
                { label: 'Contact Support', value: 'contact' },
              ].map((item) => (
                <li key={item.value}>
                  <button
                    onClick={() => handleNavClick(item.value)}
                    className="text-dark-400 hover:text-gold-400 text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm font-light text-dark-400">
              <li>
                <span className="block text-white font-medium mb-1">Office Address</span>
                Premium Tech Hub, Phase 2, Jubilee Hills, Hyderabad, TS, India
              </li>
              <li>
                <span className="block text-white font-medium mb-1">Direct Support</span>
                +91 99999 99999
              </li>
              <li>
                <span className="block text-white font-medium mb-1">Corporate Email</span>
                hello@aifashionstudio.com
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs font-light text-center sm:text-left">
            &copy; {new Date().getFullYear()} AI Fashion Studio. All rights reserved. Designed for elite ethnic fashion brands.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-dark-400 hover:text-gold-400 text-xs font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer group"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-sm bg-white/5 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
