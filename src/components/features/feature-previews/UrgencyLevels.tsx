import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const urgencyLevels = [
  {
    level: "U1",
    description: "Life-threatening",
    response: "Immediate",
    example: "Severe chest pain, loss of consciousness",
  },
  {
    level: "U2",
    description: "Emergent",
    response: "Within 1 hour",
    example: "Severe pain, acute confusion",
  },
  {
    level: "U3",
    description: "Urgent",
    response: "Same day",
    example: "Fever, worsening symptoms",
  },
  {
    level: "U4",
    description: "Non-urgent",
    response: "Next day",
    example: "Chronic issues, medication refills",
  },
  {
    level: "U5",
    description: "Advice",
    response: "Self-care",
    example: "General health questions",
  },
];

export function UrgencyLevels() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-blue-light border-gray-muted">
            <TableHead className="text-gray-dark font-semibold">Level</TableHead>
            <TableHead className="text-gray-dark font-semibold">Description</TableHead>
            <TableHead className="text-gray-dark font-semibold">Response Time</TableHead>
            <TableHead className="text-gray-dark font-semibold">Example Cases</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urgencyLevels.map((level) => (
            <TableRow key={level.level} className="hover:bg-blue-light border-gray-muted">
              <TableCell className="font-medium text-gray-dark">{level.level}</TableCell>
              <TableCell className="text-gray">{level.description}</TableCell>
              <TableCell className="text-gray">{level.response}</TableCell>
              <TableCell className="text-gray">{level.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}