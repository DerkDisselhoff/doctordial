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
    <Card className="bg-forest-light/50 border-mint/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-mint" />
          <CardTitle className="text-white">Urgency Level Forwarding</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {settings.map((setting) => (
          <div key={setting.urgency_level} className="grid gap-2 p-2 rounded-lg bg-forest-dark/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 min-w-[80px]">
                <span className={`inline-flex px-2 py-1 rounded-md text-sm font-medium border ${getUrgencyColor(setting.urgency_level)}`}>
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
                  <SelectTrigger className="bg-forest border-mint/20 hover:bg-forest-light/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-forest border-mint/20">
                    <SelectItem 
                      value="call_112" 
                      className="hover:bg-mint/10 active:bg-mint/20 transition-colors cursor-pointer"
                    >
                      Advice to call 112 directly
                    </SelectItem>
                    <SelectItem 
                      value="forward_to_assistant" 
                      className="hover:bg-mint/10 active:bg-mint/20 transition-colors cursor-pointer"
                    >
                      Forward to Doctor's Assistant
                    </SelectItem>
                    <SelectItem 
                      value="provide_selfcare" 
                      className="hover:bg-mint/10 active:bg-mint/20 transition-colors cursor-pointer"
                    >
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
                    className="bg-forest border-mint/20"
                  />
                )}

                {setting.forward_step === 'provide_selfcare' && (
                  <Select
                    value={setting.advice_type || 'simple'}
                    onValueChange={(value: AdviceType) => 
                      onSettingChange(setting.urgency_level, { advice_type: value })
                    }
                  >
                    <SelectTrigger className="bg-forest border-mint/20 hover:bg-forest-light/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-forest border-mint/20">
                      <SelectItem 
                        value="simple"
                        className="hover:bg-mint/10 active:bg-mint/20 transition-colors cursor-pointer"
                      >
                        Simple short advice
                      </SelectItem>
                      <SelectItem 
                        value="extensive"
                        className="hover:bg-mint/10 active:bg-mint/20 transition-colors cursor-pointer"
                      >
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