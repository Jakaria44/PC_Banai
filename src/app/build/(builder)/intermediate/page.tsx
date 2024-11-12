import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { IntermediateSelections } from '@/types';
import { ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

interface IntermediatePromptProps {
  onSubmit: (selections: IntermediateSelections) => void;
}

const IntermediatePrompt: React.FC<IntermediatePromptProps> = ({ onSubmit }) => {
  const [selections, setSelections] = useState<IntermediateSelections>({
    useCase: '',
    budget: '',
    preferences: '',
    customPrompt: ''
  });

  return (
    <Card className="w-full max-w-3xl mx-auto">
    <CardHeader>
      <CardTitle>Customize Your Build</CardTitle>
      <CardDescription>
        Let&apos;s get specific about your requirements to create the perfect build
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-4">
        <Label>Primary Use Case</Label>
        <RadioGroup
          onValueChange={(value) => setSelections({...selections, useCase: value})}
          className="grid grid-cols-2 gap-4"
        >
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="gaming" />
            <span>Gaming & Streaming</span>
          </Label>
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="workstation" />
            <span>Professional Workstation</span>
          </Label>
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="content" />
            <span>Content Creation</span>
          </Label>
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="general" />
            <span>General Purpose</span>
          </Label>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Budget Range</Label>
        <RadioGroup
          onValueChange={(value) => setSelections({...selections, budget: value})}
          className="grid grid-cols-2 gap-4"
        >
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="budget" />
            <span>$500 - $1000</span>
          </Label>
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="mid" />
            <span>$1000 - $1500</span>
          </Label>
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="high" />
            <span>$1500 - $2000</span>
          </Label>
          <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="premium" />
            <span>$2000+</span>
          </Label>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Additional Requirements</Label>
        <Textarea
          placeholder="Any specific preferences? (e.g., RGB lighting, quiet operation, specific brand preferences...)"
          className="min-h-24"
          value={selections.customPrompt}
          onChange={(e) => setSelections({...selections, customPrompt: e.target.value})}
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

export default IntermediatePrompt;