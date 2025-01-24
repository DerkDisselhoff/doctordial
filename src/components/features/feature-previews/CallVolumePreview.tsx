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
      <h3 className="text-lg font-semibold text-gray-dark mb-4">Call Volume Trend</h3>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F1FE" />
            <XAxis 
              dataKey="name" 
              stroke="#4B5563" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#4B5563" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8F1FE',
                borderRadius: '8px',
                color: '#1F2937',
              }}
              cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="calls" 
              stroke="#2563EB" 
              fill="#E8F1FE" 
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}