import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRightIcon } from 'lucide-react';
import React, { useState } from 'react';

interface DetailedSelections {
  useCase: string;
  budget: string;
  performance: string;
  formFactor: string;
  cooling: string;
  storage: string;
  aesthetics: string;
  noiseLevel: number;
  futureProofing: string;
  monitor: string;
  customPrompt: string;
  softwareRequirements: string;
  virtualMachines: string;
  backupStrategy: string;
  networkNeeds: string;
}

interface DetailedBuildPromptProps {
  onSubmit: (selections: DetailedSelections) => void;
}

const DetailedBuildPrompt: React.FC<DetailedBuildPromptProps> = ({ onSubmit }) => {
  const [selections, setSelections] = useState<DetailedSelections>({
    useCase: "",
    budget: "",
    performance: "",
    formFactor: "",
    cooling: "",
    storage: "",
    aesthetics: "",
    noiseLevel: 50,
    futureProofing: "",
    monitor: "",
    customPrompt: "",
    softwareRequirements: "",
    virtualMachines: "",
    backupStrategy: "",
    networkNeeds: "",
  });

  const updateSelections = (key: keyof DetailedSelections, value: string | number) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Design Your Dream PC</CardTitle>
        <CardDescription>
          Help us understand your needs better to create the perfect custom build
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Primary Use Case - Enhanced with more professional options */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Primary Use Case</Label>
          <RadioGroup
            onValueChange={(value) => updateSelections('useCase', value)}
            className="grid grid-cols-2 gap-4"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="gaming" />
              <div className="space-y-1">
                <span className="font-medium">Gaming & Streaming</span>
                <p className="text-sm text-gray-500">High FPS gaming and live streaming</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="workstation" />
              <div className="space-y-1">
                <span className="font-medium">Professional Workstation</span>
                <p className="text-sm text-gray-500">CAD, 3D rendering, scientific computing</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="development" />
              <div className="space-y-1">
                <span className="font-medium">Software Development</span>
                <p className="text-sm text-gray-500">Programming, compilation, virtual machines</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="content" />
              <div className="space-y-1">
                <span className="font-medium">Content Creation</span>
                <p className="text-sm text-gray-500">Video editing, graphics design</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="data" />
              <div className="space-y-1">
                <span className="font-medium">Data Analysis</span>
                <p className="text-sm text-gray-500">Data processing, machine learning, analytics</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="general" />
              <div className="space-y-1">
                <span className="font-medium">General Purpose</span>
                <p className="text-sm text-gray-500">Office work, web browsing, light tasks</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Software Requirements - New Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Software Requirements</Label>
          <RadioGroup
            onValueChange={(value) => updateSelections('softwareRequirements', value)}
            className="grid grid-cols-2 gap-4"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="adobe" />
              <div className="space-y-1">
                <span className="font-medium">Adobe Creative Suite</span>
                <p className="text-sm text-gray-500">Photoshop, Premiere Pro, After Effects</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="cad" />
              <div className="space-y-1">
                <span className="font-medium">CAD Software</span>
                <p className="text-sm text-gray-500">AutoCAD, SolidWorks, Revit</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="development" />
              <div className="space-y-1">
                <span className="font-medium">Development Tools</span>
                <p className="text-sm text-gray-500">IDEs, compilers, Docker</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="ai" />
              <div className="space-y-1">
                <span className="font-medium">AI/ML Frameworks</span>
                <p className="text-sm text-gray-500">TensorFlow, PyTorch, CUDA</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Virtual Machine Usage - New Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Virtual Machine Requirements</Label>
          <RadioGroup
            onValueChange={(value) => updateSelections('virtualMachines', value)}
            className="grid grid-cols-2 gap-4"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="none" />
              <div className="space-y-1">
                <span className="font-medium">No VMs</span>
                <p className="text-sm text-gray-500">Not planning to use virtual machines</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="light" />
              <div className="space-y-1">
                <span className="font-medium">Light VM Usage</span>
                <p className="text-sm text-gray-500">1-2 VMs for testing</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="moderate" />
              <div className="space-y-1">
                <span className="font-medium">Moderate VM Usage</span>
                <p className="text-sm text-gray-500">Multiple VMs running simultaneously</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="heavy" />
              <div className="space-y-1">
                <span className="font-medium">Heavy VM Usage</span>
                <p className="text-sm text-gray-500">Complex VM environments, server simulation</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Storage Strategy - New Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Storage & Backup Strategy</Label>
          <RadioGroup
            onValueChange={(value) => updateSelections('backupStrategy', value)}
            className="grid grid-cols-2 gap-4"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="basic" />
              <div className="space-y-1">
                <span className="font-medium">Basic Storage</span>
                <p className="text-sm text-gray-500">Single drive setup</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="raid" />
              <div className="space-y-1">
                <span className="font-medium">RAID Configuration</span>
                <p className="text-sm text-gray-500">Redundant storage for data protection</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="nas" />
              <div className="space-y-1">
                <span className="font-medium">NAS Compatible</span>
                <p className="text-sm text-gray-500">Network storage integration</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="enterprise" />
              <div className="space-y-1">
                <span className="font-medium">Enterprise Storage</span>
                <p className="text-sm text-gray-500">High-performance multi-drive setup</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Network Requirements - New Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Network Requirements</Label>
          <RadioGroup
            onValueChange={(value) => updateSelections('networkNeeds', value)}
            className="grid grid-cols-2 gap-4"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="basic" />
              <div className="space-y-1">
                <span className="font-medium">Basic Connectivity</span>
                <p className="text-sm text-gray-500">Standard WiFi and Ethernet</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="high-speed" />
              <div className="space-y-1">
                <span className="font-medium">High-Speed Networking</span>
                <p className="text-sm text-gray-500">2.5GbE/10GbE support</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="wifi6" />
              <div className="space-y-1">
                <span className="font-medium">WiFi 6/6E Priority</span>
                <p className="text-sm text-gray-500">Latest wireless standards</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="redundant" />
              <div className="space-y-1">
                <span className="font-medium">Redundant Networking</span>
                <p className="text-sm text-gray-500">Multiple NICs, failover support</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Rest of the existing sections... */}

        {/* Enhanced Additional Requirements */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Additional Requirements</Label>
          <Textarea
            placeholder="Any specific requirements? (e.g., ECC memory needs, specific PCIe configurations, remote management capabilities, specific software compatibility...)"
            className="min-h-24"
            value={selections.customPrompt}
            onChange={(e) => updateSelections('customPrompt', e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          onClick={() => onSubmit(selections)}
        >
          Generate My Custom Build <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DetailedBuildPrompt;