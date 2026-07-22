'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, RefreshCw } from 'lucide-react';
import { THINKCODE_DATA } from '@/lib/data';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function OceanTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-[#00f5d4] font-bold">
            Ocean Submarine Terminal v2.4 [ThinkCode Core OS]
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-[#00f5d4] font-mono font-bold">help</span> to list available commands.
          </p>
        </div>
      )
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-[#00f5d4] font-bold">Available Commands:</p>
            <p><span className="text-[#00f5d4]">bio</span> — Display developer biography & mission</p>
            <p><span className="text-[#00f5d4]">skills</span> — List technical stack breakdown</p>
            <p><span className="text-[#00f5d4]">projects</span> — View top featured projects</p>
            <p><span className="text-[#00f5d4]">contact</span> — Get direct contact links</p>
            <p><span className="text-[#00f5d4]">dive</span> — Simulate a 5,000m ocean depth telemetry dive</p>
            <p><span className="text-[#00f5d4]">clear</span> — Clear terminal window output</p>
          </div>
        );
        break;

      case 'bio':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-white font-bold">{THINKCODE_DATA.name} &bull; {THINKCODE_DATA.role}</p>
            <p>{THINKCODE_DATA.bio}</p>
            <p className="text-xs text-slate-400">Location: {THINKCODE_DATA.location} | Experience: {THINKCODE_DATA.yearsExperience}</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-slate-300">
            {THINKCODE_DATA.skills.map((c) => (
              <div key={c.category}>
                <p className="text-[#00f5d4] font-bold">{c.category}:</p>
                <p className="text-xs">{c.skills.map(s => s.name).join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-slate-300">
            {THINKCODE_DATA.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-[#00f5d4] pl-2">
                <p className="text-white font-bold">{p.title} <span className="text-xs text-[#00f5d4]">({p.metrics})</span></p>
                <p className="text-xs">{p.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p>Email: <a href={`mailto:${THINKCODE_DATA.socials.email}`} className="text-[#00f5d4] underline">{THINKCODE_DATA.socials.email}</a></p>
            <p>GitHub: <a href={THINKCODE_DATA.socials.github} target="_blank" className="text-[#00f5d4] underline">{THINKCODE_DATA.socials.github}</a></p>
            <p>LinkedIn: <a href={THINKCODE_DATA.socials.linkedin} target="_blank" className="text-[#00f5d4] underline">{THINKCODE_DATA.socials.linkedin}</a></p>
          </div>
        );
        break;

      case 'dive':
        outputNode = (
          <div className="space-y-1 text-[#00f5d4] font-mono">
            <p>[SYSTEM] Initiating Submarine Dive Sequence...</p>
            <p>[TELEMETRY] Depth: -1,000m &bull; Water Temp: 4.2&deg;C</p>
            <p>[TELEMETRY] Depth: -3,000m &bull; Bioluminescence Detected</p>
            <p>[TELEMETRY] Depth: -5,000m &bull; Mariana Abyss Reached! All Systems Operational.</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <p className="text-rose-400">
            Command not recognized: '<span className="font-bold">{cmd}</span>'. Type <span className="text-[#00f5d4]">help</span> for commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output: outputNode }]);
    setInputVal('');
  };

  return (
    <section id="terminal" className="relative py-24 bg-transparent overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#03254c]/60 border border-[#00f5d4]/30 backdrop-blur-md text-xs font-mono text-[#00f5d4]"
          >
            <TerminalIcon className="w-4 h-4" />
            <span>05 &bull; INTERACTIVE CLI</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Ocean <span className="text-[#00f5d4]">Terminal Widget</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg"
          >
            Interact directly with ThinkCode's core system shell via interactive commands.
          </motion.p>
        </div>

        {/* Terminal Window Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#020b14]/90 border border-[#0077b6]/40 shadow-[0_0_50px_rgba(0,119,182,0.25)] overflow-hidden font-mono text-sm backdrop-blur-xl"
        >
          {/* Terminal Title Bar */}
          <div className="px-6 py-4 bg-[#03254c]/60 border-b border-[#0077b6]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-400 font-semibold">thinkcode@ocean-node:~</span>
            </div>
            <button
              onClick={() => setHistory([])}
              title="Clear Console"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#03254c] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-[#020b14]/80 text-slate-200">
            {history.map((h, i) => (
              <div key={i} className="space-y-2">
                {h.command !== 'welcome' && (
                  <div className="flex items-center gap-2 text-[#00f5d4]">
                    <span>&gt;</span>
                    <span className="font-bold text-white">{h.command}</span>
                  </div>
                )}
                <div className="pl-4">{h.output}</div>
              </div>
            ))}

            {/* Command Input Form */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2 text-[#00f5d4]">
              <span>&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'bio', 'projects', 'dive'..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono text-sm"
              />
              <button type="submit" aria-label="Run command" className="text-slate-400 hover:text-[#00f5d4]">
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>

            <div ref={terminalEndRef} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
