'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { MagneticButton } from '../ui/MagneticButton';
import { SignUpModal } from '../SignUpModal';
import { FitnessIllustration } from '../ui/FitnessIllustration';

export function HeroSection() {
  const { scrollY } = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <>
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 md:pt-32 pb-20 overflow-hidden">
        
        {/* Clean Minimal Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle gradient orbs - much more minimal */}
          <motion.div 
            style={{ y: y1 }} 
            className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-orange-500/5 rounded-full blur-[100px]" 
          />
          <motion.div 
            style={{ y: y2 }} 
            className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-red-500/5 rounded-full blur-[100px]" 
          />
          
          {/* Subtle fitness illustration - very low opacity */}
          <FitnessIllustration 
            src="/fitness-hero.png" 
            alt="Fitness hero"
            opacity={0.15}
            position="center"
            animate={false}
            className="z-[1]"
          />
          
          {/* Subtle grid pattern - very faint */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Hero Text - Clean & Minimal */}
          <div className="text-center max-w-4xl mx-auto mb-16 relative z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 block leading-[1.15] mb-3">Every Rep</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 block leading-[1.15]">Counts.</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-2xl md:text-4xl font-bold text-orange-500 mb-6"
            >
              Every PR Matters.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-6"
            >
              The fitness app built by <span className="text-orange-400 font-semibold">gym rats</span>, for <span className="text-orange-400 font-semibold">gym rats</span>.
            </motion.p>

            {/* Trust Signals */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-zinc-400"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="text-orange-400">💪</span>
                <span>Built by lifters</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <MagneticButton 
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_-5px_rgba(249,115,22,0.6)]"
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
            </motion.div>
          </div>

          {/* Clean Mobile App Mockup - Modern Design */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative max-w-6xl mx-auto"
          >
            {/* Three Phone Screens - Show Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Screen 1: Log Your Set */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <GlassCard className="w-full max-w-[280px] mx-auto border-white/20 bg-black/60 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden ring-1 ring-white/10">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-50" />
                  <div className="h-[500px] bg-gradient-to-b from-zinc-900/50 to-black/80 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg">💪</div>
                      <div className="text-white font-bold">Log</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-center mb-6">
                        <div className="text-5xl mb-3">💪</div>
                        <h3 className="text-white font-bold text-xl mb-2">Log Your Set</h3>
                      </div>
                      <div className="space-y-3 mb-6">
                        {['Bench Press', 'Squat', 'Deadlift'].map((ex, i) => (
                          <div
                            key={i}
                            className={`px-4 py-3 rounded-xl text-center font-semibold ${
                              i === 0 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-white/5 text-zinc-300 border border-white/10'
                            }`}
                          >
                            {ex}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black/40 rounded-xl p-4 text-center border border-white/10">
                          <div className="text-zinc-400 text-xs mb-1">Weight</div>
                          <div className="text-white font-bold text-2xl">225</div>
                          <div className="text-zinc-500 text-xs">lbs</div>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 text-center border border-white/10">
                          <div className="text-zinc-400 text-xs mb-1">Reps</div>
                          <div className="text-white font-bold text-2xl">5</div>
                          <div className="text-zinc-500 text-xs">reps</div>
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl text-base">
                        Log Set
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Screen 2: Live Activity */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <GlassCard className="w-full max-w-[280px] mx-auto border-white/20 bg-black/60 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden ring-1 ring-white/10">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-50" />
                  <div className="h-[500px] bg-gradient-to-b from-zinc-900/50 to-black/80 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-orange-400 text-xl">⚡</span>
                      <div className="text-white font-bold">Live</div>
                    </div>
                    <div className="flex-1 space-y-3 overflow-y-auto">
                      {[
                        { name: 'Mike', exercise: 'Bench Press', weight: '225', emoji: '🔥', isPR: true },
                        { name: 'Sarah', exercise: 'Deadlift', weight: '315', emoji: '💪', isPR: false },
                        { name: 'Alex', exercise: 'Squat', weight: '275', emoji: '🚀', isPR: true },
                      ].map((activity, i) => (
                        <div 
                          key={i}
                          className="p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-500/40 flex items-center justify-center text-xs font-bold text-orange-400">
                              {activity.name[0]}
                            </div>
                            <span className="text-white font-semibold text-sm flex-1">{activity.name}</span>
                            <span className="text-base">{activity.emoji}</span>
                            {activity.isPR && (
                              <span className="text-xs bg-orange-500/30 text-orange-300 px-1.5 py-0.5 rounded-full font-bold">
                                PR
                              </span>
                            )}
                          </div>
                          <div className="text-zinc-300 text-xs mb-1">{activity.exercise}</div>
                          <div className="text-orange-400 font-bold text-sm">{activity.weight} lbs</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Screen 3: Stats & Streak */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <GlassCard className="w-full max-w-[280px] mx-auto border-white/20 bg-black/60 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden ring-1 ring-white/10">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-50" />
                  <div className="h-[500px] bg-gradient-to-b from-zinc-900/50 to-black/80 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="text-2xl">📊</div>
                      <div className="text-white font-bold">Stats</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30 text-center">
                        <div className="text-4xl mb-3">🔥</div>
                        <div className="text-white font-bold text-3xl mb-1">12</div>
                        <div className="text-zinc-300 text-sm">Day Streak</div>
                        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '75%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                          <div className="text-2xl mb-2">🏆</div>
                          <div className="text-white font-bold text-xl">3</div>
                          <div className="text-zinc-400 text-xs">PRs Today</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                          <div className="text-2xl mb-2">💪</div>
                          <div className="text-white font-bold text-xl">24</div>
                          <div className="text-zinc-400 text-xs">This Week</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
