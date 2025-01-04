import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { DollarSign, CreditCard, Receipt, Clock } from "lucide-react";

export default function BillingPage() {
  const invoices = [
    {
      id: "INV-001",
      date: "2024-03-01",
      amount: "€2,500",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "2024-02-01",
      amount: "€2,500",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "2024-01-01",
      amount: "€2,500",
      status: "Paid",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-forest">Billing</h1>
          <p className="text-gray-500 mt-2">Manage your subscription and billing information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mint/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-xl font-semibold text-forest">Enterprise</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mint/10 rounded-lg">
                <CreditCard className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="text-xl font-semibold text-forest">•••• 4242</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mint/10 rounded-lg">
                <Clock className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Payment</p>
                <p className="text-xl font-semibold text-forest">April 1, 2024</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-forest">Invoice History</h2>
            <Receipt className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div 
                key={invoice.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-forest">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-forest">{invoice.amount}</p>
                  <p className="text-sm text-green-500">{invoice.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}