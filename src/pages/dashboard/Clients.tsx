import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientManagementSection } from "@/components/client-management/ClientManagementSection";

const ClientsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Client Management</h1>
        <ClientManagementSection />
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;