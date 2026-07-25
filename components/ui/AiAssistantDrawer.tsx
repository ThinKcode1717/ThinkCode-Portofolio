'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, RefreshCw, Loader2, X, Sparkles, Command } from 'lucide-react';
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
  const { t, theme, lang } = useApp();
  const isDark = theme === 'dark';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesBoxRef = useRef<HTMLDivElement>(null);

  // Initialize / re-initialize welcome message on language change
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: t.chatbot.welcome,
        timestamp: formatTimeString(new Date())
      }
    ]);
  }, [lang, t.chatbot.welcome]);

  // Scroll internally within message box ONLY (no window scrollIntoView)
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  // Keyboard shortcut listener (Ctrl + K or Cmd + K) & Custom Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomTrigger = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-ai-drawer', handleCustomTrigger);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-ai-drawer', handleCustomTrigger);
    };
  }, []);

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim() || loading) return;

    const currentTime = formatTimeString(new Date());

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: currentTime
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, lang })
      });

      const data = await res.json();
      const aiReplyText = data.reply || "Maaf, tidak ada respon.";

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: formatTimeString(new Date())
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: lang === 'id'
          ? "Maaf, terjadi kesalahan koneksi AI. Silakan coba lagi."
          : "Sorry, an AI connection error occurred. Please try again.",
        timestamp: formatTimeString(new Date())
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: t.chatbot.welcome,
        timestamp: formatTimeString(new Date())
      }
    ]);
  };

  return (
    <>
      {/* ── Creative Floating Trigger Button (Bottom-Right) ── */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pointer-events-auto">
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
          className={`relative group flex items-center gap-3 px-4 py-3 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
            isDark
              ? 'bg-[#031729]/90 border-[#00e5ff]/40 text-slate-100 shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:border-[#00e5ff]'
              : 'bg-white/95 border-[#0284c7]/40 text-slate-800 shadow-[0_4px_20px_rgba(2,132,199,0.18)] hover:border-[#0284c7]'
          }`}
        >
          {/* Animated AI Glow Ring */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>

          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <Bot className={`w-4 h-4 transition-transform group-hover:rotate-12 ${
              isDark ? 'text-[#00e5ff]' : 'text-[#0284c7]'
            }`} />
            <span className="hidden sm:inline">AI Assistant</span>
          </div>

          <span className={`hidden md:flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
            isDark
              ? 'bg-[#000610] border-[#00e5ff]/20 text-[#00e5ff]'
              : 'bg-slate-100 border-slate-300 text-slate-600'
          }`}>
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </span>
        </motion.button>
      </div>

      {/* ── Slide-in AI Assistant Drawer Modal ── */}
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
                    <Sparkles className="w-5 h-5 animate-pulse" />
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
                    <RefreshCw className="w-3.5 h-3.5" />
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
                    <X className="w-5 h-5" />
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
                        {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
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
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs font-mono flex items-center gap-2 ${
                      isDark ? 'bg-[#031729] border border-[#0077b6]/30 text-[#00e5ff]' : 'bg-slate-100 border border-slate-200 text-[#0284c7]'
                    }`}>
                      <Loader2 className="w-4 h-4 animate-spin" />
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
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
