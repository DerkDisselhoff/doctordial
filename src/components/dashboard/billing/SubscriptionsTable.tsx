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
        <TableRow className="border-mint/10">
          <TableHead className="text-mint">Company</TableHead>
          <TableHead className="text-mint">Package</TableHead>
          <TableHead className="text-mint">Status</TableHead>
          <TableHead className="text-mint">Start Date</TableHead>
          <TableHead className="text-mint text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => (
          <TableRow 
            key={subscription.id}
            className="border-mint/10 hover:bg-forest transition-colors"
          >
            <TableCell className="font-medium text-white">
              {subscription.company_name || 'Unknown Company'}
            </TableCell>
            <TableCell className="text-gray-300">{subscription.package_name}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                subscription.status === 'active' 
                  ? 'bg-green-500/20 text-green-400'
                  : subscription.status === 'pending'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {subscription.status}
              </span>
            </TableCell>
            <TableCell className="text-gray-300">
              {new Date(subscription.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/dashboard/clients/${subscription.profile_id}`)}
                className="text-mint hover:text-mint/80 hover:bg-mint/10"
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