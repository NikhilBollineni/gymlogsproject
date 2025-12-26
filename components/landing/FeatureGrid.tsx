'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { cn } from '@/lib/utils';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeatureGrid() {
  return (
    <section id="features" className="container mx-auto px-6 py-32 relative">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Everything you need <br/>
          <span className="text-zinc-500">to reach your peak.</span>
        </h2>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
      >
        {/* Large Feature - Tracking */}
        <motion.div variants={itemVariants} className="md:col-span-2 row-span-2 relative group">
          <GlassCard className="h-full p-8 flex flex-col justify-between">
            <div className="relative z-10 pointer-events-none">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 text-2xl border border-orange-500/30">📊</div>
              <h3 className="text-2xl font-bold text-white mb-2">Precision Tracking</h3>
              <p className="text-zinc-400 max-w-md text-lg">Log every rep, set, and weight with extreme precision. Visualize your progress over weeks, months, and years.</p>
            </div>
            
            {/* Interactive Abstract UI */}
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-zinc-900/80 to-transparent rounded-tl-3xl border-t border-l border-white/10 p-6 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
              <div className="w-full h-full grid grid-cols-4 gap-2 p-2">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-orange-500/20 rounded-md border border-orange-500/10"
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    whileInView={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: i * 0.1,
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tall Feature - Streaks */}
        <motion.div variants={itemVariants} className="md:col-span-1 row-span-2 relative group">
          <GlassCard className="h-full p-8 flex flex-col items-center text-center">
            <motion.div 
              className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 text-4xl border border-orange-500/20 relative"
              animate={{ 
                boxShadow: ["0 0 0 0px rgba(249, 115, 22, 0.2)", "0 0 0 20px rgba(249, 115, 22, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-ping" />
              🔥
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Streak System</h3>
            <p className="text-zinc-400 text-sm mb-8">Gamified consistency. Don't break the chain.</p>
            
            <div className="flex-1 w-full flex flex-col gap-3 items-center justify-end pb-8 px-4">
              <div className="flex items-end justify-between w-full h-full gap-2">
                {[30, 45, 25, 60, 80, 50, 90].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: "5%" }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1, type: "spring", stiffness: 50 }}
                    className="w-full bg-gradient-to-t from-orange-600 to-yellow-500/50 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Medium Feature - Community */}
        <motion.div variants={itemVariants} className="md:col-span-1 relative group">
          <GlassCard className="h-full p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Crews</h3>
              <p className="text-zinc-400 text-sm">Train together, win together.</p>
            </div>
            <div className="flex -space-x-4 mt-4 pl-2">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300 relative z-0 hover:z-10 transition-all hover:scale-110 cursor-pointer"
                  style={{ backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(0,0,0,0.5))` }}
                  whileHover={{ y: -5 }}
                >
                  {['JD', 'AS', 'MK', 'ZL', '+'][i]}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Medium Feature - Live Feed */}
        <motion.div variants={itemVariants} className="md:col-span-2 relative group">
          <GlassCard className="h-full p-6 flex items-center justify-between">
            <div className="relative z-10 max-w-xs">
              <h3 className="text-xl font-bold text-white mb-2">Live Activity Feed</h3>
              <p className="text-zinc-400 text-sm">See your friends hitting PRs in real-time. Send reactions instantly.</p>
            </div>
            
            <div className="absolute right-0 top-0 bottom-0 w-3/4 bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none" />
            
            <div className="flex gap-3 relative z-10">
              {['👍', '🔥', '💪', '🚀'].map((emoji, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, y: -5, rotate: [0, -10, 10, 0] }}
                  className="w-14 h-14 bg-zinc-800/50 rounded-2xl flex items-center justify-center text-3xl border border-white/5 cursor-pointer backdrop-blur-md shadow-lg hover:bg-zinc-700/50 hover:border-white/20 transition-all"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
