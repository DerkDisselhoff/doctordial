import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BillingStats } from "@/components/dashboard/billing/BillingStats";
import { SubscriptionsTable } from "@/components/dashboard/billing/SubscriptionsTable";

interface Subscription {
  id: string;
  profile_id: string;
  package_name: string;
  status: string;
  created_at: string;
  company_name: string | null;
}

const Billing = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        const { data, error } = await supabase
          .from('company_subscriptions')
          .select(`
            *,
            profiles (
              company_name
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching subscriptions:', error);
          toast({
            title: "Error",
            description: "Failed to fetch subscription details.",
            variant: "destructive"
          });
        } else {
          const formattedSubscriptions = data.map(sub => ({
            ...sub,
            company_name: sub.profiles?.company_name
          }));
          setSubscriptions(formattedSubscriptions);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-mint">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Billing & Subscriptions</h1>
        <Button 
          className="bg-mint text-forest hover:bg-mint/90"
          onClick={() => navigate('/dashboard/clients/new')}
        >
          New Client
        </Button>
      </div>

      <BillingStats />

      <Card className="bg-forest-light border-mint/20">
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>Overview of all client subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <SubscriptionsTable subscriptions={subscriptions} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;