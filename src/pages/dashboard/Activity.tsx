import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowDown, ArrowUp, Phone, Users } from "lucide-react";

const ActivityPage = () => {
  const activities = [
    {
      id: 1,
      type: "call",
      description: "Incoming call from +31 6 1234 5678",
      timestamp: "2 minutes ago",
      icon: Phone,
      status: "completed"
    },
    {
      id: 2,
      type: "system",
      description: "System maintenance scheduled",
      timestamp: "1 hour ago",
      icon: Activity,
      status: "pending"
    },
    {
      id: 3,
      type: "call",
      description: "Missed call from +31 6 8765 4321",
      timestamp: "2 hours ago",
      icon: Phone,
      status: "missed"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Activity Log</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Today's Calls</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">124</div>
              <p className="text-xs text-forest/60">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Missed Calls</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">3</div>
              <p className="text-xs text-forest/60">-5% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Active Users</CardTitle>
              <Users className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">28</div>
              <p className="text-xs text-forest/60">Currently online</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <activity.icon className="h-4 w-4 text-forest" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-forest">{activity.description}</p>
                    <p className="text-xs text-forest/60">{activity.timestamp}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'missed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivityPage;