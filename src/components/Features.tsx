import React from "react";
import { Phone, Filter, TrendingUp, Calendar, BarChart, Scale, Clock } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            What We Offer
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
              title: "Smart Call Filtering",
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
              className="bg-forest-light p-8 rounded-xl border border-mint/10"
            >
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mb-6">
                {React.createElement(feature.icon, { className: "w-6 h-6 text-forest" })}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;