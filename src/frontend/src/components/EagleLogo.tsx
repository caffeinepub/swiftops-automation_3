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
      // Mark animation as played after it completes (1.2 second entry animation)
      setTimeout(() => {
        sessionStorage.setItem('eagle-logo-animated', 'true');
        setHasAnimated(true);
      }, 1200);
    }
  };

  return (
    <div
      className={`relative ${className} ${
        isLoaded && !hasAnimated ? 'animate-eagle-entry' : ''
      }`}
      style={{ 
        width: size, 
        height: size,
        willChange: !hasAnimated ? 'transform, opacity' : 'auto',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 3: Soft outer ambient aura behind head - always visible */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          hasAnimated ? 'animate-eagle-pulse-breathing' : ''
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(0, 229, 255, 0.4) 0%, rgba(0, 229, 255, 0.25) 25%, rgba(0, 229, 255, 0.15) 40%, transparent 60%)',
          filter: 'blur(20px)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Cinematic light bloom burst at head - triggers on entry */}
      {isLoaded && !hasAnimated && (
        <div
          className="absolute pointer-events-none rounded-full animate-eagle-bloom-burst"
          style={{
            top: '20%',
            left: '50%',
            width: '60%',
            height: '60%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.8) 0%, rgba(0, 229, 255, 0.4) 30%, transparent 60%)',
            filter: 'blur(15px)',
          }}
        />
      )}

      {/* Layer 2: Medium glow around outline with energy spread */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && !hasAnimated ? 'animate-eagle-energy-spread' : hasAnimated ? 'animate-eagle-pulse-breathing' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, transparent 55%, rgba(0, 229, 255, 0.3) 65%, rgba(0, 229, 255, 0.5) 72%, rgba(0, 229, 255, 0.3) 78%, transparent 85%)',
          filter: 'blur(10px)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Circular container with dark background and neon glow */}
      <div
        className={`absolute inset-0 rounded-full overflow-hidden ${
          hasAnimated ? 'animate-eagle-pulse-breathing' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(17, 24, 39, 0.95) 0%, rgba(11, 15, 26, 0.98) 100%)',
          border: '2px solid rgba(0, 229, 255, 0.6)',
          boxShadow: isHovered
            ? '0 0 30px rgba(0, 229, 255, 0.8), 0 0 50px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(0, 229, 255, 0.15)'
            : '0 0 20px rgba(0, 229, 255, 0.6), 0 0 35px rgba(0, 229, 255, 0.3), inset 0 0 15px rgba(0, 229, 255, 0.1)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          aspectRatio: '1 / 1',
          opacity: isLoaded ? 1 : 0,
        }}
      >
        {/* Eagle head image centered in circle */}
        <div className="absolute inset-0 flex items-center justify-center p-[10%]">
          {/* Layer 1: Inner illumination inside eagle head - always visible */}
          <div
            className={`absolute pointer-events-none ${
              isLoaded && !hasAnimated ? 'animate-eagle-head-glow-spread' : hasAnimated ? 'animate-eagle-pulse-breathing' : ''
            }`}
            style={{
              top: '25%',
              left: '50%',
              width: '50%',
              height: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.6) 0%, rgba(0, 229, 255, 0.4) 30%, rgba(0, 229, 255, 0.2) 50%, transparent 70%)',
              filter: 'blur(12px)',
              opacity: isLoaded ? 1 : 0,
            }}
          />

          <img
            ref={imgRef}
            src="/assets/generated/eagle-head-logo.dim_400x400.png"
            alt="SwiftOps Eagle Logo"
            onLoad={handleImageLoad}
            className={`w-full h-full object-contain relative z-10 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : ''}`}
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 3px rgba(0, 229, 255, 1)) drop-shadow(0 0 6px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 12px rgba(0, 229, 255, 0.6))'
                : 'drop-shadow(0 0 2px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 4px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 8px rgba(0, 229, 255, 0.5))',
              transition: 'transform 0.3s ease, filter 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Shimmer sweep across wings - plays once during entry */}
      {isLoaded && !hasAnimated && (
        <div
          className="absolute inset-0 pointer-events-none rounded-full overflow-hidden animate-eagle-shimmer-sweep"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.3) 45%, rgba(0, 229, 255, 0.5) 50%, rgba(0, 229, 255, 0.3) 55%, transparent 100%)',
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
}
