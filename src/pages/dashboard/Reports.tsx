import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Reports</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-forest flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-mint" />
                Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Reports dashboard coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;