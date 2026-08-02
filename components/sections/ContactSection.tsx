'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineWrenchScrewdriver,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineCheck
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { GithubIcon } from '../ui/Icons';
import { THINKCODE_DATA } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

interface ServiceOption {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function ContactSection() {
  const { t, theme, lang } = useApp();
  const isDark = theme === 'dark';
  const isEn = lang === 'en';

  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Simple Client-Friendly Form State
  const [selectedGoal, setSelectedGoal] = useState<string>(
    isEn ? 'Web Application & Website' : 'Aplikasi Web & Website Custom'
  );
  const [selectedProjectType, setSelectedProjectType] = useState<string>(
    isEn ? 'New Project (From Scratch)' : 'Proyek Baru (Dari Nol)'
  );
  const [selectedTimeline, setSelectedTimeline] = useState<string>(
    isEn ? '1 Month' : '1 Bulan'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const projectGoals: ServiceOption[] = [
    {
      id: 'web',
      title: isEn ? 'Web Application & Website' : 'Aplikasi Web & Website Custom',
      desc: isEn
        ? 'Interactive landing pages, e-commerce, company portals, or custom web systems'
        : 'Landing page interaktif, toko online, portal perusahaan, atau sistem web bisnis',
      icon: <HiOutlineCodeBracket className="w-5 h-5" />
    },
    {
      id: 'automation',
      title: isEn ? 'Data Scraping & Automation' : 'Otomasi Data & Web Scraping',
      desc: isEn
        ? 'Automated data collection, market research, and process workflows'
        : 'Pengumpulan data otomatis, riset prospek bisnis, & alur proses otomatis',
      icon: <HiOutlineCpuChip className="w-5 h-5" />
    },
    {
      id: 'ai_ml',
      title: isEn ? 'AI & Smart Business Systems' : 'Sistem AI & Analitik Pintar',
      desc: isEn
        ? 'Inventory forecasting, AI assistants, and smart data analysis'
        : 'Prediksi kebutuhan stok, chatbot asisten AI, & analitik data pintar',
      icon: <HiOutlineSparkles className="w-5 h-5" />
    },
    {
      id: 'consult',
      title: isEn ? 'Consultation & System Upgrade' : 'Konsultasi & Perbaikan Sistem',
      desc: isEn
        ? 'Project advice, existing web application upgrades, or code optimization'
        : 'Diskusi konsep proyek, upgrade aplikasi web existing, & optimasi performa',
      icon: <HiOutlineWrenchScrewdriver className="w-5 h-5" />
    }
  ];

  const projectTypes = isEn
    ? ['New Project (From Scratch)', 'Upgrade Existing System', 'Consultation / Audit']
    : ['Proyek Baru (Dari Nol)', 'Pengembangan Sistem Existing', 'Konsultasi / Audit'];

  const availableTimelines = isEn
    ? ['Immediate (< 2 Weeks)', '1 Month', '1-3 Months', 'Flexible']
    : ['Segera (< 2 Minggu)', '1 Bulan', '1-3 Bulan', 'Fleksibel'];

  const handleNextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  // Construct Email mailto link
  const emailSubject = encodeURIComponent(`[Inquiry Portofolio ThinkCode] - ${formData.name || 'Proyek Baru'}`);
  const emailBody = encodeURIComponent(
    `Halo ThinkCode (Yoga Adi Pratama),\n\n` +
    `Saya tertarik untuk mendiskusikan proyek berikut:\n\n` +
    `• Kebutuhan Proyek: ${selectedGoal}\n` +
    `• Skala Proyek: ${selectedProjectType}\n` +
    `• Estimasi Linimasa: ${selectedTimeline}\n\n` +
    `Detail Kontak Saya:\n` +
    `• Nama: ${formData.name || '-'}\n` +
    `• Email: ${formData.email || '-'}\n` +
    `• No. WhatsApp / HP: ${formData.phone || '-'}\n\n` +
    `Deskripsi Pesan:\n${formData.message || '-'}\n\n` +
    `Terima kasih.`
  );

  const mailtoUrl = `mailto:${THINKCODE_DATA.socials.email}?subject=${emailSubject}&body=${emailBody}`;

  // Construct WhatsApp fast-track link
  const whatsappMessage = encodeURIComponent(
    `Halo ThinkCode!\n\n` +
    `Saya tertarik mendiskusikan proyek:\n` +
    `• Kebutuhan: ${selectedGoal}\n` +
    `• Skala: ${selectedProjectType}\n` +
    `• Linimasa: ${selectedTimeline}\n\n` +
    `Detail Kontak:\n` +
    `• Nama: ${formData.name || '-'}\n` +
    `• Email: ${formData.email || '-'}\n` +
    `• Pesan: ${formData.message || 'Minta jadwal diskusi proyek.'}`
  );

  const whatsappUrl = `${THINKCODE_DATA.socials.whatsapp}?text=${whatsappMessage}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);

    // Automatically trigger mailto link to direct message to yogaaaap01@gmail.com
    window.location.href = mailtoUrl;
  };

  return (
    <ScrollSectionWrapper id="contact" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs font-mono font-semibold tracking-widest uppercase ${
              isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
            }`}
          >
            {t.contact.badge}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-display ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.contact.titlePre} <span className={isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}>{t.contact.titleHighlight}</span>
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

