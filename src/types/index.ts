export type ExpertiseLevel = 'beginner' | 'intermediate' | 'expert';
export type ThemeType = 'light' | 'dark';
export type WizardStep = 'select-level' | 'requirements';

export interface IntermediateSelections {
  useCase: string;
  budget: string;
  preferences?: string;
  customPrompt: string;
}
