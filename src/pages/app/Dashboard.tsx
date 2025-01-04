import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewDashboard } from "@/components/dashboard/OverviewDashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <OverviewDashboard />
      </DashboardLayout>
    </QueryClientProvider>
  );
};

export default Dashboard;
