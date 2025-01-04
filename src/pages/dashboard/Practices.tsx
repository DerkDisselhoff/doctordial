import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Phone, Calendar } from "lucide-react";

const PracticesPage = () => {
  const practices = [
    {
      id: 1,
      name: "Amsterdam Family Practice",
      doctors: 5,
      patients: 2500,
      calls: 150,
      appointments: 85
    },
    {
      id: 2,
      name: "Rotterdam Medical Center",
      doctors: 8,
      patients: 3800,
      calls: 220,
      appointments: 130
    },
    {
      id: 3,
      name: "Utrecht Health Hub",
      doctors: 6,
      patients: 2800,
      calls: 180,
      appointments: 95
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Practice Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Total Practices</CardTitle>
              <Building2 className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">12</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Total Doctors</CardTitle>
              <Users className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">45</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Monthly Calls</CardTitle>
              <Phone className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">1,250</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">850</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest">Practice Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-forest uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Practice Name</th>
                    <th scope="col" className="px-6 py-3">Doctors</th>
                    <th scope="col" className="px-6 py-3">Patients</th>
                    <th scope="col" className="px-6 py-3">Monthly Calls</th>
                    <th scope="col" className="px-6 py-3">Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {practices.map((practice) => (
                    <tr key={practice.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-forest">{practice.name}</td>
                      <td className="px-6 py-4">{practice.doctors}</td>
                      <td className="px-6 py-4">{practice.patients}</td>
                      <td className="px-6 py-4">{practice.calls}</td>
                      <td className="px-6 py-4">{practice.appointments}</td>
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

export default PracticesPage;