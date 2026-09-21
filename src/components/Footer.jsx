import React from 'react';
import { Cpu, Github, Linkedin, Shield, Code, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 glass-panel py-8 px-4 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <div>
            <p className="font-semibold text-slate-200">NexusATS Architect Engine</p>
            <p className="text-slate-400 text-[11px]">4th Year CSE Capstone & Production Technical Resume Platform</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer transition">
            <Code className="w-3.5 h-3.5 text-indigo-400" /> TF-IDF NLP Vectors
          </span>
          <span className="flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer transition">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> WebSockets Copilot
          </span>
          <span className="flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer transition">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> ATS Compliance Engine
          </span>
        </div>

        <p className="text-[11px] text-slate-400 font-mono">
          Designed for CSE High-ATS Job Applications © 2026
        </p>
      </div>
    </footer>
  );
}
