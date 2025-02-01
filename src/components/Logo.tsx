
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <Stethoscope className="w-5 h-5 text-mint mt-[2px]" />
      <span className={`text-lg font-semibold tracking-tight ${className}`}>
        DoctorDial
      </span>
    </Link>
  );
}
