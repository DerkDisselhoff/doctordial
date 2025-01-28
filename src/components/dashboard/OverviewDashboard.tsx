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

  const handleCall = () => {
    if (!phoneNumber) {
      toast({
        title: "No phone number set",
        description: "Please set your phone number in your profile settings first.",
        variant: "destructive"
      });
      return;
    }

    // Here you would implement the actual call functionality
    window.location.href = `tel:${phoneNumber}`;
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