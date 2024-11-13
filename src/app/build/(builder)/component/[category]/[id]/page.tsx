// src/app/build/(builder)/component/[category]/[id]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleCPUWithBenchmark } from '@/data/samplePcComponents';
import {
  ChartArea,
  ChevronLeft,
  Cpu,
  Gauge,
  Thermometer,
  Zap,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";


// Performance Bar Component
const PerformanceBar: React.FC<{
  value: number;
  maxValue: number;
  label?: string;
}> = ({ value, maxValue, label }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-2 bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function ComponentDetails() {
  const params = useParams();
  const router = useRouter();
  const { category, id } = params;

  // In a real app, fetch CPU data based on ID
  const cpu = sampleCPUWithBenchmark;

  const handleAddToBuild = () => {
    localStorage.setItem(
      `selectedComponent_${category}`,
      JSON.stringify(cpu)
    );
    router.push("/build/expert");
  };

  return (
    <div className="container mx-auto py-8">
      <Button variant="outline" className="mb-6" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Selection
      </Button>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                  <CardTitle className="text-2xl ">{cpu.name}</CardTitle>

                <p className="text-sm text-gray-500 mt-1">
                  {cpu.brand} · {cpu.socket} Socket
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${cpu.price}</p>
                <Button className="mt-2" onClick={handleAddToBuild}>
                  Add to Build
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Key Specifications</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      <span>
                        {cpu.cores} Cores / {cpu.threads} Threads
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      <span>
                        Base: {cpu.clockSpeedBase} · Boost:{" "}
                        {cpu.clockSpeedBoost}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChartArea className="h-4 w-4" />
                      <span>{cpu.cache}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Thermal & Power</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>{cpu.wattage}W TDP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Max Temp: {cpu.thermals.maxTemp}°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benchmarks Card */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="single" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="single">Single-Core</TabsTrigger>
                  <TabsTrigger value="multi">Multi-Core</TabsTrigger>
                  <TabsTrigger value="gaming">Gaming</TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-4">
                  {cpu.benchmarks.singleCore.map((bench) => (
                    <PerformanceBar
                      key={bench.name}
                      label={bench.name}
                      value={bench.score}
                      maxValue={bench.maxScore}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="multi" className="space-y-4">
                  {cpu.benchmarks.multiCore.map((bench) => (
                    <PerformanceBar
                      key={bench.name}
                      label={bench.name}
                      value={bench.score}
                      maxValue={bench.maxScore}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="gaming" className="space-y-4">
                  {cpu.benchmarks.gaming.map((bench) => (
                    <PerformanceBar
                      key={bench.name}
                      label={bench.name}
                      value={bench.score}
                      maxValue={bench.maxScore}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recommendations & Compatibility */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cooling Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-medium">Recommended Cooling</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {cpu.thermals.recommendedCooler}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Temperature Range</p>
                <div className="h-4 w-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-full" />
                <div className="flex justify-between text-sm">
                  <span>Idle: 35°C</span>
                  <span>Load: {cpu.thermals.maxTemp}°C</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Compatible Motherboards</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Requires an {cpu.socket} socket motherboard.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Memory Support</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  DDR5 Memory
                  <br />
                  Up to 128GB Capacity
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
