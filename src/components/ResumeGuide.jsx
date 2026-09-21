import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, Layers, Code, Cpu } from 'lucide-react';

export default function ResumeGuide() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const resumeBullets = [
    {
      title: "NexusATS - Autonomous AI Resume Architect & Live Interview Copilot",
      tech: "React, Node.js, Vector Similarity NLP Engine, Chart.js, PDF Engine",
      bullets: [
        "Architected a multi-agent resume parsing platform utilizing TF-IDF term vectors and cosine similarity algorithms, achieving 94% ATS parsing precision.",
        "Built an interactive real-time technical interview simulator handling 5,000+ mock interactions via WebSockets with automated rubric evaluations.",
        "Engineered single-column ATS PDF generator, improving parsing success rate across 10+ target ATS platforms (Workday, Taleo, Greenhouse).",
        "Developed interactive data visualization dashboard in Chart.js displaying keyword density heatmaps and skill coverage matrices."
      ]
    },
    {
      title: "Distributed Real-Time Log Analytics Stream Engine",
      tech: "Python, FastAPI, Redis Pub/Sub, Docker, WebSockets",
      bullets: [
        "Developed a high-throughput event logging pipeline in FastAPI handling 10,000+ logs/sec with <15ms latency.",
        "Implemented sliding window rate-limiting algorithm and Docker containerized setup with automated GitHub Actions CI/CD pipeline."
      ]
    }
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            4th-Year CSE Resume Blueprint
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            ATS Secrets & <span className="text-purple-400">Copy-Paste Project Resume Bullets</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Copy these quantified bullet points directly into your own resume to impress tech recruiters and bypass ATS software.
          </p>
        </div>
      </div>

      {/* Copyable Project Bullet Section */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" /> Copy-Paste Resume Bullet Points for NexusATS Project
        </h2>

        {resumeBullets.map((item, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-indigo-300">{item.title}</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">Tech Stack: {item.tech}</p>
              </div>
              <button
                onClick={() => handleCopy(`${item.title}\nTech Stack: ${item.tech}\n` + item.bullets.map(b => `• ${b}`).join('\n'), `all-${idx}`)}
                className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 text-xs font-mono flex items-center gap-1.5 transition"
              >
                {copiedIndex === `all-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === `all-${idx}` ? 'Copied Project Block!' : 'Copy Entire Block'}
              </button>
            </div>

            <ul className="space-y-2 font-sans text-xs text-slate-200">
              {item.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                  <span className="flex-1">
                    <strong className="text-cyan-300">•</strong> {bullet}
                  </span>
                  <button
                    onClick={() => handleCopy(bullet, `${idx}-${bIdx}`)}
                    className="p-1 text-slate-400 hover:text-white transition"
                    title="Copy bullet"
                  >
                    {copiedIndex === `${idx}-${bIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ATS Guidelines & Golden Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-4">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> 5 ATS Golden Rules (DOs)
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              Use clean, standard single-column PDF layout (no sidebars or complex multi-column div tables).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              Include quantified metrics in every project bullet (e.g. 94% precision, <15ms latency, 10k requests).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">3.</span>
              Explicitly match technical hard skills from the target job description in a dedicated "Technical Skills" section.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">4.</span>
              Start bullet points with strong action verbs: *Architected, Engineered, Optimized, Deployed, Developed*.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">5.</span>
              Keep section headers standard: "Technical Skills", "Projects", "Education", "Experience".
            </li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-red-500/20 space-y-4">
          <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> 5 Fatal ATS Mistakes (DON'Ts)
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">1.</span>
              Do NOT embed text inside images, Canva graphics, or complex SVGs (ATS parsers see blank space).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">2.</span>
              Do NOT place contact info inside Header/Footer margins of Word docs (often ignored by Taleo/Workday).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">3.</span>
              Do NOT submit generic 1-size-fits-all resumes. Tailor technical keywords for each specific position.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">4.</span>
              Do NOT write vague duty statements (e.g. "Worked on frontend features"). Write impact statements instead.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">5.</span>
              Avoid non-standard fonts; use Inter, Arial, Helvetica, or standard monospace system fonts.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
