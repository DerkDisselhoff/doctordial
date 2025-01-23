import { useRef, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import StatsBadge from "./StatsBadge";
import { generateAIAgentImage } from "@/services/runwareService";

const HeroImage = () => {
  const [aiAgentImage, setAiAgentImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadAIAgentImage = async () => {
      try {
        const imageUrl = await generateAIAgentImage();
        setAiAgentImage(imageUrl);
      } catch (error) {
        console.error('Error loading AI agent image:', error);
        toast({
          title: "Error loading image",
          description: "Failed to load the AI agent image. Using fallback image.",
          variant: "destructive",
        });
        setAiAgentImage("/lovable-uploads/4ad749ed-c18c-4674-bab0-68b98e32bca5.png");
      }
    };

    loadAIAgentImage();
  }, [toast]);

  return (
    <div className="relative animate-fade-down lg:h-[600px]">
      <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
      <div className="relative rounded-2xl overflow-visible shadow-2xl border border-mint/10 h-full bg-forest-light">
        {aiAgentImage ? (
          <img
            src={aiAgentImage}
            alt="AI Medical Assistant with holographic interface"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <div className="w-full h-full animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
        <StatsBadge value="24/7" label="Patient Support" />
      </div>
    </div>
  );
};

export default HeroImage;