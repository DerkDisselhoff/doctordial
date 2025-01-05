import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', calls: 400 },
  { name: 'Feb', calls: 300 },
  { name: 'Mar', calls: 600 },
  { name: 'Apr', calls: 800 },
  { name: 'May', calls: 700 },
  { name: 'Jun', calls: 900 },
];

export function CallVolumeChart() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-100 pb-6">
        <CardTitle className="dashboard-card-title">Call Volume Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#0A1F2F" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#0A1F2F" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#0A1F2F',
                }}
                cursor={{ fill: 'rgba(100, 255, 218, 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="calls" 
                stroke="#64FFDA" 
                fill="#64FFDA" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}