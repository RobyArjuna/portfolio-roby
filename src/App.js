import React, { useEffect } from 'react';
import './App.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Skills from './Components/Skills';
import Work from './Components/Work';
import ParticleBackground from './Components/ParticleBackground';
import { initScrollReveal } from './utils/cardEffects';
import { supabase } from './supabaseClient';

function App() {
  const [siteConfig, setSiteConfig] = React.useState(null);

  useEffect(() => {
    // Initialize Scroll Reveal observers
    const observer = initScrollReveal();

    // Fetch Site Config globally to distribute where needed (e.g. Footer)
    async function getConfig() {
      const { data, error } = await supabase.from('site_config').select('*').single();
      if (!error && data) {
        setSiteConfig(data);
      }
    }
    getConfig();

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="font-body-md text-on-surface antialiased bg-background min-h-screen relative">
      {/* Dynamic Backgrounds */}
      <ParticleBackground />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Main Structural Wrapper */}
      <main className="max-w-container-max mx-auto px-grid-margin relative z-10">
        <Home />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>

      {/* Premium Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-glass-border relative z-10 mt-section-gap">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-grid-margin max-w-container-max mx-auto gap-8">
          <div className="text-headline-md font-headline-md text-primary">Roby Arjuna</div>
          <div className="text-body-md font-body-md text-on-surface-variant text-center md:text-left">
            © 2026 Roby Arjuna. Built with Cyber-Glass precision.
          </div>
          <div className="flex gap-6 text-label-code font-label-code">
            <a 
              className="text-on-surface-variant hover:text-primary transition-colors" 
              href={siteConfig?.github_url || "https://github.com/robyarjuna"} 
              target="_blank" 
              rel="noreferrer"
            >
              GitHub
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary transition-colors" 
              href={siteConfig?.linkedin_url || "https://linkedin.com/in/robyarjuna"} 
              target="_blank" 
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary transition-colors" 
              href={siteConfig?.resume_url || "#"} 
              target="_blank" 
              rel="noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
