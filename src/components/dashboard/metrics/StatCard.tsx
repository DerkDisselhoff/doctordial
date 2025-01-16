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
      className="bg-forest-light/50 border-mint/10 p-4 cursor-pointer transition-all duration-300
                hover:border-mint/30 hover:shadow-[0_0_15px_rgba(100,255,218,0.1)]
                relative overflow-hidden group"
      onClick={() => navigate(navigateTo)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-mint/0 via-mint/5 to-mint/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 pointer-events-none" 
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-white/70 text-sm">{label}</p>
          <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
          {subtext && <p className="text-xs text-white/50 mt-1">{subtext}</p>}
        </div>
        <div className="p-2 bg-mint/10 rounded-lg">
          <Icon className="w-5 h-5 text-mint" />
        </div>
      </div>
    </Card>
  );
};