import React, { useState } from 'react';
import { Sparkles, MessageSquare, Instagram, Mail, ArrowUp, Send, Phone } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (pageValue) => {
    setCurrentPage(pageValue);
    scrollToTop();
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setEmailInput('');
      setTimeout(() => setEmailSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative gradient aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gold-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="p-2 rounded-sm bg-white/5 border border-white/10 group hover:border-gold-500 transition-colors">
                <Sparkles className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-wider text-white">
                  AI FASHION
                </span>
                <span className="font-display font-light text-[10px] text-gold-500 tracking-[0.3em] block -mt-1.5 uppercase">
                  Studio
                </span>
              </div>
            </div>
            
            <p className="text-dark-400 text-sm font-light leading-relaxed">
              We revolutionize ethnic fashion photography. Leveraging state-of-the-art generative AI, we transform basic flat-lays into world-class editorial shoots for elite boutiques globally.
            </p>
            
            <div className="flex items-center gap-3.5 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/5 hover:border-gold-500 text-white hover:text-gold-450 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gold-500/5"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/5 hover:border-gold-500 text-white hover:text-gold-450 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gold-500/5"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a 
                href="mailto:support@aifashionstudio.com" 
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/5 hover:border-gold-500 text-white hover:text-gold-450 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gold-500/5"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Studio Navigation */}
          <div>
            <h4 className="font-display text-xs font-semibold text-white uppercase tracking-[0.2em] mb-7 relative pb-2 w-fit">
              Studio Navigation
              <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-gold-500" />
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Home Experience', value: 'home' },
                { label: 'Sample Showcase', value: 'portfolio' },
                { label: 'Pricing Plans', value: 'pricing' },
                { label: 'Place an Order', value: 'order' },
                { label: 'AI Fashion Blog', value: 'blog' },
                { label: 'Contact Support', value: 'contact' },
              ].map((item) => (
                <li key={item.value}>
                  <button
                    onClick={() => handleNavClick(item.value)}
                    className="text-dark-400 hover:text-gold-400 text-sm font-light transition-all duration-300 cursor-pointer flex items-center gap-1 group"
                  >
                    <span className="w-0 h-[1px] bg-gold-500 group-hover:w-2 transition-all duration-300" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ethnic Capabilities */}
          <div>
            <h4 className="font-display text-xs font-semibold text-white uppercase tracking-[0.2em] mb-7 relative pb-2 w-fit">
              AI Capabilities
              <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-gold-500" />
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Banarasi Saree Cataloging' },
                { label: 'Bridal Lehenga Rendering' },
                { label: 'Ethnic Kurti Model Shoots' },
                { label: 'Antique Kundan Enhancement' },
                { label: 'Palace Background Swapping' },
              ].map((item, idx) => (
                <li key={idx} className="text-dark-400 hover:text-white text-sm font-light transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/30" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter/Mockups */}
          <div className="space-y-6">
            <h4 className="font-display text-xs font-semibold text-white uppercase tracking-[0.2em] mb-7 relative pb-2 w-fit">
              Get VIP Updates
              <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-gold-500" />
            </h4>
            <p className="text-dark-400 text-sm font-light leading-relaxed">
              Subscribe to receive free high-resolution ethnic model mockups and early-bird discount codes directly in your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter boutique email" 
                className="w-full bg-dark-950 border border-white/10 hover:border-white/20 focus:border-gold-500 text-white rounded-sm py-3 pl-4 pr-12 text-sm font-sans focus:outline-none transition-all placeholder:text-dark-500"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm bg-gold-500 hover:bg-gold-400 text-dark-950 flex items-center justify-center transition-colors cursor-pointer"
                title="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {emailSubscribed && (
              <p className="text-xs text-gold-400 animate-pulse font-display tracking-wider">
                ✓ Subscription successful! Thank you.
              </p>
            )}
          </div>

        </div>

        {/* Bottom line and copyright */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p className="text-dark-500 text-xs font-light">
              &copy; {new Date().getFullYear()} AI Fashion Studio. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/10">|</span>
            <p className="text-dark-500 text-xs font-light">
              Designed exclusively for elite ethnic boutiques and premium fashion manufacturers.
            </p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 text-dark-400 hover:text-gold-400 text-xs font-medium uppercase tracking-widest transition-colors duration-300 cursor-pointer group"
          >
            <span>Back to top</span>
            <div className="p-2 rounded-sm bg-white/5 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300 shadow-md">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
