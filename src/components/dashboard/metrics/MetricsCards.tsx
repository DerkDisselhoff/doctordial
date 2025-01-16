import { Card } from "@/components/ui/card";
import { Users, PhoneCall, Clock, Calendar, ThumbsUp, AlertCircle, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type TimeFilter = 'today' | 'week' | 'month';

interface MetricsCardsProps {
  timeFilter?: TimeFilter;
}

const fetchCallMetrics = async (timeFilter: TimeFilter) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const { data: assistantData, error: assistantError } = await supabase
    .from('assistant_status')
    .select('assistant_id')
    .eq('profile_id', session.user.id)
    .maybeSingle();

  if (assistantError) {
    console.error('Error fetching assistant status:', assistantError);
    throw assistantError;
  }

  if (!assistantData?.assistant_id) {
    console.log('No assistant_id found for user');
    return { 
      totalCalls: 0, 
      avgDuration: 0,
      appointmentsMade: 0,
      positiveSentiment: 0,
      urgentCases: 0 
    };
  }

  const now = new Date();
  let startDate = new Date();
  
  switch (timeFilter) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
  }

  const startDateStr = startDate.toISOString();
  const endDateStr = now.toISOString();

  const { data: callData, error: callError } = await supabase
    .from('call_logs')
    .select('duration_seconds, start_time, Status, Sentiment, Urgencylevel')
    .eq('assistant_id', assistantData.assistant_id)
    .gte('start_time', startDateStr)
    .lte('start_time', endDateStr);

  if (callError) {
    console.error('Error fetching call metrics:', callError);
    throw callError;
  }

  // Calculate metrics
  const totalCalls = callData?.length || 0;
  const avgDuration = callData && callData.length > 0
    ? callData.reduce((acc, call) => acc + (parseInt(call.duration_seconds) || 0), 0) / callData.length
    : 0;

  // Count scheduled appointments
  const appointmentsMade = callData?.filter(call => 
    call.Status?.toLowerCase() === 'scheduled'
  )?.length || 0;

  // Calculate positive sentiment percentage
  const sentimentCalls = callData?.filter(call => call.Sentiment) || [];
  const positiveSentiment = sentimentCalls.length > 0
    ? (sentimentCalls.filter(call => 
        call.Sentiment?.toLowerCase().includes('positive')
      ).length / sentimentCalls.length) * 100
    : 0;

  // Count urgent cases (U2 or higher)
  const urgentCases = callData?.filter(call => {
    const urgencyLevel = call.Urgencylevel?.toUpperCase();
    return urgencyLevel === 'U1' || urgencyLevel === 'U2';
  })?.length || 0;

  return {
    totalCalls,
    avgDuration: Math.round(avgDuration),
    appointmentsMade,
    positiveSentiment: Math.round(positiveSentiment),
    urgentCases
  };
};

export function MetricsCards({ timeFilter = 'today' }: MetricsCardsProps) {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const navigate = useNavigate();

  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['callMetrics', timeFilter],
    queryFn: () => fetchCallMetrics(timeFilter),
  });

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

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    subtext,
    navigateTo 
  }: { 
    icon: any, 
    label: string, 
    value: string, 
    subtext?: string,
    navigateTo: string
  }) => (
    <Card 
      className="bg-forest-light/50 border-mint/10 p-4 cursor-pointer transition-all duration-300
                hover:border-mint/30 hover:shadow-[0_0_15px_rgba(100,255,218,0.1)]
                relative overflow-hidden group"
      onClick={() => navigate(navigateTo)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-mint/0 via-mint/5 to-mint/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 pointer-events-none" 
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-white/70 text-sm">{label}</p>
          <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
          {subtext && <p className="text-xs text-white/50 mt-1">{subtext}</p>}
        </div>
        <div className="p-2 bg-mint/10 rounded-lg">
          <Icon className="w-5 h-5 text-mint" />
        </div>
      </div>
    </Card>
  );

  if (error) {
    console.error('Error fetching metrics:', error);
    return null;
  }

  if (userRole === 'client') {
    const defaultMetrics = {
      totalCalls: '0',
      avgDuration: '0s',
      appointmentsMade: '0',
      positiveSentiment: '0',
      urgentCases: '0'
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
          label="Appointments Made"
          value={isLoading ? '...' : (metrics?.appointmentsMade?.toString() || defaultMetrics.appointmentsMade)}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/appointments"
        />
        <StatCard 
          icon={ThumbsUp}
          label="Positive Sentiment"
          value={isLoading ? '...' : `${metrics?.positiveSentiment || defaultMetrics.positiveSentiment}%`}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={AlertCircle}
          label="Urgent Cases"
          value={isLoading ? '...' : (metrics?.urgentCases?.toString() || defaultMetrics.urgentCases)}
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
