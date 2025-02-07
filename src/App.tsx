
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import About from "@/pages/About";
import DemoRequest from "@/pages/DemoRequest";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import { LanguageProvider } from "@/contexts/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo-request" element={<DemoRequest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </Router>
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
};

export default App;
