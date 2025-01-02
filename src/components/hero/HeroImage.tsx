import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import AIDemoButton from "./AIDemoButton";
import StatsBadge from "./StatsBadge";

const HeroImage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

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
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
          alt="Female medical assistant speaking with a patient on the phone in a modern medical office"
          className="w-full h-full object-cover"
        />
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