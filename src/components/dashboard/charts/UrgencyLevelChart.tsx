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
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader className="border-b border-mint/10">
        <CardTitle className="text-white">Call Urgency Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 255, 218, 0.1)" />
              <XAxis 
                dataKey="urgency" 
                stroke="#FFFFFF"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#FFFFFF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A1F2F',
                  border: '1px solid #64FFDA',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                }}
                cursor={{ fill: 'rgba(100, 255, 218, 0.1)' }}
              />
              <Bar 
                dataKey="calls" 
                fill="#64FFDA"
                opacity={0.8}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}