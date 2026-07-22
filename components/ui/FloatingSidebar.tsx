'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Layers, 
  FolderGit2, 
  Briefcase, 
  Bot, 
  Mail, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function FloatingSidebar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sidebarItems = [
    { id: 'hero', label: t.nav.home, icon: Home, href: '#hero' },
    { id: 'about', label: t.nav.about, icon: User, href: '#about' },
    { id: 'skills', label: t.nav.skills, icon: Layers, href: '#skills' },
    { id: 'projects', label: t.nav.projects, icon: FolderGit2, href: '#projects' },
    { id: 'experience', label: t.nav.timeline, icon: Briefcase, href: '#experience' },
    { id: 'chatbot', label: t.nav.chatbot, icon: Bot, href: '#chatbot' },
    { id: 'contact', label: t.nav.contact, icon: Mail, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.map(item => item.id);
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      {/* Desktop Sticky Floating Left Sidebar */}
      <aside className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 py-3 px-2 rounded-full border backdrop-blur-xl transition-colors duration-500 ${
        isDark 
          ? 'bg-[#000308]/85 border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]'
          : 'bg-[#f0fdfa]/90 border-[#0284c7]/30 shadow-[0_0_30px_rgba(2,132,199,0.2)]'
      }`}>
        
        {/* Language Switch Button */}
        <button
          onClick={toggleLang}
          aria-label="Switch Language"
          title={`Switch to ${lang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300 ${
            isDark
              ? 'bg-[#03192e] text-[#00f0ff] border border-[#00f0ff]/40 hover:bg-[#00f0ff] hover:text-[#000308]'
              : 'bg-[#e0f2fe] text-[#0284c7] border border-[#0284c7]/40 hover:bg-[#0284c7] hover:text-white'
          }`}
        >
          {lang.toUpperCase()}
        </button>

        {/* Theme Mode Switch Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title={isDark ? 'Switch to Sunlit Light Mode' : 'Switch to Abyssal Dark Mode'}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDark
              ? 'bg-[#03192e] text-amber-400 border border-amber-400/40 hover:bg-amber-400 hover:text-[#000308]'
              : 'bg-[#e0f2fe] text-[#0284c7] border border-[#0284c7]/40 hover:bg-[#0284c7] hover:text-white'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className={`w-5 h-[1px] my-0.5 ${isDark ? 'bg-[#00f0ff]/20' : 'bg-[#0284c7]/20'}`} />

        {/* Sidebar Nav Items */}
        <div className="flex flex-col items-center gap-1.5">
          {sidebarItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <div 
                key={item.id} 
                className="relative flex items-center"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <a
                  href={item.href}
                  aria-label={item.label}
                  className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? isDark
                        ? 'text-[#000308] bg-[#00f0ff] shadow-[0_0_18px_#00f0ff]' 
                        : 'text-white bg-[#0284c7] shadow-[0_0_18px_#0284c7]'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-[#03192e]/60'
                        : 'text-slate-700 hover:text-[#0284c7] hover:bg-[#e0f2fe]'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </a>

                {/* Tooltip Pill on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -8, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className={`absolute left-12 px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap pointer-events-none shadow-md ${
                        isDark
                          ? 'bg-[#03192e] border border-[#00f0ff]/40 text-[#00f0ff]'
                          : 'bg-white border border-[#0284c7]/40 text-[#0284c7]'
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Mobile Floating Action Control Bar */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 md:hidden flex items-center gap-2">
        <button
          onClick={toggleLang}
          aria-label="Switch Language"
          className={`w-11 h-11 rounded-full font-mono text-xs font-bold flex items-center justify-center shadow-lg border active:scale-95 transition-transform ${
            isDark
              ? 'bg-[#010712] text-[#00f0ff] border-[#00f0ff]/40'
              : 'bg-white text-[#0284c7] border-[#0284c7]/40'
          }`}
        >
          {lang.toUpperCase()}
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className={`w-11 h-11 rounded-full font-mono text-xs font-bold flex items-center justify-center shadow-lg border active:scale-95 transition-transform ${
            isDark
              ? 'bg-[#010712] text-amber-400 border-amber-400/40'
              : 'bg-white text-[#0284c7] border-[#0284c7]/40'
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#0077b6] text-[#000308] shadow-[0_0_20px_rgba(0,240,255,0.5)] flex items-center justify-center font-bold active:scale-95 transition-transform"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[#000308]" /> : <Menu className="w-5 h-5 text-[#000308]" />}
        </button>
      </div>

      {/* Mobile Floating Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 md:hidden p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl space-y-1.5 w-52 max-h-[70vh] overflow-y-auto no-scrollbar ${
              isDark
                ? 'bg-[#000308]/95 border-[#00f0ff]/40 text-slate-100'
                : 'bg-white/95 border-[#0284c7]/40 text-slate-800'
            }`}
          >
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-colors min-h-[44px] ${
                    isActive
                      ? isDark
                        ? 'bg-[#00f0ff] text-[#000308] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                        : 'bg-[#0284c7] text-white font-bold shadow-md'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-[#03192e]/60'
                        : 'text-slate-700 hover:text-[#0284c7] hover:bg-[#e0f2fe]'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
