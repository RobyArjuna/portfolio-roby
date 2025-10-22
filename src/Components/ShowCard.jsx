import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ShowCard = ({ activeId, setShowCard }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    async function getProjectDetails() {
      if (!activeId) return;

      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase.from('projects').select('*').eq('id', activeId).single();

      if (error) {
        console.error('Error mengambil detail proyek:', error);
        setErrorMsg('Gagal memuat data proyek. Silakan coba lagi.');
      } else {
        setProject(data);
      }
      setLoading(false);
    }

    getProjectDetails();
  }, [activeId]);

  if (loading) {
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-10 bg-[#0a192f]/10 backdrop-blur-sm flex items-center justify-center font-sans">
        <div className="text-white text-xl">Memuat detail...</div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-10 bg-[#0a192f]/10 backdrop-blur-sm flex items-center justify-center font-sans">
        <div className="text-red-500 text-xl">{errorMsg}</div>
        <button
          onClick={() => setShowCard(false)}
          className="absolute top-5 right-5 text-white text-2xl">
          <FaTimes />
        </button>
      </div>
    );
  }

  if (!project) return null;

  // Jika tech masih string terpisah koma, split menjadi array
  const techArray = Array.isArray(project.tech) ? project.tech : project.tech?.split(',').map((t) => t.trim()) || [];

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-10 bg-[#0a192f]/10 backdrop-blur-sm flex items-center justify-center font-sans">
      <div className="max-w-[1000px] w-[80%] sm:w-[60%] lg:w-[40%] mx-auto bg-white rounded-[8px] p-5 overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={() => setShowCard(false)}
          className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center bg-white rounded-md text-[#0a192f] hover:text-red-500">
          <FaTimes />
        </button>

        <div className="flex justify-center mb-5">
          <img
            className="rounded-[8px] max-h-60 object-contain"
            src={project.gambar_url}
            alt={project.judul}
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#0a192f] mb-3">{project.judul}</h2>
        <p className="text-[12px] sm:text-[15px] text-[#4d4d4d] mb-5">{project.desc}</p>

        {techArray.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <h4 className="text-[14px] sm:text-[18px] font-bold text-[#0a192f]">Technologies:</h4>
            {techArray.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-200 py-1 px-2 rounded-[5px] text-[12px] sm:text-[14px] text-[#0a192f]">
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          {project.link_demo && (
            <a
              href={project.link_demo}
              target="_blank"
              rel="noreferrer">
              <button className="bg-[#0a192f] text-white py-2 px-4 rounded-[8px] hover:bg-[#53565a] text-[12px] sm:text-[14px]">Live Site</button>
            </a>
          )}
          {project.link_github && (
            <a
              href={project.link_github}
              target="_blank"
              rel="noreferrer">
              <button className="bg-[#333] text-white py-2 px-4 rounded-[8px] hover:bg-[#555] text-[12px] sm:text-[14px]">GitHub</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
