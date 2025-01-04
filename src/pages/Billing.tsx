import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, CreditCard, Receipt } from "lucide-react";

const mockSubscriptions = [
  {
    id: 1,
    client: "Central Medical Group",
    package: "Enterprise",
    status: "active",
    amount: "€2,499",
    nextBilling: "2024-03-01",
  },
  {
    id: 2,
    client: "West End Clinic",
    package: "Professional",
    status: "overdue",
    amount: "€999",
    nextBilling: "2024-02-15",
  },
];

const mockInvoices = [
  {
    id: "INV-2024-001",
    client: "Central Medical Group",
    amount: "€2,499",
    status: "paid",
    date: "2024-02-01",
  },
  {
    id: "INV-2024-002",
    client: "West End Clinic",
    amount: "€999",
    status: "pending",
    date: "2024-02-15",
  },
];

const Billing = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-forest">Billing & Subscriptions</h2>
        <p className="text-gray-500">Monitor client subscriptions and billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-mint/10">
                <DollarSign className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <h3 className="text-2xl font-bold text-forest">€12,499</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-mint/10">
                <CreditCard className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Subscriptions</p>
                <h3 className="text-2xl font-bold text-forest">24</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-mint/10">
                <Receipt className="h-6 w-6 text-mint" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Invoices</p>
                <h3 className="text-2xl font-bold text-forest">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-forest">Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50/50">
                <TableHead className="text-forest font-medium">Client</TableHead>
                <TableHead className="text-forest font-medium">Package</TableHead>
                <TableHead className="text-forest font-medium">Status</TableHead>
                <TableHead className="text-forest font-medium">Amount</TableHead>
                <TableHead className="text-forest font-medium">Next Billing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubscriptions.map((sub) => (
                <TableRow key={sub.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-forest">{sub.client}</TableCell>
                  <TableCell>{sub.package}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      sub.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {sub.status}
                    </span>
                  </TableCell>
                  <TableCell>{sub.amount}</TableCell>
                  <TableCell>{sub.nextBilling}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-forest">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50/50">
                <TableHead className="text-forest font-medium">Invoice ID</TableHead>
                <TableHead className="text-forest font-medium">Client</TableHead>
                <TableHead className="text-forest font-medium">Amount</TableHead>
                <TableHead className="text-forest font-medium">Status</TableHead>
                <TableHead className="text-forest font-medium">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-forest">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;