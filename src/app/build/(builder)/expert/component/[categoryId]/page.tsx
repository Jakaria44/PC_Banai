"use client";

import { ComponentSelectionPage } from "@/components/builder/ComponentSelectionPage";
import { coolerFilters, cpuFilters } from "@/data/filters";
import { useParams } from "next/navigation";

// Sample data - you can replace with your own
const sampleCPUs = [
  {
    id: "cpu-1",
    name: "AMD Ryzen 9 7950X",
    brand: "AMD",
    price: 699.99,
    image: "/api/placeholder/400/300",
    highlights: ["16 Cores", "32 Threads", "5.7GHz Boost", "64MB Cache"],
    socket: "AM5",
    cores: 16,
    threads: 32,
    clockSpeed: "4.5GHz Base / 5.7GHz Boost",
    cache: "64MB L3",
  },
  // Add more CPUs...
];

const sampleCoolers = [
  {
    id: "cooler-1",
    name: "Noctua NH-D15",
    brand: "Noctua",
    price: 99.99,
    image: "/api/placeholder/400/300",
    highlights: ["Dual Tower", "Premium Fans", "Superior Cooling", "Low Noise"],
    socket: ["AM4", "AM5", "LGA1700"],
    coolerType: "Air",
    coolerSize: "165mm",
    fanSpeed: "300-1500 RPM",
    features: [],
  },
  // Add more coolers...
];
export default function ComponentSelection() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const getComponentConfig = () => {
    switch (categoryId) {
      case 'cpu':
        return {
          title: 'Select CPU',
          filters: cpuFilters,
          components: sampleCPUs,
          priceRange: { min: 100, max: 1000 },
          categoryId: categoryId,
        };
      case 'cpu-cooler':
        return {
          title: 'Select CPU Cooler',
          filters: coolerFilters,
          components: sampleCoolers,
          priceRange: { min: 30, max: 300 },
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