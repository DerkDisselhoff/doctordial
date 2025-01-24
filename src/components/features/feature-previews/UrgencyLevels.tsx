import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { getUrgencyColor } from "@/components/calls/utils";
import { Clock, AlertTriangle, Stethoscope, Calendar, HelpCircle } from "lucide-react";

const urgencyLevels = [
  {
    level: "U1",
    description: "Life-threatening",
    response: "Immediate",
    example: "Severe chest pain, loss of consciousness",
    icon: AlertTriangle,
    color: "text-red-500"
  },
  {
    level: "U2",
    description: "Emergent",
    response: "Within 1 hour",
    example: "Severe pain, acute confusion",
    icon: Clock,
    color: "text-orange-500"
  },
  {
    level: "U3",
    description: "Urgent",
    response: "Same day",
    example: "Fever, worsening symptoms",
    icon: Stethoscope,
    color: "text-yellow-500"
  },
  {
    level: "U4",
    description: "Non-urgent",
    response: "Next day",
    example: "Chronic issues, medication refills",
    icon: Calendar,
    color: "text-blue-500"
  },
  {
    level: "U5",
    description: "Advice",
    response: "Self-care",
    example: "General health questions",
    icon: HelpCircle,
    color: "text-green-500"
  },
];

export function UrgencyLevels() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-muted hover:bg-gray-muted/5">
            <TableHead className="text-gray-dark font-semibold text-left w-24">Level</TableHead>
            <TableHead className="text-gray-dark font-semibold text-left">Description</TableHead>
            <TableHead className="text-gray-dark font-semibold text-left">Response Time</TableHead>
            <TableHead className="text-gray-dark font-semibold text-left">Example Cases</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urgencyLevels.map((level) => {
            const Icon = level.icon;
            return (
              <TableRow 
                key={level.level} 
                className="border-b border-gray-muted hover:bg-gray-muted/5 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(level.level)}`}>
                      {level.level}
                    </span>
                    <Icon className={`w-4 h-4 ${level.color}`} />
                  </div>
                </TableCell>
                <TableCell className="text-gray font-medium">
                  {level.description}
                </TableCell>
                <TableCell className="text-gray">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-light" />
                    {level.response}
                  </span>
                </TableCell>
                <TableCell className="text-gray text-left max-w-xs">
                  {level.example}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}