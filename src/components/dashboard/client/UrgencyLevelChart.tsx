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
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="urgency" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#132B41',
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
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