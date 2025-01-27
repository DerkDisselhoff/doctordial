import React from 'react';
import { LineChart, Users, Clock } from 'lucide-react';

const HealthcareStats = () => {
  return (
    <div className="py-12">
      <div className="flex items-center gap-3 text-mint mb-8">
        <LineChart className="w-6 h-6" />
        <h3 className="text-2xl font-semibold text-gray-dark">Healthcare Market Insights</h3>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: <Clock className="w-8 h-8 text-mint" />,
            stat: "45%",
            label: "Of GP time spent on administrative tasks",
            source: "Dutch Healthcare Authority (NZa)"
          },
          {
            icon: <Users className="w-8 h-8 text-mint" />,
            stat: "25%",
            label: "Increase in elderly population by 2040",
            source: "CBS Population Forecast"
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
            className="p-6 bg-white rounded-xl border border-gray-muted hover:border-mint/20 transition-all animate-fade-up shadow-sm hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {stat.icon}
            <div className="mt-4 mb-2">
              <span className="text-3xl font-bold text-gray-dark">{stat.stat}</span>
            </div>
            <p className="text-gray mb-2">{stat.label}</p>
            <p className="text-sm text-gray-light">{stat.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareStats;