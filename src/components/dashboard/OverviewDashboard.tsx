import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CirclePlay, CirclePause, Sparkles, Activity, Users, Calendar } from "lucide-react";
import { UrgentCases } from "./client/UrgentCases";
import { motion } from "framer-motion";

type TimeFilter = 'today' | 'week' | 'month';

interface AssistantStatus {
  is_live: boolean;
  assistant_name: string;
}

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
  const [isAssistantLive, setIsAssistantLive] = useState(false);
  const [assistantName, setAssistantName] = useState('Assistant');

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || null);

        const { data: statusData } = await supabase
          .from('assistant_status')
          .select('is_live, assistant_name')
          .eq('profile_id', session.user.id)
          .maybeSingle();

        if (statusData) {
          setIsAssistantLive(statusData.is_live);
          setAssistantName(statusData.assistant_name || 'Assistant');
        }
      }
    };

    checkUserRole();

    const channel = supabase
      .channel('assistant_status_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'assistant_status',
          filter: `profile_id=eq.${supabase.auth.getSession().then(({ data }) => data.session?.user.id)}`
        },
        (payload) => {
          const newStatus = payload.new as AssistantStatus;
          if (newStatus) {
            setIsAssistantLive(newStatus.is_live);
            setAssistantName(newStatus.assistant_name || 'Assistant');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative">
        <FloatingIcon icon={Activity} delay={0} x={85} y={20} />
        <FloatingIcon icon={Users} delay={1.5} x={92} y={50} />
        <FloatingIcon icon={Calendar} delay={2.5} x={88} y={80} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-dark">Dashboard Overview</h2>
              <p className="text-gray">Monitor your key metrics and performance</p>
            </motion.div>
            {userRole === 'client' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-light/30 to-mint/20 px-4 py-2 rounded-lg border border-blue-muted backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  {isAssistantLive ? (
                    <>
                      <CirclePlay className="w-4 h-4 text-green animate-pulse" />
                      <span className="text-sm text-gray-dark font-medium">{assistantName} Active</span>
                    </>
                  ) : (
                    <>
                      <CirclePause className="w-4 h-4 text-gray" />
                      <span className="text-sm text-gray">{assistantName} Offline</span>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          
          {userRole === 'client' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-light/30 to-mint/20 p-2 rounded-lg backdrop-blur-sm"
            >
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'today'}
                onPressedChange={() => setTimeFilter('today')}
                className="data-[state=on]:bg-blue-dark/20 data-[state=on]:text-blue-dark hover:bg-blue-dark/10"
              >
                Today
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'week'}
                onPressedChange={() => setTimeFilter('week')}
                className="data-[state=on]:bg-blue-dark/20 data-[state=on]:text-blue-dark hover:bg-blue-dark/10"
              >
                Last Week
              </Toggle>
              <Toggle
                variant="outline"
                size="sm"
                pressed={timeFilter === 'month'}
                onPressedChange={() => setTimeFilter('month')}
                className="data-[state=on]:bg-blue-dark/20 data-[state=on]:text-blue-dark hover:bg-blue-dark/10"
              >
                Last Month
              </Toggle>
            </motion.div>
          )}
        </motion.div>
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