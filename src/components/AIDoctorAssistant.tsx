import { Brain, Stethoscope } from "lucide-react";

const AIDoctorAssistant = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center gap-2 bg-mint-light/30 w-fit px-4 py-2 rounded-full border border-mint/20">
              <Brain className="w-4 h-4 text-mint" />
              <span className="text-mint text-sm font-medium">AI-Powered Healthcare</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-dark">
              AI Doctors Assistant
            </h2>
            
            <p className="text-gray text-lg leading-relaxed max-w-xl">
              Meet your dedicated digital medical assistant, available 24/7 to handle patient calls, 
              triage cases, and manage appointments with the precision of a trained professional. 
              Our AI assistant seamlessly integrates into your practice, providing consistent, 
              reliable support while maintaining the personal touch your patients expect.
            </p>

            <div className="flex items-center gap-3 text-gray">
              <Stethoscope className="w-5 h-5 text-mint" />
              <span>Trained on extensive medical protocols</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-down lg:h-[500px]">
            <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-mint/10 h-full">
              <img
                src="/lovable-uploads/4ad749ed-c18c-4674-bab0-68b98e32bca5.png"
                alt="Professional AI Medical Assistant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
              
              {/* Stats Badge */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-white">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Patient Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDoctorAssistant;