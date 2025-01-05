import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const Assistant = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Assistant</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Assistant Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Assistant Profile</CardTitle>
            <CardDescription>Information about your AI assistant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Identity</h3>
              <p className="text-sm text-muted-foreground">Sarah - Professional Female Voice</p>
              <p className="text-sm text-muted-foreground mt-1">Voice ID: EXAVITQu4vr4xnSDxMaL</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Personality Traits</h3>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                <li>Professional and empathetic</li>
                <li>Clear and concise communication</li>
                <li>Patient-focused approach</li>
                <li>Multilingual capabilities (Dutch & English)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Assistant Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your assistant's behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Identity Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Verify patient name and date of birth
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Urgency Assessment</Label>
                <p className="text-sm text-muted-foreground">
                  Evaluate call urgency using U1-U5 scale
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Call Recording</Label>
                <p className="text-sm text-muted-foreground">
                  Record calls for quality assurance
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Medical Knowledge Base */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Knowledge Base</CardTitle>
            <CardDescription>Training data and guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Medical Guidelines</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>NHG Standards (Dutch College of General Practitioners)</li>
                  <li>Triage protocols (NTS - Netherlands Triage Standard)</li>
                  <li>Emergency care guidelines</li>
                  <li>Common conditions and symptoms database</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Updated Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  Last medical database update: April 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Interactions */}
        <Card>
          <CardHeader>
            <CardTitle>Example Interactions</CardTitle>
            <CardDescription>Sample conversation flows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Identity Verification</h3>
                <div className="bg-secondary/50 p-3 rounded-md text-sm">
                  <p className="text-muted-foreground italic">"Welcome to Dr. Smith's practice. Could you please confirm your name and date of birth?"</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Urgency Assessment</h3>
                <div className="bg-secondary/50 p-3 rounded-md text-sm">
                  <p className="text-muted-foreground italic">"I understand you're experiencing chest pain. Could you tell me when this started and if it's constant or comes and goes?"</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Appointment Scheduling</h3>
                <div className="bg-secondary/50 p-3 rounded-md text-sm">
                  <p className="text-muted-foreground italic">"Based on your symptoms, I'll schedule you for an appointment tomorrow morning at 9:00. Does that work for you?"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assistant;