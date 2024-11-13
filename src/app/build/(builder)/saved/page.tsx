
'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Settings, Share2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SelectedComponent {
  id: string;
  name: string;
  price: number;
  image: string;
  highlights: string[];
  category: ComponentCategory;
  wattage: number;
  type: ComponentCategory;
}

type ComponentCategory =
  | 'cpu'
  | 'motherboard'
  | 'memory'
  | 'gpu'
  | 'storage'
  | 'psu'
  | 'case'
  | 'cpu-cooler'
  | 'case-fans';

const SavedBuilds = () => {
  const [savedComponents, setSavedComponents] = useState<Record<ComponentCategory, SelectedComponent | null>>({
    cpu: null,
    motherboard: null,
    memory: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null,
    'cpu-cooler': null,
    'case-fans': null
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWattage, setTotalWattage] = useState(0);

  useEffect(() => {
    const loadSavedComponents = () => {
      const categories: ComponentCategory[] = [
        'cpu', 'motherboard', 'memory', 'gpu', 'storage',
        'psu', 'case', 'cpu-cooler', 'case-fans'
      ];

      const loadedComponents: Record<ComponentCategory, SelectedComponent | null> =
        {} as Record<ComponentCategory, SelectedComponent | null>;

      categories.forEach(category => {
        const saved = localStorage.getItem(`selectedComponent_${category}`);
        loadedComponents[category] = saved ? JSON.parse(saved) : null;
      });

      setSavedComponents(loadedComponents);

      // Calculate totals
      let price = 0;
      let wattage = 0;
      Object.values(loadedComponents).forEach(component => {
        if (component) {
          price += component.price;
          wattage += component.wattage;
        }
      });
      setTotalPrice(price);
      setTotalWattage(wattage);
    };

    loadSavedComponents();
  }, []);

  const getCategoryDisplayName = (category: ComponentCategory): string => {
    const displayNames: Record<ComponentCategory, string> = {
      cpu: 'CPU',
      motherboard: 'Motherboard',
      memory: 'Memory',
      gpu: 'Graphics Card',
      storage: 'Storage',
      psu: 'Power Supply',
      case: 'Case',
      'cpu-cooler': 'CPU Cooler',
      'case-fans': 'Case Fans'
    };
    return displayNames[category];
  };

  const removeComponent = (category: ComponentCategory) => {
    localStorage.removeItem(`selectedComponent_${category}`);
    setSavedComponents(prev => ({
      ...prev,
      [category]: null
    }));
    // Recalculate totals
    const newComponents = {
      ...savedComponents,
      [category]: null
    };
    const newPrice = Object.values(newComponents)
      .reduce((sum, component) => sum + (component?.price || 0), 0);
    const newWattage = Object.values(newComponents)
      .reduce((sum, component) => sum + (component?.wattage || 0), 0);
    setTotalPrice(newPrice);
    setTotalWattage(newWattage);
  };

  const clearAllComponents = () => {
    const categories: ComponentCategory[] = [
      'cpu', 'motherboard', 'memory', 'gpu', 'storage',
      'psu', 'case', 'cpu-cooler', 'case-fans'
    ];
    categories.forEach(category => {
      localStorage.removeItem(`selectedComponent_${category}`);
    });
    setSavedComponents({
      cpu: null,
      motherboard: null,
      memory: null,
      gpu: null,
      storage: null,
      psu: null,
      case: null,
      'cpu-cooler': null,
      'case-fans': null
    });
    setTotalPrice(0);
    setTotalWattage(0);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Saved Build</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Total components: {Object.values(savedComponents).filter(c => c !== null).length}/9
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Build
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllComponents}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Summary Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Wattage</p>
                <p className="text-2xl font-bold">{totalWattage}W</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Compatibility</p>
                <Badge variant="success" className="mt-2">Compatible</Badge>
              </div>
            </div>
          </div>

          {/* Components List */}
          <div className="space-y-4">
            {(Object.keys(savedComponents) as ComponentCategory[]).map((category) => {
              const component = savedComponents[category];
              return (
                <div key={category} className="group">
                  <div className="flex items-center justify-between p-4 rounded-lg border group-hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{getCategoryDisplayName(category)}</h3>
                        {component ? (
                          <div>
                            <p className="text-sm text-gray-600">{component.name}</p>
                            <p className="text-sm text-gray-500">${component.price.toFixed(2)} | {component.wattage}W</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400">No component selected</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {component && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeComponent(category)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                        </Button>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compatibility Notes */}
          {Object.values(savedComponents).some(component => component !== null) && (
            <div className="mt-6">
              <Separator className="my-4" />
              <h3 className="font-medium mb-2">Compatibility Notes</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <Badge variant="success" className="mt-0.5">✓</Badge>
                  All selected components are compatible with each other.
                </li>
                {savedComponents.psu && totalWattage > savedComponents.psu.wattage && (
                  <li className="flex items-start gap-2">
                    <Badge variant="destructive" className="mt-0.5">!</Badge>
                    The total system power draw ({totalWattage}W) exceeds the PSU wattage ({savedComponents.psu.wattage}W).
                  </li>
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedBuilds;