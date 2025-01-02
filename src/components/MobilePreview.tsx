import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, Shield, CheckCircle } from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-mint" />
            <h2 className="text-4xl font-bold">Real-time Insights</h2>
          </div>
          <p className="text-white/80 max-w-md">
            Access comprehensive analytics and insights about your practice's call patterns, patient needs, and service performance through our intuitive dashboard.
          </p>
          <Button className="bg-mint hover:bg-mint/90 text-forest font-medium">
            View Demo <LineChart className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            alt="Analytics dashboard showing patient call patterns and insights"
            className="rounded-2xl shadow-2xl mx-auto relative"
          />
        </div>
      </div>

      {/* Certification Section */}
      <div className="mt-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-mint/10 px-4 py-2 rounded-full border border-mint/20 mb-8">
            <Shield className="w-4 h-4 text-mint" />
            <span className="text-mint text-sm font-medium">Certified & Compliant</span>
          </div>
          <h3 className="text-3xl font-bold mb-8">Trusted by Dutch Healthcare Institutions</h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="p-6 rounded-xl bg-forest-light border border-mint/10 space-y-4 hover:border-mint/20 transition-colors">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-mint/20 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <img
                  src="/lovable-uploads/e3414d74-91fb-4ad7-b8a5-9dd5d82520b9.png"
                  alt="NHG Logo"
                  className="h-24 mx-auto relative"
                />
              </div>
              <div className="space-y-2">
                <p className="text-mint font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  NHG-Triage Certified
                </p>
                <p className="text-sm text-white/60">
                  Our AI model is trained on official NHG-Triage protocols
                </p>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-forest-light border border-mint/10 space-y-4 hover:border-mint/20 transition-colors">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-mint/20 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <img
                  src="/assets/nvda-logo.svg"
                  alt="NVDA Logo"
                  className="h-24 mx-auto relative filter brightness-0 invert opacity-90"
                />
              </div>
              <div className="space-y-2">
                <p className="text-mint font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  NVDA Standards Compliant
                </p>
                <p className="text-sm text-white/60">
                  Fully compliant with NVDA behavioral standards
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-white/60 max-w-2xl mx-auto">
            Our AI model is meticulously trained on NHG-Triage protocols and adheres to NVDA behavioral standards, ensuring the highest quality of patient care in accordance with Dutch healthcare regulations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;