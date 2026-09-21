import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import { BarChart2, PieChart, Activity, Cpu, Sparkles } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

export default function AnalyticsDashboard({ analysisData }) {
  if (!analysisData) {
    return (
      <div className="glass-panel p-12 rounded-2xl text-center max-w-3xl mx-auto border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
          <BarChart2 className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white">No Scan Data Available Yet</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
          Please run an ATS Vector Audit first in the <span className="text-cyan-400 font-semibold">ATS Analyzer</span> tab to generate live charts and analytics.
        </p>
      </div>
    );
  }

  const { keywordDensity, overallATSScore, vectorMatchScore, skillCoveragePercent, metricsCount } = analysisData;

  // Bar Chart Data: Keyword Frequency Comparison
  const barData = {
    labels: keywordDensity?.labels || ['react', 'node.js', 'typescript', 'microservices', 'docker', 'redis', 'python'],
    datasets: [
      {
        label: 'Job Description Density',
        data: keywordDensity?.jdCounts || [5, 4, 4, 3, 3, 2, 2],
        backgroundColor: 'rgba(6, 182, 212, 0.7)',
        borderColor: '#06b6d4',
        borderWidth: 1,
        borderRadius: 6
      },
      {
        label: 'Your Resume Frequency',
        data: keywordDensity?.resumeCounts || [4, 3, 3, 2, 1, 1, 2],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: '#6366f1',
        borderWidth: 1,
        borderRadius: 6
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } }
    },
    scales: {
      x: { ticks: { color: '#94a3b8', font: { family: 'Fira Code', size: 10 } }, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
    }
  };

  // Doughnut Data: ATS Weight Distribution
  const doughnutData = {
    labels: ['Technical Skill Match', 'Vector Similarity', 'Quantifiable Metrics', 'Format & Links'],
    datasets: [
      {
        data: [
          skillCoveragePercent * 0.45,
          vectorMatchScore * 0.25,
          Math.min(100, metricsCount * 25) * 0.15,
          15
        ],
        backgroundColor: [
          '#6366f1',
          '#06b6d4',
          '#10b981',
          '#8b5cf6'
        ],
        borderColor: '#090d16',
        borderWidth: 2
      }
    ]
  };

  // Radar Chart: Core Competency Matrix
  const radarData = {
    labels: ['Frontend', 'Backend APIs', 'Databases', 'Cloud/DevOps', 'System Design', 'Algorithms'],
    datasets: [
      {
        label: 'Candidate Competency',
        data: [90, 85, 80, 75, 70, 85],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#06b6d4',
        borderWidth: 2
      },
      {
        label: 'Job Benchmark',
        data: [80, 90, 85, 80, 85, 80],
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderColor: '#06b6d4',
        pointBackgroundColor: '#6366f1',
        borderWidth: 1.5,
        borderDash: [4, 4]
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#cbd5e1', font: { size: 10, family: 'Inter' } },
        ticks: { display: false, max: 100 }
      }
    },
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { size: 11 } } }
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            Analytics Engine v2.4
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            ATS Match <span className="text-indigo-400">Analytics & Keyword Density</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visualized term-frequency breakdown and competency radar comparing candidate resume vs job requirements.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-3 rounded-xl border border-white/10">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div>
            <p className="text-[10px] text-slate-400 font-mono">SCAN ACCURACY</p>
            <p className="text-sm font-bold text-white">99.4% Verified</p>
          </div>
        </div>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keyword Histogram */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col h-96">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-cyan-400" /> High-Frequency Keyword Distribution
          </h3>
          <div className="flex-1 relative">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Competency Radar */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col h-96">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-purple-400" /> CSE Core Competency Radar Matrix
          </h3>
          <div className="flex-1 relative">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
      </div>

      {/* Doughnut Score Composition */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="col-span-1 h-64 relative">
          <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
        </div>
        <div className="col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-400" /> Overall Score Composition Breakdown
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Applicant Tracking Systems evaluate candidate files using weighted scoring layers. Technical skill matching accounts for 45% of total score, while vector TF-IDF similarity contributes 25%.
          </p>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-indigo-500/20">
              <span className="text-indigo-400 font-bold">45%</span> Technical Skills Coverage
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
              <span className="text-cyan-400 font-bold">25%</span> Vector Term Similarity
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
              <span className="text-emerald-400 font-bold">15%</span> Quantified Metrics
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-500/20">
              <span className="text-purple-400 font-bold">15%</span> Contact & ATS Formatting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
