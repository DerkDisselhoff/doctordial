import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro, Users, Building2 } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "€24,500",
    description: "Monthly recurring revenue",
    icon: Euro,
  },
  {
    title: "Active Clients",
    value: "32",
    description: "Subscribed practices",
    icon: Users,
  },
  {
    title: "Practices",
    value: "45",
    description: "Total locations",
    icon: Building2,
  },
];

export const BillingStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-forest-light border-mint/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-mint text-lg font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-5 w-5 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-sm text-gray-400 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};