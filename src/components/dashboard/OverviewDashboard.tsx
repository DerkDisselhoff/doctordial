import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CirclePlay, CirclePause } from "lucide-react";
import { UrgentCases } from "./client/UrgentCases";

type TimeFilter = 'today' | 'week' | 'month';

interface AssistantStatus {
  is_live: boolean;
  assistant_name: string;
}

export function OverviewDashboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [isAssistantLive, setIsAssistantLive] = useState(false);
  const [assistantName, setAssistantName] = useState('Assistant');

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

        // Fetch assistant status and name
        const { data: statusData } = await supabase
          .from('assistant_status')
          .select('is_live, assistant_name')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (statusData) {
          setIsAssistantLive(statusData.is_live);
          setAssistantName(statusData.assistant_name || 'Assistant');
        }
      }
    };

    checkUserRole();

    // Subscribe to assistant status changes
    const channel = supabase
      .channel('assistant_status_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'assistant_status',
          filter: `profile_id=eq.${supabase.auth.getSession().then(({ data }) => data.session?.user.id)}`
        },
        (payload) => {
          const newStatus = payload.new as AssistantStatus;
          if (newStatus) {
            setIsAssistantLive(newStatus.is_live);
            setAssistantName(newStatus.assistant_name || 'Assistant');
          }
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
            <h2 className="text-3xl font-bold text-gray-dark">Dashboard Overview</h2>
            <p className="text-gray">Monitor your key metrics and performance</p>
          </div>
          {userRole === 'client' && (
            <div className="flex items-center gap-2 bg-blue-light/30 px-4 py-2 rounded-lg border border-blue-muted">
              <div className="flex items-center gap-2">
                {isAssistantLive ? (
                  <>
                    <CirclePlay className="w-4 h-4 text-green" />
                    <span className="text-sm text-gray-dark">{assistantName} Active</span>
                  </>
                ) : (
                  <>
                    <CirclePause className="w-4 h-4 text-gray" />
                    <span className="text-sm text-gray">{assistantName} Offline</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {userRole === 'client' && (
          <div className="flex items-center space-x-2 bg-blue-light/30 p-2 rounded-lg">
            <Toggle
              variant="outline"
              size="sm"
              pressed={timeFilter === 'today'}
              onPressedChange={() => setTimeFilter('today')}
              className="data-[state=on]:bg-blue-dark/20 data-[state=on]:text-blue-dark"
            >
              Today
            </Toggle>
            <Toggle
              variant="outline"
              size="sm"
              pressed={timeFilter === 'week'}
              onPressedChange={() => setTimeFilter('week')}
              className="data-[state=on]:bg-blue-dark/20 data-[state=on]:text-blue-dark"
            >
              Last Week
            </Toggle>
            <Toggle
              variant="outline"
              size="sm"
              pressed={timeFilter === 'month'}
              onPressedChange={() => setTimeFilter('month')}
              className="data-[state=on]:bg-blue-dark/20 data-[state=on]:text-blue-dark"
            >
              Last Month
            </Toggle>
          </div>
        )}
      </div>
      
      <MetricsCards timeFilter={timeFilter} />
      
      {userRole === 'client' ? (
        <>
          <UrgentCases isIrrelevant={false} />
          <UrgentCases isIrrelevant={true} />
        </>
      ) : (
        <DashboardCharts />
      )}
    </div>
  );
}