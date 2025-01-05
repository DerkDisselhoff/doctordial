import { Brain, Calendar, Mic, Users } from "lucide-react";

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
    title: "Recent Activity",
    description: "Track and monitor all patient interactions in real-time",
    component: "ActivityList",
    points: [
      "Real-time call monitoring",
      "Detailed interaction history",
      "Patient communication tracking",
      "Comprehensive activity logs"
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
  }
];