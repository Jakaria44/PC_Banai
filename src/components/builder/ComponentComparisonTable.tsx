import { BaseComponent, ColumnConfig, ComponentCategory, componentColumns } from '@/types/components';
import { ArrowUpRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ComponentComparisonTableProps {
  type: ComponentCategory;
  selected: BaseComponent;
  similarComponents: BaseComponent[];
  onSelect: (component: BaseComponent) => void;
}

export const ComponentComparisonTable: React.FC<ComponentComparisonTableProps> = ({
  type,
  selected,
  similarComponents,
  onSelect
}) => {
  const router = useRouter();
  const columns = componentColumns[type];

  const renderCell = (component: BaseComponent, column: ColumnConfig) => {
    const value = component[column.key as keyof BaseComponent];
    return column.render ? column.render(value) : value;
  };

  // Calculate benchmark score (example implementation)
  const getBenchmarkScore = (component: BaseComponent) => {
    // Replace with actual benchmark calculation logic
    return Math.floor(Math.random() * 100);
  };

  const handleViewDetails = (component: BaseComponent) => {
    router.push(`/build/component/${type}/${component.id}`);
  };

  return (
    <div className="border-t">
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="mb-3">
          <h4 className="font-medium">Similar Components</h4>
          <p className="text-sm text-gray-500">Compare specifications</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={`${column.key}-${column.label}`}
                    className={column.key === 'name' ? 'min-w-[200px]' : ''}
                  >
                    {column.label}
                  </TableHead>
                ))}
                <TableHead>Benchmark</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Current Selection */}
              <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                <TableCell className="font-medium">
                  {selected.name}
                  <Badge variant="secondary" className="ml-2">Current</Badge>
                </TableCell>
                {columns.slice(1).map((column) => (
                  <TableCell key={`selected-${column.key}`}>
                    {renderCell(selected, column)}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${getBenchmarkScore(selected)}%` }}
                      />
                    </div>
                    <span className="text-sm">{getBenchmarkScore(selected)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(selected)}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>

              {/* Similar Components */}
              {similarComponents.map((component) => (
                <TableRow
                  key={component.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {columns.map((column) => (
                    <TableCell key={`${component.id}-${column.key}`}>
                      {renderCell(component, column)}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${getBenchmarkScore(component)}%` }}
                        />
                      </div>
                      <span className="text-sm">{getBenchmarkScore(component)}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(component)}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onSelect(component)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};