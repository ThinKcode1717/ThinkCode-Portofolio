'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, Code2, Bot, Settings, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'AI FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
];

export default function HeadroomNavbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  const isDark = theme === 'dark';

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Headroom logic: Hide when scrolling down, show when scrolling up
      if (currentScrollY > 100) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // Hide on scroll down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true); // Show on scroll up
        }
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Active section highlighting
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'terminal', 'faqs', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020b14]/85 backdrop-blur-md border-b border-[#0077b6]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0077b6] to-[#00f5d4] p-[1.5px] shadow-[0_0_15px_rgba(0,245,212,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#020b14] rounded-[10px] flex items-center justify-center text-[#00f5d4]">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-mono">
            Think<span className="text-[#00f5d4]">Code</span>
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#03254c]/30 backdrop-blur-lg px-4 py-1.5 rounded-full border border-[#0077b6]/20">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
                  isActive ? 'text-[#00f5d4]' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#0077b6]/30 border border-[#00f5d4]/40 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Area: Separator Line + Action Buttons Cluster */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Vertical Separator Line */}
          <div className="w-[1px] h-6 bg-[#0077b6]/40 mx-1" aria-hidden="true" />

          {/* 1. AI Assistant Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-drawer'))}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#00f5d4] bg-[#0077b6]/25 border border-[#00f5d4]/40 hover:bg-[#00f5d4] hover:text-[#020b14] transition-all duration-300 shadow-[0_0_12px_rgba(0,245,212,0.2)] transform hover:-translate-y-0.5"
          >
            <Bot className="w-4 h-4 text-[#00f5d4]" />
            <span>Asisten AI</span>
          </button>

          {/* 2. Settings Menu Dropdown Trigger (Language & Theme Mode Switcher) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-200 bg-[#03254c]/40 border border-[#0077b6]/30 hover:border-[#00f5d4]/50 transition-all duration-300"
            >
              <Settings className="w-3.5 h-3.5 text-[#00f5d4]" />
              <span>Menu Akses</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#0077b6]/40 p-2.5 shadow-2xl backdrop-blur-2xl bg-[#020b14]/95 text-white z-50 space-y-2"
                >
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 pt-1">Pengaturan &amp; Opsi</p>
                  
                  {/* Multi-Language Switcher */}
                  <button
                    type="button"
                    onClick={() => { toggleLang(); setSettingsOpen(false); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-mono font-semibold text-slate-200 hover:bg-[#0077b6]/20 hover:text-[#00f5d4] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#00f5d4]" />
                      <span>Bahasa</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#0077b6]/30 text-[#00f5d4] text-[10px] font-bold">
                      {lang.toUpperCase()}
                    </span>
                  </button>

                  {/* Theme Mode Switcher */}
                  <button
                    type="button"
                    onClick={() => { toggleTheme(); setSettingsOpen(false); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-mono font-semibold text-slate-200 hover:bg-[#0077b6]/20 hover:text-[#00f5d4] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#00f5d4]" />}
                      <span>Mode Tema</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#0077b6]/30 text-[#00f5d4] text-[10px] font-bold">
                      {isDark ? 'Dark' : 'Light'}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Let's Talk CTA Button */}
          <a
            href="#contact"
            className="relative group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#020b14] bg-gradient-to-r from-[#00f5d4] to-[#0077b6] hover:shadow-[0_0_20px_rgba(0,245,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#020b14] animate-spin-slow" />
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile Toggle Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#03254c]/50 border border-[#0077b6]/30"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#020b14]/95 backdrop-blur-xl border-b border-[#0077b6]/30 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {/* AI Assistant Button at VERY TOP of mobile menu */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-ai-drawer'));
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-[#00f5d4] bg-[#0077b6]/30 border border-[#00f5d4]/40"
              >
                <Bot className="w-5 h-5 text-[#00f5d4]" />
                <span>Asisten AI (Tanya Portofolio)</span>
              </button>

              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-[#00f5d4] hover:bg-[#03254c]/40 transition-colors"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Settings Controls (Language & Theme Mode) */}
              <div className="pt-3 border-t border-[#0077b6]/20 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleLang()}
                    className="py-2.5 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-1.5 border border-[#0077b6]/40 bg-[#0077b6]/20 text-[#00f5d4]"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{lang.toUpperCase()}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleTheme()}
                    className="py-2.5 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-1.5 border border-[#0077b6]/40 bg-[#0077b6]/20 text-[#00f5d4]"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                    <span>{isDark ? 'Dark' : 'Light'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
