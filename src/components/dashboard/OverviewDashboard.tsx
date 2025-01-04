import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { RecentCalls } from "./calls/RecentCalls";

export function OverviewDashboard() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-forest">Dashboard Overview</h1>
      <MetricsCards />
      <DashboardCharts />
      <RecentCalls />
    </div>
  );
}