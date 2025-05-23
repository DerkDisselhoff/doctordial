import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Package, Receipt, Clock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PackageFeature {
  id: string;
  package_name: "starter" | "growth" | "professional" | "enterprise";
  features: string[];
  minutes_included: number | null;
  overage_fee: number | null;
  fte_count: number | null;
  price_per_hour: number | null;
  monthly_price: number | null;
  created_at: string;
  updated_at: string;
}

interface UsageMetrics {
  minutesUsed: number;
  minutesLeft: number;
  overageMinutes: number;
}

const BillingSettings = () => {
  const [currentPackage, setCurrentPackage] = useState<PackageFeature | null>(null);
  const [packages, setPackages] = useState<PackageFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics>({
    minutesUsed: 0,
    minutesLeft: 0,
    overageMinutes: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('package_features')
          .select('*');

        if (error) throw error;

        // Transform the data to ensure features is always a string array
        const transformedData = (data || []).map(pkg => ({
          ...pkg,
          features: Array.isArray(pkg.features) ? pkg.features : 
                   typeof pkg.features === 'string' ? JSON.parse(pkg.features) :
                   []
        })) as PackageFeature[];

        setPackages(transformedData);
        
        // For demo purposes, set professional as current package
        setCurrentPackage(transformedData?.find(pkg => pkg.package_name === 'professional') || null);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast({
          title: "Error",
          description: "Failed to load package information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchUsageMetrics = async () => {
      try {
        // Get the first day of current month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        // Calculate usage metrics by querying multiple tables
        let totalSeconds = 0;

        // Query call_logs_triage
        const { data: triageLogs, error: triageError } = await supabase
          .from('call_logs_triage')
          .select('duration_seconds')
          .gte('created_at', startOfMonth.toISOString());

        if (triageError) throw triageError;
        
        // Query call_logs_medications
        const { data: medicationLogs, error: medicationError } = await supabase
          .from('call_logs_medications')
          .select('duration_seconds')
          .gte('created_at', startOfMonth.toISOString());

        if (medicationError) throw medicationError;

        // Query call_logs_researchresults
        const { data: researchLogs, error: researchError } = await supabase
          .from('call_logs_researchresults')
          .select('duration_seconds')
          .gte('created_at', startOfMonth.toISOString());

        if (researchError) throw researchError;

        // Sum up durations from all tables
        const sumDurations = (logs: any[]) => {
          return logs?.reduce((acc, log) => {
            return acc + (parseInt(log.duration_seconds || '0', 10));
          }, 0) || 0;
        };

        totalSeconds += sumDurations(triageLogs || []);
        totalSeconds += sumDurations(medicationLogs || []);
        totalSeconds += sumDurations(researchLogs || []);
        
        const minutesUsed = Math.ceil(totalSeconds / 60);
        const minutesIncluded = currentPackage?.minutes_included || 0;
        const minutesLeft = Math.max(0, minutesIncluded - minutesUsed);
        const overageMinutes = minutesUsed > minutesIncluded ? minutesUsed - minutesIncluded : 0;

        setUsageMetrics({
          minutesUsed,
          minutesLeft,
          overageMinutes,
        });

      } catch (error) {
        console.error('Error fetching usage metrics:', error);
        toast({
          title: "Error",
          description: "Failed to load usage metrics",
          variant: "destructive",
        });
      }
    };

    fetchPackages();
    fetchUsageMetrics();
  }, [toast, currentPackage?.minutes_included]);

  const handleChangePlan = async (newPackage: PackageFeature) => {
    try {
      // Here you would typically integrate with your payment provider
      // and update the subscription in your database
      toast({
        title: "Plan Change Requested",
        description: `Changing to ${newPackage.package_name} package. This feature will be fully implemented soon.`,
      });
      setIsChangePlanOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change plan",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Custom pricing';
    return `€${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-dark">Billing Settings</h2>
        <p className="text-gray">Manage your billing information and subscription</p>
      </div>

      {/* Usage Metrics Card */}
      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark">Usage Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-gray-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-mint" />
                <h3 className="text-gray-dark font-medium">Minutes Used</h3>
              </div>
              <p className="text-2xl font-bold text-gray-dark mt-2">{usageMetrics.minutesUsed}</p>
              <p className="text-sm text-gray">This month</p>
            </div>
            <div className="p-4 bg-white border border-gray-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-mint" />
                <h3 className="text-gray-dark font-medium">Minutes Left</h3>
              </div>
              <p className="text-2xl font-bold text-gray-dark mt-2">{usageMetrics.minutesLeft}</p>
              <p className="text-sm text-gray">From package</p>
            </div>
            <div className="p-4 bg-white border border-gray-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-mint" />
                <h3 className="text-gray-dark font-medium">Overage Minutes</h3>
              </div>
              <p className="text-2xl font-bold text-gray-dark mt-2">{usageMetrics.overageMinutes}</p>
              <p className="text-sm text-gray">Additional usage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {currentPackage && (
            <div className="p-4 bg-white border border-gray-muted rounded-lg">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-dark capitalize">
                    {currentPackage.package_name} Package
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray">
                      {currentPackage.minutes_included && `${currentPackage.minutes_included.toLocaleString()} minutes included`}
                    </p>
                    <p className="text-sm text-gray">
                      {currentPackage.overage_fee && `€${currentPackage.overage_fee}/minute overage fee`}
                    </p>
                    <p className="text-sm text-mint">
                      {formatPrice(currentPackage.monthly_price)}/month
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-blue-dark hover:bg-blue-dark/90 text-white"
                  onClick={() => setIsChangePlanOpen(true)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Change Plan
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Plan Dialog */}
      <Dialog open={isChangePlanOpen} onOpenChange={setIsChangePlanOpen}>
        <DialogContent className="bg-white border-gray-muted text-gray-dark max-w-5xl">
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription className="text-gray">
              Your current plan: <span className="text-mint capitalize">{currentPackage?.package_name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-4 border rounded-lg transition-all h-full flex flex-col ${
                  pkg.id === currentPackage?.id
                    ? 'border-mint bg-mint-light/10'
                    : 'border-gray-muted bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold capitalize mb-1">{pkg.package_name}</h3>
                    <p className="text-mint text-xl font-bold">
                      {formatPrice(pkg.monthly_price)}<span className="text-sm font-normal">/month</span>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-gray">
                      <p className="font-medium">Minutes Included</p>
                      <p className="text-mint">{pkg.minutes_included?.toLocaleString()} minutes/month</p>
                    </div>
                    <div className="text-gray">
                      <p className="font-medium">Overage Fee</p>
                      <p className="text-mint">€{pkg.overage_fee}/minute</p>
                    </div>
                    {pkg.fte_count && (
                      <div className="text-gray">
                        <p className="font-medium">Saved FTE</p>
                        <p className="text-mint">~ Up to {pkg.fte_count} FTE</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-gray">Features</p>
                    <ul className="space-y-2">
                      {Array.isArray(pkg.features) && pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray">
                          <div className="w-1.5 h-1.5 rounded-full bg-mint mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className={pkg.id === currentPackage?.id 
                    ? "w-full border-gray-muted text-gray hover:bg-gray-50 mt-4"
                    : "w-full bg-blue-dark hover:bg-blue-dark/90 text-white mt-4"}
                  onClick={() => handleChangePlan(pkg)}
                  disabled={pkg.id === currentPackage?.id}
                >
                  {pkg.id === currentPackage?.id ? (
                    <span className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-mint" />
                      Current Plan
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Select Plan
                    </span>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 p-4 border border-gray-muted rounded-lg bg-white">
              <CreditCard className="h-6 w-6 text-mint" />
              <div>
                <p className="font-medium text-gray-dark">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray">Expires 12/24</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 border border-gray-muted rounded-lg bg-white">
              <Receipt className="h-6 w-6 text-mint" />
              <div>
                <p className="font-medium text-gray-dark">Direct Debit</p>
                <p className="text-sm text-gray">IBAN ending in 3456</p>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="bg-blue-dark hover:bg-blue-dark/90 text-white"
          >
            Update Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="flex justify-between items-center p-4 border border-gray-muted rounded-lg bg-white"
              >
                <div className="flex items-center space-x-4">
                  <Receipt className="h-5 w-5 text-mint" />
                  <div>
                    <p className="font-medium text-gray-dark">Invoice #{2024001 + i}</p>
                    <p className="text-sm text-gray">March {1 + i}, 2024</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-gray hover:text-gray-dark hover:bg-gray-50"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
