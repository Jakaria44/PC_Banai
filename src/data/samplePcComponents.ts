import { CPU, PCComponent } from '@/types/components';

export const sampleComponents: PCComponent[] = [
  {
    id: 'cpu-1',
    name: 'AMD Ryzen 9 7950X',
    category: 'CPU',
    price: 699.99,
    image: '/api/placeholder/200/200',
    features: ['16 Cores', '32 Threads', '5.7GHz Max Boost', 'AM5 Socket'],
    specs: {
      'Base Clock': '4.5 GHz',
      'Cache': '64MB L3',
      'TDP': '170W',
      'Architecture': 'Zen 4'
    }
  },
  {
    id: 'cpu-2',
    name: 'Intel Core i9-13900K',
    category: 'CPU',
    price: 589.99,
    image: '/api/placeholder/200/200',
    features: ['24 Cores', '32 Threads', '5.8GHz Max Boost', 'LGA 1700'],
    specs: {
      'Base Clock': '3.0 GHz',
      'Cache': '36MB L3',
      'TDP': '125W',
      'Architecture': 'Raptor Lake'
    }
  },
  {
    id: 'gpu-1',
    name: 'NVIDIA RTX 4090',
    category: 'GPU',
    price: 1599.99,
    image: '/api/placeholder/200/200',
    features: ['24GB GDDR6X', 'DLSS 3.0', 'Ray Tracing', '450W TDP'],
    specs: {
      'Memory': '24GB GDDR6X',
      'Boost Clock': '2.52 GHz',
      'CUDA Cores': '16384',
      'Power Connector': '16-pin'
    }
  },
  // Add more sample components...
];


export const sampleCPUs: CPU[] = [
  {
    id: 'cpu-1',
    type: 'cpu',
    name: 'AMD Ryzen 9 7950X',
    brand: 'AMD',
    price: 699.99,
    socket: 'AM5',
    cores: 16,
    threads: 32,
    clockSpeed: {
      base: '4.5 GHz',
      boost: '5.7 GHz'
    },
    cache: '64MB L3',
    tdp: 170
  },
  {
    id: 'cpu-2',
    type: 'cpu',
    name: 'Intel Core i9-13900K',
    brand: 'Intel',
    price: 589.99,
    socket: 'LGA 1700',
    cores: 24,
    threads: 32,
    clockSpeed: {
      base: '3.0 GHz',
      boost: '5.8 GHz'
    },
    cache: '36MB L3',
    tdp: 125
  },
  // Add more CPUs...
];