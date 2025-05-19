import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import myPhoto from '../asset/noformal.png';

// Simple typing effect component
const TypingEffect = ({ texts, speed = 150, pause = 1500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index % texts.length];
    let timeout;

    if (!isDeleting && displayText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, speed);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setIndex(index + 1);
        }
      }, pause);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, texts, speed, pause]);

  return <span>{displayText}</span>;
};

const Home = () => {
  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.7,
    triggerOnce: false,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (inView) {
      setAnimate(true);
    } else {
      const timeout = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView]);

  return (
    <div
      name="home"
      className="w-full h-screen bg-[#F5F5F5] font-sans flex flex-col items-center justify-center px-4 sm:px-8"
      ref={ref}>
      <div className={`max-w-[1000px] mx-auto flex flex-row items-center justify-center space-y-0 h-full transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="flex justify-center w-1/3 md:w-1/2">
          <img
            src={myPhoto}
            alt="Roby Arjuna"
            className="w-[160px] h-[160px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] object-cover rounded-full"
          />
        </div>

        <div className="w-2/3 md:w-1/2 text-center md:text-left pl-4 sm:pl-8">
          <p
            className="text-[#C23B22] font-bold text-base sm:text-xl"
            data-aos="fade-left"
            data-aos-duration="1000">
            Hi, my name is
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#124076]"
            data-aos="fade-right"
            data-aos-duration="2000">
            Roby Arjuna
          </h1>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#295F98] mt-2"
            data-aos="fade-down"
            data-aos-duration="2500">
            I am a <TypingEffect texts={['Web Developer!', 'Web Dev Enthusiast!', 'Problem Solver!', 'Tech Enthusiast!']} />
          </h2>
          <br />
          <Link
            activeClass="active"
            to="work"
            smooth={true}
            duration={1000}>
            <button
              className="text-white group bg-[#295F98] border-2 border-[#295F98] px-4 py-2 my-2 flex items-center mx-auto md:mx-0 transition-all duration-300 ease-in-out hover:bg-[#C23B22] hover:border-[#C23B22] text-sm sm:text-base"
              data-aos="fade-right"
              data-aos-duration="1500"
              data-aos-delay="800">
              View My Work
              <span className="ml-3 group-hover:ml-6 transition-all duration-300 ease-in-out">
                <HiArrowNarrowRight />
              </span>
            </button>
          </Link>

          {/* Social Media Icons */}
          <div
            className="flex justify-center md:justify-start space-x-6 mt-6 text-[#295F98]"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="1000">
            <a
              href="https://github.com/robyarjuna"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-[#C23B22] transition-colors duration-300">
              <FaGithub size={30} />
            </a>
            <a
              href="https://linkedin.com/in/robyarjuna"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#C23B22] transition-colors duration-300">
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
