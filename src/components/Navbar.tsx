import { Link } from "react-router-dom";
import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogIn, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-white">
              DoctorDial
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-white/90 hover:text-white transition-colors">
                {t("nav.features")}
              </Link>
              <Link to="/pricing" className="text-white/90 hover:text-white transition-colors">
                {t("nav.pricing")}
              </Link>
              <Link to="/about" className="text-white/90 hover:text-white transition-colors">
                {t("nav.about")}
              </Link>
              <Link to="/contact" className="text-white/90 hover:text-white transition-colors">
                {t("nav.contact")}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Link 
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 rounded-md bg-mint/10 text-mint hover:bg-mint/20 transition-colors border border-mint/20"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                {t("nav.dashboard")}
              </Link>
            ) : (
              <Link 
                to="/login"
                className="inline-flex items-center px-4 py-2 rounded-md bg-mint/10 text-mint hover:bg-mint/20 transition-colors border border-mint/20"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {t("nav.login")}
              </Link>
            )}
            <BookDemoForm />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;