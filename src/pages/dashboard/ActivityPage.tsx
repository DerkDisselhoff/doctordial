import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Activity, UserPlus, PhoneCall, FileText, Settings } from "lucide-react";

export default function ActivityPage() {
  const activities = [
    {
      id: 1,
      type: "New Client",
      description: "Central Medical Practice was added to the platform",
      timestamp: "2 hours ago",
      icon: UserPlus,
      color: "text-green-500",
    },
    {
      id: 2,
      type: "Call Analytics",
      description: "Monthly call volume report generated",
      timestamp: "5 hours ago",
      icon: PhoneCall,
      color: "text-mint",
    },
    {
      id: 3,
      type: "Contract",
      description: "New contract signed with Riverside Health Center",
      timestamp: "1 day ago",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 4,
      type: "System Update",
      description: "System maintenance completed",
      timestamp: "2 days ago",
      icon: Settings,
      color: "text-orange-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-forest">Activity Log</h1>
          <p className="text-gray-500 mt-2">Track all system activities and changes</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-forest">Recent Activity</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg bg-gray-50`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-forest">{activity.type}</p>
                    <span className="text-sm text-gray-500">{activity.timestamp}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}