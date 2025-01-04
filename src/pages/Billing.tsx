import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

const Billing = () => {
  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data } = await supabase
        .from('company_subscriptions')
        .select('*')
        .eq('profile_id', user.id)
        .single();
      
      return data;
    },
  });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Billing & Subscriptions</h2>
        <p className="text-gray-500">Manage your billing and subscription details</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-forest">Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Plan: {subscription?.package_name || 'No active subscription'}</p>
          <p className="text-gray-500">Status: {subscription?.status || 'Inactive'}</p>
          <Button className="mt-4">Update Subscription</Button>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-forest">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No billing history available</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;