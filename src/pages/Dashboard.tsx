import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewDashboard } from "@/components/dashboard/OverviewDashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

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
    <DashboardLayout>
      <OverviewDashboard />
    </DashboardLayout>
  );
};

export default Dashboard;