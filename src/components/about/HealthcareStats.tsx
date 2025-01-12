import React from 'react';
import { LineChart, Users, Clock } from 'lucide-react';

const HealthcareStats = () => {
  return (
    <div className="py-16">
      <div className="flex items-center gap-3 text-mint mb-8">
        <LineChart className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-mint">Healthcare Market Insights</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <Clock className="w-8 h-8 text-mint" />,
            stat: "45%",
            label: "Of GP time spent on administrative tasks",
            source: "Dutch Healthcare Authority (NZa)"
          },
          {
            icon: <Users className="w-8 h-8 text-mint" />,
            stat: "3.2M",
            label: "Patient calls handled by Dutch GPs annually",
            source: "CBS Healthcare Statistics"
          },
          {
            icon: <LineChart className="w-8 h-8 text-mint" />,
            stat: "28%",
            label: "Increase in healthcare demand by 2030",
            source: "RIVM Healthcare Forecast"
          }
        ].map((stat, index) => (
          <div 
            key={index}
            className="p-6 bg-forest-light/10 rounded-xl border border-mint/10 hover:border-mint/20 transition-all animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {stat.icon}
            <div className="mt-4 mb-2">
              <span className="text-3xl font-bold text-mint">{stat.stat}</span>
            </div>
            <p className="text-white/80 mb-2">{stat.label}</p>
            <p className="text-sm text-mint/60">{stat.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareStats;