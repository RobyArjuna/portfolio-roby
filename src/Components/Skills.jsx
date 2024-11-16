import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons

import HTML from '../asset/html.png';
import CSS from '../asset/css.png';
import TailwindLogo from '../asset/tailwind.png';
import JavaScript from '../asset/javascript.png';
import ReactLogo from '../asset/react.png';
import FigmaLogo from '../asset/figma.png';
import GithubLogo from '../asset/github.png';
import NodeJsLogo from '../asset/node.png';
import DartLogo from '../asset/dart.png';
import LaravelLogo from '../asset/laravel.png';
import MysqlLogo from '../asset/mysql.png';
import PostgreSqlLogo from '../asset/postgresql.png';
import PHPLogo from '../asset/php.png';

const arrowClasses =
  'absolute top-1/2 z-10 transform -translate-y-1/2 cursor-pointer bg-[#C23B22] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-[#C23B22] hover:bg-white hover:text-[#C23B22] transition-transform hover:scale-110';

const NextArrow = ({ onClick }) => (
  <div
    className={`${arrowClasses} right-4`}
    onClick={onClick}>
    <FaChevronRight className="text-2xl" /> {/* Chevron icon for next */}
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className={`${arrowClasses} left-4`}
    onClick={onClick}>
    <FaChevronLeft className="text-2xl" /> {/* Chevron icon for previous */}
  </div>
);

const Skills = () => {
  useEffect(() => {
    AOS.init();
  }, []);

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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const skills = [
    { img: HTML, name: 'HTML' },
    { img: CSS, name: 'CSS' },
    { img: JavaScript, name: 'JavaScript' },
    { img: ReactLogo, name: 'ReactJs' },
    { img: GithubLogo, name: 'Github' },
    { img: DartLogo, name: 'Dart' },
    { img: TailwindLogo, name: 'Tailwind CSS' },
    { img: FigmaLogo, name: 'Figma' },
    { img: LaravelLogo, name: 'Laravel' },
    { img: MysqlLogo, name: 'MySQL' },
    { img: PostgreSqlLogo, name: 'PostgreSQL' },
    { img: PHPLogo, name: 'PHP' },
    { img: NodeJsLogo, name: 'Node.js' },
  ];

  return (
    <div
      name="skills"
      className="w-full h-screen text-[#0a192f] bg-[#f5f5f5] font-sans overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="max-w-[1000px] w-full mb-4  ">
          <p className="text-4xl font-bold inline border-b-4 border-[#C23B22] mb-8">Skills</p>
        </div>

        <div className="w-full">
          <Slider
            {...settings}
            className="relative w-full">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4">
                <div
                  data-aos="zoom-in-up"
                  data-aos-duration="1000"
                  className="bg-[#0a192f] rounded-lg border border-gray-200 p-6 transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                  <img
                    src={skill.img}
                    alt={`${skill.name} icon`}
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <p className="text-lg font-semibold text-white text-center">{skill.name}</p>
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
