"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const ImageSlider = ({ slides }) => {
  const boxesRef = useRef([]);

  useEffect(() => {
    // Set initial positions of the slides
    const targets = boxesRef.current;
    gsap.set(targets, { xPercent: 100 });
    gsap.set(targets[0], { xPercent: 0 });

    let count = 0;

    // Function to animate the next slide
    const slideOneNext = () => {
      gsap.fromTo(
        targets[count],
        { xPercent: 0, zIndex: 0 },
        { delay: 0.2, duration: 1.2, xPercent: 0, zIndex: -10 }
      );
      count = count < targets.length - 1 ? ++count : 0;
      gsap.fromTo(
        targets[count],
        { xPercent: 100, zIndex: 10 },
        { duration: 1.2, xPercent: 0, zIndex: 0 }
      );
    };

    // Set an interval for auto slide transition every 3 seconds
    const slideInterval = setInterval(slideOneNext, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, [slides]);

  return (
    <div className="w-full h-full relative overflow-hidden mx-auto">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (boxesRef.current[index] = el)}
          className="absolute w-full h-full z-0"
        >
          <Image
            width={500}
            height={500}
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full h-full rounded-md object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
