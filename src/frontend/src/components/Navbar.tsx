import { useState, useEffect } from 'react';
import { EagleLogo } from './EagleLogo';
import { EagleClickAnimation } from './EagleClickAnimation';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { useActiveSection } from '../hooks/useActiveSection';
import { Mail } from 'lucide-react';

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
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <EagleLogo variant="icon" size={40} />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-orbitron font-bold tracking-wider text-white leading-tight">
                  SWIFTOPS
                </span>
                <span className="text-[10px] md:text-xs font-orbitron text-neon-cyan tracking-widest leading-tight">
                  AUTOMATION
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className={`neon-button-link whitespace-nowrap ${
                  activeSection === '#hero' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
                }`}
              >
                Home
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className={`neon-button-link whitespace-nowrap ${
                  activeSection === '#services' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
                }`}
              >
                Services
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, '#pricing')}
                className={`neon-button-link whitespace-nowrap ${
                  activeSection === '#pricing' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
                }`}
              >
                Pricing
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`neon-button-link whitespace-nowrap ${
                  activeSection === '#contact' ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
                }`}
              >
                Contact
              </a>
            </div>

            {/* Contact Email and CTA */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Email - Hidden on small screens, visible on md+ */}
              <a
                href="mailto:zeeshan.automation06@gmail.com"
                className="hidden md:flex items-center gap-2 text-white/80 hover:text-neon-cyan transition-colors duration-300 whitespace-nowrap text-sm lg:text-base"
                title="zeeshan.automation06@gmail.com"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xl:inline">zeeshan.automation06@gmail.com</span>
                <span className="xl:hidden">Contact</span>
              </a>

              {/* Get Started Button - Hidden on mobile, visible on lg+ */}
              <button
                onClick={handleGetStartedClick}
                className="hidden lg:block neon-button relative overflow-hidden whitespace-nowrap px-4 xl:px-6"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <EagleClickAnimation isActive={showAnimation} onComplete={handleAnimationComplete} />
    </>
  );
}
