'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../GlassCard';

const steps = [
  {
    number: '1',
    title: 'Log Your Sets',
    description: 'Tap your exercise, weight, and reps. Takes 30 seconds.',
    icon: '💪',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
  },
  {
    number: '2',
    title: 'Track Progress Automatically',
    description: 'We track your PRs, volume, and streaks. No manual charts.',
    icon: '📊',
    color: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    number: '3',
    title: 'Train With Your Crew',
    description: 'See your gym buddies hit PRs in real-time. Push each other.',
    icon: '👥',
    color: 'from-green-500/20 to-teal-500/20',
    borderColor: 'border-green-500/30',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Plain dark background - no gradients, calm section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Your first 5 minutes. Simple, clear, powerful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <GlassCard className={`p-8 h-full bg-gradient-to-br ${step.color} border ${step.borderColor} relative overflow-hidden`}>
                {/* Step Number Badge */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6">{step.icon}</div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-400 text-sm">
            That's it. No complicated setup. No learning curve.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
