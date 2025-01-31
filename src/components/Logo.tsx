
import { Link } from "react-router-dom";
import { Signature } from "lucide-react";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <Signature 
        className="w-6 h-6 text-gray-dark stroke-[1.25]" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <h1 
        className={`text-xl tracking-wide font-light italic text-gray-dark 
        ${className}`}
        style={{
          textShadow: '0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1)',
          letterSpacing: '0.05em'
        }}
      >
        DoctorDial
      </h1>
    </Link>
  );
}
