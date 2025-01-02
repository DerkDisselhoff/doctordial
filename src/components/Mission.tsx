import { BookDemoForm } from "./BookDemoForm";
import { ArrowRight, Phone, Robot } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 via-transparent to-transparent animate-pulse" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-white via-mint to-white bg-clip-text text-transparent">
              Why DoctorDial Exists
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Transforming GP practice communication through AI innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Challenge Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-mint to-divine rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative h-full p-8 bg-forest-light rounded-xl border border-mint/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-forest rounded-lg">
                  <Phone className="w-6 h-6 text-mint" />
                </div>
                <h3 className="text-2xl font-semibold text-mint">The Challenge</h3>
              </div>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 mt-1 text-mint/50" />
                  <span>High call volumes overwhelm practice staff, leading to missed calls and patient frustration</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 mt-1 text-mint/50" />
                  <span>Long wait times and limited availability affect patient satisfaction and care access</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 mt-1 text-mint/50" />
                  <span>Staff stress increases as they juggle multiple tasks while managing incoming calls</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Solution Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-divine to-mint rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative h-full p-8 bg-forest-light rounded-xl border border-mint/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-forest rounded-lg">
                  <Robot className="w-6 h-6 text-divine" />
                </div>
                <h3 className="text-2xl font-semibold text-divine">Our Solution</h3>
              </div>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 mt-1 text-divine/50" />
                  <span>AI-powered system handles all incoming calls 24/7, ensuring no patient goes unheard</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 mt-1 text-divine/50" />
                  <span>Smart triage based on NHG standards prioritizes urgent cases effectively</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 mt-1 text-divine/50" />
                  <span>Reduces staff workload while maintaining high-quality patient care standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-xl mx-auto">
          <div className="p-8 bg-gradient-to-r from-forest-light to-forest rounded-xl border border-mint/10">
            <h4 className="text-xl font-semibold text-center mb-6">
              Ready to transform your practice's communication?
            </h4>
            <BookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;