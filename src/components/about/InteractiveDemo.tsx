import React, { useState } from 'react';
import { Bot, Phone, Calendar, Stethoscope } from 'lucide-react';

const InteractiveDemo = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Patient Call",
      description: "Patient calls are automatically answered and processed by our AI system",
      color: "text-mint"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Advanced AI analyzes the conversation in real-time for urgency and intent",
      color: "text-mint"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Smart Triage",
      description: "Cases are intelligently prioritized based on medical urgency",
      color: "text-mint"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Automated Scheduling",
      description: "Appointments are automatically scheduled based on urgency and availability",
      color: "text-mint"
    }
  ];

  return (
    <div className="py-16">
      <div className="flex items-center gap-3 text-mint mb-8">
        <Bot className="w-6 h-6" />
        <h3 className="text-2xl font-semibold text-gray-dark">Experience Our AI in Action</h3>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-white
              ${activeStep === index 
                ? 'border-mint shadow-md scale-105' 
                : 'border-gray-muted hover:border-mint/20 shadow-sm hover:shadow-md'}`}
            onClick={() => setActiveStep(index)}
          >
            <div className={`${step.color} mb-4 transition-all duration-300
              ${activeStep === index ? 'scale-110' : ''}`}>
              {step.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-dark mb-2">{step.title}</h4>
            <p className="text-gray text-sm">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${activeStep === index ? 'bg-mint w-6' : 'bg-mint/20'}`}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;