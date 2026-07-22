'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, X, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { THINKCODE_DATA, Project } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function ProjectsSection() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Full Stack & WebGL', 'Dashboard & AI', 'Distributed Backend', 'Developer Tools'];

  const filteredProjects = activeFilter === 'All'
    ? THINKCODE_DATA.projects
    : THINKCODE_DATA.projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 bg-transparent overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
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
            <FolderGit2 className="w-4 h-4" />
            <span>{t.projects.badge}</span>
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
            {t.projects.titlePre} <span className={isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}>{t.projects.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
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

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#03192e]/30 border-[#0077b6]/30 hover:border-[#00f0ff]/50 hover:shadow-[0_15px_40px_rgba(0,240,255,0.15)]'
                  : 'bg-white/80 border-slate-200 hover:border-[#0284c7]/50 hover:shadow-xl'
              }`}
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono uppercase tracking-wider font-semibold px-3 py-1 rounded-full border ${
                    isDark
                      ? 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/30'
                      : 'text-[#0284c7] bg-[#e0f2fe] border-[#0284c7]/30'
                  }`}>
                    {project.category}
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {project.metrics}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold transition-colors flex items-center gap-2 ${
                  isDark ? 'text-white group-hover:text-[#00f0ff]' : 'text-slate-900 group-hover:text-[#0284c7]'
                }`}>
                  {project.title}
                  <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'
                  }`} />
                </h3>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                        isDark
                          ? 'text-slate-300 bg-[#03192e]/70 border-[#0077b6]/20'
                          : 'text-slate-700 bg-slate-100 border-slate-200'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className={`px-6 py-4 border-t flex items-center justify-between text-xs font-mono transition-colors ${
                isDark
                  ? 'bg-[#03192e]/50 border-[#0077b6]/20 text-slate-400 group-hover:text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-500 group-hover:text-slate-900'
              }`}>
                <span>{t.projects.clickSpecs}</span>
                <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border shadow-2xl ${
                isDark
                  ? 'bg-[#000308] border-[#00f0ff]/40 text-slate-100 shadow-[0_0_50px_rgba(0,240,255,0.25)]'
                  : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-6 right-6 p-2 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#03192e]/60 text-slate-400 hover:text-white border-[#0077b6]/30'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'
                }`}>
                  {selectedProject.category} &bull; {selectedProject.metrics}
                </span>
                <h3 className="text-3xl font-extrabold">
                  {selectedProject.title}
                </h3>
              </div>

              <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedProject.longDescription}
              </p>

              {/* Specs & Tech Stack */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">{t.projects.usedTech}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border font-semibold ${
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
              <div className={`flex items-center gap-4 pt-6 border-t ${isDark ? 'border-[#0077b6]/20' : 'border-slate-200'}`}>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-6 py-3 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 transition-all ${
                      isDark
                        ? 'bg-gradient-to-r from-[#00f0ff] to-[#0077b6] text-[#000308] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]'
                        : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white hover:shadow-lg'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t.projects.live}</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-6 py-3 rounded-full border font-semibold text-sm tracking-wide flex items-center gap-2 transition-all ${
                      isDark
                        ? 'bg-[#03192e]/60 border-[#0077b6]/40 hover:border-[#00f0ff]/60 text-white'
                        : 'bg-slate-100 border-slate-300 hover:border-slate-400 text-slate-800'
                    }`}
                  >
                    <GithubIcon className={`w-4 h-4 ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
                    <span>{t.projects.code}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
