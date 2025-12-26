'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { SignUpModal } from '../SignUpModal';

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <section className="py-32 relative overflow-hidden">
        {/* Ambient background for CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
              Ready to break your <br/>
              <span className="text-zinc-500">limits?</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join the elite community of athletes who take their tracking seriously. 
              Start your journey today.
            </p>
            
            <div className="flex flex-col items-center">
              <MagneticButton 
                onClick={() => setIsModalOpen(true)}
                className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Sign up as a test user
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
                <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </MagneticButton>
              <span className="mt-4 text-sm text-zinc-500 font-medium">
                and get a <span className="text-orange-400 font-bold">Pro version free for 1 year</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Removed Footer Links & Copyright as requested */}
        <div className="mt-24 pb-8 text-center">
          {/* Empty footer area or could put a subtle logo mark here if desired, keeping it clean for now */}
        </div>
      </section>
    </>
  );
}
