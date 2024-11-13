"use client";

import BeginnerPrompt from "@/components/wizard/BeginnerPrompt";
import {
  sampleCaseFans,
  sampleCases,
  sampleCPUCoolers,
  sampleCPUs,
  sampleGPUs,
  sampleMemories,
  sampleMotherboards,
  samplePSUs,
  sampleStorage,
} from "@/data/samplePcComponents";
import { ComponentCategory } from "@/types/components";
import { useRouter } from "next/navigation";

export default function BeginnerBuilder() {
  const router = useRouter();

  const handleSubmit = (data: string) => {
    console.log("Beginner build data:", data);
    // Store data in state management or local storage if needed

    // set all the components in the local storage
    // localStorage.setItem(
    //   `selectedComponent_${categoryId}`,
    //   JSON.stringify(selectedComponent)
    // );
    // set all categories here , selected component will be from the samplePc Components file ,

    const categories: ComponentCategory[] = [
      "cpu",
      "motherboard",
      "memory",
      "gpu",
      "storage",
      "psu",
      "case",
      "cpu-cooler",
      "case-fans",
    ];

    categories.forEach((category) => {
      let selectedComponent;

      switch (category) {
        case "cpu":
          selectedComponent = sampleCPUs[0];
          break;
        case "cpu-cooler":
          selectedComponent = sampleCPUCoolers[0];
          break;
        case "motherboard":
          selectedComponent = sampleMotherboards[0];
          break;
        case "memory":
          selectedComponent = sampleMemories[0];
          break;
        case "gpu":
          selectedComponent = sampleGPUs[0];
          break;
        case "storage":
          selectedComponent = sampleStorage[0];
          break;
        case "psu":
          selectedComponent = samplePSUs[0];
          break;
        case "case":
          selectedComponent = sampleCases[0];
          break;
        case "case-fans":
          selectedComponent = sampleCaseFans[0];
          break;
        default:
          console.warn(`Unknown category: ${category}`);
          return;
      }

      if (selectedComponent) {
        try {
          localStorage.setItem(
            `selectedComponent_${category}`,
            JSON.stringify(selectedComponent)
          );
        } catch (error) {
          console.error(`Error storing component for ${category}:`, error);
        }
      }

      router.push("/build/expert");
    });
  };

  return (
    <div className="container mx-auto py-8">
      <BeginnerPrompt onSubmit={handleSubmit} />
    </div>
  );
}
