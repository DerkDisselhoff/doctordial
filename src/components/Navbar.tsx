import { Link } from "react-router-dom";
import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useLanguage();

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
            <BookDemoForm />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;