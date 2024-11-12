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