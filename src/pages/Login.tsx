import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // After successful signup/login, update profile with company info
        if (event === 'SIGNED_IN') {
          const metadata = session.user.user_metadata;
          if (metadata.company_name) {
            updateProfile(session.user.id, metadata);
          }
        }
        navigate("/");
      }
    });
  }, [navigate]);

  const updateProfile = async (userId: string, metadata: any) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        company_name: metadata.company_name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 bg-forest-light p-8 rounded-lg border border-mint/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-mint/80">Sign in to access your dashboard</p>
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
                },
              },
            },
            className: {
              container: 'auth-container',
              button: 'auth-button',
              input: 'auth-input',
            },
          }}
          providers={[]}
          options={{
            emailRedirectTo: `${window.location.origin}/dashboard`,
            additionalSignUpFields: [
              {
                key: 'company_name',
                label: 'Company/Practice Name',
                type: 'text',
                required: true,
              }
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Login;