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
    <Card className="bg-white shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-forest">Call Urgency Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="urgency" stroke="#0A1F2F" />
              <YAxis stroke="#0A1F2F" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
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