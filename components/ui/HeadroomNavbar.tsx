'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, Code2, Bot } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          ? 'bg-[#020b14]/80 backdrop-blur-md border-b border-[#0077b6]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
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

        {/* Desktop Navigation Links */}
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

        {/* Action CTA Buttons (AI Assistant at TOP header position) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-drawer'))}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold text-[#00f5d4] bg-[#0077b6]/20 border border-[#00f5d4]/40 hover:bg-[#00f5d4] hover:text-[#020b14] transition-all duration-300 shadow-[0_0_12px_rgba(0,245,212,0.2)] transform hover:-translate-y-0.5"
          >
            <Bot className="w-4 h-4 text-[#00f5d4]" />
            <span>Asisten AI</span>
          </button>

          <a
            href="#contact"
            className="relative group inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-[#020b14] bg-gradient-to-r from-[#00f5d4] to-[#0077b6] hover:shadow-[0_0_20px_rgba(0,245,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-[#020b14] animate-spin-slow" />
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
              <div className="pt-4 border-t border-[#0077b6]/20">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-[#020b14] bg-[#00f5d4]"
                >
                  <span>Let's Talk</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
