'use client';

import React from "react"

import { useState } from 'react';
import { Button } from "../ui/button";
// import { Button } from './ui/button';

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">Send us a Message</h2>
          <p className="text-lg text-foreground/70 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Contact Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Student', 'Tutor', 'Business', 'Other'].map((option) => (
              <label key={option} className="relative group cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={option.toLowerCase()}
                  checked={formData.type === option.toLowerCase()}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="p-4 border-2 border-border rounded-lg transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/5" style={{
                  borderColor: formData.type === option.toLowerCase() ? 'var(--primary)' : 'var(--border)',
                  backgroundColor: formData.type === option.toLowerCase() ? 'var(--primary)' : 'transparent',
                  color: formData.type === option.toLowerCase() ? 'var(--primary-foreground)' : 'var(--foreground)',
                }}>
                  <span className="font-medium text-sm">{option}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Name Input */}
          <div className="group">
            <label className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div className="group">
            <label className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
              placeholder="your@email.com"
            />
          </div>

          {/* Subject Input */}
          <div className="group">
            <label className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
              placeholder="How can we help?"
            />
          </div>

          {/* Message Textarea */}
          <div className="group">
            <label className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-700 dark:text-green-400 animate-scale-in">
              <p className="font-medium">Message sent successfully! We'll get back to you soon.</p>
            </div>
          )}
        </form>
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

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .group:focus-within label {
          color: var(--primary);
        }
      `}</style>
    </section>
  );
}
