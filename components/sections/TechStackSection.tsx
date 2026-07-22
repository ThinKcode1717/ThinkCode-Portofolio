'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Cloud, Layers, CheckCircle2 } from 'lucide-react';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
};

export default function TechStackSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...THINKCODE_DATA.skills.map(s => s.category)];

  const filteredSkills = activeCategory === 'All'
    ? THINKCODE_DATA.skills
    : THINKCODE_DATA.skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 bg-transparent overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
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
            <Layers className="w-4 h-4" />
            <span>{t.skills.badge}</span>
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
            {t.skills.titlePre} <span className={isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}>{t.skills.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.skills.subtitle}
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? isDark
                    ? 'bg-[#00f0ff] text-[#000308] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#0284c7] text-white shadow-[0_0_15px_rgba(2,132,199,0.4)]'
                  : isDark
                    ? 'bg-[#03192e]/50 text-slate-300 border border-[#0077b6]/30 hover:border-[#00f0ff]/40 hover:text-white backdrop-blur-md'
                    : 'bg-white/80 text-slate-700 border border-slate-200 hover:border-[#0284c7]/40 hover:text-[#0284c7] backdrop-blur-md'
              }`}
            >
              {cat === 'All' ? t.skills.all : cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((catGroup, idx) => (
            <motion.div
              key={catGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 ${
                isDark
                  ? 'bg-[#03192e]/30 border-[#0077b6]/30 hover:border-[#00f0ff]/40 hover:shadow-[0_10px_35px_rgba(0,240,255,0.15)]'
                  : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/40 hover:shadow-lg'
              }`}
            >
              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${isDark ? 'border-[#0077b6]/20' : 'border-slate-200'}`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDark
                    ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]'
                    : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                }`}>
                  {iconMap[catGroup.iconName] || <Layers className="w-5 h-5" />}
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{catGroup.category}</h3>
              </div>

              <div className="space-y-4">
                {catGroup.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
                        {skill.name}
                      </span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{skill.highlight}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-2 rounded-full overflow-hidden p-0.5 border ${
                      isDark ? 'bg-[#03192e]/80 border-[#0077b6]/20' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          isDark
                            ? 'bg-gradient-to-r from-[#0077b6] to-[#00f0ff] shadow-[0_0_10px_#00f0ff]'
                            : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
