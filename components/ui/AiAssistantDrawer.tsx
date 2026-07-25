'use client';

import React, { useState, useRef, useEffect } from 'react';
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
}

const formatTimeString = (date: Date = new Date()) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function AiAssistantDrawer() {
  const { t, theme } = useApp();
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
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Maaf, terjadi kendala teknis saat menghubungi Groq AI Engine.',
        timestamp: formatTimeString(),
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
      },
    ]);
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
                  ? 'bg-[#010a17]/95 border-[#00e5ff]/30 text-slate-100'
                  : 'bg-white/98 border-slate-200 text-slate-900'
              }`}
            >
              {/* Drawer Top Header Bar */}
              <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
                isDark ? 'bg-[#031729]/80 border-[#0077b6]/30' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDark
                      ? 'bg-[#00e5ff]/10 border-[#00e5ff]/40 text-[#00e5ff]'
                      : 'bg-[#e0f2fe] border-[#0284c7]/40 text-[#0284c7]'
                  }`}>
                    <HiOutlineSparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono text-sm font-bold tracking-tight">
                        {t.chatbot.titleEngine}
                      </h3>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Groq Llama 3.3 Engine
                    </p>
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
                        : 'border-slate-300 text-slate-600 hover:text-slate-900'
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
                        : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[90%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                    >
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        isAi
                          ? isDark
                            ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]'
                            : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200'
                            : 'bg-slate-200 border-slate-300 text-slate-800'
                      }`}>
                        {isAi ? <RiRobot3Fill className="w-4 h-4" /> : <HiOutlineUser className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isAi
                            ? isDark
                              ? 'bg-[#031729]/90 border border-[#0077b6]/30 text-slate-200 rounded-tl-sm'
                              : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-sm'
                            : isDark
                              ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077b6] text-[#000610] font-semibold rounded-tr-sm'
                              : 'bg-[#0284c7] text-white font-semibold rounded-tr-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <div className={`text-[10px] font-mono px-1 ${
                          isAi ? 'text-slate-500' : 'text-slate-400 text-right'
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
                      isDark ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]' : 'bg-[#e0f2fe] border-[#0284c7]/30 text-[#0284c7]'
                    }`}>
                      <RiRobot3Fill className="w-4 h-4" />
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs font-mono flex items-center gap-2 ${
                      isDark ? 'bg-[#031729] border border-[#0077b6]/30 text-[#00e5ff]' : 'bg-slate-100 border border-slate-200 text-[#0284c7]'
                    }`}>
                      <CgSpinner className="w-4 h-4 animate-spin" />
                      <span>{t.chatbot.processing}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestion Chips */}
              <div className={`px-5 py-3 border-t overflow-x-auto no-scrollbar flex items-center gap-2 text-xs font-mono shrink-0 ${
                isDark ? 'border-[#0077b6]/20 bg-[#000610]/40' : 'border-slate-200 bg-slate-50'
              }`}>
                <span className={`shrink-0 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t.chatbot.suggestionLabel}
                </span>
                {t.chatbot.chips.map((chipText: string) => (
                  <button
                    key={chipText}
                    type="button"
                    onClick={() => sendMessage(chipText)}
                    disabled={loading}
                    className={`shrink-0 px-3 py-1 rounded-full border text-[11px] transition-all whitespace-nowrap ${
                      isDark
                        ? 'border-[#0077b6]/30 bg-[#031729]/60 text-slate-300 hover:border-[#00e5ff]/50 hover:text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-[#0284c7]/50 hover:text-[#0284c7]'
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
                  isDark ? 'border-[#0077b6]/30 bg-[#010d1f]' : 'border-slate-200 bg-white'
                }`}
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder={t.chatbot.placeholder}
                  disabled={loading}
                  className={`flex-1 px-4 py-3 rounded-2xl border text-xs sm:text-sm outline-none font-sans transition-colors ${
                    isDark
                      ? 'bg-[#000610] border-[#0077b6]/30 text-white placeholder-slate-500 focus:border-[#00e5ff]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0284c7]'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim() || loading}
                  className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    inputMsg.trim() && !loading
                      ? isDark
                        ? 'bg-gradient-to-r from-[#00e5ff] to-[#0077b6] text-[#000610]'
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
