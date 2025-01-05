import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '6:00', calls: 2 },
  { time: '8:00', calls: 15 },
  { time: '10:00', calls: 18 },
  { time: '12:00', calls: 8 },
  { time: '14:00', calls: 15 },
  { time: '16:00', calls: 8 },
  { time: '18:00', calls: 3 },
];

export function DailyCallsPreview() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Today's Call Volume</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F3B4D" />
            <XAxis 
              dataKey="time" 
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
    </div>
  );
}