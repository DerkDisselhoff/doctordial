import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', calls: 400 },
  { name: 'Feb', calls: 300 },
  { name: 'Mar', calls: 600 },
  { name: 'Apr', calls: 800 },
  { name: 'May', calls: 700 },
  { name: 'Jun', calls: 900 },
];

export function CallVolumePreview() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Call Volume Trend</h3>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#1F3B4D" />
            <XAxis 
              dataKey="name" 
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