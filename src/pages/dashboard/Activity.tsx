import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const ActivityPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Activity Log</h1>
        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest flex items-center gap-2">
              <Activity className="h-5 w-5 text-mint" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Activity tracking dashboard coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivityPage;