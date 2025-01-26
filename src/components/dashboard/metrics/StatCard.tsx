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
      className="dashboard-card border-gray-muted p-4 cursor-pointer transition-all duration-300
                hover:border-blue-dark/30 hover:shadow-[0_0_15px_rgba(37,99,235,0.1)]
                relative overflow-hidden group"
      onClick={() => navigate(navigateTo)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-dark/0 via-blue-dark/5 to-blue-dark/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 pointer-events-none" 
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-gray">{label}</p>
          <h4 className="text-2xl font-bold text-gray-dark mt-1">{value}</h4>
          {subtext && <p className="text-xs text-gray-light mt-1">{subtext}</p>}
        </div>
        <div className="p-2 bg-mint/10 rounded-lg">
          <Icon className="w-5 h-5 text-mint" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
};