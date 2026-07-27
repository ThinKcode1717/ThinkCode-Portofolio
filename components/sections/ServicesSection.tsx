'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineCloudArrowUp,
  HiOutlineWrenchScrewdriver,
  HiOutlineCommandLine,
  HiOutlineFunnel,
  HiOutlineChevronDown
} from 'react-icons/hi2';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

interface WorkflowStep {
  num: string;
  title: string;
  desc: string;
}

interface CaseStudyCapability {
  id: 'web' | 'automation' | 'ai';
  code: string;
  tabLabel: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  timeline: string;
  ideal: string;
  deliverables: string[];
  workflow: WorkflowStep[];
}

export default function ServicesSection() {
  const { t, theme, lang } = useApp();
  const isDark = theme === 'dark';
  const isEn = lang === 'en';

  const [activeTab, setActiveTab] = useState<'web' | 'automation' | 'ai'>('web');
  const [mobileTabOpen, setMobileTabOpen] = useState<boolean>(false);

  const cases: CaseStudyCapability[] = [
    {
      id: 'web',
      code: 'SYS-ENG-01',
      tabLabel: isEn ? 'Full-Stack Web Engineering' : 'Full-Stack Web Engineering',
      title: isEn ? 'Full-Stack Web Engineering' : 'Rekayasa Aplikasi Web Full-Stack',
      tagline: isEn
        ? 'High-Performance Web Applications & Resilient Software Architecture'
        : 'Aplikasi Web Performa Tinggi & Arsitektur Teruji',
      icon: <HiOutlineCodeBracket className="w-5 h-5" />,
      timeline: '2–4 weeks',
      ideal: isEn
        ? 'Businesses, institutions, or SMBs needing custom web software'
        : 'Bisnis, institusi, atau UMKM yang membutuhkan software web custom',
      deliverables: isEn
        ? [
            'Custom React / Vue / Laravel / Node.js web app',
            'Design system & responsive glassmorphism UI',
            'Multi-role auth (JWT / HTTP-Only Cookies)',
            'Relational DB schema (PostgreSQL / MySQL)',
            'Cloud deployment (Linux VPS / Vercel / Nginx)',
            'Post-launch support & system guidelines'
          ]
        : [
            'Aplikasi web custom React / Vue / Laravel / Node.js',
            'Design system & antarmuka responsif mobile-first',
            'Autentikasi multi-role (JWT / HTTP-Only Cookie)',
            'Perancangan skema DB PostgreSQL / MySQL',
            'Deployment cloud produksi (Linux VPS / Vercel)',
            'Dukungan pasca-launch & pemeliharaan sistem'
          ],
      workflow: [
        {
          num: '01',
          title: 'Requirements & DB Schema',
          desc: isEn
            ? 'Business module analysis, relational PostgreSQL/MySQL schema design, and wireframing.'
            : 'Analisis modul bisnis, perancangan skema relasional PostgreSQL/MySQL, & wireframe antarmuka.'
        },
        {
          num: '02',
          title: 'Frontend & REST API',
          desc: isEn
            ? 'Modular React/Vue component engineering with Tailwind CSS & RESTful API integration.'
            : 'Penulisan komponen modular React/Vue dengan Tailwind CSS & integrasi RESTful API Express/Laravel.'
        },
        {
          num: '03',
          title: 'Auth & Security Audit',
          desc: isEn
            ? 'Multi-role JWT auth testing, HTTP-Only cookie protection, and request load testing.'
            : 'Pengujian autentikasi JWT multi-role, proteksi HTTP-Only cookie, & pengujian beban request.'
        },
        {
          num: '04',
          title: 'VPS & Cloud Deployment',
          desc: isEn
            ? 'Production deployment to Linux VPS / Vercel with Nginx reverse proxy & SSL HTTPS.'
            : 'Production deployment ke Linux VPS / Vercel dengan Nginx reverse proxy & SSL HTTPS.'
        }
      ]
    },
    {
      id: 'automation',
      code: 'SYS-AUT-02',
      tabLabel: isEn ? 'Data Automation & Scraping' : 'Otomasi Data & Web Scraping',
      title: isEn ? 'Data Automation & Recursive Web Scraping' : 'Otomasi Data & Web Scraping Rekursif',
      tagline: isEn
        ? 'Automated Data Extraction & AI Processing Pipelines'
        : 'Ekstraksi Data Otomatis & Pipeline Pemrosesan AI',
      icon: <HiOutlineCpuChip className="w-5 h-5" />,
      timeline: '1–3 weeks',
      ideal: isEn
        ? 'Companies requiring B2B lead research, document digitization, or market intelligence'
        : 'Perusahaan yang membutuhkan riset prospek bisnis, digitalisasi dokumen, & data pasar',
      deliverables: isEn
        ? [
            'Recursive crawlers & Puppeteer/Cheerio scrapers',
            'Rate limiting & anti-bot protection handling',
            'Map visualization (Leaflet) & data analytics',
            'Groq Llama 3.3 AI integration for outreach',
            'Docker containerization & automated cron schedulers',
            'Operational guide & API documentation'
          ]
        : [
            'Web crawler & scraper rekursif (Puppeteer / Cheerio)',
            'Penanganan rate limiting & proteksi anti-bot',
            'Visualisasi peta sebaran (Leaflet) & analitik data',
            'Integrasi AI Groq Llama 3.3 untuk draf pesan otomatis',
            'Containerization Docker & penjadwalan cron otomatis',
            'Dokumentasi teknis & panduan operasional crawler'
          ],
      workflow: [
        {
          num: '01',
          title: 'Target Analysis & Rate Limit',
          desc: isEn
            ? 'DOM structure analysis of target sites, IP/header rotation strategy, and rate-limiting.'
            : 'Analisis struktur DOM situs target, strategi rotasi IP/headers, & penentuan batas rate-limiting.'
        },
        {
          num: '02',
          title: 'Crawler Engine & Parsing',
          desc: isEn
            ? 'Building recursive scrapers (Puppeteer/Cheerio) to extract structured data into DB.'
            : 'Membangun scraper rekursif (Puppeteer/Cheerio) untuk ekstraksi data terstruktur ke database.'
        },
        {
          num: '03',
          title: 'Groq AI & Map Analytics',
          desc: isEn
            ? 'Groq Llama 3.3 AI integration for outreach drafting & distribution mapping via Leaflet.'
            : 'Integrasi Groq AI Llama 3.3 untuk draf pesan outreach & pemetaan sebaran lokasi via Leaflet.'
        },
        {
          num: '04',
          title: 'Docker Cron & Schedulers',
          desc: isEn
            ? 'Docker Compose containerization & automated cron schedulers for periodic updates.'
            : 'Containerization Docker Compose & pembuatan penjadwal cron otomatis untuk update data berkala.'
        }
      ]
    },
    {
      id: 'ai',
      code: 'SYS-AI-03',
      tabLabel: isEn ? 'AI & Stock Forecasting' : 'AI & Stock Forecasting Microservices',
      title: isEn ? 'AI Microservices & Machine Learning Stock Forecasting' : 'AI Microservices & Prediksi Stok Machine Learning',
      tagline: isEn
        ? 'Tailored Machine Learning Models Integrated with Business Systems'
        : 'Model ML/DL Kustom Terintegrasi Sistem Bisnis',
      icon: <HiOutlineSparkles className="w-5 h-5" />,
      timeline: '3–6 weeks',
      ideal: isEn
        ? 'Businesses with time-series inventory data or diagnostic classification needs'
        : 'Perusahaan dengan data histori persediaan stok, forecasting, atau klasifikasi medis',
      deliverables: isEn
        ? [
            'Custom ML model engineering (ARIMA-LSTM / DNN)',
            'Python REST API microservice (FastAPI / Flask)',
            'Integration with web systems (Vue / React / Laravel)',
            'Docker containerization for cloud deployment',
            'Evaluation metrics validation (MAE, RMSE, R²)',
            'Model maintenance & retraining guidelines'
          ]
        : [
            'Pengembangan model ML kustom (ARIMA-LSTM / DNN)',
            'Microservice REST API Python (FastAPI / Flask)',
            'Integrasi dengan sistem web utama (Vue / React / Laravel)',
            'Containerization Docker untuk kelancaran deployment cloud',
            'Validasi metrik akurasi model (MAE, RMSE, R²)',
            'Panduan retraining & pemeliharaan model berkala'
          ],
      workflow: [
        {
          num: '01',
          title: 'Data Preprocessing & EDA',
          desc: isEn
            ? 'Time-series historical data cleaning, missing value handling, and train/test dataset splitting.'
            : 'Pembersihan data histori time-series, penanganan missing values, & pemisahan train/test dataset.'
        },
        {
          num: '02',
          title: 'Model Training & Hybrid ML',
          desc: isEn
            ? 'Hybrid ARIMA-LSTM / Deep Neural Network model training & hyperparameter tuning.'
            : 'Pelatihan model hybrid ARIMA-LSTM / Deep Neural Network & tuning hyperparameter.'
        },
        {
          num: '03',
          title: 'Python REST API Microservice',
          desc: isEn
            ? 'Wrapping ML models into FastAPI/Flask REST APIs and connecting with core web systems.'
            : 'Pembungkusan model ke dalam REST API FastAPI/Flask & integrasi dengan sistem web utama.'
        },
        {
          num: '04',
          title: 'Validation & Retraining',
          desc: isEn
            ? 'Evaluation accuracy metrics validation (MAE, RMSE, R²) and periodic model retraining guide.'
            : 'Validasi metrik akurasi (MAE, RMSE, R²) & penyusunan panduan retraining model berkala.'
        }
      ]
    }
  ];

  const activeCase = cases.find((c) => c.id === activeTab) || cases[0];

  const stepIcons = [
    <HiOutlineWrenchScrewdriver key="1" className="w-4 h-4" />,
    <HiOutlineCodeBracket key="2" className="w-4 h-4" />,
    <HiOutlineShieldCheck key="3" className="w-4 h-4" />,
    <HiOutlineCloudArrowUp key="4" className="w-4 h-4" />
  ];

  return (
    <ScrollSectionWrapper id="services" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
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
            {t.services.badge}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-[#032b43]'
            }`}
          >
            {t.services.titlePre}{' '}
            <span className={isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}>
              {t.services.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto font-medium ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* ── 1. Glass Segmented Control Tab Selector (Mobile Dropdown vs Desktop Bar) ── */}
        
        {/* Mobile Category Dropdown Selector (Zero clipping on mobile) */}
        <div className="sm:hidden relative w-full mb-6 z-30">
          <button
            type="button"
            onClick={() => setMobileTabOpen(!mobileTabOpen)}
            className={`w-full px-4 py-3 rounded-2xl border backdrop-blur-2xl text-xs font-mono font-bold flex items-center justify-between transition-all ${
              isDark
                ? 'bg-[#010d1a]/95 border-[#0077b6]/40 text-white shadow-xl'
                : 'bg-white/95 border-slate-300 text-slate-900 shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              <HiOutlineFunnel className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-[#38bdf8] font-semibold">Kapabilitas:</span>
              <span className="truncate max-w-[170px]">{activeCase.tabLabel}</span>
            </div>
            <HiOutlineChevronDown className={`w-4 h-4 text-[#38bdf8] transition-transform duration-300 ${
              mobileTabOpen ? 'rotate-180' : ''
            }`} />
          </button>

          <AnimatePresence>
            {mobileTabOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border backdrop-blur-2xl shadow-2xl space-y-1 z-50 ${
                  isDark
                    ? 'bg-[#010d1a]/95 border-[#0077b6]/50 text-white'
                    : 'bg-white/95 border-slate-300 text-slate-900'
                }`}
              >
                {cases.map((c) => {
                  const isActive = activeTab === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(c.id);
                        setMobileTabOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-between ${
                        isActive
                          ? isDark
                            ? 'bg-[#0284c7] text-white'
                            : 'bg-[#0284c7] text-white'
                          : isDark
                            ? 'text-slate-300 hover:bg-[#031729]'
                            : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {c.icon}
                        <span>{c.tabLabel}</span>
                      </div>
                      {isActive && <HiOutlineCheckCircle className="w-4 h-4" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Segmented Control Bar */}
        <div className="hidden sm:flex justify-center mb-8">
          <div className={`p-1.5 rounded-2xl border backdrop-blur-2xl flex items-center gap-1.5 max-w-full overflow-x-auto no-scrollbar ${
            isDark
              ? 'bg-[#010d1a]/80 border-[#0077b6]/30 shadow-xl'
              : 'bg-white/70 border-slate-200 shadow-md'
          }`}>
            {cases.map((c) => {
              const isActive = activeTab === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveTab(c.id)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 outline-none z-10 ${
                    isActive
                      ? 'text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className={`absolute inset-0 rounded-xl shadow-md ${
                        isDark ? 'bg-gradient-to-r from-[#0284c7] to-[#0077b6]' : 'bg-[#0284c7]'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <motion.span
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    {c.icon}
                  </motion.span>
                  <span className="relative z-10">{c.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 2. Dynamic Deep Ocean Glass Architecture HUD Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl relative overflow-hidden ${
              isDark
                ? 'bg-[#031729]/40 border-[#0077b6]/30 shadow-2xl'
                : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15'
            }`}
          >
            {/* Top HUD Console Status Bar */}
            <div className="flex items-center justify-between border-b pb-4 mb-6 border-white/10 flex-wrap gap-2 font-mono">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className={`font-bold tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  READY FOR ENGINEERING DEPLOYMENT
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className={`px-2.5 py-0.5 rounded border text-[11px] font-bold ${
                  isDark ? 'bg-[#031729] border-[#0077b6]/30 text-[#38bdf8]' : 'bg-white border-slate-300 text-[#0284c7]'
                }`}>
                  {activeCase.code}
                </span>
                <span className={`flex items-center gap-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <HiOutlineClock className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{activeCase.timeline}</span>
                </span>
              </div>
            </div>

            {/* Split Architecture Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Capability Specs & Technical Deliverables */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl border ${
                      isDark ? 'bg-[#0284c7]/15 border-[#0284c7]/30 text-[#38bdf8]' : 'bg-white/80 border-white/90 text-[#0284c7]'
                    }`}>
                      {activeCase.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                        {activeCase.title}
                      </h3>
                      <p className={`text-xs font-bold ${isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}`}>
                        {activeCase.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Target Use Case */}
                <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  isDark
                    ? 'bg-[#000610]/40 border-[#0077b6]/20 text-slate-300'
                    : 'bg-white/70 border-slate-200 text-[#0c3559]'
                }`}>
                  <HiOutlineUsers className="w-5 h-5 shrink-0 text-[#38bdf8] mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-0.5">Target Use Case</span>
                    <p className="text-xs font-medium leading-relaxed">{activeCase.ideal}</p>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400">
                    {isEn ? 'Technical Output & Architecture Deliverables:' : 'Output & Deliverables Teknik:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeCase.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs font-medium leading-relaxed ${
                          isDark
                            ? 'bg-[#000610]/30 border-[#0077b6]/15 text-slate-200'
                            : 'bg-white/70 border-slate-200 text-[#082846]'
                        }`}
                      >
                        <HiOutlineCheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
                        }`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <a
                    href="#contact"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-mono font-bold text-xs tracking-wide transition-all duration-300 border active:scale-95 ${
                      isDark
                        ? 'bg-[#0284c7] text-white border-[#38bdf8] hover:bg-[#0077b6] shadow-md shadow-[#0284c7]/30'
                        : 'bg-[#0284c7] text-white border-[#0284c7] hover:bg-[#0077b6] shadow-md shadow-[#0284c7]/20'
                    }`}
                  >
                    <span>{t.services.cta}</span>
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Tailored Connected Pipeline Workflow */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-white/10">
                  <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
                  }`}>
                    {(t.services as { workflowTitle?: string }).workflowTitle}
                  </h4>
                  <HiOutlineCommandLine className="w-4 h-4 text-slate-400" />
                </div>

                <div className="space-y-3 relative">
                  {activeCase.workflow.map((wf, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 rounded-2xl border flex items-start gap-4 transition-all duration-300 relative ${
                        isDark
                          ? 'bg-[#000610]/40 border-[#0077b6]/20 hover:border-[#38bdf8]/40 hover:bg-[#031729]/60'
                          : 'bg-white/60 border-slate-200 hover:border-[#0284c7]/40 hover:bg-white'
                      }`}
                    >
                      {/* Step Number Badge */}
                      <div className={`w-9 h-9 rounded-xl border shrink-0 flex items-center justify-center font-mono text-xs font-bold ${
                        isDark
                          ? 'bg-[#0284c7]/15 border-[#0284c7]/40 text-[#38bdf8]'
                          : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                      }`}>
                        {wf.num}
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs sm:text-sm font-bold truncate ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                            {wf.title}
                          </h5>
                          <div className={isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}>
                            {stepIcons[idx % stepIcons.length]}
                          </div>
                        </div>
                        <p className={`text-[11px] leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {wf.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </ScrollSectionWrapper>
  );
}
