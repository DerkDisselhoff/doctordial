import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("bg-surface border-surface-input", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-secondary">{title}</p>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            {trend && (
              <p className={cn(
                "text-xs",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <div className="p-3 bg-surface-secondary rounded-full">
            <Icon className="w-5 h-5 text-text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}