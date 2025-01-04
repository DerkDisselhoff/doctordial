import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Calls",
    value: "1,234",
    icon: Phone,
    color: "text-mint",
  },
  {
    title: "Average Duration",
    value: "3m 45s",
    icon: Clock,
    color: "text-mint",
  },
  {
    title: "Positive Sentiment",
    value: "85%",
    icon: ThumbsUp,
    color: "text-mint",
  },
  {
    title: "Urgent Cases",
    value: "12",
    icon: AlertTriangle,
    color: "text-mint",
  },
];

const chartData = [
  { date: "Mon", duration: 240 },
  { date: "Tue", duration: 300 },
  { date: "Wed", duration: 280 },
  { date: "Thu", duration: 320 },
  { date: "Fri", duration: 290 },
  { date: "Sat", duration: 220 },
  { date: "Sun", duration: 200 },
];

const Calls = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-forest">Call Analytics Overview</h2>
        <p className="text-gray-500">Monitor and analyze call performance across all practices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Call Duration Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="duration" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calls;
