import { useEffect, useState, useRef } from 'react';
import { usePerformanceDetection } from '../hooks/usePerformanceDetection';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export function NeonCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const { isLowPerformance, isBatterySaver } = usePerformanceDetection();

  useEffect(() => {
    const checkDesktop = () => {
      const isPointerFine = window.matchMedia('(pointer: fine)').matches;
      setIsDesktop(isPointerFine);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || isLowPerformance) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], .service-card, .neon-button, .neon-button-primary');
      setIsHovering(!!isInteractive);

      // Check for pulse elements
      const isPulseElement = target.closest('.service-card, .neon-button-primary');
      setIsPulsing(!!isPulseElement);

      // Magnetic attraction
      if (isInteractive) {
        const rect = (isInteractive as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        
        if (distance < 80) {
          const pullStrength = 0.3;
          setTargetPosition({
            x: e.clientX + (centerX - e.clientX) * pullStrength,
            y: e.clientY + (centerY - e.clientY) * pullStrength,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, isLowPerformance]);

  useEffect(() => {
    if (!isDesktop || isLowPerformance) return;

    const animate = () => {
      setPosition(prev => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        const lerp = 0.15;

        const newX = prev.x + dx * lerp;
        const newY = prev.y + dy * lerp;

        // Update trail
        if (!isBatterySaver) {
          setTrail(prevTrail => {
            const newTrail = [
              { x: prev.x, y: prev.y, opacity: 1 },
              ...prevTrail.slice(0, isHovering ? 8 : 5).map(point => ({
                ...point,
                opacity: point.opacity * 0.85,
              })),
            ].filter(point => point.opacity > 0.05);
            return newTrail;
          });
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPosition, isDesktop, isHovering, isLowPerformance, isBatterySaver]);

  if (!isDesktop || isLowPerformance) return null;

  const cursorScale = isHovering ? 1.4 : 1;
  const glowIntensity = isHovering ? 1.5 : 1;
  const particleCount = isBatterySaver ? 3 : (isHovering ? 8 : 5);

  return (
    <>
      <style>{`
        html, html * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail particles */}
      {!isBatterySaver && trail.slice(0, particleCount).map((point, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            width: `${8 - index * 0.5}px`,
            height: `${8 - index * 0.5}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(0, 229, 255, ${point.opacity * 0.6}) 0%, rgba(0, 229, 255, 0) 70%)`,
            opacity: point.opacity,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
          willChange: 'transform',
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            width: '32px',
            height: '32px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(0, 229, 255, ${0.3 * glowIntensity}) 0%, rgba(0, 229, 255, ${0.1 * glowIntensity}) 50%, rgba(0, 229, 255, 0) 70%)`,
            filter: `blur(${8 * glowIntensity}px)`,
            animation: isPulsing ? 'cursor-pulse 1s ease-in-out infinite' : 'none',
          }}
        />
        
        {/* Inner core */}
        <div
          className="absolute rounded-full"
          style={{
            width: '12px',
            height: '12px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(0, 255, 255, ${0.9 * glowIntensity}) 0%, rgba(0, 229, 255, ${0.6 * glowIntensity}) 100%)`,
            boxShadow: `0 0 ${10 * glowIntensity}px rgba(0, 229, 255, ${0.8 * glowIntensity}), 0 0 ${20 * glowIntensity}px rgba(0, 229, 255, ${0.4 * glowIntensity})`,
          }}
        />
      </div>
    </>
  );
}
