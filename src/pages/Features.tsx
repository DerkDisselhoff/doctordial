import { BookDemoForm } from "@/components/BookDemoForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import { Brain, Calendar, Mic, BarChart3, Users, Plug } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Urgency Detection",
      description: "AI-powered triage system that accurately assesses patient needs",
      points: [
        "NHG-certified triage protocols",
        "Real-time urgency assessment",
        "Automatic priority routing",
        "24/7 emergency detection"
      ]
    },
    {
      icon: Calendar,
      title: "Intelligent Scheduling",
      description: "Optimize your practice's appointment management",
      points: [
        "Smart appointment allocation",
        "Reduces no-shows by 40%",
        "Optimizes doctor's agenda",
        "Patient preference matching"
      ]
    },
    {
      icon: Mic,
      title: "Voice Customization",
      description: "Natural and professional communication with patients",
      points: [
        "Natural voice interactions",
        "Multiple language support",
        "Customizable voice profiles",
        "Clear and professional tone"
      ]
    },
    {
      icon: BarChart3,
      title: "Insights Dashboard",
      description: "Comprehensive analytics for better decision making",
      points: [
        "Real-time call analytics",
        "Patient flow insights",
        "Performance metrics",
        "Custom reporting"
      ]
    },
    {
      icon: Users,
      title: "High Volume Handling",
      description: "Never miss a patient call again",
      points: [
        "50+ simultaneous calls",
        "Zero wait times",
        "Consistent service quality",
        "Peak hour management"
      ]
    },
    {
      icon: Plug,
      title: "System Integrations",
      description: "Seamlessly connects with your existing tools",
      points: [
        "EHR system integration",
        "Calendar sync",
        "Secure data exchange",
        "API connectivity"
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
            Experience the future of patient communication with our comprehensive solution
          </p>
          <BookDemoForm />
        </div>
      </section>

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
                <p className="text-white/70 mb-6 group-hover:text-white/90 transition-colors">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="flex items-center text-white/70 group-hover:text-white/90 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-mint rounded-full mr-3" />
                      {point}
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