'use client';

export function AboutHero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Connecting Learners with <span className="text-primary">Expert Tutors</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
          SkillBridge is a community-driven platform designed to democratize education and empower both learners and educators to achieve their full potential.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">500+</span>
            </div>
            <span className="text-foreground/70">Expert Tutors</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-bold">10K+</span>
            </div>
            <span className="text-foreground/70">Active Learners</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="text-primary font-bold">50+</span>
            </div>
            <span className="text-foreground/70">Subject Areas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
