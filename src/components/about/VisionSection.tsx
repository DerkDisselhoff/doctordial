import React from 'react';
import { Stethoscope } from 'lucide-react';

const VisionSection = () => {
  return (
    <div className="space-y-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-muted hover:shadow-md transition-all">
      <div className="flex items-center gap-3 text-mint mb-4">
        <Stethoscope className="w-6 h-6" />
        <h3 className="text-2xl font-semibold text-gray-dark">Our Vision</h3>
      </div>
      <p className="text-gray leading-relaxed">
        DoctorDial exists to bring this future to life. Our vision is to unburden medical staff 
        with an AI-driven platform that streamlines triage, scheduling, and patient follow-up 
        guided by our own experienced healthcare professionals.
      </p>
      <p className="text-gray leading-relaxed">
        Drawing on the latest medical insights and practical know-how, we ensure that our 
        automation solutions are safe, accurate, and deeply aligned with the best interests 
        of patients and practitioners.
      </p>
      <p className="text-gray leading-relaxed">
        By leveraging the power of AI, DoctorDial amplifies the capacity of doctors, nurses, 
        and support staff—without ever losing sight of patient well-being. Our commitment is 
        to keep Dutch GP healthcare strong and accessible as we move into a rapidly changing 
        future and every patient receives the attention they deserve, precisely when they need it.
      </p>
    </div>
  );
};

export default VisionSection;