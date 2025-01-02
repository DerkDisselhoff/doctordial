import { LucideIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FeatureSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  points: string[];
  isReversed?: boolean;
}

const FeatureSection = ({
  icon: Icon,
  title,
  description,
  image,
  points,
  isReversed = false,
}: FeatureSectionProps) => {
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

      {/* Image Side */}
      <div className="flex-1 bg-forest-light rounded-xl p-4 shadow-xl shadow-black/20">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default FeatureSection;