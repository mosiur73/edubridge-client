'use client';

export function AboutValues() {
  const values = [
    {
      number: '01',
      title: 'Accessibility',
      description: 'We believe education should be accessible to everyone, everywhere. We\'re committed to removing barriers and making quality learning affordable.',
      icon: '🚀',
    },
    {
      number: '02',
      title: 'Excellence',
      description: 'We maintain the highest standards by carefully vetting tutors, ensuring quality instruction, and continuously improving our platform.',
      icon: '⭐',
    },
    {
      number: '03',
      title: 'Community',
      description: 'At SkillBridge, we\'re more than a platform. We\'re a vibrant community of learners, educators, and lifelong students.',
      icon: '🤝',
    },
    {
      number: '04',
      title: 'Innovation',
      description: 'We\'re constantly evolving our platform with new features, tools, and opportunities to enhance the learning experience.',
      icon: '💡',
    },
    {
      number: '05',
      title: 'Transparency',
      description: 'We operate with integrity, honesty, and clear communication with both our learners and tutors.',
      icon: '👁️',
    },
    {
      number: '06',
      title: 'Empowerment',
      description: 'We empower individuals to take control of their educational journey and achieve their full potential.',
      icon: '💪',
    },
  ];

  return (
    <section className="pb-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Core Values</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            These principles guide every decision we make and everything we build at SkillBridge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="group rounded-lg border border-border p-8 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{value.icon}</div>
              <div className="text-sm font-semibold text-primary mb-2">{value.number}</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
