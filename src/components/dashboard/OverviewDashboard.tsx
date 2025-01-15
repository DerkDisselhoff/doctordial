import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CirclePlay, CirclePause } from "lucide-react";

type TimeFilter = 'today' | 'week' | 'month';

export function OverviewDashboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [isAssistantLive, setIsAssistantLive] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || null);

        // Fetch assistant status
        const { data: statusData } = await supabase
          .from('assistant_status')
          .select('is_live')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        setIsAssistantLive(statusData?.is_live || false);
      }
    };

    checkUserRole();

    // Subscribe to assistant status changes
    const channel = supabase
      .channel('assistant_status_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'assistant_status',
          filter: `profile_id=eq.${supabase.auth.getSession().then(({ data }) => data.session?.user.id)}`
        },
        (payload) => {
          setIsAssistantLive(payload.new.is_live);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
            <p className="text-white/60">Monitor your key metrics and performance</p>
          </div>
          {userRole === 'client' && (
            <div className="flex items-center gap-2 bg-forest-light/30 px-4 py-2 rounded-lg border border-mint/10">
              <div className="flex items-center gap-2">
                {isAssistantLive ? (
                  <>
                    <CirclePlay className="w-4 h-4 text-mint animate-pulse" />
                    <span className="text-sm text-mint">Assistant Active</span>
                  </>
                ) : (
                  <>
                    <CirclePause className="w-4 h-4 text-white/50" />
                    <span className="text-sm text-white/50">Assistant Offline</span>
                  </>
                )}
              </div>
            </div>
          )}
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