
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { Bot, Phone, Settings, Pill, Microscope, Clock, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { AssistantSettingsDialog } from "./AssistantSettingsDialog";

interface AssistantCardProps {
  title: string;
  description: string;
  type: 'triage' | 'medication' | 'research';
  stats: {
    calls: number;
    avgDuration: string;
    successRate: number;
  };
}

export const AssistantCard = ({ title, description, type, stats }: AssistantCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data } = await supabase
            .from('assistant_status')
            .select('is_live')
            .eq('profile_id', session.user.id)
            .single();
          
          if (data) {
            setIsActive(data.is_live);
          }
        }
      } catch (error) {
        console.error("Error fetching assistant status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleStatusChange = async (status: boolean) => {
    setIsActive(status);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase
          .from('assistant_status')
          .update({ is_live: status })
          .eq('profile_id', session.user.id);

        if (error) throw error;

        toast({
          title: status ? "Assistent geactiveerd" : "Assistent gedeactiveerd",
          description: `De ${title.toLowerCase()} assistent is nu ${status ? 'actief' : 'inactief'}.`,
          variant: status ? "default" : "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating assistant status:", error);
      toast({
        title: "Fout bij bijwerken",
        description: "Er is een fout opgetreden bij het bijwerken van de assistent status.",
        variant: "destructive",
      });
      setIsActive(!status); // Revert the state
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'triage':
        return <Phone className="w-10 h-10 text-mint" />;
      case 'medication':
        return <Pill className="w-10 h-10 text-mint" />;
      case 'research':
        return <Microscope className="w-10 h-10 text-mint" />;
      default:
        return <Bot className="w-10 h-10 text-mint" />;
    }
  };

  const getLink = () => {
    switch (type) {
      case 'triage':
        return "/dashboard/calls";
      case 'medication':
        return "/dashboard/calls/medication";
      case 'research':
        return "/dashboard/calls/research";
      default:
        return "/dashboard/calls";
    }
  };

  return (
    <>
      <Card className={cn(
        "border-gray-muted shadow-sm transition-all duration-300",
        isActive ? "bg-gradient-to-br from-white via-mint-light/20 to-white" : "bg-white"
      )}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex space-x-4 items-center">
            {getIcon()}
            <div>
              <CardTitle className="text-xl font-semibold text-gray-dark">{title}</CardTitle>
              <p className="text-sm text-gray mt-1">{description}</p>
            </div>
          </div>
          <Switch 
            checked={isActive} 
            onCheckedChange={handleStatusChange} 
            className={cn(
              "transition-all duration-300",
              isActive 
                ? "bg-mint data-[state=checked]:bg-mint hover:bg-mint-dark data-[state=checked]:border-mint-dark" 
                : "bg-gray-muted hover:bg-gray-muted/80"
            )}
          />
        </CardHeader>
        <CardContent>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-muted pt-4">
            <div className="text-center">
              <div className="flex flex-col items-center justify-center">
                <Phone className="h-4 w-4 text-gray" />
                <span className="mt-1 text-2xl font-semibold text-gray-dark">{stats.calls}</span>
                <span className="text-xs text-gray">Gesprekken</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center justify-center">
                <Clock className="h-4 w-4 text-gray" />
                <span className="mt-1 text-2xl font-semibold text-gray-dark">{stats.avgDuration}</span>
                <span className="text-xs text-gray">Gem. duur</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center justify-center">
                <BarChart className="h-4 w-4 text-gray" />
                <span className="mt-1 text-2xl font-semibold text-gray-dark">{stats.successRate}%</span>
                <span className="text-xs text-gray">Succesvol</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline"
              className="bg-white border-gray-muted text-gray-dark hover:bg-gray-50"
              onClick={() => navigate(getLink())}
            >
              Bekijk gesprekken
            </Button>
            
            <Button
              variant="ghost"
              className="text-gray hover:bg-mint/5 hover:text-gray-dark"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Instellingen
            </Button>
          </div>
        </CardContent>
      </Card>

      <AssistantSettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        assistantType={type}
        title={title}
      />
    </>
  );
};
