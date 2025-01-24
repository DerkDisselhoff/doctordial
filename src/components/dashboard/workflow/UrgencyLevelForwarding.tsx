import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GitBranch } from "lucide-react";
import { getUrgencyColor } from "@/utils/urgencyUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ForwardStep = "call_112" | "forward_to_assistant" | "provide_selfcare";
type AdviceType = "simple" | "extensive";

interface UrgencySetting {
  urgency_level: string;
  forward_step: ForwardStep;
  assistant_phone?: string;
  advice_type?: AdviceType;
}

interface Props {
  settings: UrgencySetting[];
  onSettingChange: (level: string, setting: Partial<UrgencySetting>) => void;
}

export function UrgencyLevelForwarding({ settings, onSettingChange }: Props) {
  return (
    <Card className="bg-white border border-gray-muted shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-blue-dark" />
          <CardTitle className="text-gray-dark">Urgency Level Forwarding</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.urgency_level} className="p-2 rounded-lg bg-gray-muted/5 border border-gray-muted/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 min-w-[80px]">
                <span className={`status-badge ${getUrgencyColor(setting.urgency_level)}`}>
                  {setting.urgency_level}
                </span>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select
                  value={setting.forward_step}
                  onValueChange={(value: ForwardStep) => 
                    onSettingChange(setting.urgency_level, { forward_step: value })
                  }
                >
                  <SelectTrigger className="bg-white border-gray-muted hover:bg-gray-muted/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-muted">
                    <SelectItem value="call_112" className="text-gray hover:bg-gray-muted/10">
                      Advice to call 112 directly
                    </SelectItem>
                    <SelectItem value="forward_to_assistant" className="text-gray hover:bg-gray-muted/10">
                      Forward to Doctor's Assistant
                    </SelectItem>
                    <SelectItem value="provide_selfcare" className="text-gray hover:bg-gray-muted/10">
                      Provide selfcare advice
                    </SelectItem>
                  </SelectContent>
                </Select>

                {setting.forward_step === 'forward_to_assistant' && (
                  <Input
                    placeholder="Assistant's phone number"
                    value={setting.assistant_phone || ''}
                    onChange={(e) => onSettingChange(setting.urgency_level, { 
                      assistant_phone: e.target.value 
                    })}
                    className="bg-white border-gray-muted"
                  />
                )}

                {setting.forward_step === 'provide_selfcare' && (
                  <Select
                    value={setting.advice_type || 'simple'}
                    onValueChange={(value: AdviceType) => 
                      onSettingChange(setting.urgency_level, { advice_type: value })
                    }
                  >
                    <SelectTrigger className="bg-white border-gray-muted hover:bg-gray-muted/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-muted">
                      <SelectItem value="simple" className="text-gray hover:bg-gray-muted/10">
                        Simple short advice
                      </SelectItem>
                      <SelectItem value="extensive" className="text-gray hover:bg-gray-muted/10">
                        Extensive advice
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
