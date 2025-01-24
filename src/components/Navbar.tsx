import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogIn, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-forest-light/95 backdrop-blur-sm border-b border-mint/10">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo className="text-white w-32 md:w-auto" />
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
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-forest-light/95 backdrop-blur-sm border-t border-mint/10 p-4 space-y-4 animate-fade-down">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/features" 
                className="text-white/90 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.features")}
              </Link>
              <Link 
                to="/pricing" 
                className="text-white/90 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.pricing")}
              </Link>
              <Link 
                to="/about" 
                className="text-white/90 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
            </div>
            <div className="flex flex-col space-y-4 pt-4 border-t border-mint/10">
              <LanguageSwitcher />
              <Link 
                to="/login"
                className="inline-flex items-center justify-center px-4 py-3 rounded-md bg-mint/10 text-mint hover:bg-mint/20 transition-colors border border-mint/20 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5 mr-2" />
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