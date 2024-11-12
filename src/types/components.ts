// Component category type
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

// Column configuration for comparison table
export interface ColumnConfig {
  key: string;
  label: string;
  render?: (value: unknown) => React.ReactNode;
}

// Base component interface with shared properties
export interface BaseComponent {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ComponentCategory;
  wattage: number;
  highlights: string[];
  type: ComponentCategory; // Added for compatibility with existing code
}

// CPU specific interface
export interface CPU extends BaseComponent {
  category: 'cpu';
  type: 'cpu';
  socket: string;
  cores: number;
  threads: number;
  clockSpeed: {
    base: string;
    boost: string;
  };
  cache: string;
  brand: string;
}

// CPU Cooler specific interface
export interface CPUCooler extends BaseComponent {
  category: 'cpu-cooler';
  type: 'cpu-cooler';
  socket: string[];
  coolerType: string;
  fanSpeed: string;
  noise: string;
  size: string;
  brand: string;
}

// Component List Item interface
export interface ComponentListItem {
  id: ComponentCategory;
  category: ComponentCategory;
  displayName: string;
  isRequired: boolean;
  wattage: number;
}

// Selected component interface that matches the localStorage structure
export interface SelectedComponent {
  id: string;
  name: string;
  price: number;
  image: string;
  highlights: string[];
  category: ComponentCategory;
  wattage: number;
  type: ComponentCategory;
}

// Type for the selected components state
export type SelectedComponentsState = {
  [K in ComponentCategory]?: SelectedComponent | null;
};

// Column configurations for different component types
export const componentColumns: Record<ComponentCategory, ColumnConfig[]> = {
  cpu: [
    { key: 'name', label: 'Name' },
    { key: 'cores', label: 'Cores' },
    { key: 'threads', label: 'Threads' },
    { key: 'clockSpeed', label: 'Clock Speed' },
    { key: 'socket', label: 'Socket' },
  ],
  'cpu-cooler': [
    { key: 'name', label: 'Name' },
    { key: 'coolerType', label: 'Type' },
    { key: 'socket', label: 'Socket Compatibility' },
    { key: 'fanSpeed', label: 'Fan Speed' },
    { key: 'size', label: 'Size' },
  ],
  // Add other component types as needed...
  motherboard: [{ key: 'name', label: 'Name' }],
  memory: [{ key: 'name', label: 'Name' }],
  gpu: [{ key: 'name', label: 'Name' }],
  storage: [{ key: 'name', label: 'Name' }],
  psu: [{ key: 'name', label: 'Name' }],
  case: [{ key: 'name', label: 'Name' }],
  'case-fans': [{ key: 'name', label: 'Name' }],
};

// Filter option types
export interface FilterOption {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}