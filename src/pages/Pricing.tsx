import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PricingPage = () => {
  const plans = [
    {
      name: "Basic",
      title: "Small Practice",
      price: "€999",
      description: "Perfect for small practices",
      features: [
        "5000 call minutes per month",
        "Standard doctor's assistant protocol NHG / NVDA",
        "Dashboard basic insights",
      ],
    },
    {
      name: "Grow",
      title: "Medium Practice",
      price: "€1.799",
      description: "Ideal for growing practices",
      popular: true,
      features: [
        "10000 call minutes per month",
        "Standard doctor's assistant protocol NHG / NVDA",
        "Dashboard basic insights",
        "EHR Integration",
        "Date of birth/name verification",
        "Email follow-up",
      ],
    },
    {
      name: "Scale",
      title: "Large Practice",
      price: "€2.499",
      description: "For established practices",
      features: [
        "15000 call minutes per month",
        "Standard doctor's assistant protocol NHG / NVDA",
        "Dashboard basic insights",
        "EHR Integration",
        "Date of birth/name verification",
        "Email follow-up",
        "Customizable doctor's assistant protocol",
        "Choose your own voice",
      ],
    },
    {
      name: "Enterprise",
      title: "Chain of Practices",
      price: "On Request",
      description: "For healthcare networks",
      features: [
        "50000 call minutes per month",
        "Standard doctor's assistant protocol NHG / NVDA",
        "Dashboard basic insights",
        "EHR Integration",
        "Date of birth/name verification",
        "Email follow-up",
        "Customizable doctor's assistant protocol",
        "Choose your own voice",
        "Call sentiment analysis",
        "Custom system integrations",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-mint mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-400">Choose the perfect plan for your practice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative bg-forest-light border-mint/20 ${plan.popular ? 'border-mint' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-mint text-forest px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-mint">{plan.title}</CardTitle>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.name !== "Enterprise" && <span className="text-gray-400 ml-2">/ month</span>}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Separator className="bg-mint/20" />
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-mint" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter>
                <Button className="w-full bg-mint hover:bg-mint-light text-forest font-semibold">
                  Book a Demo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            All plans include 24/7 support, automatic updates, and our satisfaction guarantee.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;