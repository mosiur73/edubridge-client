'use client';

import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Jessica Wong',
    role: 'College Student',
    content: 'SkillBridge completely transformed my learning experience. The tutors are incredibly knowledgeable and patient. I went from struggling with calculus to scoring an A!',
    rating: 5,
    avatar: '👩‍🎓',
  },
  {
    id: 2,
    name: 'David Martinez',
    role: 'Career Switcher',
    content: 'I wanted to learn web development and found the perfect tutor. The personalized approach and flexible scheduling made it so convenient for me.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Professional',
    content: 'Preparing for my professional certifications was daunting, but my tutor made it manageable and even enjoyable. Highly recommend SkillBridge!',
    rating: 5,
    avatar: '👩‍💻',
  },
  {
    id: 4,
    name: 'Lucas Chen',
    role: 'High School Student',
    content: 'The platform is easy to use and the tutors really care about your progress. My grades have improved significantly since I started using SkillBridge.',
    rating: 5,
    avatar: '👨‍🎓',
  },
  {
    id: 5,
    name: 'Sofia Rodriguez',
    role: 'Language Learner',
    content: 'I\'ve been learning Spanish for 6 months and my tutor has been amazing. The structured lessons combined with real conversation practice is perfect!',
    rating: 5,
    avatar: '👩‍🏫',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Parent',
    content: 'My son was falling behind in math, but after just 2 months with a tutor from SkillBridge, he\'s now at the top of his class. Worth every penny!',
    rating: 5,
    avatar: '👨‍👦',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What Our Students Say
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Join thousands of learners who have achieved their goals with SkillBridge
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/50 flex flex-col"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/70 mb-6 flex-1 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
