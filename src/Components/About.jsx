import React from 'react';
import { handleCardMouseMove, handleCardMouseLeave } from '../utils/cardEffects';

const About = () => {
  return (
    <section
      id="about"
      name="about"
      className="mt-section-gap grid grid-cols-1 md:grid-cols-12 gap-grid-gutter stagger-reveal"
    >
      {/* Bento Card 1: Greeting & Intro (Span 4) */}
      <div
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        className="md:col-span-4 glass-panel p-8 rounded-xl flex flex-col justify-between select-none"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-status-error/5 blur-3xl rounded-full"></div>
        <div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">About Me</h3>
          <p className="text-body-md text-on-surface leading-relaxed font-semibold">
            Hello! I am <span className="text-primary-container">Roby Arjuna Wijaya</span>, a developer focused on mobile development, web development, and software engineering.
          </p>
        </div>
        <div className="mt-8 text-label-code font-label-code text-on-surface-variant flex items-center gap-2">
          <span>🚀 Learning by Doing</span>
        </div>
      </div>

      {/* Bento Card 2: Core Philosophy & Methodologies (Span 8) */}
      <div
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        className="md:col-span-8 glass-panel p-8 rounded-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-3xl rounded-full"></div>
        <h3 className="font-headline-md text-headline-md text-primary mb-4">Core Philosophy</h3>
        <p className="text-body-md text-on-surface-variant leading-relaxed mb-4">
          Currently, I am focused on software development, studying Waterfall and Agile methodologies using the Scrum framework to improve team effectiveness and project flow.
        </p>
        <p className="text-body-md text-on-surface-variant leading-relaxed">
          I apply <span className="text-primary-container font-semibold">Clean Code</span> principles to ensure my code is maintainable and understandable, and I use advanced <span className="text-primary-container font-semibold">Design Patterns</span> to solve complex software architecture and state-management challenges.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-surface-container-high rounded-lg text-label-code font-label-code border border-glass-border select-none">
            SCRUM
          </span>
          <span className="px-4 py-2 bg-surface-container-high rounded-lg text-label-code font-label-code border border-glass-border select-none">
            AGILE
          </span>
          <span className="px-4 py-2 bg-surface-container-high rounded-lg text-label-code font-label-code border border-glass-border select-none">
            CLEAN CODE
          </span>
          <span className="px-4 py-2 bg-surface-container-high rounded-lg text-label-code font-label-code border border-glass-border select-none">
            DESIGN PATTERNS
          </span>
        </div>
      </div>

      {/* Bento Card 3: Location Surabaya (Span 4) */}
      <div
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        className="md:col-span-4 glass-panel p-8 rounded-xl flex flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {/* Pulsing Beacon coordinate */}
          <span className="w-3.5 h-3.5 bg-status-success rounded-full shadow-[0_0_12px_#00f2fe] animate-pulse"></span>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Location</h3>
          <p className="text-body-md text-on-surface-variant">Surabaya, Jawa Timur, Indonesia</p>
        </div>
        <div className="h-36 w-full rounded-lg overflow-hidden grayscale mt-6 relative border border-glass-border">
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Surabaya Map"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK07Y2WkwCRcwceUwK0Xdw2-Uj_Fp1k2jHn5ULZkgujvjlx1GsNuHHT17aWbR9e-pK34HyZENPkeLe25HEZD601dVBZNRfxSrDk-f_Rm7xbgfBukSDjgMIPlAL41ZANt26bWUEjfWINUJlHFEycgW45PDI7j0LEQjzSACRu1t9WREwpKdC4EXiRKLDsf_atYirR3phlJC-Wz6bbRbZvD75C2zL3I0qeOtTG0p1TjkLtqQGJ7vCm9GIFIJuMT_MvT2SXJ97-3KnG309"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071326]/80 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Bento Card 4: Technological Reach (Span 8) */}
      <div
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        className="md:col-span-8 glass-panel p-8 rounded-xl relative overflow-hidden"
      >
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-status-error/5 blur-3xl rounded-full"></div>
        <h3 className="font-headline-md text-headline-md text-primary mb-4">Engineering Capabilities</h3>
        <p className="text-body-md text-on-surface-variant leading-relaxed">
          As a dedicated <span className="text-primary-container font-semibold">Mobile Engineer & Full-Stack Engineer</span>, I specialize in crafting elegant, high-performance cross-platform applications with <span className="text-primary-container font-semibold">Flutter & Dart</span>. Beyond mobile development, I also build responsive Single Page Applications with <span className="text-primary-container font-semibold">React.js & Next.js</span>, architect robust backends with <span className="text-primary-container font-semibold">Laravel & Supabase</span>, and engineer custom real-time computer vision models using <span className="text-primary-container font-semibold">YOLOv8</span> & <span className="text-primary-container font-semibold">OpenCV</span>.
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-aurora-cyan/20 rounded-lg border border-primary-container/40 shadow-[0_0_15px_rgba(0,242,254,0.25)] flex flex-col justify-center items-center">
            <h4 className="text-primary font-bold text-headline-md">Flutter</h4>
            <span className="text-[10px] text-primary-container font-label-code uppercase font-extrabold tracking-wider">Mobile Specialist</span>
          </div>
          <div className="p-3 bg-surface-container-high/40 rounded-lg border border-glass-border flex flex-col justify-center items-center">
            <h4 className="text-primary font-bold text-headline-md">React</h4>
            <span className="text-[10px] text-on-surface-variant font-label-code">Frontend</span>
          </div>
          <div className="p-3 bg-surface-container-high/40 rounded-lg border border-glass-border flex flex-col justify-center items-center">
            <h4 className="text-primary font-bold text-headline-md">Laravel</h4>
            <span className="text-[10px] text-on-surface-variant font-label-code">Backend</span>
          </div>
          <div className="p-3 bg-surface-container-high/40 rounded-lg border border-glass-border flex flex-col justify-center items-center">
            <h4 className="text-primary font-bold text-headline-md">YOLOv8</h4>
            <span className="text-[10px] text-on-surface-variant font-label-code">AI & Vision</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
