import { BaseComponent, ColumnConfig, ComponentCategory, componentColumns } from '@/types/components';
import { Badge } from '../ui/badge';
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
  const columns = componentColumns[type];

  const renderCell = (component: BaseComponent, column: ColumnConfig) => {
    const value = component[column.key as keyof BaseComponent];
    return column.render ? column.render(value) : value;
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
                <TableHead className="text-right">Price</TableHead>
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
                <TableCell className="text-right font-medium">
                  ${selected.price}
                </TableCell>
              </TableRow>

              {/* Similar Components */}
              {similarComponents.map((component) => (
                <TableRow
                  key={component.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => onSelect(component)}
                >
                  {columns.map((column) => (
                    <TableCell key={`${component.id}-${column.key}`}>
                      {renderCell(component, column)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-medium">${component.price}</span>
                      {component.price !== selected.price && (
                        <span className={`text-xs ${
                          component.price < selected.price ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {component.price < selected.price ? '-' : '+'}$
                          {Math.abs(component.price - selected.price).toFixed(2)}
                        </span>
                      )}
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