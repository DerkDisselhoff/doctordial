import { Award, Shield, Clock, Brain, PhoneCall, BarChart3 } from "lucide-react";
import { BookDemoForm } from "@/components/BookDemoForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Urgency Detection",
      description: "Our AI analyzes calls in real-time using NHG-certified triage protocols to accurately assess patient urgency levels.",
      benefits: [
        "Immediate urgency assessment",
        "NHG-compliant triage",
        "Reduced risk of missed emergencies",
        "Automated priority routing"
      ]
    },
    {
      icon: Clock,
      title: "24/7 Patient Support",
      description: "Provide round-the-clock availability for your patients with our AI assistant that never sleeps.",
      benefits: [
        "Always available",
        "Consistent service quality",
        "Zero wait times",
        "Multilingual support"
      ]
    },
    {
      icon: BarChart3,
      title: "Revenue Optimization",
      description: "Maximize your practice's efficiency and revenue through intelligent call management and appointment scheduling.",
      benefits: [
        "Reduced no-shows",
        "Optimized scheduling",
        "Increased patient satisfaction",
        "Better resource allocation"
      ]
    },
    {
      icon: PhoneCall,
      title: "Patient Query Resolution",
      description: "Handle routine patient inquiries automatically, freeing up your staff for more complex tasks.",
      benefits: [
        "Automated responses",
        "Quick query resolution",
        "Reduced staff workload",
        "Consistent information"
      ]
    },
    {
      icon: Award,
      title: "Appointment Optimization",
      description: "Smart scheduling that considers urgency, availability, and patient preferences.",
      benefits: [
        "Intelligent slot allocation",
        "Priority-based scheduling",
        "Flexible booking options",
        "Calendar integration"
      ]
    },
    {
      icon: Shield,
      title: "Data Insights & Control",
      description: "Gain valuable insights into your practice's operations with comprehensive analytics and reporting.",
      benefits: [
        "Real-time analytics",
        "Performance metrics",
        "Trend analysis",
        "Custom reporting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-forest">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-mint mb-6">
            AI-Powered Features That Transform Your Practice
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Experience the future of healthcare communication with our comprehensive suite of AI-powered features
          </p>
          <BookDemoForm />
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-forest-light p-8 rounded-xl border border-mint/10 hover:border-mint/30 transition-all duration-300 hover:shadow-lg hover:shadow-mint/5 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-mint/20 transition-colors">
                  {<feature.icon className="w-8 h-8 text-mint group-hover:scale-110 transition-transform" />}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-mint transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-white/70 group-hover:text-white/90 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-mint rounded-full mr-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-forest-light">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Join the growing number of practices that trust DoctorDial to handle their patient communications
          </p>
          <BookDemoForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;