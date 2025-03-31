
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "./Logo";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative pt-8 pb-12 md:pt-12 md:pb-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-mint-light/80 to-sage-light/90 -z-10" />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo className="text-gray-dark" />
            <p className="text-body-sm md:text-body max-w-xs">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-medium mb-3 md:mb-4 text-gray-dark">{t("footer.navigation")}</h4>
            <ul className="space-sm">
              <li>
                <Link 
                  to="/about" 
                  className="text-body-sm hover:text-blue-dark transition-colors"
                >
                  {t("footer.about")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-medium mb-3 md:mb-4 text-gray-dark">Legal</h4>
            <ul className="space-sm">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-body-sm hover:text-blue-dark transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-body-sm hover:text-blue-dark transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-muted/30 mt-12 md:mt-16 pt-6 md:pt-8 text-center">
          <p className="text-body-sm text-gray">
            &copy; {currentYear} DoctorDial. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
