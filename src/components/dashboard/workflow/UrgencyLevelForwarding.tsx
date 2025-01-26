import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GitBranch, ArrowRight } from "lucide-react";
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
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-blue-dark" />
          <CardTitle className="text-gray-dark text-lg">Urgency Level Forwarding</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {settings.map((setting) => (
          <div 
            key={setting.urgency_level} 
            className="p-2.5 rounded-lg border border-gray-muted/20 bg-gray-muted/5 hover:bg-gray-muted/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center min-w-[45px]">
                <span 
                  className={`inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium rounded-md ${
                    getUrgencyColor(setting.urgency_level)
                  }`}
                >
                  {setting.urgency_level}
                </span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-gray-light flex-shrink-0" />
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <Select
                  value={setting.forward_step}
                  onValueChange={(value: ForwardStep) => 
                    onSettingChange(setting.urgency_level, { forward_step: value })
                  }
                >
                  <SelectTrigger className="bg-white border-gray-muted hover:border-blue-dark focus:border-blue-dark focus:ring-1 focus:ring-blue-dark h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-muted">
                    <SelectItem value="call_112">
                      Advice to call 112 directly
                    </SelectItem>
                    <SelectItem value="forward_to_assistant">
                      Forward to Doctor's Assistant
                    </SelectItem>
                    <SelectItem value="provide_selfcare">
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
                    className="bg-white border-gray-muted hover:border-blue-dark focus:border-blue-dark focus:ring-1 focus:ring-blue-dark h-9"
                  />
                )}

                {setting.forward_step === 'provide_selfcare' && (
                  <Select
                    value={setting.advice_type || 'simple'}
                    onValueChange={(value: AdviceType) => 
                      onSettingChange(setting.urgency_level, { advice_type: value })
                    }
                  >
                    <SelectTrigger className="bg-white border-gray-muted hover:border-blue-dark focus:border-blue-dark focus:ring-1 focus:ring-blue-dark h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-muted">
                      <SelectItem value="simple">
                        Simple short advice
                      </SelectItem>
                      <SelectItem value="extensive">
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