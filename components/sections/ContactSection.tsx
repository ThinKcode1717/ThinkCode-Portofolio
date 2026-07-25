'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePaperAirplane, HiOutlineCheckCircle, HiOutlineChatBubbleLeftRight, HiOutlineBolt, HiOutlineClock } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

export default function ContactSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <ScrollSectionWrapper id="contact" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — Clean typographic overline */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs font-mono font-semibold tracking-widest uppercase ${
              isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
            }`}
          >
            {t.contact.badge}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.contact.titlePre} <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>{t.contact.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.contact.subtitle}
          </motion.p>

          {/* Trust indicators with Lucide Icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <span className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${
              isDark
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-50 border-emerald-500/30 text-emerald-700'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: Open for Contracts</span>
            </span>
            <span className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${
              isDark
                ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300'
                : 'bg-white border-slate-300 text-slate-600'
            }`}>
              <HiOutlineClock className="w-3.5 h-3.5" />
              <span>Respon &lt; 24 jam</span>
            </span>
            <span className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${
              isDark
                ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300'
                : 'bg-white border-slate-300 text-slate-600'
            }`}>
              <HiOutlineChatBubbleLeftRight className="w-3.5 h-3.5" />
              <span>Konsultasi awal gratis</span>
            </span>
          </motion.div>
        </div>

        {/* Contact Form & Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-5 rounded-3xl border p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 ${
              isDark
                ? 'bg-[#031729]/40 border-[#0077b6]/30'
                : 'bg-white/80 border-slate-200'
            }`}
          >
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#0284c7]'}`}>{t.contact.directTitle}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.contact.directDesc}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDark ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                  }`}>
                    <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                      <HiOutlineEnvelope className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">{t.contact.emailLabel}</span>
                    <a href={`mailto:${THINKCODE_DATA.socials.email}`} className={`text-sm font-semibold hover:underline ${
                      isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
                    }`}>
                      {THINKCODE_DATA.socials.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDark ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                  }`}>
                    <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                      <HiOutlineMapPin className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">{t.contact.locationLabel}</span>
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{THINKCODE_DATA.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={`pt-6 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-slate-200'}`}>
              <span className="text-xs font-mono text-slate-400 block mb-3">{t.contact.socialsLabel}</span>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  href={THINKCODE_DATA.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Primary (ThinKcode1717)"
                  className={`p-3 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-[#0284c7] hover:border-[#0284c7]/50'
                  }`}
                >
                  <GithubIcon className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ rotate: -12, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  href={THINKCODE_DATA.socials.githubSecondary}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Secondary (think-dev01)"
                  className={`p-3 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300 hover:text-[#00e5ff] hover:border-[#00e5ff]/50'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-[#0284c7] hover:border-[#0284c7]/50'
                  }`}
                >
                  <GithubIcon className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  href={THINKCODE_DATA.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp"
                  className={`px-4 py-3 rounded-2xl border transition-colors flex items-center gap-2 font-mono text-xs font-semibold ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:border-emerald-400'
                      : 'bg-emerald-50 border-emerald-500/30 text-emerald-700 hover:border-emerald-600'
                  }`}
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`lg:col-span-7 rounded-3xl border p-8 sm:p-10 backdrop-blur-xl ${
              isDark
                ? 'bg-[#031729]/40 border-[#0077b6]/30'
                : 'bg-white/80 border-slate-200'
            }`}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                  isDark ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400' : 'bg-emerald-50 border-emerald-500/40 text-emerald-600'
                }`}>
                  <HiOutlineCheckCircle className="w-8 h-8" />
                </div>
                <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.contact.successTitle}</h4>
                <p className={`text-sm max-w-md ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {t.contact.successMsg}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', message: '' }); }}
                  className={`mt-4 px-6 py-2.5 rounded-full text-xs font-mono border ${
                    isDark ? 'border-[#00e5ff]/40 text-[#00e5ff] hover:bg-[#00e5ff]/10' : 'border-[#0284c7]/40 text-[#0284c7] hover:bg-[#e0f2fe]'
                  }`}
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={`block text-xs font-mono uppercase mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t.contact.nameInput}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm transition-colors outline-none ${
                      isDark
                        ? 'bg-[#000610]/60 border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#00e5ff]'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0284c7]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono uppercase mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t.contact.emailInput}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm transition-colors outline-none ${
                      isDark
                        ? 'bg-[#000610]/60 border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#00e5ff]'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0284c7]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono uppercase mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t.contact.messageInput}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm transition-colors outline-none resize-none ${
                      isDark
                        ? 'bg-[#000610]/60 border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#00e5ff]'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0284c7]'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077b6] text-[#000610]'
                      : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white shadow-lg'
                  }`}
                >
                  <HiOutlinePaperAirplane className="w-4 h-4" />
                  <span>{t.contact.submitBtn}</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </ScrollSectionWrapper>
  );
}
