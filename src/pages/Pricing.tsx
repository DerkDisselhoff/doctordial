
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckIcon, Users, Building2, BuildingIcon, Building } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Pricing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Calculate discounted monthly price for yearly billing
  const calculateDiscountedMonthlyPrice = (monthlyPrice: number): string => {
    // Apply 20% discount for yearly billing
    const discountedPrice = Math.round(monthlyPrice * 0.8);
    return `€${discountedPrice}`;
  };

  // Define pricing plans
  const plans = [
    {
      name: t("pricing.plans.basic.title"),
      description: t("pricing.plans.description"),
      icon: <Building2 size={24} className="text-mint" />,
      price: billingPeriod === 'monthly' ? '€499' : calculateDiscountedMonthlyPrice(499),
      period: '/month',
      yearlyDiscount: billingPeriod === 'yearly' ? t("pricing.yearlyBilled") : '',
      features: [
        t("pricing.plans.basic.features.agent"),
        t("pricing.plans.basic.features.minutes"),
        t("pricing.plans.basic.features.customization"),
        t("pricing.plans.basic.features.support"),
        t("pricing.plans.basic.features.extra")
      ],
      recommended: false,
      clinics: t("pricing.plans.basic.clinics"),
      ctaText: t("pricing.plans.basic.cta"),
      ctaAction: () => navigate('/demo-request')
    },
    {
      name: t("pricing.plans.group.title"),
      description: t("pricing.plans.description"),
      icon: <BuildingIcon size={24} className="text-mint" />,
      price: billingPeriod === 'monthly' ? '€999' : calculateDiscountedMonthlyPrice(999),
      period: '/month',
      yearlyDiscount: billingPeriod === 'yearly' ? t("pricing.yearlyBilled") : '',
      features: [
        t("pricing.plans.group.features.agent"),
        t("pricing.plans.group.features.minutes"),
        t("pricing.plans.group.features.customization"),
        t("pricing.plans.group.features.support"),
        t("pricing.plans.group.features.extra")
      ],
      recommended: true,
      clinics: t("pricing.plans.group.clinics"),
      ctaText: t("pricing.plans.group.cta"),
      ctaAction: () => navigate('/demo-request')
    },
    {
      name: t("pricing.plans.premium.title"),
      description: t("pricing.plans.description"),
      icon: <Building size={24} className="text-mint" />,
      price: billingPeriod === 'monthly' ? '€1,999' : calculateDiscountedMonthlyPrice(1999),
      period: '/month',
      yearlyDiscount: billingPeriod === 'yearly' ? t("pricing.yearlyBilled") : '',
      features: [
        t("pricing.plans.premium.features.agent"),
        t("pricing.plans.premium.features.minutes"),
        t("pricing.plans.premium.features.customization"),
        t("pricing.plans.premium.features.support"),
        t("pricing.plans.premium.features.extra")
      ],
      recommended: false,
      clinics: t("pricing.plans.premium.clinics"),
      ctaText: t("pricing.plans.premium.cta"),
      ctaAction: () => navigate('/demo-request')
    },
    {
      name: t("pricing.plans.enterprise.title"),
      description: t("pricing.plans.description"),
      icon: <Users size={24} className="text-mint" />,
      price: t("pricing.plans.enterprise.custom"),
      period: '',
      yearlyDiscount: '',
      features: [
        t("pricing.plans.enterprise.features.agent"),
        t("pricing.plans.enterprise.features.minutes"),
        t("pricing.plans.enterprise.features.customization"),
        t("pricing.plans.enterprise.features.support"),
        t("pricing.plans.enterprise.features.extra")
      ],
      recommended: false,
      clinics: t("pricing.plans.enterprise.clinics"),
      ctaText: t("pricing.plans.enterprise.cta"),
      ctaAction: () => navigate('/demo-request')
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mint-light/20 to-white opacity-50" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-forest mb-4">{t("pricing.titleNew")}</h1>
            <p className="text-xl text-gray max-w-3xl mx-auto mb-8">{t("pricing.subtitle")}</p>
            
            {/* Billing toggle */}
            <div className="inline-flex items-center justify-center bg-gray-50 rounded-lg p-1 shadow-sm border border-gray-muted/30 mb-2">
              <ToggleGroup 
                type="single" 
                value={billingPeriod}
                onValueChange={(value) => value && setBillingPeriod(value as 'monthly' | 'yearly')} 
                className="flex gap-1"
              >
                <ToggleGroupItem 
                  value="monthly" 
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    billingPeriod === 'monthly' 
                      ? 'bg-white text-forest shadow-sm' 
                      : 'text-gray hover:text-forest'
                  }`}
                >
                  {t("pricing.monthly")}
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="yearly" 
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    billingPeriod === 'yearly' 
                      ? 'bg-white text-forest shadow-sm' 
                      : 'text-gray hover:text-forest'
                  }`}
                >
                  {t("pricing.yearly")} ({t("pricing.save")} 20%)
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          
          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {plans.map((plan, index) => (
              <div key={index} className="relative group">
                {plan.recommended && (
                  <div className="absolute top-0 left-0 right-0 -mt-6 z-10">
                    <div className="bg-blue-dark text-white text-center py-2 text-sm font-medium rounded-t-lg shadow-sm">
                      {t("pricing.recommended")}
                    </div>
                  </div>
                )}
                <Card 
                  className={`border rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 ${
                    plan.recommended 
                      ? 'border-mint shadow-lg shadow-mint/20 rounded-t-none group-hover:shadow-xl group-hover:shadow-mint/30' 
                      : 'border-gray-muted group-hover:border-mint/50 group-hover:shadow-md'
                  }`}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="mr-3 p-2 rounded-lg bg-mint-light transition-all duration-300 group-hover:bg-mint/20">{plan.icon}</div>
                      <h3 className="text-xl font-semibold text-forest">{plan.name}</h3>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-light">{plan.clinics}</div>
                    
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-forest transition-all duration-300 group-hover:text-mint-dark">{plan.price}</span>
                        <span className="ml-1 text-gray">{plan.period}</span>
                      </div>
                      {plan.yearlyDiscount && (
                        <div className="mt-1 text-sm text-mint-dark font-medium">
                          {plan.yearlyDiscount}
                        </div>
                      )}
                    </div>
                    
                    <ul className="mt-6 space-y-4 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-mint flex-shrink-0 mr-2 transition-all duration-300 group-hover:scale-110" />
                          <span className="text-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 pt-6">
                      <Button 
                        onClick={plan.ctaAction}
                        className={`w-full py-3 transition-all duration-300 ${
                          plan.recommended
                            ? 'bg-blue-dark hover:bg-blue-dark/90 text-white group-hover:translate-y-[-2px]'
                            : 'bg-gray-muted hover:bg-mint-light text-forest hover:text-forest-dark group-hover:translate-y-[-2px]'
                        }`}
                      >
                        {plan.ctaText}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gray-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest mb-4">{t("pricing.faq.title")}</h2>
            <p className="text-xl text-gray max-w-2xl mx-auto">{t("pricing.faq.subtitle")}</p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-muted">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="py-6">
                <h3 className="text-lg font-medium text-forest mb-2">{t(`pricing.faq.q${i + 1}`)}</h3>
                <p className="text-gray">{t(`pricing.faq.a${i + 1}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-forest">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">{t("pricing.cta.title")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">{t("pricing.cta.subtitle")}</p>
          <Button 
            onClick={() => navigate('/demo-request')}
            className="bg-mint hover:bg-mint-dark text-white px-8 py-3 rounded-lg text-lg font-medium"
          >
            {t("pricing.cta.button")}
          </Button>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Pricing;
