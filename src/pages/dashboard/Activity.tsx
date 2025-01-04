import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity as ActivityIcon, Phone, Calendar, UserPlus, AlertCircle } from "lucide-react";

const Activity = () => {
  const activities = [
    {
      type: "call",
      title: "Urgent call handled",
      description: "Patient with severe symptoms directed to emergency care",
      time: "5 minutes ago",
      icon: Phone,
      severity: "urgent",
    },
    {
      type: "appointment",
      title: "New appointment scheduled",
      description: "Follow-up consultation for patient #12345",
      time: "15 minutes ago",
      icon: Calendar,
      severity: "normal",
    },
    {
      type: "client",
      title: "New practice onboarded",
      description: "Central Medical Group joined the platform",
      time: "1 hour ago",
      icon: UserPlus,
      severity: "normal",
    },
    {
      type: "alert",
      title: "System alert",
      description: "High call volume detected in West Region",
      time: "2 hours ago",
      icon: AlertCircle,
      severity: "warning",
    },
  ];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "urgent":
        return "bg-red-100 text-red-600";
      case "warning":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-mint/10 text-mint";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Activity Log</h2>
        <p className="text-gray-500">Track all system activities and events</p>
      </div>

      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <ActivityIcon className="w-5 h-5 text-mint" />
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-8 w-px bg-gray-200" />
            <div className="space-y-8">
              {activities.map((activity, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-mint flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-mint" />
                    </div>
                  </div>
                  <div className="ml-20 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-forest">
                        {activity.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs rounded-full ${getSeverityStyles(activity.severity)}`}>
                        {activity.severity}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-1">{activity.description}</p>
                    <p className="text-sm text-gray-400 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Activity by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Calls", count: 145, percentage: 45 },
                { type: "Appointments", count: 89, percentage: 28 },
                { type: "System Events", count: 54, percentage: 17 },
                { type: "User Actions", count: 32, percentage: 10 },
              ].map((stat) => (
                <div key={stat.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-forest">{stat.type}</span>
                    <span className="text-gray-500">{stat.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-mint rounded-full h-2"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Activity Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest">Time Range</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Custom range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest">Activity Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>All Activities</option>
                  <option>Calls Only</option>
                  <option>Appointments</option>
                  <option>System Events</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest">Severity</label>
                <select className="w-full p-2 border rounded-md">
                  <option>All Severities</option>
                  <option>Urgent Only</option>
                  <option>Warnings Only</option>
                  <option>Normal Only</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Activity;
