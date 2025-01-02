import { BookDemoForm } from "@/components/BookDemoForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import { Brain, Calendar, Mic, BarChart3, Users, Plug } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Urgency Detection",
      description: "AI-powered triage system that accurately assesses patient needs",
      image: "/lovable-uploads/urgency-detection.png",
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
      image: "/lovable-uploads/intelligent-scheduling.png",
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
      image: "/lovable-uploads/voice-customization.png",
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
      image: "/lovable-uploads/insights-dashboard.png",
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
      image: "/lovable-uploads/high-volume.png",
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
      image: "/lovable-uploads/system-integrations.png",
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
          {features.map((feature, index) => (
            <div
              key={index}
              className={`mb-32 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex flex-col md:flex-row items-center gap-12 animate-fade-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mb-6">
                  {<feature.icon className="w-8 h-8 text-mint" />}
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-lg text-white/70">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.points.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="flex items-center text-white/70"
                    >
                      <div className="w-1.5 h-1.5 bg-mint rounded-full mr-3" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Side */}
              <div className="flex-1 bg-forest-light rounded-xl p-4 shadow-xl shadow-black/20">
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
              </div>
            </div>
          ))}
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