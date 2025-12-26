'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  Flame, 
  Activity, 
  Smartphone, 
  Dumbbell, 
  Trophy,
  Share2
} from 'lucide-react';

const bentoItems = [
  {
    title: "Advanced Analytics",
    description: "Visualize your progress with professional-grade charts.",
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-blue-500/20 to-cyan-500/20",
    image: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30 mt-8">
        <div className="w-[120%] h-32 bg-gradient-to-t from-blue-500/40 to-transparent blur-xl transform rotate-12" />
      </div>
    )
  },
  {
    title: "Squad Goals",
    description: "Train with friends, share PRs, and compete on leaderboards.",
    icon: <Users className="w-6 h-6 text-purple-400" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Streak System",
    description: "Gamified consistency tracking to keep you disciplined.",
    icon: <Flame className="w-6 h-6 text-orange-400" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Real-time Feed",
    description: "See your crew's workouts as they happen.",
    icon: <Activity className="w-6 h-6 text-green-400" />,
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Smart Logging",
    description: "The fastest way to log sets, reps, and weights.",
    icon: <Smartphone className="w-6 h-6 text-zinc-400" />,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-zinc-500/20 to-zinc-700/20",
  },
];

export function BentoGrid() {
  return (
    <section id="features" className="container mx-auto px-6 py-24 relative">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20"
        >
          Features
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-white"
        >
          Everything you need to <br/><span className="text-gradient">dominate your goals</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
        {bentoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("relative group", item.className)}
          >
            <div className={cn(
              "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              item.gradient
            )} />
            <GlassCard className="h-full flex flex-col justify-between relative overflow-hidden !bg-black/40 !border-white/5 hover:!border-white/10">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
              {item.image && (
                <div className="absolute inset-0 pointer-events-none">
                  {item.image}
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

