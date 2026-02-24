'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactInfoSection() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@skillbridge.com',
      subtitle: 'We reply within 24 hours',
      link: 'mailto:support@skillbridge.com',
      delay: '0.1s',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri 9AM-6PM EST',
      link: 'tel:+15551234567',
      delay: '0.2s',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'San Francisco, CA',
      subtitle: 'Visit us in person',
      link: '#',
      delay: '0.3s',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: '9AM - 6PM EST',
      subtitle: 'Monday to Friday',
      link: '#',
      delay: '0.4s',
    },
  ];

  return (
    <section id="contact-info" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">Other Ways to Reach Us</h2>
          <p className="text-lg text-foreground/70 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Multiple channels to connect with SkillBridge support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                className="group p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: method.delay }}
              >
                <div className="relative">
                  {/* Icon background glow effect */}
                  <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                  
                  <div className="relative mb-4 inline-flex p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {method.title}
                </h3>

                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {method.details}
                </p>

                <p className="text-sm text-foreground/60 mt-2 group-hover:text-foreground/80 transition-colors duration-300">
                  {method.subtitle}
                </p>

                {/* Animated arrow on hover */}
                <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1 duration-300">
                  <span className="text-sm font-medium">Contact</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .group:hover {
          background-color: var(--card);
        }
      `}</style>
    </section>
  );
}
