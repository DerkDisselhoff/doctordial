import { 
  BarChart3, 
  Users, 
  Phone, 
  Settings, 
  Home,
  Building2,
  DollarSign,
  FileText,
  Activity
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarSection } from "./sidebar/SidebarSection";
import { SidebarProfile } from "./sidebar/SidebarProfile";

export function AdminSidebar() {
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [userProfile, setUserProfile] = useState<{
    username?: string | null;
    avatar_url?: string | null;
    company_name?: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, username, avatar_url, company_name')
          .eq('id', session.user.id)
          .single();
        
        setUserRole(profile?.role || null);
        setUserProfile({
          username: profile?.username || session.user.email?.split('@')[0],
          avatar_url: profile?.avatar_url,
          company_name: profile?.company_name,
        });
      }
    };
    fetchUserProfile();
  }, []);

  const adminMenuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Clients", icon: Users, path: "/dashboard/clients" },
    { title: "Practices", icon: Building2, path: "/dashboard/practices" },
  ];

  const analyticsItems = [
    { title: "Call Analytics", icon: Phone, path: "/dashboard/calls" },
    { title: "Reports", icon: BarChart3, path: "/dashboard/reports" },
  ];

  const businessItems = [
    { title: "Billing", icon: DollarSign, path: "/dashboard/billing" },
    { title: "Contracts", icon: FileText, path: "/dashboard/contracts" },
    { title: "Activity", icon: Activity, path: "/dashboard/activity" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const clientMenuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Call Analytics", icon: Phone, path: "/dashboard/calls" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <Sidebar>
      <div className="flex flex-col h-full bg-forest-light/95 backdrop-blur-xl border-r border-mint/10">
        <SidebarHeader />
        <SidebarContent className="flex-1 px-3 py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              {userRole === 'admin' ? (
                <>
                  <SidebarSection items={adminMenuItems} />
                  <div className="mt-8">
                    <SidebarSection 
                      title="Analytics & Reports" 
                      items={analyticsItems} 
                    />
                  </div>
                  <div className="mt-8">
                    <SidebarSection 
                      title="Business" 
                      items={businessItems} 
                    />
                  </div>
                </>
              ) : (
                <SidebarSection items={clientMenuItems} />
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarProfile userProfile={userProfile} userRole={userRole} />
      </div>
    </Sidebar>
  );
}