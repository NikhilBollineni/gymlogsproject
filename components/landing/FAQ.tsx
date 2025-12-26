'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Is the basic version really free?",
    answer: "Yes, absolutely. You can track unlimited workouts and create custom routines without paying a dime."
  },
  {
    question: "How does the streak system work?",
    answer: "Consistency is key. Maintain your streak by logging workouts. Unlock exclusive emojis and status symbols as you progress."
  },
  {
    question: "Can I create a Crew with my friends?",
    answer: "Yes! Create a crew, invite your friends, and compete on the leaderboard. It's the best way to stay motivated."
  },
  {
    question: "What makes this different from other apps?",
    answer: "We focus on community and gamification. Most apps are just digital notebooks. We're a digital gym crew."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-6 py-32 max-w-4xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-zinc-400">Everything you need to know about the platform.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <GlassCard 
            key={index}
            className="p-0 overflow-hidden cursor-pointer"
          >
            <div 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="p-6 flex items-center justify-between"
            >
              <h3 className="text-lg font-medium text-white">{faq.question}</h3>
              <div className="text-zinc-400">
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </div>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
