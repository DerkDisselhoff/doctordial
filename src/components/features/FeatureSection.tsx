import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { generateFeatureImage } from "@/services/imageService";
import { toast } from "sonner";

interface FeatureSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imagePrompt: string;
  points: string[];
  isReversed?: boolean;
}

const FeatureSection = ({
  icon: Icon,
  title,
  description,
  image,
  imagePrompt,
  points,
  isReversed = false,
}: FeatureSectionProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const imageUrl = await generateFeatureImage(imagePrompt);
        setGeneratedImage(imageUrl);
      } catch (error) {
        console.error('Error loading image:', error);
        toast.error('Failed to load feature image');
      } finally {
        setIsLoading(false);
      }
    };

    if (imagePrompt) {
      loadImage();
    }
  }, [imagePrompt]);

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
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-forest-light">
              <div className="animate-pulse w-16 h-16 rounded-full bg-mint/20" />
            </div>
          ) : (
            <img
              src={generatedImage || image}
              alt={title}
              className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
            />
          )}
        </AspectRatio>
      </div>
    </div>
  );
};

export default FeatureSection;