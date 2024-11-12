import { ExpertiseLevel } from '@/types';
import { Laptop2, MessagesSquare, Settings2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';


interface KnowledgeLevelSelectorProps {
  onSelect: (level: ExpertiseLevel) => void;
}

const KnowledgeLevelSelector: React.FC<KnowledgeLevelSelectorProps> = ({ onSelect }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to BuildMaster Pro</CardTitle>
        <CardDescription>
          Let&apos;s start by understanding your PC building experience level
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6">
        <Button
          variant="outline"
          className="h-32 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
          onClick={() => onSelect('beginner')}
        >
          <Laptop2 className="h-8 w-8 text-blue-500" />
          <div className="text-lg font-semibold">Beginner Builder</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            I&apos;m new to PC building and need guidance
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-32 flex flex-col items-center justify-center gap-2 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950 transition-all"
          onClick={() => onSelect('intermediate')}
        >
          <Settings2 className="h-8 w-8 text-purple-500" />
          <div className="text-lg font-semibold">Intermediate Enthusiast</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            I have some experience but want detailed recommendations
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-32 flex flex-col items-center justify-center gap-2 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950 transition-all"
          onClick={() => onSelect('expert')}
        >
          <MessagesSquare className="h-8 w-8 text-green-500" />
          <div className="text-lg font-semibold">Expert Builder</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            I know exactly what I want and need the advanced builder
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default KnowledgeLevelSelector;