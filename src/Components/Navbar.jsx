import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { FaAddressBook } from 'react-icons/fa6';
import { Link } from 'react-scroll';
import AnimatedText from './AnimatedText';
import { supabase } from '../supabaseClient'; // IMPORT SUPABASE CLIENT

const Navbar = () => {
  const [navView, setNavView] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [siteConfig, setSiteConfig] = useState(null); // State untuk konfigurasi

  useEffect(() => {
    // Ambil data konfigurasi dari Supabase
    async function getConfig() {
      const { data, error } = await supabase.from('site_config').select('*').single(); // Ambil satu baris konfigurasi saja

      if (error) {
        console.error('Error mengambil konfigurasi situs:', error);
      } else {
        setSiteConfig(data);
      }
    }

    getConfig();
  }, []);

  const handleNav = () => setNavView(!navView);
  const toggleSocial = () => setShowSocial(!showSocial);

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
        onClick={handleNav}
        className="md:hidden z-20 text-[#C23B22] cursor-pointer">
        {navView ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
      <ul className={navView ? 'absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center space-y-6 text-2xl font-semibold' : 'hidden'}>
        {['home', 'about', 'skills', 'work', 'contact'].map((item) => (
          <li key={item}>
            <Link
              onClick={handleNav}
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
              href={siteConfig?.github_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center w-full text-gray-300 px-4">
              Github <FaGithub size={30} />
            </a>
          </li>

          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-0 duration-300 bg-[#0A66C2]">
            <a
              href={siteConfig?.linkedin_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center w-full text-gray-300 px-4">
              LinkedIn <FaLinkedin size={30} />
            </a>
          </li>

          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-0 duration-300 bg-[#BB001B]">
            <a
              href={`mailto:${siteConfig?.email_address || ''}`}
              className="flex justify-between items-center w-full text-gray-300 px-4">
              Email <MdEmail size={30} />
            </a>
          </li>

          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-0 duration-300 bg-[#565f69]">
            <a
              href={siteConfig?.resume_url || '#'}
              download
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center w-full text-gray-300 px-4">
              Resume <BsFillFileEarmarkPersonFill size={30} />
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Floating Social Buttons */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {showSocial && (
          <>
            <a
              href={siteConfig?.github_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-[#171515] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300">
              <FaGithub
                size={20}
                className="mr-2"
              />{' '}
              Github
            </a>

            <a
              href={siteConfig?.linkedin_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-[#0A66C2] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300">
              <FaLinkedin
                size={20}
                className="mr-2"
              />{' '}
              LinkedIn
            </a>

            <a
              href={`mailto:${siteConfig?.email_address || ''}`}
              className="flex items-center bg-[#BB001B] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300">
              <MdEmail
                size={20}
                className="mr-2"
              />{' '}
              Email
            </a>

            <a
              href={siteConfig?.resume_url || '#'}
              download
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-[#565f69] text-gray-300 px-4 py-2 rounded-full shadow-lg transition-all duration-300">
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
