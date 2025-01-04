import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type PricingPackage = {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
};

const pricingPackages: PricingPackage[] = [
  {
    name: "Starter",
    price: "€199/month",
    features: [
      "Up to 500 calls per month",
      "Basic call analytics",
      "Email support",
      "Standard response time"
    ]
  },
  {
    name: "Growth",
    price: "€399/month",
    features: [
      "Up to 2000 calls per month",
      "Advanced analytics",
      "Priority support",
      "Custom voice configuration"
    ],
    isPopular: true
  },
  {
    name: "Scale",
    price: "€799/month",
    features: [
      "Up to 5000 calls per month",
      "Enterprise analytics",
      "24/7 support",
      "Custom integrations",
      "Dedicated account manager"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited calls",
      "Custom solutions",
      "White-label options",
      "API access",
      "SLA guarantees"
    ]
  }
];

const Billing = () => {
  const [currentPackage, setCurrentPackage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        // Fetch user's current package from company_subscriptions
        const { data: subscription, error } = await supabase
          .from('company_subscriptions')
          .select('package_name')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching subscription:', error);
          toast({
            title: "Error",
            description: "Failed to fetch subscription details. Please try again later.",
            variant: "destructive"
          });
        } else {
          setCurrentPackage(subscription?.package_name || null);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-forest flex items-center justify-center">
        <div className="text-mint">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your Subscription</h1>
          {currentPackage ? (
            <div className="bg-forest-light p-4 rounded-lg inline-block">
              <p className="text-mint">Current Package: <span className="font-bold">{currentPackage}</span></p>
            </div>
          ) : (
            <div className="bg-forest-light p-4 rounded-lg inline-block">
              <p className="text-mint">No active subscription</p>
              <Button 
                className="mt-2 bg-mint text-forest hover:bg-mint/90"
                onClick={() => {
                  toast({
                    title: "Contact Support",
                    description: "Please contact your account manager to set up a subscription.",
                  });
                }}
              >
                Contact Support
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative bg-forest-light rounded-xl p-6 border ${
                currentPackage === pkg.name
                  ? 'border-mint'
                  : 'border-mint/20'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-mint text-forest px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
                <p className="text-2xl font-bold text-mint mb-6">{pkg.price}</p>
                <ul className="space-y-3 text-gray-300 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-mint mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300">
            Need to change your plan? Contact your account manager or{" "}
            <a href="mailto:support@doctordial.com" className="text-mint hover:text-mint-light">
              reach out to support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;