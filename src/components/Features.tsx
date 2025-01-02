import { BookDemoForm } from "./BookDemoForm";
import { Check } from "lucide-react";

const Features = () => {
  const features = [
    "Smart Urgency Detection",
    "24/7 Patient Support",
    "Revenue Optimization",
    "Patient Query Resolution",
    "Appointment Optimization",
    "Data Insights & Control"
  ];

  return (
    <section className="py-20 px-4 bg-forest-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            How Our AI Agent Optimizes Your Incoming Patient Calls
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Experience the future of patient communication with our comprehensive AI solution
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-mint/10 bg-forest hover:border-mint/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-mint/10">
                  <Check className="w-5 h-5 text-mint" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature}</h3>
              </div>
              <p className="text-white/70">
                Enhance your practice efficiency with our advanced AI capabilities.
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <BookDemoForm />
        </div>
      </div>
    </section>
  );
};

export default Features;