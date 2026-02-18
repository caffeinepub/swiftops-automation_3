import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useRef } from 'react';
import { Bot, MessageSquare, Mail, Workflow, Globe, Smartphone } from 'lucide-react';

const services = [
  {
    title: 'AI Agents',
    description: 'Intelligent autonomous agents that handle complex tasks and decision-making.',
    icon: Bot,
    image: '/assets/generated/icon-ai-agents.dim_128x128.png',
  },
  {
    title: 'AI Chatbots',
    description: 'Conversational AI that engages customers 24/7 with human-like interactions.',
    icon: MessageSquare,
    image: '/assets/generated/icon-chatbots.dim_128x128.png',
  },
  {
    title: 'Email Automation',
    description: 'Smart email workflows that nurture leads and drive conversions automatically.',
    icon: Mail,
    image: '/assets/generated/icon-email-automation.dim_128x128.png',
  },
  {
    title: 'Workflow Automation',
    description: 'Streamline operations with intelligent process automation across your stack.',
    icon: Workflow,
    image: '/assets/generated/icon-workflow-automation.dim_128x128.png',
  },
  {
    title: 'Website Development',
    description: 'Modern, responsive websites built with cutting-edge technologies.',
    icon: Globe,
    image: '/assets/generated/icon-web-dev.dim_128x128.png',
  },
  {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that scale with your business.',
    icon: Smartphone,
    image: '/assets/generated/icon-app-dev.dim_128x128.png',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="services" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Our <span className="text-neon-blue neon-text">Services</span>
          </h2>
          <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
            Comprehensive automation solutions designed to transform your business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`glass-card group hover:scale-105 transition-all duration-300 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <div className="shimmer-overlay" />
                  <div className="p-8 space-y-4">
                    <div className="w-16 h-16 bg-neon-blue/10 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-neon-blue" />
                    </div>
                    <h3 className="text-2xl font-orbitron font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="text-white/70 font-inter">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
