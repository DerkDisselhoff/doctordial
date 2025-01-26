import { MetricsCards } from "./metrics/MetricsCards";
import { DashboardCharts } from "./charts/DashboardCharts";
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Activity, Users, Calendar } from "lucide-react";
import { UrgentCases } from "./client/UrgentCases";
import { motion } from "framer-motion";

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
      }
    };

    checkUserRole();
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
          className="flex items-center justify-end"
        >
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