import { supabase } from "@/lib/supabaseClient";
import { ClientDistributionChart } from "./ClientDistributionChart";
import { CallVolumeChart } from "./CallVolumeChart";
import { UrgentCases } from "../client/UrgentCases";
import { useQuery } from "@tanstack/react-query";

export function DashboardCharts() {
  const checkUserRole = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      return profile?.role;
    }
    return null;
  };

  const { data: userRole } = useQuery({
    queryKey: ['userRole'],
    queryFn: checkUserRole
  });

  if (userRole === 'admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ClientDistributionChart />
        <CallVolumeChart />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      <UrgentCases isIrrelevant={true} />
    </div>
  );
}