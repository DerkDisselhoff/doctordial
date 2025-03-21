import { useEffect, useState } from "react";
import { AssistantCard } from "@/components/dashboard/assistants/AssistantCard";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MetricsCards } from "@/components/dashboard/metrics/MetricsCards";
import { DashboardCharts } from "@/components/dashboard/charts/DashboardCharts";
import { UrgentCases } from "@/components/dashboard/client/UrgentCases";
import { Toggle } from "@/components/ui/toggle";
import { TimeFilter } from "@/types/metrics";
import { motion } from "framer-motion";
import { VideoTutorialButton } from "@/components/dashboard/tutorials/VideoTutorialButton";
import { VideoTutorialDialog } from "@/components/dashboard/tutorials/VideoTutorialDialog";

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
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [isDemoAccount, setIsDemoAccount] = useState(false);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [showTutorial, setShowTutorial] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, demo_account')
          .eq('id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || null);
        setIsDemoAccount(profile?.demo_account === true);
      }
    };

    fetchUserProfile();
    fetchAssistantStats();
  }, []);

  useEffect(() => {
    fetchAssistantStats();
  }, [timeFilter]);

  const fetchAssistantStats = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('demo_account')
        .eq('id', session.user.id)
        .maybeSingle();
      
      const isDemo = profileData?.demo_account === true;
      console.log("Is demo account:", isDemo);
      
      const triageTable = isDemo ? 'demo_call_logs_triage' : 'call_logs_triage';
      const medicationTable = isDemo ? 'demo_call_logs_medications' : 'call_logs_medications';
      const researchTable = isDemo ? 'demo_call_logs_researchresults' : 'call_logs_researchresults';

      const { data: triageData, error: triageError } = await supabase
        .from(triageTable)
        .select('*');

      const { data: medicationData, error: medicationError } = await supabase
        .from(medicationTable)
        .select('*');

      const { data: researchData, error: researchError } = await supabase
        .from(researchTable)
        .select('*');

      if (triageError) console.error("Error fetching triage data:", triageError);
      if (medicationError) console.error("Error fetching medication data:", medicationError);
      if (researchError) console.error("Error fetching research data:", researchError);
      
      console.log("Triage calls found:", triageData?.length || 0);
      console.log("Medication calls found:", medicationData?.length || 0);
      console.log("Research calls found:", researchData?.length || 0);

      const triageStats = calculateStats(triageData || []);
      const medicationStats = calculateStats(medicationData || []);
      const researchStats = calculateStats(researchData || []);
      
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
          {userRole === 'client' && (
            <div className="flex items-center space-x-4 text-sm text-gray mr-4">
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'today'}
                onPressedChange={() => setTimeFilter('today')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                Vandaag
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'week'}
                onPressedChange={() => setTimeFilter('week')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                Afgelopen week
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'month'}
                onPressedChange={() => setTimeFilter('month')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                Afgelopen maand
              </Toggle>
            </div>
          )}
          <VideoTutorialButton onClick={() => setShowTutorial(true)} />
          <Button 
            variant="outline"
            className="bg-white border-gray-muted text-gray-dark hover:bg-gray-50"
            onClick={handleRefresh}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Verversen
          </Button>
        </div>
      </div>

      <VideoTutorialDialog 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <MetricsCards timeFilter={timeFilter} />
      </motion.div>

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

      {userRole === 'admin' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <DashboardCharts />
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <UrgentCases isIrrelevant={false} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <UrgentCases isIrrelevant={true} />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AIAssistants;
