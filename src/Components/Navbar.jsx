import React, { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {
      // storage blocked (private mode): theme still applies for this visit
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-line text-ink hover:bg-surface-2 transition-colors"
    >
      {dark ? <FiSun size={18} aria-hidden="true" /> : <FiMoon size={18} aria-hidden="true" />}
    </button>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-[100] bg-bg/85 backdrop-blur-md border-b border-line">
      <nav
        aria-label="Main"
        className="max-w-page mx-auto px-4 sm:px-8 h-16 flex items-center justify-between"
      >
        <a href="#intro" className="font-display text-xl tracking-tight" onClick={close}>
          Roby Arjuna<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-8">
          <ul className="hidden md:flex gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden w-11 h-11 inline-flex items-center justify-center text-ink"
          >
            {open ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="md:hidden border-t border-line bg-bg"
      >
        <ul className="max-w-page mx-auto px-4 py-4">
          {LINKS.map((l) => (
            <li key={l.href} className="border-b border-line last:border-0">
              <a
                href={l.href}
                onClick={close}
                className="block py-3 font-display text-2xl"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
