import { 
  BarChart3, 
  Users, 
  Phone, 
  Settings, 
  Home,
  Building2,
  DollarSign,
  FileText,
  Activity,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const menuItems = [
  { title: "Overview", icon: Home, path: "/dashboard" },
  { title: "Clients", icon: Users, path: "/dashboard/clients" },
  { title: "Practices", icon: Building2, path: "/dashboard/practices" },
  { title: "Call Analytics", icon: Phone, path: "/dashboard/calls" },
  { title: "Reports", icon: BarChart3, path: "/dashboard/reports" },
  { title: "Billing", icon: DollarSign, path: "/dashboard/billing" },
  { title: "Contracts", icon: FileText, path: "/dashboard/contracts" },
  { title: "Activity", icon: Activity, path: "/dashboard/activity" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}