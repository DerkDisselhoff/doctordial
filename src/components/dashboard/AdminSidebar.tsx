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
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}