import React, { useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { supabase } from '../supabaseClient';
import myPhoto from '../asset/noformal.png';

const TypingEffect = ({ texts, speed = 150, pause = 1500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index % texts.length];
    let timeout;

    if (!isDeleting && displayText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, speed);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setIndex(index + 1);
        }
      }, pause);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, texts, speed, pause]);

  return (
    <span className="text-primary-container border-r-2 border-primary-container animate-pulse pr-1">
      {displayText}
    </span>
  );
};

const Home = () => {
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
    <section
      id="intro"
      name="home"
      className="min-h-[921px] flex flex-col md:flex-row items-center justify-between pt-28 pb-12 gap-12 reveal"
    >
      {/* Left Column: Text & CTAs */}
      <div className="flex-1 flex flex-col items-start text-left">
        {/* Availability Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full border border-primary-container/30 bg-aurora-cyan text-primary-container text-label-code font-label-code mb-6 select-none animate-pulse">
          🟢 AVAILABLE FOR NEW OPPORTUNITIES
        </div>

        {/* Name Heading */}
        <h1 className="font-headline-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tighter mb-4 leading-none select-none">
          Roby Arjuna
        </h1>

        {/* Dynamic Typing Title */}
        <h2 className="font-headline-md text-headline-md text-on-surface-variant mb-6 h-[40px] md:h-[48px] select-none">
          I am a <TypingEffect texts={[
            'Mobile Developer',
            'Software Engineer',
            'Web Developer',
            'ML Enthusiast'
          ]} />
        </h2>

        {/* Summary Description */}
        <p className="text-body-lg text-on-surface-variant mb-12 max-w-xl leading-relaxed">
          Architecting scalable digital experiences through precision engineering, dynamic integrations, and human-centered design principles.
        </p>

        {/* Buttons / CTAs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            to="projects"
            smooth={true}
            duration={1000}
            className="btn-pulse px-8 py-4 bg-status-error text-white font-bold rounded-lg uppercase transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 select-none"
          >
            View My Work <HiArrowNarrowRight />
          </Link>
          {siteConfig?.resume_url && (
            <a
              href={siteConfig.resume_url}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-primary-container text-primary-container font-bold rounded-lg uppercase hover:bg-aurora-cyan transition-all active:scale-95 flex items-center select-none"
            >
              Download Resume
            </a>
          )}
        </div>

        {/* Quick Social Badges */}
        <div className="flex gap-4 items-center">
          <a
            href={siteConfig?.github_url || "https://github.com/robyarjuna"}
            target="_blank"
            rel="noreferrer"
            className="text-on-surface-variant hover:text-primary transition-all duration-300 p-2 bg-surface-container/50 rounded-full border border-glass-border hover:border-aurora-cyan"
            aria-label="GitHub"
          >
            <FaGithub size={22} />
          </a>
          <a
            href={siteConfig?.linkedin_url || "https://linkedin.com/in/robyarjuna"}
            target="_blank"
            rel="noreferrer"
            className="text-on-surface-variant hover:text-primary transition-all duration-300 p-2 bg-surface-container/50 rounded-full border border-glass-border hover:border-aurora-cyan"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>

      {/* Right Column: Premium Glowing Avatar */}
      <div className="flex-1 flex justify-center items-center relative select-none">
        {/* Glow Spheres in Background */}
        <div className="absolute w-72 h-72 bg-aurora-cyan rounded-full blur-[80px] -z-10 animate-pulse"></div>
        <div className="absolute w-48 h-48 bg-status-error/10 rounded-full blur-[60px] -z-10 animate-bounce duration-[10s]"></div>

        {/* Frame Container */}
        <div className="relative p-3 rounded-full bg-glass-surface border border-glass-border shadow-2xl backdrop-blur-md hover:border-primary-container/40 transition-colors duration-500">
          {/* Animated gradient ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-container via-transparent to-status-error opacity-40 animate-spin duration-[20s] -z-10"></div>
          
          <img
            src={myPhoto}
            alt="Roby Arjuna"
            className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] object-cover rounded-full shadow-inner relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
