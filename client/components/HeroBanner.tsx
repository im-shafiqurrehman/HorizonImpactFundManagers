"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, backgroundImage }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  // const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }

    if (subtitle && subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }
  }, [subtitle]);

  return (
    <section className="relative top-0 flex items-center justify-center h-[60vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src={backgroundImage}
          alt={`${title} Background`}
          width={1000}
          height={1000}
          className="opacity-75 w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center px-4 md:px-6 lg:px-8 max-w-3xl mx-auto text-white">
        <h1
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold leading-tight"
        >
          {title}
        </h1>
        {subtitle && (
          <p ref={subtitleRef} className="mt-4 text-lg uppercase text-gray-200">
            Home / company / {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;