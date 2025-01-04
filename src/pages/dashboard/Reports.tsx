import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Filter } from "lucide-react";

const data = [
  { name: 'Jan', calls: 4000, appointments: 2400 },
  { name: 'Feb', calls: 3000, appointments: 1398 },
  { name: 'Mar', calls: 2000, appointments: 9800 },
  { name: 'Apr', calls: 2780, appointments: 3908 },
  { name: 'May', calls: 1890, appointments: 4800 },
  { name: 'Jun', calls: 2390, appointments: 3800 },
];

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-forest">Reports</h1>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-forest bg-white rounded-md border hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-mint rounded-md hover:bg-mint-light">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-forest">Call Volume Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <LineChart type="monotone" dataKey="calls" stroke="#64FFDA" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-forest">Appointments Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#64FFDA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest">Detailed Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-forest uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Metric</th>
                    <th scope="col" className="px-6 py-3">Current Period</th>
                    <th scope="col" className="px-6 py-3">Previous Period</th>
                    <th scope="col" className="px-6 py-3">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-forest">Total Calls</td>
                    <td className="px-6 py-4">1,234</td>
                    <td className="px-6 py-4">1,180</td>
                    <td className="px-6 py-4 text-green-600">+4.6%</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-forest">Avg. Call Duration</td>
                    <td className="px-6 py-4">3m 45s</td>
                    <td className="px-6 py-4">3m 30s</td>
                    <td className="px-6 py-4 text-green-600">+7.1%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-medium text-forest">Conversion Rate</td>
                    <td className="px-6 py-4">68%</td>
                    <td className="px-6 py-4">65%</td>
                    <td className="px-6 py-4 text-green-600">+3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;