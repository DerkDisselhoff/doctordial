import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ClientDistributionChart } from "./ClientDistributionChart";
import { CallVolumeChart } from "./CallVolumeChart";
import { UrgentCases } from "../client/UrgentCases";

export function DashboardCharts() {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setUserRole(profile?.role || null);
      }
    };

    checkUserRole();
  }, []);

  if (userRole === 'client') {
    return (
      <div className="grid grid-cols-1 gap-8">
        <UrgentCases />
      </div>
    );
  }

  // Return original admin view with improved styling
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ClientDistributionChart />
      <CallVolumeChart />
    </div>
  );
}