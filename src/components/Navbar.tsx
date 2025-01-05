import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogIn, Menu, X } from "lucide-react";

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isHomePage ? 'bg-forest-light/95 backdrop-blur-sm' : 'glass-nav'}`}>
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
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              to="/login"
              className="inline-flex items-center px-4 py-2 rounded-md bg-mint/10 text-mint hover:bg-mint/20 transition-colors border border-mint/20"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {t("nav.login")}
            </Link>
            <BookDemoForm />
          </div>

          <button 
            className="md:hidden p-2 text-white hover:text-mint transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 ${isHomePage ? 'bg-forest-light/95 backdrop-blur-sm' : 'bg-forest-light'} border-t border-mint/10 p-4 space-y-4`}>
            <div className="flex flex-col space-y-4">
              <Link 
                to="/features" 
                className="text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.features")}
              </Link>
              <Link 
                to="/pricing" 
                className="text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.pricing")}
              </Link>
              <Link 
                to="/about" 
                className="text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link 
                to="/contact" 
                className="text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>
            </div>
            <div className="flex flex-col space-y-4 pt-4 border-t border-mint/10">
              <LanguageSwitcher />
              <Link 
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-mint/10 text-mint hover:bg-mint/20 transition-colors border border-mint/20"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {t("nav.login")}
              </Link>
              <BookDemoForm />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;