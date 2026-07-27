'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineCodeBracket, HiOutlineBolt, HiOutlineCpuChip } from 'react-icons/hi2';
import { FiCompass } from 'react-icons/fi';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

export default function AboutSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const stats = [
    { label: t.about.years, value: THINKCODE_DATA.yearsExperience, icon: FiCompass },
    { label: t.about.projects, value: THINKCODE_DATA.projectsCompleted, icon: HiOutlineAcademicCap },
    { label: t.about.loc, value: THINKCODE_DATA.linesOfCode, icon: HiOutlineCodeBracket },
    { label: t.about.lighthouse, value: '98/100', icon: HiOutlineBolt },
  ];

  return (
    <ScrollSectionWrapper id="about" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs font-mono font-semibold tracking-widest uppercase ${
              isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
            }`}
          >
            {t.about.badge}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.about.titlePre} <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>{t.about.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.about.subtitle}
          </motion.p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-xl ${
              isDark
                ? 'bg-[#031729]/40 border-[#0077b6]/30'
                : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15 hover:bg-white/55 hover:border-white/80'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDark
                    ? 'bg-gradient-to-br from-[#0284c7]/20 to-[#0077b6]/30 border-[#0284c7]/40 text-[#38bdf8]'
                    : 'bg-gradient-to-br from-white/70 to-[#bae6fd]/50 border-white/80 text-[#0284c7]'
                }`}>
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                    <HiOutlineCpuChip className="w-5 h-5" />
                  </motion.div>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                  {t.about.cardTitle}
                </h3>
              </div>

              <p className={`leading-relaxed text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                {t.about.bio}
              </p>

              <p className={`leading-relaxed text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                {t.about.deepBio}
              </p>

              <div className={`pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-white/40'}`}>
                <div>
                  <span className={`text-[10px] font-mono block uppercase font-bold ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>{t.about.base}</span>
                  <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-[#032b43]'}`}>{THINKCODE_DATA.location}</span>
                </div>
                <div>
                  <span className={`text-[10px] font-mono block uppercase font-bold ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>{t.about.status}</span>
                  <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}`}>{t.about.statusVal}</span>
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
            className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4"
          >
            {stats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-center items-center text-center backdrop-blur-xl group transition-all duration-300 shadow-md ${
                    isDark
                      ? 'bg-[#031729]/40 border-[#0077b6]/30 hover:border-[#0284c7]/50'
                      : 'bg-white/40 border-white/60 shadow-lg shadow-[#0284c7]/10 hover:bg-white/60 hover:border-white'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-2 transition-transform ${
                    isDark
                      ? 'bg-[#0284c7]/10 border-[#0284c7]/30 text-[#38bdf8]'
                      : 'bg-white/70 border-white/80 text-[#0284c7]'
                  }`}>
                    <motion.div whileHover={{ rotate: 15, scale: 1.15 }}>
                      <IconComp className="w-4 h-4" />
                    </motion.div>
                  </div>
                  <span className={`text-2xl sm:text-3xl font-extrabold font-mono mb-0.5 ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                    {stat.value}
                  </span>
                  <span className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </ScrollSectionWrapper>
  );
}
