'use client'
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        const leeway = 100;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - leeway;
      
      setShowFooter(atBottom);
    };

    window.addEventListener("scroll", handleScroll);
    // Check on mount in case the page is already at the bottom
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="w-full bg-gray-900 text-white py-4 px-6 fixed bottom-0 left-0 z-50 flex justify-center items-center">
      <span className="text-sm">
        {new Date().getFullYear()} Coding Test.
      </span>
    </footer>
  );
};

export default Footer;