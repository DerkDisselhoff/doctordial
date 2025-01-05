import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Enterprise', value: 35 },
  { name: 'Growth', value: 45 },
  { name: 'Starter', value: 20 },
];

const COLORS = ['#64FFDA', '#A7FFE4', '#132B41'];

export function ClientDistributionPreview() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Client Distribution</h3>
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
                backgroundColor: '#0A1F2F',
                border: '1px solid #64FFDA',
                borderRadius: '8px',
                color: '#FFFFFF',
              }}
            />
            <Legend 
              formatter={(value) => <span className="text-white">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}