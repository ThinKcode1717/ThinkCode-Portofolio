'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, HelpCircle, Sparkles } from 'lucide-react';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

export default function GeoAeoFaqSection() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <ScrollSectionWrapper id="faqs" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
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
            FAQ &amp; Informasi Entitas
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
            Pertanyaan Umum <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>ThinkCode</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Jawaban terstruktur seputar entitas, keahlian, dan layanan Yoga Adi Pratama (ThinkCode).
          </motion.p>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4">
          {THINKCODE_DATA.geoAeoFaqs.map((faq, idx) => (
            <motion.article
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 space-y-2 ${
                isDark
                  ? 'bg-[#03192e]/40 border-[#0077b6]/30 hover:border-[#00e5ff]/40'
                  : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/40 hover:shadow-md'
              }`}
            >
              <div className={`flex items-center justify-between gap-4 border-b pb-2 ${
                isDark ? 'border-[#0077b6]/20' : 'border-slate-200'
              }`}>
                <span className={`text-[10px] font-mono uppercase font-semibold flex items-center gap-1.5 ${
                  isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  {faq.entityTag}
                </span>
                <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  JSON-LD Indexed
                </span>
              </div>

              <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <HelpCircle className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}`} />
                <span>{faq.question}</span>
              </h3>

              <p className={`text-xs leading-relaxed pl-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {faq.answer}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </ScrollSectionWrapper>
  );
}
