import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import DrSarah from "@/pages/DrSarah";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Billing from "@/pages/Billing";
import "./App.css";

function App() {
  useEffect(() => {
    // Check if the browser supports variable fonts
    document.documentElement.classList.toggle('has-inter-var', CSS.supports('font-variation-settings', '"wght" 400'));
    
    // Log font loading status
    if (document.fonts) {
      document.fonts.ready.then(() => {
        console.log('Inter font has loaded');
      }).catch((error) => {
        console.error('Error loading Inter font:', error);
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/dr-sarah" element={<DrSarah />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/billing" element={<Billing />} />
    </Routes>
  );
}

export default App;