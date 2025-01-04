import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Phone, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVapiCalls } from "@/services/vapiService";

export default function CallAnalyticsPage() {
  const { data: calls, isLoading } = useQuery({
    queryKey: ['vapi-calls'],
    queryFn: fetchVapiCalls,
  });

  const metrics = [
    {
      title: "Total Calls",
      value: calls?.length || 0,
      icon: Phone,
      color: "text-mint",
    },
    {
      title: "Avg. Duration",
      value: "3m 45s",
      icon: Clock,
      color: "text-divine",
    },
    {
      title: "Positive Sentiment",
      value: "85%",
      icon: ThumbsUp,
      color: "text-green-500",
    },
    {
      title: "Urgent Cases",
      value: "15",
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-forest">Call Analytics</h1>
          <p className="text-gray-500 mt-2">Monitor and analyze call performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <p className="text-2xl font-semibold mt-1 text-forest">{metric.value}</p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Call Timeline will be implemented here */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-forest mb-4">Recent Calls Timeline</h2>
          {isLoading ? (
            <p>Loading calls...</p>
          ) : (
            <div className="space-y-4">
              {calls?.slice(0, 5).map((call) => (
                <div key={call.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-mint" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-forest">{call.caller_number}</p>
                    <p className="text-sm text-gray-500">Duration: {call.duration}s</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(call.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}