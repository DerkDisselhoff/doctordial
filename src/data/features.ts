import { Brain, Calendar, Mic, BarChart3, Users, Plug } from "lucide-react";

export const features = [
  {
    icon: Brain,
    title: "Smart Urgency Detection",
    description: "AI-powered triage system that accurately assesses patient needs",
    component: "UrgencyLevels",
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
    component: "DailyCallsChart",
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
    component: "CallDetail",
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
    component: "ClientDistribution",
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
    component: "CallVolume",
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
    component: "ActivityList",
    points: [
      "EHR system integration",
      "Calendar sync",
      "Secure data exchange",
      "API connectivity"
    ]
  }
];