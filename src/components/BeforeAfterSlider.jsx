import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const beforeImage = '/test_saree.png'; // Premium local red Banarasi saree flat lay
  const afterImage = '/after_saree.png'; // Matching premium AI palace model shoot

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div 
        ref={containerRef}
        className="slider-container relative aspect-[4/3] md:aspect-[16/10] w-full rounded-2xl overflow-hidden glass-panel-gold glow-gold border border-gold-500/10 cursor-ew-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Right/Full Background) */}
        <img 
          src={afterImage} 
          alt="AI Luxury Shoot" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* Label: AI generated Model Shoot */}
        <div className="absolute right-4 top-4 z-20 bg-dark-950/80 backdrop-blur-md border border-gold-500/30 px-3 py-1.5 rounded-sm text-gold-400 font-display font-medium text-xs uppercase tracking-widest pointer-events-none">
          AI Luxury Shoot
        </div>

        {/* Before Image (Left / Clipped Overlay) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img 
            src={beforeImage} 
            alt="Original Saree Product" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95"
          />
          {/* Label: Flat Lay Product */}
          <div className="absolute left-4 top-4 z-20 bg-dark-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm text-white/80 font-display font-medium text-xs uppercase tracking-widest">
            Original Flat Lay
          </div>
        </div>

        {/* Splitter Handle Bar */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-gold-400 z-30 pointer-events-none shadow-[0_0_10px_rgba(212,167,28,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Handle Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-950/90 border-2 border-gold-400 text-gold-400 flex items-center justify-center shadow-2xl pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform duration-200">
            <ArrowLeftRight className="w-5 h-5 text-gold-400 animate-pulse" />
          </div>
        </div>

        {/* Floating guidance overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-dark-950/60 backdrop-blur-md border border-white/5 py-1 px-4 rounded-full text-[10px] text-white/50 uppercase tracking-[0.2em] pointer-events-none">
          Drag slider to compare saree details
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
