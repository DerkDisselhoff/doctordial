import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewDashboard } from "@/components/dashboard/OverviewDashboard";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Clients from "./dashboard/Clients";
import Practices from "./dashboard/Practices";
import Calls from "./dashboard/Calls";
import Reports from "./dashboard/Reports";
import Billing from "./Billing";
import Activity from "./dashboard/Activity";
import Settings from "./dashboard/Settings";
import Contracts from "./dashboard/Contracts";
import Assistant from "./dashboard/Assistant";
import Appointments from "./dashboard/Appointments";
import AppointmentDetail from "./dashboard/AppointmentDetail";
import GeneralSettings from "./dashboard/settings/General";
import BillingSettings from "./dashboard/settings/Billing";
import InvoicesSettings from "./dashboard/settings/Invoices";
import SecuritySettings from "./dashboard/settings/Security";

const queryClient = new QueryClient();

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      setUserRole(profile?.role || null);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-forest">
        <Loader2 className="w-8 h-8 text-mint animate-spin" />
      </div>
    );
  }

  if (!userRole) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint"></div>
    </div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<OverviewDashboard />} />
          {userRole === 'admin' ? (
            <>
              <Route path="/clients" element={<Clients />} />
              <Route path="/practices" element={<Practices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/activity" element={<Activity />} />
            </>
          ) : null}

          {/* Routes available to both admin and client users */}
          <Route path="/calls" element={<Calls />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/:id" element={<AppointmentDetail />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/settings/general" element={<GeneralSettings />} />
          <Route path="/settings/billing" element={<BillingSettings />} />
          <Route path="/settings/invoices" element={<InvoicesSettings />} />
          <Route path="/settings/security" element={<SecuritySettings />} />

          {/* Client-only routes */}
          {userRole === 'client' && (
            <Route path="/assistant" element={<Assistant />} />
          )}
        </Routes>
      </DashboardLayout>
    </QueryClientProvider>
  );
};

export default Dashboard;
