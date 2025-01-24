import { Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface LogoProps {
  className?: string;
  linkClassName?: string;
}

export function Logo({ className = "", linkClassName = "" }: LogoProps) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const [practiceName, setPracticeName] = useState<string | null>(null);

  useEffect(() => {
    const fetchPracticeName = async () => {
      if (isDashboard) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('company_name')
            .eq('id', session.user.id)
            .single();
          
          if (profile?.company_name) {
            setPracticeName(profile.company_name);
          }
        }
      }
    };
    fetchPracticeName();
  }, [isDashboard]);

  if (isDashboard) {
    return (
      <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
        <Stethoscope className="w-6 h-6 text-mint" />
        <div className="flex flex-col">
          <h1 className={`text-xl font-semibold tracking-tight ${className}`}>
            {practiceName || "Loading..."}
          </h1>
          <span className="text-xs text-gray">Powered by DoctorDial</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/" className={`flex items-center space-x-3 transition-all hover:opacity-80 ${linkClassName}`}>
      <Stethoscope className="w-6 h-6 text-mint" />
      <h1 className={`text-xl font-semibold tracking-tight ${className}`}>
        DoctorDial
      </h1>
    </Link>
  );
}