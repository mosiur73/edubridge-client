'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How do I find the right tutor for my needs?',
    answer: 'You can search tutors by subject, skill level, and availability. Each tutor profile includes their qualifications, ratings, reviews, and teaching style. We recommend reading reviews from other students to find the perfect match.',
  },
  {
    id: 2,
    question: 'What is the pricing structure?',
    answer: 'Tutors set their own hourly rates, which typically range from $25-$75 per hour depending on expertise and subject. You only pay for sessions you book. There are no hidden fees or subscription requirements.',
  },
  {
    id: 3,
    question: 'Can I cancel or reschedule sessions?',
    answer: 'Yes! You can cancel or reschedule sessions up to 24 hours in advance for a full refund. Cancellations within 24 hours may be subject to a cancellation fee as per your tutor\'s policy.',
  },
  {
    id: 4,
    question: 'How does the payment system work?',
    answer: 'All payments are processed securely through our platform. You pay after each session is completed. Tutors receive their payments weekly. We use industry-standard encryption to protect your financial information.',
  },
  {
    id: 5,
    question: 'What platforms do you support for online sessions?',
    answer: 'We support video sessions through Zoom, Google Meet, and our built-in video platform. You can also arrange in-person sessions if the tutor is in your area. The choice of platform is coordinated with your tutor.',
  },
  {
    id: 6,
    question: 'Is there a money-back guarantee if I am not satisfied?',
    answer: 'Yes! If you are not satisfied with your first session with a tutor, we offer a full refund. We want you to find the perfect learning match. This guarantee applies to your first booking with each tutor.',
  },
  
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/60">
              Find answers to common questions about SkillBridge
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-card border border-border rounded-lg overflow-hidden transition-all hover:border-primary/50"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors"
                >
                  <h3 className="text-left font-semibold text-foreground text-balance">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                {openId === faq.id && (
                  <div className="px-6 py-4 border-t border-border bg-secondary/5">
                    <p className="text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              Still have questions?
            </h3>
            <p className="text-foreground/70">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <button className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
