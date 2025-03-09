
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope } from "lucide-react";

export function ResearchResultsList() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-muted">
        <CardTitle className="text-gray-dark flex items-center">
          <Microscope className="mr-2 h-5 w-5 text-mint" />
          Research Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Microscope className="h-16 w-16 text-gray/30" />
          <h3 className="text-xl font-medium text-gray-dark">Coming Soon</h3>
          <p className="text-gray max-w-md">
            The Research Results feature is currently in development and will be available soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
