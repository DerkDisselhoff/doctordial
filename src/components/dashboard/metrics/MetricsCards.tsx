import { Card } from "@/components/ui/card";
import { Users, PhoneCall, Clock, Calendar, ThumbsUp, AlertCircle, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Toggle } from "@/components/ui/toggle";

type TimeFilter = 'today' | 'week' | 'month';

export function MetricsCards() {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');

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

  // Helper function to get the comparison text based on the time filter
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

  const StatCard = ({ icon: Icon, label, value, subtext }: { 
    icon: any, 
    label: string, 
    value: string, 
    subtext?: string 
  }) => (
    <Card className="bg-forest-light/50 border-mint/10 p-4">
      <div className="flex items-start justify-between">
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
      <div className="space-y-4">
        <div className="flex items-center justify-end space-x-2 bg-forest-light/30 p-2 rounded-lg">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            icon={PhoneCall}
            label="Total Calls"
            value={metricsData.calls}
            subtext={`+30 ${comparisonText}`}
          />
          <StatCard 
            icon={Clock}
            label="Avg. Call Duration"
            value={metricsData.duration}
            subtext={`-15s ${comparisonText}`}
          />
          <StatCard 
            icon={Calendar}
            label="Appointments Made"
            value={metricsData.appointments}
            subtext={`+15 ${comparisonText}`}
          />
          <StatCard 
            icon={ThumbsUp}
            label="Positive Sentiment"
            value={metricsData.sentiment}
            subtext={`+2% ${comparisonText}`}
          />
          <StatCard 
            icon={AlertCircle}
            label="Urgent Cases"
            value={metricsData.urgent}
            subtext={`-1 ${comparisonText}`}
          />
        </div>
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
      />
      <StatCard 
        icon={PhoneCall}
        label="Total Calls"
        value="15,280"
        subtext="+2,100 from last month"
      />
      <StatCard 
        icon={Clock}
        label="Avg. Call Duration"
        value="3m 45s"
        subtext="-30s from last month"
      />
      <StatCard 
        icon={DollarSign}
        label="Monthly Revenue"
        value="$23,500"
        subtext="+$4,500 from last month"
      />
    </div>
  );
}