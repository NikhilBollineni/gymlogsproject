'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GlassCard } from '../GlassCard';

const features = [
  {
    icon: '📊',
    title: 'Automatic Tracking',
    description: 'We track your volume, progression, and trends. No spreadsheets needed.',
  },
  {
    icon: '⚡',
    title: 'Instant Insights',
    description: 'See your progress at a glance. Know when you hit new records automatically.',
  },
  {
    icon: '🎯',
    title: 'Focus on Lifting',
    description: 'Spend less time logging, more time lifting. Simple interface, powerful results.',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function AnalyticsSection() {
  return (
    <section id="analytics" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Plain dark background - calm section */}
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header - Focus on "Why it's better" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why It's <span className="text-orange-500">Better</span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Automatic tracking. No spreadsheets. No manual charts. Just log and go.
          </motion.p>
        </motion.div>

        {/* Key Features - Simple Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <GlassCard className="p-8 h-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
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
