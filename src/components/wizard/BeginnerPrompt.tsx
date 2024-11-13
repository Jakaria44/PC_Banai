'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRightIcon } from 'lucide-react';
import React, { useState } from 'react';

interface BeginnerSelections {
  usage: string;
  budget: string;
  timing: string;
  experience: string;
  additionalInfo: string;
}

interface BeginnerPromptProps {
  onSubmit: (selections: BeginnerSelections) => void;
}

const BeginnerPrompt: React.FC<BeginnerPromptProps> = ({ onSubmit }) => {
  const [selections, setSelections] = useState<BeginnerSelections>({
    usage: '',
    budget: '',
    timing: '',
    experience: '',
    additionalInfo: '',
  });

  const generatePrompt = () => {
    const prompt = `I need a PC for ${selections.usage}. My budget is ${selections.budget}.
    ${selections.timing} ${selections.experience} ${selections.additionalInfo}`.trim();
    onSubmit(selections);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Let's Build Your First PC</CardTitle>
        <CardDescription>
          Answer a few simple questions and we'll help you find the perfect PC build
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Usage */}
        <div className="space-y-3">
          <Label>What will you mainly use your PC for?</Label>
          <RadioGroup
            onValueChange={(value) => setSelections({ ...selections, usage: value })}
            className="grid gap-3"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="playing games like Minecraft, Fortnite, and doing schoolwork" />
              <div className="space-y-1">
                <span className="font-medium">Light Gaming & Schoolwork</span>
                <p className="text-sm text-gray-500">For games like Minecraft, Fortnite, and homework</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="playing latest games at high settings and maybe streaming" />
              <div className="space-y-1">
                <span className="font-medium">Heavy Gaming & Streaming</span>
                <p className="text-sm text-gray-500">For latest games at high settings and streaming</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="video editing and content creation" />
              <div className="space-y-1">
                <span className="font-medium">Content Creation</span>
                <p className="text-sm text-gray-500">For YouTube videos, photo/video editing</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="basic tasks like web browsing, office work, and watching videos" />
              <div className="space-y-1">
                <span className="font-medium">Basic Home/Office Use</span>
                <p className="text-sm text-gray-500">For web browsing, documents, and videos</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Budget Range */}
        <div className="space-y-3">
          <Label>What's your budget?</Label>
          <RadioGroup
            onValueChange={(value) => setSelections({ ...selections, budget: value })}
            className="grid gap-3"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="around $700" />
              <div className="space-y-1">
                <span className="font-medium">Under $700</span>
                <p className="text-sm text-gray-500">Entry-level build for basic needs</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="around $1000" />
              <div className="space-y-1">
                <span className="font-medium">$700 - $1000</span>
                <p className="text-sm text-gray-500">Good for most games and tasks</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="around $1500" />
              <div className="space-y-1">
                <span className="font-medium">$1000 - $1500</span>
                <p className="text-sm text-gray-500">Great performance for gaming and content creation</p>
              </div>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="over $1500" />
              <div className="space-y-1">
                <span className="font-medium">Over $1500</span>
                <p className="text-sm text-gray-500">High-end build for the best performance</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* When do you need it */}
        <div className="space-y-3">
          <Label>When do you need your PC?</Label>
          <RadioGroup
            onValueChange={(value) => setSelections({ ...selections, timing: value })}
            className="grid grid-cols-2 gap-3"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="I need to build it as soon as possible." />
              <span className="font-medium">As Soon as Possible</span>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="I can wait a few weeks for better deals." />
              <span className="font-medium">Can Wait for Deals</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label>What's your PC building experience?</Label>
          <RadioGroup
            onValueChange={(value) => setSelections({ ...selections, experience: value })}
            className="grid grid-cols-2 gap-3"
          >
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="This will be my first time building a PC." />
              <span className="font-medium">Complete Beginner</span>
            </Label>
            <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="I have some experience with PC hardware." />
              <span className="font-medium">Some Experience</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Additional Information */}
        <div className="space-y-3">
          <Label>Anything else we should know?</Label>
          <Textarea
            placeholder="Example: I prefer quiet operation, need Wi-Fi, want RGB lighting, prefer certain brands..."
            className="min-h-24"
            value={selections.additionalInfo}
            onChange={(e) => setSelections({ ...selections, additionalInfo: e.target.value })}
          />
        </div>

        <Button
          className="w-full"
          onClick={generatePrompt}
        >
          Get My Personalized Build <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BeginnerPrompt;