import React from 'react';
import { LineChart, PieChart, Activity } from 'lucide-react';

const HealthcareStats = () => {
  return (
    <div className="py-12">
      <div className="flex items-center gap-3 text-mint mb-8">
        <Activity className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-mint">Healthcare Insights</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <LineChart className="w-8 h-8 text-mint" />,
            stat: "40%",
            label: "Increase in GP workload since 2019",
            source: "Dutch Healthcare Authority (NZa)"
          },
          {
            icon: <Activity className="w-8 h-8 text-mint" />,
            stat: "15-20",
            label: "Average minutes saved per patient call",
            source: "DoctorDial Analysis"
          },
          {
            icon: <PieChart className="w-8 h-8 text-mint" />,
            stat: "30%",
            label: "Of calls can be handled without GP intervention",
            source: "Healthcare Innovation Study"
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