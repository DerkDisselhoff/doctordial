import React from "react";
import { UserRound, PhoneCall, HeartPulse } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent opacity-50" />
      <div className="container mx-auto relative">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Why DoctorDial Exists
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-forest-light p-6 rounded-xl border border-mint/10 space-y-4 animate-fade-up hover:border-mint/30 transition-colors">
            <div className="w-12 h-12 bg-mint/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <UserRound className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-xl font-semibold text-white">Supporting GPs</h3>
            <p className="text-white/80 leading-relaxed">
              We exist to remove the administrative burden from General Practitioners, allowing healthcare providers to focus on what truly matters - their patients.
            </p>
          </div>

          <div className="bg-forest-light p-6 rounded-xl border border-mint/10 space-y-4 animate-fade-up hover:border-mint/30 transition-colors" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 bg-mint/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <PhoneCall className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-xl font-semibold text-white">Managing Volume</h3>
            <p className="text-white/80 leading-relaxed">
              In an era where GP practices face an increasing volume of calls, we understand the critical role of the GP as a social instrument in healthcare.
            </p>
          </div>

          <div className="bg-forest-light p-6 rounded-xl border border-mint/10 space-y-4 animate-fade-up hover:border-mint/30 transition-colors" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 bg-mint/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <HeartPulse className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-xl font-semibold text-white">Right Care, Right Time</h3>
            <p className="text-white/80 leading-relaxed">
              Our mission is to ensure that the right patients receive the right treatment at the right time, helping GPs maintain their focus on providing quality care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;