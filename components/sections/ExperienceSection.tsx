'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineMapPin, HiOutlineCheckCircle } from 'react-icons/hi2';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

export default function ExperienceSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <ScrollSectionWrapper id="experience" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
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
            {t.experience.badge}
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
            {t.experience.titlePre} <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>{t.experience.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.experience.subtitle}
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Guide Line */}
          <div className={`absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
            isDark
              ? 'bg-gradient-to-b from-[#00e5ff] via-[#0077b6] to-[#001220]'
              : 'bg-gradient-to-b from-[#0284c7] via-[#0f766e] to-[#e0f2fe]'
          }`} />

          <div className="space-y-6 sm:space-y-8">
            {t.data.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.role + exp.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Node Marker */}
                  <div className={`absolute left-4 sm:left-1/2 top-0 -translate-x-1/2 w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 ${
                    isDark
                      ? 'bg-[#000610] border-[#0284c7] text-[#38bdf8]'
                      : 'bg-white border-[#0284c7] text-[#0284c7] shadow-lg shadow-[#0284c7]/20'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#38bdf8]' : 'bg-[#0284c7]'}`} />
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full sm:w-[calc(50%-2rem)] ml-10 sm:ml-0 ${
                    isEven ? 'sm:mr-auto sm:pr-0' : 'sm:ml-auto sm:pl-0'
                  }`}>
                    <div className={`rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 space-y-3 ${
                      isDark
                        ? 'bg-[#031729]/40 border-[#0077b6]/30 hover:border-[#0284c7]/40'
                        : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15 hover:bg-white/55 hover:border-white/80'
                    }`}>
                      
                      <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-2 ${
                        isDark ? 'border-[#0077b6]/20' : 'border-white/40'
                      }`}>
                        <span className={`text-[11px] font-mono font-bold flex items-center gap-1 ${
                          isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
                        }`}>
                          <HiOutlineCalendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className={`text-[11px] font-mono font-medium flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                          <HiOutlineMapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-[#032b43]'}`}>{exp.role}</h3>
                        <span className={`text-xs font-bold ${isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}`}>{exp.company}</span>
                      </div>

                      <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                        {exp.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className={`space-y-1.5 pt-2 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-white/40'}`}>
                        {exp.highlights.map((h, i) => (
                          <li key={i} className={`text-[11px] font-mono font-semibold flex items-start gap-1.5 ${isDark ? 'text-slate-300' : 'text-[#082846]'}`}>
                            <HiOutlineCheckCircle className={`w-3 h-3 shrink-0 mt-0.5 ${isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}`} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </ScrollSectionWrapper>
  );
}
