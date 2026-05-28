// src/components/AnimatedText.jsx
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const AnimatedText = () => {
  return (
    <div className="flex justify-center items-center">
      {/* Block behind the text */}
      <div className="bg-primary-container/20 border border-primary-container/30 p-2 rounded-lg font-bold">
        <TypeAnimation
          sequence={['Nice To Meet You!😀', 1000, 'Tech Enthusiast', 1000, 'Learning by Doing!', 1000]}
          speed={50}
          repeat={Infinity}
          className="text-primary-container font-bold"
        />
      </div>
    </div>
  );
};

export default AnimatedText;
