import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-20 px-4 border-t border-mint/10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">DoctorDial</h3>
            <p className="text-white/60 max-w-xs">
              Transformeer patiëntgesprekken naar praktijkefficiëntie met AI-gestuurde gespreksbeheersoplossingen.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-white/60 hover:text-mint transition-colors">Functies</Link></li>
              <li><Link to="/pricing" className="text-white/60 hover:text-mint transition-colors">Prijzen</Link></li>
              <li><Link to="/enterprise" className="text-white/60 hover:text-mint transition-colors">Zakelijk</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Bedrijf</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/60 hover:text-mint transition-colors">Over Ons</Link></li>
              <li><Link to="/careers" className="text-white/60 hover:text-mint transition-colors">Vacatures</Link></li>
              <li><Link to="/blog" className="text-white/60 hover:text-mint transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Juridisch</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/60 hover:text-mint transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-white/60 hover:text-mint transition-colors">Voorwaarden</Link></li>
              <li><Link to="/security" className="text-white/60 hover:text-mint transition-colors">Beveiliging</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-mint/10 mt-16 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} DoctorDial. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;