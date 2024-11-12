'use client'

import { ExpertiseLevel } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import KnowledgeLevelSelector from './KnowledgeLevelSelector';

export const PCBuildWizard: React.FC = () => {
  const router = useRouter();

  const handleLevelSelect = (selectedLevel: ExpertiseLevel) => {
    switch (selectedLevel) {
      case 'beginner':
        router.push('/build/beginner');
        break;
      case 'expert':
        router.push('/build/expert');
        break;
      case 'intermediate':
        router.push('/build/intermediate');
        break;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <KnowledgeLevelSelector onSelect={handleLevelSelect} />
    </div>
  );
};