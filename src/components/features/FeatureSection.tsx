import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { UrgencyLevels } from "./feature-previews/UrgencyLevels";
import { DailyCallsPreview } from "./feature-previews/DailyCallsPreview";
import { CallDetailPreview } from "./feature-previews/CallDetailPreview";
import { ClientDistributionPreview } from "./feature-previews/ClientDistributionPreview";
import { CallVolumePreview } from "./feature-previews/CallVolumePreview";
import { ActivityListPreview } from "./feature-previews/ActivityListPreview";

interface FeatureSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  component: string;
  points: string[];
  isReversed?: boolean;
}

const ComponentMap = {
  UrgencyLevels,
  DailyCallsChart: DailyCallsPreview,
  CallDetail: CallDetailPreview,
  ClientDistribution: ClientDistributionPreview,
  CallVolume: CallVolumePreview,
  ActivityList: ActivityListPreview,
};

const FeatureSection = ({
  icon: Icon,
  title,
  description,
  component,
  points,
  isReversed = false,
}: FeatureSectionProps) => {
  const PreviewComponent = ComponentMap[component as keyof typeof ComponentMap];

  return (
    <div
      className={`mb-32 ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } flex flex-col md:flex-row items-center gap-12 animate-fade-up`}
    >
      {/* Content Side */}
      <div className="flex-1 space-y-6">
        <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-mint" />
        </div>
        <h3 className="text-3xl font-bold text-white">
          {title}
        </h3>
        <p className="text-lg text-white/70">
          {description}
        </p>
        <ul className="space-y-4">
          {points.map((point, pointIndex) => (
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

      {/* Preview Component Side */}
      <div className="flex-1">
        <Card className="bg-forest-light/95 backdrop-blur-xl border-mint/10 overflow-hidden">
          <PreviewComponent />
        </Card>
      </div>
    </div>
  );
};

export default FeatureSection;