import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
  LayoutDashboard,
  Phone,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarProfile } from "./sidebar/SidebarProfile";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Profile } from "@/integrations/supabase/types/tables/profiles";

interface AdminSidebarProps {
  userProfile: Profile | null;
  userRole: 'admin' | 'client' | null;
}

export function AdminSidebar({ userProfile, userRole }: AdminSidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="bg-forest border-r border-mint/10">
      <div className="flex h-14 items-center border-b border-mint/10 px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">DoctorDial</span>
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/dashboard">
                  <SidebarMenuButton
                    className={cn(
                      isActive("/dashboard") &&
                        "bg-mint/10 text-mint hover:bg-mint/20"
                    )}
                    asChild
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link to="/dashboard/calls">
                  <SidebarMenuButton
                    className={cn(
                      isActive("/dashboard/calls") &&
                        "bg-mint/10 text-mint hover:bg-mint/20"
                    )}
                    asChild
                  >
                    <Phone className="h-4 w-4" />
                    <span>Calls</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link to="/dashboard/appointments">
                  <SidebarMenuButton
                    className={cn(
                      isActive("/dashboard/appointments") &&
                        "bg-mint/10 text-mint hover:bg-mint/20"
                    )}
                    asChild
                  >
                    <Clock className="h-4 w-4" />
                    <span>Appointments</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link to="/dashboard/calendar">
                  <SidebarMenuButton
                    className={cn(
                      isActive("/dashboard/calendar") &&
                        "bg-mint/10 text-mint hover:bg-mint/20"
                    )}
                    asChild
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              {userRole === 'admin' && (
                <>
                  <SidebarMenuItem>
                    <Link to="/dashboard/clients">
                      <SidebarMenuButton
                        className={cn(
                          isActive("/dashboard/clients") &&
                            "bg-mint/10 text-mint hover:bg-mint/20"
                        )}
                        asChild
                      >
                        <Users className="h-4 w-4" />
                        <span>Clients</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link to="/dashboard/reports">
                      <SidebarMenuButton
                        className={cn(
                          isActive("/dashboard/reports") &&
                            "bg-mint/10 text-mint hover:bg-mint/20"
                        )}
                        asChild
                      >
                        <FileText className="h-4 w-4" />
                        <span>Reports</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link to="/dashboard/billing">
                      <SidebarMenuButton
                        className={cn(
                          isActive("/dashboard/billing") &&
                            "bg-mint/10 text-mint hover:bg-mint/20"
                        )}
                        asChild
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>Billing</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/dashboard/assistant">
                  <SidebarMenuButton
                    className={cn(
                      isActive("/dashboard/assistant") &&
                        "bg-mint/10 text-mint hover:bg-mint/20"
                    )}
                    asChild
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>AI Assistant</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link to="/dashboard/settings">
                  <SidebarMenuButton
                    className={cn(
                      isActive("/dashboard/settings") &&
                        "bg-mint/10 text-mint hover:bg-mint/20"
                    )}
                    asChild
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarProfile userProfile={userProfile} userRole={userRole} />
    </Sidebar>
  );
}