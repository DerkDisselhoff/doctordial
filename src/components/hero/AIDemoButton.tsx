import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface AIDemoButtonProps {
  isPlaying: boolean;
  onPlayDemo: () => void;
}

const AIDemoButton = ({ isPlaying, onPlayDemo }: AIDemoButtonProps) => (
  <div className="absolute top-6 left-6 flex items-center gap-4">
    <Button
      onClick={onPlayDemo}
      className={`bg-mint hover:bg-mint/90 text-forest font-medium group transition-all duration-300 ease-out hover:shadow-lg hover:shadow-mint/20 rounded-full w-20 h-20 p-0 flex items-center justify-center ${
        isPlaying ? 'animate-pulse' : ''
      }`}
    >
      {isPlaying ? (
        <Pause className="h-8 w-8 transition-transform group-hover:scale-110" />
      ) : (
        <Play className="h-8 w-8 transition-transform group-hover:scale-110" />
      )}
    </Button>
    <span className="text-white text-lg font-medium bg-forest/60 px-4 py-2 rounded-full">
      Listen to AI Demo
    </span>
  </div>
);

export default AIDemoButton;