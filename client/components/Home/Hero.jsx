import React from 'react';

const Hero = () => {
  return (
    <div className="w-full max-h-screen bg-black overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-center"
        src="/videos/High-Quality Low Voltage Switchgear.mp4"
      />
    </div>
  );
};

export default Hero;
