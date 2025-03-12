"use client"

import { useState, useEffect, useRef, RefObject } from "react"


export function useScrollAnimation(threshold = 0.1): [boolean, RefObject<HTMLDivElement | null>] {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once the animation has triggered, we can disconnect the observer
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold, // Trigger when at least 10% of the element is visible
        rootMargin: "0px 0px -100px 0px" // Trigger a bit before the element comes into view
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  return [isVisible, ref]
}