import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientDistributionChart } from "./ClientDistributionChart";
import { CallVolumeChart } from "./CallVolumeChart";

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-white/50 backdrop-blur-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-forest">Client Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientDistributionChart />
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-forest">Call Volume Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <CallVolumeChart />
        </CardContent>
      </Card>
    </div>
  );
}