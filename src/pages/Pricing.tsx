import { MultiStepPricingForm } from "@/components/pricing2/MultiStepPricingForm";
import { Quote } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-forest pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row lg:items-start lg:gap-16">
        {/* Left side content */}
        <div className="lg:w-[45%] mb-8 lg:mb-0 lg:sticky lg:top-8">          
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-mint tracking-tight mb-8">DoctorDial</h2>
            <p className="text-sm font-medium text-mint mb-4">PRICING REQUEST</p>
            <h1 className="text-4xl font-bold text-white mb-4">Get a custom quote</h1>
            <p className="text-lg text-gray-400 max-w-xl">
              DoctorDial's pricing model depends on a few factors specific to your practice, so we'll need to get in touch to give you accurate pricing information.
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="bg-forest-light rounded-xl border border-mint/10 p-8">
            <Quote className="text-mint w-8 h-8 mb-4" />
            <p className="text-gray-300 text-lg mb-6">
              "DoctorDial has transformed how we handle patient calls. The AI system is incredibly accurate and has significantly reduced the workload on our staff. It's been a game-changer for our practice."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                alt="Dr. Sarah Chen"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-white">Dr. Sarah Chen</p>
                <p className="text-gray-400">GP Practice Lead</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side form */}
        <div className="lg:w-[55%]">
          <div className="max-w-xl">
            <MultiStepPricingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;