import { Link } from "react-router-dom";
import { BookDemoForm } from "./BookDemoForm";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          DoctorDial
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-white/90 hover:text-white transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-white/90 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="text-white/90 hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-white/90 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <BookDemoForm />
      </div>
    </nav>
  );
};

export default Navbar;