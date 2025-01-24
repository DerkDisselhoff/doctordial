import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Wifi, WifiOff } from "lucide-react";

interface LiveStatusCardProps {
  isLive: boolean;
  onStatusChange: (value: boolean) => void;
}

export const LiveStatusCard = ({ isLive, onStatusChange }: LiveStatusCardProps) => {
  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <CardTitle className="text-text-primary flex items-center gap-2">
          {isLive ? (
            <Wifi className="w-5 h-5 text-primary" />
          ) : (
            <WifiOff className="w-5 h-5 text-text-muted" />
          )}
          Assistant Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">
              {isLive ? 'Live' : 'Offline'}
            </p>
            <p className="text-sm text-text-secondary">
              {isLive 
                ? 'Your AI assistant is actively handling calls' 
                : 'Your AI assistant is currently not accepting calls'
              }
            </p>
          </div>
          <Switch
            checked={isLive}
            onCheckedChange={onStatusChange}
            className="bg-surface-input data-[state=checked]:bg-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
};