import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MetricsCardProps } from "@/types/metrics";

export const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subtext,
  navigateTo 
}: MetricsCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="bg-surface border-border p-4 cursor-pointer transition-all duration-300
                hover:border-primary/30 hover:shadow-lg
                relative overflow-hidden group"
      onClick={() => navigate(navigateTo)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 pointer-events-none" 
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-text-secondary text-sm">{label}</p>
          <h4 className="text-2xl font-bold text-text-primary mt-1">{value}</h4>
          {subtext && <p className="text-xs text-text-muted mt-1">{subtext}</p>}
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
};