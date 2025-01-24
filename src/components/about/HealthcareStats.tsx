import React from 'react';
import { LineChart, Users, Clock } from 'lucide-react';

const HealthcareStats = () => {
  return (
    <div className="py-12">
      <div className="flex items-center gap-3 text-primary mb-8">
        <LineChart className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-text-primary">Healthcare Market Insights</h3>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: <Clock className="w-8 h-8 text-primary" />,
            stat: "45%",
            label: "Of GP time spent on administrative tasks",
            source: "Dutch Healthcare Authority (NZa)"
          },
          {
            icon: <Users className="w-8 h-8 text-primary" />,
            stat: "25%",
            label: "Increase in elderly population by 2040",
            source: "CBS Population Forecast"
          },
          {
            icon: <LineChart className="w-8 h-8 text-primary" />,
            stat: "28%",
            label: "Increase in healthcare demand by 2030",
            source: "RIVM Healthcare Forecast"
          }
        ].map((stat, index) => (
          <div 
            key={index}
            className="p-6 bg-surface border border-surface-input rounded-xl hover:bg-surface-secondary transition-all animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {stat.icon}
            <div className="mt-4 mb-2">
              <span className="text-3xl font-bold text-primary">{stat.stat}</span>
            </div>
            <p className="text-text-primary mb-2">{stat.label}</p>
            <p className="text-sm text-text-secondary">{stat.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareStats;