'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Database, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  ExternalLink,
  Bot,
  X,
  ChevronDown
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { useApp } from '@/context/AppContext';
import { THINKCODE_DATA } from '@/lib/data';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

// Extended Tech Stack logos based on real GitHub repos
const TECH_LOGOS = [
  {
    name: 'React 19',
    category: 'frontend',
    color: '#61DAFB',
    icon: Code2,
    projectRef: 'Black Ant Academy · HolidayBro · SIPIA',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278z"/></svg>`,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    icon: Code2,
    projectRef: 'Google Maps Scraper · SIPIA · SAKIP Crawler',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.12 1.21-.36 1.658a3.032 3.032 0 0 1-.991 1.01 4.weak 4.weak 0 0 1-1.485.528 8.68 8.68 0 0 1-1.811.176 9.1 9.1 0 0 1-1.91-.203 6.995 6.995 0 0 1-1.559-.538v-2.587a5.49 5.49 0 0 0 .825.498c.306.151.617.277.936.376a7.14 7.14 0 0 0 1.898.272c.291 0 .558-.023.8-.07a1.96 1.96 0 0 0 .599-.213c.163-.096.289-.213.38-.35a.9.9 0 0 0 .136-.5.897.897 0 0 0-.19-.58 2.252 2.252 0 0 0-.523-.457 6.63 6.63 0 0 0-.79-.41c-.298-.137-.626-.28-.984-.43a9.47 9.47 0 0 1-1.175-.597 4.278 4.278 0 0 1-.905-.74 3.115 3.115 0 0 1-.59-.947 3.483 3.483 0 0 1-.21-1.24c0-.617.116-1.155.35-1.614a3.303 3.303 0 0 1 .964-1.09 4.236 4.236 0 0 1 1.456-.617A7.377 7.377 0 0 1 18.488 9.75zm-6.75 0v2.333H9.126v7.917H6.458V12.083H4V9.75z"/></svg>`,
  },
  {
    name: 'Python (AI/ML)',
    category: 'backend',
    color: '#3776AB',
    icon: Cpu,
    projectRef: 'ARIMA-LSTM Stock Forecasting & Medical DNN',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.913 0c-5.23 0-4.887 2.274-4.887 2.274l.006 2.353h4.945v.7H5.097S.8 4.792.8 10.052c0 5.26 3.737 5.068 3.737 5.068h2.232v-3.143s-.121-3.737 3.676-3.737h6.312s3.535.06 3.535-3.414V2.274S20.67 0 11.913 0zM8.98 1.488a.952.952 0 1 1 0 1.905.952.952 0 0 1 0-1.905zm3.107 22.512c5.23 0 4.887-2.274 4.887-2.274l-.006-2.353h-4.945v-.7h6.88s4.297.535 4.297-4.725c0-5.26-3.737-5.068-3.737-5.068h-2.232v3.143s.121 3.737-3.676 3.737H7.243s-3.535-.06-3.535 3.414v2.576s-.379 2.274 8.379 2.274zm2.933-1.488a.952.952 0 1 1 0-1.905.952.952 0 0 1 0 1.905z"/></svg>`,
  },
  {
    name: 'Node.js & Express',
    category: 'backend',
    color: '#339933',
    icon: Server,
    projectRef: 'SIPIA Backend · SAKIP Document Crawler',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm-1.5 17.5v-7l-6 3.5 6 3.5zm7.5-4.5l-6 3.5v-7l6-3.5v7z"/></svg>`,
  },
  {
    name: 'Laravel & PHP',
    category: 'backend',
    color: '#FF2D20',
    icon: Server,
    projectRef: 'SI KuroWesi Inventory · SIPINTER Digital Library',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm-1.5 17.5v-7l-6 3.5 6 3.5zm7.5-4.5l-6 3.5v-7l6-3.5v7z"/></svg>`,
  },
  {
    name: 'Docker',
    category: 'devops',
    color: '#2496ED',
    icon: Server,
    projectRef: 'AI KuroWesi API & Multi-Container Deployments',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185"/></svg>`,
  }
];

