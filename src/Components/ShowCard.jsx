import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiArrowUpRight, FiGithub } from 'react-icons/fi';

export const toTechArray = (tech) =>
  Array.isArray(tech) ? tech : tech?.split(',').map((t) => t.trim()).filter(Boolean) || [];

const ShowCard = ({ project, onClose }) => {
  const closeRef = useRef(null);

  // Esc to close, lock page scroll, move focus into the dialog and restore it after.
  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  const techArray = toTechArray(project.tech);

  return createPortal(
    <div
      className="fixed inset-0 z-[150] bg-ink/40 backdrop-blur-sm overflow-y-auto p-4 sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className="relative max-w-3xl mx-auto my-8 bg-bg text-ink border border-line"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-3 right-3 z-10 w-11 h-11 inline-flex items-center justify-center rounded-full bg-bg/90 border border-line hover:bg-surface-2 transition-colors"
        >
          <FiX size={20} aria-hidden="true" />
        </button>

        <div className="aspect-[16/9] bg-surface-2">
          <img className="w-full h-full object-cover" src={project.gambar_url} alt="" />
        </div>

        <div className="p-6 sm:p-10">
          <p className="eyebrow">Project</p>
          <h2 id="project-title" className="font-display text-3xl sm:text-4xl mt-3 leading-tight">
            {project.judul}
          </h2>

          <p className="mt-6 text-muted leading-relaxed whitespace-pre-line">{project.desc}</p>

          {techArray.length > 0 && (
            <div className="mt-8 pt-6 border-t border-line">
              <h3 className="eyebrow mb-3">Technologies</h3>
              <ul className="flex flex-wrap gap-2">
                {techArray.map((item) => (
                  <li key={item} className="px-3 py-1.5 rounded-full border border-line font-mono text-xs uppercase tracking-wider">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.link_demo || project.link_github) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.link_demo && (
                <a
                  href={project.link_demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full bg-ink text-bg font-medium hover:bg-accent hover:text-accent-ink transition-colors"
                >
                  Live demo <FiArrowUpRight aria-hidden="true" />
                </a>
              )}
              {project.link_github && (
                <a
                  href={project.link_github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full border border-ink/20 font-medium hover:border-ink transition-colors"
                >
                  <FiGithub aria-hidden="true" /> Source code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ShowCard;
