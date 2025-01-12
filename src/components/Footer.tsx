import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "./Logo";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-20 px-4 border-t border-mint/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo className="text-white" />
            <p className="text-white/60 max-w-xs">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-white/60 hover:text-mint transition-colors">{t("nav.features")}</Link></li>
              <li><Link to="/pricing" className="text-white/60 hover:text-mint transition-colors">{t("nav.pricing")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/60 hover:text-mint transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="/blog" className="text-white/60 hover:text-mint transition-colors">{t("footer.blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/60 hover:text-mint transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="text-white/60 hover:text-mint transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-mint/10 mt-16 pt-8 text-center text-white/60">
          <p>&copy; {currentYear} DoctorDial. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;