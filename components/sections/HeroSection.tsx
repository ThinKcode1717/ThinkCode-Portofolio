'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Sparkles, Bot } from 'lucide-react';
import WaterAvatarCard from '../ui/WaterAvatarCard';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function HeroSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Headline Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-sans ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {t.hero.greeting} <br className="hidden sm:block" />
                <span className={
                  isDark
                    ? 'bg-gradient-to-r from-[#00f0ff] via-[#00b4d8] to-[#0077b6] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.5)]'
                    : 'bg-gradient-to-r from-[#0284c7] via-[#0f766e] to-[#0369a1] bg-clip-text text-transparent'
                }>
                  {THINKCODE_DATA.name}
                </span>
              </h1>
              <p className={`text-xl sm:text-2xl font-medium font-mono flex items-center justify-center lg:justify-start gap-2 ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}>
                <Sparkles className={`w-5 h-5 animate-pulse ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
                <span>{t.hero.role}</span>
              </p>
            </motion.div>

            {/* Tagline Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600 font-medium'
              }`}
            >
              {t.hero.tagline}. Crafting resilient full-stack architectures, high-frequency render engines, and immersive web applications.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#projects"
                className={`px-7 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#0077b6] text-[#000308] shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)]'
                    : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white shadow-[0_0_25px_rgba(2,132,199,0.4)]'
                }`}
              >
                {t.hero.viewWork}
              </a>
              <a
                href="#chatbot"
                className={`px-7 py-3.5 rounded-full backdrop-blur-md font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 border ${
                  isDark
                    ? 'bg-[#03192e]/60 text-white border-[#00f0ff]/40 hover:border-[#00f0ff]/80 hover:bg-[#03192e]/90 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/80 text-slate-800 border-[#0284c7]/40 hover:border-[#0284c7]/80 hover:bg-white shadow-[0_0_15px_rgba(2,132,199,0.15)]'
                }`}
              >
                <Bot className={`w-4 h-4 ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
                <span>{t.hero.talkAi}</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 pt-4 text-slate-400"
            >
              <a
                href={THINKCODE_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#03192e]/40 border-slate-700/50 hover:text-[#00f0ff] hover:border-[#00f0ff]/40'
                    : 'bg-white border-slate-300 text-slate-600 hover:text-[#0284c7] hover:border-[#0284c7]/40'
                }`}
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={THINKCODE_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#03192e]/40 border-slate-700/50 hover:text-[#00f0ff] hover:border-[#00f0ff]/40'
                    : 'bg-white border-slate-300 text-slate-600 hover:text-[#0284c7] hover:border-[#0284c7]/40'
                }`}
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${THINKCODE_DATA.socials.email}`}
                aria-label="Send Email"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#03192e]/40 border-slate-700/50 hover:text-[#00f0ff] hover:border-[#00f0ff]/40'
                    : 'bg-white border-slate-300 text-slate-600 hover:text-[#0284c7] hover:border-[#0284c7]/40'
                }`}
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Water Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <WaterAvatarCard imageSrc="/profile.jpg" altText={THINKCODE_DATA.name} />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.hero.diveDeeper}
          </span>
          <ArrowDown className={`w-4 h-4 animate-bounce ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
        </div>
      </div>
    </section>
  );
}
