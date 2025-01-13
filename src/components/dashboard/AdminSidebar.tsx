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
  Bot,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function AdminSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const adminMenuItems = [
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

  const clientMenuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Call Analytics", icon: Phone, path: "/dashboard/calls" },
    { title: "Assistant", icon: Bot, path: "/dashboard/assistant" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const MenuItem = ({ icon: Icon, title, path }: { icon: any; title: string; path: string }) => (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 px-3 py-2 text-white/70 hover:bg-mint/10 hover:text-white"
      onClick={() => navigate(path)}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Button>
  );

  return (
    <Sidebar>
      <div className="flex h-full w-64 flex-col bg-forest-light/95 backdrop-blur-xl border-r border-mint/10">
        <div className="p-6 border-b border-mint/10">
          <Logo className="text-white" />
          {userProfile?.company_name && (
            <div className="mt-4 text-white/70">
              <p className="text-sm font-medium">{userProfile.company_name}</p>
              <p className="text-xs">Netherlands</p>
            </div>
          )}
        </div>

        <SidebarContent className="flex-1 px-3 py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="space-y-1">
                {userRole === 'admin' ? (
                  adminMenuItems.map((item) => (
                    <MenuItem key={item.title} {...item} />
                  ))
                ) : (
                  clientMenuItems.map((item) => (
                    <MenuItem key={item.title} {...item} />
                  ))
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="border-t border-mint/10 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 px-2 hover:bg-mint/5">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userProfile?.avatar_url || ''} />
                  <AvatarFallback className="bg-mint/10 text-forest">
                    {userProfile?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-white">
                    {userProfile?.username || 'User'}
                  </span>
                  <span className="text-xs text-white/60">
                    {userRole === 'admin' ? 'Administrator' : 'Practice Manager'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-forest-light border-mint/10">
              <DropdownMenuItem 
                className="text-red-400 hover:text-red-300 hover:bg-mint/5 cursor-pointer"
                onClick={handleLogout}
              >
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