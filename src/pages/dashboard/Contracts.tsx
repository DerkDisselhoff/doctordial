import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Search, Filter } from "lucide-react";

// Mock data for demonstration
const mockContracts = [
  {
    id: 1,
    client: "Central Medical Group",
    status: "active",
    practices: 12,
    startDate: "2024-01-15",
    endDate: "2025-01-14",
  },
  {
    id: 2,
    client: "West End Clinic",
    status: "pending",
    practices: 5,
    startDate: "2024-02-01",
    endDate: null,
  },
  {
    id: 3,
    client: "Harbor Health",
    status: "inactive",
    practices: 3,
    startDate: "2023-06-01",
    endDate: "2023-12-31",
  },
];

const Contracts = () => {
  const [filter, setFilter] = useState("all");

  const filteredContracts = mockContracts.filter((contract) => {
    if (filter === "active") return contract.status === "active";
    if (filter === "pending") return contract.status === "pending";
    if (filter === "inactive") return contract.status === "inactive";
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-forest">Contract Management</h2>
        <p className="text-gray-500">Manage and monitor client contracts</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contracts..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filter === "inactive" ? "default" : "outline"}
            onClick={() => setFilter("inactive")}
          >
            Inactive
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Practices</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium text-forest">{contract.client}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contract.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : contract.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {contract.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">{contract.practices}</TableCell>
                  <TableCell className="text-gray-600">{contract.startDate}</TableCell>
                  <TableCell className="text-gray-600">{contract.endDate || '-'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
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

export default Contracts;