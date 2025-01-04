import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewDashboard } from "@/components/dashboard/OverviewDashboard";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Clients from "./dashboard/Clients";
import Practices from "./dashboard/Practices";
import Calls from "./dashboard/Calls";
import Reports from "./dashboard/Reports";
import Billing from "./Billing";
import Activity from "./dashboard/Activity";
import Settings from "./dashboard/Settings";
import Contracts from "./dashboard/Contracts";

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
        <Routes>
          <Route path="/" element={<OverviewDashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/calls" element={<Calls />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </QueryClientProvider>
  );
};

export default Dashboard;