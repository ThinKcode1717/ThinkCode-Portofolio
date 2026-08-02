'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineChatBubbleBottomCenterText, HiOutlineArrowTrendingUp, HiOutlineUsers, HiOutlineBolt } from 'react-icons/hi2';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

export default function TestimonialsSection() {
  const { t, theme } = useApp();
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
              isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
            }`}
          >
            {t.testimonials.badge}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-display ${
              isDark ? 'text-white' : 'text-[#032b43]'
            }`}
          >
            {t.testimonials.titlePre}{' '}
            <span className={isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}>
              {t.testimonials.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto font-medium ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}
          >
            {t.testimonials.subtitle}
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
              : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15'
          }`}
        >
          {[
            { value: THINKCODE_DATA.clientsServed, label: t.testimonials.clientsServed, icon: HiOutlineUsers },
            { value: THINKCODE_DATA.satisfactionRate, label: t.testimonials.satisfactionRate, icon: HiStar },
            { value: THINKCODE_DATA.responseTime, label: t.testimonials.responseTime, icon: HiOutlineBolt },
          ].map((stat) => {
            const IconComp = stat.icon;
            return (
              <div key={stat.label} className="text-center flex flex-col items-center">
                <motion.div whileHover={{ rotate: 12, scale: 1.15 }} className="mb-1">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                    isDark
                      ? 'bg-[#0284c7]/10 border-[#0284c7]/30 text-[#38bdf8]'
                      : 'bg-white/70 border-white/80 text-[#0284c7]'
                  }`}>
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
                <div className={`text-xl sm:text-2xl font-extrabold font-mono ${isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}`}>
                  {stat.value}
                </div>
                <div className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.data.testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`group relative rounded-2xl border p-5 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                isDark
                  ? 'bg-[#031729]/30 border-[#0077b6]/30 hover:border-[#0284c7]/40'
                  : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15 hover:bg-white/55 hover:border-white/80'
              }`}
            >
              {/* Quote Icon */}
              <div className={`absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity ${
                isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
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
                <p className={`text-xs leading-relaxed italic font-medium ${isDark ? 'text-slate-200' : 'text-[#0c3559]'}`}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Impact Result */}
                <div className={`flex items-start gap-1.5 p-2 rounded-xl text-[11px] font-mono font-semibold ${
                  isDark
                    ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400'
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800'
                }`}>
                  <HiOutlineArrowTrendingUp className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{testimonial.result}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className={`flex items-center gap-2.5 pt-3 mt-3 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-white/40'}`}>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                  isDark
                    ? 'bg-gradient-to-br from-[#0284c7]/20 to-[#0077b6]/30 border-[#0284c7]/40 text-[#38bdf8]'
                    : 'bg-gradient-to-br from-white/80 to-[#bae6fd]/50 border-white/90 text-[#0284c7]'
                }`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div className="truncate">
                  <h4 className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-[#032b43]'}`}>{testimonial.name}</h4>
                  <p className={`text-[10px] font-mono font-semibold truncate ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
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
