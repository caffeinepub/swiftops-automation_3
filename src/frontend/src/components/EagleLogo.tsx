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
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Trigger fade-in animation on mount
    if (img.complete) {
      setIsLoaded(true);
      // Mark animation as complete after the full sequence (3.2s)
      setTimeout(() => setAnimationComplete(true), 3200);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    // Mark animation as complete after the full sequence (3.2s)
    setTimeout(() => setAnimationComplete(true), 3200);
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
        className={`absolute inset-0 pointer-events-none ${
          animationComplete ? 'animate-pulse-glow-bg' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(0, 229, 255, 0.2) 40%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: isLoaded ? 1 : 0,
          animation: isLoaded && !animationComplete ? 'robotic-bg-activate 1s ease-out forwards' : undefined,
        }}
      />

      <img
        ref={imgRef}
        src="/assets/generated/robotic-eagle-logo.dim_512x512.png"
        alt="SwiftOps Robotic Eagle Logo"
        onLoad={handleImageLoad}
        className={`w-full h-full object-contain relative z-10 ${
          isHovered && animationComplete ? 'animate-eagle-float' : ''
        }`}
        style={{
          opacity: isLoaded ? 1 : 0,
          filter: isHovered
            ? 'drop-shadow(0 0 3px rgba(0, 229, 255, 1)) drop-shadow(0 0 6px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 12px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 20px rgba(0, 229, 255, 0.5))'
            : 'drop-shadow(0 0 2px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 4px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 8px rgba(0, 229, 255, 0.5)) drop-shadow(0 0 12px rgba(0, 229, 255, 0.3))',
          animation: isLoaded && !animationComplete ? 'robotic-eagle-reveal 3.2s cubic-bezier(0.4, 0, 0.2, 1) forwards' : undefined,
          transition: animationComplete ? 'filter 0.3s ease' : 'none',
        }}
      />

      {/* Neon line activation overlay */}
      {isLoaded && !animationComplete && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.6) 50%, transparent 100%)',
            animation: 'neon-line-activate 1s ease-out 0.5s forwards',
            opacity: 0,
          }}
        />
      )}

      {/* AI boot sequence eyes glow */}
      {isLoaded && !animationComplete && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(circle at 45% 40%, rgba(0, 229, 255, 0.8) 0%, transparent 15%), radial-gradient(circle at 55% 40%, rgba(0, 229, 255, 0.8) 0%, transparent 15%)',
            animation: 'eye-glow-boot 0.5s ease-out 1.5s forwards',
            opacity: 0,
          }}
        />
      )}

      {/* Energy scan sweep */}
      {isLoaded && !animationComplete && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.4) 50%, transparent 100%)',
            animation: 'energy-scan-sweep 0.8s ease-in-out 2s forwards',
            opacity: 0,
          }}
        />
      )}

      {/* Continuous pulse glow effect (after animation) */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          animationComplete ? 'animate-pulse-glow' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
          opacity: isHovered ? 0.9 : animationComplete ? 0.5 : 0,
          transition: 'opacity 0.3s ease',
          animation: isLoaded && !animationComplete ? 'final-glow-pulse 0.4s ease-out 2.8s forwards' : undefined,
        }}
      />
    </div>
  );
}
