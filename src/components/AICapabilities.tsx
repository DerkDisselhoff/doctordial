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
    <section className="py-16 bg-gradient-to-b from-white to-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
            Powered by Advanced AI Technology
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Experience the future of medical assistance with our sophisticated AI capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden group hover:shadow-lg transition-all duration-300",
                  "border border-gray-muted/20 backdrop-blur-sm"
                )}
              >
                <div className="p-6 space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    capability.bgColor
                  )}>
                    <Icon className={cn("w-6 h-6", capability.color)} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-dark">
                    {capability.title}
                  </h3>

                  <p className="text-gray leading-relaxed">
                    {capability.description}
                  </p>

                  {capability.image && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-muted/20">
                      <img
                        src={capability.image}
                        alt={capability.title}
                        className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-muted/5 pointer-events-none" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AICapabilities;