interface Bubble {
  id: number;
  x: number;
  size: number;
  speed: number;
  delay: number;
  wobble: number;
  side: 'left' | 'right';
  tech: typeof TECH_LOGOS[number];
}

interface SkillDetail {
  name: string;
  level: number;
  highlight?: string;
  category: string;
}

function generateBubbles(): Bubble[] {
  const bubbles: Bubble[] = [];
  const techs = [...TECH_LOGOS];
  for (let i = techs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [techs[i], techs[j]] = [techs[j], techs[i]];
  }

  techs.forEach((tech, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const baseX = side === 'left'
      ? 2 + Math.random() * 14
      : 84 + Math.random() * 14;

    bubbles.push({
      id: i,
      x: baseX,
      size: 44 + Math.random() * 24,
      speed: 16 + Math.random() * 18,
      delay: Math.random() * -20,
      wobble: 8 + Math.random() * 14,
      side,
      tech,
    });
  });
  return bubbles;
}

export default function TechStackSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [hoveredBubbleId, setHoveredBubbleId] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [githubDropdownOpen, setGithubDropdownOpen] = useState(false);
  
  // Accordion state: Option A (Row 1 / Frontend open by default)
  const [openCategories, setOpenCategories] = useState<string[]>([
    'Frontend Core & UI Frameworks'
  ]);

  const sectionRef = useRef<HTMLElement>(null);
  const [sectionHeight, setSectionHeight] = useState(700);

  useEffect(() => {
    setBubbles(generateBubbles());

    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSectionHeight(el.offsetHeight));
    ro.observe(el);
    setSectionHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  const skillGroups = THINKCODE_DATA.skills;

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName]
    );
  };

  return (
    <ScrollSectionWrapper
      id="skills"
      className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── 1. Floating Water Bubble Ambient Layer ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute bottom-0 flex items-center justify-center rounded-full cursor-pointer pointer-events-auto shadow-lg"
            style={{
              left: `${b.x}%`,
              width: b.size,
              height: b.size,
              background: isDark
                ? `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15), rgba(255,255,255,0.03) 60%, rgba(0,180,216,0.1))`
                : `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(255,255,255,0.2) 60%, rgba(14,165,233,0.12))`,
              border: isDark
                ? '1px solid rgba(0,229,255,0.35)'
                : '1px solid rgba(14,165,233,0.35)',
              backdropFilter: 'blur(6px)',
            }}
            animate={{
              y: [0, -950],
              opacity: [0, 0.95, 0.95, 0.4, 0],
              x: [
                0,
                b.wobble,
                0,
                -b.wobble,
                0,
                b.wobble,
                0,
                -b.wobble,
                0,
              ],
            }}
            transition={{
              y: {
                duration: b.speed,
                repeat: Infinity,
                times: [0, 0.12, 0.8, 0.92, 1],
                ease: 'easeInOut',
                delay: b.delay,
              },
              x: {
                duration: b.speed * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: b.delay,
              },
            }}
            whileHover={{ scale: 1.3 }}
            onHoverStart={() => setHoveredBubbleId(b.id)}
            onHoverEnd={() => setHoveredBubbleId(null)}
          >
            <motion.span
              className="select-none"
              style={{ color: b.tech.color, width: b.size * 0.45, height: b.size * 0.45 }}
              animate={hoveredBubbleId === b.id ? { rotate: 15 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              dangerouslySetInnerHTML={{ __html: b.tech.svg }}
            />

            {hoveredBubbleId === b.id && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap pointer-events-none shadow-xl border"
                style={{
                  background: isDark ? 'rgba(1,13,31,0.95)' : 'rgba(255,255,255,0.98)',
                  color: b.tech.color,
                  borderColor: `${b.tech.color}60`,
                }}
              >
                <span>{b.tech.name}</span>
                <span className="block text-[9px] font-normal text-slate-400">{b.tech.projectRef}</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── 2. Main Section Header ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs font-mono font-semibold tracking-widest uppercase ${
              isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
            }`}
          >
            {t.skills.badge}
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
            {t.skills.titlePre}{' '}
            <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>{t.skills.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.skills.subtitle} (Klik baris untuk expand/collapse keahlian)
          </motion.p>
        </div>

        {/* ── 3. Ultra-Smooth Accordion / Collapse Stack Rows ── */}
        <div className="space-y-4">
          {skillGroups.map((catGroup, groupIdx) => {
            const isOpen = openCategories.includes(catGroup.category);

            return (
              <motion.div
                key={catGroup.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
                className={`rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300 ${
                  isDark
                    ? 'bg-[#031729]/50 border-[#0077b6]/30 hover:border-[#00e5ff]/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                    : 'bg-white/90 border-slate-200 hover:border-[#0284c7]/40 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                }`}
              >
                {/* Accordion Row Header Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleCategory(catGroup.category)}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between transition-colors outline-none text-left ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border transition-transform duration-300 ${
                      isDark
                        ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]'
                        : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                    }`}>
                      {groupIdx === 0 && <Code2 className="w-5 h-5" />}
                      {groupIdx === 1 && <Server className="w-5 h-5" />}
                      {groupIdx === 2 && <Database className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {catGroup.category}
                      </h3>
                      <p className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {catGroup.skills.length} Stack Terverifikasi &bull; {isOpen ? 'Klik untuk ciutkan' : 'Klik untuk buka'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border font-semibold hidden sm:inline-block ${
                      isDark
                        ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]'
                        : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                    }`}>
                      {catGroup.skills.length} Stack
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className={`p-1.5 rounded-lg border ${
                        isDark ? 'border-slate-700 text-[#00e5ff]' : 'border-slate-300 text-[#0284c7]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </button>

                {/* Accordion Expand/Collapse Content Container */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                        opacity: { duration: 0.35, ease: 'easeInOut' }
                      }}
                      className="overflow-hidden"
                    >
                      <div className={`px-4 sm:px-6 pb-5 pt-3 border-t ${
                        isDark ? 'border-slate-800' : 'border-slate-200'
                      }`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {catGroup.skills.map((skill) => (
                            <motion.div
                              key={skill.name}
                              whileHover={{ scale: 1.02, x: 2 }}
                              onClick={() => setSelectedSkill({ ...skill, category: catGroup.category })}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 space-y-1.5 ${
                                isDark
                                  ? 'bg-[#000610]/40 border-slate-800 hover:border-[#00e5ff]/50 hover:bg-[#031729]/60'
                                  : 'bg-white border-slate-200 hover:border-[#0284c7]/50 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between font-mono">
                                <span className={`font-semibold text-xs flex items-center gap-1.5 ${
                                  isDark ? 'text-slate-100' : 'text-slate-900'
                                }`}>
                                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}`} />
                                  <span className="truncate">{skill.name}</span>
                                </span>
                              </div>

                              {skill.highlight && (
                                <p className={`text-[11px] font-mono leading-relaxed ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  • {skill.highlight}
                                </p>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Tech Verification Banner with Repos Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-6 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl ${
            isDark
              ? 'bg-[#010d1f]/80 border-[#0077b6]/30 text-slate-200'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-3 text-left">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              isDark ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'bg-[#e0f2fe] text-[#0284c7]'
            }`}>
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono text-xs sm:text-sm font-bold">
                Terverifikasi Langsung dari Repository Kode Real
              </h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Seluruh keahlian di atas diimplementasikan pada akun <span className="font-mono text-[#00e5ff]">ThinKcode1717</span> &amp; <span className="font-mono text-[#00e5ff]">think-dev01</span>.
              </p>
            </div>
          </div>

          {/* Dual GitHub Account Dropdown Button */}
          <div className="relative shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setGithubDropdownOpen(!githubDropdownOpen)}
              className={`w-full sm:w-auto px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center justify-between sm:justify-start gap-2 transition-all border ${
                isDark
                  ? 'bg-[#031729] text-[#00e5ff] border-[#00e5ff]/40 hover:border-[#00e5ff] hover:bg-[#00e5ff]/10'
                  : 'bg-white text-[#0284c7] border-[#0284c7]/40 hover:border-[#0284c7] hover:bg-[#e0f2fe]'
              }`}
            >
              <div className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repos</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${githubDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {githubDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 bottom-full sm:bottom-auto sm:top-full mb-2 sm:mb-0 sm:mt-2 w-full sm:w-60 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl z-30 ${
                    isDark
                      ? 'bg-[#010d1a] border-[#00e5ff]/40 text-white shadow-[#00e5ff]/10'
                      : 'bg-white border-slate-300 text-slate-900 shadow-xl'
                  }`}
                >
                  <a
                    href="https://github.com/ThinKcode1717?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setGithubDropdownOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      isDark ? 'hover:bg-[#00e5ff]/10 text-slate-200 hover:text-[#00e5ff]' : 'hover:bg-slate-100 text-slate-800 hover:text-[#0284c7]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-[#00e5ff]" />
                      <div>
                        <span className="block font-bold">ThinKcode1717</span>
                        <span className="text-[10px] text-slate-400 font-normal">Primary Repository</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://github.com/think-dev01?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setGithubDropdownOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-mono font-semibold transition-colors mt-1 ${
                      isDark ? 'hover:bg-[#00e5ff]/10 text-slate-200 hover:text-[#00e5ff]' : 'hover:bg-slate-100 text-slate-800 hover:text-[#0284c7]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-[#00b4d8]" />
                      <div>
                        <span className="block font-bold">think-dev01</span>
                        <span className="text-[10px] text-slate-400 font-normal">Secondary Repository</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* ── 4. Skill Case Study Detail Modal ── */}
      <AnimatePresence>
        {selectedSkill && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 rounded-3xl border shadow-2xl backdrop-blur-2xl ${
                isDark
                  ? 'bg-[#010d1f] border-[#00e5ff]/40 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-slate-700/30">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl border ${
                    isDark ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                  }`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{selectedSkill.name}</h3>
                    <p className="text-[10px] font-mono text-slate-400">{selectedSkill.category}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className={`p-1.5 rounded-xl border transition-colors ${
                    isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-left">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Implementasi Real Proyek</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {selectedSkill.highlight || 'Diimplementasikan secara aktif dalam proyek arsitektur full-stack berskala produksi.'}
                  </p>
                </div>

                <div className={`p-3 rounded-xl border font-mono text-xs space-y-1.5 ${
                  isDark ? 'bg-[#000610] border-[#0077b6]/30 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#00e5ff]">Proven Case Study</span>
                    <span className="text-slate-400">GitHub Verified</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Penggunaan {selectedSkill.name} diuji untuk efisiensi tinggi, pengolahan data, dan performa respon optimal.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                <a
                  href="https://github.com/ThinKcode1717?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all border ${
                    isDark
                      ? 'bg-[#00e5ff] text-[#000610] border-[#00e5ff] hover:bg-[#00b4d8]'
                      : 'bg-[#0284c7] text-white border-[#0284c7] hover:bg-[#0f766e]'
                  }`}
                >
                  <span>Primary Repo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSkill(null);
                    window.dispatchEvent(new CustomEvent('open-ai-drawer'));
                  }}
                  className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all border ${
                    isDark
                      ? 'bg-[#031729] text-slate-200 border-slate-700 hover:border-[#00e5ff]/50'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:border-[#0284c7]/50'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Tanya AI</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ScrollSectionWrapper>
  );
}
