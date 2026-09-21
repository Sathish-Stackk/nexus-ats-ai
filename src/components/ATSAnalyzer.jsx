import React, { useState } from 'react';
import { FileSearch, Sparkles, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Zap, Target, Layers, FileCode, Check } from 'lucide-react';
import { analyzeResumeVsJD } from '../services/aiEngine';
import confetti from 'canvas-confetti';

const SAMPLE_DATA = {
  sde: {
    resume: `ALEX JOHNSON
Computer Science & Engineering Graduate (B.Tech CSE)
Email: alex.johnson@example.com | Mobile: +1 555 019 2834 | GitHub: github.com/alex-dev | LinkedIn: linkedin.com/in/alex

SUMMARY
Passionate Computer Science graduate with expertise in Full-Stack Web Development, Microservices Architecture, and Distributed Systems. Proven track record in building high-throughput web applications with React, Node.js, and Redis.

TECHNICAL SKILLS
- Languages: JavaScript, TypeScript, Python, Java, SQL, C++, HTML5, CSS3
- Frameworks & Libraries: React, Node.js, Express, Next.js, FastAPI, Tailwind CSS
- Databases & Caching: PostgreSQL, MongoDB, Redis, Vector Databases (Qdrant)
- Tools & Cloud: Docker, Git, GitHub Actions, AWS S3, Linux, WebSockets, REST APIs

PROJECTS
NexusATS - Autonomous AI Resume Architect & Interview Copilot (2026)
- Architected a multi-agent resume parsing platform utilizing TF-IDF term vectors and cosine similarity algorithms, achieving 94% ATS parsing precision.
- Built an interactive real-time technical interview simulator handling 5,000+ mock interactions via WebSockets.
- Engineered single-column ATS PDF generator, improving parsing success rate across 10+ target ATS platforms.

Distributed Log Analytics Stream Engine (2025)
- Developed a high-throughput event logging pipeline in FastAPI handling 10,000+ logs/sec with <15ms latency.
- Implemented sliding window rate-limiting algorithm and Docker containerized setup with automated CI/CD pipeline.`,
    jd: `Role: Software Development Engineer I (SDE-1)
Company: Top Tech Firm

Requirements:
- Bachelor's degree in Computer Science, Software Engineering, or related CSE field.
- Strong proficiency in JavaScript, TypeScript, Python, or C++.
- Hands-on experience with modern Web Frameworks (React, Node.js, Express, or Next.js).
- Deep understanding of REST APIs, Microservices, WebSockets, and Distributed Systems.
- Experience with Relational & NoSQL databases (PostgreSQL, MongoDB, Redis caching).
- Familiarity with Cloud & DevOps tools: Docker, AWS, Git, CI/CD pipelines.
- Excellent understanding of Data Structures & Algorithms, OOP principles, and system design.`
  }
};

export default function ATSAnalyzer({ onAnalysisComplete }) {
  const [resumeText, setResumeText] = useState(SAMPLE_DATA.sde.resume);
  const [jdText, setJdText] = useState(SAMPLE_DATA.sde.jd);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleScan = () => {
    if (!resumeText.trim() || !jdText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const data = analyzeResumeVsJD(resumeText, jdText);
      setResults(data);
      setIsAnalyzing(false);
      if (onAnalysisComplete) onAnalysisComplete(data);

      if (data.overallATSScore >= 80) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 900);
  };

  return (
    <div className="space-[#space] space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="glass-panel p-6 lg:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
              <Zap className="w-3.5 h-3.5" /> TF-IDF NLP Engine Active
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Multi-Agent <span className="text-cyan-400">ATS Resume Scanner</span> & Vector Auditor
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Upload or paste your resume alongside a target Job Description. Our multi-agent parser computes ATS compliance, hard-skill coverage, vector semantic similarity, and actionable bullet metrics.
            </p>
          </div>
          <button
            onClick={handleScan}
            disabled={isAnalyzing}
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Vectors...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-200" />
                Run ATS Vector Audit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Input Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Input */}
        <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" /> Candidate Resume Text / Markdown
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {resumeText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your full resume text here..."
            className="w-full h-72 bg-slate-900/90 text-slate-200 text-xs font-mono p-4 rounded-xl border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        {/* Job Description Input */}
        <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" /> Target Job Description (JD)
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {jdText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste target job position requirements..."
            className="w-full h-72 bg-slate-900/90 text-slate-200 text-xs font-mono p-4 rounded-xl border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
          />
        </div>
      </div>

      {/* Scan Results Output */}
      {results && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Overall Score */}
            <div className="glass-card p-5 rounded-xl border border-indigo-500/30 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-1 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center flex-col">
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">
                    {results.overallATSScore}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Overall ATS Score</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {results.overallATSScore >= 80 ? '🔥 High Candidate Match' : '⚠️ Action Needed'}
                </p>
              </div>
            </div>

            {/* Vector Similarity */}
            <div className="glass-card p-5 rounded-xl border border-cyan-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-300">
                {results.vectorMatchScore}%
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Vector Match</p>
                <p className="text-xs text-slate-200 mt-1">TF-IDF Semantic Similarity</p>
              </div>
            </div>

            {/* Skill Coverage */}
            <div className="glass-card p-5 rounded-xl border border-purple-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-purple-300">
                {results.skillCoveragePercent}%
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Skill Coverage</p>
                <p className="text-xs text-slate-200 mt-1">{results.matchedSkills.length} of {results.matchedSkills.length + results.missingSkills.length} Tech Keywords</p>
              </div>
            </div>

            {/* Metrics Audit */}
            <div className="glass-card p-5 rounded-xl border border-emerald-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-300">
                {results.metricsCount}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Quantified Metrics</p>
                <p className="text-xs text-slate-200 mt-1">Numbers & Impact bullets</p>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4" /> Matched Technical Keywords ({results.matchedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.matchedSkills.length > 0 ? (
                  results.matchedSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                      ✓ {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 font-mono">No matching skills detected.</span>
                )}
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-red-500/20">
              <h3 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4" /> Missing Keywords (Action Required) ({results.missingSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.missingSkills.length > 0 ? (
                  results.missingSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-300">
                      + {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-300 font-mono">🎉 Perfect skill alignment! No missing skills.</span>
                )}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> ATS Optimization Recommendations
            </h3>
            <div className="space-y-3">
              {results.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{rec.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{rec.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
