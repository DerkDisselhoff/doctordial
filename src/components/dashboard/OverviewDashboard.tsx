import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { RecentCalls } from "./calls/RecentCalls";

export function OverviewDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Dashboard Overview</h2>
        <p className="text-gray-500">Monitor your practice performance</p>
      </div>
      <MetricsCards />
      <DashboardCharts />
      <RecentCalls />
    </div>
  );
}