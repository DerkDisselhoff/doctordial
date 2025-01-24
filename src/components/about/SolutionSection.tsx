import React from 'react';
import { Brain } from 'lucide-react';

const SolutionSection = () => {
  return (
    <div className="space-y-6 bg-mint/5 rounded-2xl p-8">
      <div className="flex items-center gap-3 text-mint mb-4">
        <Brain className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-mint">The Solution</h3>
      </div>
      <p className="text-white/90 leading-relaxed">
        Technology has advanced to a point where it can confidently automate routine tasks without 
        sacrificing a human touch. By delegating mundane administrative work to AI, healthcare 
        providers free themselves to focus on high-impact patient care.
      </p>
      <p className="text-white/90 leading-relaxed">
        Picture an intelligent triage system that quickly evaluates initial symptoms, schedules 
        appointments, and ensures that those needing urgent attention see a doctor first—while 
        routine checkups and follow-ups happen just as effectively.
      </p>
    </div>
  );
};

export default SolutionSection;