import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { supabase } from '../supabaseClient';
import ShowCard, { toTechArray } from './ShowCard';

const Work = () => {
  const [nextItems, setNextItems] = useState(6);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const closeCard = useCallback(() => setActive(null), []);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error.message);
      } else {
        setPortfolios(data || []);
      }
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <section id="projects" className="scroll-mt-16 py-20 sm:py-28 border-b border-line">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14 reveal">
        <div>
          <p className="eyebrow">(03) Selected work</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
            Featured <em className="italic text-accent">projects</em>
          </h2>
        </div>
        {!loading && (
          <p className="eyebrow">{String(portfolios.length).padStart(2, '0')} projects</p>
        )}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16" aria-busy="true" aria-label="Loading projects">
          {[0, 1].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/10] bg-surface-2" />
              <div className="h-7 w-2/3 bg-surface-2 mt-6" />
              <div className="h-4 w-full bg-surface-2 mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {portfolios.slice(0, nextItems).map((portfolio, i) => {
              const techArray = toTechArray(portfolio.tech);

              return (
                <article key={portfolio.id} className="group relative">
                  <div className="aspect-[16/10] overflow-hidden bg-surface-2">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      src={portfolio.gambar_url}
                      alt=""
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-6 flex gap-5">
                    <span className="font-mono text-sm text-muted pt-1.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-2xl sm:text-3xl leading-tight">
                        <button
                          type="button"
                          onClick={() => setActive(portfolio)}
                          className="text-left after:absolute after:inset-0"
                        >
                          {portfolio.judul}
                        </button>
                        <FiArrowUpRight
                          aria-hidden="true"
                          className="inline ml-2 align-baseline text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </h3>
                      <p className="mt-3 text-muted leading-relaxed line-clamp-2">{portfolio.desc}</p>
                      {techArray.length > 0 && (
                        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
                          {techArray.join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {nextItems < portfolios.length && (
            <div className="text-center mt-16">
              <button
                type="button"
                onClick={() => setNextItems((prev) => prev + 4)}
                className="min-h-[44px] px-6 rounded-full border border-ink/20 font-medium hover:border-ink transition-colors"
              >
                Load more projects
              </button>
            </div>
          )}
        </>
      )}

      {active && <ShowCard project={active} onClose={closeCard} />}
    </section>
  );
};

export default Work;
