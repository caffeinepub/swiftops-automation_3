import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'fade-in' | 'animate' | 'fade-out'>('fade-in');

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    // Phase 1: Fade-in (0-0.5s)
    const fadeInTimer = setTimeout(() => {
      setPhase('animate');
    }, 500);

    // Phase 2: Main animation (0.5-2.5s)
    const animateTimer = setTimeout(() => {
      setPhase('fade-out');
    }, 2500);

    // Phase 3: Fade-out and complete (2.5-3s)
    const fadeOutTimer = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(animateTimer);
      clearTimeout(fadeOutTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-dark-bg via-deep-accent to-dark-bg transition-opacity duration-500 ${
        phase === 'fade-out' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Central animated element */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Eagle Logo with animations */}
        <div
          className={`relative transition-all duration-1000 ${
            phase === 'fade-in'
              ? 'opacity-0 scale-50'
              : phase === 'animate'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          }`}
        >
          <img
            src="/assets/generated/eagle-head-logo.dim_400x400.png"
            alt="SwiftOps"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain intro-logo-glow"
          />
        </div>

        {/* Brand Title */}
        <div
          className={`mt-6 flex flex-col items-center gap-1 transition-all duration-1000 delay-300 ${
            phase === 'fade-in'
              ? 'opacity-0 translate-y-4'
              : phase === 'animate'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold tracking-wider text-white leading-none intro-title-shadow">
            SwiftOps
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-orbitron tracking-widest leading-none intro-automation-glow">
            Automation
          </h2>
        </div>

        {/* Light sweep effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-full h-full light-sweep ${
              phase === 'animate' ? 'animate-light-sweep' : ''
            }`}
          />
        </div>

        {/* Pulse rings */}
        {phase === 'animate' && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="intro-pulse-ring" style={{ animationDelay: '0s' }} />
              <div className="intro-pulse-ring" style={{ animationDelay: '0.5s' }} />
              <div className="intro-pulse-ring" style={{ animationDelay: '1s' }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
