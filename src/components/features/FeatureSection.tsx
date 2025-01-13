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
      className={`mb-16 md:mb-32 ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } flex flex-col md:flex-row items-center gap-6 md:gap-12 animate-fade-up`}
    >
      {/* Content Side */}
      <div className="flex-1 space-y-4 md:space-y-6">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-mint/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-mint" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {title}
        </h3>
        <p className="text-base md:text-lg text-white/70">
          {description}
        </p>
        <ul className="space-y-3 md:space-y-4">
          {points.map((point, pointIndex) => (
            <li
              key={pointIndex}
              className="flex items-center text-sm md:text-base text-white/70"
            >
              <div className="w-1.5 h-1.5 bg-mint rounded-full mr-3 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Preview Component Side */}
      <div className="flex-1 w-full">
        <Card className="bg-forest-light/95 backdrop-blur-xl border-mint/10 overflow-hidden">
          <PreviewComponent />
        </Card>
      </div>
    </div>
  );
};

export default FeatureSection;