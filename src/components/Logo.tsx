import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-draw"
      >
        {/* Stethoscope head (circle) */}
        <circle
          cx="16"
          cy="20"
          r="4"
          className="stroke-mint"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="25"
          strokeDashoffset="25"
          style={{
            animation: "drawCircle 1s ease forwards 0.5s",
          }}
        />
        
        {/* Heart shape formed by stethoscope tube */}
        <path
          d="M16 20 C16 14 13 10 8 10 C3 10 3 16 8 20 L16 28 L24 20 C29 16 29 10 24 10 C19 10 16 14 16 20"
          className="stroke-mint fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{
            animation: "drawPath 1.5s ease forwards",
          }}
        />
      </svg>
      <h1 className={`text-xl font-semibold tracking-tight ${className}`}>
        DoctorDial
      </h1>
    </Link>
  );
}