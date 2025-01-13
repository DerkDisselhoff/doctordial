import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Euro } from "lucide-react";

const BillingSettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-forest">Billing Settings</h2>
        <p className="text-gray-500">Manage your billing information and subscription</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-mint/10 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-forest">Professional Plan</h3>
                <p className="text-sm text-gray-600">€99/month</p>
              </div>
              <Button variant="outline" className="border-mint text-forest hover:bg-mint/10">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <CreditCard className="h-6 w-6 text-mint" />
            <div>
              <p className="font-medium text-forest">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/24</p>
            </div>
          </div>
          <Button variant="outline" className="border-mint text-forest hover:bg-mint/10">
            Update Payment Method
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;