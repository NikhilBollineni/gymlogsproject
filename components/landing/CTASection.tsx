'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { SignUpModal } from '../SignUpModal';
import { FitnessIllustration } from '../ui/FitnessIllustration';

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <section className="py-24 md:py-32 bg-black relative overflow-hidden">
        {/* Plain dark background - reduced intensity */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/5 to-transparent pointer-events-none" />
        
        {/* Subtle fitness illustration - very low opacity */}
        <FitnessIllustration 
          src="/fitness-cta.png" 
          alt="Fitness CTA"
          opacity={0.12}
          position="center"
          animate={false}
          className="z-[1]"
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
              Ready to start?
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Join thousands of gym-goers tracking their progress and pushing each other to be better.
            </p>
            
            <div className="flex flex-col items-center">
              <MagneticButton 
                onClick={() => setIsModalOpen(true)}
                className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_-5px_rgba(249,115,22,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Grind 💪
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </MagneticButton>
              <span className="mt-3 text-xs text-zinc-400">
                No credit card. Takes 30 seconds.
              </span>
              <span className="mt-1 text-xs text-zinc-500">
                Join early and get <span className="text-orange-400 font-semibold">Pro free for 1 year</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
