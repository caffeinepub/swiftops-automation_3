import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { EliteClientProfilesSection } from './components/EliteClientProfilesSection';
import { AIPerformanceSection } from './components/AIPerformanceSection';
import { FinalCTASection } from './components/FinalCTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NeonCursor } from './components/NeonCursor';
import { IntroAnimation } from './components/IntroAnimation';

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Check if intro animation has already been played in this session
    const introPlayed = sessionStorage.getItem('introAnimationPlayed');
    
    if (!introPlayed) {
      setShowIntro(true);
      sessionStorage.setItem('introAnimationPlayed', 'true');
    } else {
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setContentVisible(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      <div
        className={`transition-opacity duration-500 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NeonCursor />
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <StatsSection />
          <HowItWorksSection />
          <IntegrationsSection />
          <EliteClientProfilesSection />
          <AIPerformanceSection />
          <FinalCTASection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
