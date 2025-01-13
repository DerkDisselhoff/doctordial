import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const InvoicesSettings = () => {
  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-03-01",
      amount: "€99.00",
      status: "Paid",
    },
    {
      id: "INV-2024-002",
      date: "2024-02-01",
      amount: "€99.00",
      status: "Paid",
    },
    {
      id: "INV-2024-003",
      date: "2024-01-01",
      amount: "€99.00",
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-forest">Invoices</h2>
        <p className="text-gray-500">View and download your invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-forest">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50/50">
                <TableHead className="text-forest font-medium">Invoice</TableHead>
                <TableHead className="text-forest font-medium">Date</TableHead>
                <TableHead className="text-forest font-medium">Amount</TableHead>
                <TableHead className="text-forest font-medium">Status</TableHead>
                <TableHead className="text-forest font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-forest">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-forest hover:text-forest hover:bg-mint/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesSettings;