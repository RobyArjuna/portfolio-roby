import React from 'react';

const PRACTICES = ['Scrum', 'Agile', 'Clean Code', 'Design Patterns'];

const CAPABILITIES = [
  { name: 'Flutter', area: 'Mobile — specialist' },
  { name: 'React', area: 'Frontend' },
  { name: 'Laravel', area: 'Backend' },
  { name: 'YOLOv8', area: 'AI & Vision' },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-16 py-20 sm:py-28 border-b border-line grid md:grid-cols-12 gap-10 reveal">
      <div className="md:col-span-4">
        <p className="eyebrow">(02) About</p>
        <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
          Learning <em className="italic text-accent">by doing.</em>
        </h2>
      </div>

      <div className="md:col-span-8 space-y-12">
        <p className="font-display text-2xl sm:text-3xl leading-snug">
          Hello! I am Roby Arjuna Wijaya, a developer focused on mobile development, web
          development, and software engineering, based in Surabaya, Indonesia.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 text-muted leading-relaxed">
          <p>
            Currently, I am focused on software development, studying Waterfall and Agile
            methodologies using the Scrum framework to improve team effectiveness and project flow.
          </p>
          <p>
            I apply <span className="text-ink font-medium">Clean Code</span> principles to keep code
            maintainable and understandable, and use{' '}
            <span className="text-ink font-medium">Design Patterns</span> to solve complex software
            architecture and state-management challenges.
          </p>
          <p className="sm:col-span-2">
            As a Mobile & Full-Stack Engineer, I craft high-performance cross-platform apps with{' '}
            <span className="text-ink font-medium">Flutter & Dart</span>, build responsive SPAs with{' '}
            <span className="text-ink font-medium">React.js & Next.js</span>, architect backends with{' '}
            <span className="text-ink font-medium">Laravel & Supabase</span>, and engineer real-time
            computer vision models using <span className="text-ink font-medium">YOLOv8 & OpenCV</span>.
          </p>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 border-t border-line">
          {CAPABILITIES.map((c) => (
            <div key={c.name} className="pt-5 pr-4">
              <dt className="font-display text-2xl">{c.name}</dt>
              <dd className="eyebrow mt-1">{c.area}</dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label="Practices">
          {PRACTICES.map((p) => (
            <li key={p} className="px-3 py-1.5 rounded-full border border-line font-mono text-xs uppercase tracking-wider">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
