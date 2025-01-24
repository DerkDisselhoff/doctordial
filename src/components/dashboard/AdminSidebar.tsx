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
  Shield,
  CreditCard,
  Grid,
  Receipt,
  Calendar,
  GitBranch
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [userProfile, setUserProfile] = useState<{
    username?: string | null;
    avatar_url?: string | null;
    company_name?: string | null;
  }>({
    username: "Dr. Sarah Johnson",
    avatar_url: "/assets/ai-agent.webp",
    company_name: "Centrum Medical"
  });

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

  const clientMenuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Workflow", icon: GitBranch, path: "/dashboard/workflow" },
    { title: "Worker Output", icon: Phone, path: "/dashboard/calls" },
  ];

  const adminMenuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Worker Output", icon: Phone, path: "/dashboard/calls" },
    { title: "Appointments", icon: Calendar, path: "/dashboard/appointments" },
    { title: "Calendar", icon: Calendar, path: "/dashboard/calendar" },
    { title: "Clients", icon: Users, path: "/dashboard/clients" },
    { title: "Practices", icon: Building2, path: "/dashboard/practices" },
    { title: "Reports", icon: BarChart3, path: "/dashboard/reports" },
    { title: "Billing", icon: DollarSign, path: "/dashboard/billing" },
    { title: "Contracts", icon: FileText, path: "/dashboard/contracts" },
    { title: "Activity", icon: Activity, path: "/dashboard/activity" },
  ];

  const settingsMenuItems = [
    { title: "General", icon: Grid, path: "/dashboard/settings/general" },
    { title: "Billing", icon: CreditCard, path: "/dashboard/settings/billing" },
    { title: "Invoices", icon: Receipt, path: "/dashboard/settings/invoices" },
    { title: "Security & Privacy", icon: Shield, path: "/dashboard/settings/security" },
    { title: "Team", icon: Users, path: "/dashboard/settings/team" },
    { title: "Integrations", icon: Building2, path: "/dashboard/settings/integrations" },
  ];

  const MenuItem = ({ icon: Icon, title, path }: { icon: any; title: string; path: string }) => {
    const isActive = location.pathname === path;
    
    return (
      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 px-3 py-2 ${
          isActive 
            ? 'bg-primary/10 text-text-primary' 
            : 'text-text-secondary hover:bg-primary/5 hover:text-text-primary'
        }`}
        onClick={() => navigate(path)}
      >
        <Icon className="h-5 w-5" />
        <span>{title}</span>
      </Button>
    );
  };

  const SettingsMenuItem = () => {
    const isSettingsActive = location.pathname.includes('/dashboard/settings');
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 px-3 py-2 ${
              isSettingsActive 
                ? 'bg-primary/10 text-text-primary' 
                : 'text-text-secondary hover:bg-primary/5 hover:text-text-primary'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-surface border-surface-input"
          align="start"
          alignOffset={0}
          sideOffset={2}
        >
          {settingsMenuItems.map((item) => (
            <DropdownMenuItem
              key={item.title}
              className="text-text-secondary hover:text-text-primary hover:bg-primary/5 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <Sidebar>
      <div className="flex h-full w-64 flex-col bg-surface border-r border-surface-input">
        <div className="p-6 border-b border-surface-input">
          <Logo className="text-text-primary" />
          {userProfile?.company_name && (
            <div className="mt-4 text-text-secondary">
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
                  <>
                    {adminMenuItems.map((item) => (
                      <MenuItem key={item.title} {...item} />
                    ))}
                    <SettingsMenuItem />
                  </>
                ) : (
                  <>
                    {clientMenuItems.map((item) => (
                      <MenuItem key={item.title} {...item} />
                    ))}
                    <SettingsMenuItem />
                  </>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="border-t border-surface-input p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 px-2 hover:bg-primary/5">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarImage src={userProfile?.avatar_url || ''} />
                  <AvatarFallback className="bg-primary/10 text-text-primary">
                    {userProfile?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-text-primary">
                    {userProfile?.username || 'User'}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {userRole === 'admin' ? 'Administrator' : 'Practice Manager'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-surface border-surface-input">
              <DropdownMenuItem 
                className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
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