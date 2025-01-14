import { Card } from "@/components/ui/card";
import { Users, PhoneCall, Clock, Calendar, ThumbsUp, AlertCircle, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

type TimeFilter = 'today' | 'week' | 'month';

interface MetricsCardsProps {
  timeFilter?: TimeFilter;
}

export function MetricsCards({ timeFilter = 'today' }: MetricsCardsProps) {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const navigate = useNavigate();

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

  // Helper function to get mock data based on the time filter
  const getMetricsData = (filter: TimeFilter) => {
    switch (filter) {
      case 'today':
        return {
          calls: '180',
          duration: '3m 15s',
          appointments: '25',
          sentiment: '82%',
          urgent: '3'
        };
      case 'week':
        return {
          calls: '1,280',
          duration: '3m 45s',
          appointments: '285',
          sentiment: '85%',
          urgent: '12'
        };
      case 'month':
        return {
          calls: '4,500',
          duration: '3m 30s',
          appointments: '850',
          sentiment: '87%',
          urgent: '45'
        };
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
    const metricsData = getMetricsData(timeFilter);
    const comparisonText = getComparisonText(timeFilter);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          icon={PhoneCall}
          label="Total Calls"
          value={metricsData.calls}
          subtext={`+30 ${comparisonText}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Clock}
          label="Avg. Call Duration"
          value={metricsData.duration}
          subtext={`-15s ${comparisonText}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={Calendar}
          label="Appointments Made"
          value={metricsData.appointments}
          subtext={`+15 ${comparisonText}`}
          navigateTo="/dashboard/appointments"
        />
        <StatCard 
          icon={ThumbsUp}
          label="Positive Sentiment"
          value={metricsData.sentiment}
          subtext={`+2% ${comparisonText}`}
          navigateTo="/dashboard/calls"
        />
        <StatCard 
          icon={AlertCircle}
          label="Urgent Cases"
          value={metricsData.urgent}
          subtext={`-1 ${comparisonText}`}
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
