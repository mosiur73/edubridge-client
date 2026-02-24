'use client';

import { Users, BookOpen, HelpCircle, Zap } from 'lucide-react';

export function ContactSupport() {
  const supportOptions = [
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Browse our comprehensive guides and tutorials to find answers to common questions.',
      action: 'Explore Docs',
      delay: '0.1s',
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Join our community of tutors and students to discuss and share experiences.',
      action: 'Join Community',
      delay: '0.2s',
    },
    {
      icon: Zap,
      title: 'Quick Support',
      description: 'Get instant help from our support team with real-time chat assistance.',
      action: 'Start Chat',
      delay: '0.3s',
    },
    {
      icon: HelpCircle,
      title: 'FAQs',
      description: 'Find quick answers to frequently asked questions about our platform.',
      action: 'View FAQs',
      delay: '0.4s',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">Other Support Options</h2>
          <p className="text-lg text-foreground/70 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Find the help you need in multiple ways
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                onClick={() => console.log(`Clicked: ${option.title}`)}
                className="group p-8 rounded-xl border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-left animate-fade-in-up hover:translate-y-1 hover:scale-[1.02]"
                style={{ animationDelay: option.delay }}
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {option.title}
                  </h3>

                  <p className="text-foreground/70 mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {option.description}
                  </p>

                  <div className="inline-flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    {option.action}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
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

        .group {
          position: relative;
          overflow: hidden;
        }

        .group::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.5s;
        }

        .group:hover::before {
          left: 100%;
        }
      `}</style>
    </section>
  );
}
