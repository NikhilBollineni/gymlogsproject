'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FitnessIllustrationProps {
  src: string;
  alt: string;
  className?: string;
  opacity?: number;
  position?: 'left' | 'right' | 'center';
  animate?: boolean;
}

export function FitnessIllustration({ 
  src, 
  alt, 
  className = '', 
  opacity = 0.15,
  position = 'center',
  animate = true 
}: FitnessIllustrationProps) {
  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  const imageContent = (
    <img
      src={src}
      alt={alt}
      className="object-contain w-full h-full"
      style={{ opacity: 1 }}
      loading="lazy"
      onError={(e) => {
        console.error('Failed to load fitness illustration:', src);
        (e.target as HTMLImageElement).style.display = 'none';
      }}
      onLoad={() => {
        console.log('Fitness illustration loaded:', src);
      }}
    />
  );

  return (
    <div className={`absolute ${positionClasses[position]} top-0 bottom-0 w-full max-w-5xl h-full pointer-events-none ${className}`} style={{ zIndex: 1 }}>
      {animate ? (
        <motion.div
          className="w-full h-full relative"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [opacity, opacity * 1.15, opacity],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {imageContent}
        </motion.div>
      ) : (
        <div className="w-full h-full relative" style={{ opacity }}>
          {imageContent}
        </div>
      )}
    </div>
  );
}
