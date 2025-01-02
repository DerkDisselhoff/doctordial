import { Button } from "@/components/ui/button";
import { BarChart3, LineChart } from "lucide-react";

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
      <div className="mt-32 text-center">
        <h3 className="text-2xl font-bold mb-8">Certified & Compliant</h3>
        <div className="flex flex-wrap justify-center items-center gap-12">
          <div className="space-y-4">
            <img
              src="https://triagewijzer.nhg.org/assets/images/nhg-logo.svg"
              alt="NHG Logo"
              className="h-24 mx-auto filter brightness-0 invert opacity-80"
            />
            <p className="text-mint font-medium">NHG-Triage Certified</p>
          </div>
          <div className="space-y-4">
            <img
              src="https://www.nvda.nl/wp-content/themes/nvda/images/logo.svg"
              alt="NVDA Logo"
              className="h-24 mx-auto filter brightness-0 invert opacity-80"
            />
            <p className="text-mint font-medium">NVDA Standards Compliant</p>
          </div>
        </div>
        <p className="mt-8 text-white/60 max-w-2xl mx-auto">
          Our AI model is meticulously trained on NHG-Triage protocols and adheres to NVDA behavioral standards, ensuring the highest quality of patient care in accordance with Dutch healthcare regulations.
        </p>
      </div>
    </section>
  );
};

export default DashboardPreview;