import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Package, Receipt } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

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

const BillingSettings = () => {
  const [currentPackage, setCurrentPackage] = useState<PackageFeature | null>(null);
  const [packages, setPackages] = useState<PackageFeature[]>([]);
  const [loading, setLoading] = useState(true);
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

    fetchPackages();
  }, [toast]);

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Custom pricing';
    return `€${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Billing Settings</h2>
        <p className="text-white/60">Manage your billing information and subscription</p>
      </div>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {currentPackage && (
            <div className="p-4 bg-forest border border-mint/10 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {currentPackage.package_name} Package
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm text-white/60">
                      {currentPackage.minutes_included && `${currentPackage.minutes_included.toLocaleString()} minutes included`}
                    </p>
                    <p className="text-sm text-white/60">
                      {currentPackage.fte_count && `Up to ${currentPackage.fte_count} FTE`}
                    </p>
                    <p className="text-sm text-mint">
                      {formatPrice(currentPackage.monthly_price)}/month
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="border-mint text-white hover:bg-mint/10"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Change Plan
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border border-mint/10 rounded-lg bg-forest">
            <CreditCard className="h-6 w-6 text-mint" />
            <div>
              <p className="font-medium text-white">•••• •••• •••• 4242</p>
              <p className="text-sm text-white/60">Expires 12/24</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-mint text-white hover:bg-mint/10"
          >
            Update Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="flex justify-between items-center p-4 border border-mint/10 rounded-lg bg-forest"
              >
                <div className="flex items-center space-x-4">
                  <Receipt className="h-5 w-5 text-mint" />
                  <div>
                    <p className="font-medium text-white">Invoice #{2024001 + i}</p>
                    <p className="text-sm text-white/60">March {1 + i}, 2024</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-mint hover:text-mint hover:bg-mint/10"
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