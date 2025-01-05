import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Enterprise', value: 35 },
  { name: 'Growth', value: 45 },
  { name: 'Starter', value: 20 },
];

const COLORS = ['#64FFDA', '#A7FFE4', '#132B41'];

export function ClientDistributionChart() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-100 pb-6">
        <CardTitle className="dashboard-card-title">Client Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#0A1F2F',
                }}
              />
              <Legend 
                formatter={(value) => <span className="text-forest">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}