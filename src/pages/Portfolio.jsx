import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, MapPin, Compass, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const Portfolio = ({ setCurrentPage }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [previewImage, setPreviewImage] = useState(null);

  const filters = [
    { id: 'all', label: 'All Shoots' },
    { id: 'sarees', label: 'Sarees' },
    { id: 'lehengas', label: 'Lehengas' },
    { id: 'kurtis', label: 'Kurtis' },
    { id: 'jewelry', label: 'Jewelry' },
  ];

  const items = [
    {
      id: 1,
      category: 'sarees',
      title: 'Crimson Silk Banarasi Saree',
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
      location: 'City Palace, Jaipur',
      model: 'Heritage Indian Model',
      time: 'Outdoor Golden Hour',
    },
    {
      id: 2,
      category: 'sarees',
      title: 'Golden Zari Ivory Kanjeevaram',
      img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
      location: 'Luxury Heritage Villa',
      model: 'Classic South Indian Model',
      time: 'Soft Interior Window Light',
    },
    {
      id: 3,
      category: 'sarees',
      title: 'Emerald Chanderi Brocade',
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
      location: 'Veranda Royal Pavilion',
      model: 'Modern North Indian Model',
      time: 'Diffuse Evening Sky',
    },
    {
      id: 4,
      category: 'lehengas',
      title: 'Royal Crimson Velvet Lehenga',
      img: 'https://images.unsplash.com/photo-1610030470208-eb1a9c39474b?q=80&w=600&auto=format&fit=crop',
      location: 'Udaipur Palace Lake view',
      model: 'Bridal Portrait Archetype',
      time: 'Royal Sunset Glow',
    },
    {
      id: 5,
      category: 'lehengas',
      title: 'Traditional Gold Zardozi bridal',
      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
      location: 'Royal Haveli Courtyard',
      model: 'Classic North Indian Model',
      time: 'Direct Sunlight & Shadows',
    },
    {
      id: 6,
      category: 'kurtis',
      title: 'Aesthetic Indigo Cotton Kurti',
      img: 'https://images.unsplash.com/photo-1608963503737-f3329246b7a0?q=80&w=600&auto=format&fit=crop',
      location: 'Contemporary Cafe, Mumbai',
      model: 'Modern Fusion Archetype',
      time: 'Bright Morning Light',
    },
    {
      id: 7,
      category: 'kurtis',
      title: 'Casual Linen Pastel Wear',
      img: 'https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?q=80&w=600&auto=format&fit=crop',
      location: 'Minimalist Studio Loft',
      model: 'Chic Urban Archetype',
      time: 'Clean Daylight Studio',
    },
    {
      id: 8,
      category: 'jewelry',
      title: 'Antique Polki Royal Necklace',
      img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      location: 'Fine Art Studio Portrait',
      model: 'Classic Indian Model',
      time: 'Dramatic Chiaroscuro Studio',
    },
    {
      id: 9,
      category: 'jewelry',
      title: 'Heritage Temple Gold Bangles',
      img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
      location: 'Fine Art Studio Portrait',
      model: 'Heritage Indian Model',
      time: 'Warm Ambient Studio',
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <div className="pt-24 pb-20 overflow-x-hidden min-h-screen">
      
      {/* Decorative gradient glowing lights */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[350px] h-[350px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Compass className="w-4 h-4 text-gold-400" />
            <span className="font-display font-medium text-xs text-white/90 uppercase tracking-[0.2em]">
              High Fashion Showroom
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Aesthetic AI <br />
            <span className="text-gold-500 italic">Portfolio Catalogues</span>
          </h1>
          
          <p className="font-sans font-light text-dark-400 text-base md:text-lg max-w-xl mx-auto">
            Browse authentic generations showcasing extreme detail. These look exactly like luxury photoshoots, created without camera crews or rental budgets.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 border-b border-white/5 pb-8 max-w-4xl mx-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 text-xs font-display tracking-widest uppercase rounded-sm border cursor-pointer transition-all duration-350 ${
                activeFilter === filter.id
                  ? 'bg-gold-500 border-gold-500 text-dark-950 font-semibold shadow-md shadow-gold-500/10'
                  : 'border-white/10 hover:border-gold-500/40 text-white/80 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewImage(item.img)}
              className="group relative overflow-hidden rounded-sm border border-white/5 aspect-[3/4] cursor-pointer bg-dark-950/40 hover:border-gold-500/30 transition-all duration-500"
            >
              {/* Photo */}
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Glowing Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Badges on corner */}
              <div className="absolute top-4 left-4 z-10 bg-dark-950/80 backdrop-blur-sm border border-gold-500/30 py-1 px-2.5 rounded-sm text-[9px] text-gold-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gold-400" />
                <span>100% Saree Preserved</span>
              </div>

              {/* Content slide up */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <span className="text-gold-500 font-display text-[10px] uppercase tracking-[0.25em] mb-1">
                  {item.category}
                </span>
                
                <h3 className="font-display font-medium text-white text-lg mb-4 leading-snug group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>

                {/* AI technical specifications */}
                <div className="border-t border-white/10 pt-4 mt-1 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 space-y-2 text-xs font-light text-dark-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-500" />
                    <span>Location: <strong className="text-white font-normal">{item.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>Model: <strong className="text-white font-normal">{item.model}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path></svg>
                    <span>Lighting: <strong className="text-white font-normal">{item.time}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section bottom */}
        <div className="mt-20 glass-panel-gold glow-gold p-10 md:p-14 rounded-sm text-center border border-gold-500/20 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-white mb-4">
            Ready to see your own collection transformed?
          </h2>
          <p className="font-sans font-light text-dark-300 text-sm max-w-lg mx-auto mb-8">
            Upload your raw designs today and download beautiful luxury assets ready to power your webstore or social handles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('order')}
              className="w-full sm:w-auto bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-xs tracking-widest uppercase py-4 px-8 rounded-sm shadow-lg shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Launch Bulk Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto bg-transparent border border-white/10 hover:border-gold-500 text-white font-display font-medium text-xs tracking-widest uppercase py-4 px-8 rounded-sm hover:text-gold-400 transition-all cursor-pointer"
            >
              Consult with Studio Art Directors
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[85vh] overflow-hidden rounded-md border border-white/10">
            <img 
              src={previewImage} 
              alt="Fashion Preview" 
              className="w-full h-auto max-h-[85vh] object-contain mx-auto"
            />
            <button 
              className="absolute top-4 right-4 bg-dark-950/80 hover:bg-gold-500 border border-white/10 hover:border-gold-500 text-white hover:text-dark-950 p-2.5 rounded-full transition-colors cursor-pointer"
              onClick={() => setPreviewImage(null)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;
