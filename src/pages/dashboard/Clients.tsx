import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Phone, Calendar } from "lucide-react";

const ClientsPage = () => {
  const clients = [
    {
      id: 1,
      name: "Amsterdam Medical Center",
      doctors: 12,
      patients: 5000,
      lastContact: "2024-03-15"
    },
    {
      id: 2,
      name: "Rotterdam Health Hub",
      doctors: 8,
      patients: 3500,
      lastContact: "2024-03-14"
    },
    {
      id: 3,
      name: "Utrecht Family Practice",
      doctors: 5,
      patients: 2000,
      lastContact: "2024-03-13"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Client Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Total Clients</CardTitle>
              <Building2 className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">24</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Active Doctors</CardTitle>
              <Users className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">156</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">15.2K</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Active Calls</CardTitle>
              <Phone className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">48</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest">Client Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-forest uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Client Name</th>
                    <th scope="col" className="px-6 py-3">Doctors</th>
                    <th scope="col" className="px-6 py-3">Patients</th>
                    <th scope="col" className="px-6 py-3">Last Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-forest">{client.name}</td>
                      <td className="px-6 py-4">{client.doctors}</td>
                      <td className="px-6 py-4">{client.patients}</td>
                      <td className="px-6 py-4">{client.lastContact}</td>
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

export default ClientsPage;