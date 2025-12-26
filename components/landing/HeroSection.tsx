'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { MagneticButton } from '../ui/MagneticButton';
import { BorderBeam } from '../ui/BorderBeam';
import { SignUpModal } from '../SignUpModal';

export function HeroSection() {
  const { scrollY } = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 100 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    // Calculate values from -1 to 1
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Invert and scale for natural feel
    rotateX.set(y * -10); 
    rotateY.set(x * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <>
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden perspective-1000">
        
        {/* Dynamic Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <motion.div style={{ y: y2 }} className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-5xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 block">Fitness</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-red-600 block mt-2 pb-4">Reimagined.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              The all-in-one platform to track workouts, join crews, and visualize your progress with professional-grade analytics.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <MagneticButton 
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Become a test user
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </MagneticButton>
              <span className="mt-3 text-sm text-zinc-500 font-medium tracking-wide">
                and get a <span className="text-orange-400 font-bold">Pro version free for 1 year</span>
              </span>
            </motion.div>
          </div>

          {/* 3D App Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 100 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring" }}
            style={{ perspective: 2000, rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative max-w-6xl mx-auto transform-style-3d"
          >
            {/* Main Interface Card */}
            <GlassCard className="aspect-[16/9] w-full border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group rounded-xl ring-1 ring-white/10">
              {/* Border Beam Effect */}
              <BorderBeam size={250} duration={12} delay={9} borderWidth={2} />
              
              {/* Glossy sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />
              
              {/* UI Mockup Content */}
              <div className="grid grid-cols-12 h-full p-8 gap-8">
                {/* Sidebar */}
                <div className="col-span-3 border-r border-white/5 pr-8 hidden md:flex flex-col gap-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/20" />
                    <div className="h-4 w-24 bg-white/10 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group/item">
                        <div className="h-5 w-5 rounded bg-white/10 group-hover/item:bg-white/20 transition-colors" />
                        <div className="h-3 w-20 bg-white/10 rounded-full group-hover/item:bg-white/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/5">
                    <div className="h-3 w-3/4 bg-white/20 rounded-full mb-3" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="col-span-12 md:col-span-9 space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="h-8 w-48 bg-white/10 rounded-lg mb-2" />
                      <div className="h-4 w-32 bg-white/5 rounded-full" />
                    </div>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/5 border border-white/5" />
                      <div className="h-10 w-10 rounded-full bg-white/5 border border-white/5" />
                    </div>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/5 p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                        <div className="h-8 w-8 rounded-lg bg-white/10" />
                        <div>
                          <div className="h-6 w-16 bg-white/20 rounded mb-2" />
                          <div className="h-3 w-24 bg-white/10 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Charts Area */}
                  <div className="h-64 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden flex items-end p-6 gap-2 group/chart">
                    <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent to-black/20" />
                    <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05 + 1, duration: 1, type: "spring" }}
                        className="flex-1 bg-gradient-to-t from-white/20 to-white/5 rounded-t-sm hover:from-orange-500/50 hover:to-orange-500/20 transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
            
            {/* Floating Elements for Parallax */}
            <motion.div 
              style={{ zIndex: 20, x: -50, y: 50 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 bottom-32 p-5 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4 min-w-[200px]"
            >
              <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl border border-orange-500/20">🔥</div>
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Streak</div>
                <div className="text-xl font-bold text-white">12 Days</div>
              </div>
            </motion.div>

            <motion.div 
              style={{ zIndex: 20, x: 50, y: -50 }}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-12 top-20 p-5 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4 min-w-[200px]"
            >
              <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl border border-orange-500/20">💪</div>
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Bench Press</div>
                <div className="text-xl font-bold text-white">225 lbs <span className="text-green-400 text-sm ml-1">PR</span></div>
              </div>
            </motion.div>

            {/* Crew PR Notification */}
            <motion.div 
              style={{ zIndex: 20, x: -20, y: -80 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute left-20 -top-12 p-4 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4 min-w-[220px]"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">JD</div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <div className="text-xs text-zinc-400 font-medium mb-0.5">Just now</div>
                <div className="text-sm text-white">
                  <span className="font-bold text-white">John D.</span> hit a PR! <br/>
                  <span className="text-blue-400 font-bold">Deadlift 315 lbs</span> 🚀
                </div>
              </div>
            </motion.div>

            {/* Weekly Goal Ring */}
            <motion.div 
              style={{ zIndex: 20, x: -30, y: -20 }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-6 top-1/2 p-4 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4"
            >
              <div className="relative h-12 w-12 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="#a855f7" strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-bold text-white">75%</span>
              </div>
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Weekly Goal</div>
                <div className="text-sm font-bold text-white">3/4 Workouts</div>
              </div>
            </motion.div>

            {/* Crew Rank Crown */}
            <motion.div 
              style={{ zIndex: 20, x: 40, y: 40 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -right-8 bottom-20 p-4 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 min-w-[180px]"
            >
              <div className="h-10 w-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xl border border-yellow-500/20">👑</div>
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Crew Rank</div>
                <div className="text-lg font-bold text-white">#1 <span className="text-sm font-normal text-zinc-400">this week</span></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
