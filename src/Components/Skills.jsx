import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FiCode } from 'react-icons/fi';

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

  return (
    <section id="skills" className="scroll-mt-16 py-20 sm:py-28 border-b border-line">
      <div className="mb-14 reveal">
        <p className="eyebrow">(04) Toolkit</p>
        <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
          Technical <em className="italic text-accent">expertise</em>
        </h2>
      </div>

      {loading ? (
        <p className="text-muted animate-pulse" aria-busy="true">Loading skills…</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-l border-t border-line">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="border-r border-b border-line p-6 flex flex-col items-center gap-4 text-center hover:bg-surface-2 transition-colors"
            >
              {skill.icon_url ? (
                <img src={skill.icon_url} alt="" width="40" height="40" loading="lazy" className="w-10 h-10 object-contain" />
              ) : (
                <FiCode size={32} aria-hidden="true" className="text-muted" />
              )}
              <span className="font-mono text-xs uppercase tracking-wider">{skill.name}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Skills;
