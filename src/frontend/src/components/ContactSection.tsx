import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Phone, MessageCircle, Instagram, Mail, User } from 'lucide-react';

const contactMethods = [
  {
    icon: User,
    label: 'Name',
    value: 'Shaikh Zeeshan',
    href: null,
    target: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 76664 26388',
    href: 'tel:+917666426388',
    target: null,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 99607 51076',
    href: 'https://wa.me/919960751076',
    target: '_blank',
    special: 'whatsapp',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: 'SwiftOps__Automation06',
    href: 'https://instagram.com/SwiftOps__Automation06',
    target: '_blank',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'zeeshan.automation06@gmail.com',
    href: 'mailto:zeeshan.automation06@gmail.com',
    target: null,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Get in <span className="text-neon-cyan neon-text">Touch</span>
          </h2>
          <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
            Let&apos;s build intelligent automation for your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const content = (
              <div
                className={`glass-card p-6 space-y-4 hover:scale-105 hover:-translate-y-1 transition-all duration-300 group ${
                  method.special === 'whatsapp' ? 'hover:shadow-whatsapp-glow' : ''
                } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      method.special === 'whatsapp'
                        ? 'bg-green-500/10 group-hover:bg-green-500/20'
                        : 'bg-neon-cyan/10'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        method.special === 'whatsapp'
                          ? 'text-green-400 group-hover:text-green-300'
                          : 'text-neon-cyan'
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-white/60 font-inter">{method.label}</div>
                    <div className="text-white font-inter font-semibold break-all">
                      {method.value}
                    </div>
                  </div>
                </div>
              </div>
            );

            if (method.href) {
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.target || undefined}
                  rel={method.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return <div key={method.label}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
