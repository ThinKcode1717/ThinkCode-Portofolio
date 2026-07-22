'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, User, RefreshCw, Loader2 } from 'lucide-react';
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

export default function ChatbotSection() {
  const { t, theme, lang } = useApp();
  const isDark = theme === 'dark';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Re-initialize welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: t.chatbot.welcome,
        timestamp: '12:00'
      }
    ]);
  }, [lang, t.chatbot.welcome]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
          ? "Maaf, terjadi kesalahan koneksi sinyal AI bawah laut. Silakan coba lagi."
          : "Sorry, a submarine AI connection signal error occurred. Please try again.",
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
        timestamp: '12:00'
      }
    ]);
  };

  return (
    <section id="chatbot" className="relative py-24 bg-transparent overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono ${
              isDark
                ? 'bg-[#03192e]/60 border-[#00f0ff]/30 text-[#00f0ff]'
                : 'bg-white/80 border-[#0284c7]/30 text-[#0284c7]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>{t.chatbot.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.chatbot.titlePre} <span className={isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}>{t.chatbot.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            {t.chatbot.subtitle}
          </motion.p>
        </div>

        {/* Chat Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl border overflow-hidden backdrop-blur-xl transition-colors ${
            isDark
              ? 'bg-[#000308]/85 border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.2)]'
              : 'bg-white/90 border-slate-200 shadow-xl'
          }`}
        >
          {/* Chat Window Title Bar */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'bg-[#03192e]/60 border-[#0077b6]/30' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl p-[1.5px] shadow-md ${
                isDark
                  ? 'bg-gradient-to-br from-[#00f0ff] to-[#0077b6] shadow-[0_0_15px_#00f0ff]'
                  : 'bg-gradient-to-br from-[#0284c7] to-[#0f766e]'
              }`}>
                <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                  isDark ? 'bg-[#000308] text-[#00f0ff]' : 'bg-white text-[#0284c7]'
                }`}>
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className={`text-sm font-bold font-sans flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {t.chatbot.titleEngine}
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-[#00f0ff]' : 'bg-[#0284c7]'}`} />
                </h3>
                <p className="text-[11px] font-mono text-slate-400">{t.chatbot.subtitleEngine}</p>
              </div>
            </div>

            <button
              onClick={resetChat}
              title="Reset Chat Conversation"
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-mono ${
                isDark
                  ? 'bg-[#03192e]/50 text-slate-400 hover:text-white hover:bg-[#03192e] border-[#0077b6]/30'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-slate-300'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.chatbot.reset}</span>
            </button>
          </div>

          {/* Messages Body */}
          <div className={`p-6 space-y-4 max-h-[420px] overflow-y-auto text-sm leading-relaxed ${
            isDark ? 'bg-[#000308]/80 text-slate-200' : 'bg-slate-50/50 text-slate-800'
          }`}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-[#00f0ff]/10 border-[#00f0ff]/40 text-[#00f0ff]'
                      : 'bg-[#e0f2fe] border-[#0284c7]/40 text-[#0284c7]'
                  }`}>
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] rounded-2xl px-4 py-3 space-y-1 ${
                  msg.sender === 'user'
                    ? isDark
                      ? 'bg-gradient-to-r from-[#0077b6] to-[#00f0ff] text-[#000308] font-medium shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white font-medium shadow-md'
                    : isDark
                      ? 'bg-[#03192e]/50 border border-[#0077b6]/30 text-slate-100 backdrop-blur-md'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className={`text-[10px] font-mono block text-right ${
                    msg.sender === 'user'
                      ? isDark ? 'text-[#000308]/70' : 'text-white/80'
                      : isDark ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-[#0077b6]/20 border-[#0077b6]/40 text-[#00f0ff]'
                      : 'bg-[#0284c7]/20 border-[#0284c7]/40 text-[#0284c7]'
                  }`}>
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Loading Typing Indicator */}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#00f0ff]/10 border-[#00f0ff]/40 text-[#00f0ff]'
                    : 'bg-[#e0f2fe] border-[#0284c7]/40 text-[#0284c7]'
                }`}>
                  <Bot className="w-4 h-4 animate-spin-slow" />
                </div>
                <div className={`px-4 py-3 rounded-2xl border text-xs font-mono flex items-center gap-2 ${
                  isDark
                    ? 'bg-[#03192e]/50 border-[#0077b6]/30 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}>
                  <Loader2 className={`w-3.5 h-3.5 animate-spin ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
                  <span>{t.chatbot.processing}</span>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className={`px-6 py-3 border-t flex flex-wrap gap-2 ${
            isDark ? 'bg-[#03192e]/30 border-[#0077b6]/20' : 'bg-slate-100/60 border-slate-200'
          }`}>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 py-1">
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#00f0ff]' : 'text-[#0284c7]'}`} />
              {t.chatbot.suggestionLabel}
            </span>
            {t.chatbot.chips.map((chip) => (
              <button
                key={chip}
                onClick={() => sendMessage(chip)}
                disabled={loading}
                className={`text-xs font-mono px-3 py-1 rounded-full border transition-all disabled:opacity-50 ${
                  isDark
                    ? 'bg-[#03192e]/60 border-[#0077b6]/30 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50'
                    : 'bg-white border-slate-300 text-slate-700 hover:text-[#0284c7] hover:border-[#0284c7]/50 shadow-sm'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box Form */}
          <form onSubmit={handleFormSubmit} className={`p-4 border-t flex items-center gap-3 ${
            isDark ? 'bg-[#03192e]/50 border-[#0077b6]/30' : 'bg-slate-50 border-slate-200'
          }`}>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={t.chatbot.placeholder}
              disabled={loading}
              className={`flex-1 border rounded-2xl px-4 py-3 text-sm font-sans transition-colors disabled:opacity-50 ${
                isDark
                  ? 'bg-[#000308]/80 border-[#0077b6]/40 text-white placeholder-slate-500 focus:border-[#00f0ff]'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0284c7]'
              }`}
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || loading}
              aria-label="Kirim Pesan"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 ${
                isDark
                  ? 'bg-gradient-to-r from-[#00f0ff] to-[#0077b6] text-[#000308] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'bg-gradient-to-r from-[#0284c7] to-[#0f766e] text-white'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
