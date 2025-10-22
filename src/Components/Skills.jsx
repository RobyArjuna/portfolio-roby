import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { supabase } from '../supabaseClient'; // IMPORT SUPABASE CLIENT

// --- Custom Arrow Components ---
const arrowClasses =
  'absolute top-1/2 z-10 transform -translate-y-1/2 cursor-pointer bg-[#C23B22] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-[#C23B22] hover:bg-white hover:text-[#C23B22] transition-transform hover:scale-110';

const NextArrow = ({ onClick }) => (
  <div
    className={`${arrowClasses} right-4`}
    onClick={onClick}>
    <FaChevronRight className="text-2xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className={`${arrowClasses} left-4`}
    onClick={onClick}>
    <FaChevronLeft className="text-2xl" />
  </div>
);

// --- Main Component ---
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    // 1️⃣ Ambil data awal
    async function getSkills() {
      setLoading(true);
      const { data, error } = await supabase.from('skills').select('*').order('order', { ascending: true });

      if (error) {
        console.error('Error mengambil data skills:', error);
      } else {
        setSkills(data || []);
      }
      setLoading(false);
    }

    getSkills();

    // 2️⃣ Subscribe ke perubahan realtime Supabase
    const skillsSubscription = supabase
      .channel('public:skills')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'skills',
        },
        (payload) => {
          console.log('Perubahan terdeteksi!', payload);

          setSkills((prevSkills) => {
            if (payload.eventType === 'INSERT') {
              const allSkills = [...prevSkills, payload.new];
              return allSkills.sort((a, b) => a.order - b.order);
            }

            if (payload.eventType === 'UPDATE') {
              const updatedSkills = prevSkills.map((skill) => (skill.id === payload.new.id ? payload.new : skill));
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

    // 3️⃣ Cleanup saat komponen unmount
    return () => {
      supabase.removeChannel(skillsSubscription);
    };
  }, []);

  // --- Pengaturan slider ---
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, dots: false },
      },
    ],
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div
        name="skills"
        className="w-full h-screen text-[#0a192f] bg-[#f5f5f5] font-sans flex justify-center items-center">
        <div className="max-w-[1000px] mx-auto p-4">
          <p className="text-2xl">Memuat skills...</p>
        </div>
      </div>
    );
  }

  // --- Render Data ---
  return (
    <div
      name="skills"
      className="w-full h-screen text-[#0a192f] bg-[#f5f5f5] font-sans overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="max-w-[1000px] w-full mb-4">
          <p className="text-4xl font-bold inline border-b-4 border-[#C23B22] mb-8">Skills</p>
        </div>

        <div className="w-full">
          <Slider
            {...settings}
            className="relative w-full">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center justify-center p-4">
                <div
                  data-aos="zoom-in-up"
                  data-aos-duration="1000"
                  className="bg-[#0a192f] rounded-lg border border-gray-200 p-6 transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                  <img
                    src={skill.icon_url}
                    alt={`${skill.name} icon`}
                    className="w-20 h-20 mx-auto mb-4 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                  />
                  <p className="text-lg font-semibold text-white text-center sm:text-sm">{skill.name}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Skills;

// --- Custom CSS (hide dots di mobile) ---
const style = document.createElement('style');
style.innerHTML = `
  @media (max-width: 480px) {
    .slick-dots {
      display: none !important;
    }
  }
`;
document.head.appendChild(style);
