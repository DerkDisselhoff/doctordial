import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const hostname = window.location.hostname;
  const isAppSubdomain = hostname.startsWith('app.');

  useEffect(() => {
    // Check authentication status
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  // If on app subdomain but not authenticated, redirect to login
  if (isAppSubdomain && isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // If on marketing site but authenticated and trying to access dashboard, redirect to app subdomain
  if (!isAppSubdomain && isAuthenticated && window.location.pathname.startsWith('/dashboard')) {
    window.location.href = `https://app.${hostname.replace('www.', '')}/dashboard`;
    return null;
  }

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {isAppSubdomain ? (
            // App routes (protected)
            <>
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            // Marketing routes
            <>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;