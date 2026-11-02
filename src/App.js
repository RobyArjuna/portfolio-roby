import React, { useEffect } from 'react';
import About from './Components/About';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Skills from './Components/Skills';
import Work from './Components/Work';
import { initScrollReveal } from './utils/cardEffects';
import { supabase } from './supabaseClient';
// import { AiChatWidget } from './ai';

function App() {
  const [siteConfig, setSiteConfig] = React.useState(null);

  useEffect(() => {
    const observer = initScrollReveal();

    // Fetched once here and passed down to every section that needs links.
    async function getConfig() {
      const { data, error } = await supabase.from('site_config').select('*').single();
      if (error) {
        console.error('Error fetching site configuration:', error);
      } else if (data) {
        setSiteConfig(data);
      }
    }
    getConfig();

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const githubUrl = siteConfig?.github_url || 'https://github.com/RobyArjuna';
  const linkedinUrl = siteConfig?.linkedin_url || 'https://www.linkedin.com/in/RobyArjuna';

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-ink focus:text-bg focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="max-w-page mx-auto px-4 sm:px-8">
        <Home siteConfig={siteConfig} />
        <About />
        <Work />
        <Skills />
        <Contact siteConfig={siteConfig} />
      </main>

      <footer className="border-t border-line">
        <div className="max-w-page mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row gap-6 justify-between sm:items-center">
          <div>
            <p className="font-display text-xl">Roby Arjuna</p>
            <p className="eyebrow mt-1">© {new Date().getFullYear()} · Surabaya, Indonesia</p>
          </div>
          <ul className="flex gap-6 text-sm">
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
            {siteConfig?.resume_url && (
              <li>
                <a className="link-underline text-muted hover:text-ink" href={siteConfig.resume_url} target="_blank" rel="noreferrer">
                  Resume
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>

      {/* <AiChatWidget /> */}
    </div>
  );
}

export default App;
