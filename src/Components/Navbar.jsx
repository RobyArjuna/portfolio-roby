// src/components/Navbar.jsx
import React, { useState } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { Link } from 'react-scroll';
import AnimatedText from './AnimatedText';
import PDF from '../asset/CVRoby.pdf';

const Navbar = () => {
  const [navView, setNavView] = useState(false);

  const handleNav = () => {
    setNavView(!navView);
  };

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#ffffff] text-black-300 z-10 font-sans">
      {/* Animated Text Section */}
      <div className="flex items-center">
        <AnimatedText />
      </div>
      {/* Menu */}
      <ul className="hidden md:flex space-x-8">
        <li className="relative group">
          <Link
            activeClass="active"
            to="home"
            smooth={true}
            duration={1000}>
            Home
          </Link>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C23B22] transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group">
          <Link
            activeClass="active"
            to="about"
            smooth={true}
            duration={1000}>
            About
          </Link>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C23B22] transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group">
          <Link
            activeClass="active"
            to="skills"
            smooth={true}
            duration={1000}>
            Skills
          </Link>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C23B22] transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group">
          <Link
            activeClass="active"
            to="work"
            smooth={true}
            duration={1000}>
            Work
          </Link>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C23B22] transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group">
          <Link
            activeClass="active"
            to="contact"
            smooth={true}
            duration={1000}>
            Contact
          </Link>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C23B22] transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>
      {/* Hamburger Menu */}
      <div
        className="md:hidden z-20 text-xl"
        onClick={handleNav}>
        {!navView ? <FaBars /> : <FaTimes />}
      </div>
      {/* Mobile Menu */}
      <ul
        className={
          navView
            ? 'md:hidden absolute w-full h-screen top-0 right-0 left-0 flex flex-col justify-center items-center bg-[#0a192f] backdrop-filter backdrop-blur-lg bg-opacity-30 z-10 transition-all duration-700 translate-y-0'
            : 'absolute top-0 right-0 left-0 flex flex-col items-center justify-center transition-all duration-700 -translate-y-[100vh]'
        }>
        <li className="py-4 text-3xl font-semibold">
          <Link
            onClick={handleNav}
            activeClass="active"
            to="home"
            smooth={true}
            duration={1000}>
            Home
          </Link>
        </li>
        <li className="py-4 text-3xl font-semibold">
          <Link
            onClick={handleNav}
            activeClass="active"
            to="about"
            smooth={true}
            duration={1000}>
            About
          </Link>
        </li>
        <li className="py-4 text-3xl font-semibold">
          <Link
            onClick={handleNav}
            activeClass="active"
            to="skills"
            smooth={true}
            duration={1000}>
            Skills
          </Link>
        </li>
        <li className="py-4 text-3xl font-semibold">
          <Link
            onClick={handleNav}
            activeClass="active"
            to="work"
            smooth={true}
            duration={1000}>
            Work
          </Link>
        </li>
        <li className="py-4 text-3xl font-semibold">
          <Link
            onClick={handleNav}
            activeClass="active"
            to="contact"
            smooth={true}
            duration={1000}>
            Contact
          </Link>
        </li>
      </ul>
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[0px] duration-300 bg-[#171515]">
            <a
              href="https://github.com/RobyArjuna"
              rel="noreferrer"
              target="_blank"
              className="flex justify-between items-center w-full text-gray-300">
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[0px] duration-300 bg-[#0A66C2]">
            <a
              href="https://www.linkedin.com/in/robyarjuna/"
              rel="noreferrer"
              target="_blank"
              className="flex justify-between items-center w-full text-gray-300">
              LinkedIn <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[0px] duration-300 bg-[#BB001B]">
            <a
              href="mailto:robiarjunawijaya@gmail.com"
              className="flex justify-between items-center w-full text-gray-300">
              Email <MdEmail size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[0px] duration-300 bg-[#565f69]">
            <a
              href={PDF}
              download="CvRoby.pdf"
              className="flex justify-between items-center w-full text-gray-300">
              Resume <BsFillFileEarmarkPersonFill size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
