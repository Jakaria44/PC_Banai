'use client'

import {
  ArrowLeft,
  ChevronRight,
  Plus,
  Save
} from 'lucide-react';
import { useState } from 'react';

// Component type selector step
const ComponentTypeSelector = ({ onSelect }) => {
  const componentTypes = [
    { id: 'cpu', label: 'CPU' },
    { id: 'motherboard', label: 'Motherboard' },
    { id: 'memory', label: 'Memory' },
    { id: 'gpu', label: 'GPU' },
    { id: 'storage', label: 'Storage' },
    { id: 'psu', label: 'Power Supply' },
    { id: 'case', label: 'Case' },
    { id: 'cpu-cooler', label: 'CPU Cooler' },
    { id: 'case-fans', label: 'Case Fans' }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Select Component Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {componentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">{type.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Dynamic form generator based on component type
const ComponentForm = ({ type, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    wattage: '',
    highlights: [''],
    ...getInitialStateForType(type)
  });

  const fields = getFieldsForType(type);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData(prev => ({
      ...prev,
      highlights: newHighlights
    }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type,
      category: type,
      id: crypto.randomUUID()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Add {type.toUpperCase()} Component</h2>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg border hover:bg-gray-50"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Selection
        </button>
      </div>

      {/* Common fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block font-medium">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Wattage</label>
          <input
            type="number"
            value={formData.wattage}
            onChange={(e) => handleChange('wattage', parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      {/* Dynamic fields based on component type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="block font-medium">{field.label}</label>
            {field.options ? (
              // For strict enum values
              <select
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.suggestions ? (
              // For fields with suggestions but allowing custom input
              <div className="relative">
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full p-2 border rounded"
                  list={`${field.key}-suggestions`}
                  required
                />
                <datalist id={`${field.key}-suggestions`}>
                  {field.suggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
                </datalist>
                {field.type === 'number' && (
                  <small className="text-gray-500 mt-1 block">
                    Enter a custom value or select from suggestions
                  </small>
                )}
              </div>
            ) : (
              // For regular input fields
              <input
                type={field.type || 'text'}
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, field.type === 'number' ?
                  parseInt(e.target.value) || '' : e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            )}
          </div>
        ))}
      </div>

      {/* Highlights section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block font-medium">Highlights</label>
          <button
            type="button"
            onClick={addHighlight}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Highlight
          </button>
        </div>
        {formData.highlights.map((highlight, index) => (
          <input
            key={index}
            type="text"
            value={highlight}
            onChange={(e) => handleHighlightChange(index, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={`Highlight ${index + 1}`}
            required
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <Save className="w-5 h-5 mr-2" />
        Save Component
      </button>
    </form>
  );
};

// Preview component
const ComponentPreview = ({ data, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Component Preview</h2>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Form
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-48 object-cover rounded"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{data.name}</h3>
            <p className="text-2xl text-blue-600">${data.price}</p>
            <div className="space-y-2">
              <h4 className="font-medium">Highlights:</h4>
              <ul className="list-disc list-inside">
                {data.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(data).map(([key, value]) => {
            if (['id', 'name', 'price', 'image', 'highlights'].includes(key)) return null;
            return (
              <div key={key} className="space-y-1">
                <p className="text-sm text-gray-500 capitalize">{key}</p>
                <p className="font-medium">{value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main component
const AdminComponentForm = () => {
  const [step, setStep] = useState('type-select'); // type-select, form, preview
  const [selectedType, setSelectedType] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setStep('form');
  };

  const handleFormSubmit = (data) => {
    setPreviewData(data);
    setStep('preview');
    // Here you would typically also send the data to your backend
    console.log('Form submitted:', data);
  };

  const handleBack = () => {
    setStep('form');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {step === 'type-select' && (
        <ComponentTypeSelector onSelect={handleTypeSelect} />
      )}
      {step === 'form' && selectedType && (
        <ComponentForm
          type={selectedType}
          onSubmit={handleFormSubmit}
          onBack={() => setStep('type-select')}
        />
      )}
      {step === 'preview' && previewData && (
        <ComponentPreview data={previewData} onBack={handleBack} />
      )}
    </div>
  );
};

// Utility functions
// Known values for different fields
const knownValues = {
  cpuSocket: ['LGA 1700', 'LGA 1200', 'AM4', 'AM5', 'TR4'],
  formFactor: ['ATX', 'Micro ATX', 'Mini ITX', 'E-ATX'],
  brand: ['AMD', 'Intel', 'NVIDIA', 'ASUS', 'MSI', 'Gigabyte', 'ASRock', 'EVGA', 'Corsair', 'G.Skill', 'Crucial', 'Western Digital', 'Samsung', 'Seagate', 'be quiet!', 'Noctua', 'NZXT', 'Lian Li'],
  ddrType: ['DDR4', 'DDR5'],
  chipset: ['Z690', 'B660', 'X570', 'B550', 'Z790', 'B760', 'X670E', 'B650'],
  efficiencyRating: ['80+ Bronze', '80+ Silver', '80+ Gold', '80+ Platinum', '80+ Titanium'],
};

const getFieldsForType = (type) => {
  switch (type) {
    case 'cpu':
      return [
        { key: 'socket', label: 'Socket', suggestions: knownValues.cpuSocket },
        { key: 'cores', label: 'Cores', type: 'number' },
        { key: 'threads', label: 'Threads', type: 'number' },
        { key: 'clockSpeedBase', label: 'Base Clock Speed' },
        { key: 'clockSpeedBoost', label: 'Boost Clock Speed' },
        { key: 'cache', label: 'Cache' },
        { key: 'brand', label: 'Brand', suggestions: ['AMD', 'Intel'] }
      ];
    case 'cpu-cooler':
      return [
        { key: 'socket', label: 'Socket Compatibility (comma-separated)' },
        { key: 'coolerType', label: 'Cooler Type' },
        { key: 'fanSpeed', label: 'Fan Speed' },
        { key: 'noise', label: 'Noise Level' },
        { key: 'size', label: 'Size' },
        { key: 'brand', label: 'Brand' }
      ];
    case 'motherboard':
      return [
        { key: 'formFactor', label: 'Form Factor' },
        { key: 'socket', label: 'Socket' },
        { key: 'chipset', label: 'Chipset' },
        { key: 'memorySlots', label: 'Memory Slots', type: 'number' },
        { key: 'maxMemory', label: 'Maximum Memory' },
        { key: 'brand', label: 'Brand' }
      ];
    case 'memory':
      return [
        { key: 'capacity', label: 'Capacity' },
        { key: 'speed', label: 'Speed' },
        { key: 'typeDDR', label: 'DDR Type' },
        { key: 'brand', label: 'Brand' }
      ];
    case 'gpu':
      return [
        { key: 'chipset', label: 'Chipset' },
        { key: 'memory', label: 'Memory' },
        { key: 'coreClock', label: 'Core Clock' },
        { key: 'boostClock', label: 'Boost Clock' },
        { key: 'brand', label: 'Brand' }
      ];
    case 'storage':
      return [
        { key: 'capacity', label: 'Capacity' },
        { key: 'storageType', label: 'Storage Type', options: ['HDD', 'SSD', 'NVMe'] },
        { key: 'readSpeed', label: 'Read Speed' },
        { key: 'writeSpeed', label: 'Write Speed' },
        { key: 'brand', label: 'Brand' }
      ];
    case 'psu':
      return [
        { key: 'wattage', label: 'Wattage', type: 'number' },
        { key: 'efficiencyRating', label: 'Efficiency Rating' },
        { key: 'modularity', label: 'Modularity', options: ['Modular', 'Semi-Modular', 'Non-Modular'] },
        { key: 'brand', label: 'Brand' }
      ];
    case 'case':
      return [
        { key: 'formFactor', label: 'Form Factor Support' },
        { key: 'sidePanel', label: 'Side Panel' },
        { key: 'color', label: 'Color' },
        { key: 'coolingSupport', label: 'Cooling Support' },
        { key: 'brand', label: 'Brand' }
      ];
    case 'case-fans':
      return [
        { key: 'fanSize', label: 'Fan Size' },
        { key: 'noiseLevel', label: 'Noise Level' },
        { key: 'brand', label: 'Brand' }
      ];
    default:
      return [];
  }
};

const getInitialStateForType = (type) => {
  switch (type) {
    case 'cpu':
      return {
        socket: '',
        cores: '',
        threads: '',
        clockSpeedBase: '',
        clockSpeedBoost: '',
        cache: '',
        brand: ''
      };
    case 'cpu-cooler':
      return {
        socket: '',
        coolerType: '',
        fanSpeed: '',
        noise: '',
        size: '',
        brand: ''
      };
    case 'motherboard':
      return {
        formFactor: '',
        socket: '',
        chipset: '',
        memorySlots: '',
        maxMemory: '',
        brand: ''
      };
    case 'memory':
      return {
        capacity: '',
        speed: '',
        typeDDR: '',
        brand: ''
      };
    case 'gpu':
      return {
        chipset: '',
        memory: '',
        coreClock: '',
        boostClock: '',
        brand: ''
      };
    case 'storage':
      return {
        capacity: '',
        storageType: 'SSD',
        readSpeed: '',
        writeSpeed: '',
        brand: ''
      };
    case 'psu':
      return {
        wattage: '',
        efficiencyRating: '',
        modularity: 'Non-Modular',
        brand: ''
      };
    case 'case':
      return {
        formFactor: '',
        sidePanel: '',
        color: '',
        coolingSupport: '',
        brand: ''
      };
    case 'case-fans':
      return {
        fanSize: '',
        noiseLevel: '',
        brand: ''
      };
    default:
      return {};
  }
};

export default AdminComponentForm;