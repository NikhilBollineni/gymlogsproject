'use client';

import Link from 'next/link';
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
      className={`fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/50 backdrop-blur-xl border-b border-white/20 shadow-lg' 
          : 'bg-black/30 backdrop-blur-xl border-b border-white/10'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-white"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Fitness App
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="#get-started" 
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium text-sm backdrop-blur-md relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            />
            <span className="relative z-10">Get Started</span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
