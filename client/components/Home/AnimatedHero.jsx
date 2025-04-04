"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./Slider.css";

const Slider = () => {
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const textRefs = useRef([]);
  const descRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTweening, setIsTweening] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const images = [
    "url('/assets/banner-1.jpeg')",
    "url('/assets/banner-2.jpg')",
    "url('/assets/banner-3.png')",
    "url('/assets/banner-4.jpg')",
  ];

  const textContents = [
    "Empowering Investments with Vision and Growth",
    "Cutting-Edge Technology",
    "Tailored Solutions for Every Industry",
    "Sustainability and Safety Compliance",
  ];

  const descriptionContents = [
    "Illuminating Opportunities for a Brighter Future",
    "Stay ahead with advanced technology that prioritizes safety and functionality.",
    "Solutions specifically crafted to cater to the unique requirements of various industries.",
    "We prioritize sustainable solutions that align with industry safety standards.",
  ];

  const slideDirections = ["left", "right", "top", "bottom"];

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src.replace("url('", "").replace("')", "");
          img.onload = resolve;
          img.onerror = resolve; // Handle errors gracefully
        });
      });
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  const gotoNextSlide = useCallback(() => {
    if (isTweening || !imagesLoaded) return;

    const currentSlide = slidesRef.current[currentIndex];
    const currentText = textRefs.current[currentIndex];
    const currentDesc = descRefs.current[currentIndex];

    const newIndex =
      currentIndex < slidesRef.current.length - 1 ? currentIndex + 1 : 0;
    const nextSlide = slidesRef.current[newIndex];
    const nextText = textRefs.current[newIndex];
    const nextDesc = descRefs.current[newIndex];

    setCurrentIndex(newIndex);
    setIsTweening(true);

    gsap.to([currentText, currentDesc], {
      duration: 1.5,
      y: "100%",
      opacity: 0,
      ease: "power2.in",
    });

    const direction = slideDirections[currentIndex % slideDirections.length];
    const directionStyles = {
      left: { clipOut: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)", x: "-100%" },
      right: { clipOut: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", x: "100%" },
      top: { clipOut: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", y: "-100%" },
      bottom: { clipOut: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: "100%" },
    };

    const { clipOut, x, y } = directionStyles[direction];

    gsap.set(nextSlide, {
      zIndex: 2,
      clipPath: clipOut,
      x: x || "0%",
      y: y || "0%",
    });

    gsap.set(currentSlide, { zIndex: 1 });

    gsap.to(nextSlide, {
      duration: 1.5,
      ease: "power2.inOut",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      x: "0%",
      y: "0%",
      onComplete: () => {
        setIsTweening(false);
        gsap.set(currentSlide, { clearProps: "z-index" });
      },
    });

    gsap.to([nextText, nextDesc], {
      duration: 2,
      y: "0%",
      opacity: 1,
      ease: "power2.out",
      stagger: 0.4,
      delay: 0.6,
    });
  }, [currentIndex, isTweening, imagesLoaded]);

  // Initial setup and animation
  useEffect(() => {
    if (!imagesLoaded) return;

    slidesRef.current.forEach((slide, i) => {
      gsap.set(slide, {
        backgroundImage: images[i],
        backgroundSize: "cover",
        backgroundPosition: "center",
      });
      gsap.set([textRefs.current[i], descRefs.current[i]], {
        y: "100%",
        opacity: 0,
      });
    });

    if (!isInitialized) {
      gsap.to([textRefs.current[0], descRefs.current[0]], {
        duration: 1.2,
        y: "0%",
        opacity: 1,
        ease: "power2.out",
        stagger: 0.3,
        delay: 0.3,
        onComplete: () => setIsInitialized(true),
      });
    }
  }, [imagesLoaded, isInitialized]);

  // Auto-rotation
  useEffect(() => {
    if (isInitialized && imagesLoaded) {
      const timer = setInterval(gotoNextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [gotoNextSlide, isInitialized, imagesLoaded]);

  return (
    <div className="wrapper mt-12">
      {!imagesLoaded ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="slider" ref={sliderRef}>
          {textContents.map((text, i) => (
            <div
              key={i}
              className="slide"
              ref={(el) => (slidesRef.current[i] = el)}
            >
              <div
                className="slide-text"
                ref={(el) => (textRefs.current[i] = el)}
              >
                {text}
              </div>
              <div
                className="slide-description"
                ref={(el) => (descRefs.current[i] = el)}
              >
                {descriptionContents[i]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;