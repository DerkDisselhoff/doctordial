import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { urgency: 'U1', calls: 5 },
  { urgency: 'U2', calls: 12 },
  { urgency: 'U3', calls: 25 },
  { urgency: 'U4', calls: 18 },
  { urgency: 'U5', calls: 8 },
];

export function UrgencyLevelChart() {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="dashboard-card-title">Call Urgency Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="urgency" 
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
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  color: '#0A1F2F',
                }}
              />
              <Bar 
                dataKey="calls" 
                fill="#64FFDA"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}