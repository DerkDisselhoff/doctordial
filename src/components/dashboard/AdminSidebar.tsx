import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Building2, Phone, BarChart3, Receipt, FileText, Activity, Settings, LogOut, Bot } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { SidebarMenuItem } from "./sidebar/SidebarMenuItem";

export function AdminSidebar() {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setUserRole(profile?.role || null);
      }
    };
    checkRole();
  }, []);

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-56 bg-white border-r border-gray-200">
      <div className="p-5 border-b border-mint/10">
        <div className="flex items-center space-x-3 transition-all hover:opacity-80">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            DoctorDial
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 h-full pb-4 overflow-y-auto">
        <div className="py-4 px-3">
          <ul className="space-y-2">
            <SidebarMenuItem
              icon={LayoutDashboard}
              title="Overview"
              path="/dashboard"
            />
            {userRole === 'admin' ? (
              <>
                <SidebarMenuItem
                  icon={Users}
                  title="Clients"
                  path="/dashboard/clients"
                />
                <SidebarMenuItem
                  icon={Building2}
                  title="Practices"
                  path="/dashboard/practices"
                />
              </>
            ) : null}
            <SidebarMenuItem
              icon={Phone}
              title="Calls"
              path="/dashboard/calls"
            />
            {userRole === 'admin' ? (
              <>
                <SidebarMenuItem
                  icon={BarChart3}
                  title="Reports"
                  path="/dashboard/reports"
                />
                <SidebarMenuItem
                  icon={Receipt}
                  title="Billing"
                  path="/dashboard/billing"
                />
                <SidebarMenuItem
                  icon={FileText}
                  title="Contracts"
                  path="/dashboard/contracts"
                />
                <SidebarMenuItem
                  icon={Activity}
                  title="Activity"
                  path="/dashboard/activity"
                />
              </>
            ) : null}
            {userRole === 'client' && (
              <SidebarMenuItem
                icon={Bot}
                title="Assistant"
                path="/dashboard/assistant"
              />
            )}
          </ul>
        </div>
        <div className="px-3">
          <ul className="space-y-2">
            <SidebarMenuItem
              icon={Settings}
              title="Settings"
              path="/dashboard/settings"
            />
            <SidebarMenuItem
              icon={LogOut}
              title="Logout"
              path="/"
            />
          </ul>
        </div>
      </div>
    </aside>
  );
}