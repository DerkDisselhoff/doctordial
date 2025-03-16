
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-muted">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo className="text-gray-dark" linkClassName="py-1" />
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/about" 
                className="py-2 text-gray hover:text-gray-dark transition-colors border-b-2 border-transparent hover:border-mint"
              >
                {t("nav.about")}
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              to="/login"
              className="inline-flex items-center px-4 py-2 rounded-md bg-blue/10 text-blue-dark hover:bg-blue/20 transition-colors border border-blue/20"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {t("nav.login")}
            </Link>
            <Link
              to="/demo-request"
              className="inline-flex items-center px-6 py-3 rounded-full bg-blue-dark hover:bg-blue-dark/90 text-white font-medium transition-colors duration-300"
            >
              {t("nav.bookDemo")}
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-gray-dark hover:text-blue-dark transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-muted p-4 space-y-4 animate-fade-down">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/about" 
                className="text-gray hover:text-gray-dark transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
            </div>
            <div className="flex flex-col space-y-4 pt-4 border-t border-gray-muted">
              <LanguageSwitcher />
              <Link 
                to="/login"
                className="inline-flex items-center justify-center px-4 py-3 rounded-md bg-blue/10 text-blue-dark hover:bg-blue/20 transition-colors border border-blue/20 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5 mr-2" />
                {t("nav.login")}
              </Link>
              <Link
                to="/demo-request"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-dark hover:bg-blue-dark/90 text-white font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.bookDemo")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
