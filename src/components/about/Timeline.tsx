import React from 'react';
import { Clock } from 'lucide-react';

const Timeline = () => {
  return (
    <div className="py-12">
      <div className="flex items-center gap-3 text-mint mb-8">
        <Clock className="w-6 h-6" />
        <h3 className="text-2xl font-semibold text-gray-dark">Healthcare Evolution</h3>
      </div>
      
      <div className="space-y-12">
        {[
          {
            year: "1950s-1990s",
            title: "Traditional Healthcare",
            description: "Paper-based records, manual appointment scheduling, and limited patient access."
          },
          {
            year: "1990s-2010s",
            title: "Digital Transformation",
            description: "Introduction of electronic health records and basic digital communication."
          },
          {
            year: "2010s-2020s",
            title: "Connected Health",
            description: "Mobile health apps, telemedicine, and patient portals emerge."
          },
          {
            year: "2023+",
            title: "AI-Powered Healthcare",
            description: "Intelligent triage, automated scheduling, and predictive care with DoctorDial."
          }
        ].map((era, index) => (
          <div 
            key={index}
            className="relative pl-8 border-l border-mint/20 animate-fade-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="absolute -left-3 top-0">
              <div className="w-5 h-5 rounded-full bg-mint-light border-2 border-mint" />
            </div>
            <div className="text-mint font-medium mb-2">{era.year}</div>
            <h4 className="text-gray-dark text-lg font-semibold mb-2">{era.title}</h4>
            <p className="text-gray">{era.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;