import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { supabase } from '../supabaseClient';

const Navbar = () => {
  const [navView, setNavView] = useState(false);
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    async function getConfig() {
      const { data, error } = await supabase.from('site_config').select('*').single();
      if (error) {
        console.error('Error fetching site configuration:', error);
      } else {
        setSiteConfig(data);
      }
    }
    getConfig();
  }, []);

  const handleNav = () => setNavView(!navView);

  return (
    <nav className="sticky top-0 w-full z-[100] bg-glass-surface/60 backdrop-blur-[20px] border-b border-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-grid-margin py-4">
        {/* Brand Logo */}
        <div className="text-body-lg font-headline-lg tracking-tighter text-primary dark:text-primary-fixed cursor-pointer">
          <Link to="intro" smooth={true} duration={1000}>
            Roby Arjuna
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            activeClass="text-primary-container font-bold"
            className="nav-link text-on-surface-variant hover:text-primary transition-all duration-300 text-label-caps font-label-caps cursor-pointer"
            to="intro"
            spy={true}
            smooth={true}
            duration={1000}
          >
            Intro
          </Link>
          <Link
            activeClass="text-primary-container font-bold"
            className="nav-link text-on-surface-variant hover:text-primary transition-all duration-300 text-label-caps font-label-caps cursor-pointer"
            to="projects"
            spy={true}
            smooth={true}
            duration={1000}
          >
            Projects
          </Link>
          <Link
            activeClass="text-primary-container font-bold"
            className="nav-link text-on-surface-variant hover:text-primary transition-all duration-300 text-label-caps font-label-caps cursor-pointer"
            to="skills"
            spy={true}
            smooth={true}
            duration={1000}
          >
            Skills
          </Link>
          <Link
            activeClass="text-primary-container font-bold"
            className="nav-link text-on-surface-variant hover:text-primary transition-all duration-300 text-label-caps font-label-caps cursor-pointer"
            to="contact"
            spy={true}
            smooth={true}
            duration={1000}
          >
            Contact
          </Link>
        </div>

        {/* Decorative Tools */}
        <div className="flex items-center gap-4 text-primary">
          <a
            href={siteConfig?.github_url || "https://github.com/robyarjuna"}
            target="_blank"
            rel="noreferrer"
            className="material-symbols-outlined cursor-pointer hover:bg-aurora-cyan p-2 rounded-lg transition-all"
            title="View Code"
          >
            code
          </a>
          <Link
            to="contact"
            smooth={true}
            duration={1000}
            className="material-symbols-outlined cursor-pointer hover:bg-aurora-cyan p-2 rounded-lg transition-all"
            title="Open Console"
          >
            terminal
          </Link>
          {/* Mobile Menu Toggle Button */}
          <div onClick={handleNav} className="md:hidden text-primary cursor-pointer ml-2">
            {navView ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          navView
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-10 pointer-events-none'
        } absolute top-full left-0 w-full bg-background/95 backdrop-blur-[20px] border-b border-glass-border flex flex-col justify-center items-center py-8 space-y-6 text-xl font-semibold transition-all duration-300 z-50`}
      >
        <Link
          onClick={handleNav}
          className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          to="intro"
          smooth={true}
          duration={1000}
        >
          Intro
        </Link>
        <Link
          onClick={handleNav}
          className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          to="projects"
          smooth={true}
          duration={1000}
        >
          Projects
        </Link>
        <Link
          onClick={handleNav}
          className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          to="skills"
          smooth={true}
          duration={1000}
        >
          Skills
        </Link>
        <Link
          onClick={handleNav}
          className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          to="contact"
          smooth={true}
          duration={1000}
        >
          Contact
        </Link>
      </div>

      {/* Glassmorphic Floating Social Drawer (Desktop) */}
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0 z-50 select-none">
        <ul>
          <li className="w-[140px] h-[50px] flex justify-between items-center ml-[-90px] hover:ml-0 duration-300 bg-glass-surface/85 backdrop-blur-md border border-glass-border rounded-r-lg hover:border-aurora-cyan">
            <a
              href={siteConfig?.github_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center w-full text-on-surface hover:text-primary-container px-4 font-label-code"
            >
              GitHub <FaGithub size={20} className="text-primary-container" />
            </a>
          </li>

          <li className="w-[140px] h-[50px] flex justify-between items-center ml-[-90px] hover:ml-0 duration-300 bg-glass-surface/85 backdrop-blur-md border border-glass-border rounded-r-lg hover:border-aurora-cyan mt-2">
            <a
              href={siteConfig?.linkedin_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center w-full text-on-surface hover:text-primary-container px-4 font-label-code"
            >
              LinkedIn <FaLinkedin size={20} className="text-primary-container" />
            </a>
          </li>

          <li className="w-[140px] h-[50px] flex justify-between items-center ml-[-90px] hover:ml-0 duration-300 bg-glass-surface/85 backdrop-blur-md border border-glass-border rounded-r-lg hover:border-aurora-cyan mt-2">
            <a
              href={`mailto:${siteConfig?.email_address || ''}`}
              className="flex justify-between items-center w-full text-on-surface hover:text-primary-container px-4 font-label-code"
            >
              Email <MdEmail size={20} className="text-primary-container" />
            </a>
          </li>

          <li className="w-[140px] h-[50px] flex justify-between items-center ml-[-90px] hover:ml-0 duration-300 bg-glass-surface/85 backdrop-blur-md border border-glass-border rounded-r-lg hover:border-aurora-cyan mt-2">
            <a
              href={siteConfig?.resume_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center w-full text-on-surface hover:text-primary-container px-4 font-label-code"
            >
              Resume <BsFillFileEarmarkPersonFill size={20} className="text-primary-container" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
