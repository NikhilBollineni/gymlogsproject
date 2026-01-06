'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 py-3 md:py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/50 backdrop-blur-xl border-b border-white/20 shadow-lg' 
          : 'bg-black/30 backdrop-blur-xl border-b border-white/10'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-center items-center">
        <motion.div 
          className="flex items-center h-12 md:h-16"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Image
            src="/logo.png"
            alt="Fitness App Logo"
            width={200}
            height={200}
            className="object-contain h-full w-auto"
            priority
          />
        </motion.div>
      </div>
    </motion.nav>
  );
}
