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
  // Get the user's assistant_id first
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
    return { totalCalls: 0, avgDuration: 0 };
  }

  console.log('Found assistant_id:', assistantData.assistant_id);

  // Calculate date range based on timeFilter
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

  // Format dates for Postgres timestamp comparison
  const startDateStr = startDate.toISOString().split('T')[0]; // Get just the date part
  const endDateStr = now.toISOString().split('T')[0] + 'T23:59:59.999Z'; // End of current day

  console.log('Fetching calls from:', startDateStr, 'to:', endDateStr);
  console.log('Assistant ID:', assistantData.assistant_id);

  // Fetch call metrics with debug logging
  const { data: callData, error: callError } = await supabase
    .from('call_logs')
    .select('duration_seconds, start_time')
    .eq('assistant_id', assistantData.assistant_id)
    .gte('start_time', startDateStr)
    .lte('start_time', endDateStr);

  if (callError) {
    console.error('Error fetching call metrics:', callError);
    throw callError;
  }

  console.log('Retrieved calls:', callData);

  const totalCalls = callData.length;
  const avgDuration = callData.length > 0
    ? callData.reduce((acc, call) => acc + (parseInt(call.duration_seconds) || 0), 0) / callData.length
    : 0;

  return {
    totalCalls,
    avgDuration: Math.round(avgDuration),
  };
};

export function MetricsCards({ timeFilter = 'today' }: MetricsCardsProps) {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const navigate = useNavigate();

  const { data: metrics, isLoading } = useQuery({
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

  const getComparisonText = (filter: TimeFilter) => {
    switch (filter) {
      case 'today':
        return 'from yesterday';
      case 'week':
        return 'from last week';
      case 'month':
        return 'from last month';
    }
  };

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

  if (userRole === 'client') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          icon={PhoneCall}
          label="Total Calls"
          value={isLoading ? '...' : metrics?.totalCalls.toString() || '0'}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Clock}
          label="Avg. Call Duration"
          value={isLoading ? '...' : `${metrics?.avgDuration || 0}s`}
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Calendar}
          label="Appointments Made"
          value="N/A"
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/appointments"
        />
        <StatCard 
          icon={ThumbsUp}
          label="Positive Sentiment"
          value="N/A"
          subtext={`From ${timeFilter}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={AlertCircle}
          label="Urgent Cases"
          value="N/A"
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
