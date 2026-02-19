import { useState, useEffect } from 'react';
import { EagleLogo } from './EagleLogo';
import { EagleClickAnimation } from './EagleClickAnimation';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { useActiveSection } from '../hooks/useActiveSection';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const createRipple = useRippleEffect();
  const activeSection = useActiveSection(['#hero', '#services', '#pricing', '#contact']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    createRipple(e);
    setTargetSection(section);
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    if (targetSection) {
      const element = document.querySelector(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setTargetSection(null);
  };

  const handleGetStartedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setTargetSection('#contact');
    setShowAnimation(true);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-glass backdrop-blur-md border-b border-neon-cyan/20 shadow-neon-glow'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EagleLogo variant="icon" size={40} />
            <div className="flex flex-col">
              <span className="text-xl font-orbitron font-bold tracking-wider text-white">
                SWIFTOPS
              </span>
              <span className="text-xs font-orbitron text-neon-cyan tracking-widest">
                AUTOMATION
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className={`neon-button-link ${
                activeSection === '#hero' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
              }`}
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className={`neon-button-link ${
                activeSection === '#services' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
              }`}
            >
              Services
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, '#pricing')}
              className={`neon-button-link ${
                activeSection === '#pricing' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
              }`}
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`neon-button-link ${
                activeSection === '#contact' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
              }`}
            >
              Contact
            </a>
            <button
              onClick={handleGetStartedClick}
              className="neon-button relative overflow-hidden"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <EagleClickAnimation isActive={showAnimation} onComplete={handleAnimationComplete} />
    </>
  );
}
