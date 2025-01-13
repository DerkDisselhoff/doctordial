import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type TimeFilter = 'today' | 'week' | 'month';

export function OverviewDashboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-white/60">Monitor your key metrics and performance</p>
        </div>
        
        {userRole === 'client' && (
          <div className="flex items-center space-x-2 bg-forest-light/30 p-2 rounded-lg">
            <Toggle
              variant="outline"
              size="sm"
              pressed={timeFilter === 'today'}
              onPressedChange={() => setTimeFilter('today')}
              className="data-[state=on]:bg-mint/20 data-[state=on]:text-mint"
            >
              Today
            </Toggle>
            <Toggle
              variant="outline"
              size="sm"
              pressed={timeFilter === 'week'}
              onPressedChange={() => setTimeFilter('week')}
              className="data-[state=on]:bg-mint/20 data-[state=on]:text-mint"
            >
              Last Week
            </Toggle>
            <Toggle
              variant="outline"
              size="sm"
              pressed={timeFilter === 'month'}
              onPressedChange={() => setTimeFilter('month')}
              className="data-[state=on]:bg-mint/20 data-[state=on]:text-mint"
            >
              Last Month
            </Toggle>
          </div>
        )}
      </div>
      
      <MetricsCards timeFilter={timeFilter} />
      <DashboardCharts />
    </div>
  );
}