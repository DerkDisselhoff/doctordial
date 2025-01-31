
import { 
  BarChart3, Users, Phone, Settings, Home, Building2, 
  DollarSign, FileText, Activity, LogOut, Shield, 
  CreditCard, Grid, Receipt, Calendar, GitBranch 
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
import { useLanguage } from "@/contexts/LanguageContext";

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const [userProfile, setUserProfile] = useState<{
    username?: string | null;
    avatar_url?: string | null;
    preferred_language?: string | null;
  }>({
    username: "Dr. Sarah Johnson",
    avatar_url: "/assets/ai-agent.webp",
    preferred_language: 'en'
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, username, avatar_url, preferred_language')
          .eq('id', session.user.id)
          .single();
        
        setUserRole(profile?.role || null);
        setUserProfile({
          username: profile?.username || session.user.email?.split('@')[0],
          avatar_url: profile?.avatar_url,
          preferred_language: profile?.preferred_language
        });

        // Set the language from the profile if it exists
        if (profile?.preferred_language) {
          setLanguage(profile.preferred_language as 'en' | 'nl');
        }
      }
    };
    fetchUserProfile();
  }, [setLanguage]);

  const handleLanguageChange = async () => {
    const newLanguage = language === 'nl' ? 'en' : 'nl';
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          preferred_language: newLanguage,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (error) {
        toast({
          title: t("dashboard.toast.saveError"),
          description: t("dashboard.toast.tryAgain"),
          variant: "destructive",
        });
        return;
      }
    }
    
    setLanguage(newLanguage);
    toast({
      title: t("dashboard.toast.saveSuccess"),
      description: newLanguage === 'nl' ? "Taal gewijzigd naar Nederlands" : "Language changed to English",
    });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: t("dashboard.toast.loggedOut"),
        description: t("dashboard.toast.loggedOutDesc"),
      });
    } catch (error) {
      toast({
        title: t("dashboard.toast.logoutError"),
        description: t("dashboard.toast.tryAgain"),
        variant: "destructive",
      });
    }
  };

  const MenuItem = ({ icon: Icon, title, path }: { icon: any; title: string; path: string }) => {
    const isActive = location.pathname === path;
    
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

  const clientMenuItems = [
    { title: t("dashboard.menu.overview"), icon: Home, path: "/dashboard" },
    { title: t("dashboard.menu.workflow"), icon: GitBranch, path: "/dashboard/workflow" },
    { title: t("dashboard.menu.workerOutput"), icon: Phone, path: "/dashboard/calls" },
  ];

  const adminMenuItems = [
    { title: t("dashboard.menu.overview"), icon: Home, path: "/dashboard" },
    { title: t("dashboard.menu.workerOutput"), icon: Phone, path: "/dashboard/calls" },
    { title: t("dashboard.menu.appointments"), icon: Calendar, path: "/dashboard/appointments" },
    { title: t("dashboard.menu.calendar"), icon: Calendar, path: "/dashboard/calendar" },
    { title: t("dashboard.menu.clients"), icon: Users, path: "/dashboard/clients" },
    { title: t("dashboard.menu.practices"), icon: Building2, path: "/dashboard/practices" },
    { title: t("dashboard.menu.reports"), icon: BarChart3, path: "/dashboard/reports" },
    { title: t("dashboard.menu.billing"), icon: DollarSign, path: "/dashboard/billing" },
    { title: t("dashboard.menu.contracts"), icon: FileText, path: "/dashboard/contracts" },
    { title: t("dashboard.menu.activity"), icon: Activity, path: "/dashboard/activity" },
  ];

  const settingsMenuItems = [
    { title: t("dashboard.settings.general"), icon: Grid, path: "/dashboard/settings/general" },
    { title: t("dashboard.settings.billing"), icon: CreditCard, path: "/dashboard/settings/billing" },
    { title: t("dashboard.settings.invoices"), icon: Receipt, path: "/dashboard/settings/invoices" },
    { title: t("dashboard.settings.security"), icon: Shield, path: "/dashboard/settings/security" },
    { title: t("dashboard.settings.team"), icon: Users, path: "/dashboard/settings/team" },
    { title: t("dashboard.settings.integrations"), icon: Building2, path: "/dashboard/settings/integrations" },
  ];

  const SettingsMenuItem = () => {
    const isSettingsActive = location.pathname.includes('/dashboard/settings');
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 px-3 py-2.5 group transition-all duration-200 ${
              isSettingsActive 
                ? 'bg-mint/10 text-gray-dark font-semibold' 
                : 'text-gray hover:bg-mint/5 hover:text-gray-dark hover:translate-x-1'
            }`}
          >
            <Settings className={`h-5 w-5 flex-shrink-0 transition-colors ${
              isSettingsActive ? 'text-mint' : 'text-gray/70 group-hover:text-mint'
            }`} />
            <span>{t("dashboard.menu.settings")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-white border-gray-muted/50 shadow-lg rounded-lg"
          align="start"
          alignOffset={0}
          sideOffset={2}
        >
          {settingsMenuItems.map((item) => (
            <DropdownMenuItem
              key={item.title}
              className="flex items-center px-3 py-2 text-sm text-gray hover:text-gray-dark hover:bg-mint/5 cursor-pointer transition-colors"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4 text-gray/70" />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <Sidebar>
      <div className="flex h-full w-64 flex-col bg-white border-r border-gray-muted">
        <div className="p-6 border-b border-gray-muted">
          <Logo className="text-gray-dark" />
        </div>

        <SidebarContent className="flex-1 px-3 py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-2.5 text-gray hover:bg-mint/5 hover:text-gray-dark"
                  onClick={handleLanguageChange}
                >
                  <span className="w-5 h-5 rounded-full bg-blue-dark flex items-center justify-center text-[10px] text-white font-medium">
                    {language.toUpperCase()}
                  </span>
                  <span>{language === 'nl' ? 'Nederlands' : 'English'}</span>
                </Button>
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

        <div className="border-t border-gray-muted p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 px-2 hover:bg-mint/5 group">
                <Avatar className="h-8 w-8 ring-2 ring-mint/20 group-hover:ring-mint/40 transition-all">
                  <AvatarImage src={userProfile?.avatar_url || ''} />
                  <AvatarFallback className="bg-mint/10 text-gray-dark">
                    {userProfile?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-gray-dark">
                    {userProfile?.username || t("dashboard.user.defaultName")}
                  </span>
                  <span className="text-xs text-gray">
                    {userRole === 'admin' ? t("dashboard.user.admin") : t("dashboard.user.practiceManager")}
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
                <span>{t("dashboard.menu.logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Sidebar>
  );
}
