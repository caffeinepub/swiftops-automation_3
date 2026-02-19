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
      // Mark animation as played after it completes (3.5 seconds)
      setTimeout(() => {
        sessionStorage.setItem('eagle-logo-animated', 'true');
        setHasAnimated(true);
      }, 3500);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rotating neon ring glow - outer layer */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && !hasAnimated ? 'animate-circular-ring-form' : isLoaded ? 'animate-breathing-glow' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, transparent 60%, rgba(0, 229, 255, 0.3) 70%, rgba(0, 229, 255, 0.5) 75%, transparent 80%)',
          filter: 'blur(8px)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Circular container with dark background and neon glow */}
      <div
        className={`absolute inset-0 rounded-full overflow-hidden ${
          isLoaded && !hasAnimated ? 'animate-circle-energy-form' : isLoaded ? '' : 'opacity-0 scale-90'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(17, 24, 39, 0.95) 0%, rgba(11, 15, 26, 0.98) 100%)',
          border: '2px solid rgba(0, 229, 255, 0.6)',
          boxShadow: isHovered
            ? '0 0 30px rgba(0, 229, 255, 0.8), 0 0 50px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(0, 229, 255, 0.15)'
            : '0 0 20px rgba(0, 229, 255, 0.6), 0 0 35px rgba(0, 229, 255, 0.3), inset 0 0 15px rgba(0, 229, 255, 0.1)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          aspectRatio: '1 / 1',
          willChange: hasAnimated ? 'auto' : 'transform, opacity',
        }}
      >
        {/* Robotic scan effect overlay */}
        {isLoaded && !hasAnimated && (
          <div
            className="absolute inset-0 pointer-events-none animate-robotic-scan"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.4) 50%, transparent 100%)',
              width: '30%',
            }}
          />
        )}

        {/* Eagle image centered in circle */}
        <div className="absolute inset-0 flex items-center justify-center p-[10%]">
          <img
            ref={imgRef}
            src="/assets/generated/robotic-eagle-logo.dim_512x512.png"
            alt="SwiftOps Eagle Logo"
            onLoad={handleImageLoad}
            className={`w-full h-full object-contain relative z-10 ${
              isLoaded && !hasAnimated ? 'animate-eagle-activate' : isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : ''}`}
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 3px rgba(0, 229, 255, 1)) drop-shadow(0 0 6px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 12px rgba(0, 229, 255, 0.6))'
                : 'drop-shadow(0 0 2px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 4px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 8px rgba(0, 229, 255, 0.5))',
              transition: 'transform 0.3s ease, filter 0.3s ease',
              willChange: hasAnimated ? 'auto' : 'transform, opacity',
            }}
          />
        </div>
      </div>

      {/* Continuous soft pulse glow stabilization */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && hasAnimated ? 'animate-pulse-stabilize' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
          opacity: isHovered ? 0.9 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
