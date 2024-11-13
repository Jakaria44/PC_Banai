"use client";

import ComponentSelectionPage from '@/components/builder/ComponentSelectionPage';
import { componentFilters } from '@/data/filters';
import { sampleCaseFans, sampleCases, sampleCPUCoolers, sampleCPUs, sampleGPUs, sampleMemories, sampleMotherboards, samplePSUs, sampleStorage } from '@/data/samplePcComponents';
import { ComponentCategory } from '@/types/components';
import { useParams } from "next/navigation";

export default function ComponentSelection() {
  const params = useParams();
  const categoryId = params.categoryId as ComponentCategory;

  const getComponentConfig = () => {
    switch (categoryId) {
      case 'cpu':
        return {
          title: 'Select CPU',
          filters: componentFilters.cpu,
          components: sampleCPUs,
          priceRange: { min: 0, max: 1000 },
          categoryId: categoryId,
        };
      case 'cpu-cooler':
        return {
          title: 'Select CPU Cooler',
          filters: componentFilters.CPUCooler,
          components: sampleCPUCoolers,
          priceRange: { min: 0, max: 500 },
          categoryId: categoryId,
        };
      case 'motherboard':
        return {
          title: 'Select Motherboard',
          filters: componentFilters.motherboard,
          components: sampleMotherboards,
          priceRange: { min: 0, max: 500 },
          categoryId: categoryId,
        };
      case 'memory':
        return {
          title: 'Select Memory',
          filters: componentFilters.memory,
          components: sampleMemories,
          priceRange: { min: 0, max: 500 },
          categoryId: categoryId,
        };
      case 'gpu':
        return {
          title: 'Select GPU',
          filters: componentFilters.gpu,
          components: sampleGPUs,
          priceRange: { min: 0, max: 2000 },
          categoryId: categoryId,
        };
      case 'storage':
        return {
          title: 'Select Storage',
          filters: componentFilters.storage,
          components: sampleStorage,
          priceRange: { min: 0, max: 500 },
          categoryId: categoryId,
        };
      case 'psu':
        return {
          title: 'Select PSU',
          filters: componentFilters.psu,
          components: samplePSUs,
          priceRange: { min: 0, max: 200 },
          categoryId: categoryId,
        };
      case 'case':
        return {
          title: 'Select Case',
          filters: componentFilters.case,
          components: sampleCases,
          priceRange: { min: 0, max: 200 },
          categoryId: categoryId,
        };
      case 'case-fans':
        return {
          title: 'Select Case Fans',
          filters: componentFilters.caseFans,
          components: sampleCaseFans,
          priceRange: { min: 0, max: 100 },
          categoryId: categoryId,
        };
      default:
        return {
          title: 'Select Component',
          filters: [],
          components: [],
          priceRange: { min: 0, max: 1000 },
          categoryId: categoryId,
        };
    }
  };

  const config = getComponentConfig();

  return <ComponentSelectionPage {...config} />;
}