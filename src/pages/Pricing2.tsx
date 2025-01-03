import { MultiStepPricingForm } from "@/components/pricing2/MultiStepPricingForm";
import { Quote } from "lucide-react";

const Pricing2 = () => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side content */}
      <div className="hidden lg:flex lg:w-[60%] p-12 flex-col bg-forest">
        <div className="mb-12">
          <img 
            src="/lovable-uploads/cb3c4bbf-4e87-44de-856b-59e135958c65.png" 
            alt="DoctorDial Logo" 
            className="w-32 mb-16" 
          />
          
          <div className="mt-8 mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Get started with DoctorDial</h1>
            <p className="text-white/80 max-w-xl text-lg">
              Join hundreds of medical practices that trust DoctorDial to manage their patient communications efficiently.
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="bg-forest-light p-8 rounded-xl max-w-xl">
            <Quote className="text-mint w-8 h-8 mb-4" />
            <p className="text-white/90 text-lg mb-6">
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
                <p className="text-white/60">GP Practice Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-[40%] bg-[#F8FAFF] min-h-screen">
        <div className="max-w-xl mx-auto p-8">
          <MultiStepPricingForm />
        </div>
      </div>
    </div>
  );
};

export default Pricing2;