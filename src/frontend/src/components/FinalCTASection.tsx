import { useState } from 'react';
import { Send } from 'lucide-react';
import { useRippleEffect } from '../hooks/useRippleEffect';

export function FinalCTASection() {
  const [email, setEmail] = useState('');
  const createRipple = useRippleEffect();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-deep-accent to-dark-bg" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 grid-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white heading-glow">
            Ready to <span className="text-neon-cyan neon-text">Automate</span> Your Business?
          </h2>
          <p className="text-xl text-white/70 font-inter">
            Join leading companies using AI automation to scale faster and work smarter
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-glass border border-neon-cyan/30 rounded-lg text-white placeholder-white/50 font-inter focus:outline-none focus:border-neon-cyan transition-all duration-300"
              style={{
                boxShadow: 'none',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}
              required
            />
            <button
              type="submit"
              onClick={createRipple}
              className="neon-button-primary relative overflow-hidden flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Get Started
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
