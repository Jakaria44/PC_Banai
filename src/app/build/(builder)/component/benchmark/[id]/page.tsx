'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, Cpu, ExternalLink, LucideGitGraph } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Sample data - replace with actual data from your backend
const sampleCPUData = {
  name: "AMD Ryzen 9 7950X",
  specs: {
    cores: "16",
    threads: "32",
    baseSpeed: "4.5 GHz",
    boostSpeed: "5.7 GHz",
    socket: "AM5",
    tdp: "170W"
  },
  benchmarks: {
    singleCore: [
      { name: 'Cinebench R23', score: 2150, maxScore: 2500 },
      { name: 'Geekbench 5', score: 1850, maxScore: 2000 },
      { name: 'PassMark', score: 3500, maxScore: 4000 }
    ],
    multiCore: [
      { name: 'Cinebench R23', score: 24500, maxScore: 30000 },
      { name: 'Geekbench 5', score: 15000, maxScore: 18000 },
      { name: 'PassMark', score: 45000, maxScore: 50000 }
    ],
    gaming: [
      { name: 'CS:GO 1080p', score: 450, maxScore: 500 },
      { name: 'Shadow of Tomb Raider', score: 180, maxScore: 200 },
      { name: 'Cyberpunk 2077', score: 85, maxScore: 100 }
    ]
  },
  prices: [
    { store: 'Star Tech', price: 599.99, inStock: true, trend: 'down' },
    { store: 'Ryans', price: 619.99, inStock: true, trend: 'up' },
    { store: 'Technology Villa', price: 609.99, inStock: false, trend: 'stable' }
  ]
};

const sampleGPUData = {
  name: "NVIDIA GeForce RTX 4090",
  specs: {
    memory: "24GB GDDR6X",
    coreClock: "2.23 GHz",
    boostClock: "2.52 GHz",
    rtCores: "176",
    tensorCores: "176",
    tdp: "450W"
  },
  benchmarks: {
    gaming: [
      { name: '4K Gaming', score: 12500, maxScore: 15000 },
      { name: '1440p Gaming', score: 18500, maxScore: 20000 },
      { name: '1080p Gaming', score: 24500, maxScore: 25000 }
    ],
    rendering: [
      { name: 'Blender', score: 4500, maxScore: 5000 },
      { name: 'V-Ray', score: 3800, maxScore: 4000 },
      { name: 'OctaneBench', score: 550, maxScore: 600 }
    ],
    compute: [
      { name: 'TensorFlow', score: 8500, maxScore: 10000 },
      { name: 'PyTorch', score: 9000, maxScore: 10000 },
      { name: 'CUDA Performance', score: 4800, maxScore: 5000 }
    ]
  },
  prices: [
    { store: 'Star Tech', price: 999.99, inStock: true, trend: 'stable' },
    { store: 'Ryans', price: 989.99, inStock: true, trend: 'down' },
    { store: 'Technology Villa', price: 1019.99, inStock: true, trend: 'up' }
  ]
};

const ComponentHeader = ({ data, type }) => (
  <Card className="w-full mb-6">
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          {type === 'cpu' ? (
            <Cpu className="w-8 h-8 text-blue-600" />
          ) : (
            <LucideGitGraph className="w-8 h-8 text-blue-600" />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(data.specs).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BenchmarkChart = ({ data, title }) => (
  <Card className="w-full mb-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#3b82f6" name="Score" />
            <Bar dataKey="maxScore" fill="#94a3b8" name="Max Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const PriceComparison = ({ prices }) => (
  <Card className="w-full mb-6">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">Latest Prices</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {prices.map((price, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-medium">{price.store}</span>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-sm ${price.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {price.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${price.price}</span>
                {price.trend === 'up' && <ChevronUp className="w-4 h-4 text-red-500" />}
                {price.trend === 'down' && <ChevronDown className="w-4 h-4 text-green-500" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const BenchmarkComparison = () => {
  const [activeTab, setActiveTab] = useState('cpu');

  return (
    <div className="container mx-auto p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="cpu">CPU Benchmarks</TabsTrigger>
          <TabsTrigger value="gpu">GPU Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="space-y-6">
          <ComponentHeader data={sampleCPUData} type="cpu" />
          <PriceComparison prices={sampleCPUData.prices} />
          <div className="grid gap-6">
            <BenchmarkChart
              data={sampleCPUData.benchmarks.singleCore}
              title="Single Core Performance"
            />
            <BenchmarkChart
              data={sampleCPUData.benchmarks.multiCore}
              title="Multi Core Performance"
            />
            <BenchmarkChart
              data={sampleCPUData.benchmarks.gaming}
              title="Gaming Performance"
            />
          </div>
        </TabsContent>

        <TabsContent value="gpu" className="space-y-6">
          <ComponentHeader data={sampleGPUData} type="gpu" />
          <PriceComparison prices={sampleGPUData.prices} />
          <div className="grid gap-6">
            <BenchmarkChart
              data={sampleGPUData.benchmarks.gaming}
              title="Gaming Performance"
            />
            <BenchmarkChart
              data={sampleGPUData.benchmarks.rendering}
              title="Rendering Performance"
            />
            <BenchmarkChart
              data={sampleGPUData.benchmarks.compute}
              title="Compute Performance"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BenchmarkComparison;