import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '6:00', calls: 2 },
  { time: '7:00', calls: 5 },
  { time: '8:00', calls: 15 },
  { time: '9:00', calls: 25 },
  { time: '10:00', calls: 18 },
  { time: '11:00', calls: 12 },
  { time: '12:00', calls: 8 },
  { time: '13:00', calls: 10 },
  { time: '14:00', calls: 15 },
  { time: '15:00', calls: 12 },
  { time: '16:00', calls: 8 },
  { time: '17:00', calls: 5 },
  { time: '18:00', calls: 3 },
];

export function DailyCallsChart() {
  return (
    <Card className="bg-surface border-surface-input">
      <CardHeader className="border-b border-surface-input">
        <CardTitle className="text-text-primary">Today's Call Volume</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#4A5568"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#4A5568"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  color: '#2D3748',
                }}
                cursor={{ fill: 'rgba(74, 144, 226, 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="calls" 
                stroke="#4A90E2"
                fill="#4A90E2"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}