import React, { useState, useEffect } from "react";
import arrow from "../assets/arrow-up.svg";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-3 sm:right-6 p-2 bg-cyan-500 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 z-50"
        >
          <img
            src={arrow}
            alt="Scroll to top"
            className="w-8 h-8 sm:w-10 sm:h-10 transform transition-transform duration-300 hover:scale-110 hover:fill-white"
          />
        </button>
      )}
    </div>
  );
};
