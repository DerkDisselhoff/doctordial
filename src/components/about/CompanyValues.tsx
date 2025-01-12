import React from 'react';

const CompanyValues = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Healthcare First",
          description: "Every feature we develop is rooted in real medical practice needs and challenges."
        },
        {
          title: "Dutch Innovation",
          description: "Combining the efficiency of Dutch healthcare with cutting-edge technology."
        },
        {
          title: "Patient-Centric",
          description: "Ensuring every patient interaction is handled with care and professionalism."
        }
      ].map((value, index) => (
        <div 
          key={index}
          className="p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-all animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <h3 className="text-xl font-semibold text-mint mb-4">{value.title}</h3>
          <p className="text-white/80">{value.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CompanyValues;