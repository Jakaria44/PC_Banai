'use client';

import IntermediatePrompt from '@/components/wizard/IntermediatePrompt';
import type { IntermediateSelections } from '@/types';
import { useRouter } from 'next/navigation';


export default function IntermediatePage() {
  const router = useRouter();

  const handleSubmitSelection = (selections: IntermediateSelections) => {
    // You can handle the selections here, for example:
    // - Save to local storage
    // - Update URL parameters
    // - Navigate to next page
    console.log('Selections:', selections);
    // Example: Navigate to results page with query params
    const queryString = new URLSearchParams({
      useCase: selections.useCase,
      budget: selections.budget,
      preferences: selections.preferences || '',
      customPrompt: selections.customPrompt || ''
    }).toString();

    router.push(`/build/results?${queryString}`);
  };

  return (
    <div className="container py-8">
      <IntermediatePrompt onSubmit={handleSubmitSelection} />
    </div>
  );
}