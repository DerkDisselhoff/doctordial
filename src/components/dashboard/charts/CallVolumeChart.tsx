import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', calls: 400 },
  { name: 'Feb', calls: 300 },
  { name: 'Mar', calls: 600 },
  { name: 'Apr', calls: 800 },
  { name: 'May', calls: 700 },
  { name: 'Jun', calls: 900 },
];

export function CallVolumeChart() {
  return (
    <div className="w-full h-[300px]">
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
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" stroke="#0A1F2F" />
          <YAxis stroke="#0A1F2F" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
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
  );
}