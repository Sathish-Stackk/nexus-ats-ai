import React, { useState } from 'react';
import { Download, Sparkles, FileText, Check, Layers, Code, User, Briefcase, GraduationCap } from 'lucide-react';
import { exportToATSPDF } from '../services/pdfExporter';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: 'ALEX JOHNSON',
    title: 'Computer Science & Engineering Graduate | Full-Stack Developer',
    contact: 'alex.johnson@example.com | +1 (555) 019-2834 | github.com/alex-dev | linkedin.com/in/alex',
    summary: 'Computer Science graduate with expertise in Full-Stack Web Applications, Agentic AI Workflows, Microservices Architecture, and Distributed Systems. Passionate about building high-throughput low-latency software.',
    skills: {
      languages: 'JavaScript, TypeScript, Python, Java, C++, SQL, HTML5, CSS3',
      frameworks: 'React, Node.js, Express, Next.js, FastAPI, Tailwind CSS, Vite',
      databases: 'PostgreSQL, MongoDB, Redis, Qdrant Vector DB, Docker, Git'
    },
    projects: [
      {
        name: 'NexusATS - Autonomous AI Resume Architect & Interview Copilot',
        tech: 'React, Node.js, Vector Similarity NLP Engine, Chart.js, PDF Engine',
        bullets: [
          'Architected a multi-agent resume parsing platform utilizing TF-IDF term vectors and cosine similarity algorithms, achieving 94% ATS parsing precision.',
          'Built an interactive real-time technical interview simulator handling 5,000+ mock interactions via WebSockets.',
          'Engineered single-column ATS PDF generator, improving parsing success rate across 10+ target ATS platforms.'
        ]
      },
      {
        name: 'Distributed Real-Time Log Analytics Pipeline',
        tech: 'Python, FastAPI, Redis Pub/Sub, Docker, WebSockets, Chart.js',
        bullets: [
          'Developed a high-throughput event logging pipeline in FastAPI handling 10,000+ logs/sec with <15ms latency.',
          'Implemented sliding window rate-limiting algorithm and Docker containerized setup with automated CI/CD pipeline.'
        ]
      }
    ]
  });

  const handleExport = () => {
    exportToATSPDF(formData);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            Single-Column ATS Standard Exporter
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            ATS-Compliant <span className="text-cyan-400">Resume Builder & Exporter</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build your resume using recruiter-recommended single-column layouts that parse seamlessly across Taleo, Workday, Greenhouse, and Lever.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4" /> Export ATS-Clean PDF
        </button>
      </div>

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane: Form Editor */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5 h-[650px] overflow-y-auto">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" /> Header Details
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[11px] text-slate-400">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 p-2.5 rounded-lg border border-white/10 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Professional Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-900 p-2.5 rounded-lg border border-white/10 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Contact Line (Email | Phone | GitHub | LinkedIn)</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full bg-slate-900 p-2.5 rounded-lg border border-white/10 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Professional Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={3}
                className="w-full bg-slate-900 p-2.5 rounded-lg border border-white/10 text-white mt-1 resize-none"
              />
            </div>
          </div>

          <h3 className="text-sm font-bold text-white flex items-center gap-2 pt-3">
            <Code className="w-4 h-4 text-cyan-400" /> Technical Skills
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[11px] text-slate-400">Languages & Core</label>
              <input
                type="text"
                value={formData.skills.languages}
                onChange={(e) => setFormData({ ...formData, skills: { ...formData.skills, languages: e.target.value } })}
                className="w-full bg-slate-900 p-2.5 rounded-lg border border-white/10 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Frameworks & Libraries</label>
              <input
                type="text"
                value={formData.skills.frameworks}
                onChange={(e) => setFormData({ ...formData, skills: { ...formData.skills, frameworks: e.target.value } })}
                className="w-full bg-slate-900 p-2.5 rounded-lg border border-white/10 text-white mt-1"
              />
            </div>
          </div>
        </div>

        {/* Right Pane: Live Document Preview */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col h-[650px] bg-slate-950/80">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" /> Live Single-Column ATS Document Preview
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
              100% Parsable Format
            </span>
          </div>

          {/* Document Render Box */}
          <div className="flex-1 bg-white text-slate-900 p-8 rounded-xl shadow-2xl overflow-y-auto text-xs font-sans space-y-4 selection:bg-indigo-100">
            {/* Header */}
            <div>
              <h1 className="text-xl font-extrabold uppercase tracking-wide text-slate-900">{formData.name}</h1>
              <p className="text-slate-700 font-semibold text-[11px] mt-0.5">{formData.title}</p>
              <p className="text-slate-500 text-[10px] mt-1">{formData.contact}</p>
            </div>

            <hr className="border-slate-300" />

            {/* Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1">
                Professional Summary
              </h2>
              <p className="text-[11px] leading-relaxed text-slate-800">{formData.summary}</p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1">
                Technical Skills
              </h2>
              <p className="text-[11px] text-slate-800"><span className="font-semibold">Languages:</span> {formData.skills.languages}</p>
              <p className="text-[11px] text-slate-800"><span className="font-semibold">Frameworks:</span> {formData.skills.frameworks}</p>
              <p className="text-[11px] text-slate-800"><span className="font-semibold">Databases & Tools:</span> {formData.skills.databases}</p>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1">
                Technical Projects
              </h2>
              {formData.projects.map((proj, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-bold text-[11px] text-slate-900">{proj.name} <span className="font-normal text-slate-600">[{proj.tech}]</span></p>
                  <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[10.5px] text-slate-800">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1">
                Education
              </h2>
              <p className="font-bold text-[11px] text-slate-900">Bachelor of Technology in Computer Science & Engineering (B.Tech CSE)</p>
              <p className="text-[10.5px] text-slate-600">GPA: 3.8 / 4.0 | Expected Graduation: 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
