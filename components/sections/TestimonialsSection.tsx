'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineChatBubbleBottomCenterText, HiOutlineArrowTrendingUp, HiOutlineUsers, HiOutlineBolt } from 'react-icons/hi2';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

export default function TestimonialsSection() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <ScrollSectionWrapper id="testimonials" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
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
            Klien &amp; Testimonial
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
            Hasil Nyata,{' '}
            <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>
              Klien Puas
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Dampak nyata pada efisiensi sistem dan pertumbuhan bisnis klien.
          </motion.p>
        </div>

        {/* Satisfaction Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-8 rounded-2xl border p-4 backdrop-blur-xl ${
            isDark
              ? 'bg-[#031729]/40 border-[#0077b6]/30'
              : 'bg-white/80 border-slate-200'
          }`}
        >
          {[
            { value: THINKCODE_DATA.clientsServed, label: 'Klien Dilayani', icon: HiOutlineUsers },
            { value: THINKCODE_DATA.satisfactionRate, label: 'Tingkat Kepuasan', icon: HiStar },
            { value: THINKCODE_DATA.responseTime, label: 'Response Time', icon: HiOutlineBolt },
          ].map((stat) => {
            const IconComp = stat.icon;
            return (
              <div key={stat.label} className="text-center flex flex-col items-center">
                <motion.div whileHover={{ rotate: 12, scale: 1.15 }} className="mb-1">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                    isDark
                      ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]'
                      : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                  }`}>
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
                <div className={`text-xl sm:text-2xl font-extrabold font-mono ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}`}>
                  {stat.value}
                </div>
                <div className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THINKCODE_DATA.testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`group relative rounded-2xl border p-5 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                isDark
                  ? 'bg-[#031729]/30 border-[#0077b6]/30 hover:border-[#00e5ff]/40'
                  : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/50 hover:shadow-lg'
              }`}
            >
              {/* Quote Icon */}
              <div className={`absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity ${
                isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
              }`}>
                <HiOutlineChatBubbleBottomCenterText className="w-6 h-6" />
              </div>

              <div className="space-y-3 flex-1">
                {/* Stars Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <HiStar key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className={`text-xs leading-relaxed italic ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Impact Result */}
                <div className={`flex items-start gap-1.5 p-2 rounded-xl text-[11px] font-mono ${
                  isDark
                    ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400'
                    : 'bg-emerald-50 border border-emerald-500/20 text-emerald-700'
                }`}>
                  <HiOutlineArrowTrendingUp className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{testimonial.result}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className={`flex items-center gap-2.5 pt-3 mt-3 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-slate-200'}`}>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                  isDark
                    ? 'bg-gradient-to-br from-[#00e5ff]/20 to-[#0077b6]/30 border-[#00e5ff]/40 text-[#00e5ff]'
                    : 'bg-gradient-to-br from-[#e0f2fe] to-[#38bdf8]/30 border-[#0284c7]/40 text-[#0284c7]'
                }`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div className="truncate">
                  <h4 className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</h4>
                  <p className={`text-[10px] font-mono truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {testimonial.role} &bull; {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </ScrollSectionWrapper>
  );
}
