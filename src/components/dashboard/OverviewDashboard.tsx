export function OverviewDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Dashboard Overview</h2>
        <p className="text-gray-500">Monitor your key metrics and performance</p>
      </div>
      
      <MetricsCards />
      <DashboardCharts />
      <RecentCalls />
    </div>
  );
}