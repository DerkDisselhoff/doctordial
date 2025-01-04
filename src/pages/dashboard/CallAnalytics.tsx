import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import VapiCallsList from "@/components/VapiCallsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CallAnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Call Analytics</h1>
        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest">Call History</CardTitle>
          </CardHeader>
          <CardContent>
            <VapiCallsList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CallAnalyticsPage;