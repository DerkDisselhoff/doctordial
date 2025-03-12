
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [hasExistingSession, setHasExistingSession] = useState(false);

  const handleAuthError = (error: AuthError) => {
    let errorMessage = "An error occurred during authentication.";
    
    if (error.message?.includes('Invalid login credentials')) {
      errorMessage = "Invalid email or password. Please check your credentials and try again.";
    } else if (error.message?.includes('refresh_token_not_found') || 
               error.message?.includes('Invalid Refresh Token')) {
      errorMessage = "Your session has expired. Please sign in again.";
    }

    toast({
      title: "Authentication Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setHasExistingSession(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        handleAuthError(error);
      } else {
        console.error("Logout error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          handleAuthError(error);
          await supabase.auth.signOut();
          setHasExistingSession(false);
        } else if (session) {
          setHasExistingSession(true);
          // Don't automatically navigate if there's a session
          // Let the user choose to continue with the session or log out
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/dashboard");
      } else if (event === 'SIGNED_OUT') {
        setHasExistingSession(false);
      } else if (event === 'USER_UPDATED' && !session) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          handleAuthError(error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mint"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-light to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-mint/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-dark tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-gray">Sign in to access your dashboard</p>
          </div>

          {hasExistingSession ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg text-blue-800">
                <p className="font-medium">You are already logged in</p>
                <p className="text-sm mt-1">To login with a different account, please log out first.</p>
              </div>
              <Button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 bg-mint hover:bg-mint-dark"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="outline" 
                className="w-full border-mint text-mint hover:bg-mint/5"
              >
                Continue to Dashboard
              </Button>
            </div>
          ) : (
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'var(--mint)',
                      brandAccent: 'var(--mint-dark)',
                      brandButtonText: 'white',
                      inputBackground: 'white',
                      inputText: 'var(--text-primary)',
                      inputPlaceholder: 'var(--text-placeholder)',
                      inputBorder: 'var(--border)',
                      inputBorderHover: 'var(--mint)',
                      inputBorderFocus: 'var(--mint)',
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
                    backgroundColor: 'var(--mint)',
                    color: 'white',
                  },
                  anchor: {
                    color: 'var(--mint)',
                    fontWeight: '500',
                    transition: 'color 150ms ease',
                  },
                  input: {
                    backgroundColor: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    padding: '0.625rem 1rem',
                  },
                  message: {
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                  },
                  label: {
                    color: 'var(--text-primary)',
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
