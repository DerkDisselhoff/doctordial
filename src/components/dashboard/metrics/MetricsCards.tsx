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

  if (userRole === 'client') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-forest">Total Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">1,280</div>
            <p className="text-xs text-forest/60">+210 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-forest">Avg. Call Duration</CardTitle>
            <Clock className="h-4 w-4 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">3m 45s</div>
            <p className="text-xs text-forest/60">-30s from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-forest">Appointments Made</CardTitle>
            <Calendar className="h-4 w-4 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">285</div>
            <p className="text-xs text-forest/60">+45 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-forest">Positive Sentiment</CardTitle>
            <ThumbsUp className="h-4 w-4 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">85%</div>
            <p className="text-xs text-forest/60">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-forest">Urgent Cases</CardTitle>
            <AlertCircle className="h-4 w-4 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">12</div>
            <p className="text-xs text-forest/60">-3 from last month</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white shadow-lg border-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">2,350</div>
          <p className="text-xs text-forest/60">+180 from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-lg border-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Total Calls</CardTitle>
          <PhoneCall className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">15,280</div>
          <p className="text-xs text-forest/60">+2,100 from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-lg border-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Avg. Call Duration</CardTitle>
          <Clock className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">3m 45s</div>
          <p className="text-xs text-forest/60">-30s from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-lg border-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-forest">Monthly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">$23,500</div>
          <p className="text-xs text-forest/60">+$4,500 from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
