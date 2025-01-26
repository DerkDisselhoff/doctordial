import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { UrgencyLevels } from "./feature-previews/UrgencyLevels";
import { DailyCallsPreview } from "./feature-previews/DailyCallsPreview";
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
        <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-light rounded-full flex items-center justify-center mb-4 md:mb-6">
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-blue-dark" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-dark">
          {title}
        </h3>
        <p className="text-base md:text-lg text-gray">
          {description}
        </p>
        <ul className="space-y-3 md:space-y-4">
          {points.map((point, pointIndex) => (
            <li
              key={pointIndex}
              className="flex items-center text-sm md:text-base text-gray"
            >
              <div className="w-1.5 h-1.5 bg-blue-dark rounded-full mr-3 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Preview Component Side */}
      <div className="flex-1 w-full">
        <Card className="bg-white border-gray-muted overflow-hidden">
          <PreviewComponent />
        </Card>
      </div>
    </div>
  );
};

export default FeatureSection;