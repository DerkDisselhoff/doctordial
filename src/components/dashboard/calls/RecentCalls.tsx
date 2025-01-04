import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VapiCallsList from "@/components/VapiCallsList";

export function RecentCalls() {
  return (
    <Card className="bg-white shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-forest">Recent Calls</CardTitle>
      </CardHeader>
      <CardContent>
        <VapiCallsList />
      </CardContent>
    </Card>
  );
}