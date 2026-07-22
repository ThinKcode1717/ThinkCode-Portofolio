'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Waves, Code, Cpu, Award, Zap } from 'lucide-react';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function AboutSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const stats = [
    { label: t.about.years, value: THINKCODE_DATA.yearsExperience, icon: Compass },
    { label: t.about.projects, value: THINKCODE_DATA.projectsCompleted, icon: Award },
    { label: t.about.loc, value: THINKCODE_DATA.linesOfCode, icon: Code },
    { label: t.about.lighthouse, value: '98/100', icon: Zap },
  ];

  return (
    <section id="about" className="relative py-24 bg-transparent overflow-hidden">
      {/* Decorative Ocean Currents Backlight */}
      <div 
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00f0ff 0%, #0077b6 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono ${
              isDark
                ? 'bg-[#03192e]/60 border-[#00f0ff]/30 text-[#00f0ff]'
                : 'bg-white/80 border-[#0284c7]/30 text-[#0284c7]'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>{t.about.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.about.titlePre} <span className={isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}>{t.about.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.about.subtitle}
          </motion.p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 rounded-3xl border p-8 sm:p-10 backdrop-blur-xl flex flex-col justify-between shadow-xl ${
              isDark
                ? 'bg-[#03192e]/30 border-[#0077b6]/30'
                : 'bg-white/80 border-slate-200'
            }`}
          >
            <div className="space-y-6">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                isDark
                  ? 'bg-gradient-to-br from-[#00f0ff]/20 to-[#0077b6]/30 border-[#00f0ff]/40 text-[#00f0ff]'
                  : 'bg-gradient-to-br from-[#e0f2fe] to-[#38bdf8]/30 border-[#0284c7]/40 text-[#0284c7]'
              }`}>
                <Cpu className="w-6 h-6" />
              </div>
              
              <h3 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.about.cardTitle}
              </h3>

              <p className={`leading-relaxed text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {THINKCODE_DATA.bio}
              </p>

              <p className={`leading-relaxed text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {THINKCODE_DATA.deepBio}
              </p>

              <div className={`pt-4 grid grid-cols-2 gap-4 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-slate-200'}`}>
                <div>
                  <span className={`text-xs font-mono block uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.about.base}</span>
                  <span className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{THINKCODE_DATA.location}</span>
                </div>
                <div>
                  <span className={`text-xs font-mono block uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.about.status}</span>
                  <span className={`text-base font-semibold ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`}>{t.about.statusVal}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Core Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`rounded-3xl border p-6 flex flex-col justify-center items-center text-center backdrop-blur-xl group transition-all duration-300 shadow-md ${
                    isDark
                      ? 'bg-[#03192e]/40 border-[#0077b6]/30 hover:border-[#00f0ff]/50'
                      : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                    isDark
                      ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]'
                      : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-3xl sm:text-4xl font-extrabold font-mono mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.value}
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
