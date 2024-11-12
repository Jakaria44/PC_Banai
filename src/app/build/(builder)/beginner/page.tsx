'use client'

import BeginnerPrompt from '@/components/wizard/BeginnerPrompt';
import { useRouter } from 'next/navigation';

export default function BeginnerBuilder() {
  const router = useRouter();

  const handleSubmit = (data: string) => {
    console.log('Beginner build data:', data);
    // Store data in state management or local storage if needed
    router.push('/build/recommendation');
  };

  return (
    <div className="container mx-auto py-8">
      <BeginnerPrompt onSubmit={handleSubmit} />
    </div>
  );
}