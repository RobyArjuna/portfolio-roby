import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { handleCardMouseMove, handleCardMouseLeave } from '../utils/cardEffects';

const Contact = () => {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    async function getConfig() {
      const { data, error } = await supabase.from('site_config').select('*').single();
      if (!error && data) {
        setSiteConfig(data);
      }
    }
    getConfig();
  }, []);

  return (
    <section id="contact" name="contact" className="mt-section-gap mb-20 relative select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Let's Connect Info */}
        <div className="reveal">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Let's Connect</h2>
          <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            Interested in collaboration or have a project in mind? Reach out and let's build something exceptional together.
          </p>

          <div className="space-y-6">
            {/* Email Channel */}
            <div className="flex items-center gap-4 group/item">
              <div className="w-10 h-10 rounded-full bg-aurora-red flex items-center justify-center border border-status-error/20 group-hover/item:shadow-[0_0_12px_rgba(255,59,48,0.4)] transition-all">
                <span className="material-symbols-outlined text-status-error text-xl">mail</span>
              </div>
              <a 
                href={`mailto:${siteConfig?.email_address || 'robiarjunawijaya@gmail.com'}`}
                className="text-body-md text-primary hover:text-[#00f2fe] transition-colors"
              >
                {siteConfig?.email_address || 'robiarjunawijaya@gmail.com'}
              </a>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-4 group/item">
              <div className="w-10 h-10 rounded-full bg-aurora-cyan flex items-center justify-center border border-primary-container/20 group-hover/item:shadow-[0_0_12px_rgba(0,242,254,0.4)] transition-all">
                <span className="material-symbols-outlined text-primary-container text-xl">share</span>
              </div>
              <div className="flex gap-4">
                <a
                  className="text-primary hover:text-primary-container transition-colors font-semibold"
                  href={siteConfig?.github_url || 'https://github.com/RobyArjuna'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <span className="text-on-surface-variant">/</span>
                <a
                  className="text-primary hover:text-primary-container transition-colors font-semibold"
                  href={siteConfig?.linkedin_url || 'https://www.linkedin.com/in/RobyArjuna'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Secure Glassmorphic Form Panel */}
        <form
          action="https://getform.io/f/cba16026-2d63-491a-8ab8-33f0ea8cdcb6"
          className="glass-panel p-8 rounded-2xl space-y-6 reveal border border-glass-border"
          method="POST"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          {/* Full Name Input */}
          <div>
            <label htmlFor="name" className="block text-label-caps font-label-caps text-on-surface-variant mb-2 select-none tracking-wider">
              FULL NAME
            </label>
            <input
              className="w-full bg-transparent border-b border-glass-border focus:border-primary-container focus:ring-0 text-primary transition-all py-2 outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-label-caps font-label-caps text-on-surface-variant mb-2 select-none tracking-wider">
              EMAIL ADDRESS
            </label>
            <input
              className="w-full bg-transparent border-b border-glass-border focus:border-primary-container focus:ring-0 text-primary transition-all py-2 outline-none"
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              required
            />
          </div>

          {/* Message TextArea */}
          <div>
            <label htmlFor="message" className="block text-label-caps font-label-caps text-on-surface-variant mb-2 select-none tracking-wider">
              MESSAGE
            </label>
            <textarea
              className="w-full bg-transparent border-b border-glass-border focus:border-primary-container focus:ring-0 text-primary transition-all py-2 outline-none resize-none"
              name="message"
              id="message"
              placeholder="How can I help you?"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-primary-container text-on-primary font-bold rounded-lg uppercase shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 font-label-code"
          >
            SEND MESSAGE
          </button>
        </form>

      </div>
    </section>
  );
};

export default Contact;
