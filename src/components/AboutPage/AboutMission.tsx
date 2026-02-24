'use client';

export function AboutMission() {
  return (
    <section className="pb-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              We believe that quality education should be accessible to everyone, regardless of background or location. SkillBridge was founded with a simple mission: to bridge the gap between passionate learners and expert educators.
            </p>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Our platform empowers individuals to take control of their learning journey while giving educators the tools to share their knowledge and build meaningful connections with students around the world.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1 h-10 bg-primary rounded"></div>
              <p className="text-lg font-semibold text-foreground italic">
                "Education is not the filling of a pail, but the lighting of a fire." — William Butler Yeats
              </p>
            </div>
          </div>

          {/* Right - Values Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Accessible', desc: 'Learning for everyone' },
              { title: 'Quality', desc: 'Expert-vetted tutors' },
              { title: 'Flexible', desc: 'Learn at your pace' },
              { title: 'Trusted', desc: '10K+ happy learners' },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm text-foreground/60">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
