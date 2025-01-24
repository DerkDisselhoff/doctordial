import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "./Logo";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 md:py-20 px-4 bg-surface-secondary">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo className="text-text-primary w-32 md:w-auto" />
            <p className="text-sm md:text-base text-text-secondary max-w-xs">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3 md:mb-4 text-text-primary text-sm md:text-base">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">{t("nav.features")}</Link></li>
              <li><Link to="/pricing" className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">{t("nav.pricing")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 md:mb-4 text-text-primary text-sm md:text-base">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="/blog" className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">{t("footer.blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 md:mb-4 text-text-primary text-sm md:text-base">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-input mt-12 md:mt-16 pt-6 md:pt-8 text-center text-text-secondary">
          <p className="text-sm md:text-base">&copy; {currentYear} DoctorDial. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;