import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PhoneCall, Clock, DollarSign } from "lucide-react";

export function MetricsCards() {
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