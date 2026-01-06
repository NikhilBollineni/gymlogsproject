'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { FitnessIllustration } from '../ui/FitnessIllustration';

const crewMembers = [
  { name: 'Mike T.', role: 'Powerlifter', pr: 'Deadlift 405 lbs', emoji: '💪', streak: 45 },
  { name: 'Sarah K.', role: 'Bodybuilder', pr: 'Bench 185 lbs', emoji: '🔥', streak: 32 },
  { name: 'Alex R.', role: 'CrossFitter', pr: 'Squat 315 lbs', emoji: '🚀', streak: 28 },
  { name: 'Jordan M.', role: 'Strongman', pr: 'OHP 185 lbs', emoji: '🏋️', streak: 38 },
  { name: 'Taylor L.', role: 'Bodybuilder', pr: 'Deadlift 365 lbs', emoji: '💥', streak: 41 },
  { name: 'Chris D.', role: 'Powerlifter', pr: 'Bench 275 lbs', emoji: '⚡', streak: 29 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function GymCrewSection() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Plain dark background - calm section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Join the <span className="text-orange-500">Community</span>
          </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Train with your crew. Push each other. Stay accountable.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {crewMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <GlassCard className="p-6 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden cursor-pointer border-orange-500/20">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 border-2 border-orange-500/40 flex items-center justify-center text-xl font-bold text-orange-400">
                      {member.emoji}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{member.name}</div>
                      <div className="text-xs text-zinc-400 uppercase tracking-wide">{member.role}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs text-zinc-400 mb-1">Focus</div>
                    <div className="text-sm text-zinc-300">{member.role}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🔥</span>
                      <span className="text-sm text-zinc-300">{member.streak} day streak</span>
                    </div>
                    <div className="text-xs text-zinc-500">Active</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-zinc-300 font-medium">
          <span className="text-orange-400 font-bold">2,500+</span> gym-goers already tracking their gains
        </p>
      </motion.div>
      </div>
    </section>
  );
}
