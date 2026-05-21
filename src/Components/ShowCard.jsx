import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaTimes, FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const ShowCard = ({ activeId, setShowCard, skills = [] }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getProjectDetails() {
      if (!activeId) return;

      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', activeId)
        .single();

      if (error) {
        console.error('Error fetching project details:', error);
        setErrorMsg('Failed to load project details. Please try again.');
      } else {
        setProject(data);
      }
      setLoading(false);
    }

    getProjectDetails();
  }, [activeId]);

  if (loading) {
    return (
      <div className="w-full h-screen fixed inset-0 z-[150] bg-background/85 backdrop-blur-md flex items-center justify-center font-body-md">
        <div className="text-primary text-xl font-headline-md tracking-wide animate-pulse">
          Retrieving details...
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="w-full h-screen fixed inset-0 z-[150] bg-background/85 backdrop-blur-md flex flex-col items-center justify-center font-body-md gap-4">
        <div className="text-status-error text-xl font-headline-md">{errorMsg}</div>
        <button
          onClick={() => setShowCard(false)}
          className="px-6 py-3 border border-status-error text-white font-bold rounded-lg uppercase hover:bg-aurora-red transition-all"
        >
          Close Panel
        </button>
      </div>
    );
  }

  if (!project) return null;

  // Split technology string into a clean array
  const techArray = Array.isArray(project.tech)
    ? project.tech
    : project.tech?.split(',').map((t) => t.trim()) || [];

  return (
    <div className="w-full h-screen fixed inset-0 z-[150] bg-[#030e21]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="glass-panel max-w-[800px] w-full mx-auto rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] relative border border-glass-border shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setShowCard(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-surface-container-high border border-glass-border hover:border-aurora-cyan rounded-lg text-primary hover:text-white transition-all z-20 shadow-lg"
          aria-label="Close details"
        >
          <FaTimes size={18} />
        </button>

        {/* Project Image Frame */}
        <div className="flex justify-center mb-6 overflow-hidden rounded-xl border border-glass-border bg-surface-container-lowest max-h-80 select-none shadow-md">
          <img
            className="rounded-xl w-full object-cover max-h-80 hover:scale-[1.02] transition-transform duration-500"
            src={project.gambar_url}
            alt={project.judul}
          />
        </div>

        {/* Modal Headings */}
        <h2 className="font-headline-lg text-headline-lg text-primary mb-3 select-none">
          {project.judul}
        </h2>

        {/* Description Text */}
        <p className="text-body-md text-on-surface-variant leading-relaxed mb-6 font-normal">
          {project.desc}
        </p>

        {/* Dynamic Tech Tags */}
        {techArray.length > 0 && (
          <div className="mb-8 select-none">
            <h4 className="text-sm font-label-caps tracking-wider text-primary mb-3 uppercase">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {techArray.map((item, idx) => {
                const name = item.trim().toLowerCase();
                let matchingSkill = null;
                if (skills.length > 0) {
                  if (name === 'react') matchingSkill = skills.find((s) => s.name.toLowerCase() === 'reactjs');
                  else if (name === 'tailwind') matchingSkill = skills.find((s) => s.name.toLowerCase() === 'tailwind css');
                  else if (name === 'js') matchingSkill = skills.find((s) => s.name.toLowerCase() === 'javascript');
                  else if (name === 'flutter') matchingSkill = skills.find((s) => s.name.toLowerCase() === 'dart');
                  else {
                    matchingSkill = skills.find((s) => {
                      const sName = s.name.toLowerCase();
                      return sName.includes(name) || name.includes(sName);
                    });
                  }
                }

                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-label-code border border-primary-container/30 text-primary-container rounded-lg bg-aurora-cyan/30 uppercase font-bold transition-all hover:bg-aurora-cyan/50"
                  >
                    {matchingSkill?.icon_url && (
                      <img
                        src={matchingSkill.icon_url}
                        alt={item}
                        className="w-4 h-4 object-contain filter brightness-100"
                      />
                    )}
                    <span>{item}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Button Links */}
        <div className="flex flex-wrap gap-4 pt-2 select-none">
          {project.link_demo && (
            <a
              href={project.link_demo}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-primary-container text-on-primary font-bold rounded-lg uppercase shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 font-label-code text-sm"
            >
              Live Demo <FiExternalLink size={16} />
            </a>
          )}
          {project.link_github && (
            <a
              href={project.link_github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 border border-primary-container text-primary-container font-bold rounded-lg uppercase hover:bg-aurora-cyan transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 font-label-code text-sm"
            >
              GitHub Source <FaGithub size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
