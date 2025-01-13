import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PhoneCall, Clock, Calendar, ThumbsUp, AlertCircle, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function MetricsCards() {
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
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          icon={PhoneCall}
          label="Total Calls"
          value="1,280"
          subtext="+210 from last month"
        />
        <StatCard 
          icon={Clock}
          label="Avg. Call Duration"
          value="3m 45s"
          subtext="-30s from last month"
        />
        <StatCard 
          icon={Calendar}
          label="Appointments Made"
          value="285"
          subtext="+45 from last month"
        />
        <StatCard 
          icon={ThumbsUp}
          label="Positive Sentiment"
          value="85%"
          subtext="+5% from last month"
        />
        <StatCard 
          icon={AlertCircle}
          label="Urgent Cases"
          value="12"
          subtext="-3 from last month"
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