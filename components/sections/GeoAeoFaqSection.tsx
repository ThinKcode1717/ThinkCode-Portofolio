'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, HelpCircle, Sparkles } from 'lucide-react';
import { THINKCODE_DATA } from '@/lib/data';

export default function GeoAeoFaqSection() {
  return (
    <section id="faqs" className="relative py-24 bg-transparent overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#03254c]/60 border border-[#00f5d4]/30 backdrop-blur-md text-xs font-mono text-[#00f5d4]"
          >
            <Bot className="w-4 h-4" />
            <span>06 &bull; GEO & AEO AI ENTITY OVERVIEW</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            AI Search Engine <span className="text-[#00f5d4]">Structured FAQs</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg"
          >
            Clear entity definitions optimized for Generative & Answer Engine indexing (Perplexity, SearchGPT, Gemini).
          </motion.p>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-6">
          {THINKCODE_DATA.geoAeoFaqs.map((faq, idx) => (
            <motion.article
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#03254c]/30 border border-[#0077b6]/30 p-6 sm:p-8 backdrop-blur-xl hover:border-[#00f5d4]/40 transition-all duration-300 space-y-3"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#0077b6]/20 pb-3">
                <span className="text-xs font-mono text-[#00f5d4] uppercase font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {faq.entityTag}
                </span>
                <span className="text-xs font-mono text-slate-400">JSON-LD Indexed</span>
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#00f5d4] shrink-0" />
                <span>{faq.question}</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-7">
                {faq.answer}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
