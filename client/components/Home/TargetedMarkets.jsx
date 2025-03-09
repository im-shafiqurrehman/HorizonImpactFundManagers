/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { industries } from "../../components/constants/targetMarketers";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function TargetedMarkets() {
  const [angle, setAngle] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [displayedIndustries, setDisplayedIndustries] = useState([]);

  const getItemsToShow = (width) => {
    if (showAll) {
      return industries.length; 
    }
    return width < 768 ? 6 : 9;
  };

  const updateDisplayedIndustries = () => {
    const itemsToShow = getItemsToShow(window.innerWidth);
    setDisplayedIndustries(industries.slice(0, itemsToShow));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 2) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateDisplayedIndustries();

    const handleResize = () => updateDisplayedIndustries();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showAll]);

  const handleShowMore = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <div className="bg-slate-900 relative text-gray-100 py-16">
      <div className="absolute -top-2 -left-2 rotate-90">
        <Image
          src={"/assets/sqaure-shape.png"}
          alt="shape"
          width={200}
          height={200}
        />
      </div>
      <div className="absolute z-0 -bottom-2 right-4 -rotate-90">
        <Image
          src={"/assets/sqaure-shape.png"}
          alt="shape"
          width={200}
          height={200}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-main mb-8">
          Our Investment Focus Areas
        </h2>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          At Horizon Impact Fund Managers, we strategically invest in diverse
          industries to drive growth, innovation, and sustainable returns. Our
          expertise spans across key sectors that shape the future of the global
          economy.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedIndustries.map((industry, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl group border border-transparent transition-transform duration-300"
            style={{
              background: `linear-gradient(45deg, #172033, #172033 50%, #172033) padding-box, 
                          conic-gradient(from ${angle}deg, rgba(31, 41, 55, 0.48) 80%, #E66F3D 86%, rgba(99, 102, 241, 0.4) 90%, #E66F3D 94%, rgba(31, 41, 55, 0.48) 98%) border-box`,
            }}
          >
            <figure className="imageSHineEffect">
              <Image
                src={industry.image}
                alt={industry.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </figure>
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-lg font-bold text-main text-center">
                {industry.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="container mx-auto flex justify-center mt-8">
        <Button
          onClick={handleShowMore}
          varient="outline"
          className="w-full z-10 inline-block sm:w-auto bg-main text-white hover:bg-mainHover hover:text-white"
        >
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div> */}
    </div>
  );
}


