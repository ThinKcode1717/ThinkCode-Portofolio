'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineFolder, HiOutlineArrowTopRightOnSquare, HiOutlineXMark, HiOutlineArrowTrendingUp, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePhoto } from 'react-icons/hi2';
import { GithubIcon } from '../ui/Icons';
import { THINKCODE_DATA, Project } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import ScrollSectionWrapper from '../ui/ScrollSectionWrapper';

// Mock UI Screenshot Slide Component for Visual Application Previews
function ProjectScreenshotCarousel({ project, isDark }: { project: Project; isDark: boolean }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define themed mock UI preview slides for each application
  const slides = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [
        {
          title: 'Dashboard Overview & Real-Time Analytics',
          subtitle: 'Antarmuka utama dengan visualisasi data real-time, metrics performa, & kontrol multi-role.',
          type: 'dashboard'
        },
        {
          title: 'Arsitektur Data & Sistem Integrasi API',
          subtitle: 'Alur proses data, integrasi REST API microservice, & manajemen database terstruktur.',
          type: 'system'
        },
        {
          title: 'Modul Fitur Utama & Visualisasi Interaktif',
          subtitle: 'Fitur unggulan aplikasi yang dikembangkan berbasis React/Vue & Framer Motion.',
          type: 'feature'
        }
      ];

  const totalSlides = slides.length;

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full space-y-3">
      {/* Main Image Frame / UI Mockup Window */}
      <div className={`relative w-full h-56 sm:h-72 rounded-2xl border overflow-hidden backdrop-blur-md flex flex-col justify-between p-4 shadow-lg ${
        isDark ? 'bg-[#000d1a]/80 border-[#0077b6]/30' : 'bg-slate-900 text-white border-slate-700'
      }`}>
        {/* Top Browser Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
              https://app.{project.id}.dev/dashboard
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
            {project.year} Live Preview
          </span>
        </div>

        {/* Carousel Slide Content */}
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
              isDark ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]' : 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
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
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-[#00e5ff] hover:text-black transition-colors"
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-[#00e5ff] hover:text-black transition-colors"
        >
          <HiOutlineChevronRight className="w-4 h-4" />
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? 'w-6 bg-[#00e5ff]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 4;

  const categories = ['All', ...Array.from(new Set(THINKCODE_DATA.projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === 'All'
    ? THINKCODE_DATA.projects
    : THINKCODE_DATA.projects.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setCurrentPage(1);
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
              isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
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
            {t.projects.titlePre} <span className={isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'}>{t.projects.titleHighlight}</span>
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

        {/* Category Filter Pills */}
        <div className="flex items-center overflow-x-auto no-scrollbar py-2 px-1 mb-6 gap-2 justify-start sm:justify-center w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all duration-300 ${
                activeFilter === cat
                  ? isDark
                    ? 'bg-[#00f0ff] text-[#000308] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#0284c7] text-white shadow-[0_0_15px_rgba(2,132,199,0.4)]'
                  : isDark
                    ? 'bg-[#03192e]/50 text-slate-300 border border-[#0077b6]/30 hover:border-[#00f0ff]/40 hover:text-white backdrop-blur-md'
                    : 'bg-white/80 text-slate-700 border border-slate-200 hover:border-[#0284c7]/40 hover:text-[#0284c7] backdrop-blur-md'
              }`}
            >
              {cat === 'All' ? t.projects.all : cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid (Compact 2x2 Grid for 100vh Sizing) */}
        <div className="min-h-[360px]">
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
                  onClick={() => setSelectedProject(project)}
                  className={`group cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isDark
                      ? 'bg-[#03192e]/40 border-[#0077b6]/30 hover:border-[#00f0ff]/60 hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]'
                      : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/60 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border ${
                        isDark
                          ? 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/30'
                          : 'text-[#0284c7] bg-[#e0f2fe] border-[#0284c7]/30'
                      }`}>
                        {project.category}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {project.year}
                      </span>
                    </div>

                    <motion.h3
                      layoutId={`card-title-${project.id}`}
                      className={`text-lg sm:text-xl font-bold transition-colors flex items-center justify-between gap-2 ${
                        isDark ? 'text-white group-hover:text-[#00f0ff]' : 'text-slate-900 group-hover:text-[#0284c7]'
                      }`}
                    >
                      <span>{project.title}</span>
                      <HiOutlineArrowTopRightOnSquare className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'
                      }`} />
                    </motion.h3>

                    <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {project.description}
                    </p>

                    {/* Business Impact Highlight */}
                    {project.businessImpact && (
                      <div className={`flex items-center gap-1.5 p-2 rounded-lg text-[11px] font-mono ${
                        isDark
                          ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400'
                          : 'bg-emerald-50 border border-emerald-500/20 text-emerald-700'
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
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isDark
                            ? 'text-slate-300 bg-[#03192e]/80 border-[#0077b6]/20'
                            : 'text-slate-700 bg-slate-100 border-slate-200'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl border transition-all ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isDark
                    ? 'bg-[#03192e] border-[#0077b6]/30 text-white hover:border-[#00f0ff]'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-[#0284c7]'
              }`}
            >
              <HiOutlineChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all ${
                    currentPage === page
                      ? isDark
                        ? 'bg-[#00f0ff] text-black shadow-[0_0_10px_#00f0ff]'
                        : 'bg-[#0284c7] text-white shadow-md'
                      : isDark
                        ? 'bg-[#03192e]/60 text-slate-300 border border-[#0077b6]/20 hover:border-[#00f0ff]/40'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#0284c7]/40'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl border transition-all ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isDark
                    ? 'bg-[#03192e] border-[#0077b6]/30 text-white hover:border-[#00f0ff]'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-[#0284c7]'
              }`}
            >
              <HiOutlineChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* App Store Expanded Shared Element Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Expanded Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedProject.id}`}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className={`relative z-10 w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto ${
                isDark
                  ? 'bg-[#010d1a] border-[#00e5ff]/40 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className={`absolute top-4 right-4 p-2 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#03192e]/80 border-[#0077b6]/30 text-slate-300 hover:text-white hover:border-[#00f0ff]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
                }`}
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                {/* Category & Metrics */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className={`text-xs font-mono uppercase tracking-wider font-semibold px-3 py-1 rounded-full border ${
                    isDark
                      ? 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/30'
                      : 'text-[#0284c7] bg-[#e0f2fe] border-[#0284c7]/30'
                  }`}>
                    {selectedProject.category}
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {selectedProject.metrics}
                  </span>
                </div>

                {/* Title */}
                <motion.h3
                  layoutId={`card-title-${selectedProject.id}`}
                  className="text-2xl sm:text-3xl font-extrabold"
                >
                  {selectedProject.title}
                </motion.h3>

                {/* Interactive Screenshot Carousel */}
                <ProjectScreenshotCarousel project={selectedProject} isDark={isDark} />

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedProject.longDescription}
                </p>

                {/* Tech Stack Tags */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">{t.projects.usedTech}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-mono px-2.5 py-1 rounded-xl border font-semibold ${
                          isDark
                            ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]'
                            : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t ${
                  isDark ? 'border-[#0077b6]/20' : 'border-slate-200'
                }`}>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-6 py-3 rounded-full border font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
                        isDark
                          ? 'bg-[#03192e]/80 border-[#0077b6]/40 hover:border-[#00f0ff] text-white'
                          : 'bg-slate-100 border-slate-300 hover:border-slate-400 text-slate-800'
                      }`}
                    >
                      <GithubIcon className={`w-4 h-4 ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
                      <span>{t.projects.code}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ScrollSectionWrapper>
  );
}
