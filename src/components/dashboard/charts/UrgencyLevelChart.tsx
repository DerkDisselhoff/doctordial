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
        <CardTitle className="text-2xl font-bold text-center text-white tracking-tight">
          Call Urgency Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              barGap={8}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#64FFDA" stopOpacity={1} />
                  <stop offset="100%" stopColor="#64FFDA" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(100, 255, 218, 0.1)" 
                vertical={false}
              />
              <XAxis 
                dataKey="urgency" 
                stroke="#FFFFFF"
                fontSize={14}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              />
              <YAxis 
                stroke="#FFFFFF"
                fontSize={14}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(100, 255, 218, 0.1)' }}
                contentStyle={{
                  backgroundColor: '#0A1F2F',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }}
                labelStyle={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '4px' }}
                itemStyle={{ color: '#64FFDA' }}
                formatter={(value) => [`${value} calls`, 'Volume']}
              />
              <Bar 
                dataKey="calls" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                className="transition-all duration-200 hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}