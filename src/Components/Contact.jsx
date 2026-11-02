import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const FIELD =
  'w-full bg-transparent border-0 border-b border-line focus:border-ink focus:ring-0 px-0 py-3 text-lg outline-none transition-colors placeholder:text-muted/60';

const Contact = ({ siteConfig }) => {
  const email = siteConfig?.email_address || 'robiarjunawijaya@gmail.com';
  const githubUrl = siteConfig?.github_url || 'https://github.com/RobyArjuna';
  const linkedinUrl = siteConfig?.linkedin_url || 'https://www.linkedin.com/in/RobyArjuna';

  return (
    <section id="contact" className="scroll-mt-16 py-20 sm:py-28 grid md:grid-cols-12 gap-14 md:gap-10">
      <div className="md:col-span-6 reveal">
        <p className="eyebrow">(05) Contact</p>
        <h2 className="font-display text-5xl sm:text-6xl mt-4 leading-[1.02] tracking-tight">
          Let's build something <em className="italic text-accent">exceptional.</em>
        </h2>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-md">
          Interested in collaboration or have a project in mind? Reach out and let's build
          something exceptional together.
        </p>

        <a
          href={`mailto:${email}`}
          className="mt-10 inline-flex items-center gap-2 font-display text-2xl sm:text-3xl link-underline break-all"
        >
          {email} <FiArrowUpRight aria-hidden="true" className="shrink-0 text-accent" />
        </a>

        <ul className="mt-8 flex gap-6 font-mono text-xs uppercase tracking-[0.18em]">
          <li>
            <a className="link-underline text-muted hover:text-ink" href={githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="link-underline text-muted hover:text-ink" href={linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <form
        action="https://getform.io/f/cba16026-2d63-491a-8ab8-33f0ea8cdcb6"
        method="POST"
        className="md:col-span-6 space-y-8 reveal"
      >
        <div>
          <label htmlFor="name" className="eyebrow">Full name</label>
          <input className={FIELD} type="text" id="name" name="name" autoComplete="name" placeholder="John Doe" required />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow">Email address</label>
          <input className={FIELD} type="email" id="email" name="email" autoComplete="email" placeholder="john@example.com" required />
        </div>
        <div>
          <label htmlFor="message" className="eyebrow">Message</label>
          <textarea className={`${FIELD} resize-none`} id="message" name="message" rows="4" placeholder="How can I help you?" required />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 min-h-[48px] px-8 rounded-full bg-ink text-bg font-medium hover:bg-accent hover:text-accent-ink transition-colors"
        >
          Send message <FiArrowUpRight aria-hidden="true" />
        </button>
      </form>
    </section>
  );
};

export default Contact;
