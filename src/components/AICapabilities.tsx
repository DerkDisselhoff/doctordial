import { Brain, Settings2, Heart, Link, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    title: "Medical Intelligence",
    description: "Trained on NHG triage standards and comprehensive medical datasets for accurate, protocol-based decision making.",
    icon: Brain,
    image: "/assets/nhg-logo.svg",
    color: "text-mint",
    bgColor: "bg-mint/10",
  },
  {
    title: "Full Customization",
    description: "Tailor forwarding rules, activation points, voice settings, and medical protocols to match your practice's specific needs.",
    icon: Settings2,
    image: "/lovable-uploads/voice-customization.png",
    color: "text-blue-dark",
    bgColor: "bg-blue/10",
  },
  {
    title: "Human Experience",
    description: "Trained on billions of emotional and empathic interactions to provide natural, compassionate patient communication.",
    icon: Heart,
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
  {
    title: "Seamless Integration",
    description: "Effortlessly connects with your existing call management systems and practice software.",
    icon: Link,
    image: "/lovable-uploads/system-integrations.png",
    color: "text-sage",
    bgColor: "bg-sage/10",
  },
  {
    title: "Continuous Learning",
    description: "Improves through direct feedback on triage decisions, continuously enhancing accuracy and effectiveness.",
    icon: GraduationCap,
    image: "/lovable-uploads/urgency-detection.png",
    color: "text-forest",
    bgColor: "bg-forest/10",
  },
];

const AICapabilities = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-mint/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-dark mb-6 leading-tight">
            Powered by Advanced AI Technology
          </h2>
          <p className="text-gray text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the future of medical assistance with our sophisticated AI capabilities,
            designed specifically for healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden group hover:shadow-xl transition-all duration-500",
                  "border border-gray-muted/20 backdrop-blur-sm",
                  "transform hover:-translate-y-1"
                )}
              >
                <div className="p-8 space-y-6">
                  {/* Icon container with gradient background */}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center",
                    capability.bgColor,
                    "transform transition-transform duration-500 group-hover:scale-110"
                  )}>
                    <Icon className={cn("w-8 h-8", capability.color)} />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-dark">
                    {capability.title}
                  </h3>

                  <p className="text-gray text-lg leading-relaxed">
                    {capability.description}
                  </p>

                  {capability.image && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-gray-muted/20 shadow-lg">
                      <img
                        src={capability.image}
                        alt={capability.title}
                        className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>

                {/* Enhanced decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-muted/5 to-gray-muted/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AICapabilities;