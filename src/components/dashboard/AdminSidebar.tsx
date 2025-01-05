import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { SidebarHeader, SidebarProfile, SidebarMenuItem } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Building2, Phone, BarChart3, Receipt, FileText, Activity, Settings, LogOut, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export function AdminSidebar() {
  const { isOpen } = useSidebar();
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
    <aside className={cn(
      "fixed top-0 left-0 z-40 h-screen transition-transform bg-white border-r border-gray-200",
      isOpen ? "w-56" : "w-16"
    )}>
      <SidebarHeader />
      <div className="flex flex-col justify-between flex-1 h-full pb-4 overflow-y-auto">
        <div className="py-4 px-3">
          <ul className="space-y-2">
            <SidebarMenuItem
              to="/dashboard"
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Overview"
            />
            {userRole === 'admin' ? (
              <>
                <SidebarMenuItem
                  to="/dashboard/clients"
                  icon={<Users className="w-5 h-5" />}
                  label="Clients"
                />
                <SidebarMenuItem
                  to="/dashboard/practices"
                  icon={<Building2 className="w-5 h-5" />}
                  label="Practices"
                />
              </>
            ) : null}
            <SidebarMenuItem
              to="/dashboard/calls"
              icon={<Phone className="w-5 h-5" />}
              label="Calls"
            />
            {userRole === 'admin' ? (
              <>
                <SidebarMenuItem
                  to="/dashboard/reports"
                  icon={<BarChart3 className="w-5 h-5" />}
                  label="Reports"
                />
                <SidebarMenuItem
                  to="/dashboard/billing"
                  icon={<Receipt className="w-5 h-5" />}
                  label="Billing"
                />
                <SidebarMenuItem
                  to="/dashboard/contracts"
                  icon={<FileText className="w-5 h-5" />}
                  label="Contracts"
                />
                <SidebarMenuItem
                  to="/dashboard/activity"
                  icon={<Activity className="w-5 h-5" />}
                  label="Activity"
                />
              </>
            ) : null}
            {userRole === 'client' && (
              <SidebarMenuItem
                to="/dashboard/assistant"
                icon={<Bot className="w-5 h-5" />}
                label="Assistant"
              />
            )}
          </ul>
        </div>
        <div className="px-3">
          <ul className="space-y-2">
            <SidebarMenuItem
              to="/dashboard/settings"
              icon={<Settings className="w-5 h-5" />}
              label="Settings"
            />
            <SidebarMenuItem
              to="/"
              icon={<LogOut className="w-5 h-5" />}
              label="Logout"
            />
          </ul>
        </div>
      </div>
      <SidebarProfile />
    </aside>
  );
}
