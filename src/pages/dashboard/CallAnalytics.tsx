import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Phone, Clock, ThumbsUp, AlertTriangle } from "lucide-react";

const data = [
  { name: '9:00', calls: 4, duration: 15 },
  { name: '10:00', calls: 7, duration: 12 },
  { name: '11:00', calls: 5, duration: 18 },
  { name: '12:00', calls: 3, duration: 14 },
  { name: '13:00', calls: 6, duration: 16 },
  { name: '14:00', calls: 8, duration: 13 },
];

const CallAnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Call Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">245</div>
              <p className="text-xs text-forest/60">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">3m 45s</div>
              <p className="text-xs text-forest/60">Per call</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Resolution Rate</CardTitle>
              <ThumbsUp className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">92%</div>
              <p className="text-xs text-forest/60">First call resolution</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Urgent Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">15</div>
              <p className="text-xs text-forest/60">Requiring immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-forest">Hourly Call Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="calls" stroke="#64FFDA" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-forest">Average Call Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#64FFDA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CallAnalyticsPage;