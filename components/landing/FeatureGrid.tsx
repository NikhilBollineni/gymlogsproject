'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GlassCard } from '../GlassCard';

const features = [
  {
    icon: '🏆',
    title: 'PR Tracking',
    description: 'Automatic personal record detection. Celebrate every milestone.',
  },
  {
    icon: '🔥',
    title: 'Streak System',
    description: 'Build consistency. Don\'t break the chain.',
  },
  {
    icon: '👥',
    title: 'Crew Challenges',
    description: 'Compete with your gym crew. See who\'s grinding hardest.',
  },
  {
    icon: '⚡',
    title: 'Live Activity',
    description: 'See your crew\'s workouts in real-time. Stay motivated.',
  },
  {
    icon: '📊',
    title: 'Progress Analytics',
    description: 'Visualize your gains. Track volume and progression.',
  },
  {
    icon: '💪',
    title: 'Quick Logging',
    description: 'Log sets in seconds. No complicated forms.',
  },
];

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
    <section id="features" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Plain dark background - calm section */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What You Get
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Features built for serious lifters
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <GlassCard className="p-6 h-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
