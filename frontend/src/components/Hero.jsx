import React from 'react';
import HeroBg from '../assets/HeroBg.jpg';

const Hero = () => {
  return (
    <div className="relative w-full text-white px-2 sm:px-4 md:px-6">
      <img
        src={HeroBg}
        alt="bg-img"
        className="w-full h-[500px] sm:h-[580px] md:h-[640px]  object-cover object-cover"
      />
      <div className="absolute inset-0 bg-[#000080]/40 rounded-xl"></div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-start">
        <div className="max-w-lg ml-4 sm:ml-10 md:ml-16 mt-40 sm:mt-48 md:mt-56 lg:mt-60">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug drop-shadow-lg">
            <span className="text-[#FFD700] block font-body font-bold ">Welcome to The Generals' Arena Ministry.</span>
            <span className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl block font-roboto mt-2">
              Raising a Generation for Christ Jesus Transforming Lives by the Word of God.
            </span>
          </p>

          {/* Button */}
          <button
            className="mt-6 px-5 py-3 bg-[#FFD700] text-black font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-gray-200 group w-fit"
          >
            View More
            <span className="transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
