import { useState, useEffect } from "react";
import { PhoneCall, Clock, Calendar, ThumbsUp, AlertCircle, DollarSign, Users } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { TimeFilter } from "@/types/metrics";
import { StatCard } from "./StatCard";
import { useCallMetrics } from "@/hooks/useCallMetrics";

export function MetricsCards({ timeFilter = 'today' }: { timeFilter?: TimeFilter }) {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const { data: metrics, isLoading, error } = useCallMetrics(timeFilter);

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
    const defaultMetrics = {
      totalCalls: '0',
      avgDuration: '0',
      callsForwarded: '0',
      callSuccess: '0',
      relevantCases: '0'
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Total Calls"
          value={isLoading ? '...' : (metrics?.totalCalls?.toString() || defaultMetrics.totalCalls)}
          icon={PhoneCall}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Avg. Call Duration"
          value={isLoading ? '...' : `${metrics?.avgDuration || defaultMetrics.avgDuration}s`}
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard 
          title="Calls Forwarded"
          value={isLoading ? '...' : (metrics?.callsForwarded?.toString() || defaultMetrics.callsForwarded)}
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Call Success"
          value={isLoading ? '...' : `${metrics?.callSuccess || defaultMetrics.callSuccess}%`}
          icon={ThumbsUp}
          trend={{ value: 10, isPositive: true }}
        />
        <StatCard 
          title="Relevant Cases (U2-U4)"
          value={isLoading ? '...' : (metrics?.relevantCases?.toString() || defaultMetrics.relevantCases)}
          icon={AlertCircle}
          trend={{ value: 15, isPositive: true }}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Clients"
        value="2,350"
        icon={Users}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard 
        title="Total Calls"
        value="15,280"
        icon={PhoneCall}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard 
        title="Avg. Call Duration"
        value="3m 45s"
        icon={Clock}
        trend={{ value: 5, isPositive: false }}
      />
      <StatCard 
        title="Monthly Revenue"
        value="$23,500"
        icon={DollarSign}
        trend={{ value: 15, isPositive: true }}
      />
    </div>
  );
}