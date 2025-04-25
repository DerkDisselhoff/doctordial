import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import DemoRequest from './pages/DemoRequest';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from "@/components/ui/toaster"
import KnowledgeBaseDetail from './pages/KnowledgeBaseDetail';
import VideoTutorial from './pages/dashboard/VideoTutorial';
import MedicalAdvisoryCouncil from './pages/MedicalAdvisoryCouncil';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/medical-advisory-council" element={<MedicalAdvisoryCouncil />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/demo-request" element={<DemoRequest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/knowledge-base/:id" element={<KnowledgeBaseDetail />} />
          <Route path="/dashboard/video-tutorial" element={<VideoTutorial />} />
        </Routes>
        <Toaster />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
