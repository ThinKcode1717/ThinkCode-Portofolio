'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineArrowUp } from 'react-icons/hi2';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative bg-transparent border-t py-12 font-mono text-xs overflow-hidden transition-colors ${
      isDark ? 'border-[#0077b6]/20 text-slate-400' : 'border-white/40 text-[#0c3559]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center p-1 backdrop-blur-md ${
            isDark ? 'bg-[#0284c7]/10 border-[#0284c7]/30' : 'bg-white/80 border-white/90 shadow-sm'
          }`}>
            <motion.div whileHover={{ rotate: 12, scale: 1.1 }}>
              <Image src="/logo_nobg.png" alt="ThinkCode Personal Logo" width={26} height={26} className="object-contain" />
            </motion.div>
          </div>
          <div>
            <p className={`font-bold font-sans text-sm ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
              Think<span className={isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'}>Code</span>
            </p>
            <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
              &copy; {new Date().getFullYear()} ThinkCode. {t.footer.copyright}
            </p>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`px-4 py-2.5 rounded-full border transition-all flex items-center gap-2 group backdrop-blur-md font-bold ${
            isDark
              ? 'bg-[#031729]/50 border-[#0077b6]/30 text-slate-300 hover:text-[#38bdf8] hover:border-[#0284c7]/50'
              : 'bg-white/40 border-white/60 text-[#032b43] hover:bg-white/70 hover:border-white shadow-md shadow-[#0284c7]/10'
          }`}
        >
          <span>{t.footer.surface}</span>
          <HiOutlineArrowUp className={`w-4 h-4 group-hover:-translate-y-1 transition-transform ${
            isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
          }`} />
        </button>

      </div>
    </footer>
  );
}
