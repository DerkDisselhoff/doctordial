import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const ContractsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Contracts</h1>
        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest flex items-center gap-2">
              <FileText className="h-5 w-5 text-mint" />
              Active Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Contract management dashboard coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContractsPage;