import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface MachineConfig {
  id: number;
  series: string;
  vcpus: string;
  memory: string;
  description: string
  score: number;
}
const Configuration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("-");
  const [selectedZone, setSelectedZone] = useState("-");
  const [selectedConfig, setSelectedConfig] = useState<number | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  const machineConfigs: MachineConfig[] = [
    {
      id: 1,
      score: 0,
      series: "C3D",
      description: "Consistently high performance",
      vcpus: "4 - 360",
      memory: "8 - 2,880 GB",
    },
    {
      id: 2,
      score: 2,
      series: "N2D",
      description: "Balanced price & performance",
      vcpus: "2 - 224",
      memory: "2 - 896 GB",
    },
    {
      id: 3,
      score: 5,
      series: "E2",
      description: "Low cost, day-to-day computing",
      vcpus: "0.25 - 32",
      memory: "1 - 128 GB",
    },
    {
      id: 4,
      score: 1,
      series: "C4A",
      description: "Arm-based consistently high performance",
      vcpus: "1 - 72",
      memory: "2 - 576 GB",
    },
    {
      id: 5,
      score: 2,
      series: "N4",
      description: "Flexible & cost-optimized",
      vcpus: "2 - 80",
      memory: "4 - 640 GB",
    },
    {
      id: 6,
      score: 5,
      series: "T2D",
      description: "Scale-out workloads",
      vcpus: "1 - 60",
      memory: "4 - 240 GB",
    },
  ];

  const regionScoreMap: Record<string, number> = {
    "us-east1": 0, // High CO₂
    "europe-north1": 2, // Low CO₂
    "asia-northeast1": 1, // Neutral
    "us-west1": 2, // Low CO₂
    "australia-southeast1": 0, // High CO₂
    "europe-west1": 1 // Neutral
  };

  const regionDescriptions: Record<string, React.ReactNode> = {
    "us-east1": "– High CO₂",
    "europe-north1": "– Low CO₂",
    "asia-northeast1": "",
    "us-west1": "– Low CO₂",
    "australia-southeast1": "– High CO₂",
    "europe-west1": "",
  };

  const handleConfigSelect = (config: MachineConfig) => {
    setSelectedConfig(config.id);

    toast({
      title: "Configuration Updated",
      description: `Selected ${config.series}`,
    });
  };

  useEffect(() => {
    if (selectedConfig !== null) {
      const config = machineConfigs.find(cfg => cfg.id === selectedConfig);
      if (config) {
        const regionScore = regionScoreMap[selectedRegion] ?? 0;
        const rawScore = config.score + regionScore;
        const finalScore = Math.min(Math.max(rawScore, 0), 5);
        setCurrentScore(finalScore);
      }
    }
  }, [selectedConfig, selectedRegion]);

  const handleCreate = () => {
    if (!selectedConfig) {
      toast({
        title: "No Configuration Selected",
        description: "Please select a machine configuration first.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Instance Created Successfully!",
      description: `VM instance created with score: ${currentScore}`,
    });

    navigate(`/scoring?score=${currentScore}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Machine Configuration</h1>
          <p className="text-muted-foreground">Configure your virtual machine instance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="machine" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="machine">1. Machine Configuration</TabsTrigger>
                <TabsTrigger value="storage" disabled>2. OS & Storage</TabsTrigger>
                <TabsTrigger value="networking" disabled>3. Networking</TabsTrigger>
                <TabsTrigger value="advanced" disabled>4. Advanced</TabsTrigger>
              </TabsList>

<TabsContent value="machine" className="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle>Region & Zone</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Region</Label>
          <RadioGroup value={selectedRegion} onValueChange={setSelectedRegion}>
            {Object.entries(regionScoreMap).map(([region, score]) => (
              <div key={region} className="group flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value={region} id={region} />
                <Label htmlFor={region} className="flex items-center space-x-1 cursor-pointer">
                  <span>{region} {regionDescriptions[region]}</span>
                  <span className="hidden group-hover:inline">{"🍃".repeat(score)}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Zone</Label>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger>
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-a">1-a</SelectItem>
              <SelectItem value="1-b">1-b</SelectItem>
              <SelectItem value="1-c">1-c</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Size & Resources</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Series</th>
              <th className="text-left p-2">vCPUs</th>
              <th className="text-left p-2">Memory</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {machineConfigs.map((config) => (
              <tr 
                key={config.id}
                className={`group border-b hover:bg-muted/50 cursor-pointer ${
                  selectedConfig === config.id ? "bg-primary/10" : ""
                }`}
                onClick={() => handleConfigSelect(config)}
              >
                <td className="p-2">
                  <Badge variant="outline">{config.series}</Badge>
                </td>
                <td className="p-2">{config.vcpus}</td>
                <td className="p-2">{config.memory}</td>
                <td className="p-2">{config.description}</td>
                <td className="p-2">
                  <RadioGroup value={selectedConfig?.toString() || ""}>
                    <RadioGroupItem 
                      value={config.id.toString()} 
                      id={`config-${config.id}`}
                      checked={selectedConfig === config.id}
                    />
                  </RadioGroup>
                </td>
                <td className="p-2">
                  <span className="inline-block min-w-[60px] text-green-600 group-hover:visible invisible">
                    {"🍃".repeat(config.score)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</TabsContent>


              <TabsContent value="storage">
                <Card>
                  <CardHeader>
                    <CardTitle>Operating System & Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">OS and storage configuration options will be available here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="networking">
                <Card>
                  <CardHeader>
                    <CardTitle>Networking Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Network settings and firewall rules will be configured here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Advanced configuration options will be available here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Region:</Label>
                  <p className="text-sm text-muted-foreground">{selectedRegion}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Zone:</Label>
                  <p className="text-sm text-muted-foreground">{selectedZone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Current Score:</Label>
                    {"🍃".repeat(currentScore)}
                </div>
                {selectedConfig && (
                  <div className="pt-4 border-t">
                    <Label className="text-sm font-medium">Selected Configuration:</Label>
                    {machineConfigs
                      .filter(config => config.id === selectedConfig)
                      .map(config => (
                        <div key={config.id} className="mt-2 p-2 bg-muted rounded">
                          <p className="text-sm">{config.series} series</p>
                          <p className="text-sm">{config.vcpus} vCPUs, {config.memory} RAM</p>
                        </div>
                      ))
                    }
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreate} className="flex-1">
                    Create
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
<div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-4 mb-4">
  📢 We’d love your feedback! Please take a moment to fill out our short survey 👉{" "}
  <a
    href="https://forms.gle/Xr3TmDtoyqLGSTrc7"
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-blue-700 hover:text-blue-900 font-medium"
  >
    Fill Survey
  </a>
  <br />
  <br />
  🙋‍♂️ If you’d like to participate in a short interview to answer the questions, please contact us we’d love to talk with you!
</div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Configuration;