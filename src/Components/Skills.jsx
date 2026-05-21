import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { handleCardMouseMove, handleCardMouseLeave, initScrollReveal } from '../utils/cardEffects';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial skills from Supabase
    async function getSkills() {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching skills:', error);
      } else {
        setSkills(data || []);
      }
      setLoading(false);
    }
    getSkills();

    // Subscribe to Supabase Realtime changes
    const skillsSubscription = supabase
      .channel('public:skills')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skills',
        },
        (payload) => {
          setSkills((prevSkills) => {
            if (payload.eventType === 'INSERT') {
              const allSkills = [...prevSkills, payload.new];
              return allSkills.sort((a, b) => a.order - b.order);
            }
            if (payload.eventType === 'UPDATE') {
              const updatedSkills = prevSkills.map((skill) =>
                skill.id === payload.new.id ? payload.new : skill
              );
              return updatedSkills.sort((a, b) => a.order - b.order);
            }
            if (payload.eventType === 'DELETE') {
              return prevSkills.filter((skill) => skill.id !== payload.old.id);
            }
            return prevSkills;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(skillsSubscription);
    };
  }, []);

  // Re-trigger scroll reveal when skills data renders
  useEffect(() => {
    if (!loading) {
      // Re-scan DOM and attach observers to newly rendered dynamic elements
      initScrollReveal();
    }
  }, [loading]);

  // Helper to determine neon glow color based on skill name
  const getGlowStyle = (name) => {
    const n = name.toLowerCase();
    if (n.includes('react') || n.includes('next') || n.includes('flutter') || n.includes('tailwind') || n.includes('js') || n.includes('javascript') || n.includes('css')) {
      return 'bg-aurora-cyan group-hover:shadow-[0_0_20px_#00f2fe] border-primary-container/30';
    }
    if (n.includes('laravel') || n.includes('php') || n.includes('html') || n.includes('git') || n.includes('red') || n.includes('firebase')) {
      return 'bg-aurora-red group-hover:shadow-[0_0_20px_#ff3b30] border-status-error/30';
    }
    if (n.includes('supabase') || n.includes('mongo') || n.includes('sql') || n.includes('db') || n.includes('node') || n.includes('python')) {
      return 'bg-emerald-500/10 group-hover:shadow-[0_0_20px_#10b981] border-emerald-500/30';
    }
    return 'bg-aurora-cyan group-hover:shadow-[0_0_20px_#00f2fe] border-primary-container/30';
  };

  return (
    <section id="skills" name="skills" className="mt-section-gap select-none">
      <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-16 reveal">
        Technical Expertise
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-body-lg text-on-surface-variant animate-pulse">Loading technical stacks...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 stagger-reveal">
          {skills.map((skill) => (
            <div
              key={skill.id}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 group cursor-default"
            >
              {/* Dynamic Logo frame */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-lg border transition-all duration-300 p-2.5 ${getGlowStyle(
                  skill.name
                )}`}
              >
                {skill.icon_url ? (
                  <img
                    src={skill.icon_url}
                    alt={skill.name}
                    className="w-full h-full object-contain filter brightness-100 hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary text-2xl">
                    terminal
                  </span>
                )}
              </div>
              <span className="text-label-code font-label-code text-on-surface-variant font-medium text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
