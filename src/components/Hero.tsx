import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

const Hero = () => {
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
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent" />
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-8 animate-fade-up">
          <div className="flex items-center gap-2 bg-mint/10 w-fit px-4 py-2 rounded-full border border-mint/20 hover:border-mint/40 transition-colors">
            <Phone className="w-4 h-4 text-mint" />
            <span className="text-mint text-sm font-medium">AI-Powered Call Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Manage
            <br />
            patient calls
            <br />
            effortlessly
          </h1>
          <p className="text-lg text-white/80 max-w-md leading-relaxed">
            Revolutionize how your GP practice manages patient communication with our AI-powered virtual front desk, trained on NHG-Triage data and compliant with NVDA standards.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button className="bg-mint hover:bg-mint/90 text-forest font-medium px-8 py-6 text-lg group transition-all duration-300 ease-out hover:shadow-lg hover:shadow-mint/20">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10 group">
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
            <div className="text-sm text-mint/80 mt-2 sm:mt-0 animate-fade-in">
              *Trained on Dutch healthcare standards
            </div>
          </div>
        </div>
        <div className="relative animate-fade-down">
          <div className="absolute -inset-0.5 bg-mint/20 rounded-2xl blur-2xl opacity-50" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-mint/10">
            <img
              src="/assets/ai-agent.webp"
              alt="AI virtual assistant helping with patient calls"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
            
            {/* Interactive AI Demo Button */}
            <Button
              onClick={handlePlayDemo}
              className="absolute bottom-6 right-6 bg-mint hover:bg-mint/90 text-forest font-medium group transition-all duration-300 ease-out hover:shadow-lg hover:shadow-mint/20 rounded-full w-14 h-14 p-0 flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 transition-transform group-hover:scale-110" />
              ) : (
                <Play className="h-6 w-6 transition-transform group-hover:scale-110" />
              )}
            </Button>
          </div>
          <div className="absolute -bottom-10 -left-10 bg-forest-light p-6 rounded-xl shadow-xl border border-mint/10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-mint text-4xl font-bold">24/7</p>
            <p className="text-white/80">Patient Support</p>
          </div>
          
          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          >
            <source src="/assets/demo-conversation.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </section>
  );
};

export default Hero;