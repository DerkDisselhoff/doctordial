import { Routes, Route } from "react-router-dom";
import Index from "@/pages/marketing/Index";
import Features from "@/pages/marketing/Features";
import Pricing from "@/pages/marketing/Pricing";
import Login from "@/pages/marketing/Login";

export function MarketingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}