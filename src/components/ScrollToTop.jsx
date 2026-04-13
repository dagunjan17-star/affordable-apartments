"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[9999]
      w-14 h-14 flex items-center justify-center
      rounded-full

      bg-gradient-to-br from-[#9E1C60] to-[#ff4da6]

      text-white

      shadow-[0_10px_30px_rgba(158,28,96,0.5)]
      hover:shadow-[0_20px_50px_rgba(255,77,166,0.7)]

      hover:-translate-y-1 hover:scale-110
      active:scale-95

      backdrop-blur-xl border border-white/20

      transition-all duration-300

      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >

      {/* ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>

    </button>

  );
}