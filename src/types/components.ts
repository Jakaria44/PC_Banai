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
  type: ComponentCategory;
}

// CPU specific interface
export interface CPU extends BaseComponent {
  category: 'cpu';
  type: 'cpu';
  socket: string;
  cores: number;
  threads: number;
  clockSpeedBase: string;
  clockSpeedBoost: string;
  cache: string;
  brand: string;
}

// Extended type for display purposes
export interface CPUWithBenchmarks extends CPU {
  benchmarks: {
    singleCore: { name: string; score: number; maxScore: number }[];
    multiCore: { name: string; score: number; maxScore: number }[];
    gaming: { name: string; score: number; maxScore: number }[];
  };
  thermals: {
    tdp: number;
    maxTemp: number;
    recommendedCooler: string;
  };
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

// Motherboard specific interface
export interface Motherboard extends BaseComponent {
  category: 'motherboard';
  type: 'motherboard';
  formFactor: string;
  socket: string;
  chipset: string;
  memorySlots: number;
  maxMemory: string;
  brand: string;
  benchmarks?: {
    performance: { name: string; score: number; maxScore: number }[];
    connectivity: { name: string; score: number; maxScore: number }[];
  };
}

// Memory specific interface
export interface Memory extends BaseComponent {
  category: 'memory';
  type: 'memory';
  capacity: string;
  speed: string;
  typeDDR: string;
  brand: string;
}

export interface MemoryWithBenchmark extends Memory {
  benchmarks: {
    readSpeed: { name: string; score: number; maxScore: number }[];
    writeSpeed: { name: string; score: number; maxScore: number }[];
    latency: { name: string; score: number; maxScore: number }[];
  };
}

// GPU specific interface
export interface GPU extends BaseComponent {
  category: 'gpu';
  type: 'gpu';
  chipset: string;
  memory: string;
  coreClock: string;
  boostClock: string;
  brand: string;
  benchmarks: {
    gaming: { name: string; score: number; maxScore: number }[];
    rendering: { name: string; score: number; maxScore: number }[];
    compute: { name: string; score: number; maxScore: number }[];
  };
}


export interface GPUWithBenchmark extends GPU {
  benchmarks: {
    gaming: { name: string; score: number; maxScore: number }[];
    rendering: { name: string; score: number; maxScore: number }[];
    compute: { name: string; score: number; maxScore: number }[];
  };
}
// Storage specific interface
export interface Storage extends BaseComponent {
  category: 'storage';
  type: 'storage';
  capacity: string;
  storageType: 'HDD' | 'SSD' | 'NVMe';
  readSpeed: string;
  writeSpeed: string;
  brand: string;
}

// PSU specific interface
export interface PSU extends BaseComponent {
  category: 'psu';
  type: 'psu';
  wattage: number;
  efficiencyRating: string;
  modularity: 'Modular' | 'Semi-Modular' | 'Non-Modular';
  brand: string;
  benchmarks?: {
    efficiency: { name: string; score: number; maxScore: number }[];
    noiseLevel: { name: string; score: number; maxScore: number }[];
  };
}

// Case specific interface
export interface Case extends BaseComponent {
  category: 'case';
  type: 'case';
  formFactor: string;
  sidePanel: string;
  color: string;
  coolingSupport: string;
  brand: string;
  benchmarks?: {
    airflow: { name: string; score: number; maxScore: number }[];
    buildEase: { name: string; score: number; maxScore: number }[];
  };
}

// Case Fans specific interface
export interface CaseFans extends BaseComponent {
  category: 'case-fans';
  type: 'case-fans';
  fanSize: string;
  noiseLevel: string;
  brand: string;
  benchmarks?: {
    airflowPerformance: { name: string; score: number; maxScore: number }[];
    noiseLevel: { name: string; score: number; maxScore: number }[];
  };
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
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'cores', label: 'Cores' },
    { key: 'threads', label: 'Threads' },
    { key: 'clockSpeedBase', label: 'Base Clock' },
    { key: 'clockSpeedBoost', label: 'Boost Clock' },
    { key: 'socket', label: 'Socket' },
    { key: 'cache', label: 'Cache' },
    { key: 'wattage', label: 'TDP (W)' },
  ],
  'cpu-cooler': [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'coolerType', label: 'Type' },
    { key: 'socket', label: 'Socket Compatibility' },
    { key: 'fanSpeed', label: 'Fan Speed' },
    { key: 'noise', label: 'Noise Level' },
    { key: 'size', label: 'Size' },
  ],
  motherboard: [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'formFactor', label: 'Form Factor' },
    { key: 'socket', label: 'Socket' },
    { key: 'chipset', label: 'Chipset' },
    { key: 'memorySlots', label: 'Memory Slots' },
    { key: 'maxMemory', label: 'Max Memory' },
  ],
  memory: [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'capacity', label: 'Capacity' },
    { key: 'speed', label: 'Speed' },
    { key: 'typeDDR', label: 'DDR Type' },
  ],
  gpu: [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'chipset', label: 'Chipset' },
    { key: 'memory', label: 'Memory' },
    { key: 'coreClock', label: 'Core Clock' },
    { key: 'boostClock', label: 'Boost Clock' },
    { key: 'wattage', label: 'TDP (W)' },
  ],
  storage: [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'capacity', label: 'Capacity' },
    { key: 'storageType', label: 'Type' },
    { key: 'readSpeed', label: 'Read Speed' },
    { key: 'writeSpeed', label: 'Write Speed' },
  ],
  psu: [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'wattage', label: 'Wattage' },
    { key: 'efficiencyRating', label: 'Efficiency Rating' },
    { key: 'modularity', label: 'Modularity' },
  ],
  case: [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'formFactor', label: 'Form Factor Support' },
    { key: 'coolingSupport', label: 'Cooling Support' },
    { key: 'sidePanel', label: 'Side Panel' },
    { key: 'color', label: 'Color' },
  ],
  'case-fans': [
    { key: 'name', label: 'Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price', render: (value) => `$${value}` },
    { key: 'fanSize', label: 'Fan Size' },
    { key: 'noiseLevel', label: 'Noise Level' },
  ],
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