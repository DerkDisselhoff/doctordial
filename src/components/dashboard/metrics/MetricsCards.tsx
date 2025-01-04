import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PhoneCall, Clock, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export function MetricsCards() {
  const { data: clientCount } = useQuery({
    queryKey: ['clientCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'client');
      return count || 0;
    },
  });

  const { data: totalCalls } = useQuery({
    queryKey: ['totalCalls'],
    queryFn: async () => {
      const { count } = await supabase
        .from('vapi_calls')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">{clientCount || 0}</div>
          <p className="text-xs text-gray-500 mt-1">Active medical practices</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Total Calls</CardTitle>
          <PhoneCall className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">{totalCalls || 0}</div>
          <p className="text-xs text-gray-500 mt-1">Handled by AI assistant</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Avg. Call Duration</CardTitle>
          <Clock className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">1.2m</div>
          <p className="text-xs text-gray-500 mt-1">Per conversation</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Monthly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">€24.5k</div>
          <p className="text-xs text-gray-500 mt-1">+12.5% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}