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