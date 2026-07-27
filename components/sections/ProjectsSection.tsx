'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlinePhoto,
  HiOutlineXMark,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowTrendingUp,
  HiOutlineGlobeAlt,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChevronDown,
  HiOutlineCheckCircle
} from 'react-icons/hi2';
import { GithubIcon } from '../ui/Icons';
import { useApp } from '@/context/AppContext';
import { Project } from '@/lib/data';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

// Modal for Screenshot Slide Preview
function ProjectModal({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.image];

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentSlide((prev) => (prev + 1) % slides.length);
      if (e.key === 'ArrowLeft') setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, slides.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`relative w-full max-w-3xl rounded-3xl border p-4 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-2xl ${
          isDark ? 'bg-[#010d1f]/95 border-[#0077b6]/40 text-white' : 'bg-white/95 border-slate-300 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-white/10 mb-4">
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
              isDark ? 'text-[#38bdf8] bg-[#0284c7]/20 border-[#0284c7]/40' : 'text-[#0284c7] bg-[#e0f2fe] border-[#0284c7]/30'
            }`}>
              {project.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mt-1">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full border transition-colors ${
              isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Image Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 my-3 flex flex-col justify-center items-center text-center space-y-2 p-2"
            >
              <div className={`p-3 rounded-2xl border mb-1 ${
                isDark ? 'bg-[#0284c7]/20 border-[#0284c7]/40 text-[#38bdf8]' : 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              }`}>
                <HiOutlinePhoto className="w-6 h-6" />
              </div>
              <h4 className="text-sm sm:text-base font-bold font-sans text-white">
                {typeof slides[currentSlide] === 'string'
                  ? `Screenshot Slide ${currentSlide + 1}`
                  : (slides[currentSlide] as { title: string }).title}
              </h4>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed font-mono">
                {typeof slides[currentSlide] === 'string'
                  ? project.description
                  : (slides[currentSlide] as { subtitle: string }).subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Prev / Next Controls */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-[#0284c7] transition-colors"
              >
                <HiOutlineChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-[#0284c7] transition-colors"
              >
                <HiOutlineChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {slides.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md">
              {slides.map((_, idx: number) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === idx ? 'w-5 bg-[#38bdf8]' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Links & Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                  isDark ? 'bg-[#031729] border-[#0077b6]/30 text-white hover:border-[#38bdf8]' : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 bg-[#0284c7] text-white hover:bg-[#0077b6] transition-all shadow-md shadow-[#0284c7]/20"
              >
                <HiOutlineGlobeAlt className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-400">Press ESC or click close to return</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t, theme, lang } = useApp();
  const isDark = theme === 'dark';
  const isEn = lang === 'en';

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<boolean>(false);
  const [mobileProjectIndex, setMobileProjectIndex] = useState<number>(0);

  const selectedProject = selectedProjectId
    ? t.data.projects.find((p) => p.id === selectedProjectId) || null
    : null;

  const ITEMS_PER_PAGE = 4;

  const categories = ['All', ...Array.from(new Set(t.data.projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === 'All'
    ? t.data.projects
    : t.data.projects.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setCurrentPage(1);
    setMobileProjectIndex(0);
  };

  // Safe active mobile project
  const activeMobileProject = filteredProjects[mobileProjectIndex] || filteredProjects[0];

  const nextMobileProject = () => {
    setMobileProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevMobileProject = () => {
    setMobileProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <ScrollSectionWrapper id="projects" className="relative py-12 lg:py-16 min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs font-mono font-semibold tracking-widest uppercase ${
              isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
            }`}
          >
            {t.projects.badge}
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
            {t.projects.titlePre} <span className={isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}>{t.projects.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        {/* ── 1. MOBILE CATEGORY SELECT DROPDOWN (sm:hidden - Fixes Clipping) ── */}
        <div className="sm:hidden w-full mb-6 relative">
          <button
            type="button"
            onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
            className={`w-full p-3.5 rounded-2xl border backdrop-blur-2xl flex items-center justify-between font-mono text-xs font-bold transition-all shadow-lg ${
              isDark
                ? 'bg-[#010d1a]/90 border-[#0077b6]/40 text-white'
                : 'bg-white/90 border-slate-300 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span className="text-slate-400">{isEn ? 'Filter:' : 'Filter Kategori:'}</span>
              <span className={`px-2.5 py-0.5 rounded-md font-bold truncate ${
                isDark ? 'bg-[#0284c7]/20 text-[#38bdf8]' : 'bg-[#e0f2fe] text-[#0284c7]'
              }`}>
                {activeFilter === 'All' ? t.projects.all : activeFilter}
              </span>
            </div>
            <HiOutlineChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
              mobileCategoryOpen ? 'rotate-180 text-[#38bdf8]' : 'text-slate-400'
            }`} />
          </button>

          <AnimatePresence>
            {mobileCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-0 right-0 top-14 z-40 p-2 rounded-2xl border backdrop-blur-2xl shadow-2xl space-y-1 ${
                  isDark
                    ? 'bg-[#010d1f]/95 border-[#0077b6]/50 text-white'
                    : 'bg-white/95 border-slate-300 text-slate-900'
                }`}
              >
                {categories.map((cat) => {
                  const isActive = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        handleFilterChange(cat);
                        setMobileCategoryOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-colors ${
                        isActive
                          ? isDark
                            ? 'bg-[#0284c7] text-white font-bold'
                            : 'bg-[#0284c7] text-white font-bold'
                          : isDark
                            ? 'hover:bg-[#031729] text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{cat === 'All' ? t.projects.all : cat}</span>
                      {isActive && <HiOutlineCheckCircle className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 2. DESKTOP CATEGORY FILTER PILLS (hidden sm:flex - Glass Segmented Control) ── */}
        <div className="hidden sm:flex w-full max-w-full overflow-x-auto no-scrollbar py-2 px-1 mb-8 justify-center">
          <div className={`p-1.5 rounded-2xl border backdrop-blur-2xl flex items-center gap-1.5 min-w-max ${
            isDark
              ? 'bg-[#010d1a]/80 border-[#0077b6]/30 shadow-xl'
              : 'bg-white/70 border-slate-200 shadow-md'
          }`}>
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFilterChange(cat)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-300 outline-none z-10 ${
                    isActive
                      ? 'text-white font-bold'
                      : isDark
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategoryGlow"
                      className={`absolute inset-0 rounded-xl shadow-md ${
                        isDark ? 'bg-gradient-to-r from-[#0284c7] to-[#0077b6]' : 'bg-[#0284c7]'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat === 'All' ? t.projects.all : cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. MOBILE PROJECT CARDS CAROUSEL SLIDER (sm:hidden) ── */}
        <div className="sm:hidden space-y-4">
          {filteredProjects.length > 0 && activeMobileProject && (
            <div className="space-y-3">
              {/* Carousel Header Controls */}
              <div className="flex items-center justify-between px-1 font-mono text-xs">
                <span className="text-slate-400 font-medium">
                  {isEn ? 'Project' : 'Proyek'} <strong className={isDark ? 'text-white' : 'text-slate-900'}>{mobileProjectIndex + 1}</strong> / {filteredProjects.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevMobileProject}
                    className={`p-2 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#031729] border-[#0077b6]/30 text-white hover:bg-[#0284c7]'
                        : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <HiOutlineChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMobileProject}
                    className={`p-2 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#031729] border-[#0077b6]/30 text-white hover:bg-[#0284c7]'
                        : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <HiOutlineChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Active Project Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMobileProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProjectId(activeMobileProject.id)}
                  className={`group cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden space-y-3 ${
                    isDark
                      ? 'bg-[#03192e]/60 border-[#0077b6]/40 shadow-xl'
                      : 'bg-white/80 border-slate-200 shadow-lg'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
                        isDark
                          ? 'text-[#38bdf8] bg-[#0284c7]/10 border-[#0284c7]/30'
                          : 'text-[#0284c7] bg-white/70 border-slate-300'
                      }`}>
                        {activeMobileProject.category}
                      </span>
                      <span className={`text-[10px] font-mono font-medium ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                        {activeMobileProject.year}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold transition-colors flex items-center justify-between gap-2 ${
                      isDark ? 'text-white' : 'text-[#032b43]'
                    }`}>
                      <span>{activeMobileProject.title}</span>
                      <HiOutlineArrowTopRightOnSquare className={`w-4 h-4 shrink-0 ${
                        isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
                      }`} />
                    </h3>

                    <p className={`text-xs leading-relaxed font-medium line-clamp-3 ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                      {activeMobileProject.description}
                    </p>

                    {/* Business Impact Highlight */}
                    {activeMobileProject.businessImpact && (
                      <div className={`flex items-center gap-1.5 p-2 rounded-lg text-[11px] font-mono font-semibold ${
                        isDark
                          ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400'
                          : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800'
                      }`}>
                        <HiOutlineArrowTrendingUp className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{activeMobileProject.businessImpact}</span>
                      </div>
                    )}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                    {activeMobileProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                          isDark
                            ? 'text-slate-300 bg-[#03192e]/80 border-[#0077b6]/20'
                            : 'text-[#082846] bg-white/60 border-slate-200'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Carousel Indicator */}
              <div className="flex items-center justify-center gap-1.5 pt-2">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMobileProjectIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      mobileProjectIndex === idx
                        ? 'w-6 bg-[#38bdf8]'
                        : isDark ? 'w-1.5 bg-slate-700' : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 4. DESKTOP PROJECTS CARDS GRID (hidden sm:block - 2x2 Grid) ── */}
        <div className="hidden sm:block min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${currentPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              {currentProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layoutId={`card-container-${project.id}`}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`group cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isDark
                      ? 'bg-[#03192e]/40 border-[#0077b6]/30 hover:border-[#0284c7]/60 hover:shadow-[0_10px_30px_rgba(2,132,199,0.15)]'
                      : 'bg-white/40 border-white/60 shadow-xl shadow-[#0284c7]/15 hover:bg-white/55 hover:border-white/80'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
                        isDark
                          ? 'text-[#38bdf8] bg-[#0284c7]/10 border-[#0284c7]/30'
                          : 'text-[#0284c7] bg-white/70 border-white/90'
                      }`}>
                        {project.category}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-mono font-medium ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                        {project.year}
                      </span>
                    </div>

                    <motion.h3
                      layoutId={`card-title-${project.id}`}
                      className={`text-lg sm:text-xl font-bold transition-colors flex items-center justify-between gap-2 ${
                        isDark ? 'text-white group-hover:text-[#38bdf8]' : 'text-[#032b43] group-hover:text-[#0284c7]'
                      }`}
                    >
                      <span>{project.title}</span>
                      <HiOutlineArrowTopRightOnSquare className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
                      }`} />
                    </motion.h3>

                    <p className={`text-xs leading-relaxed font-medium line-clamp-2 ${isDark ? 'text-slate-300' : 'text-[#0c3559]'}`}>
                      {project.description}
                    </p>

                    {/* Business Impact Highlight */}
                    {project.businessImpact && (
                      <div className={`flex items-center gap-1.5 p-2 rounded-lg text-[11px] font-mono font-semibold ${
                        isDark
                          ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400'
                          : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800'
                      }`}>
                        <HiOutlineArrowTrendingUp className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{project.businessImpact}</span>
                      </div>
                    )}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 pt-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                          isDark
                            ? 'text-slate-300 bg-[#03192e]/80 border-[#0077b6]/20'
                            : 'text-[#082846] bg-white/60 border-white/80'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Pagination Controls (hidden sm:flex) */}
        {totalPages > 1 && (
          <div className="hidden sm:flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl border transition-all ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isDark
                    ? 'bg-[#03192e] border-[#0077b6]/30 text-slate-200 hover:border-[#38bdf8]'
                    : 'bg-white border-slate-300 text-slate-800 hover:border-[#0284c7]'
              }`}
            >
              <HiOutlineChevronLeft className="w-4 h-4" />
            </button>
            <span className={`text-xs font-mono font-semibold px-3 py-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl border transition-all ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isDark
                    ? 'bg-[#03192e] border-[#0077b6]/30 text-slate-200 hover:border-[#38bdf8]'
                    : 'bg-white border-slate-300 text-slate-800 hover:border-[#0284c7]'
              }`}
            >
              <HiOutlineChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Selected Project Slide Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProjectId(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </ScrollSectionWrapper>
  );
}
