import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-forest">
        <div className="fixed inset-y-0 left-0 z-50">
          <AdminSidebar />
        </div>
        <main className="flex-1 ml-56 overflow-y-auto">
          {/* Header */}
          <div className="border-b border-mint/10 bg-forest-light/50">
            <div className="flex items-center justify-between p-6">
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
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}