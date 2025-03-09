"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Track scrolling to toggle button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          className="fixed bottom-5 z-[10000] right-5 bg-main text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 50 }} // Start below the viewport
          animate={{ opacity: 1, scale: 1, y: 0 }} // Slide into view
          exit={{ opacity: 0, scale: 0, y: 50 }} // Slide out of view
          transition={{ duration: 0.4 }} // Smooth transition
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
