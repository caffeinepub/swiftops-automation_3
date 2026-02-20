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
import { TouchGlowEffect } from './components/TouchGlowEffect';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      <NeonCursor />
      <TouchGlowEffect />
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
  );
}

export default App;
