import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session and handle invalid refresh tokens
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        if (error.message?.includes('refresh_token_not_found') || 
            error.message?.includes('Invalid Refresh Token')) {
          // Clear any invalid session data
          await supabase.auth.signOut();
          
          toast({
            title: "Session Expired",
            description: "Please sign in again to continue.",
            variant: "destructive",
          });
        }
      } else if (session) {
        navigate("/dashboard");
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/dashboard");
      } else if (event === 'SIGNED_OUT') {
        navigate("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-forest tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#64FFDA',
                  brandAccent: '#A7FFE4',
                  brandButtonText: '#0A1F2F',
                  inputBackground: 'white',
                  inputText: '#0A1F2F',
                  inputPlaceholder: '#94A3B8',
                  inputBorder: '#E2E8F0',
                  inputBorderHover: '#64FFDA',
                  inputBorderFocus: '#64FFDA',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '0.5rem',
                  buttonBorderRadius: '0.5rem',
                  inputBorderRadius: '0.5rem',
                },
              },
            },
            style: {
              button: {
                border: '1px solid transparent',
                fontWeight: '500',
                padding: '0.625rem 1.25rem',
                transition: 'all 150ms ease',
              },
              anchor: {
                color: '#64FFDA',
                fontWeight: '500',
                transition: 'color 150ms ease',
              },
              input: {
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '0.5rem',
                padding: '0.625rem 1rem',
              },
              message: {
                color: '#0A1F2F',
                fontSize: '0.875rem',
              },
              label: {
                color: '#0A1F2F',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.25rem',
              },
            },
          }}
          providers={[]}
          view="sign_in"
          showLinks={false}
        />
      </div>
    </div>
  );
};

export default Login;