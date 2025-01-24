import React from 'react';
import { Building2, Users, Stethoscope, Globe2 } from 'lucide-react';

const CompanyStats = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {[
        {
          icon: <Building2 className="w-8 h-8 text-mint" />,
          label: "Founded in Amsterdam",
          value: "2025"
        },
        {
          icon: <Users className="w-8 h-8 text-mint" />,
          label: "AI Assistants",
          value: "50+"
        },
        {
          icon: <Stethoscope className="w-8 h-8 text-mint" />,
          label: "Medical Expertise",
          value: "50 Years"
        },
        {
          icon: <Globe2 className="w-8 h-8 text-mint" />,
          label: "Available Languages",
          value: "2"
        }
      ].map((stat, index) => (
        <div 
          key={index}
          className="p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-all animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col items-center text-center space-y-2">
            {stat.icon}
            <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
            <span className="text-sm text-text-secondary">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyStats;