import React from 'react';
import { Brain, Clock, Heart } from 'lucide-react';

const SolutionSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-mint mb-4">
        <Brain className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-mint">The Solution</h3>
      </div>
      <p className="text-white/80 leading-relaxed">
        Technology has advanced to a point where it can confidently automate routine tasks without 
        sacrificing a human touch. By delegating mundane administrative work to AI, healthcare 
        providers free themselves to focus on high-impact patient care.
      </p>
      <p className="text-white/80 leading-relaxed">
        Picture an intelligent triage system that quickly evaluates initial symptoms, schedules 
        appointments, and ensures that those needing urgent attention see a doctor first—while 
        routine checkups and follow-ups happen just as effectively.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {[
          {
            icon: <Clock className="w-8 h-8 text-mint" />,
            title: "24/7 Availability",
            description: "Always-on triage and support"
          },
          {
            icon: <Brain className="w-8 h-8 text-mint" />,
            title: "AI-Powered",
            description: "Smart, accurate decision making"
          },
          {
            icon: <Heart className="w-8 h-8 text-mint" />,
            title: "Human-Centric",
            description: "Compassionate care delivery"
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="p-6 bg-forest-light/10 rounded-xl border border-mint/10 hover:border-mint/20 transition-all"
          >
            {feature.icon}
            <h4 className="text-lg font-semibold text-white mt-4">{feature.title}</h4>
            <p className="text-white/60 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionSection;