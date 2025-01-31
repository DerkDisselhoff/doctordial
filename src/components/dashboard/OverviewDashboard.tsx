import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Users, Calendar, PhoneCall, StopCircle, Loader } from "lucide-react";
import { UrgentCases } from "./client/UrgentCases";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Vapi from "@vapi-ai/web";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [isCallLoading, setIsCallLoading] = useState(false);
  const { toast } = useToast();
  const activeCallRef = useRef<any>(null);
  const { t } = useLanguage();

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

  const cleanupCall = useCallback(() => {
    if (activeCallRef.current) {
      try {
        activeCallRef.current.off('ended');
        activeCallRef.current.off('error');
        activeCallRef.current = null;
      } catch (error) {
        console.error('Error cleaning up call:', error);
      }
    }
    setIsCallActive(false);
    setIsCallLoading(false);
  }, []);

  const endCall = useCallback(() => {
    try {
      if (activeCallRef.current) {
        activeCallRef.current.stop();
        cleanupCall();
        toast({
          title: t('dashboard.toast.callEnded'),
          description: t('dashboard.toast.callEndedDesc'),
        });
      }
    } catch (error) {
      console.error('Error ending call:', error);
      cleanupCall();
      toast({
        title: t('dashboard.toast.callError'),
        description: t('dashboard.toast.callErrorDesc'),
        variant: "destructive",
      });
    }
  }, [cleanupCall, toast, t]);

  const handleCall = useCallback(async () => {
    if (isCallActive) {
      endCall();
      return;
    }

    if (isCallLoading || activeCallRef.current) {
      console.log('Call already in progress');
      return;
    }

    try {
      setIsCallLoading(true);
      
      // Add artificial delay of 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const vapi = new Vapi("9a63ea0f-c066-4221-857e-0b7edfcef3f4");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const call = await vapi.start("d1dcfa30-8f3e-4be4-9b20-83d9f54e4877");
      activeCallRef.current = call;

      setIsCallActive(true);
      setIsCallLoading(false);
      toast({
        title: t('dashboard.toast.callConnected'),
        description: t('dashboard.toast.callConnectedDesc'),
      });

      call.on('ended', () => {
        cleanupCall();
        toast({
          title: t('dashboard.toast.callEnded'),
          description: t('dashboard.toast.callEndedDesc'),
        });
      });

      call.on('error', (error) => {
        console.error('VAPI call error:', error);
        cleanupCall();
        toast({
          title: t('dashboard.toast.callError'),
          description: error?.message || t('dashboard.toast.callErrorDesc'),
          variant: "destructive",
        });
      });

    } catch (error) {
      console.error('Error starting VAPI call:', error);
      cleanupCall();
      toast({
        title: t('dashboard.toast.callFailed'),
        description: error instanceof Error ? error.message : t('dashboard.toast.callErrorDesc'),
        variant: "destructive",
      });
    }
  }, [toast, isCallActive, isCallLoading, cleanupCall, endCall, t]);

  useEffect(() => {
    return () => {
      cleanupCall();
    };
  }, [cleanupCall]);

  const getButtonContent = () => {
    if (isCallLoading) {
      return (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>{t('dashboard.callButton.connecting')}</span>
        </>
      );
    }
    if (isCallActive) {
      return (
        <>
          <StopCircle className="w-4 h-4" />
          <span>{t('dashboard.callButton.end')}</span>
        </>
      );
    }
    return (
      <>
        <PhoneCall className="w-4 h-4" />
        <span>{t('dashboard.callButton.start')}</span>
      </>
    );
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
              disabled={isCallLoading}
              className={`
                ${isCallActive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : isCallLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-mint hover:bg-mint-dark'
                } 
                text-white flex items-center gap-2 font-medium shadow-sm transition-colors duration-200
              `}
            >
              {getButtonContent()}
            </Button>
            
            <div className="flex items-center space-x-4 text-sm text-gray">
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'today'}
                onPressedChange={() => setTimeFilter('today')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                {t('dashboard.filters.today')}
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'week'}
                onPressedChange={() => setTimeFilter('week')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                {t('dashboard.filters.lastWeek')}
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'month'}
                onPressedChange={() => setTimeFilter('month')}
                className="h-auto px-0 hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-blue-dark data-[state=on]:underline hover:text-blue-dark"
              >
                {t('dashboard.filters.lastMonth')}
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
