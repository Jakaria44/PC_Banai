import { FilterOption } from '@/types/components';

export const cpuFilters: FilterOption[] = [
  {
    id: 'socket',
    label: 'Socket',
    options: [
      { value: 'am5', label: 'AM5' },
      { value: 'am4', label: 'AM4' },
      { value: 'lga1700', label: 'LGA 1700' },
      { value: 'lga1200', label: 'LGA 1200' },
    ]
  },
  {
    id: 'cores',
    label: 'Number of Cores',
    options: [
      { value: '4', label: '4 Cores' },
      { value: '6', label: '6 Cores' },
      { value: '8', label: '8 Cores' },
      { value: '12', label: '12 Cores' },
      { value: '16', label: '16 Cores' },
    ]
  },
  {
    id: 'threads',
    label: 'Number of Threads',
    options: [
      { value: '8', label: '8 Threads' },
      { value: '12', label: '12 Threads' },
      { value: '16', label: '16 Threads' },
      { value: '24', label: '24 Threads' },
      { value: '32', label: '32 Threads' },
    ]
  },
];

export const coolerFilters: FilterOption[] = [
  {
    id: 'brand',
    label: 'Brand',
    options: [
      { value: 'noctua', label: 'Noctua' },
      { value: 'corsair', label: 'Corsair' },
      { value: 'coolermaster', label: 'Cooler Master' },
      { value: 'bequiet', label: 'be quiet!' },
    ]
  },
  {
    id: 'coolerType',
    label: 'Cooler Type',
    options: [
      { value: 'air', label: 'Air Cooling' },
      { value: 'aio', label: 'AIO Liquid Cooling' },
    ]
  },
  {
    id: 'features',
    label: 'Special Features',
    options: [
      { value: 'rgb', label: 'RGB' },
      { value: 'argb', label: 'ARGB' },
      { value: 'drgb', label: 'D-RGB' },
    ]
  },
];


export const motherboardFilters: FilterOption[] = [
  {
    id: 'socket',
    label: 'Socket',
    options: [
      { value: 'am5', label: 'AM5' },
      { value: 'am4', label: 'AM4' },
      { value: 'lga1700', label: 'LGA 1700' },
      { value: 'lga1200', label: 'LGA 1200' },
    ]
  },
  {
    id: 'formFactor',
    label: 'Form Factor',
    options: [
      { value: 'atx', label: 'ATX' },
      { value: 'matx', label: 'Micro ATX' },
      { value: 'itx', label: 'Mini ITX' },
    ]
  },
  {
    id: 'memoryType',
    label: 'Memory Type',
    options: [
      { value: 'ddr4', label: 'DDR4' },
      { value: 'ddr5', label: 'DDR5' },
    ]
  },
];

export const memoryFilters: FilterOption[] = [
  {
    id: 'capacity',
    label: 'Capacity',
    options: [
      { value: '8', label: '8 GB' },
      { value: '16', label: '16 GB' },
      { value: '32', label: '32 GB' },
      { value: '64', label: '64 GB' },
    ]
  },
  {
    id: 'speed',
    label: 'Speed',
    options: [
      { value: '2400', label: '2400 MHz' },
      { value: '3200', label: '3200 MHz' },
      { value: '3600', label: '3600 MHz' },
      { value: '4000', label: '4000 MHz' },
    ]
  },
  {
    id: 'type',
    label: 'Type',
    options: [
      { value: 'ddr4', label: 'DDR4' },
      { value: 'ddr5', label: 'DDR5' },
    ]
  },
];

export const gpuFilters: FilterOption[] = [
  {
    id: 'chipset',
    label: 'Chipset',
    options: [
      { value: 'rtx3060', label: 'RTX 3060' },
      { value: 'rtx3070', label: 'RTX 3070' },
      { value: 'rtx3080', label: 'RTX 3080' },
      { value: 'rtx3090', label: 'RTX 3090' },
    ]
  },
  {
    id: 'memory',
    label: 'Memory',
    options: [
      { value: '6', label: '6 GB' },
      { value: '8', label: '8 GB' },
      { value: '10', label: '10 GB' },
      { value: '12', label: '12 GB' },
    ]
  },
  {
    id: 'coreClock',
    label: 'Core Clock',
    options: [
      { value: '1500', label: '1500 MHz' },
      { value: '1800', label: '1800 MHz' },
      { value: '2000', label: '2000 MHz' },
      { value: '2200', label: '2200 MHz' },
    ]
  },
];

export const storageFilters: FilterOption[] = [
  {
    id: 'capacity',
    label: 'Capacity',
    options: [
      { value: '256', label: '256 GB' },
      { value: '512', label: '512 GB' },
      { value: '1', label: '1 TB' },
      { value: '2', label: '2 TB' },
    ]
  },
  {
    id: 'storageType',
    label: 'Type',
    options: [
      { value: 'ssd', label: 'SSD' },
      { value: 'hdd', label: 'HDD' },
    ]
  },
  {
    id: 'readSpeed',
    label: 'Read Speed',
    options: [
      { value: '500', label: '500 MB/s' },
      { value: '1000', label: '1000 MB/s' },
      { value: '2000', label: '2000 MB/s' },
    ]
  },
];

export const psuFilters: FilterOption[] = [
  {
    id: 'wattage',
    label: 'Wattage',
    options: [
      { value: '500', label: '500 W' },
      { value: '650', label: '650 W' },
      { value: '750', label: '750 W' },
      { value: '850', label: '850 W' },
    ]
  },
  {
    id: 'efficiencyRating',
    label: 'Efficiency Rating',
    options: [
      { value: '80plus', label: '80 Plus' },
      { value: '80plusbronze', label: '80 Plus Bronze' },
      { value: '80plusgold', label: '80 Plus Gold' },
      { value: '80plusplatinum', label: '80 Plus Platinum' },
    ]
  },
  {
    id: 'modularity',
    label: 'Modularity',
    options: [
      { value: 'modular', label: 'Non-Modular' },
      { value: 'semi-modular', label: 'Semi-Modular' },
      { value: 'fully-modular', label: 'Fully Modular' },
    ]
  },
];

export const caseFilters: FilterOption[] = [
  {
    id: 'formFactor',
    label: 'Form Factor Support',
    options: [
      { value: 'atx', label: 'ATX' },
      { value: 'matx', label: 'Micro ATX' },
      { value: 'itx', label: 'Mini ITX' },
    ]
  },
  {
    id: 'coolingSupport',
    label: 'Cooling Support',
    options: [
      { value: 'air', label: 'Air Cooling' },
      { value: 'water', label: 'Water Cooling' },
    ]
  },
  {
    id: 'sidePanel',
    label: 'Side Panel',
    options: [
      { value: 'temperedglass', label: 'Tempered Glass' },
      { value: 'acrylic', label: 'Acrylic' },
    ]
  },
];

export const caseFanFilters: FilterOption[] = [
  {
    id: 'fanSize',
    label: 'Fan Size',
    options: [
      { value: '120', label: '120 mm' },
      { value: '140', label: '140 mm' },
      { value: '200', label: '200 mm' },
    ]
  },
  {
    id: 'noiseLevel',
    label: 'Noise Level',
    options: [
      { value: '20', label: '20 dB' },
      { value: '25', label: '25 dB' },
      { value: '30', label: '30 dB' },
    ]
  },
];

export const componentFilters = {
  cpu: cpuFilters,
  CPUCooler: coolerFilters,
  motherboard: motherboardFilters,
  memory: memoryFilters,
  gpu: gpuFilters,
  storage: storageFilters,
  psu: psuFilters,
  case: caseFilters,
  CaseFans: caseFanFilters,
};