          {/* Trust Indicators */}
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
              <span>{t.contact.contractStatus}</span>
            </span>
            <span className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${
              isDark
                ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300'
                : 'bg-white border-slate-300 text-slate-600'
            }`}>
              <HiOutlineClock className="w-3.5 h-3.5" />
              <span>{t.contact.responseSpeed}</span>
            </span>
            <span className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${
              isDark
                ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300'
                : 'bg-white border-slate-300 text-slate-600'
            }`}>
              <HiOutlineChatBubbleLeftRight className="w-3.5 h-3.5" />
              <span>{t.contact.freeConsultation}</span>
            </span>
          </motion.div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-4 rounded-3xl border p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 ${
              isDark
                ? 'bg-[#031729]/40 border-[#0077b6]/30'
                : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15 hover:bg-white/55 hover:border-white/80'
            }`}
          >
            <div className="space-y-6">
              <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                {t.contact.directTitle}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                {t.contact.directDesc}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-[#0284c7]/10 border-[#0284c7]/30 text-[#38bdf8]' : 'bg-white/70 border-white/90 text-[#0284c7]'
                  }`}>
                    <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                      <HiOutlineEnvelope className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#0f4c75] uppercase block">{t.contact.emailLabel}</span>
                    <a href={`mailto:${THINKCODE_DATA.socials.email}`} className={`text-xs sm:text-sm font-bold truncate block hover:underline ${
                      isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
                    }`}>
                      {THINKCODE_DATA.socials.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-[#0284c7]/10 border-[#0284c7]/30 text-[#38bdf8]' : 'bg-white/70 border-white/90 text-[#0284c7]'
                  }`}>
                    <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                      <HiOutlineMapPin className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#0f4c75] uppercase block">{t.contact.locationLabel}</span>
                    <span className={`text-xs sm:text-sm font-bold block ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                      {THINKCODE_DATA.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={`pt-6 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-white/40'}`}>
              <span className="text-[10px] font-mono font-bold text-[#0f4c75] uppercase block mb-3">{t.contact.socialsLabel}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <motion.a
                  whileHover={{ rotate: 12, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  href={THINKCODE_DATA.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Primary (ThinKcode1717)"
                  className={`p-3 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300 hover:text-[#38bdf8] hover:border-[#0284c7]/50'
                      : 'bg-white/60 border-white/80 text-[#032b43] hover:text-[#0284c7] hover:bg-white'
                  }`}
                >
                  <GithubIcon className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ rotate: -12, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  href={THINKCODE_DATA.socials.githubSecondary}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Secondary (think-dev01)"
                  className={`p-3 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-[#031729]/60 border-[#0077b6]/30 text-slate-300 hover:text-[#38bdf8] hover:border-[#0284c7]/50'
                      : 'bg-white/60 border-white/80 text-[#032b43] hover:text-[#0284c7] hover:bg-white'
                  }`}
                >
                  <GithubIcon className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp Consultation"
                  className={`px-3 py-2.5 rounded-2xl border transition-colors flex items-center gap-2 font-mono text-xs font-bold ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:border-emerald-400'
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 hover:bg-emerald-500/20'
                  }`}
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean & Friendly Interactive Stepper Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`lg:col-span-8 rounded-3xl border p-6 sm:p-8 backdrop-blur-xl ${
              isDark
                ? 'bg-[#031729]/40 border-[#0077b6]/30'
                : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15 hover:bg-white/55 hover:border-white/80'
            }`}
          >
            {submitted ? (
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                  isDark ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700'
                }`}>
                  <HiOutlineCheckCircle className="w-8 h-8" />
                </div>
                <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                  {isEn ? 'Pesan Siap Dikirim!' : 'Pesan Siap Dikirim!'}
                </h4>
                <p className={`text-xs sm:text-sm max-w-md font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                  {isEn
                    ? `Your message details have been formatted for ${THINKCODE_DATA.socials.email}. Choose your preferred communication channel below:`
                    : `Detail pesan Anda telah disiapkan untuk dikirim ke ${THINKCODE_DATA.socials.email}. Silakan pilih saluran komunikasi di bawah:`}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <a
                    href={mailtoUrl}
                    className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold border transition-colors flex items-center gap-2 ${
                      isDark ? 'border-[#0284c7]/50 bg-[#0284c7]/20 text-[#38bdf8] hover:bg-[#0284c7]/40' : 'border-[#0284c7] bg-[#e0f2fe] text-[#0284c7] hover:bg-[#0284c7]/10'
                    }`}
                  >
                    <HiOutlineEnvelope className="w-4 h-4" />
                    <span>Kirim via Email ({THINKCODE_DATA.socials.email})</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>Chat Cepat via WhatsApp</span>
                  </a>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setStep(1); }}
                  className={`mt-4 text-xs font-mono underline opacity-80 hover:opacity-100 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Stepper Header / Step Indicators */}
                <div className="space-y-3 pb-2 border-b border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className={isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}>
                      {isEn ? `Step ${step} of 3` : `Langkah ${step} dari 3`}
                    </span>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                      {step === 1 && (isEn ? 'Project Goal' : 'Kebutuhan Proyek')}
                      {step === 2 && (isEn ? 'Scope & Timeline' : 'Skala Proyek & Linimasa')}
                      {step === 3 && (isEn ? 'Contact Info & Message' : 'Informasi Kontak & Pesan')}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-700/30 overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isDark ? 'bg-gradient-to-r from-[#0284c7] to-[#38bdf8]' : 'bg-[#0284c7]'
                      }`}
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Form Steps Carousel with Framer Motion */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: Project Goal Selection (Non-Technical) */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h4 className={`text-sm font-mono font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-[#032b43]'}`}>
                          {isEn ? 'What is your main project goal?' : 'Apa kebutuhan utama proyek Anda?'}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {projectGoals.map((item) => {
                            const isSelected = selectedGoal === item.title;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedGoal(item.title)}
                                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2 relative ${
                                  isSelected
                                    ? isDark
                                      ? 'bg-[#0284c7]/20 border-[#38bdf8] text-white shadow-md'
                                      : 'bg-[#0284c7]/10 border-[#0284c7] text-slate-900 shadow-md'
                                    : isDark
                                      ? 'bg-[#000610]/40 border-[#0077b6]/20 text-slate-300 hover:border-[#0077b6]/50'
                                      : 'bg-white/60 border-slate-200 text-slate-700 hover:border-[#0284c7]/40'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className={`p-2 rounded-xl border ${
                                    isSelected
                                      ? isDark ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8]' : 'bg-[#0284c7] text-white'
                                      : isDark ? 'bg-[#031729] border-[#0077b6]/30 text-slate-400' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {item.icon}
                                  </div>
                                  {isSelected && (
                                    <div className="w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-xs">
                                      <HiOutlineCheck className="w-3.5 h-3.5" />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h5 className="text-sm font-bold font-sans">{item.title}</h5>
                                  <p className={`text-[11px] font-mono leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {item.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Scope & Timeline (Simple Options) */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        {/* Project Type */}
                        <div className="space-y-2">
                          <h4 className={`text-sm font-mono font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-[#032b43]'}`}>
                            {isEn ? 'Select Project Scale:' : 'Pilih Skala / Kategori Proyek:'}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {projectTypes.map((pt) => {
                              const isSelected = selectedProjectType === pt;
                              return (
                                <button
                                  key={pt}
                                  type="button"
                                  onClick={() => setSelectedProjectType(pt)}
                                  className={`p-3 rounded-xl text-xs font-mono font-semibold text-center border transition-all ${
                                    isSelected
                                      ? isDark
                                        ? 'bg-[#0284c7] text-white border-[#38bdf8] shadow-sm'
                                        : 'bg-[#0284c7] text-white border-[#0284c7] shadow-sm'
                                      : isDark
                                        ? 'bg-[#000610]/50 text-slate-300 border-[#0077b6]/20 hover:border-[#38bdf8]/40'
                                        : 'bg-white/70 text-slate-700 border-slate-300 hover:border-[#0284c7]/40'
                                  }`}
                                >
                                  {pt}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Timeline Selection */}
                        <div className="space-y-2 pt-2">
                          <h4 className={`text-sm font-mono font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-[#032b43]'}`}>
                            {isEn ? 'Target Project Timeline:' : 'Perkiraan Linimasa Pelaksanaan:'}
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {availableTimelines.map((tm) => {
                              const isSelected = selectedTimeline === tm;
                              return (
                                <button
                                  key={tm}
                                  type="button"
                                  onClick={() => setSelectedTimeline(tm)}
                                  className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold text-center border transition-all ${
                                    isSelected
                                      ? isDark
                                        ? 'bg-[#0284c7] text-white border-[#38bdf8] shadow-sm'
                                        : 'bg-[#0284c7] text-white border-[#0284c7] shadow-sm'
                                      : isDark
                                        ? 'bg-[#000610]/50 text-slate-300 border-[#0077b6]/20 hover:border-[#38bdf8]/40'
                                        : 'bg-white/70 text-slate-700 border-slate-300 hover:border-[#0284c7]/40'
                                  }`}
                                >
                                  {tm}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Client Info & Message */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        {/* Input Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-xs font-mono font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-[#0f4c75]'}`}>
                              {t.contact.nameInput} *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder={t.contact.namePlaceholder}
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-colors ${
                                isDark
                                  ? 'bg-[#000610]/60 border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#38bdf8]'
                                  : 'bg-white/60 border-slate-300 text-[#032b43] placeholder-slate-400 focus:border-[#0284c7]'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-xs font-mono font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-[#0f4c75]'}`}>
                              {t.contact.emailInput} *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder={t.contact.emailPlaceholder}
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-colors ${
                                isDark
                                  ? 'bg-[#000610]/60 border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#38bdf8]'
                                  : 'bg-white/60 border-slate-300 text-[#032b43] placeholder-slate-400 focus:border-[#0284c7]'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-mono font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-[#0f4c75]'}`}>
                            {isEn ? 'WhatsApp / Phone Number (Optional)' : 'Nomor WhatsApp / HP (Opsional)'}
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+62 8..."
                            className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-colors ${
                              isDark
                                ? 'bg-[#000610]/60 border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#38bdf8]'
                                : 'bg-white/60 border-slate-300 text-[#032b43] placeholder-slate-400 focus:border-[#0284c7]'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-xs font-mono font-bold uppercase mb-1.5 ${isDark ? 'text-slate-300' : 'text-[#0f4c75]'}`}>
                            {t.contact.messageInput} *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder={t.contact.messagePlaceholder}
                            className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none resize-none transition-colors ${
                              isDark
                                ? 'bg-[#000610]/60 border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#38bdf8]'
                                : 'bg-white/60 border-slate-300 text-[#032b43] placeholder-slate-400 focus:border-[#0284c7]'
                            }`}
                          />
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Stepper Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                          isDark
                            ? 'bg-[#031729] border-[#0077b6]/30 text-slate-300 hover:text-white'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <HiOutlineArrowLeft className="w-4 h-4" />
                        <span>{isEn ? 'Back' : 'Kembali'}</span>
                      </button>
                    ) : <div />}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 ${
                          isDark
                            ? 'bg-[#0284c7] hover:bg-[#0077b6] text-white shadow-md'
                            : 'bg-[#0284c7] hover:bg-[#0284c7]/90 text-white shadow-md'
                        }`}
                      >
                        <span>{isEn ? 'Next Step' : 'Lanjut Step 2'}</span>
                        <HiOutlineArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2 justify-end">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                        <button
                          type="submit"
                          className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 ${
                            isDark
                              ? 'bg-[#0284c7] hover:bg-[#0077b6] text-white shadow-md'
                              : 'bg-[#0284c7] hover:bg-[#0284c7]/90 text-white shadow-md'
                          }`}
                        >
                          <HiOutlinePaperAirplane className="w-4 h-4" />
                          <span>{t.contact.submitBtn}</span>
                        </button>
                      </div>
                    )}
                  </div>

                </form>
              </div>
            )}
          </motion.div>

        </div>

      </div>
    </ScrollSectionWrapper>
  );
}
