"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"

const Slider = () => {
  const sliderRef = useRef(null)
  const slidesRef = useRef([])
  const textRefs = useRef([])
  const descRefs = useRef([])

  const images = [
    "url('/assets/banner-1.jpeg')",
    "url('/assets/banner-3.png')",
    "url('/assets/banner-4.jpg')",
  ]

  const textContents = [
    "Invest with Vision",
    "Tailored Solutions for Every Industry",
    "Sustainability and Safety Compliance",
  ]

  const descriptionContents = [
    "Illuminating Opportunities for a Brighter Future",
    "Solutions specifically crafted to cater to the unique requirements of various industries.",
    "We prioritize sustainable solutions that align with industry safety standards.",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTweening, setIsTweening] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const slideDirections = ["left", "right", "top", "bottom"]

  // Global styles for box-sizing
  useEffect(() => {
    // Apply global styles
    const style = document.createElement("style")
    style.innerHTML = `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      
      html,
      body {
        overflow-x: hidden;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const gotoNextSlide = useCallback(() => {
    if (isTweening) return

    const currentSlide = slidesRef.current[currentIndex]
    const currentText = textRefs.current[currentIndex]
    const currentDesc = descRefs.current[currentIndex]

    const newIndex = currentIndex < slidesRef.current.length - 1 ? currentIndex + 1 : 0
    const nextSlide = slidesRef.current[newIndex]
    const nextText = textRefs.current[newIndex]
    const nextDesc = descRefs.current[newIndex]

    setCurrentIndex(newIndex)
    setIsTweening(true)

    gsap.to([currentText, currentDesc], {
      duration: 1,
      y: "100%",
      opacity: 0,
      ease: "power2.in",
    })

    const direction = slideDirections[currentIndex % slideDirections.length]
    const directionStyles = {
      left: {
        clipOut: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        x: "-100%",
      },
      right: {
        clipOut: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        x: "100%",
      },
      top: {
        clipOut: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        y: "-100%",
      },
      bottom: {
        clipOut: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: "100%",
      },
    }

    const { clipOut, x, y } = directionStyles[direction]

    gsap.set(nextSlide, {
      zIndex: 2,
      clipPath: clipOut,
      x: x || "0%",
      y: y || "0%",
    })

    gsap.set(currentSlide, { zIndex: 1 })

    gsap.to(nextSlide, {
      duration: 1.5,  // 1.5
      ease: "power2.inOut",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      x: "0%",
      y: "0%",
      onComplete: () => {
        setIsTweening(false)
        gsap.set(currentSlide, { clearProps: "z-index" })
      },
    })

    gsap.to([nextText, nextDesc], {
      duration: 1.3, //1.5
      y: "0%",
      opacity: 1,
      ease: "power2.out",
      stagger: 0.3,
      delay: 0.4,
    })
  }, [currentIndex, isTweening, slideDirections])

  useEffect(() => {
    slidesRef.current.forEach((slide, i) => {
      gsap.set(slide, {
        backgroundImage: images[i],
        backgroundSize: "cover",
        backgroundPosition: "center",
      })

      gsap.set([textRefs.current[i], descRefs.current[i]], {
        y: "100%",
        opacity: 0,
      })
    })

    if (!isInitialized) {
      gsap.to([textRefs.current[0], descRefs.current[0]], {
        duration: 1.0,  // 1.2
        y: "0%",
        opacity: 1,
        ease: "power2.out",
        stagger: 0.3,
        delay: 0.3,
        onComplete: () => setIsInitialized(true),
      })
    }
  }, [images, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      const timer = setInterval(gotoNextSlide, 1000)   // 4000
      return () => clearInterval(timer)
    }
  }, [gotoNextSlide, isInitialized])

  // Media query handling
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 550)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Inline styles
  const wrapperStyle = {
    width: "100%",
    height: isMobile ? "50vh" : "95vh",
    backgroundColor: "#111",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    maxWidth: "100%",
  }

  const sliderStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  }

  const getSlideStyle = (index) => {
    return {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      clipPath:
        index === 0 ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      // Remove background properties as they're set by GSAP
    }
  }

  const slideOverlayStyle = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))",
    zIndex: 1,
  }

  const slideTextStyle = {
    color: "#ffffff",
    fontSize: isMobile ? "1.6rem" : "2rem",
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
    overflowWrap: "break-word",
  }

  const slideDescriptionStyle = {
    color: "#d1d1d1",
    fontSize: isMobile ? "1rem" : "1.2rem",
    textAlign: "center",
    transform: "translateY(100%)",
    opacity: 0,
    position: "relative",
    zIndex: 2,
    maxWidth: "80%",
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  }

  return (
    <div className="wrapper mt-12" style={wrapperStyle}>
      <div className="slider" style={sliderStyle} ref={sliderRef}>
        {textContents.map((text, i) => (
          <div key={i} className="slide" ref={(el) => (slidesRef.current[i] = el)} style={getSlideStyle(i)}>
            {/* Pseudo-element replacement for ::before */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))",
                zIndex: 1,
              }}
            ></div>

            <div className="slide-text" ref={(el) => (textRefs.current[i] = el)} style={slideTextStyle}>
              {text}
            </div>
            <div className="slide-description" ref={(el) => (descRefs.current[i] = el)} style={slideDescriptionStyle}>
              {descriptionContents[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider

