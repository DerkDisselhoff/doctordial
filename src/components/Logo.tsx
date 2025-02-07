
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-3 hover:opacity-80 transition-all duration-200 ${linkClassName}`}
    >
      <Stethoscope className="w-7 h-7 text-mint" />
      <h1 className={`text-2xl font-medium tracking-tight ${className}`}>
        DoctorDial
      </h1>
    </Link>
  );
}
