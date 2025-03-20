
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import DemoRequest from './pages/DemoRequest';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from "@/components/ui/toaster"
import KnowledgeBaseDetail from './pages/KnowledgeBaseDetail';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo-request" element={<DemoRequest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/knowledge-base/:id" element={<KnowledgeBaseDetail />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <Toaster />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
