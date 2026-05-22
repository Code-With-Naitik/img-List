import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile/touch devices
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      
      // Outer circle (delayed smooth movement)
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Inner dot (immediate movement)
      setDotPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Check if hovering interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-hover') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer ring with smooth spring-like feel using Tailwind and transitions */}
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '48px' : '24px',
          height: isHovered ? '48px' : '24px',
          borderColor: isHovered ? '#d4a71c' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: isHovered ? 'rgba(212, 167, 28, 0.05)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease-out, background-color 0.2s ease-out',
        }}
      />
      {/* Inner precise dot */}
      <div
        className="custom-cursor-dot hidden md:block"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          backgroundColor: isHovered ? '#ffffff' : '#d4a71c',
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.15s ease',
        }}
      />
    </>
  );
};

export default Cursor;
