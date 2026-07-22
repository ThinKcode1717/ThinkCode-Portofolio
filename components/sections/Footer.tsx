'use client';

import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative bg-transparent border-t py-12 font-mono text-xs overflow-hidden transition-colors ${
      isDark ? 'border-[#0077b6]/30 text-slate-400' : 'border-slate-300 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
            isDark ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
          }`}>
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <p className={`font-bold font-sans text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Think<span className={isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}>Code</span>
            </p>
            <p className={isDark ? 'text-slate-500' : 'text-slate-500'}>
              &copy; {new Date().getFullYear()} ThinkCode. {t.footer.copyright}
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md ${
          isDark ? 'bg-[#03192e]/40 border-[#0077b6]/20 text-slate-300' : 'bg-white/80 border-slate-300 text-slate-700'
        }`}>
          <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#00f0ff]' : 'bg-[#0284c7]'}`} />
          <span>{t.footer.seoTag}</span>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`p-3 rounded-full border transition-colors flex items-center gap-2 group backdrop-blur-md ${
            isDark
              ? 'bg-[#03192e]/50 border-[#0077b6]/30 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50'
              : 'bg-white border-slate-300 text-slate-700 hover:text-[#0284c7] hover:border-[#0284c7]/50'
          }`}
        >
          <span>{t.footer.surface}</span>
          <ArrowUp className={`w-4 h-4 group-hover:-translate-y-1 transition-transform ${
            isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'
          }`} />
        </button>

      </div>
    </footer>
  );
}
