'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlinePaperAirplane, 
  HiOutlineUser, 
  HiOutlineArrowPath, 
  HiOutlineXMark, 
  HiOutlineSparkles, 
  HiOutlineCommandLine 
} from 'react-icons/hi2';
import { RiRobot3Fill } from 'react-icons/ri';
import { CgSpinner } from 'react-icons/cg';
import { useApp } from '@/context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  source?: 'schema' | 'groq';
}

const formatTimeString = (date: Date = new Date()) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function AiAssistantDrawer() {
  const { t, theme, lang } = useApp();
  const isDark = theme === 'dark';

  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesBoxRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting when language changes or drawer opens
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'ai',
        text: t.chatbot.welcome,
        timestamp: formatTimeString(),
        source: 'schema',
      },
    ]);
  }, [t.chatbot.welcome]);

  // Listen for global window custom events to open drawer
  useEffect(() => {
    const handleOpenDrawer = () => setIsOpen(true);
    window.addEventListener('open-ai-drawer', handleOpenDrawer);
    return () => window.removeEventListener('open-ai-drawer', handleOpenDrawer);
  }, []);

  // Auto-scroll chat box to bottom when new message arrives
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: formatTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, lang }),
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Maaf, terjadi kendala teknis saat menghubungi Groq AI Engine.',
        timestamp: formatTimeString(),
        source: data.source || 'groq',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI Assistant Fetch Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Sistem AI sedang offline. Silakan hubungi Yoga secara langsung melalui tombol kontak.',
          timestamp: formatTimeString(),
          source: 'schema',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMsg);
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: t.chatbot.welcome,
        timestamp: formatTimeString(),
        source: 'schema',
      },
    ]);
  };

  const renderFormattedMessage = (text: string, isAi: boolean) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1 leading-relaxed">
        {lines.map((line, lineIdx) => {
          if (!line.trim()) {
            return <div key={lineIdx} className="h-1" />;
          }

          const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
          const isListItem = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());

          return (
            <div key={lineIdx} className={isListItem ? 'pl-2' : ''}>
              {parts.map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong
                      key={partIdx}
                      className={`font-semibold ${
                        isAi
                          ? isDark ? 'text-sky-300' : 'text-[#0284c7]'
                          : 'text-white font-bold'
                      }`}
                    >
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                  return (
                    <em
                      key={partIdx}
                      className={`italic ${
                        isAi
                          ? isDark ? 'text-slate-300' : 'text-[#0f4c75]'
                          : 'text-slate-100'
                      }`}
                    >
                      {part.slice(1, -1)}
                    </em>
                  );
                }
                return part;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Global Drawer Trigger & Backdrop Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] md:w-[520px] flex flex-col border-l shadow-2xl backdrop-blur-2xl ${
                isDark
                  ? 'bg-[#010a17]/95 border-[#0077b6]/30 text-slate-100'
                  : 'bg-white/90 border-white/80 text-[#032b43]'
              }`}
            >
              {/* Drawer Top Header Bar */}
              <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
                isDark ? 'bg-[#031729]/80 border-[#0077b6]/30' : 'bg-white/70 border-white/80'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center p-1.5 ${
                    isDark
                      ? 'bg-[#0284c7]/10 border-[#0284c7]/40 text-[#38bdf8]'
                      : 'bg-white/80 border-white/90 text-[#0284c7] shadow-sm'
                  }`}>
                    <Image src="/logo_nobg.png" alt="ThinkCode Logo" width={28} height={28} className="object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-mono text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#032b43]'}`}>
                        {t.chatbot.titleEngine}
                      </h3>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetChat}
                    title={t.chatbot.reset}
                    className={`p-2 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 ${
                      isDark
                        ? 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                        : 'border-white/80 bg-white/50 text-[#032b43] hover:text-[#0284c7] hover:bg-white'
                    }`}
                  >
                    <HiOutlineArrowPath className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Drawer"
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark
                        ? 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'border-white/80 bg-white/50 text-[#032b43] hover:text-[#0284c7] hover:bg-white'
                    }`}
                  >
                    <HiOutlineXMark className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Message Box Container (Isolated Scroll) */}
              <div
                ref={messagesBoxRef}
                className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar font-sans"
              >
                {messages.map((msg) => {
                  const isAi = msg.sender === 'ai';
                  const isSchema = msg.source === 'schema';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[90%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                    >
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all ${
                        isAi
                          ? isSchema
                            ? isDark
                              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                              : 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm'
                            : isDark
                              ? 'bg-[#0284c7]/10 border-[#0284c7]/50 text-[#38bdf8]'
                              : 'bg-sky-50 border-sky-500 text-sky-600 shadow-sm'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200'
                            : 'bg-white/90 border-white text-[#032b43] shadow-sm'
                      }`}>
                        {isAi ? (
                          <RiRobot3Fill className={`w-4 h-4 ${
                            isSchema
                              ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                              : isDark ? 'text-[#38bdf8]' : 'text-[#0284c7]'
                          }`} />
                        ) : (
                          <HiOutlineUser className={`w-4 h-4 ${isDark ? 'text-slate-200' : 'text-[#032b43]'}`} />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className={`p-3.5 rounded-2xl text-xs sm:text-sm ${
                          isAi
                            ? isDark
                              ? isSchema
                                ? 'bg-[#011710]/90 border border-emerald-500/30 text-slate-200 rounded-tl-sm'
                                : 'bg-[#031729]/90 border border-[#0077b6]/30 text-slate-200 rounded-tl-sm'
                              : isSchema
                                ? 'bg-emerald-50/70 border border-emerald-200 text-[#032b43] font-medium rounded-tl-sm shadow-sm'
                                : 'bg-white/70 border border-white/90 text-[#032b43] font-medium rounded-tl-sm shadow-sm'
                            : isDark
                              ? 'bg-gradient-to-r from-[#0284c7] to-[#0077b6] text-white font-semibold rounded-tr-sm'
                              : 'bg-[#0284c7] text-white font-semibold rounded-tr-sm shadow-md'
                        }`}>
                          {renderFormattedMessage(msg.text, isAi)}
                        </div>
                        <div className={`text-[10px] font-mono px-1 ${
                          isAi ? (isDark ? 'text-slate-400' : 'text-[#0f4c75]') : 'text-slate-400 text-right'
                        }`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex gap-3 max-w-[90%] mr-auto">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                      isDark ? 'bg-[#0284c7]/10 border-[#0284c7]/30 text-[#38bdf8]' : 'bg-white/80 border-white/90 text-[#0284c7]'
                    }`}>
                      <RiRobot3Fill className="w-4 h-4" />
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs font-mono flex items-center gap-2 ${
                      isDark ? 'bg-[#031729] border border-[#0077b6]/30 text-[#38bdf8]' : 'bg-white/70 border border-white/90 text-[#0284c7]'
                    }`}>
                      <CgSpinner className="w-4 h-4 animate-spin" />
                      <span>{t.chatbot.processing}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestion Chips */}
              <div className={`px-5 py-3 border-t overflow-x-auto no-scrollbar flex items-center gap-2 text-xs font-mono shrink-0 ${
                isDark ? 'border-[#0077b6]/20 bg-[#000610]/40' : 'border-white/60 bg-white/40'
              }`}>
                <span className={`shrink-0 text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-[#0f4c75]'}`}>
                  {t.chatbot.suggestionLabel}
                </span>
                {t.chatbot.chips.map((chipText: string) => (
                  <button
                    key={chipText}
                    type="button"
                    onClick={() => sendMessage(chipText)}
                    disabled={loading}
                    className={`shrink-0 px-3 py-1 rounded-full border text-[11px] font-semibold transition-all whitespace-nowrap ${
                      isDark
                        ? 'border-[#0077b6]/30 bg-[#031729]/60 text-slate-300 hover:border-[#0284c7]/50 hover:text-white'
                        : 'border-white/80 bg-white/70 text-[#032b43] hover:border-white hover:text-[#0284c7] hover:bg-white shadow-sm'
                    }`}
                  >
                    {chipText}
                  </button>
                ))}
              </div>

              {/* Input Form Footer */}
              <form
                onSubmit={handleFormSubmit}
                className={`p-4 border-t flex items-center gap-2 shrink-0 ${
                  isDark ? 'border-[#0077b6]/30 bg-[#010d1f]' : 'border-white/80 bg-white/60'
                }`}
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder={t.chatbot.placeholder}
                  disabled={loading}
                  className={`flex-1 px-4 py-3 rounded-2xl border text-xs sm:text-sm outline-none font-sans font-medium transition-colors ${
                    isDark
                      ? 'bg-[#000610] border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#38bdf8]'
                      : 'bg-white/70 border-white/90 text-[#032b43] placeholder-slate-500 focus:border-[#0284c7] focus:bg-white'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim() || loading}
                  className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    inputMsg.trim() && !loading
                      ? isDark
                        ? 'bg-gradient-to-r from-[#0284c7] to-[#0077b6] text-white'
                        : 'bg-[#0284c7] text-white shadow-md'
                      : isDark
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <HiOutlinePaperAirplane className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
