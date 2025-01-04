import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";

const ContractsPage = () => {
  const contracts = [
    {
      id: 1,
      name: "Service Agreement - Amsterdam Medical Center",
      status: "signed",
      date: "2024-03-15",
      type: "Service Agreement"
    },
    {
      id: 2,
      name: "Annual Contract - Rotterdam Health Hub",
      status: "pending",
      date: "2024-03-20",
      type: "Annual Contract"
    },
    {
      id: 3,
      name: "Terms Update - Utrecht Family Practice",
      status: "expired",
      date: "2024-02-28",
      type: "Terms Update"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Contracts</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Active Contracts</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">18</div>
              <p className="text-xs text-forest/60">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Pending Signatures</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">3</div>
              <p className="text-xs text-forest/60">Awaiting signature</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Expiring Soon</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">2</div>
              <p className="text-xs text-forest/60">Within 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest">Recent Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-forest uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Contract Name</th>
                    <th scope="col" className="px-6 py-3">Type</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-forest">{contract.name}</td>
                      <td className="px-6 py-4">{contract.type}</td>
                      <td className="px-6 py-4">{contract.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          contract.status === 'signed' ? 'bg-green-100 text-green-800' :
                          contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {contract.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-mint hover:text-mint-light">
                          <FileText className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContractsPage;