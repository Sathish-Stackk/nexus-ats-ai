import React, { useState, useEffect } from 'react';
import { Terminal, Play, Volume2, Sparkles, CheckCircle2, RotateCcw, Code, Send, Cpu, Award } from 'lucide-react';
import { generateInterviewQuestion, evaluateInterviewAnswer } from '../services/aiEngine';

export default function InterviewCopilot() {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [candidateCode, setCandidateCode] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const q = generateInterviewQuestion('', '', questionIndex);
    setCurrentQuestion(q);
    setCandidateCode(q.codeTemplate);
    setEvaluation(null);
  }, [questionIndex]);

  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${currentQuestion?.title}. ${currentQuestion?.prompt}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleEvaluate = () => {
    if (!candidateCode.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      const res = evaluateInterviewAnswer(currentQuestion, candidateCode);
      setEvaluation(res);
      setIsEvaluating(false);
    }, 700);
  };

  const handleNextQuestion = () => {
    setQuestionIndex(prev => prev + 1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-2">
            <Terminal className="w-3.5 h-3.5" /> Simulated Live WebSockets Interview Stream
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Real-Time <span className="text-purple-400">Technical Interview Copilot</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Practice live system design, data structures, and algorithmic trade-offs tailored to your candidate profile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSpeakQuestion}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
              isSpeaking
                ? 'bg-purple-600 text-white border-purple-400 animate-pulse'
                : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-white/5'
            }`}
          >
            <Volume2 className="w-4 h-4 text-purple-300" />
            {isSpeaking ? 'Stop Voice Prompt' : 'Read Voice Prompt'}
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md"
          >
            Next Question →
          </button>
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Pane: Question Prompt & AI Voice Simulation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Question #{questionIndex} • {currentQuestion?.type}
              </span>
              <span className="text-xs text-slate-400 font-mono">CSE Senior Rubric</span>
            </div>

            <h2 className="text-base font-bold text-white leading-snug">
              {currentQuestion?.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-white/5 font-sans">
              {currentQuestion?.prompt}
            </p>

            <div className="pt-2">
              <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">Key Focus Topics:</h4>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">#SystemDesign</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">#Big-O Complexity</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">#Caching & Redis</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">#Concurrency</span>
              </div>
            </div>
          </div>

          {/* Evaluation Rubric Results */}
          {evaluation && (
            <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" /> AI Rubric Evaluation
                </span>
                <span className="text-lg font-extrabold text-cyan-400 font-mono">
                  {evaluation.score} / 10
                </span>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-200">
                Verdict: {evaluation.verdict}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {evaluation.feedback}
              </p>

              <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-center">
                <div className="p-2 rounded-lg bg-slate-900/80 border border-white/5">
                  <p className="text-slate-400">Architecture</p>
                  <p className="text-sm font-bold text-indigo-400 mt-0.5">{evaluation.rubricScores.architecture}/10</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-white/5">
                  <p className="text-slate-400">Code Quality</p>
                  <p className="text-sm font-bold text-cyan-400 mt-0.5">{evaluation.rubricScores.codeQuality}/10</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-white/5">
                  <p className="text-slate-400">Clarity</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{evaluation.rubricScores.clarity}/10</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Code Playground & Submission */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col h-[480px]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" /> Candidate Solution Workspace
              </span>
              <span className="text-[11px] font-mono text-slate-400">Monospace Editor</span>
            </div>

            <textarea
              value={candidateCode}
              onChange={(e) => setCandidateCode(e.target.value)}
              placeholder="Type your explanation, pseudocode, or architectural design solution..."
              className="w-full flex-1 bg-slate-950/90 text-cyan-300 font-mono text-xs p-4 rounded-xl border border-white/5 focus:border-purple-500 outline-none resize-none leading-relaxed"
            />

            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={() => setCandidateCode(currentQuestion?.codeTemplate || '')}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Template
              </button>

              <button
                onClick={handleEvaluate}
                disabled={isEvaluating}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                {isEvaluating ? (
                  <>Evaluating Rubric...</>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Solution for Rubric Score
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
