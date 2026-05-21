import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ShowCard from './ShowCard';
import { handleCardMouseMove, handleCardMouseLeave, initScrollReveal } from '../utils/cardEffects';

const Work = () => {
  const [nextItems, setNextItems] = useState(6);
  const [portfolios, setPortfolios] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const [projectsRes, skillsRes] = await Promise.all([
        supabase.from('projects').select('*').order('id', { ascending: false }),
        supabase.from('skills').select('*').order('order', { ascending: true })
      ]);

      if (projectsRes.error) {
        console.error('❌ Error fetching projects:', projectsRes.error.message);
      } else {
        setPortfolios(projectsRes.data || []);
      }

      if (skillsRes.error) {
        console.error('❌ Error fetching skills:', skillsRes.error.message);
      } else {
        setSkills(skillsRes.data || []);
      }

      setLoading(false);
    }
    getData();
  }, []);

  const findSkillMatch = (techName) => {
    if (!techName) return null;
    const name = techName.trim().toLowerCase();

    // Map common names/abbreviations to DB skills
    if (name === 'react') return skills.find((s) => s.name.toLowerCase() === 'reactjs');
    if (name === 'tailwind') return skills.find((s) => s.name.toLowerCase() === 'tailwind css');
    if (name === 'js') return skills.find((s) => s.name.toLowerCase() === 'javascript');
    if (name === 'flutter') return skills.find((s) => s.name.toLowerCase() === 'dart');

    return skills.find((s) => {
      const sName = s.name.toLowerCase();
      return sName.includes(name) || name.includes(sName);
    });
  };

  // Re-trigger scroll reveal when projects render
  useEffect(() => {
    if (!loading) {
      initScrollReveal();
    }
  }, [loading]);

  const handleLoadMore = () => setNextItems((prev) => prev + 3);
  const handleShowCard = (id) => {
    setShowCard(true);
    setActiveId(id);
  };

  return (
    <section id="projects" name="work" className="mt-section-gap relative select-none">
      {/* Header Info */}
      <div className="flex justify-between items-end mb-12 reveal">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Featured Projects</h2>
          <p className="text-on-surface-variant font-label-caps mt-2">SELECTED WORKS & EXPERIENCES</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-body-lg text-on-surface-variant animate-pulse">Loading featured projects...</p>
        </div>
      ) : (
        <>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gutter stagger-reveal">
            {portfolios.slice(0, nextItems).map((portfolio) => {
              // Parse technology list cleanly
              const techArray = Array.isArray(portfolio.tech)
                ? portfolio.tech
                : portfolio.tech?.split(',').map((t) => t.trim()) || [];

              return (
                <div
                  key={portfolio.id}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="glass-panel group rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative h-56 sm:h-64 overflow-hidden border-b border-glass-border">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={portfolio.gambar_url}
                      alt={portfolio.judul}
                    />
                    {/* Live Demo Status indicator */}
                    {portfolio.link_demo && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#071326]/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-glass-border">
                        <span className="w-2 h-2 bg-status-success rounded-full shadow-[0_0_8px_#00f2fe] animate-pulse"></span>
                        <span className="text-[10px] font-label-code text-[#00f2fe] font-bold">LIVE</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-headline-md text-headline-md text-primary mb-2 line-clamp-1">
                        {portfolio.judul}
                      </h4>
                      <p className="text-body-md text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
                        {portfolio.desc}
                      </p>
                    </div>

                    <div>
                      {/* Tech Badge Grid */}
                      <div className="flex flex-wrap gap-2 mb-6 select-none">
                        {techArray.slice(0, 3).map((tech, idx) => {
                          const matchingSkill = findSkillMatch(tech);
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-label-code border border-primary-container/30 text-primary-container rounded bg-aurora-cyan/30 uppercase font-bold transition-all hover:bg-aurora-cyan/50"
                            >
                              {matchingSkill?.icon_url && (
                                <img
                                  src={matchingSkill.icon_url}
                                  alt={tech}
                                  className="w-3.5 h-3.5 object-contain filter brightness-100"
                                />
                              )}
                              <span>{tech}</span>
                            </span>
                          );
                        })}
                        {techArray.length > 3 && (
                          <span className="px-2.5 py-1 text-[10px] font-label-code border border-glass-border text-on-surface-variant rounded bg-surface-container-high font-bold">
                            +{techArray.length - 3} MORE
                          </span>
                        )}
                      </div>

                      {/* Detail CTA Button */}
                      <button
                        onClick={() => handleShowCard(portfolio.id)}
                        className="inline-flex items-center text-primary-container hover:underline gap-2 font-label-code font-bold group/btn transition-colors hover:text-white"
                      >
                        VIEW DETAILS{' '}
                        <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1 duration-200">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {nextItems < portfolios.length && portfolios.length > 6 && (
            <div className="text-center my-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-4 border border-primary-container text-primary-container hover:bg-aurora-cyan font-bold rounded-lg uppercase transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,242,254,0.1)]"
              >
                Load More Projects
              </button>
            </div>
          )}
        </>
      )}

      {/* Dynamic ShowCard Modal */}
      {showCard && (
        <ShowCard setShowCard={setShowCard} activeId={activeId} skills={skills} />
      )}
    </section>
  );
};

export default Work;
