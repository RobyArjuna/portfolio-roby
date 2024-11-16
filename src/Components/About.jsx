import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      name="about"
      className="w-full h-screen bg-[#ffffff] text-[#295F98] -300 font-sans">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full px-4 grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-8">
            <p className="text-4xl font-bold inline border-b-8 border-[#C23B22]">About</p>
          </div>

          <div></div>
        </div>

        <div className="max-w-[1000px] w-full px-4 grid sm:grid-cols-2 gap-8">
          <div
            className="sm:text-right text-4xl font-bold"
            data-aos="fade-right"
            data-aos-duration="1000">
            <p>
              Hi, I am <span className="text-[#C23B22]">Roby</span>, Nice to meet you, Please take a look of my Projects, <span className="text-[#C23B22]">Thank You</span>.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000">
            <p className="text-[#2F3645]">
              Saat ini, saya fokus pada pengembangan perangkat lunak dengan mempelajari metodologi Agile menggunakan kerangka Scrum untuk meningkatkan efektivitas tim dan proyek. Saya juga menerapkan prinsip Clean Code untuk memastikan kode
              yang saya tulis dapat dipelihara dan mudah dipahami, serta menggunakan Design Patterns untuk mengatasi masalah arsitektur perangkat lunak yang kompleks. Selain itu, saya terus mengembangkan keterampilan di berbagai teknologi
              seperti Mobile Programming dengan Flutter dan React Native, Frontend dengan React.js dan Next.js, serta Backend dengan Node.js dan Django.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
