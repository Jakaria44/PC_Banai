"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  BaseComponent,
  ComponentCategory,
  FilterOption,
  SelectedComponent,
} from "@/types/components";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface ComponentSelectionPageProps {
  title: string;
  filters: FilterOption[];
  components: BaseComponent[];
  priceRange: { min: number; max: number };
  categoryId: ComponentCategory;
}

const ComponentSelectionPage: React.FC<ComponentSelectionPageProps> = ({
  title,
  filters,
  components,
  priceRange,
  categoryId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [currentPriceRange, setCurrentPriceRange] = useState([
    priceRange.min,
    priceRange.max,
  ]);
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      }
    });
    params.set("price", `${currentPriceRange[0]}-${currentPriceRange[1]}`);
    params.set("sort", sortOption);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedFilters, currentPriceRange, sortOption, router]);

  const handleFilterChange = (
    filterId: string,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[filterId] || [];
      if (checked) {
        return { ...prev, [filterId]: [...current, value] };
      }
      return { ...prev, [filterId]: current.filter((v) => v !== value) };
    });
  };

  const handleComponentSelection = (component: BaseComponent) => {
    const selectedComponent: SelectedComponent = {
      id: component.id,
      name: component.name,
      price: component.price,
      image: component.image,
      highlights: component.highlights,
      category: component.category,
      wattage: component.wattage,
      type: component.type,
    };

    localStorage.setItem(
      `selectedComponent_${categoryId}`,
      JSON.stringify(selectedComponent)
    );
    router.push("/build/expert");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <div className="col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion
                type="multiple"
                defaultValue={["price"]}
                className="space-y-4"
              >
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <Slider
                        min={priceRange.min}
                        max={priceRange.max}
                        step={10}
                        value={currentPriceRange}
                        onValueChange={setCurrentPriceRange}
                      />
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={currentPriceRange[0]}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (
                                value >= priceRange.min &&
                                value <= currentPriceRange[1]
                              ) {
                                setCurrentPriceRange([
                                  value,
                                  currentPriceRange[1],
                                ]);
                              }
                            }}
                            className="w-24"
                            min={priceRange.min}
                            max={currentPriceRange[1]}
                          />
                        </div>
                        <span>to</span>
                        <div className="flex items-center gap-2">
                          <span>$</span>
                          <Input
                            type="number"
                            value={currentPriceRange[1]}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (
                                value <= priceRange.max &&
                                value >= currentPriceRange[0]
                              ) {
                                setCurrentPriceRange([
                                  currentPriceRange[0],
                                  value,
                                ]);
                              }
                            }}
                            className="w-24"
                            min={currentPriceRange[0]}
                            max={priceRange.max}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {filters.map((filter) => (
                  <AccordionItem key={filter.id} value={filter.id}>
                    <AccordionTrigger>{filter.label}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {filter.options.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${filter.id}-${option.value}`}
                              checked={selectedFilters[filter.id]?.includes(
                                option.value
                              )}
                              onCheckedChange={(checked) =>
                                handleFilterChange(
                                  filter.id,
                                  option.value,
                                  checked as boolean
                                )
                              }
                            />
                            <label htmlFor={`${filter.id}-${option.value}`}>
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Components Grid */}
        <div className="col-span-9">
          <div className="grid grid-cols-3 gap-4">
            {components.map((component) => (
              <Card
                key={component.id}
                className="hover:border-blue-500 transition-colors"
              >
                <CardContent className="p-4">
                  <Image
                    src={component.image}
                    alt={component.name}
                    width={500}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />

                  <Link
                    href={`/build/component/${component.category}/${component.id}`}
                  >
                    <h3 className="font-semibold mb-2 hover:text-blue-500">{component.name}</h3>
                  </Link>
                  <p className="text-xl font-bold mb-3">${component.price}</p>
                  <div className="space-y-2 mb-4">
                    {component.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleComponentSelection(component)}
                  >
                    Add to Build
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSelectionPage;
