import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";

export function OverviewDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-white/60">Monitor your key metrics and performance</p>
      </div>
      
      <MetricsCards />
      <DashboardCharts />
    </div>
  );
}