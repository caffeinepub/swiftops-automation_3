import { useEffect, useRef, useState } from 'react';

interface EagleLogoProps {
  variant?: 'icon' | 'full';
  size?: number;
  className?: string;
}

export function EagleLogo({ variant = 'icon', size = 512, className = '' }: EagleLogoProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check if animation has already played
    const animationPlayed = sessionStorage.getItem('eagle-logo-animated');
    if (animationPlayed) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (!hasAnimated) {
      // Mark animation as played after it completes (3 seconds)
      setTimeout(() => {
        sessionStorage.setItem('eagle-logo-animated', 'true');
        setHasAnimated(true);
      }, 3000);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Radial neon glow background with pulse animation */}
      <div
        className="absolute inset-0 pointer-events-none animate-pulse-glow-bg"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(0, 229, 255, 0.2) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <img
        ref={imgRef}
        src="/assets/generated/eagle-logo.dim_512x512.png"
        alt="SwiftOps Eagle Logo"
        onLoad={handleImageLoad}
        className={`w-full h-full object-contain relative z-10 ${
          isLoaded && !hasAnimated ? 'animate-eagle-entrance' : isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-105' : ''}`}
        style={{
          filter: isHovered
            ? 'drop-shadow(0 0 2px rgba(0, 229, 255, 1)) drop-shadow(0 0 4px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 8px rgba(0, 229, 255, 0.6)) drop-shadow(0 0 16px rgba(0, 229, 255, 0.4))'
            : 'drop-shadow(0 0 1px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 2px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 4px rgba(0, 229, 255, 0.5)) drop-shadow(0 0 8px rgba(0, 229, 255, 0.3))',
          transition: 'transform 0.3s ease, filter 0.3s ease',
          willChange: hasAnimated ? 'auto' : 'transform, opacity',
        }}
      />

      {/* Continuous pulse glow effect */}
      <div
        className="absolute inset-0 pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
          opacity: isHovered ? 0.9 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
