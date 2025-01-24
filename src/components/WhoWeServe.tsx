import React from "react";
import { Stethoscope, Users } from "lucide-react";

const WhoWeServe = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gray-muted/30">
      <div className="absolute inset-0 bg-gradient-to-b from-blue/5 to-transparent opacity-50" />
      <div className="container mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              icon: Stethoscope,
              title: "For General Practitioners",
              description: "We empower GPs to focus on patient care by managing their incoming calls with AI technology, reducing administrative burden and optimizing practice efficiency.",
              features: [
                "Reduced administrative workload",
                "Optimized appointment scheduling",
                "Enhanced patient triage",
                "Improved practice efficiency"
              ]
            },
            {
              icon: Users,
              title: "For Patients",
              description: "We ensure patients receive timely responses and appropriate care through intelligent call management and efficient appointment scheduling.",
              features: [
                "24/7 call availability",
                "Quick response times",
                "Appropriate care routing",
                "Seamless appointment booking"
              ]
            }
          ].map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-xl border border-gray-muted hover:border-blue-dark/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue/5 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue/20 transition-colors">
                {React.createElement(service.icon, {
                  className: "w-8 h-8 text-blue-dark group-hover:scale-110 transition-transform"
                })}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-dark group-hover:text-blue-dark transition-colors">
                {service.title}
              </h3>
              <p className="text-gray mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-gray group-hover:text-gray-dark transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-dark rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;