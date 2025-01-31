import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M4.5 12.5C4.5 8.5 7 6 12 6C17 6 19.5 8.5 19.5 12.5C19.5 16.5 17 19 12 19C7 19 4.5 16.5 4.5 12.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-mint"
        />
        <path
          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
          fill="currentColor"
          className="text-mint"
        />
        <path
          d="M12 6V2M12 22V19M4.5 12.5H2M22 12.5H19.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-mint"
        />
      </svg>
      <h1 className={`text-xl font-semibold tracking-tight ${className}`}>
        DoctorDial
      </h1>
    </Link>
  );
}