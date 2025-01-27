import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <div className="relative w-8 h-8">
        {/* Heartbeat line SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="animate-draw"
            d="M1 13h4l3-6 4 12 3-6h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              stroke: '#10B981',
              strokeDasharray: 1,
              strokeDashoffset: 0
            }}
          />
        </svg>
      </div>
      <h1 className={`text-xl font-semibold tracking-tight ${className}`}>
        Doctor<span className="text-mint">Dial</span>
      </h1>
    </Link>
  );
}