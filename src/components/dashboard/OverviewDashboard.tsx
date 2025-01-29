import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Users, Calendar, PhoneCall } from "lucide-react";
import { UrgentCases } from "./client/UrgentCases";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Vapi from "@vapi-ai/web";

type TimeFilter = 'today' | 'week' | 'month';

const FloatingIcon = ({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: number, y: number }) => (
  <motion.div
    className="absolute text-mint/20"
    initial={{ opacity: 0, y: 10 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      y: [y, y - 20, y],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{ left: `${x}%` }}
  >
    <Icon className="w-8 h-8" />
  </motion.div>
);

export function OverviewDashboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || null);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCall = async () => {
    try {
      // Get VAPI API key from Supabase
      const { data: secretData, error: secretError } = await supabase
        .from('secrets')
        .select('value')
        .eq('name', 'VAPI_API_KEY')
        .single();

      if (secretError) {
        console.error('Error fetching VAPI API key:', secretError);
        throw new Error('Failed to get VAPI credentials');
      }

      const vapiKey = secretData.value;
      const assistantId = 'd1dcfa30-8f3e-4be4-9b20-83d9f54e4877'; // Medi-Mere assistant ID

      // Initialize VAPI client
      const vapi = new Vapi(vapiKey);

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create the call with configuration
      const call = await vapi.createCall({
        assistantId: assistantId,
        onCallEnded: () => {
          setIsCallActive(false);
          toast({
            title: "Call ended",
            description: "The call with the assistant has ended.",
          });
        },
        onError: (error) => {
          console.error('VAPI call error:', error);
          toast({
            title: "Call error",
            description: "There was an error with the call. Please try again.",
            variant: "destructive",
          });
          setIsCallActive(false);
        },
      });

      // Start the call
      await call.start();
      
      setIsCallActive(true);
      toast({
        title: "Call connected",
        description: "You are now connected to the assistant.",
      });

    } catch (error) {
      console.error('Error starting VAPI call:', error);
      toast({
        title: "Call failed",
        description: error instanceof Error ? error.message : "Failed to start the call",
        variant: "destructive",
      });
      setIsCallActive(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <FloatingIcon icon={Activity} delay={0} x={85} y={20} />
        <FloatingIcon icon={Users} delay={1.5} x={92} y={50} />
        <FloatingIcon icon={Calendar} delay={2.5} x={88} y={80} />
        
        {userRole === 'client' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-between mb-6"
          >
            <Button
              onClick={handleCall}
              disabled={isCallActive}
              className={`${
                isCallActive 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-mint hover:bg-mint-dark'
              } text-white flex items-center gap-2 font-medium shadow-sm`}
            >
              <PhoneCall className="w-4 h-4" />
              {isCallActive ? 'Call in Progress' : 'Call Assistant'}
            </Button>
            
            <div className="flex items-center space-x-4 text-sm text-gray">
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'today'}
                onPressedChange={() => setTimeFilter('today')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                Today
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'week'}
                onPressedChange={() => setTimeFilter('week')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                Last Week
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'month'}
                onPressedChange={() => setTimeFilter('month')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                Last Month
              </Toggle>
            </div>
          </motion.div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <MetricsCards timeFilter={timeFilter} />
      </motion.div>
      
      {userRole === 'client' ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <UrgentCases isIrrelevant={false} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <UrgentCases isIrrelevant={true} />
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <DashboardCharts />
        </motion.div>
      )}
    </div>
  );
}