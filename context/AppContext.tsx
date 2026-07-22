'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, Language } from '@/lib/translations';

export type ThemeMode = 'dark' | 'light';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
  t: typeof TRANSLATIONS['id'];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [lang, setLang] = useState<Language>('id');

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem('thinkcode_theme') as ThemeMode;
    const savedLang = localStorage.getItem('thinkcode_lang') as Language;

    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    }
    if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('thinkcode_theme', nextTheme);
  };

  const toggleLang = () => {
    const nextLang = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
    localStorage.setItem('thinkcode_lang', nextLang);
  };

  const t = TRANSLATIONS[lang];

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      <div className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
