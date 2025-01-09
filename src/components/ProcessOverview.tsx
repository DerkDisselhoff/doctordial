import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, 
  Users, 
  List, 
  AlertCircle, 
  Hospital, 
  User, 
  Calendar, 
  Clock, 
  BarChart2, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

const ProcessOverview = () => {
  const { t } = useLanguage();

  const stages = [
    {
      icon: Phone,
      title: t("process.incoming.title"),
      description: t("process.incoming.description"),
      color: "text-mint",
    },
    {
      icon: Users,
      title: t("process.management.title"),
      description: t("process.management.description"),
      color: "text-mint-light",
    },
    {
      icon: List,
      title: t("process.entry.title"),
      description: t("process.entry.description"),
      color: "text-mint",
    },
    {
      icon: AlertCircle,
      title: t("process.urgency.title"),
      description: t("process.urgency.description"),
      color: "text-divine",
      subItems: [
        { icon: Hospital, text: "U1: " + t("process.urgency.u1"), color: "text-red-500" },
        { icon: User, text: "U2: " + t("process.urgency.u2"), color: "text-orange-500" },
        { icon: Calendar, text: "U3/U4: " + t("process.urgency.u34"), color: "text-yellow-500" },
        { icon: Clock, text: "U5: " + t("process.urgency.u5"), color: "text-green-500" },
      ],
    },
    {
      icon: BarChart2,
      title: t("process.insights.title"),
      description: t("process.insights.description"),
      color: "text-mint-light",
    },
    {
      icon: CheckCircle,
      title: t("process.resolution.title"),
      description: t("process.resolution.description"),
      color: "text-mint",
    },
  ];

  return (
    <section className="py-24 bg-forest-light/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">
          {t("process.title")}
        </h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-mint/20 -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative">
            {stages.map((stage, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center">
                  {/* Connecting arrow */}
                  {index < stages.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-mint animate-pulse" />
                    </div>
                  )}
                  
                  {/* Stage icon */}
                  <div className="relative z-20 mb-4">
                    <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center 
                                  transform transition-all duration-300 group-hover:scale-110
                                  border border-mint/20 group-hover:border-mint">
                      <stage.icon className={`w-8 h-8 ${stage.color} transition-colors duration-300`} />
                    </div>
                  </div>

                  {/* Stage content */}
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                    <p className="text-white/70 text-sm">{stage.description}</p>
                    
                    {/* Urgency levels */}
                    {stage.subItems && (
                      <div className="mt-4 space-y-2">
                        {stage.subItems.map((item, subIndex) => (
                          <div key={subIndex} 
                               className="flex items-center justify-center space-x-2 text-sm">
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                            <span className="text-white/70">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;