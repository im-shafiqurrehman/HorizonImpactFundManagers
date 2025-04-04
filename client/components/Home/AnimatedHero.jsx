"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
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

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src.replace("url('", "").replace("')", "");
          img.onload = resolve;
          img.onerror = resolve;
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

  useEffect(() => {
    if (isInitialized && imagesLoaded) {
      const timer = setInterval(gotoNextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [gotoNextSlide, isInitialized, imagesLoaded]);

  return (
    <div 
      style={{
        boxSizing: "border-box",
        width: "100%",
        height: "95vh",
        backgroundColor: "#111",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        maxWidth: "100%",
        marginTop: "3rem"
      }}
    >
      {!imagesLoaded ? (
        <div
          style={{
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            color: "#ffffff",
            fontSize: "1.5rem",
            backgroundColor: "#111",
            position: "absolute",
            zIndex: 3
          }}
        >
          Loading...
        </div>
      ) : (
        <div
          ref={sliderRef}
          style={{
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {textContents.map((text, i) => (
            <div
              key={i}
              ref={(el) => (slidesRef.current[i] = el)}
              style={{
                boxSizing: "border-box",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                clipPath: i === 0 
                  ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" 
                  : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: images[i],
                "::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))",
                  zIndex: 1
                }
              }}
            >
              <div
                ref={(el) => (textRefs.current[i] = el)}
                style={{
                  boxSizing: "border-box",
                  color: "#ffffff",
                  fontSize: "2rem",
                  textAlign: "center",
                  transform: "translateY(100%)",
                  opacity: 0,
                  position: "relative",
                  zIndex: 2,
                  maxWidth: "80%",
                  padding: "1rem",
                  fontWeight: 600,
                  textShadow: "1px 1px 8px rgba(0, 0, 0, 0.6)",
                  wordWrap: "break-word",
                  overflowWrap: "break-word"
                }}
              >
                {text}
              </div>
              <div
                ref={(el) => (descRefs.current[i] = el)}
                style={{
                  boxSizing: "border-box",
                  color: "#d1d1d1",
                  fontSize: "1.2rem",
                  textAlign: "center",
                  transform: "translateY(100%)",
                  opacity: 0,
                  position: "relative",
                  zIndex: 2,
                  maxWidth: "80%",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
                  wordWrap: "break-word",
                  overflowWrap: "break-word"
                }}
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