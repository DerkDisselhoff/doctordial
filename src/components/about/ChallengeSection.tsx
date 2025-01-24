import React from 'react';
import { Heart } from 'lucide-react';

const ChallengeSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-mint mb-4">
        <Heart className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-mint">The Challenge</h3>
      </div>
      <p className="text-text-primary leading-relaxed">
        In the Netherlands, our healthcare system stands at a critical juncture. An aging population, 
        rising costs, and increased demand for specialized care are placing growing strain on Hospitals, 
        GPs and medical staff.
      </p>
      <p className="text-text-primary leading-relaxed">
        Individuals lose confidence in a system that feels overwhelmed. Waiting times are increasing, 
        and healthcare professionals are stretched thin which is especially challenging in general practice. 
        This results in poorer accessibility for the patient.
      </p>
      <p className="text-text-primary leading-relaxed">
        When patients can't receive timely attention, they suffer physically and mentally. Chronic 
        conditions progress unchecked, minor issues become major, and trust in the system erodes.
      </p>
    </div>
  );
};

export default ChallengeSection;