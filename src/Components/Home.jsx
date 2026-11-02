import React from 'react';
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import myPhoto from '../asset/noformal.png';

const ROLES = ['Mobile Developer', 'Software Engineer', 'Web Developer', 'ML Enthusiast'];

const Home = ({ siteConfig }) => {
  const githubUrl = siteConfig?.github_url || 'https://github.com/RobyArjuna';
  const linkedinUrl = siteConfig?.linkedin_url || 'https://www.linkedin.com/in/RobyArjuna';

  return (
    <section id="intro" className="scroll-mt-16 pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-line reveal">
      <div className="flex flex-wrap gap-4 items-center justify-between eyebrow mb-10 sm:mb-16">
        <span>(01) Intro</span>
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Available for new opportunities
        </span>
      </div>

      <div className="grid md:grid-cols-12 gap-12 md:gap-10 items-end">
        <div className="md:col-span-8">
          <h1 className="font-display font-medium text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.92] tracking-tight">
            Roby
            <br />
            <em className="italic font-normal text-accent">Arjuna</em>
          </h1>

          <p className="mt-8 font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-muted">
            {ROLES.join(' / ')}
          </p>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed max-w-xl">
            Architecting scalable digital experiences through precision engineering, dynamic
            integrations, and human-centered design principles.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full bg-ink text-bg font-medium hover:bg-accent hover:text-accent-ink transition-colors"
            >
              View selected work <FiArrowDownRight aria-hidden="true" />
            </a>
            {siteConfig?.resume_url && (
              <a
                href={siteConfig.resume_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full border border-ink/20 font-medium hover:border-ink transition-colors"
              >
                Resume <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            <div className="flex gap-1 ml-1">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 inline-flex items-center justify-center rounded-full text-muted hover:text-ink transition-colors"
              >
                <FaGithub size={20} aria-hidden="true" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 inline-flex items-center justify-center rounded-full text-muted hover:text-ink transition-colors"
              >
                <FaLinkedin size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <figure className="md:col-span-4 max-w-xs md:max-w-none">
          <div className="aspect-[4/5] overflow-hidden bg-surface-2">
            <img
              src={myPhoto}
              alt="Portrait of Roby Arjuna"
              width="480"
              height="600"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="eyebrow mt-3 flex justify-between">
            <span>Roby Arjuna Wijaya</span>
            <span>Surabaya, ID</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Home;
