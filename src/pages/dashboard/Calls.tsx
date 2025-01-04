import { Card, CardContent } from "@/components/ui/card";
import { Phone, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { VapiCall } from "@/integrations/supabase/types/tables/vapi-calls";

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
        .maybeSingle();  // Changed from .single() to .maybeSingle()
      
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
    );
  }

  const stats = [
    {
      title: "Total Calls",
      value: calls?.length || 0,
      icon: Phone,
      color: "text-blue-500",
    },
    {
      title: "Average Duration",
      value: calls?.reduce((acc, call) => acc + (call.duration || 0), 0) / (calls?.length || 1),
      icon: Clock,
      color: "text-green-500",
      suffix: "min",
    },
    {
      title: "Positive Sentiment",
      value: calls?.filter(call => 
        call.sentiment_analysis && 
        call.sentiment_analysis.sentiment === 'positive'
      ).length || 0,
      icon: ThumbsUp,
      color: "text-yellow-500",
    },
    {
      title: "Urgent Cases",
      value: calls?.filter(call => 
        call.sentiment_analysis && 
        call.sentiment_analysis.urgency === 'high'
      ).length || 0,
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  // Prepare data for the chart
  const chartData = calls?.map(call => ({
    date: new Date(call.created_at || '').toLocaleDateString(),
    duration: call.duration,
  })) || [];

  return (
    <div className="space-y-6 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {stat.value}
                    {stat.suffix && <span className="text-sm ml-1">{stat.suffix}</span>}
                  </h3>
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
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Call Duration Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="#4F46E5" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calls;