import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Clock, Bot, Calendar, User, MessageSquare, Settings, ArrowUp, ArrowDown } from "lucide-react";

const Assistant = () => {
  const { toast } = useToast();

  const handleSettingChange = () => {
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-semibold text-white">AI Assistant Settings</h1>
      
      {/* Flow Settings */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ArrowUp className="w-5 h-5 text-mint" />
            Flow Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-white font-medium">Trigger Conditions</Label>
            <RadioGroup defaultValue="direct" onValueChange={handleSettingChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="direct" />
                <Label htmlFor="direct" className="text-white/70">Answer calls directly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="queue" id="queue" />
                <Label htmlFor="queue" className="text-white/70">Answer when queue exceeds</Label>
                <Input 
                  type="number" 
                  className="w-20 ml-2 bg-forest border-mint/20" 
                  placeholder="2"
                  onChange={handleSettingChange}
                />
                <span className="text-white/70">callers</span>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Availability Settings */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-mint" />
            Availability Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white font-medium">Active Outside Work Hours</Label>
              <p className="text-white/70">Enable AI assistant during non-business hours</p>
            </div>
            <Switch className="bg-mint/20" onCheckedChange={handleSettingChange} />
          </div>
        </CardContent>
      </Card>

      {/* Identity Settings */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-mint" />
            Identity Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Assistant Name</Label>
              <Input 
                placeholder="Sarah" 
                className="bg-forest border-mint/20"
                onChange={handleSettingChange}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Practice Phone Number</Label>
              <Select onValueChange={handleSettingChange}>
                <SelectTrigger className="bg-forest border-mint/20 text-white">
                  <SelectValue placeholder="Select from active integrations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">+31 20 123 4567</SelectItem>
                  <SelectItem value="2">+31 20 987 6543</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Greeting Settings */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-mint" />
            Greeting Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white font-medium">Use Greeting Variations</Label>
              <Switch className="bg-mint/20" onCheckedChange={handleSettingChange} />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium">Default Greeting</Label>
              <Input 
                placeholder="Welcome to [Practice Name], this is Sarah, how may I help you?"
                className="bg-forest border-mint/20"
                onChange={handleSettingChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Rules */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-mint" />
            Appointment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-white font-medium">Allowed Appointment Types</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch className="bg-mint/20" onCheckedChange={handleSettingChange} />
                <Label className="text-white/70">Regular Consultations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch className="bg-mint/20" onCheckedChange={handleSettingChange} />
                <Label className="text-white/70">Vaccinations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch className="bg-mint/20" onCheckedChange={handleSettingChange} />
                <Label className="text-white/70">Follow-up Appointments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch className="bg-mint/20" onCheckedChange={handleSettingChange} />
                <Label className="text-white/70">Blood Tests</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forwarding Settings */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-mint" />
            Call Forwarding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-4">
              <Label className="text-white font-medium">Doctor's Assistant</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="Name"
                  className="bg-forest border-mint/20"
                  onChange={handleSettingChange}
                />
                <Input 
                  placeholder="Phone Number"
                  className="bg-forest border-mint/20"
                  onChange={handleSettingChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-white font-medium">General Practitioner</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="Name"
                  className="bg-forest border-mint/20"
                  onChange={handleSettingChange}
                />
                <Input 
                  placeholder="Phone Number"
                  className="bg-forest border-mint/20"
                  onChange={handleSettingChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Settings */}
      <Card className="bg-forest-light/50 border-mint/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-mint" />
            Voice Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white font-medium">Speaking Speed</Label>
              <Slider 
                defaultValue={[1]} 
                max={2} 
                step={0.1} 
                className="w-full"
                onValueChange={handleSettingChange}
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
                className="w-full"
                onValueChange={handleSettingChange}
              />
              <div className="flex justify-between text-white/70 text-sm">
                <span>Professional</span>
                <span>Very Friendly</span>
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-white font-medium">Voice Model</Label>
              <Select onValueChange={handleSettingChange}>
                <SelectTrigger className="bg-forest border-mint/20 text-white">
                  <SelectValue placeholder="Select a voice model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah (Professional Medical)</SelectItem>
                  <SelectItem value="emma">Emma (Warm and Caring)</SelectItem>
                  <SelectItem value="james">James (Calm and Clear)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistant;