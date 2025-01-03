import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-20 px-4 border-t border-mint/10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">DoctorDial</h3>
            <p className="text-white/60 max-w-xs">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-white/60 hover:text-mint transition-colors">{t("nav.features")}</Link></li>
              <li><Link to="/pricing" className="text-white/60 hover:text-mint transition-colors">{t("nav.pricing")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/60 hover:text-mint transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="/careers" className="text-white/60 hover:text-mint transition-colors">{t("footer.careers")}</Link></li>
              <li><Link to="/blog" className="text-white/60 hover:text-mint transition-colors">{t("footer.blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/60 hover:text-mint transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="text-white/60 hover:text-mint transition-colors">{t("footer.terms")}</Link></li>
              <li><Link to="/security" className="text-white/60 hover:text-mint transition-colors">{t("footer.security")}</Link></li>
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