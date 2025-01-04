import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function ContractsPage() {
  const contracts = [
    {
      id: "CTR-001",
      client: "Central Medical Practice",
      status: "Active",
      type: "Enterprise",
      startDate: "2024-01-01",
      endDate: "2025-01-01",
    },
    {
      id: "CTR-002",
      client: "Riverside Health Center",
      status: "Pending",
      type: "Growth",
      startDate: "2024-03-15",
      endDate: "2025-03-15",
    },
    {
      id: "CTR-003",
      client: "City Medical Group",
      status: "Active",
      type: "Scale",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Pending":
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-forest">Contracts</h1>
          <p className="text-gray-500 mt-2">Manage and monitor client contracts</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-forest">Active Contracts</h2>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div 
                key={contract.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(contract.status)}
                  <div>
                    <p className="font-medium text-forest">{contract.client}</p>
                    <p className="text-sm text-gray-500">{contract.id} • {contract.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {contract.startDate} - {contract.endDate}
                  </p>
                  <p className={`text-sm ${
                    contract.status === "Active" ? "text-green-500" : 
                    contract.status === "Pending" ? "text-orange-500" : "text-red-500"
                  }`}>
                    {contract.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}