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
  Moon,
  Globe
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function FloatingSidebar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // AI Assistant (chatbot) placed at the VERY TOP of the navigation items
  const sidebarItems = [
    { id: 'chatbot', label: t.nav.chatbot || 'Asisten AI', icon: Bot, href: '#chatbot' },
    { id: 'hero', label: t.nav.home, icon: Home, href: '#hero' },
    { id: 'about', label: t.nav.about, icon: User, href: '#about' },
    { id: 'skills', label: t.nav.skills, icon: Layers, href: '#skills' },
    { id: 'projects', label: t.nav.projects, icon: FolderGit2, href: '#projects' },
    { id: 'experience', label: t.nav.timeline, icon: Briefcase, href: '#experience' },
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
      <aside className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 py-3.5 px-2 rounded-full border backdrop-blur-xl transition-colors duration-500 ${
        isDark 
          ? 'bg-[#000610]/85 border-[#00e5ff]/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)]'
          : 'bg-[#f0fdfa]/90 border-[#0284c7]/30 shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
      }`}>
        
        {/* Sidebar Nav Items (AI Assistant at VERY TOP) */}
        <div className="flex flex-col items-center gap-1.5">
          {sidebarItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            const isBot = item.id === 'chatbot';

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
                  onClick={(e) => {
                    if (isBot) {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('open-ai-drawer'));
                    }
                  }}
                  className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isBot
                      ? isDark
                        ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077b6] text-[#000610] shadow-[0_0_12px_rgba(0,229,255,0.4)] font-bold animate-pulse'
                        : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white shadow-[0_0_12px_rgba(2,132,199,0.3)] font-bold'
                      : isActive 
                        ? isDark
                          ? 'text-[#000610] bg-[#00e5ff] shadow-[0_2px_8px_rgba(0,229,255,0.2)] font-bold' 
                          : 'text-white bg-[#0284c7] shadow-[0_2px_8px_rgba(2,132,199,0.2)] font-bold'
                        : isDark
                          ? 'text-slate-300 hover:text-white hover:bg-[#031729]/60'
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
                      className={`absolute left-12 px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap pointer-events-none shadow-md z-50 ${
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

      {/* Mobile Floating Action Toggle Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 md:hidden flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileOpen(!mobileOpen); }}
          aria-label="Toggle Navigation & Theme Controls"
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold active:scale-95 transition-all shadow-xl ${
            isDark
              ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077b6] text-[#000610]'
              : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white'
          }`}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Floating Popup Navigation & Theme Controls Modal */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 md:hidden p-4 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-3 w-64 max-h-[80vh] overflow-y-auto no-scrollbar ${
              isDark
                ? 'bg-[#000308]/95 border-[#00f0ff]/40 text-slate-100'
                : 'bg-white/95 border-[#0284c7]/40 text-slate-800'
            }`}
          >
            {/* Pop-up Navigation Items (AI Assistant at TOP) */}
            <div className="space-y-1.5">
              {sidebarItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeSection === item.id;
                const isBot = item.id === 'chatbot';

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      if (isBot) {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('open-ai-drawer'));
                      }
                    }}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-colors min-h-[44px] ${
                      isBot
                        ? isDark
                          ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077b6] text-[#000610] font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                          : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white font-bold'
                        : isActive
                          ? isDark
                            ? 'bg-[#00f0ff]/15 text-[#00f0ff] font-bold border border-[#00f0ff]/30'
                            : 'bg-[#e0f2fe] text-[#0284c7] font-bold border border-[#0284c7]/30'
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
            </div>

            {/* Pop-up Navigation Theme Mode & Language Switcher Controls */}
            <div className={`pt-3 border-t space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Pengaturan Tema & Bahasa</p>
              
              <div className="grid grid-cols-2 gap-2">
                {/* Language Switch Button */}
                <button
                  type="button"
                  onClick={() => toggleLang()}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    isDark
                      ? 'bg-[#03192e] text-[#00e5ff] border-[#00e5ff]/30 hover:bg-[#00e5ff] hover:text-[#000610]'
                      : 'bg-[#e0f2fe] text-[#0284c7] border-[#0284c7]/40 hover:bg-[#0284c7] hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang.toUpperCase()}</span>
                </button>

                {/* Theme Mode Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleTheme()}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    isDark
                      ? 'bg-[#03192e] text-amber-400 border-amber-400/30 hover:bg-amber-400 hover:text-[#000610]'
                      : 'bg-[#e0f2fe] text-[#0284c7] border-[#0284c7]/40 hover:bg-[#0284c7] hover:text-white'
                  }`}
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
