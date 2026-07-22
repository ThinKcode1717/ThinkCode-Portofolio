'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function ExperienceSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <section id="experience" className="relative py-24 bg-transparent overflow-hidden">
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
            <Briefcase className="w-4 h-4" />
            <span>{t.experience.badge}</span>
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
            {t.experience.titlePre} <span className={isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}>{t.experience.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.experience.subtitle}
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Ocean Line */}
          <div className={`absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
            isDark
              ? 'bg-gradient-to-b from-[#00f0ff] via-[#0077b6] to-[#001220] shadow-[0_0_15px_#00f0ff]'
              : 'bg-gradient-to-b from-[#0284c7] via-[#0f766e] to-[#e0f2fe]'
          }`} />

          <div className="space-y-12">
            {THINKCODE_DATA.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.role + exp.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Marker */}
                  <div className={`absolute left-4 sm:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    isDark
                      ? 'bg-[#000308] border-[#00f0ff] text-[#00f0ff] shadow-[0_0_20px_#00f0ff]'
                      : 'bg-white border-[#0284c7] text-[#0284c7] shadow-md'
                  }`}>
                    <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDark ? 'bg-[#00f0ff]' : 'bg-[#0284c7]'}`} />
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 ${
                    isEven ? 'sm:mr-auto sm:pr-0' : 'sm:ml-auto sm:pl-0'
                  }`}>
                    <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 space-y-4 ${
                      isDark
                        ? 'bg-[#03192e]/30 border-[#0077b6]/30 hover:border-[#00f0ff]/40 hover:shadow-[0_10px_35px_rgba(0,240,255,0.15)]'
                        : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/40 hover:shadow-xl'
                    }`}>
                      
                      <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                        isDark ? 'border-[#0077b6]/20' : 'border-slate-200'
                      }`}>
                        <span className={`text-xs font-mono font-semibold flex items-center gap-1 ${
                          isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'
                        }`}>
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className={`text-xs font-mono flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                        <span className={`text-sm font-semibold ${isDark ? 'text-[#0077b6]' : 'text-[#0284c7]'}`}>{exp.company}</span>
                      </div>

                      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {exp.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className={`space-y-2 pt-2 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-slate-200'}`}>
                        {exp.highlights.map((h, i) => (
                          <li key={i} className={`text-xs font-mono flex items-start gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
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
    </section>
  );
}
