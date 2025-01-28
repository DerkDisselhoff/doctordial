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
import { Device } from '@twilio/voice-sdk';

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
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [assistantName, setAssistantName] = useState<string>('Assistant');
  const [device, setDevice] = useState<Device | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Fetch user profile for phone number
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, phone_number')
          .eq('id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || null);
        setPhoneNumber(profile?.phone_number || null);

        // Fetch assistant name if client
        if (profile?.role === 'client') {
          const { data: assistantStatus } = await supabase
            .from('assistant_status')
            .select('assistant_name')
            .eq('profile_id', session.user.id)
            .maybeSingle();
          
          setAssistantName(assistantStatus?.assistant_name || 'Assistant');
        }
      }
    };

    fetchUserProfile();
  }, []);

  const setupTwilioDevice = async () => {
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Fetch Twilio token from our Edge Function
      const { data, error } = await supabase.functions.invoke('generate-twilio-token');
      
      if (error) throw error;
      
      // Initialize Twilio device with the token
      const twilioDevice = new Device(data.token, {
        // Use correct codec types from Twilio Voice SDK
        codecPreferences: ['pcmu', 'opus'] as any[], // Type assertion as temporary fix
        enableRingingState: true,
      });

      await twilioDevice.register();
      setDevice(twilioDevice);
      
      return twilioDevice;
    } catch (error) {
      console.error('Error setting up Twilio device:', error);
      throw error;
    }
  };

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        title: "No phone number set",
        description: "Please set your phone number in your profile settings first.",
        variant: "destructive"
      });
      return;
    }

    try {
      let twilioDevice = device;
      if (!twilioDevice) {
        twilioDevice = await setupTwilioDevice();
      }

      // Make the call
      const call = await twilioDevice.connect({
        params: {
          To: phoneNumber,
          From: 'browser-client'
        }
      });

      // Handle call events
      call.on('disconnect', () => {
        toast({
          title: "Call ended",
          description: "The call has been disconnected.",
        });
      });

      call.on('error', (error) => {
        console.error('Call error:', error);
        toast({
          title: "Call error",
          description: "There was an error with the call. Please try again.",
          variant: "destructive"
        });
      });

      toast({
        title: "Call initiated",
        description: `Starting browser call with ${assistantName}...`,
      });

    } catch (error) {
      console.error('Error making call:', error);
      toast({
        title: "Call error",
        description: error instanceof Error ? error.message : "There was an error initiating the call. Please try again.",
        variant: "destructive"
      });
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
              className="bg-mint hover:bg-mint-dark text-white flex items-center gap-2 font-medium shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Call {assistantName}
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
