
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface VideoTutorialButtonProps {
  onClick: () => void;
}

export const VideoTutorialButton = ({ onClick }: VideoTutorialButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="bg-white text-blue-dark border-blue-dark/30 hover:bg-blue-dark/5 relative overflow-hidden transition-all group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-dark/5 to-mint/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      <PlayCircle className="h-4 w-4 mr-2 text-blue-dark transition-all relative z-10" />
      <span className="relative z-10">Platform instructies</span>
    </Button>
  );
};
