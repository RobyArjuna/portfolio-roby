import React, { useState } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { Link } from 'react-scroll';
import AnimatedText from './AnimatedText';
import PDF from '../asset/RobyCV.pdf';
import { FaAddressBook } from 'react-icons/fa6';

const Navbar = () => {
  const [navView, setNavView] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const handleNav = () => {
    setNavView(!navView);
  };

  const toggleSocial = () => {
    setShowSocial(!showSocial);
  };

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-white text-black z-10 font-sans">
      {/* Logo / Animated Text */}
      <div className="flex items-center">
        <AnimatedText />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8">
        {['home', 'about', 'skills', 'work', 'contact'].map((item) => (
          <li
            key={item}
            className="relative group cursor-pointer">
            <Link
              activeClass="active"
              to={item}
              smooth={true}
              duration={1000}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C23B22] transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Hamburger Icon */}
      <div
        className="md:hidden z-20 text-2xl cursor-pointer"
        onClick={handleNav}>
        {!navView ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden absolute w-full h-screen top-0 left-0 flex flex-col justify-center items-center bg-[#0a192f] backdrop-filter backdrop-blur-lg bg-opacity-30 z-10 transition-all duration-700 ${
          navView ? 'translate-y-0' : '-translate-y-[100vh]'
        }`}>
        {['home', 'about', 'skills', 'work', 'contact'].map((item) => (
          <li
            key={item}
            className="py-4 text-3xl font-semibold">
            <Link
              onClick={handleNav}
              activeClass="active"
              to={item}
              smooth={true}
              duration={1000}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Social Icons */}
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0 z-50">
        <ul>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-0 duration-300 bg-[#171515]">
            <a
              href="https://github.com/RobyArjuna"
              rel="noreferrer"
              target="_blank"
              className="flex justify-between items-center w-full text-gray-300 px-4">
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-0 duration-300 bg-[#0A66C2]">
            <a
              href="https://www.linkedin.com/in/robyarjuna/"
              rel="noreferrer"
              target="_blank"
              className="flex justify-between items-center w-full text-gray-300 px-4">
              LinkedIn <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-0 duration-300 bg-[#BB001B]">
            <a
              href="mailto:robiarjunawijaya@gmail.com"
              className="flex justify-between items-center w-full text-gray-300 px-4">
              Email <MdEmail size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-0 duration-300 bg-[#565f69]">
            <a
              href={PDF}
              download="CvRoby.pdf"
              className="flex justify-between items-center w-full text-gray-300 px-4">
              Resume <BsFillFileEarmarkPersonFill size={30} />
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Social Floating Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {showSocial && (
          <>
            <a
              href="https://github.com/RobyArjuna"
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-[#171515] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-0 opacity-100">
              <FaGithub
                size={20}
                className="mr-2"
              />{' '}
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/robyarjuna/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-[#0A66C2] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-0 opacity-100">
              <FaLinkedin
                size={20}
                className="mr-2"
              />{' '}
              LinkedIn
            </a>
            <a
              href="mailto:robiarjunawijaya@gmail.com"
              className="flex items-center bg-[#BB001B] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-0 opacity-100">
              <MdEmail
                size={20}
                className="mr-2"
              />{' '}
              Email
            </a>
            <a
              href={PDF}
              download="CvRoby.pdf"
              className="flex items-center bg-[#565f69] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-0 opacity-100">
              <BsFillFileEarmarkPersonFill
                size={20}
                className="mr-2"
              />{' '}
              Resume
            </a>
          </>
        )}
        <button
          onClick={toggleSocial}
          className="bg-[#C23B22] text-white p-3 rounded-full shadow-lg focus:outline-none">
          {showSocial ? <FaTimes /> : <FaAddressBook />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
