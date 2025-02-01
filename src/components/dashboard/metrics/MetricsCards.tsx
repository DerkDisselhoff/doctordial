
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
          label="Totaal aantal gesprekken"
          value={isLoading ? '...' : (metrics?.totalCalls?.toString() || defaultMetrics.totalCalls)}
          subtext={`Van ${timeFilter === 'today' ? 'vandaag' : timeFilter === 'week' ? 'deze week' : 'deze maand'}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Clock}
          label="Gem. gespreksduur"
          value={isLoading ? '...' : `${metrics?.avgDuration || defaultMetrics.avgDuration}s`}
          subtext={`Van ${timeFilter === 'today' ? 'vandaag' : timeFilter === 'week' ? 'deze week' : 'deze maand'}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Calendar}
          label="Doorverbonden"
          value={isLoading ? '...' : (metrics?.callsForwarded?.toString() || defaultMetrics.callsForwarded)}
          subtext={`Van ${timeFilter === 'today' ? 'vandaag' : timeFilter === 'week' ? 'deze week' : 'deze maand'}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={ThumbsUp}
          label="Succes percentage"
          value={isLoading ? '...' : `${metrics?.callSuccess || defaultMetrics.callSuccess}%`}
          subtext={`Van ${timeFilter === 'today' ? 'vandaag' : timeFilter === 'week' ? 'deze week' : 'deze maand'}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={AlertCircle}
          label="Relevante gevallen (U2-U4)"
          value={isLoading ? '...' : (metrics?.relevantCases?.toString() || defaultMetrics.relevantCases)}
          subtext={`Van ${timeFilter === 'today' ? 'vandaag' : timeFilter === 'week' ? 'deze week' : 'deze maand'}`}
          navigateTo="/dashboard/calls"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={Users}
        label="Totaal aantal cliënten"
        value="2,350"
        subtext="+180 t.o.v. vorige maand"
        navigateTo="/dashboard/clients"
      />
      <StatCard 
        icon={PhoneCall}
        label="Totaal aantal gesprekken"
        value="15,280"
        subtext="+2,100 t.o.v. vorige maand"
        navigateTo="/dashboard/calls"
      />
      <StatCard 
        icon={Clock}
        label="Gem. gespreksduur"
        value="3m 45s"
        subtext="-30s t.o.v. vorige maand"
        navigateTo="/dashboard/calls"
      />
      <StatCard 
        icon={DollarSign}
        label="Maandelijkse omzet"
        value="€23,500"
        subtext="+€4,500 t.o.v. vorige maand"
        navigateTo="/dashboard/billing"
      />
    </div>
  );
}
