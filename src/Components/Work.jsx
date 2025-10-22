import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ShowCard from './ShowCard';

const Work = () => {
  const [nextItems, setNextItems] = useState(6);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    AOS.init();

    async function getProjects() {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('*');

      if (error) {
        console.error('❌ Error mengambil data proyek:', error.message);
      } else {
        setPortfolios(data);
      }
      setLoading(false);
    }

    getProjects();
  }, []);

  const handleLoadMore = () => setNextItems((prev) => prev + 3);
  const handleShowCard = (id) => {
    setShowCard(true);
    setActiveId(id);
  };

  if (loading) {
    return (
      <section
        name="work"
        className="w-full min-h-screen flex justify-center items-center bg-white text-[#2F3645]">
        <p className="text-2xl">Memuat proyek...</p>
      </section>
    );
  }

  return (
    <section
      name="work"
      className="w-full bg-white text-[#2F3645] font-sans">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-[#C23B22] text-[#0a192f]">Work Experience</p>
          <p className="py-6">Checkout My Work Experience</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {portfolios.slice(0, nextItems).map((portfolio) => (
            <div
              key={portfolio.id}
              className="group relative border-2 border-gray-200 rounded-lg p-2 flex justify-center items-center"
              data-aos="fade-zoom-in"
              data-aos-delay="50"
              data-aos-duration="1000">
              <figure>
                <img
                  className="rounded-[8px] w-full h-full object-cover"
                  src={portfolio.gambar_url}
                  alt={portfolio.judul}
                />
              </figure>

              <div className="absolute top-0 left-0 w-full h-full bg-[#0a192f]/30 backdrop-blur-sm rounded-[8px] hidden group-hover:flex items-center justify-center cursor-pointer">
                <button
                  onClick={() => handleShowCard(portfolio.id)}
                  className="text-white bg-[#0a192f] hover:bg-[#53565a] py-2 px-4 rounded-[8px] ease-in duration-200">
                  See details
                </button>
              </div>
            </div>
          ))}
        </div>

        {nextItems < portfolios.length && portfolios.length > 6 && (
          <div className="text-center my-8">
            <button
              onClick={handleLoadMore}
              className="text-white bg-[#0a192f] hover:bg-[#53565a] py-2 px-4 rounded-[8px] ease-in duration-200">
              Load More
            </button>
          </div>
        )}

        {showCard && (
          <ShowCard
            setShowCard={setShowCard}
            activeId={activeId}
          />
        )}
      </div>
    </section>
  );
};

export default Work;
