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
      // Mark animation as played after entry animation completes (1.5 seconds)
      setTimeout(() => {
        sessionStorage.setItem('eagle-logo-animated', 'true');
        setHasAnimated(true);
      }, 1500);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient blue glow background - very subtle */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && !hasAnimated ? 'animate-eagle-entry-glow' : isLoaded ? 'animate-eagle-pulse-glow' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Rotating neon ring glow - outer layer with shimmer */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && !hasAnimated ? 'animate-eagle-entry-ring' : isLoaded ? 'animate-eagle-shimmer-sweep' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, transparent 60%, rgba(0, 229, 255, 0.3) 70%, rgba(0, 229, 255, 0.5) 75%, transparent 80%)',
          filter: 'blur(8px)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Circular container with dark background and neon glow */}
      <div
        className={`absolute inset-0 rounded-full overflow-hidden ${
          isLoaded && !hasAnimated ? 'animate-eagle-entry' : isLoaded ? '' : 'opacity-0 scale-85'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(17, 24, 39, 0.95) 0%, rgba(11, 15, 26, 0.98) 100%)',
          border: '2px solid rgba(0, 229, 255, 0.6)',
          boxShadow: isHovered
            ? '0 0 40px rgba(0, 229, 255, 0.9), 0 0 60px rgba(0, 229, 255, 0.5), inset 0 0 25px rgba(0, 229, 255, 0.2)'
            : '0 0 25px rgba(0, 229, 255, 0.7), 0 0 45px rgba(0, 229, 255, 0.4), inset 0 0 18px rgba(0, 229, 255, 0.12)',
          transition: 'box-shadow 0.4s ease, transform 0.4s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          aspectRatio: '1 / 1',
          willChange: hasAnimated ? 'auto' : 'transform, opacity',
        }}
      >
        {/* Eagle head image centered in circle */}
        <div className="absolute inset-0 flex items-center justify-center p-[10%]">
          <img
            ref={imgRef}
            src="/assets/generated/eagle-head-logo.dim_400x400.png"
            alt="SwiftOps Eagle Logo"
            onLoad={handleImageLoad}
            className={`w-full h-full object-contain relative z-10 ${
              isLoaded && !hasAnimated ? 'animate-eagle-entry' : isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : ''}`}
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 4px rgba(0, 229, 255, 1)) drop-shadow(0 0 8px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 16px rgba(0, 229, 255, 0.7))'
                : 'drop-shadow(0 0 3px rgba(0, 229, 255, 0.95)) drop-shadow(0 0 6px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 12px rgba(0, 229, 255, 0.6))',
              transition: 'transform 0.4s ease, filter 0.4s ease',
              willChange: hasAnimated ? 'auto' : 'transform, opacity',
            }}
          />
        </div>

        {/* Shimmer sweep overlay - moves across logo */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isLoaded && hasAnimated ? 'animate-eagle-shimmer-sweep' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.4) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* Continuous soft pulse glow - activates after entry */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && hasAnimated ? 'animate-eagle-pulse-glow' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, transparent 70%)',
          opacity: isHovered ? 1 : 0.6,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Energy pulse ring - every 3-4 seconds */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && hasAnimated ? 'animate-eagle-energy-pulse' : 'opacity-0'
        }`}
        style={{
          border: '2px solid rgba(0, 229, 255, 0.6)',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
}
