import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, 
  Users, 
  Clock, 
  AlertTriangle, 
  LineChart, 
  Calendar,
  ArrowRight
} from "lucide-react";

const ProcessOverview = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      icon: Phone,
      title: "Integration with Phone Systems",
      description: "Seamlessly integrates with existing phone operators",
      delay: "delay-[100ms]"
    },
    {
      icon: Users,
      title: "Flexible Call Management",
      description: "Use your own assistants or fully rely on DoctorDial",
      delay: "delay-[200ms]"
    },
    {
      icon: Clock,
      title: "Smart Call Entry",
      description: "First point of contact or queue management",
      delay: "delay-[300ms]"
    },
    {
      icon: AlertTriangle,
      title: "Urgency-Based Handling",
      description: "Intelligent routing based on urgency levels (U1-U5)",
      delay: "delay-[400ms]"
    },
    {
      icon: LineChart,
      title: "Comprehensive Insights",
      description: "Track sentiment, urgency levels, and follow-ups",
      delay: "delay-[500ms]"
    },
    {
      icon: Calendar,
      title: "Planning Integration",
      description: "Direct appointment scheduling with your systems",
      delay: "delay-[600ms]"
    }
  ];

  const urgencyLevels = [
    { level: "U1", color: "bg-red-500", description: "Direct hospital forwarding" },
    { level: "U2", color: "bg-orange-500", description: "GP forwarding" },
    { level: "U3/U4", color: "bg-yellow-500", description: "Direct scheduling" },
    { level: "U5", color: "bg-green-500", description: "Later callback advice" }
  ];

  return (
    <section className="py-20 px-4 bg-forest-light/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-white">
            Process Overview of DoctorDial
          </h2>
          <p className="text-mint/80 max-w-2xl mx-auto">
            Transform fragmented call handling into a unified, efficient system
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`
                bg-forest-light/50 p-6 rounded-xl border border-mint/10 
                hover:border-mint/30 transition-all duration-300
                ${isVisible ? 'animate-fade-up opacity-100' : 'opacity-0'}
                ${step.delay}
              `}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-mint/10 rounded-lg">
                  <step.icon className="w-6 h-6 text-mint" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency Levels */}
        <div className="bg-forest-light/50 rounded-xl p-8 border border-mint/10">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Urgency-Based Call Handling
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {urgencyLevels.map((level, index) => (
              <div
                key={level.level}
                className={`
                  p-4 rounded-lg bg-forest-light/70 border border-mint/10
                  ${isVisible ? 'animate-fade-up opacity-100' : 'opacity-0'}
                  delay-[${(index + 7) * 100}ms]
                `}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-3 h-3 rounded-full ${level.color}`} />
                  <span className="text-mint font-semibold">{level.level}</span>
                </div>
                <p className="text-white/70 text-sm">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;