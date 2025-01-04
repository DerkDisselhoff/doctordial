import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

const Calls = () => {
  const { data: calls, isLoading: isLoadingCalls } = useQuery({
    queryKey: ['vapi-calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vapi_calls')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching calls:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  const { data: subscription, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('company_subscriptions')
        .select('package_name')
        .eq('profile_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching subscription:', error);
        throw error;
      }
      
      return data;
    },
  });

  if (isLoadingCalls || isLoadingSubscription) {
    return <div className="p-8">Loading...</div>;
  }

  // If no subscription is found, show a message
  if (!subscription) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-forest mb-4">No Active Subscription</h2>
              <p className="text-gray-600">
                Please subscribe to a package to access call analytics.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Total Calls",
      value: calls?.length || 0,
      icon: Phone,
      description: "All time",
    },
    {
      title: "Average Duration",
      value: "2m 34s",
      icon: Clock,
      description: "Per call",
    },
    {
      title: "Satisfaction Rate",
      value: "92%",
      icon: ThumbsUp,
      description: "Based on analysis",
    },
    {
      title: "Urgent Cases",
      value: "8%",
      icon: AlertTriangle,
      description: "Of total calls",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-forest">Call Analytics</h2>
          <p className="text-gray-500">Monitor and analyze call patterns and performance</p>
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
            <CardTitle>Call Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { time: '00:00', calls: 12 },
                  { time: '04:00', calls: 8 },
                  { time: '08:00', calls: 45 },
                  { time: '12:00', calls: 67 },
                  { time: '16:00', calls: 52 },
                  { time: '20:00', calls: 23 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calls" stroke="#64FFDA" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-forest">Recent Calls</h3>
          <div className="space-y-4">
            {calls?.slice(0, 5).map((call) => (
              <Card key={call.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-mint/10 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-mint" />
                      </div>
                      <div>
                        <p className="font-medium text-forest">
                          {call.caller_number || 'Unknown Caller'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Duration: {call.duration}s
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      call.status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {call.status}
                    </span>
                  </div>
                  {call.transcription && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{call.transcription}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calls;
