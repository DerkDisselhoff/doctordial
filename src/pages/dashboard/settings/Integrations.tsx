import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Check } from "lucide-react";

const integrationCategories = [
  {
    title: "Zorginformatiesystemen",
    description: "Verbind je praktijkbeheersoftware",
    integrations: [
      { name: "Medicom", status: "connected", icon: "🏥" },
      { name: "Promedico-ASP", status: "available", icon: "🏥" },
      { name: "CGM Huisarts", status: "available", icon: "🏥" },
      { name: "Micro HIS", status: "available", icon: "🏥" },
    ],
  },
  {
    title: "Telefonie Providers",
    description: "Integreer je telefoniesysteem",
    integrations: [
      { name: "Voys", status: "connected", icon: "📞" },
      { name: "KPN", status: "available", icon: "📞" },
      { name: "Zoom", status: "available", icon: "📞" },
    ],
  },
  {
    title: "E-maildiensten",
    description: "Verbind je e-mailprovider",
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
        <h2 className="text-2xl font-bold text-gray-dark">Integraties</h2>
        <p className="text-gray">Verbind je praktijktools en -diensten</p>
      </div>

      <div className="space-y-6">
        {integrationCategories.map((category) => (
          <Card key={category.title} className="bg-white border-gray-muted shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-dark">{category.title}</CardTitle>
              <CardDescription className="text-gray">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-muted hover:border-mint/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium text-gray-dark">{integration.name}</p>
                        <Badge
                          variant="outline"
                          className={
                            integration.status === "connected"
                              ? "bg-mint/10 text-mint border-mint/20"
                              : "bg-gray-muted text-gray border-gray-muted"
                          }
                        >
                          {integration.status === "connected" ? (
                            <>
                              <Check className="w-3 h-3 mr-1" />
                              verbonden
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3 mr-1" />
                              beschikbaar
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant={integration.status === "connected" ? "outline" : "default"}
                      className={
                        integration.status === "connected"
                          ? "border-gray-muted hover:bg-gray-50 text-gray-dark"
                          : "cta-button"
                      }
                    >
                      {integration.status === "connected" ? "Configureren" : "Verbinden"}
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
