import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Euro, Users, Building2, ArrowUpRight } from "lucide-react";

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

  const stats = [
    {
      title: "Total Revenue",
      value: "€24,500",
      description: "Monthly recurring revenue",
      icon: Euro,
    },
    {
      title: "Active Clients",
      value: "32",
      description: "Subscribed practices",
      icon: Users,
    },
    {
      title: "Practices",
      value: "45",
      description: "Total locations",
      icon: Building2,
    },
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        // Fetch subscriptions with company names from profiles
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Billing & Subscriptions</h1>
        <Button 
          className="bg-mint text-forest hover:bg-mint/90"
          onClick={() => navigate('/dashboard/clients/new')}
        >
          New Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-forest-light border-mint/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-mint text-lg font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-sm text-gray-400 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscriptions Table */}
      <Card className="bg-forest-light border-mint/20">
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>Overview of all client subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-mint/10">
                <TableHead className="text-mint">Company</TableHead>
                <TableHead className="text-mint">Package</TableHead>
                <TableHead className="text-mint">Status</TableHead>
                <TableHead className="text-mint">Start Date</TableHead>
                <TableHead className="text-mint text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow 
                  key={subscription.id}
                  className="border-mint/10 hover:bg-forest transition-colors"
                >
                  <TableCell className="font-medium text-white">
                    {subscription.company_name || 'Unknown Company'}
                  </TableCell>
                  <TableCell className="text-gray-300">{subscription.package_name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      subscription.status === 'active' 
                        ? 'bg-green-500/20 text-green-400'
                        : subscription.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(subscription.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/dashboard/clients/${subscription.profile_id}`)}
                      className="text-mint hover:text-mint/80 hover:bg-mint/10"
                    >
                      <span className="mr-2">View Details</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;