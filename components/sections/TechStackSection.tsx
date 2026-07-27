'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCodeBracket,
  HiOutlineServer,
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineCheckCircle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineXMark,
  HiOutlineChevronDown,
  HiOutlineSparkles
} from 'react-icons/hi2';
import { FiDatabase } from 'react-icons/fi';
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiLaravel,
  SiDocker,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiFastapi,
  SiVuedotjs,
  SiNginx,
  SiPuppeteer
} from 'react-icons/si';
import { GithubIcon } from '../ui/Icons';
import { useApp } from '@/context/AppContext';
import { THINKCODE_DATA, SkillItem } from '@/lib/data';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

const SKILL_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  React: { icon: SiReact, color: '#61DAFB' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  Vue: { icon: SiVuedotjs, color: '#4FC08D' },
  Tailwind: { icon: SiTailwindcss, color: '#06B6D4' },
  Node: { icon: SiNodedotjs, color: '#5FA04E' },
  Python: { icon: SiPython, color: '#3776AB' },
  Laravel: { icon: SiLaravel, color: '#FF2D20' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  Puppeteer: { icon: SiPuppeteer, color: '#40B5A4' },
  Groq: { icon: HiOutlineSparkles, color: '#38bdf8' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Nginx: { icon: SiNginx, color: '#009639' },
};

// Rich Tech Stack logos for floating water bubbles using authentic brand React Icons
const TECH_LOGOS = [
  {
    name: 'React 19',
    color: '#61DAFB',
    projectRef: 'Black Ant Academy · HolidayBro · SIPIA',
    icon: SiReact,
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    projectRef: 'Google Maps Scraper · SIPIA · SAKIP Crawler',
    icon: SiTypescript,
  },
  {
    name: 'Python (AI/ML)',
    color: '#3776AB',
    projectRef: 'ARIMA-LSTM Stock Forecasting & Medical DNN',
    icon: SiPython,
  },
  {
    name: 'Node.js Backend',
    color: '#5FA04E',
    projectRef: 'SIPIA Backend · SAKIP Document Crawler',
    icon: SiNodedotjs,
  },
  {
    name: 'Laravel & PHP',
    color: '#FF2D20',
    projectRef: 'SI KuroWesi Inventory · SIPINTER Digital Library',
    icon: SiLaravel,
  },
  {
    name: 'Docker Container',
    color: '#2496ED',
    projectRef: 'AI KuroWesi API & Multi-Container Deployments',
    icon: SiDocker,
  },
  {
    name: 'PostgreSQL DB',
    color: '#4169E1',
    projectRef: 'SI KuroWesi & Neon Serverless DB',
    icon: SiPostgresql,
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    projectRef: 'ThinkCode Portfolio · HolidayBro · SIPIA',
    icon: SiTailwindcss,
  },
  {
    name: 'Next.js 15',
    color: '#00E5FF',
    projectRef: 'ThinkCode Portfolio & Modern Web Apps',
    icon: SiNextdotjs,
  },
  {
    name: 'FastAPI Backend',
    color: '#009688',
    projectRef: 'AI KuroWesi High Performance Microservices',
    icon: SiFastapi,
  },
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

interface SkillDetail extends SkillItem {
  category: string;
}

function generateBubbles(): Bubble[] {
  const bubbles: Bubble[] = [];
  const techs = [...TECH_LOGOS];
  for (let i = techs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [techs[i], techs[j]] = [techs[j], techs[i]];
  }

  // Generate bubbles strictly placed on Left and Right section flanks
  techs.forEach((tech, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const baseX = side === 'left'
      ? 1 + Math.random() * 10  // Left side flank (1% to 11%)
      : 88 + Math.random() * 10; // Right side flank (88% to 98%)

    bubbles.push({
      id: i,
      x: baseX,
      size: 54 + Math.random() * 22,
      speed: 14 + Math.random() * 16,
      delay: Math.random() * -18,
      wobble: 10 + Math.random() * 16,
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
      {/* ── 1. Floating Water Tech Bubble Layer (Left & Right Flanks with Top Fade-Out) ── */}
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute bottom-0 flex items-center justify-center rounded-full cursor-pointer pointer-events-auto shadow-xl"
            style={{
              left: `${b.x}%`,
              width: b.size,
              height: b.size,
              background: isDark
                ? `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.22), rgba(0,229,255,0.12) 50%, rgba(0,119,182,0.2) 85%)`
                : `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(224,242,254,0.4) 60%, rgba(2,132,199,0.18))`,
              border: isDark
                ? '1.5px solid rgba(0,229,255,0.45)'
                : '1.5px solid rgba(2,132,199,0.45)',
              boxShadow: isDark
                ? '0 6px 20px rgba(0,229,255,0.2), inset 0 0 15px rgba(0,229,255,0.25)'
                : '0 6px 20px rgba(2,132,199,0.15), inset 0 0 15px rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
            }}
            animate={{
              y: [0, -(sectionHeight + b.size + 40)],
              opacity: [0, 0.4, 1, 1, 0.4, 0], // Smooth fade-in at bottom and clean fade-out at top end
              x: [
                0,
                b.wobble,
                0,
                -b.wobble,
                0,
                b.wobble,
                0,
              ],
            }}
            transition={{
              y: {
                duration: b.speed,
                repeat: Infinity,
                times: [0, 0.12, 0.3, 0.75, 0.9, 1],
                ease: 'easeInOut',
                delay: b.delay,
              },
              opacity: {
                duration: b.speed,
                repeat: Infinity,
                times: [0, 0.1, 0.25, 0.78, 0.92, 1],
                ease: 'easeInOut',
                delay: b.delay,
              },
              x: {
                duration: b.speed * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: b.delay,
              },
            }}
            whileHover={{ scale: 1.35 }}
            onHoverStart={() => setHoveredBubbleId(b.id)}
            onHoverEnd={() => setHoveredBubbleId(null)}
          >
            {/* Bubble Specular Glass Glint Overlay (Positioned on Right Side with High Transparency) */}
            <div className="absolute top-1.5 right-2.5 w-1/3 h-1/4 rounded-full opacity-25 bg-gradient-to-bl from-white to-transparent pointer-events-none z-0" />

            {/* Tech Logo Icon inside Bubble */}
            <motion.div
              className="select-none z-10 flex items-center justify-center p-1"
              style={{ color: b.tech.color, width: b.size * 0.58, height: b.size * 0.58 }}
              animate={hoveredBubbleId === b.id ? { rotate: 20, scale: 1.15 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <b.tech.icon className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />
            </motion.div>

            {/* Hover Tooltip Pill */}
            {hoveredBubbleId === b.id && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap pointer-events-none shadow-xl border z-50"
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
            className={`text-xs font-mono font-semibold tracking-widest uppercase ${isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
              }`}
          >
            {t.skills.badge}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'
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
                className={`rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300 ${isDark
                    ? 'bg-[#031729]/50 border-[#0077b6]/30 hover:border-[#0284c7]/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                    : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15 hover:bg-white/55 hover:border-white/80'
                  }`}
              >
                {/* Accordion Row Header Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleCategory(catGroup.category)}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between transition-colors outline-none text-left ${isDark ? 'hover:bg-white/5' : 'hover:bg-white/30'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border transition-transform duration-300 ${isDark
                        ? 'bg-[#0284c7]/10 border-[#0284c7]/30 text-[#38bdf8]'
                        : 'bg-white/70 border-white/80 text-[#0284c7]'
                      }`}>
                      {groupIdx === 0 && <HiOutlineCodeBracket className="w-5 h-5" />}
                      {groupIdx === 1 && <HiOutlineServer className="w-5 h-5" />}
                      {groupIdx === 2 && <FiDatabase className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold font-sans ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                        {catGroup.category}
                      </h3>
                      <p className={`text-[11px] font-mono font-medium ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                        {catGroup.skills.length} {t.skills.verifiedStack} &bull; {isOpen ? t.skills.clickCollapse : t.skills.clickExpand}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border font-bold hidden sm:inline-block ${isDark
                        ? 'bg-[#0284c7]/10 border-[#0284c7]/30 text-[#38bdf8]'
                        : 'bg-white/70 border-white/80 text-[#0284c7]'
                      }`}>
                      {catGroup.skills.length} Stack
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className={`p-1.5 rounded-lg border ${isDark ? 'border-slate-700 text-[#38bdf8]' : 'border-white/80 bg-white/50 text-[#0284c7]'
                        }`}
                    >
                      <HiOutlineChevronDown className="w-4 h-4" />
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
                      <div className={`px-4 sm:px-6 pb-5 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-white/40'
                        }`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {catGroup.skills.map((skill) => {
                            const iconConfig = SKILL_ICONS[skill.iconKey] || { icon: HiOutlineCheckCircle, color: '#38bdf8' };
                            const IconComp = iconConfig.icon;

                            return (
                              <motion.div
                                key={skill.name}
                                whileHover={{ scale: 1.01, y: -2 }}
                                onClick={() => setSelectedSkill({ ...skill, category: catGroup.category })}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-3 ${isDark
                                    ? 'bg-[#000610]/50 border-[#0077b6]/25 hover:border-[#38bdf8]/60 hover:bg-[#031729]/80 shadow-md'
                                    : 'bg-white/60 border-white/80 hover:border-white hover:bg-white shadow-md'
                                  }`}
                              >
                                <div className="space-y-2.5">
                                  {/* Header: Icon Tech + Judul (Bahasa/Tech) + Sub Title (Library/Tools) */}
                                  <div className="flex items-start gap-3">
                                    <div
                                      className="p-2.5 rounded-xl border shrink-0 flex items-center justify-center mt-0.5 transition-transform duration-300"
                                      style={{
                                        backgroundColor: isDark ? `${iconConfig.color}15` : '#ffffff',
                                        borderColor: isDark ? `${iconConfig.color}40` : '#cbd5e1',
                                        color: iconConfig.color
                                      }}
                                    >
                                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-1">
                                      <h4 className={`font-extrabold text-sm sm:text-base tracking-tight truncate ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                                        {skill.name}
                                      </h4>
                                      <div className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md inline-block border ${
                                        isDark
                                          ? 'bg-[#031729] text-[#38bdf8] border-[#0284c7]/30'
                                          : 'bg-[#e0f2fe] text-[#0284c7] border-[#0284c7]/20'
                                      }`}>
                                        {skill.subtitle}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Deskripsi: Penjelasan & Contoh Proyek Real */}
                                  <p className={`text-xs leading-relaxed font-medium pt-1 ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                                    {skill.description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
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
          className={`mt-6 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl ${isDark
              ? 'bg-[#010d1f]/80 border-[#0077b6]/30 text-slate-200'
              : 'bg-white/40 border-white/60 text-[#032b43] shadow-lg shadow-[#0284c7]/10'
            }`}
        >
          <div className="flex items-center gap-3 text-left">
            <div className={`p-2.5 rounded-xl shrink-0 ${isDark ? 'bg-[#0284c7]/10 text-[#38bdf8]' : 'bg-white/70 text-[#0284c7]'
              }`}>
              <HiOutlineCommandLine className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono text-xs sm:text-sm font-bold">
                {t.skills.verifiedCaseStudy}
              </h4>
              <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-[#0c3559]'}`}>
                {t.skills.githubNotice}
              </p>
            </div>
          </div>

          {/* Dual GitHub Account Dropdown Button */}
          <div className="relative shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setGithubDropdownOpen(!githubDropdownOpen)}
              className={`w-full sm:w-auto px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center justify-between sm:justify-start gap-2 transition-all border ${isDark
                  ? 'bg-[#031729] text-[#38bdf8] border-[#0284c7]/40 hover:border-[#0284c7] hover:bg-[#0284c7]/10'
                  : 'bg-white/70 text-[#0284c7] border-white/90 hover:bg-white shadow-sm'
                }`}
            >
              <div className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4" />
                <span>{t.skills.viewRepos}</span>
              </div>
              <HiOutlineChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${githubDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {githubDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 bottom-full sm:bottom-auto sm:top-full mb-2 sm:mb-0 sm:mt-2 w-full sm:w-60 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl z-30 ${isDark
                      ? 'bg-[#010d1a] border-[#00e5ff]/40 text-white shadow-[#00e5ff]/10'
                      : 'bg-white border-slate-300 text-slate-900 shadow-xl'
                    }`}
                >
                  <a
                    href="https://github.com/ThinKcode1717?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setGithubDropdownOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-mono font-semibold transition-colors ${isDark ? 'hover:bg-[#00e5ff]/10 text-slate-200 hover:text-[#00e5ff]' : 'hover:bg-slate-100 text-slate-800 hover:text-[#0284c7]'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-[#00e5ff]" />
                      <div>
                        <span className="block font-bold">ThinKcode1717</span>
                        <span className="text-[10px] text-slate-400 font-normal">Primary Repository</span>
                      </div>
                    </div>
                    <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://github.com/think-dev01?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setGithubDropdownOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-mono font-semibold transition-colors mt-1 ${isDark ? 'hover:bg-[#00e5ff]/10 text-slate-200 hover:text-[#00e5ff]' : 'hover:bg-slate-100 text-slate-800 hover:text-[#0284c7]'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-[#00b4d8]" />
                      <div>
                        <span className="block font-bold">think-dev01</span>
                        <span className="text-[10px] text-slate-400 font-normal">Secondary Repository</span>
                      </div>
                    </div>
                    <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
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
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 rounded-3xl border shadow-2xl backdrop-blur-2xl ${isDark
                  ? 'bg-[#010d1f] border-[#00e5ff]/40 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
                }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-slate-700/30">
                <div className="flex items-center gap-3">
                  {(() => {
                    const iconConfig = SKILL_ICONS[selectedSkill.iconKey] || { icon: HiOutlineCheckCircle, color: '#38bdf8' };
                    const IconModal = iconConfig.icon;
                    return (
                      <div
                        className="p-2.5 rounded-xl border shrink-0 flex items-center justify-center"
                        style={{
                          backgroundColor: isDark ? `${iconConfig.color}15` : '#ffffff',
                          borderColor: isDark ? `${iconConfig.color}40` : '#cbd5e1',
                          color: iconConfig.color
                        }}
                      >
                        <IconModal className="w-6 h-6" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="font-bold text-base">{selectedSkill.name}</h3>
                    <span className="text-[10px] font-mono text-[#38bdf8] block font-semibold">{selectedSkill.subtitle}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className={`p-1.5 rounded-xl border transition-colors ${isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <HiOutlineXMark className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-left">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Penjelasan & Implementasi Proyek</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {selectedSkill.description}
                  </p>
                </div>

                {selectedSkill.highlight && (
                  <div className={`p-3 rounded-xl border font-mono text-xs space-y-1 ${isDark ? 'bg-[#000610] border-[#0077b6]/30 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#38bdf8] font-bold">Studi Kasus Proyek</span>
                      <span className="text-slate-400">GitHub Verified</span>
                    </div>
                    <p className="text-[11px] leading-relaxed font-semibold">
                      • {selectedSkill.highlight}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                <a
                  href="https://github.com/ThinKcode1717?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all border ${isDark
                      ? 'bg-[#00e5ff] text-[#000610] border-[#00e5ff] hover:bg-[#00b4d8]'
                      : 'bg-[#0284c7] text-white border-[#0284c7] hover:bg-[#0f766e]'
                    }`}
                >
                  <span>Primary Repo</span>
                  <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSkill(null);
                    window.dispatchEvent(new CustomEvent('open-ai-drawer'));
                  }}
                  className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all border ${isDark
                      ? 'bg-[#031729] text-slate-200 border-slate-700 hover:border-[#00e5ff]/50'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:border-[#0284c7]/50'
                    }`}
                >
                  <HiOutlineCpuChip className="w-3.5 h-3.5" />
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
