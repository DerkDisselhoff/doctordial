import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MarketingRoutes } from "./routes/MarketingRoutes";
import { AppRoutes } from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    // Check if we're on the app subdomain
    setIsApp(window.location.host.startsWith('app.'));
  }, []);

  if (isApp) {
    return (
      <Router>
        <AppRoutes />
      </Router>
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <MarketingRoutes />
      </Router>
    </LanguageProvider>
  );
}

export default App;