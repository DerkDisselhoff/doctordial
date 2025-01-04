import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

const Billing = () => {
  const { data: billingInfo } = useQuery({
    queryKey: ['billingInfo'],
    queryFn: async () => {
      const { data } = await supabase
        .from('billing')
        .select('*')
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
          <p className="text-gray-500">Plan: {billingInfo?.plan}</p>
          <p className="text-gray-500">Next Billing Date: {billingInfo?.next_billing_date}</p>
          <Button className="mt-4">Update Subscription</Button>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-forest">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {billingInfo?.history.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.date}</span>
                <span>${item.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
