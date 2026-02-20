import { useEffect, useState } from 'react';
import { usePerformanceDetection } from '../hooks/usePerformanceDetection';

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface TouchOrb {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  visible: boolean;
}

export function TouchGlowEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [touchOrb, setTouchOrb] = useState<TouchOrb>({ x: 0, y: 0, targetX: 0, targetY: 0, visible: false });
  const [isMobile, setIsMobile] = useState(false);
  const { isLowPerformance, isBatterySaver } = usePerformanceDetection();

  useEffect(() => {
    const checkMobile = () => {
      const isPointerCoarse = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isPointerCoarse);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || isLowPerformance) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newRipple: Ripple = {
        id: Date.now(),
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isBatterySaver) return;

      const touch = e.touches[0];
      setTouchOrb(prev => ({
        ...prev,
        targetX: touch.clientX,
        targetY: touch.clientY,
        visible: true,
      }));
    };

    const handleTouchEnd = () => {
      setTouchOrb(prev => ({ ...prev, visible: false }));
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, isLowPerformance, isBatterySaver]);

  useEffect(() => {
    if (!touchOrb.visible || isBatterySaver) return;

    let animationFrameId: number;

    const animate = () => {
      setTouchOrb(prev => {
        const dx = prev.targetX - prev.x;
        const dy = prev.targetY - prev.y;
        const lerp = 0.2;

        return {
          ...prev,
          x: prev.x + dx * lerp,
          y: prev.y + dy * lerp,
        };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [touchOrb.visible, touchOrb.targetX, touchOrb.targetY, isBatterySaver]);

  if (!isMobile || isLowPerformance) return null;

  const orbOpacity = isBatterySaver ? 0.3 : 0.5;

  return (
    <>
      {/* Touch ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.6) 0%, rgba(0, 229, 255, 0.3) 50%, rgba(0, 229, 255, 0) 100%)',
              border: '2px solid rgba(0, 229, 255, 0.8)',
              animation: 'touch-ripple 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          />
        </div>
      ))}

      {/* Floating touch orb */}
      {touchOrb.visible && !isBatterySaver && (
        <div
          className="fixed pointer-events-none z-[9998] transition-opacity duration-300"
          style={{
            left: touchOrb.x,
            top: touchOrb.y,
            transform: 'translate(-50%, -50%)',
            opacity: orbOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: '40px',
              height: '40px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(0, 229, 255, 0.2) 50%, rgba(0, 229, 255, 0) 70%)',
              filter: 'blur(10px)',
            }}
          />
        </div>
      )}
    </>
  );
}
