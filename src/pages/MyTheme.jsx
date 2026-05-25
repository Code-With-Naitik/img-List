import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Sliders, Palette, ShieldCheck, Zap, Heart, Trash2, 
  FolderHeart, Sun, Compass, ArrowRight, Eye, RefreshCw, Layers, Cpu, Award
} from 'lucide-react';

const MyTheme = ({ setCurrentPage }) => {
  // Main Theme Builder states
  const [activeLocation, setActiveLocation] = useState('palace');
  const [activeLighting, setActiveLighting] = useState('golden_hour');
  const [activeAccent, setActiveAccent] = useState('gold');
  const [meshAccuracy, setMeshAccuracy] = useState(100);
  const [activeModelStyle, setActiveModelStyle] = useState('heritage_north');
  const [themeName, setThemeName] = useState('My Brand Royal Vibe');

  // Preview simulator states
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStatusText, setRenderStatusText] = useState('');
  const [renderedPreview, setRenderedPreview] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop');
  const [hasRendered, setHasRendered] = useState(true);

  // Saved themes list (initialized from localStorage if available, else standard seeds)
  const [savedThemes, setSavedThemes] = useState([]);

  const locations = [
    { id: 'palace', label: 'Royal Palace Courtyard', location: 'Jaipur', desc: 'Regal sandstone arches and vintage courtyards.', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=150' },
    { id: 'cafe', label: 'Contemporary Luxury Cafe', location: 'Mumbai', desc: 'Chic modern marble tables and plush warm interior design.', img: 'https://images.unsplash.com/photo-1608963503737-f3329246b7a0?q=80&w=150' },
    { id: 'penthouse', label: 'Modern Premium Penthouse', location: 'Delhi', desc: 'Glass floor-to-ceiling windows with skyline aesthetics.', img: 'https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?q=80&w=150' },
    { id: 'festive', label: 'Festive Lights & Sparkles', location: 'Udaipur', desc: 'Warm hanging oil lamps, premium marigold flower drapery.', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=150' },
    { id: 'kerala', label: 'Heritage Village Courtyard', location: 'Kerala', desc: 'Green coconut palms, wooden columns and soft monsoon air.', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=150' },
    { id: 'himalayan', label: 'Himalayan Misty Hills', location: 'Manali', desc: 'Cold fog, pine forests, high-altitude crisp luxury contrast.', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=150' }
  ];

  const lightings = [
    { id: 'golden_hour', label: 'Golden Hour Sunset', desc: 'Deep warm sidelight with majestic elongated glowing shadows.', icon: <Sun className="w-4 h-4 text-amber-400" /> },
    { id: 'studio_soft', label: 'Studio Soft Daylight', desc: 'Balanced high-end catalog lighting with zero harsh glares.', icon: <Sun className="w-4 h-4 text-blue-300" /> },
    { id: 'candlelit', label: 'Dramatic Candlelit Glow', desc: 'Rich high-contrast candlelight painting gold accents on textures.', icon: <Sun className="w-4 h-4 text-orange-500" /> },
    { id: 'monsoon_overcast', label: 'Moody Monsoon Overcast', desc: 'Cool-toned diffuse daylight heightening rich fabric saturation.', icon: <Sun className="w-4 h-4 text-slate-400" /> }
  ];

  const accents = [
    { id: 'gold', label: 'Luxury Gold', hex: '#d4a71c' },
    { id: 'crimson', label: 'Imperial Crimson', hex: '#9f1239' },
    { id: 'emerald', label: 'Emerald Green', hex: '#064e3b' },
    { id: 'indigo', label: 'Royal Indigo', hex: '#1e3a8a' },
    { id: 'ivory', label: 'Vintage Ivory', hex: '#fef3c7' },
    { id: 'rose', label: 'Roseate Pearl', hex: '#be185d' }
  ];

  const modelStyles = [
    { id: 'heritage_north', label: 'Heritage North Indian', desc: 'Traditional heavy gold jewelry, classic draping flow, elegant expressions.' },
    { id: 'classic_south', label: 'Classic South Indian', desc: 'Jasmine hair weaves, authentic temple border draping, sophisticated silk posture.' },
    { id: 'fusion_modern', label: 'Indo-Western Fusion', desc: 'Contemporary pearl chokers, minimalist drape waves, sharp modern look.' },
    { id: 'bridal_heavy', label: 'Premium Royal Bridal', desc: 'Ultra-luxurious bridal dupatta layer, intricate bindi settings, elite festival feel.' }
  ];

  // Map settings to custom Unsplash images to simulate live neural rendering
  const getSimulatedImage = (loc, style) => {
    const imagesMap = {
      palace: {
        heritage_north: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
        classic_south: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
        fusion_modern: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
        bridal_heavy: 'https://images.unsplash.com/photo-1610030470208-eb1a9c39474b?q=80&w=600&auto=format&fit=crop'
      },
      cafe: {
        heritage_north: 'https://images.unsplash.com/photo-1608963503737-f3329246b7a0?q=80&w=600&auto=format&fit=crop',
        classic_south: 'https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?q=80&w=600&auto=format&fit=crop',
        fusion_modern: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
        bridal_heavy: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop'
      },
      penthouse: {
        heritage_north: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
        classic_south: 'https://images.unsplash.com/photo-1608963503737-f3329246b7a0?q=80&w=600&auto=format&fit=crop',
        fusion_modern: 'https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?q=80&w=600&auto=format&fit=crop',
        bridal_heavy: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop'
      },
      festive: {
        heritage_north: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
        classic_south: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
        fusion_modern: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
        bridal_heavy: 'https://images.unsplash.com/photo-1610030470208-eb1a9c39474b?q=80&w=600&auto=format&fit=crop'
      },
      kerala: {
        heritage_north: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
        classic_south: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
        fusion_modern: 'https://images.unsplash.com/photo-1608963503737-f3329246b7a0?q=80&w=600&auto=format&fit=crop',
        bridal_heavy: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop'
      },
      himalayan: {
        heritage_north: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
        classic_south: 'https://images.unsplash.com/photo-1610030470208-eb1a9c39474b?q=80&w=600&auto=format&fit=crop',
        fusion_modern: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
        bridal_heavy: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop'
      }
    };
    return imagesMap[loc]?.[style] || imagesMap.palace.heritage_north;
  };

  // Initialize saved themes
  useEffect(() => {
    const local = localStorage.getItem('brand_themes');
    if (local) {
      setSavedThemes(JSON.parse(local));
    } else {
      const defaultSeeds = [
        {
          id: 'thm-1',
          name: 'Royal Heritage Golden Sunset',
          location: 'palace',
          lighting: 'golden_hour',
          accent: 'gold',
          accuracy: 100,
          modelStyle: 'heritage_north',
          img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
          savedAt: '2026-05-24T10:00:00.000Z'
        },
        {
          id: 'thm-2',
          name: 'Modern Penthouse Pearl',
          location: 'penthouse',
          lighting: 'studio_soft',
          accent: 'ivory',
          accuracy: 100,
          modelStyle: 'fusion_modern',
          img: 'https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?q=80&w=600&auto=format&fit=crop',
          savedAt: '2026-05-23T15:30:00.000Z'
        }
      ];
      setSavedThemes(defaultSeeds);
      localStorage.setItem('brand_themes', JSON.stringify(defaultSeeds));
    }
  }, []);

  // Neural generator simulation trigger
  const runSimulatedRender = () => {
    setIsRendering(true);
    setRenderProgress(0);
    setHasRendered(false);

    const stepsText = [
      'Accessing GPU clusters...',
      'Mapping neural mesh wires...',
      'Synthesizing Udaipur palace light arrays...',
      'Draping silk fabric coordinate charts...',
      'Initiating 4K super-resolution upscaling...',
      'Finalizing shadow casting maps...'
    ];

    let currentStep = 0;
    setRenderStatusText(stepsText[0]);

    const interval = setInterval(() => {
      setRenderProgress(prev => {
        const next = prev + 5;
        
        // Progressively change the text based on progress
        const textIdx = Math.floor((next / 100) * stepsText.length);
        if (textIdx < stepsText.length && textIdx !== currentStep) {
          currentStep = textIdx;
          setRenderStatusText(stepsText[textIdx]);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRendering(false);
            setRenderedPreview(getSimulatedImage(activeLocation, activeModelStyle));
            setHasRendered(true);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 120);
  };

  // Save active theme builder state to local storage
  const handleSaveTheme = () => {
    if (!themeName.trim()) return;
    const newTheme = {
      id: `thm-${Date.now()}`,
      name: themeName,
      location: activeLocation,
      lighting: activeLighting,
      accent: activeAccent,
      accuracy: meshAccuracy,
      modelStyle: activeModelStyle,
      img: getSimulatedImage(activeLocation, activeModelStyle),
      savedAt: new Date().toISOString()
    };

    const updated = [newTheme, ...savedThemes];
    setSavedThemes(updated);
    localStorage.setItem('brand_themes', JSON.stringify(updated));
    
    // Toast simulation or reset
    setThemeName('My Custom Saree Vibe');
  };

  // Delete saved theme
  const handleDeleteTheme = (id, e) => {
    e.stopPropagation();
    const filtered = savedThemes.filter(thm => thm.id !== id);
    setSavedThemes(filtered);
    localStorage.setItem('brand_themes', JSON.stringify(filtered));
  };

  // Load a saved theme into active builder
  const handleLoadTheme = (thm) => {
    setActiveLocation(thm.location);
    setActiveLighting(thm.lighting);
    setActiveAccent(thm.accent);
    setMeshAccuracy(thm.accuracy);
    setActiveModelStyle(thm.modelStyle);
    setThemeName(thm.name);
    setRenderedPreview(thm.img);
    setHasRendered(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Apply saved/active theme straight to checkout ordering
  const handleApplyToShoot = () => {
    // Save to temporary storage for order retrieval
    const themeSetup = {
      location: locations.find(l => l.id === activeLocation)?.label || 'Palace Courtyard',
      modelType: modelStyles.find(m => m.id === activeModelStyle)?.label || 'Heritage North Indian',
      notes: `Applied Custom Theme Configuration: Ambient lights configured as "${lightings.find(l => l.id === activeLighting)?.label}", details accent tones calibrated to "${accents.find(a => a.id === activeAccent)?.label}", mesh coordinate precision set at ${meshAccuracy}%.`
    };
    localStorage.setItem('selected_custom_theme', JSON.stringify(themeSetup));
    setCurrentPage('order');
  };

  return (
    <div className="pt-24 pb-20 overflow-x-hidden min-h-screen relative">
      
      {/* Decorative gradient radial glows */}
      <div className="absolute top-20 left-1/4 w-[450px] h-[450px] rounded-full bg-gold-600/10 blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* Main Elegant Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sliders className="w-4 h-4 text-gold-400" />
            <span className="font-display font-medium text-xs text-white/90 uppercase tracking-[0.2em]">
              Interactive Aesthetics Lab
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Bespoke Theme <br />
            <span className="text-gold-500 italic">Customization Studio</span>
          </h1>
          
          <p className="font-sans font-light text-dark-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Calibrate customized studio parameters, color synchronization schemes, and lighting angles to establish a signature, photorealistic drape canvas for your saree catalogue.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          
          {/* LEFT: Controls Panel (Cols: 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Control Panel Header Card */}
            <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
              <div className="border-b border-white/5 pb-4 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider">
                    01. Brand Aesthetic Customizer
                  </h3>
                  <p className="text-dark-400 font-sans text-xs font-light mt-1">
                    Fine-tune studio variables to generate exact matching ambient results.
                  </p>
                </div>
                <Award className="w-5 h-5 text-gold-400 shrink-0" />
              </div>

              {/* Theme Name input */}
              <div className="space-y-2">
                <label className="block text-xs font-display text-white/80 uppercase tracking-widest">
                  Theme Signature Name
                </label>
                <input 
                  type="text" 
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  placeholder="e.g. Amber Palace Gold"
                  className="w-full bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-3 px-4 text-sm font-sans focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Location Selector */}
            <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
              <div>
                <h3 className="font-display font-medium text-white text-sm uppercase tracking-wider mb-1">
                  Location Atmosphere
                </h3>
                <p className="text-dark-400 font-sans text-xs font-light">
                  Select a magnificent backdrop canvas to host your models.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setActiveLocation(loc.id)}
                    className={`p-4 rounded-sm border cursor-pointer flex gap-4 items-center transition-all duration-300 ${
                      activeLocation === loc.id
                        ? 'border-gold-500 bg-gold-500/5 shadow-inner'
                        : 'border-white/10 bg-dark-950/40 hover:border-white/20'
                    }`}
                  >
                    <img 
                      src={loc.img} 
                      alt={loc.label} 
                      className="w-12 h-12 object-cover rounded-sm border border-white/15"
                    />
                    <div className="min-w-0">
                      <h4 className={`font-display font-semibold text-xs truncate ${
                        activeLocation === loc.id ? 'text-gold-400' : 'text-white'
                      }`}>
                        {loc.label}
                      </h4>
                      <p className="text-[10px] text-dark-400 font-light truncate mt-0.5">
                        {loc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ambient Lighting */}
            <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
              <div>
                <h3 className="font-display font-medium text-white text-sm uppercase tracking-wider mb-1">
                  Ambient Lighting Calibration
                </h3>
                <p className="text-dark-400 font-sans text-xs font-light">
                  Configure solar and volumetric light profiles mapping onto fabrics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lightings.map((lit) => (
                  <div
                    key={lit.id}
                    onClick={() => setActiveLighting(lit.id)}
                    className={`p-5 rounded-sm border cursor-pointer text-left transition-all duration-350 ${
                      activeLighting === lit.id
                        ? 'border-gold-500 bg-gold-500/5'
                        : 'border-white/10 bg-dark-950/40 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded bg-white/5 border border-white/10">
                        {lit.icon}
                      </div>
                      <h4 className={`font-display font-semibold text-xs ${
                        activeLighting === lit.id ? 'text-gold-400' : 'text-white'
                      }`}>
                        {lit.label}
                      </h4>
                    </div>
                    <p className="text-[10px] text-dark-400 font-light leading-relaxed">
                      {lit.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Color Synchronization */}
            <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
              <div>
                <h3 className="font-display font-medium text-white text-sm uppercase tracking-wider mb-1">
                  Fabric Accent Highlights
                </h3>
                <p className="text-dark-400 font-sans text-xs font-light">
                  Align metallic reflections and contrast grading coordinates with your product colors.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {accents.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => setActiveAccent(acc.id)}
                    className={`p-3 rounded-sm border cursor-pointer text-center transition-all duration-300 ${
                      activeAccent === acc.id
                        ? 'border-gold-500 bg-gold-500/5 shadow-md shadow-gold-500/5'
                        : 'border-white/5 bg-dark-950/30 hover:border-white/10'
                    }`}
                  >
                    <div 
                      className="w-7 h-7 rounded-full mx-auto mb-2 border border-white/20 flex items-center justify-center"
                      style={{ backgroundColor: acc.hex }}
                    >
                      {activeAccent === acc.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      )}
                    </div>
                    <span className="text-[9px] font-sans font-light tracking-wide block text-white/90 truncate">
                      {acc.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model & Draping Posture */}
            <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
              <div>
                <h3 className="font-display font-medium text-white text-sm uppercase tracking-wider mb-1">
                  Avatar Archetype & Jewelry Drape
                </h3>
                <p className="text-dark-400 font-sans text-xs font-light">
                  Assign model facial structures, pleat alignments, and matching heavy gems accessory styles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modelStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setActiveModelStyle(style.id)}
                    className={`p-5 rounded-sm border cursor-pointer text-left transition-all duration-300 ${
                      activeModelStyle === style.id
                        ? 'border-gold-500 bg-gold-500/5'
                        : 'border-white/10 bg-dark-950/40 hover:border-white/20'
                    }`}
                  >
                    <h4 className={`font-display font-semibold text-xs mb-1.5 ${
                      activeModelStyle === style.id ? 'text-gold-400' : 'text-white'
                    }`}>
                      {style.label}
                    </h4>
                    <p className="text-[10px] text-dark-400 font-light leading-relaxed">
                      {style.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Texture Calibration Mesh Slider */}
            <div className="glass-panel p-8 rounded-sm border border-white/5 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-display font-medium text-white text-sm uppercase tracking-wider">
                    Neural Graphics Mesh Precision
                  </h3>
                  <p className="text-dark-400 font-sans text-xs font-light mt-0.5">
                    Configure details matching tolerance ratios on silk weaves.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-lg text-gold-400">{meshAccuracy}%</span>
                  <span className="text-[9px] text-dark-500 block uppercase tracking-widest">Accuracy</span>
                </div>
              </div>

              <div className="space-y-4">
                <input 
                  type="range" 
                  min="90" 
                  max="100" 
                  value={meshAccuracy}
                  onChange={(e) => setMeshAccuracy(parseInt(e.target.value))}
                  className="w-full h-[3px] bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex justify-between text-[10px] font-sans font-light text-dark-400">
                  <span>90% (Accelerated Draft Catalog)</span>
                  <span>95% (High Fidelity Catalog)</span>
                  <span>100% (Ultra 4K Luxury Preserved)</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Real-time Live Preview Screen & Saved themes (Cols: 5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Dynamic Rendering Monitor */}
            <div className="glass-panel-gold glow-gold p-6 rounded-sm border border-gold-500/15 overflow-hidden relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-xs font-display font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-gold-400 animate-spin" />
                  <span>Real-time Vibe Rendering</span>
                </span>
                
                <span className="text-[10px] font-sans font-light text-dark-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
                  Active GPU Engine
                </span>
              </div>

              {/* The Live viewport simulator frame */}
              <div className="relative border border-white/10 rounded-sm overflow-hidden aspect-[3/4] bg-dark-950 mb-6 group">
                {isRendering ? (
                  /* Animated Rendering State */
                  <div className="absolute inset-0 z-20 bg-dark-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative p-5 rounded-full bg-white/5 border border-white/10 mb-6 animate-pulse">
                      <Sparkles className="w-8 h-8 text-gold-400 animate-spin" />
                    </div>
                    
                    <div className="w-full max-w-[200px] space-y-2 mb-4">
                      <div className="flex justify-between text-xs font-sans font-light text-dark-300">
                        <span className="truncate max-w-[150px]">{renderStatusText}</span>
                        <span>{renderProgress}%</span>
                      </div>
                      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-150"
                          style={{ width: `${renderProgress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-[9px] uppercase tracking-widest text-dark-500">
                      Processing saree coordinates on GPU cluster
                    </p>
                  </div>
                ) : (
                  /* Live Finished Image Render */
                  <div className="w-full h-full relative">
                    <img 
                      src={renderedPreview} 
                      alt="Brand Theme Preview" 
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hasRendered ? 'scale-100 opacity-100 filter blur-0' : 'scale-95 opacity-40 filter blur-md'
                      }`}
                    />
                    
                    {/* Dark gradient mapping vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/85 via-transparent to-transparent flex flex-col justify-end p-5" />

                    {/* Preview overlay labels */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 text-left">
                      <span className="text-[9px] font-display font-medium text-gold-400 uppercase tracking-widest block mb-1">
                        Active Simulation
                      </span>
                      <h4 className="font-serif text-white font-medium text-base truncate mb-1">
                        {themeName || 'Theme Custom Vibe'}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-[8px] bg-white/5 border border-white/10 py-0.5 px-2 rounded-sm text-dark-300 font-sans font-light uppercase">
                          {locations.find(l => l.id === activeLocation)?.location} Theme
                        </span>
                        <span className="text-[8px] bg-white/5 border border-white/10 py-0.5 px-2 rounded-sm text-dark-300 font-sans font-light uppercase">
                          {lightings.find(l => l.id === activeLighting)?.label}
                        </span>
                      </div>
                    </div>

                    {/* Quality stamp */}
                    <div className="absolute top-4 right-4 z-10 bg-dark-950/80 backdrop-blur-sm border border-gold-500/30 py-1 px-2 rounded-sm text-[8px] text-gold-400 uppercase tracking-widest font-display">
                      Verified 4K HDR
                    </div>
                  </div>
                )}
              </div>

              {/* Render actions trigger */}
              <div className="flex gap-4">
                <button
                  onClick={runSimulatedRender}
                  disabled={isRendering}
                  className="flex-grow bg-transparent hover:bg-white/5 text-white font-display border border-white/15 hover:border-gold-500/40 font-medium text-xs tracking-widest uppercase py-3.5 px-6 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-gold-400 ${isRendering ? 'animate-spin' : ''}`} />
                  <span>Synthesize Render Vibe</span>
                </button>

                <button
                  onClick={handleSaveTheme}
                  disabled={isRendering || !themeName.trim()}
                  className="bg-gold-500 hover:bg-gold-400 disabled:bg-white/5 text-dark-950 disabled:text-white/40 disabled:border-transparent font-sans font-semibold text-xs tracking-widest uppercase py-3.5 px-6 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FolderHeart className="w-3.5 h-3.5 shrink-0" />
                  <span>Save Vibe</span>
                </button>
              </div>

              {/* Apply theme checklist */}
              <div className="border-t border-white/10 pt-5 mt-5 space-y-4">
                <div className="flex gap-2.5 items-start text-xs font-sans font-light text-dark-300 text-left">
                  <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>This vibe coordinates color values perfectly, preserving pure silk highlights and matching background angles automatically.</span>
                </div>

                <button
                  onClick={handleApplyToShoot}
                  disabled={isRendering}
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-950 font-display font-semibold text-xs tracking-widest uppercase py-4 rounded-sm shadow-lg shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Apply & Design Active Shoot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Custom concept prompt submit */}
            <div className="glass-panel p-6 rounded-sm border border-white/5 space-y-4 text-left">
              <div>
                <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider mb-1">
                  Request Custom Concept Theme
                </h4>
                <p className="text-[10px] text-dark-400 font-light leading-relaxed">
                  Want your sarees draped on a custom set (e.g. Milan runways)? Our neural artists will build a dedicated concept background exclusively for your catalog.
                </p>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="e.g. Royal House in London..." 
                  className="flex-grow bg-dark-950 border border-white/10 focus:border-gold-500 text-white rounded-sm py-2 px-3 text-[11px] font-sans focus:outline-none"
                />
                <button 
                  onClick={() => alert("Concept request logged! Art directors will call you on WhatsApp within 12h.")}
                  className="bg-white/5 border border-white/10 text-white hover:bg-gold-500 hover:text-dark-950 font-display text-[9px] font-medium tracking-wider uppercase px-3.5 rounded-sm transition-colors cursor-pointer shrink-0"
                >
                  Submit concept
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ---------------- SECTION 2 — SAVED BRAND THEMES GRID ---------------- */}
        <div className="border-t border-white/5 pt-16 text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="font-display font-medium text-xs text-gold-500 uppercase tracking-[0.3em] block mb-2">
                SAVED ARCHIVE
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-medium text-white">
                My Signature Theme Catalogue
              </h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm text-[10px] text-dark-400 uppercase tracking-widest font-sans font-light px-3 py-1.5">
              Total Custom Presets: <strong className="text-gold-400 font-normal">{savedThemes.length} Saved</strong>
            </div>
          </div>

          {savedThemes.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-sm border border-white/5 max-w-lg mx-auto">
              <FolderHeart className="w-10 h-10 text-dark-500 mx-auto mb-4" />
              <h4 className="font-display font-medium text-white mb-2">No Signature Themes Saved Yet</h4>
              <p className="font-sans font-light text-dark-400 text-xs">
                Design custom studio specifications above and click "Save Vibe" to catalog them inside your local boutique memory.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedThemes.map((thm) => (
                <div
                  key={thm.id}
                  onClick={() => handleLoadTheme(thm)}
                  className="group relative overflow-hidden rounded-sm border border-white/5 aspect-[3/4] cursor-pointer bg-dark-950/40 hover:border-gold-500/20 transition-all duration-500"
                >
                  <img 
                    src={thm.img} 
                    alt={thm.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/45 to-transparent flex flex-col justify-end p-5" />

                  {/* Header badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="bg-dark-950/80 backdrop-blur-sm border border-white/10 py-1 px-2.5 rounded-sm text-[8px] text-gold-400 uppercase tracking-widest font-display">
                      Preset {thm.accuracy}% Accuracy
                    </span>

                    <button
                      onClick={(e) => handleDeleteTheme(thm.id, e)}
                      className="bg-dark-950/80 backdrop-blur-sm border border-white/10 hover:bg-rose-9f1239 text-white/50 hover:text-white p-1.5 rounded-sm transition-colors cursor-pointer"
                      title="Delete Custom Theme"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Vibe Details */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 text-left">
                    <span className="text-[9px] font-display font-medium text-gold-500 uppercase tracking-widest block mb-1">
                      {locations.find(l => l.id === thm.location)?.label}
                    </span>
                    <h4 className="font-display font-medium text-white text-sm mb-2 group-hover:text-gold-400 transition-colors truncate">
                      {thm.name}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-sans text-white/60">
                      <span>Click to load setup</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyTheme;
