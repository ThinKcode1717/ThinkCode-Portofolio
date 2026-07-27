'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineSquares2X2,
  HiOutlineFolder,
  HiOutlineBriefcase,
  HiOutlineCpuChip,
  HiOutlineEnvelope,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineLanguage,
  HiOutlineAdjustmentsHorizontal
} from 'react-icons/hi2';
import { RiRobot3Fill } from 'react-icons/ri';
import { useApp } from '@/context/AppContext';

export default function FloatingSidebar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSettingsOpen, setDesktopSettingsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // AI Assistant (chatbot) placed at the VERY TOP of the navigation items
  const sidebarItems = [
    { id: 'chatbot', label: t.nav.chatbot || 'Asisten AI', icon: RiRobot3Fill, href: '#chatbot' },
    { id: 'hero', label: t.nav.home, icon: HiOutlineHome, href: '#hero' },
    { id: 'about', label: t.nav.about, icon: HiOutlineUser, href: '#about' },
    { id: 'skills', label: t.nav.skills, icon: HiOutlineSquares2X2, href: '#skills' },
    { id: 'projects', label: t.nav.projects, icon: HiOutlineFolder, href: '#projects' },
    { id: 'experience', label: t.nav.timeline, icon: HiOutlineBriefcase, href: '#experience' },
    { id: 'contact', label: t.nav.contact, icon: HiOutlineEnvelope, href: '#contact' },
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
      <aside className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 py-3.5 px-2 rounded-full border backdrop-blur-xl transition-colors duration-500 ${isDark
        ? 'bg-[#000610]/85 border-[#00e5ff]/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)]'
        : 'bg-[#f0fdfa]/90 border-[#0284c7]/30 shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
        }`}>

        {/* Sidebar Nav Items */}
        <div className="flex flex-col items-center gap-1.5">
          {sidebarItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            const isBot = item.id === 'chatbot';

            if (isBot) {
              return (
                <div
                  key={item.id}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Rotating Glowing Border Beam Container */}
                  <div className="relative p-[2px] rounded-full overflow-hidden flex items-center justify-center group cursor-pointer">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-[-150%] pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 200deg, #00f0ff 270deg, #0077b6 330deg, transparent 360deg)'
                      }}
                    />

                    <a
                      href={item.href}
                      aria-label={item.label}
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('open-ai-drawer'));
                      }}
                      className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${isDark
                        ? 'bg-[#010d1f] text-[#38bdf8] shadow-[0_0_14px_rgba(56,189,248,0.4)]'
                        : 'bg-white/90 text-[#032b43] shadow-[0_0_12px_rgba(2,132,199,0.3)]'
                        }`}
                    >
                      <IconComp className={`w-4 h-4 ${isDark ? 'text-[#38bdf8]' : 'text-[#032b43]'}`} />
                    </a>
                  </div>

                  {/* Tooltip Pill on Hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.95 }}
                        transition={{ duration: 0.12 }}
                        className={`absolute left-12 px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap pointer-events-none shadow-md z-50 ${isDark
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
            }

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
                  className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 outline-none z-10 ${isActive
                    ? 'text-white font-bold'
                    : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-[#031729]/60'
                      : 'text-slate-700 hover:text-[#0284c7] hover:bg-[#e0f2fe]'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarGlow"
                      className={`absolute inset-0 rounded-full ${
                        isDark
                          ? 'bg-gradient-to-r from-[#0284c7] to-[#0077b6] shadow-[0_2px_10px_rgba(2,132,199,0.5)]'
                          : 'bg-[#0284c7] shadow-[0_2px_10px_rgba(2,132,199,0.3)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <IconComp className="w-4 h-4 relative z-10" />
                </a>

                {/* Tooltip Pill on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -8, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className={`absolute left-12 px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap pointer-events-none shadow-md z-50 ${isDark
                        ? 'bg-[#03192e] border border-[#00b4d8]/40 text-[#38bdf8]'
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

        {/* Separator Line */}
        <div className={`w-5 h-[1px] my-1 ${isDark ? 'bg-[#00b4d8]/20' : 'bg-[#0284c7]/20'}`} />

        {/* Action Button for Multi-Language & Theme Mode Dropdown on Desktop */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setDesktopSettingsOpen(!desktopSettingsOpen)}
            aria-label="Pengaturan Tema & Bahasa"
            title="Pengaturan Tema & Bahasa"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${desktopSettingsOpen
              ? isDark
                ? 'bg-[#0284c7] text-white font-bold shadow-[0_0_12px_rgba(2,132,199,0.4)]'
                : 'bg-[#0284c7] text-white font-bold shadow-[0_0_12px_rgba(2,132,199,0.3)]'
              : isDark
                ? 'text-[#38bdf8] bg-[#03192e] border border-[#0284c7]/30 hover:bg-[#0284c7] hover:text-white'
                : 'text-[#0284c7] bg-[#e0f2fe] border border-[#0284c7]/40 hover:bg-[#0284c7] hover:text-white'
              }`}
          >
            <HiOutlineAdjustmentsHorizontal className={`w-4 h-4 transition-transform duration-300 ${desktopSettingsOpen ? 'rotate-90' : ''}`} />
          </button>

          {/* Desktop Pop-up Navigation Menu Drawer */}
          <AnimatePresence>
            {desktopSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-12 bottom-0 w-52 rounded-2xl border p-3 shadow-2xl backdrop-blur-2xl z-50 space-y-2.5 ${isDark
                  ? 'bg-[#010d1f]/95 border-[#0284c7]/40 text-white shadow-[#0284c7]/10'
                  : 'bg-white/95 border-slate-300 text-slate-900 shadow-xl'
                  }`}
              >
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Opsi &amp; Pengaturan</p>

                {/* Multi-Language Trigger */}
                <button
                  type="button"
                  onClick={() => { toggleLang(); setDesktopSettingsOpen(false); }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-mono font-semibold transition-colors ${isDark ? 'hover:bg-[#0284c7]/10 text-slate-200 hover:text-[#38bdf8]' : 'hover:bg-slate-100 text-slate-800 hover:text-[#0284c7]'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <HiOutlineLanguage className="w-4 h-4 text-[#0284c7]" />
                    <span>Bahasa</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${isDark ? 'bg-[#0284c7]/20 text-[#38bdf8]' : 'bg-[#e0f2fe] text-[#0284c7]'
                    }`}>
                    {lang.toUpperCase()}
                  </span>
                </button>

                {/* Theme Mode Trigger */}
                <button
                  type="button"
                  onClick={() => { toggleTheme(); setDesktopSettingsOpen(false); }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-mono font-semibold transition-colors ${isDark ? 'hover:bg-[#0284c7]/10 text-slate-200 hover:text-[#38bdf8]' : 'hover:bg-slate-100 text-slate-800 hover:text-[#0284c7]'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {isDark ? <HiOutlineSun className="w-4 h-4 text-amber-400" /> : <HiOutlineMoon className="w-4 h-4 text-[#0284c7]" />}
                    <span>Mode Tema</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${isDark ? 'bg-[#0284c7]/20 text-[#38bdf8]' : 'bg-[#e0f2fe] text-[#0284c7]'
                    }`}>
                    {isDark ? 'Dark' : 'Light'}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Mobile Floating Action Toggle Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 md:hidden flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileOpen(!mobileOpen); }}
          aria-label="Toggle Navigation & Theme Controls"
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold active:scale-95 transition-all shadow-xl ${isDark
            ? 'bg-gradient-to-r from-[#0284c7] via-[#0077b6] to-[#0f766e] text-white'
            : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white'
            }`}
        >
          {mobileOpen ? <HiOutlineXMark className="w-5 h-5" /> : <HiOutlineBars3 className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Floating Popup Navigation & Theme Controls Modal */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 md:hidden p-4 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-3 w-64 max-h-[80vh] overflow-y-auto no-scrollbar ${isDark
              ? 'bg-[#000308]/95 border-[#00f0ff]/40 text-slate-100'
              : 'bg-white/95 border-[#0284c7]/40 text-slate-800'
              }`}
          >
            {/* Pop-up Navigation Items (AI Assistant with Rotating Border Glow at TOP) */}
            <div className="space-y-1.5">
              {sidebarItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeSection === item.id;
                const isBot = item.id === 'chatbot';

                if (isBot) {
                  return (
                    <div key={item.id} className="relative p-[2px] rounded-xl overflow-hidden cursor-pointer group">
                      {/* Rotating Border Glow Ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-150%] pointer-events-none"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 0deg, transparent 200deg, #00f0ff 270deg, #0077b6 330deg, transparent 360deg)'
                        }}
                      />
                      <a
                        href={item.href}
                        onClick={(e) => {
                          setMobileOpen(false);
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('open-ai-drawer'));
                        }}
                        className={`relative z-10 flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-xs font-mono font-bold transition-colors min-h-[44px] ${isDark
                          ? 'bg-[#010d1f] text-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                          : 'bg-white/90 text-[#032b43] shadow-sm'
                          }`}
                      >
                        <IconComp className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#38bdf8]' : 'text-[#032b43]'}`} />
                        <span>{item.label}</span>
                      </a>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-colors min-h-[44px] overflow-hidden ${isActive
                      ? 'text-white font-bold'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-[#031729]/60'
                        : 'text-slate-700 hover:text-[#0284c7] hover:bg-[#e0f2fe]'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMobileNavGlow"
                        className={`absolute inset-0 rounded-xl ${
                          isDark ? 'bg-gradient-to-r from-[#0284c7] to-[#0077b6]' : 'bg-[#0284c7]'
                        }`}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <IconComp className="w-4 h-4 shrink-0 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Pop-up Navigation Theme Mode & Language Switcher Controls */}
            <div className={`pt-3 border-t space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Pengaturan Tema &amp; Bahasa</p>

              <div className="grid grid-cols-2 gap-2">
                {/* Language Switch Button */}
                <button
                  type="button"
                  onClick={() => toggleLang()}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${isDark
                    ? 'bg-[#03192e] text-[#00e5ff] border-[#00e5ff]/30 hover:bg-[#00e5ff] hover:text-[#000610]'
                    : 'bg-[#e0f2fe] text-[#0284c7] border-[#0284c7]/40 hover:bg-[#0284c7] hover:text-white'
                    }`}
                >
                  <HiOutlineLanguage className="w-3.5 h-3.5" />
                  <span>{lang.toUpperCase()}</span>
                </button>

                {/* Theme Mode Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleTheme()}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${isDark
                    ? 'bg-[#03192e] text-amber-400 border-amber-400/30 hover:bg-amber-400 hover:text-[#000610]'
                    : 'bg-[#e0f2fe] text-[#0284c7] border-[#0284c7]/40 hover:bg-[#0284c7] hover:text-white'
                    }`}
                >
                  {isDark ? <HiOutlineSun className="w-3.5 h-3.5" /> : <HiOutlineMoon className="w-3.5 h-3.5" />}
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
