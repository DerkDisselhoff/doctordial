import React from "react";
import { Phone, Filter, TrendingUp, Calendar, BarChart, Scale } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent opacity-50" />
      <div className="container mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            How Our AI Agent Optimizes Your Incoming Patient Calls
          </h2>
          <p className="text-white/80">Comprehensive solutions for modern GP practices</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Phone,
              title: "24/7 Call Management",
              description: "Handle patient calls anytime, anywhere, ensuring no patient is left unattended",
            },
            {
              icon: Filter,
              title: "Smart Urgency Detection",
              description: "Filter and categorize calls based on urgency, directing cases to appropriate actions",
            },
            {
              icon: TrendingUp,
              title: "Revenue Optimization",
              description: "Maximize GP's time and optimize revenue by ensuring efficient appointment scheduling",
            },
            {
              icon: Calendar,
              title: "Appointment Optimization",
              description: "Automatically schedule appointments for urgent cases and prevent unnecessary visits",
            },
            {
              icon: BarChart,
              title: "Data Insights",
              description: "Access real-time analytics on call trends and service performance",
            },
            {
              icon: Scale,
              title: "Scalable Solution",
              description: "Scale seamlessly with increasing patient demand without additional staffing",
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group bg-forest-light p-8 rounded-xl border border-mint/10 hover:border-mint/30 transition-all duration-300 hover:shadow-lg hover:shadow-mint/5 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-mint/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-mint/20 transition-colors">
                {React.createElement(feature.icon, { 
                  className: "w-6 h-6 text-mint group-hover:scale-110 transition-transform" 
                })}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-mint transition-colors">{feature.title}</h3>
              <p className="text-white/80 group-hover:text-white/90 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;