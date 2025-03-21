
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VideoTutorialButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      onClick={() => navigate("/dashboard/video-tutorial")}
      className="w-full bg-white text-blue-dark border-blue-dark/30 hover:bg-blue-dark/5 relative overflow-hidden transition-all group h-auto p-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-dark/5 to-mint/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      <div className="flex flex-col w-full">
        <div className="relative w-full h-28 overflow-hidden">
          <img 
            src="/lovable-uploads/c657c5f5-ee8f-4990-b8db-a18d4822c220.png" 
            alt="Video preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-blue-dark/20 group-hover:bg-blue-dark/10 transition-colors">
            <Video className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="p-3 text-center w-full font-medium relative z-10">
          Platform instructies
        </div>
      </div>
    </Button>
  );
};
