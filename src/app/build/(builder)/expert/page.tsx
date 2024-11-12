"use client";

import { ComponentComparisonTable } from "@/components/builder/ComponentComparisonTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ComponentCategory,
  ComponentListItem,
  componentsList,
  SelectedComponentsState,
} from "@/data/componentsList";
import { BaseComponent, SelectedComponent } from "@/types/components";
import { AlertCircle, ChevronRight, X, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExpertBuilder() {
  const router = useRouter();
  const [components] = useState<ComponentListItem[]>(componentsList);
  const [showSimilar, setShowSimilar] = useState<ComponentCategory | null>(
    null
  );
  const [selectedComponents, setSelectedComponents] =
    useState<SelectedComponentsState>({});

  // Load selected components from localStorage on mount
  useEffect(() => {
    const loadComponents = () => {
      const newComponents: { [key: string]: SelectedComponent | null } = {};
      components.forEach((comp) => {
        const stored = localStorage.getItem(
          `selectedComponent_${comp.category}`
        );
        if (stored) {
          newComponents[comp.category] = JSON.parse(stored);
        }
      });
      setSelectedComponents(newComponents);
    };

    loadComponents();
  }, []);
  const handleRemoveComponent = (categoryId: string) => {
    localStorage.removeItem(`selectedComponent_${categoryId}`);
    setSelectedComponents((prev) => ({
      ...prev,
      [categoryId]: null,
    }));
  };

  const handleChooseAnother = (categoryId: string) => {
    router.push(`/build/expert/component/${categoryId}`);
  };

  // Sample similar components data - replace with your actual data
  const getSimilarComponents = (
    categoryId: string,
    currentComponent: SelectedComponent
  ) => {
    // This would typically come from your database or API
    return [
      {
        id: "similar1",
        name: "Similar Component 1",
        price: currentComponent.price - 50,
        highlights: ["Feature 1", "Feature 2", "Feature 3"],
      },
      // Add more similar components...
    ];
  };

  const totalCost = Object.values(selectedComponents)
    .filter((comp): comp is SelectedComponent => comp !== null)
    .reduce((sum, component) => sum + component.price, 0);

  const totalWattage = Object.values(selectedComponents)
    .filter((comp): comp is SelectedComponent => comp !== null)
    .reduce((sum, component) => sum + component?.wattage || 0, 0);

  return (
    <div className="container mx-auto py-8 relative">
      <div className={`max-w-3xl mx-auto transition-all duration-300`}>
        <Card>
          <CardContent className="p-6">
            {/* Summary Section */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Cost
                    </p>
                    <p className="text-2xl font-bold">
                      ${totalCost.toFixed(2)}
                    </p>
                  </div>
                  <div className="border-l pl-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Estimated Wattage
                    </p>
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-yellow-500 mr-1" />
                      <p className="text-2xl font-bold">
                        ${totalWattage.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="border-l pl-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Components Selected
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        Object.values(selectedComponents).filter(
                          (comp) => comp !== null
                        ).length
                      }{" "}
                      / {components.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Clear all selections
                      components.forEach((comp) => {
                        localStorage.removeItem(
                          `selectedComponent_${comp.category}`
                        );
                      });
                      setSelectedComponents({});
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    disabled={
                      Object.values(selectedComponents).filter(
                        (comp) => comp !== null
                      ).length === 0
                    }
                    onClick={() => {
                      // Handle save/export functionality
                      console.log("Saving build...");
                    }}
                  >
                    Save Build
                  </Button>
                </div>
              </div>

              {/* Compatibility Notes (if any) */}
              {Object.values(selectedComponents).some(
                (comp) => comp !== null
              ) && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-500">Build Status</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        All selected components are compatible
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Components List */}
            <div className="space-y-4">
              {components.map((component) => {
                const selected = selectedComponents[component.category];
                const isShowingSimilar = showSimilar === component.category;

                return (
                  <div key={component.category} className="border rounded-lg">
                    {/* Main Component Section */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-grow">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {component.displayName}
                              </span>
                              {component.isRequired && (
                                <Badge variant="destructive" className="h-5">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Required
                                </Badge>
                              )}
                            </div>

                            {selected ? (
                              <div className="mt-2">
                                <div className="flex items-center space-x-4">
                                  <Image
                                    src={selected.image}
                                    alt={selected.name}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <div>
                                    <p className="font-medium">
                                      {selected.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      ${selected.price}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {selected.highlights
                                        .slice(0, 2)
                                        .map((highlight, idx) => (
                                          <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            {highlight}
                                          </Badge>
                                        ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 mt-1">
                                No component selected
                              </p>
                            )}
                          </div>
                        </div>

                        {selected ? (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleRemoveComponent(component.category)
                              }
                            >
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleChooseAnother(component.category)
                              }
                            >
                              Choose Another
                            </Button>
                            <Button
                              variant={
                                isShowingSimilar ? "secondary" : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                setShowSimilar(
                                  isShowingSimilar ? null : component.category
                                )
                              }
                            >
                              {isShowingSimilar
                                ? "Hide Similar"
                                : "Show Similar"}
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() =>
                              handleChooseAnother(component.category)
                            }
                          >
                            Choose
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Similar Components Accordion */}
                    {selected && isShowingSimilar && (
                      <ComponentComparisonTable
                        type={component.category as ComponentCategory}
                        selected={selected as unknown as BaseComponent}
                        similarComponents={
                          getSimilarComponents(
                            component.category,
                            selected
                          ) as unknown as BaseComponent[]
                        }
                        onSelect={(component) => {
                          localStorage.setItem(
                            `selectedComponent_${component.type}`,
                            JSON.stringify(component)
                          );
                          setSelectedComponents((prev) => ({
                            ...prev,
                            [component.type]: component,
                          }));
                          setShowSimilar(null);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
