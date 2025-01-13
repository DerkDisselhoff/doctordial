import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { LayoutDashboard, Users, PhoneCall, Calendar, ChartBar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const MenuItem = ({ icon: Icon, label, isActive = false }: { icon: any, label: string, isActive?: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors",
    isActive ? "bg-mint/10 text-mint" : "text-white/70 hover:bg-mint/5 hover:text-white"
  )}>
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-forest">
      <div className="p-6 border-b border-mint/10 bg-forest-light/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="text-white" />
            <div className="border-l border-mint/10 pl-4">
              <h3 className="text-white font-medium">{profile?.company_name || 'Medical Practice'}</h3>
              <p className="text-white/60 text-sm">Netherlands</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white">{profile?.username || 'User'}</p>
              <p className="text-white/60 text-sm">{profile?.role === 'admin' ? 'Administrator' : 'Practice Manager'}</p>
            </div>
            <Avatar className="w-10 h-10">
              <AvatarImage src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.username}`} />
              <AvatarFallback>{profile?.username?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-[calc(100vh-88px)] p-6 space-y-2 bg-forest-light/50 border-r border-mint/10">
          <MenuItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            isActive={location.pathname === '/dashboard'} 
          />
          <MenuItem 
            icon={Users} 
            label="Patients" 
            isActive={location.pathname.includes('/patients')} 
          />
          <MenuItem 
            icon={PhoneCall} 
            label="Calls" 
            isActive={location.pathname.includes('/calls')} 
          />
          <MenuItem 
            icon={Calendar} 
            label="Appointments" 
            isActive={location.pathname.includes('/appointments')} 
          />
          <MenuItem 
            icon={ChartBar} 
            label="Analytics" 
            isActive={location.pathname.includes('/analytics')} 
          />
          <MenuItem 
            icon={Settings} 
            label="Settings" 
            isActive={location.pathname.includes('/settings')} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}