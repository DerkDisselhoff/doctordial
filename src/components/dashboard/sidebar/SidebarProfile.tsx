import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCog, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface SidebarProfileProps {
  userProfile: {
    username?: string | null;
    avatar_url?: string | null;
    company_name?: string | null;
  } | null;
  userRole: 'admin' | 'client' | null;
}

export function SidebarProfile({ userProfile, userRole }: SidebarProfileProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="mt-auto border-t border-mint/10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start p-4 hover:bg-mint/5 group">
            <Avatar className="h-9 w-9 mr-3 ring-2 ring-mint/20 transition-all group-hover:ring-mint/40">
              <AvatarImage src={userProfile?.avatar_url || ''} />
              <AvatarFallback className="bg-mint/10 text-forest font-medium">
                {userProfile?.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium text-white">
                {userProfile?.username || 'User'}
              </span>
              <span className="text-xs text-gray-400">
                {userProfile?.company_name || (userRole === 'admin' ? 'Administrator' : 'Client')}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="menu-base w-56 border border-mint/10" 
          align="end" 
          side="right"
        >
          <DropdownMenuLabel className="px-3 py-2 text-sm text-white/90">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-mint/10" />
          <DropdownMenuItem 
            className="menu-item" 
            onClick={() => navigate('/dashboard/settings')}
          >
            <UserCog className="menu-icon" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          {userRole === 'admin' && (
            <DropdownMenuItem 
              className="menu-item" 
              onClick={() => navigate('/dashboard/clients')}
            >
              <Users className="menu-icon" />
              <span>Manage Clients</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-mint/10" />
          <DropdownMenuItem 
            className="menu-item text-red-400 hover:text-red-300" 
            onClick={handleLogout}
          >
            <LogOut className="menu-icon text-red-400 group-hover:text-red-300" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}