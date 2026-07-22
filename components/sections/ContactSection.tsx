'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';

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
    <section id="contact" className="relative py-24 bg-transparent overflow-hidden">
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
            <Mail className="w-4 h-4" />
            <span>{t.contact.badge}</span>
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
            {t.contact.titlePre} <span className={isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}>{t.contact.titleHighlight}</span>
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
                ? 'bg-[#03192e]/30 border-[#0077b6]/30'
                : 'bg-white/80 border-slate-200'
            }`}
          >
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.contact.directTitle}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.contact.directDesc}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDark ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">{t.contact.emailLabel}</span>
                    <a href={`mailto:${THINKCODE_DATA.socials.email}`} className={`text-sm font-semibold hover:underline ${
                      isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'
                    }`}>
                      {THINKCODE_DATA.socials.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDark ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                  }`}>
                    <MapPin className="w-5 h-5" />
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
                <a
                  href={THINKCODE_DATA.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-[#03192e]/60 border-[#0077b6]/30 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50'
                      : 'bg-white border-slate-300 text-slate-700 hover:text-[#0284c7] hover:border-[#0284c7]/50'
                  }`}
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={THINKCODE_DATA.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-[#03192e]/60 border-[#0077b6]/30 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50'
                      : 'bg-white border-slate-300 text-slate-700 hover:text-[#0284c7] hover:border-[#0284c7]/50'
                  }`}
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`lg:col-span-7 rounded-3xl border p-8 backdrop-blur-xl ${
              isDark
                ? 'bg-[#03192e]/30 border-[#0077b6]/30'
                : 'bg-white/80 border-slate-200'
            }`}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                  isDark
                    ? 'bg-[#00f0ff]/10 border-[#00f0ff]/40 text-[#00f0ff] shadow-[0_0_30px_#00f0ff]'
                    : 'bg-[#e0f2fe] border-[#0284c7]/40 text-[#0284c7]'
                }`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.contact.successTitle}</h3>
                <p className={`text-sm max-w-md ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {t.contact.successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={`block text-xs font-mono mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.nameInput}</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className={`w-full border rounded-2xl px-4 py-3.5 text-sm font-sans transition-colors ${
                      isDark
                        ? 'bg-[#000308]/80 border-[#0077b6]/40 text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0284c7] focus:outline-none'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.emailInput}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className={`w-full border rounded-2xl px-4 py-3.5 text-sm font-sans transition-colors ${
                      isDark
                        ? 'bg-[#000308]/80 border-[#0077b6]/40 text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0284c7] focus:outline-none'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.messageInput}</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className={`w-full border rounded-2xl px-4 py-3.5 text-sm font-sans transition-colors ${
                      isDark
                        ? 'bg-[#000308]/80 border-[#0077b6]/40 text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0284c7] focus:outline-none'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#00f0ff] to-[#0077b6] text-[#000308] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitBtn}</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
