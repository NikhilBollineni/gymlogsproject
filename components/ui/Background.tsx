'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg h-[100vh]" />
      
      {/* Ambient Glows */}
      <motion.div 
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.1, 1],
          x: [0, 20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.2, 1],
          x: [0, -20, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px]"
      />
    </div>
  );
}

