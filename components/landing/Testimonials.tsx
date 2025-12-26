'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { GlassCard } from '../GlassCard';

const testimonials = [
  {
    name: "Alex M.",
    role: "CrossFit Athlete",
    content: "The analytics are insane. I've added 40lbs to my deadlift in 3 months just by visualizing my volume.",
    avatar: "AM"
  },
  {
    name: "Sarah K.",
    role: "Powerlifter",
    content: "Finally an app that understands strength training. The crew features keep me accountable every single day.",
    avatar: "SK"
  },
  {
    name: "James R.",
    role: "Bodybuilder",
    content: "The streak system is addictive. I haven't missed a workout in 45 days. Best fitness decision I've made.",
    avatar: "JR"
  },
  {
    name: "Emily W.",
    role: "Personal Trainer",
    content: "I recommend this to all my clients. The visual feedback loop is exactly what they need to stay motivated.",
    avatar: "EW"
  },
  {
    name: "David C.",
    role: "Marathon Runner",
    content: "Not just for lifting. Tracking my cross-training volume has never been easier or looked better.",
    avatar: "DC"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-white"
        >
          Joined by thousands of athletes
        </motion.h2>
        <p className="text-zinc-400">From beginners to pros, everyone is leveling up.</p>
      </div>

      {/* Infinite Scroll Marquee */}
      <div className="relative flex overflow-hidden mask-linear-fade">
        <motion.div 
          className="flex gap-6 px-6"
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop" 
          }}
          style={{ width: "max-content" }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <GlassCard key={i} className="w-[350px] p-6 hover:bg-white/5 transition-colors flex-shrink-0">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient Masks for Marquee */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
