
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <Stethoscope className="w-6 h-6 text-mint" />
      <h1 className={`font-serif italic text-xl tracking-wide bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent ${className}`}>
        DoctorDial
      </h1>
    </Link>
  );
}
