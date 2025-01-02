import { useRef, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import AIDemoButton from "./AIDemoButton";
import StatsBadge from "./StatsBadge";
import { removeBackground, loadImage } from "@/utils/imageProcessing";

const HeroImage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const processImage = async () => {
      try {
        // Fetch the image
        const response = await fetch('https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1000&auto=format&fit=crop');
        const imageBlob = await response.blob();
        
        // Load the image
        const img = await loadImage(imageBlob);
        
        // Remove background
        const processedBlob = await removeBackground(img);
        
        // Create URL for the processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedImage(processedUrl);
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Error processing image",
          description: "Failed to process the hero image. Using fallback image.",
          variant: "destructive",
        });
      }
    };

    processImage();

    return () => {
      // Cleanup URLs when component unmounts
      if (processedImage) {
        URL.revokeObjectURL(processedImage);
      }
    };
  }, [toast]);

  const handlePlayDemo = () => {
    if (!audioRef.current) {
      toast({
        title: "Audio not available",
        description: "The demo audio file could not be loaded.",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative animate-fade-down lg:h-[600px]">
      <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-mint/10 h-full">
        {processedImage ? (
          <img
            src={processedImage}
            alt="Female medical professional speaking with a patient on the phone"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-forest-light animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
        <AIDemoButton isPlaying={isPlaying} onPlayDemo={handlePlayDemo} />
      </div>
      <StatsBadge value="24/7" label="Patient Support" />
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      >
        <source src="/assets/demo-conversation.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default HeroImage;