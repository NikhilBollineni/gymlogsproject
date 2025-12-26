'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const statsData = [
  { icon: '🏆', title: 'Personal Best', value: '151', unit: 'lbs' },
  { icon: '📈', title: 'Increase', value: '+48', unit: 'lbs gained' },
  { icon: '🔥', title: 'Streak', value: '8', unit: 'days' },
  { icon: '⚙️', title: 'Total Sets', value: '43', unit: 'logged' },
];

// Sample weight progression data
const weightData = [
  { week: 'W1', weight: 120 },
  { week: 'W2', weight: 125 },
  { week: 'W3', weight: 130 },
  { week: 'W4', weight: 128 },
  { week: 'W5', weight: 135 },
  { week: 'W6', weight: 140 },
  { week: 'W7', weight: 145 },
  { week: 'W8', weight: 151 },
];

// Sample volume data
const volumeData = [
  { day: 'Mon', volume: 2400 },
  { day: 'Tue', volume: 3200 },
  { day: 'Wed', volume: 2800 },
  { day: 'Thu', volume: 3600 },
  { day: 'Fri', volume: 2000 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const barColors = [
  'rgba(255, 255, 255, 0.6)',
  'rgba(255, 255, 255, 0.7)',
  'rgba(255, 255, 255, 0.65)',
  'rgba(255, 255, 255, 0.8)',
  'rgba(255, 255, 255, 0.55)',
];

export function AnalyticsSection() {
  return (
    <section id="analytics" className="container mx-auto px-6 py-20 relative">
      {/* Header - More impactful, positioned for immediate attention */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Watch yourself get stronger
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl text-zinc-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Beautiful analytics that motivate you to push harder
        </motion.p>
      </motion.div>

      {/* Stats Cards Row - First thing visitors see after hero */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <GlassCard className="text-center p-8 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden cursor-pointer">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div 
                className="text-5xl mb-4 relative z-10"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-sm font-medium text-zinc-400 mb-3 relative z-10 uppercase tracking-wide">
                {stat.title}
              </h3>
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: index * 0.1 
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-zinc-500 relative z-10">{stat.unit}</div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row - Visual proof of value */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
      >
        {/* Weight Progression Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <GlassCard className="p-8 hover:bg-white/5 transition-all duration-300 relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <motion.div 
                className="text-3xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                📈
              </motion.div>
              <h3 className="text-2xl font-bold text-white">Weight Progression</h3>
            </div>
            <div className="h-72 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <defs>
                    <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="week" 
                    stroke="#71717a" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(39, 39, 42, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      padding: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#ffffff"
                    strokeWidth={3}
                    dot={{ fill: '#ffffff', r: 5 }}
                    activeDot={{ r: 7, fill: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-zinc-400 mt-6 relative z-10">
              Track your strength gains over time
            </p>
          </GlassCard>
        </motion.div>

        {/* Volume Tracking Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <GlassCard className="p-8 hover:bg-white/5 transition-all duration-300 relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <motion.div 
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                🎯
              </motion.div>
              <h3 className="text-2xl font-bold text-white">Volume Tracking</h3>
            </div>
            <div className="h-72 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <XAxis 
                    dataKey="day" 
                    stroke="#71717a" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(39, 39, 42, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      padding: '12px',
                    }}
                  />
                  <Bar
                    dataKey="volume"
                    radius={[8, 8, 0, 0]}
                    fill="rgba(255, 255, 255, 0.7)"
                  >
                    {volumeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-zinc-400 mt-6 relative z-10">
              Monitor your training volume
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Footer Text - Reinforces the value proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-lg md:text-xl text-zinc-300 font-medium">
          Every rep tracked. Every PR celebrated. Every gain visualized.
        </p>
      </motion.div>
    </section>
  );
}
