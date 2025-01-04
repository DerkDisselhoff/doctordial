import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Phone, Users } from "lucide-react";

export default function PracticesPage() {
  const practices = [
    {
      id: 1,
      name: "Central Medical Practice",
      location: "Amsterdam",
      practitioners: 12,
      callVolume: 450,
    },
    {
      id: 2,
      name: "Riverside Health Center",
      location: "Rotterdam",
      practitioners: 8,
      callVolume: 320,
    },
    {
      id: 3,
      name: "City Medical Group",
      location: "The Hague",
      practitioners: 15,
      callVolume: 580,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-forest">Medical Practices</h1>
          <p className="text-gray-500 mt-2">Manage and monitor connected medical practices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice) => (
            <Card key={practice.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-forest">{practice.name}</h3>
                  <Building2 className="text-mint h-6 w-6" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{practice.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{practice.practitioners} Practitioners</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{practice.callVolume} Calls/month</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}