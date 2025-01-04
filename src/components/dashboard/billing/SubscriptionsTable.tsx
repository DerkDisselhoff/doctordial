import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Subscription {
  id: string;
  profile_id: string;
  package_name: string;
  status: string;
  created_at: string;
  company_name: string | null;
}

interface SubscriptionsTableProps {
  subscriptions: Subscription[];
}

export const SubscriptionsTable = ({ subscriptions }: SubscriptionsTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-200 hover:bg-gray-50/50">
          <TableHead className="text-forest font-medium">Company</TableHead>
          <TableHead className="text-forest font-medium">Package</TableHead>
          <TableHead className="text-forest font-medium">Status</TableHead>
          <TableHead className="text-forest font-medium">Start Date</TableHead>
          <TableHead className="text-forest font-medium text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => (
          <TableRow 
            key={subscription.id}
            className="border-gray-200 hover:bg-gray-50/50 transition-colors"
          >
            <TableCell className="font-medium text-forest">
              {subscription.company_name || 'Unknown Company'}
            </TableCell>
            <TableCell className="text-gray-600">{subscription.package_name}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                subscription.status === 'active' 
                  ? 'bg-green-100 text-green-700'
                  : subscription.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {subscription.status}
              </span>
            </TableCell>
            <TableCell className="text-gray-600">
              {new Date(subscription.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/dashboard/clients/${subscription.profile_id}`)}
                className="text-forest hover:text-forest hover:bg-mint/10"
              >
                <span className="mr-2">View Details</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};