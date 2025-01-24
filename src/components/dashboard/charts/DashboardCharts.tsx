import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyCallsChart } from "./DailyCallsChart";
import { CallVolumeChart } from "./CallVolumeChart";
import { ClientDistributionChart } from "./ClientDistributionChart";
import { UrgencyLevelChart } from "./UrgencyLevelChart";

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-surface border-surface-input">
        <CardHeader>
          <CardTitle className="text-text-primary">Daily Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <DailyCallsChart />
        </CardContent>
      </Card>

      <Card className="bg-surface border-surface-input">
        <CardHeader>
          <CardTitle className="text-text-primary">Call Volume by Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <CallVolumeChart />
        </CardContent>
      </Card>

      <Card className="bg-surface border-surface-input">
        <CardHeader>
          <CardTitle className="text-text-primary">Client Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientDistributionChart />
        </CardContent>
      </Card>

      <Card className="bg-surface border-surface-input">
        <CardHeader>
          <CardTitle className="text-text-primary">Urgency Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <UrgencyLevelChart />
        </CardContent>
      </Card>
    </div>
  );
}