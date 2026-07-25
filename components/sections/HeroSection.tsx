'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Sparkles, ArrowRight, FolderGit2, MessageSquare } from 'lucide-react';
import WaterAvatarCard from '../ui/WaterAvatarCard';
import { GithubIcon } from '../ui/Icons';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

export default function HeroSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <ScrollSectionWrapper id="hero" className="relative min-h-[85vh] lg:min-h-screen w-full flex items-center justify-center pt-20 lg:pt-24 pb-8 lg:pb-12 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5">
            
            {/* Headline Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-1.5 w-full"
            >
              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {t.hero.greeting} <br className="hidden sm:block" />
                <span className={
                  isDark
                    ? 'bg-gradient-to-r from-[#00e5ff] via-[#00b4d8] to-[#7c3aed] bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-[#0284c7] via-[#0f766e] to-[#7c3aed] bg-clip-text text-transparent'
                }>
                  {THINKCODE_DATA.name}
                </span>
              </h1>
              <p className={`text-base sm:text-xl font-medium font-mono flex items-center justify-center lg:justify-start gap-2 pt-1 ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}>
                <motion.span whileHover={{ rotate: 20, scale: 1.2 }}>
                  <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}`} />
                </motion.span>
                <span>{t.hero.role}</span>
              </p>
            </motion.div>

            {/* Tagline Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1.5"
            >
              <p className={`text-xs sm:text-base max-w-2xl leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600 font-medium'
              }`}>
                {t.hero.tagline}. Merancang arsitektur full-stack yang tangguh, sistem web berkinerja tinggi, dan integrasi AI yang efisien.
              </p>
              <p className={`text-xs font-medium max-w-2xl ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {THINKCODE_DATA.clientBio}
              </p>
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 w-full pt-1"
            >
              <a
                href="#contact"
                className={`px-6 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide text-center transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077b6] text-[#000610]'
                    : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white'
                }`}
              >
                <span>Mulai Proyek Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className={`px-6 py-3 rounded-full backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95 border ${
                  isDark
                    ? 'bg-[#031729]/60 text-white border-[#00e5ff]/30 hover:border-[#00e5ff]/60 hover:bg-[#031729]/90'
                    : 'bg-white/80 text-slate-800 border-[#0284c7]/30 hover:border-[#0284c7]/60 hover:bg-white'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>{t.hero.viewWork}</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 pt-2 text-slate-400"
            >
              <motion.a
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                href={THINKCODE_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Primary Profile"
                title="GitHub (ThinKcode1717)"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#03192e]/40 border-slate-700/50 hover:text-[#00e5ff] hover:border-[#00e5ff]/40'
                    : 'bg-white border-slate-300 text-slate-600 hover:text-[#0284c7] hover:border-[#0284c7]/40'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ rotate: -12, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                href={THINKCODE_DATA.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Contact"
                title="WhatsApp (089601486350)"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:border-emerald-400'
                    : 'bg-emerald-50 border-emerald-500/30 text-emerald-700 hover:border-emerald-600'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                href={`mailto:${THINKCODE_DATA.socials.email}`}
                aria-label="Send Email"
                title={`Email (${THINKCODE_DATA.socials.email})`}
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#03192e]/40 border-slate-700/50 hover:text-[#00e5ff] hover:border-[#00e5ff]/40'
                    : 'bg-white border-slate-300 text-slate-600 hover:text-[#0284c7] hover:border-[#0284c7]/40'
                }`}
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Water Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center pt-2 lg:pt-0"
          >
            <WaterAvatarCard imageSrc="/profile.jpg" altText={THINKCODE_DATA.name} />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity pt-6">
          <span className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.hero.diveDeeper}
          </span>
          <ArrowDown className={`w-3.5 h-3.5 animate-bounce ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}`} />
        </div>
      </div>
    </ScrollSectionWrapper>
  );
}
