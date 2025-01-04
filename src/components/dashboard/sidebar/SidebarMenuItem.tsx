import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  title: string;
  path: string;
}

export function SidebarMenuItem({ icon: Icon, title, path }: SidebarMenuItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={cn(
        "w-full rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
        "hover:bg-mint/10 hover:text-white hover:translate-x-1",
        "flex items-center space-x-3 group",
        isActive ? 
          "bg-mint/15 text-white font-medium shadow-sm" : 
          "text-gray-400"
      )}
    >
      <Icon className={cn(
        "w-4.5 h-4.5 flex-shrink-0 transition-colors",
        isActive ? "text-mint" : "text-gray-400 group-hover:text-mint"
      )} />
      <span>{title}</span>
    </button>
  );
}