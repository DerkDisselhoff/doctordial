import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ClientDistributionChart } from "./ClientDistributionChart";
import { CallVolumeChart } from "./CallVolumeChart";
import { ActivityList } from "../client/ActivityList";
import { UrgencyLevelChart } from "../client/UrgencyLevelChart";
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
        <ActivityList />
        <UrgencyLevelChart />
      </div>
    );
  }

  // Return original admin view
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ClientDistributionChart />
      <CallVolumeChart />
    </div>
  );
}