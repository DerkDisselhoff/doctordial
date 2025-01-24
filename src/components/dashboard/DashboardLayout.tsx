import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthError } from "@supabase/supabase-js";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile, error } = useQuery({
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

  // Handle authentication errors
  useEffect(() => {
    const handleAuthError = async () => {
      if (error instanceof AuthError) {
        console.error('Auth error:', error);
        
        // Check for specific refresh token errors
        if (error.message?.includes('refresh_token_not_found') || 
            error.message?.includes('Invalid Refresh Token')) {
          // Clear any invalid session data
          await supabase.auth.signOut();
          
          // Clear any local storage data
          localStorage.clear();
          
          // Redirect to login with error message
          navigate('/login');
          
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please sign in again to continue.",
            variant: "destructive",
          });
        }
      }
    };

    handleAuthError();
  }, [error, navigate, toast]);

  // Add auth state change listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        // Clear any remaining local storage data
        localStorage.clear();
        navigate('/login');
      }
      
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
      
      // Handle other auth state changes
      if (event === 'USER_UPDATED' && !session) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          navigate('/login');
        }
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <div className="fixed top-0 left-0 h-full z-40">
            <AdminSidebar />
          </div>
          <div className="flex-1 ml-64 p-8 bg-surface text-text-primary">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}