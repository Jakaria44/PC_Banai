import { ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';

interface BeginnerPromptProps {
  onSubmit: (prompt: string) => void;
}


const BeginnerPrompt: React.FC<BeginnerPromptProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState<string>('');

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Tell Us What You Need</CardTitle>
        <CardDescription>
          Describe your needs in simple terms and we&apos;ll recommend the perfect build for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Example: I need a PC for gaming and streaming, my budget is $1500, and I want to play latest games at high settings..."
          className="min-h-32"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          className="w-full"
          onClick={() => onSubmit(prompt)}
        >
          Get My Personalized Build <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};


export default BeginnerPrompt;