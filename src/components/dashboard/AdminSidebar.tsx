
import { 
  BarChart3, Users, Phone, Settings, Home, Building2, 
  DollarSign, FileText, Activity, LogOut, Shield, 
  CreditCard, Grid, Receipt, Calendar, GitBranch,
  Pill, Microscope, ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
  }>({
    username: "Dr. Sarah Johnson",
    avatar_url: "/assets/ai-agent.webp",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, username, avatar_url')
          .eq('id', session.user.id)
          .single();
        
        setUserRole(profile?.role || null);
        setUserProfile({
          username: profile?.username || session.user.email?.split('@')[0],
          avatar_url: profile?.avatar_url,
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
        title: "Uitgelogd",
        description: "Je bent succesvol uitgelogd.",
      });
    } catch (error) {
      toast({
        title: "Fout bij uitloggen",
        description: "Probeer het opnieuw.",
        variant: "destructive",
      });
    }
  };

  const MenuItem = ({ icon: Icon, title, path }: { icon: any; title: string; path: string }) => {
    const isActive = location.pathname === path || 
                 (path !== "/dashboard/calls" && location.pathname.includes(path));
    
    return (
      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 px-3 py-2.5 group transition-all duration-200 ${
          isActive 
            ? 'bg-mint/10 text-gray-dark font-semibold' 
            : 'text-gray hover:bg-mint/5 hover:text-gray-dark hover:translate-x-1'
        }`}
        onClick={() => navigate(path)}
      >
        <Icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
          isActive ? 'text-mint' : 'text-gray/70 group-hover:text-mint'
        }`} />
        <span>{title}</span>
      </Button>
    );
  };

  const SubMenuItem = ({ icon: Icon, title, path }: { icon: any; title: string; path: string }) => {
    const isActive = location.pathname === path;
    
    return (
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 pl-7 pr-3 py-2 text-sm group transition-all duration-200 ${
          isActive 
            ? 'bg-mint/10 text-gray-dark font-semibold' 
            : 'text-gray hover:bg-mint/5 hover:text-gray-dark hover:translate-x-1'
        }`}
        onClick={() => navigate(path)}
      >
        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${
          isActive ? 'text-mint' : 'text-gray/70 group-hover:text-mint'
        }`} />
        <span>{title}</span>
      </Button>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="px-4 py-2 text-sm font-medium text-gray/80">{title}</div>
  );

  const clientMenuItems = [
    { title: "Overzicht", icon: Home, path: "/dashboard" },
    { title: "Werkstroom", icon: GitBranch, path: "/dashboard/workflow" },
  ];

  const adminMenuItems = [
    { title: "Overzicht", icon: Home, path: "/dashboard" },
    { title: "Afspraken", icon: Calendar, path: "/dashboard/appointments" },
    { title: "Agenda", icon: Calendar, path: "/dashboard/calendar" },
    { title: "Cliënten", icon: Users, path: "/dashboard/clients" },
    { title: "Praktijken", icon: Building2, path: "/dashboard/practices" },
    { title: "Rapporten", icon: BarChart3, path: "/dashboard/reports" },
    { title: "Facturatie", icon: DollarSign, path: "/dashboard/billing" },
    { title: "Contracten", icon: FileText, path: "/dashboard/contracts" },
    { title: "Activiteit", icon: Activity, path: "/dashboard/activity" },
  ];

  const assistantOutputItems = [
    { title: "Triage", icon: Phone, path: "/dashboard/calls" },
    { title: "Medication", icon: Pill, path: "/dashboard/calls/medication" },
    { title: "Research Results", icon: Microscope, path: "/dashboard/calls/research" },
  ];

  const settingsMenuItems = [
    { title: "Algemeen", icon: Grid, path: "/dashboard/settings/general" },
    { title: "Facturatie", icon: CreditCard, path: "/dashboard/settings/billing" },
    { title: "Facturen", icon: Receipt, path: "/dashboard/settings/invoices" },
    { title: "Beveiliging & Privacy", icon: Shield, path: "/dashboard/settings/security" },
    { title: "Team", icon: Users, path: "/dashboard/settings/team" },
    { title: "Integraties", icon: Building2, path: "/dashboard/settings/integrations" },
  ];

  return (
    <Sidebar>
      <div className="flex h-full w-64 flex-col bg-white border-r border-gray-muted">
        <div className="p-6 border-b border-gray-muted">
          <Logo className="text-gray-dark" />
        </div>

        <SidebarContent className="flex-1 px-3 py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="space-y-6">
                {/* Main Menu Items */}
                <div className="space-y-1">
                  {userRole === 'admin' ? (
                    <>
                      {adminMenuItems.map((item) => (
                        <MenuItem key={item.title} {...item} />
                      ))}
                    </>
                  ) : (
                    <>
                      {clientMenuItems.map((item) => (
                        <MenuItem key={item.title} {...item} />
                      ))}
                    </>
                  )}
                </div>

                {/* Assistant Output Section */}
                <div className="space-y-1">
                  <SectionTitle title="Assistant Output" />
                  {assistantOutputItems.map((item) => (
                    <SubMenuItem key={item.title} {...item} />
                  ))}
                </div>

                {/* Settings Section */}
                <div className="space-y-1">
                  <SectionTitle title="Instellingen" />
                  {settingsMenuItems.map((item) => (
                    <SubMenuItem key={item.title} {...item} />
                  ))}
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="border-t border-gray-muted p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 px-2 hover:bg-mint/5 group">
                <Avatar className="h-8 w-8 ring-2 ring-mint/20 group-hover:ring-mint/40 transition-all">
                  <AvatarImage src={userProfile?.avatar_url || ''} />
                  <AvatarFallback className="bg-mint/10 text-gray-dark">
                    {userProfile?.username?.[0]?.toUpperCase() || 'G'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-gray-dark">
                    {userProfile?.username || 'Gebruiker'}
                  </span>
                  <span className="text-xs text-gray">
                    {userRole === 'admin' ? 'Beheerder' : 'Praktijkmanager'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border-gray-muted">
              <DropdownMenuItem 
                className="flex items-center px-3 py-2 text-red-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Uitloggen</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Sidebar>
  );
}
