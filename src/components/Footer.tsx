
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "./Logo";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 md:py-20 px-4 border-t border-gray-muted bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo className="text-gray-dark" />
            <p className="text-sm md:text-base text-gray max-w-xs">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3 md:mb-4 text-gray-dark text-sm md:text-base">Navigatie</h4>
            <ul className="space-y-2">
              <li><Link to="/sarah" className="text-sm md:text-base text-gray hover:text-blue-dark transition-colors">Sarah</Link></li>
              <li><Link to="/about" className="text-sm md:text-base text-gray hover:text-blue-dark transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="/features" className="text-sm md:text-base text-gray hover:text-blue-dark transition-colors">{t("footer.features")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 md:mb-4 text-gray-dark text-sm md:text-base">Contact</h4>
            <ul className="space-y-2">
              <li><Link to="/demo" className="text-sm md:text-base text-gray hover:text-blue-dark transition-colors">{t("footer.bookDemo")}</Link></li>
              <li><Link to="/contact" className="text-sm md:text-base text-gray hover:text-blue-dark transition-colors">{t("footer.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 md:mb-4 text-gray-dark text-sm md:text-base">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm md:text-base text-gray hover:text-blue-dark transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="text-sm md:text-base text-gray hover:text-blue-dark transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-muted mt-12 md:mt-16 pt-6 md:pt-8 text-center text-gray">
          <p className="text-sm md:text-base">&copy; {currentYear} DoctorDial. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
