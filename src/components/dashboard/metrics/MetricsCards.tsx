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
          icon={PhoneCall}
          label="Total Calls"
          value={isLoading ? '...' : (metrics?.totalCalls?.toString() || defaultMetrics.totalCalls)}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Clock}
          label="Avg. Call Duration"
          value={isLoading ? '...' : `${metrics?.avgDuration || defaultMetrics.avgDuration}s`}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Calendar}
          label="Calls Forwarded"
          value={isLoading ? '...' : (metrics?.callsForwarded?.toString() || defaultMetrics.callsForwarded)}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={ThumbsUp}
          label="Call Success"
          value={isLoading ? '...' : `${metrics?.callSuccess || defaultMetrics.callSuccess}%`}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={AlertCircle}
          label="Relevant Cases (U2-U4)"
          value={isLoading ? '...' : (metrics?.relevantCases?.toString() || defaultMetrics.relevantCases)}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={Users}
        label="Total Clients"
        value="2,350"
        subtext="+180 from last month"
        navigateTo="/dashboard/clients"
      />
      <StatCard 
        icon={PhoneCall}
        label="Total Calls"
        value="15,280"
        subtext="+2,100 from last month"
        navigateTo="/dashboard/calls"
      />
      <StatCard 
        icon={Clock}
        label="Avg. Call Duration"
        value="3m 45s"
        subtext="-30s from last month"
        navigateTo="/dashboard/calls"
      />
      <StatCard 
        icon={DollarSign}
        label="Monthly Revenue"
        value="$23,500"
        subtext="+$4,500 from last month"
        navigateTo="/dashboard/billing"
      />
    </div>
  );
}