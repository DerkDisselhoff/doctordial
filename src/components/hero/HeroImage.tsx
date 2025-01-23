import { useRef, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AIDemoButton from "./AIDemoButton";
import StatsBadge from "./StatsBadge";
import { generateAIAgentImage } from "@/services/runwareService";

const HeroImage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiAgentImage, setAiAgentImage] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

    const loadAudioFile = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('audiofiles public')
          .createSignedUrl('8d94a647-4cb5-4554-b6d4-6ee3195a11a6-1737135918275-99f78ac8-9798-450b-ac49-dccf1eb9eb56-stereo.mp3', 3600); // URL valid for 1 hour

        if (error) throw error;
        setAudioUrl(data.signedUrl);
      } catch (error) {
        console.error('Error loading audio file:', error);
        toast({
          title: "Error loading audio",
          description: "Failed to load the demo audio file.",
          variant: "destructive",
        });
      }
    };

    loadAIAgentImage();
    loadAudioFile();
  }, [toast]);

  const handlePlayDemo = () => {
    if (!audioRef.current || !audioUrl) {
      toast({
        title: "Audio not available",
        description: "The demo audio file could not be loaded.",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
        toast({
          title: "Playback error",
          description: "There was an error playing the audio file.",
          variant: "destructive",
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPlaying(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);

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
        <AIDemoButton isPlaying={isPlaying} onPlayDemo={handlePlayDemo} />
        <StatsBadge value="24/7" label="Patient Support" />
      </div>
      
      {audioUrl && (
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        >
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default HeroImage;