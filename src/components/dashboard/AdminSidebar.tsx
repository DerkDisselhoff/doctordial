import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { SidebarSection } from "./sidebar/SidebarSection";
import {
  LayoutDashboard,
  Users,
  Building2,
  Phone,
  FileBarChart,
  Receipt,
  FileText,
  Settings,
  Activity,
  Bot,
} from "lucide-react";

export function AdminSidebar() {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
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

    checkUserRole();
  }, []);

  const adminMenuItems = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      path: "/dashboard"
    },
    {
      title: "Clients",
      icon: Users,
      path: "/dashboard/clients"
    },
    {
      title: "Practices",
      icon: Building2,
      path: "/dashboard/practices"
    },
    {
      title: "Call Analytics",
      icon: Phone,
      path: "/dashboard/calls"
    },
    {
      title: "Reports",
      icon: FileBarChart,
      path: "/dashboard/reports"
    },
    {
      title: "Billing",
      icon: Receipt,
      path: "/dashboard/billing"
    },
    {
      title: "Contracts",
      icon: FileText,
      path: "/dashboard/contracts"
    },
    {
      title: "Activity",
      icon: Activity,
      path: "/dashboard/activity"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings"
    }
  ];

  const clientMenuItems = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      path: "/dashboard"
    },
    {
      title: "Call Analytics",
      icon: Phone,
      path: "/dashboard/calls"
    },
    {
      title: "Assistant",
      icon: Bot,
      path: "/dashboard/assistant"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings"
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarSection
          items={userRole === 'admin' ? adminMenuItems : clientMenuItems}
          className="px-2"
        />
      </SidebarContent>
    </Sidebar>
  );
}