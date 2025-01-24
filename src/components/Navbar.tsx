import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogIn, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-8">
            <Logo className="text-gray-900" />
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/features" 
                className={cn(
                  "nav-link",
                  location.pathname === "/features" && "nav-link-active"
                )}
              >
                {t("nav.features")}
              </Link>
              <Link 
                to="/pricing" 
                className={cn(
                  "nav-link",
                  location.pathname === "/pricing" && "nav-link-active"
                )}
              >
                {t("nav.pricing")}
              </Link>
              <Link 
                to="/about" 
                className={cn(
                  "nav-link",
                  location.pathname === "/about" && "nav-link-active"
                )}
              >
                {t("nav.about")}
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              to="/login"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {t("nav.login")}
            </Link>
            <BookDemoForm />
          </div>

          <button 
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg animate-fade-down">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/features" 
                className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.features")}
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.pricing")}
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
            </div>
            <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100">
              <LanguageSwitcher />
              <Link 
                to="/login"
                className="inline-flex items-center justify-center px-4 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-lg font-medium"
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