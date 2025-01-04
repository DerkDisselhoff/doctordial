import { ClientManagementSection } from "@/components/client-management/ClientManagementSection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-forest mb-8">Dashboard</h1>
        <div className="space-y-8 text-forest">
          <ClientManagementSection />
          {/* Add other dashboard sections here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;