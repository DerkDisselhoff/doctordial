import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Phone, Calendar, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const practiceData = [
  { name: "Mon", calls: 45 },
  { name: "Tue", calls: 52 },
  { name: "Wed", calls: 49 },
  { name: "Thu", calls: 63 },
  { name: "Fri", calls: 58 },
  { name: "Sat", calls: 23 },
  { name: "Sun", calls: 18 },
];

const Practices = () => {
  const stats = [
    {
      title: "Total Practices",
      value: "24",
      icon: Building2,
      description: "Across all regions",
    },
    {
      title: "Total Calls",
      value: "308",
      icon: Phone,
      description: "This week",
    },
    {
      title: "Appointments",
      value: "156",
      icon: Calendar,
      description: "Scheduled this week",
    },
    {
      title: "Urgent Cases",
      value: "12",
      icon: AlertCircle,
      description: "Requiring immediate attention",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Practice Overview</h2>
        <p className="text-gray-500">Monitor practice performance and metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Weekly Call Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={practiceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#64FFDA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Top Performing Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Central Medical", calls: 127, efficiency: "94%" },
                { name: "West End Clinic", calls: 98, efficiency: "91%" },
                { name: "Harbor Health", calls: 86, efficiency: "89%" },
              ].map((practice) => (
                <div
                  key={practice.name}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-forest">{practice.name}</p>
                    <p className="text-sm text-gray-500">{practice.calls} calls this week</p>
                  </div>
                  <span className="px-3 py-1 text-xs bg-mint/10 text-mint rounded-full">
                    {practice.efficiency} efficient
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Practices Requiring Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "South Side Medical", issue: "High missed call rate", severity: "High" },
                { name: "East Point Clinic", issue: "Long wait times", severity: "Medium" },
                { name: "North Care Center", issue: "Staff shortage", severity: "Low" },
              ].map((practice) => (
                <div
                  key={practice.name}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-forest">{practice.name}</p>
                    <p className="text-sm text-gray-500">{practice.issue}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    practice.severity === "High"
                      ? "bg-red-100 text-red-600"
                      : practice.severity === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {practice.severity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Practices;
