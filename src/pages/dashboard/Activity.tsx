import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Phone, Calendar, Users } from "lucide-react";

const ActivityPage = () => {
  const activities = [
    {
      id: 1,
      type: "Call",
      description: "Incoming call from +31 6 1234 5678",
      time: "5 minutes ago",
      status: "completed"
    },
    {
      id: 2,
      type: "Appointment",
      description: "New appointment scheduled for Dr. Smith",
      time: "15 minutes ago",
      status: "scheduled"
    },
    {
      id: 3,
      type: "Patient",
      description: "New patient registration completed",
      time: "1 hour ago",
      status: "completed"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Call":
        return <Phone className="h-4 w-4" />;
      case "Appointment":
        return <Calendar className="h-4 w-4" />;
      case "Patient":
        return <Users className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-forest">Activity Log</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Today's Activities</CardTitle>
              <Activity className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">24</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Active Users</CardTitle>
              <Users className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">8</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">Pending Actions</CardTitle>
              <Calendar className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">5</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-forest">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-4 p-4 ${
                    index !== activities.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-forest">{activity.description}</p>
                    <p className="text-xs text-forest/60">{activity.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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