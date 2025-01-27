import { Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <Stethoscope className="w-6 h-6 text-mint" />
      <h1 className={`text-xl font-semibold tracking-tight ${className}`}>
        DoctorDial
      </h1>
    </Link>
  );
}