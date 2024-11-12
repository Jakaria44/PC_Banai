import { SelectedComponent } from '@/types/components';

export type ComponentCategory =
  | 'cpu'
  | 'motherboard'
  | 'memory'
  | 'gpu'
  | 'storage'
  | 'psu'
  | 'case'
  | 'cpu-cooler'
  | 'case-fans';

// Base component list item type
export interface ComponentListItem {
  id: ComponentCategory;
  category: ComponentCategory;
  displayName: string;
  isRequired: boolean;
  wattage: number;
}

// Component List Data
export const componentsList: ComponentListItem[] = [
  {
    id: 'cpu',
    category: 'cpu',
    displayName: 'Processor (CPU)',
    isRequired: true,
    wattage: 0,
  },
  {
    id: 'motherboard',
    category: 'motherboard',
    displayName: 'Motherboard',
    isRequired: true,
    wattage: 0,
  },
  {
    id: 'memory',
    category: 'memory',
    displayName: 'Memory (RAM)',
    isRequired: true,
    wattage: 0,
  },
  {
    id: 'gpu',
    category: 'gpu',
    displayName: 'Graphics Card (GPU)',
    isRequired: false,
    wattage: 0,
  },
  {
    id: 'storage',
    category: 'storage',
    displayName: 'Storage',
    isRequired: true,
    wattage: 0,
  },
  {
    id: 'psu',
    category: 'psu',
    displayName: 'Power Supply (PSU)',
    isRequired: true,
    wattage: 0,
  },
  {
    id: 'case',
    category: 'case',
    displayName: 'Case',
    isRequired: true,
    wattage: 0,
  },
  {
    id: 'cpu-cooler',
    category: 'cpu-cooler',
    displayName: 'CPU Cooler',
    isRequired: true,
    wattage: 0,
  },
  {
    id: 'case-fans',
    category: 'case-fans',
    displayName: 'Case Fans',
    isRequired: false,
    wattage: 0,
  }
] as const;



// Type for the selected components state
export type SelectedComponentsState = {
  [K in ComponentCategory]?: SelectedComponent | null;
};