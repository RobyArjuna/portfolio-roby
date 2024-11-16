import React, { useEffect } from 'react';
import data from '../data/portfolioData';
import { FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ShowCard = ({ activeId, setShowCard }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const portfolio = data.find((data) => data.id === activeId);

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-10 bg-[#0a192f] backdrop-filter backdrop-blur-sm bg-opacity-10 font-sans">
      <div
        className="max-w-[1000px] w-[80%] sm:w-[60%] lg:w-[40%]  mx-aut absolute top-1/2 left-1/2 z-20 bg-white rounded-[8px]
            transform -translate-x-1/2 -translate-y-1/2 p-5">
        <div className="flex items-center justify-center">
          <figure>
            <img
              className="rounded-[8px]"
              src={portfolio.imgUrl}
              alt="portfolio"
            />
          </figure>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl text-[#0a192f] font-[700] my-5">{portfolio.title}</h2>
          <p className="text-[12px] sm:text-[15px] text-[#4d4d4d]">{portfolio.description}</p>
        </div>
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <h4 className="text-[14px] sm:text-[18px] text-[#0a192f] text-[700]">Technologies:</h4>
          {portfolio.tech.map((item, index) => (
            <span
              className="bg-gray-200 py-1 px-2 rounded-[5px] text-[12px] sm:text-[14px] text-[#0a192f]"
              key={index}>
              {item}
            </span>
          ))}
        </div>
        <a
          target="_blank"
          rel="noreferrer"
          href={portfolio.siteUrl}>
          <button className="text-white bg-[#0a192f] hover:bg-[#53565a] py-2 px-4 my-4 rounded-[8px] text-[12px] sm:text-[14px] ease-in duration-200">Live Site</button>
        </a>

        <button
          onClick={() => setShowCard(false)}
          className="w-[1.8rem] h-[1.8rem] bg-white absolute top-[1.7rem] right-[1.7rem] 
            text-[20px] flex items-center justify-center rounded-[3px] leading-0 cursor-pointer hover:text-[#0a192f] ease-in duration-300">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ShowCard;
