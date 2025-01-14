import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Check } from "lucide-react";

const integrationCategories = [
  {
    title: "Healthcare Information Systems",
    description: "Connect your practice management software",
    integrations: [
      { name: "Medicom", status: "connected", icon: "🏥" },
      { name: "Promedico-ASP", status: "available", icon: "🏥" },
      { name: "CGM Huisarts", status: "available", icon: "🏥" },
      { name: "Micro HIS", status: "available", icon: "🏥" },
    ],
  },
  {
    title: "Call Providers",
    description: "Integrate your telephony system",
    integrations: [
      { name: "Voys", status: "connected", icon: "📞" },
      { name: "KPN", status: "available", icon: "📞" },
      { name: "Zoom", status: "available", icon: "📞" },
    ],
  },
  {
    title: "Email Services",
    description: "Connect your email provider",
    integrations: [
      { name: "Zorgmail", status: "connected", icon: "✉️" },
      { name: "Gmail", status: "available", icon: "✉️" },
      { name: "Outlook", status: "available", icon: "✉️" },
    ],
  },
];

export default function Integrations() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Integrations</h2>
        <p className="text-white/70">Connect your practice tools and services</p>
      </div>

      <div className="space-y-6">
        {integrationCategories.map((category) => (
          <Card key={category.title} className="bg-forest-light border-mint/10">
            <CardHeader>
              <CardTitle className="text-white">{category.title}</CardTitle>
              <CardDescription className="text-white/70">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-forest border border-mint/10 hover:border-mint/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium text-white">{integration.name}</p>
                        <Badge
                          variant="outline"
                          className={
                            integration.status === "connected"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-mint/10 text-mint border-mint/20"
                          }
                        >
                          {integration.status === "connected" ? (
                            <Check className="w-3 h-3 mr-1" />
                          ) : (
                            <Plus className="w-3 h-3 mr-1" />
                          )}
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant={integration.status === "connected" ? "outline" : "default"}
                      className={
                        integration.status === "connected"
                          ? "border-mint/20 text-mint hover:bg-mint/10"
                          : "bg-mint hover:bg-mint/90 text-forest"
                      }
                    >
                      {integration.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}