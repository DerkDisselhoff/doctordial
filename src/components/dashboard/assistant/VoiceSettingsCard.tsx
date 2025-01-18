import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface VoiceSettingsCardProps {
  onSettingChange: () => void;
}

export const VoiceSettingsCard = ({ onSettingChange }: VoiceSettingsCardProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-white font-medium">Speaking Speed</Label>
        <Slider 
          defaultValue={[1]} 
          max={2} 
          step={0.1}
          onValueChange={onSettingChange}
          className="w-full [&>.relative]:bg-mint/20 [&>.relative]:h-2 [&>.relative]:rounded-full 
                    [&_[role=slider]]:bg-mint [&_[role=slider]]:border-mint [&_[role=slider]]:shadow-mint/20 
                    [&_[role=slider]]:hover:bg-mint-light [&_[role=slider]]:focus:ring-mint/50 
                    [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-full
                    [&>.relative>[data-orientation=horizontal]]:bg-mint"
        />
        <div className="flex justify-between text-white/70 text-sm">
          <span>Slower</span>
          <span>Faster</span>
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-white font-medium">Friendliness Level</Label>
        <Slider 
          defaultValue={[0.7]} 
          max={1} 
          step={0.1}
          onValueChange={onSettingChange}
          className="w-full [&>.relative]:bg-mint/20 [&>.relative]:h-2 [&>.relative]:rounded-full 
                    [&_[role=slider]]:bg-mint [&_[role=slider]]:border-mint [&_[role=slider]]:shadow-mint/20 
                    [&_[role=slider]]:hover:bg-mint-light [&_[role=slider]]:focus:ring-mint/50 
                    [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-full
                    [&>.relative>[data-orientation=horizontal]]:bg-mint"
        />
        <div className="flex justify-between text-white/70 text-sm">
          <span>Professional</span>
          <span>Very Friendly</span>
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-white font-medium">Voice Model</Label>
        <Select onValueChange={onSettingChange}>
          <SelectTrigger className="dropdown-trigger">
            <SelectValue placeholder="Select a voice model" />
          </SelectTrigger>
          <SelectContent className="dropdown-content">
            <SelectItem value="sarah" className="dropdown-item">
              Sarah (Professional Medical)
            </SelectItem>
            <SelectItem value="emma" className="dropdown-item">
              Emma (Warm and Caring)
            </SelectItem>
            <SelectItem value="james" className="dropdown-item">
              James (Calm and Clear)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};