import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, PhoneCall } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    {
      title: "Monthly Performance",
      description: "Call handling and response metrics",
      icon: BarChart3,
      type: "Performance",
    },
    {
      title: "Growth Analytics",
      description: "Practice and patient growth trends",
      icon: TrendingUp,
      type: "Growth",
    },
    {
      title: "Client Satisfaction",
      description: "Patient feedback and satisfaction scores",
      icon: Users,
      type: "Satisfaction",
    },
    {
      title: "Call Volume Analysis",
      description: "Detailed call patterns and trends",
      icon: PhoneCall,
      type: "Analytics",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-forest">Reports</h1>
          <p className="text-gray-500 mt-2">Access and generate detailed business reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card 
              key={report.title} 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-mint/10 rounded-lg">
                  <report.icon className="h-6 w-6 text-mint" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-forest">{report.title}</h3>
                  <p className="text-gray-500 mt-1">{report.description}</p>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-mint font-medium">{report.type}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">Updated daily</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}