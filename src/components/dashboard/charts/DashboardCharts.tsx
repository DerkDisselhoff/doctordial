import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ClientDistributionChart } from "./ClientDistributionChart";
import { CallVolumeChart } from "./CallVolumeChart";
import { ActivityList } from "../client/ActivityList";
import { UrgencyLevelChart } from "../client/UrgencyLevelChart";
import { UrgentCases } from "../client/UrgentCases";
import { DailyCallsChart } from "./DailyCallsChart";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UrgencyLevelChart />
          <DailyCallsChart />
        </div>
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