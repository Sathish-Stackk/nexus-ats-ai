import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ATSAnalyzer from './components/ATSAnalyzer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import InterviewCopilot from './components/InterviewCopilot';
import ResumeBuilder from './components/ResumeBuilder';
import ResumeGuide from './components/ResumeGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="px-4 lg:px-8 py-8">
          {activeTab === 'analyzer' && (
            <ATSAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard analysisData={analysisData} />
          )}

          {activeTab === 'copilot' && (
            <InterviewCopilot />
          )}

          {activeTab === 'builder' && (
            <ResumeBuilder />
          )}

          {activeTab === 'guide' && (
            <ResumeGuide />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
