import React from "react";
import { Stethoscope, Users } from "lucide-react";

const WhoWeServe = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent opacity-50" />
      <div className="container mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              icon: Stethoscope,
              title: "Voor Huisartsen",
              description: "We stellen huisartsen in staat zich te concentreren op patiëntenzorg door hun inkomende gesprekken te beheren met AI-technologie, waardoor de administratieve last wordt verminderd en de praktijkefficiëntie wordt geoptimaliseerd.",
              features: [
                "Verminderde administratieve werkdruk",
                "Geoptimaliseerde afspraakplanning",
                "Verbeterde patiënttriage",
                "Verhoogde praktijkefficiëntie"
              ]
            },
            {
              icon: Users,
              title: "Voor Patiënten",
              description: "We zorgen ervoor dat patiënten tijdige antwoorden en passende zorg krijgen via intelligent gespreksmanagement en efficiënte afspraakplanning.",
              features: [
                "24/7 bereikbaarheid",
                "Snelle reactietijden",
                "Passende zorgverwijzing",
                "Naadloze afspraakplanning"
              ]
            }
          ].map((service, index) => (
            <div
              key={index}
              className="group bg-forest-light p-8 rounded-xl border border-mint/10 hover:border-mint/30 transition-all duration-300 hover:shadow-lg hover:shadow-mint/5 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-mint/20 transition-colors">
                {React.createElement(service.icon, {
                  className: "w-8 h-8 text-mint group-hover:scale-110 transition-transform"
                })}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-mint transition-colors">
                {service.title}
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-white/70 group-hover:text-white/90 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-mint rounded-full mr-3" />
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