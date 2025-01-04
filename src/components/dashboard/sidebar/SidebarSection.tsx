import { cn } from "@/lib/utils";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MenuItemType {
  title: string;
  icon: LucideIcon;
  path: string;
}

interface SidebarSectionProps {
  title?: string;
  items: MenuItemType[];
  className?: string;
}

export function SidebarSection({ title, items, className }: SidebarSectionProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {title && (
        <div className="px-3 mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {title}
          </p>
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}