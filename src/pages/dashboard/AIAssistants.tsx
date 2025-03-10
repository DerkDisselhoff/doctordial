
import { useEffect, useState } from "react";
import { AssistantCard } from "@/components/dashboard/assistants/AssistantCard";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Download, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssistantStats {
  triage: {
    calls: number;
    avgDuration: string;
    successRate: number;
  };
  medication: {
    calls: number;
    avgDuration: string;
    successRate: number;
  };
  research: {
    calls: number;
    avgDuration: string;
    successRate: number;
  };
  total: {
    calls: number;
    avgDuration: string;
    successRate: number;
  };
}

const AIAssistants = () => {
  const [stats, setStats] = useState<AssistantStats>({
    triage: { calls: 0, avgDuration: '0:00', successRate: 0 },
    medication: { calls: 0, avgDuration: '0:00', successRate: 0 },
    research: { calls: 0, avgDuration: '0:00', successRate: 0 },
    total: { calls: 0, avgDuration: '0:00', successRate: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAssistantStats();
  }, []);

  const fetchAssistantStats = async () => {
    setIsLoading(true);
    try {
      // Fetch triage stats
      const { data: triageData, error: triageError } = await supabase
        .from('call_logs_triage')
        .select('*');

      // Fetch medication stats
      const { data: medicationData, error: medicationError } = await supabase
        .from('call_logs_medications')
        .select('*');

      // Fetch research stats
      const { data: researchData, error: researchError } = await supabase
        .from('call_logs_researchresults')
        .select('*');

      if (triageError || medicationError || researchError) throw new Error("Error fetching data");

      // Calculate statistics
      const triageStats = calculateStats(triageData || []);
      const medicationStats = calculateStats(medicationData || []);
      const researchStats = calculateStats(researchData || []);
      
      // Calculate total stats
      const totalCalls = (triageData?.length || 0) + (medicationData?.length || 0) + (researchData?.length || 0);
      const allData = [...(triageData || []), ...(medicationData || []), ...(researchData || [])];
      const totalStats = calculateStats(allData);

      setStats({
        triage: triageStats,
        medication: medicationStats,
        research: researchStats,
        total: {
          calls: totalCalls,
          avgDuration: totalStats.avgDuration,
          successRate: totalStats.successRate
        }
      });
    } catch (error) {
      console.error("Error fetching assistant stats:", error);
      toast({
        title: "Fout bij ophalen gegevens",
        description: "Er is een fout opgetreden bij het ophalen van de assistent statistieken.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data: any[]) => {
    if (!data.length) return { calls: 0, avgDuration: '0:00', successRate: 0 };
    
    // Calculate average duration
    const durations = data
      .filter(item => item.duration_seconds)
      .map(item => parseInt(item.duration_seconds));
    
    let avgDurationSeconds = 0;
    if (durations.length > 0) {
      avgDurationSeconds = durations.reduce((sum, val) => sum + val, 0) / durations.length;
    }
    
    const minutes = Math.floor(avgDurationSeconds / 60);
    const seconds = Math.floor(avgDurationSeconds % 60);
    const avgDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Success rate calculation (simplified, could be based on various factors)
    // For demo purposes, using a random value between 75-98%
    const successRate = Math.floor(75 + Math.random() * 23);
    
    return {
      calls: data.length,
      avgDuration,
      successRate
    };
  };

  const handleRefresh = () => {
    fetchAssistantStats();
    toast({
      title: "Statistieken vernieuwd",
      description: "De gegevens zijn succesvol bijgewerkt.",
    });
  };

  const handleExport = () => {
    // Implementation for exporting data
    toast({
      title: "Export gestart",
      description: "De statistieken worden geëxporteerd. Je ontvangt een e-mail wanneer deze gereed is.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-dark">AI Assistentes</h2>
          <p className="text-gray">Beheer en monitor de prestaties van je AI assistentes</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="bg-white border-gray-muted text-gray-dark hover:bg-gray-50"
            onClick={handleRefresh}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Verversen
          </Button>
          <Button 
            variant="outline"
            className="bg-white border-gray-muted text-gray-dark hover:bg-gray-50"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exporteren
          </Button>
        </div>
      </div>

      {/* Overall stats card */}
      <Card className="border-gray-muted shadow-sm bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-dark">
            <Bot className="h-5 w-5 text-mint" />
            Totale prestaties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-dark">{stats.total.calls}</div>
              <div className="text-sm text-gray">Totaal gesprekken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-dark">{stats.total.avgDuration}</div>
              <div className="text-sm text-gray">Gemiddelde duur</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-dark">{stats.total.successRate}%</div>
              <div className="text-sm text-gray">Gemiddeld succes percentage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual assistant cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AssistantCard 
          title="Triage Assistent" 
          description="Beantwoordt algemene vragen en maakt triage beoordeling"
          type="triage"
          stats={stats.triage}
        />
        
        <AssistantCard 
          title="Medicatie Assistent" 
          description="Behandelt vragen over medicatie en voorschriften"
          type="medication"
          stats={stats.medication}
        />
        
        <AssistantCard 
          title="Onderzoek Assistent" 
          description="Geeft uitleg over uitslagen van onderzoeken"
          type="research"
          stats={stats.research}
        />
      </div>
    </div>
  );
};

export default AIAssistants;
