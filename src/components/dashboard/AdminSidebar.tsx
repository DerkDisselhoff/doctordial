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
  LogOut,
  UserCog,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
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
    { section: "Analytics & Reports", items: [
      { title: "Call Analytics", icon: Phone, path: "/dashboard/calls" },
      { title: "Reports", icon: BarChart3, path: "/dashboard/reports" },
    ]},
    { section: "Business", items: [
      { title: "Billing", icon: DollarSign, path: "/dashboard/billing" },
      { title: "Contracts", icon: FileText, path: "/dashboard/contracts" },
      { title: "Activity", icon: Activity, path: "/dashboard/activity" },
    ]},
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const clientMenuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Call Analytics", icon: Phone, path: "/dashboard/calls" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const menuItems = userRole === 'admin' ? adminMenuItems : clientMenuItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-mint/10">
          <h1 className="text-xl font-semibold text-forest tracking-tight">
            DoctorDial
          </h1>
        </div>
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item, index) => (
                  'section' in item ? (
                    <div key={item.section} className="mt-6 first:mt-0">
                      <div className="px-4 mb-2">
                        <p className="text-xs font-medium text-forest/60 uppercase tracking-wider">
                          {item.section}
                        </p>
                      </div>
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton 
                            onClick={() => navigate(subItem.path)}
                            className={isActive(subItem.path) ? 
                              "bg-mint/10 text-forest font-medium" : undefined}
                          >
                            <subItem.icon className="w-4 h-4 mr-2" />
                            <span>{subItem.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                      {index < menuItems.length - 1 && (
                        <Separator className="my-4 bg-mint/10" />
                      )}
                    </div>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => navigate(item.path)}
                        className={isActive(item.path) ? 
                          "bg-mint/10 text-forest font-medium" : undefined}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <div className="mt-auto border-t border-mint/10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-4 hover:bg-mint/5">
                <Avatar className="h-8 w-8 mr-3 ring-2 ring-mint/20">
                  <AvatarImage src={userProfile?.avatar_url || ''} />
                  <AvatarFallback className="bg-mint/10 text-forest">
                    {userProfile?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-forest">
                    {userProfile?.username || 'User'}
                  </span>
                  <span className="text-xs text-forest/60">
                    {userProfile?.company_name || (userRole === 'admin' ? 'Administrator' : 'Client')}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="right">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              {userRole === 'admin' && (
                <DropdownMenuItem onClick={() => navigate('/dashboard/clients')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Manage Clients</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Sidebar>
  );
}