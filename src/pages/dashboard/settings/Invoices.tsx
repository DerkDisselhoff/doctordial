import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Receipt } from "lucide-react";

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
        <h2 className="text-2xl font-bold text-gray-dark">Invoices</h2>
        <p className="text-gray">View and download your invoices</p>
      </div>

      <Card className="bg-white border-gray-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-dark flex items-center gap-2">
            <Receipt className="w-5 h-5 text-mint" />
            Invoice History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50 border-gray-muted">
                <TableHead className="text-gray-dark font-medium">Invoice</TableHead>
                <TableHead className="text-gray-dark font-medium">Date</TableHead>
                <TableHead className="text-gray-dark font-medium">Amount</TableHead>
                <TableHead className="text-gray-dark font-medium">Status</TableHead>
                <TableHead className="text-gray-dark font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50 border-gray-muted">
                  <TableCell className="font-medium text-gray-dark">{invoice.id}</TableCell>
                  <TableCell className="text-gray">{invoice.date}</TableCell>
                  <TableCell className="text-gray">{invoice.amount}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-mint/10 text-mint">
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray hover:text-gray-dark hover:bg-gray-50"
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