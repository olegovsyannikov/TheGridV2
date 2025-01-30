import { Pickaxe, Square } from 'lucide-react';

export const dataTableConfig = {
  sortOrders: [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' }
  ],
  featureFlags: [
    {
      label: 'Advanced table',
      value: 'advancedTable',
      icon: Pickaxe,
      tooltipTitle: 'Toggle advanced table',
      tooltipDescription: 'A filter and sort builder to filter and sort rows.'
    },
    {
      label: 'Floating bar',
      value: 'floatingBar',
      icon: Square,
      tooltipTitle: 'Toggle floating bar',
      tooltipDescription: 'A floating bar that sticks to the top of the table.'
    }
  ],
  textOperators: [
    { label: 'Contains', value: 'contains' },
    { label: 'Does not contain', value: 'notContains' },
    { label: 'Is', value: 'equals' },
    { label: 'Is not', value: 'notEquals' },
    { label: 'Is empty', value: 'isEmpty' },
    { label: 'Is not empty', value: 'isNotEmpty' }
  ],
  numericOperators: [
    { label: 'Is', value: 'equals' },
    { label: 'Is not', value: 'notEquals' },
    { label: 'Is less than', value: 'lessThan' },
    { label: 'Is less than or equal to', value: 'lessThanOrEqual' },
    { label: 'Is greater than', value: 'greaterThan' },
    { label: 'Is greater than or equal to', value: 'greaterThanOrEqual' },
    { label: 'Is empty', value: 'isEmpty' },
    { label: 'Is not empty', value: 'isNotEmpty' }
  ],
  dateOperators: [
    { label: 'Is', value: 'equals' },
    { label: 'Is not', value: 'notEquals' },
    { label: 'Is before', value: 'lessThan' },
    { label: 'Is after', value: 'greaterThan' },
    { label: 'Is on or before', value: 'lessThanOrEqual' },
    { label: 'Is on or after', value: 'greaterThanOrEqual' },
    { label: 'Is between', value: 'between' },
    { label: 'Is empty', value: 'isEmpty' },
    { label: 'Is not empty', value: 'isNotEmpty' }
  ],
  selectOperators: [
    { label: 'Is', value: 'equals' },
    { label: 'Is not', value: 'notEquals' },
    { label: 'Is empty', value: 'isEmpty' },
    { label: 'Is not empty', value: 'isNotEmpty' }
  ],
  booleanOperators: [
    { label: 'Is', value: 'equals' },
    { label: 'Is not', value: 'notEquals' }
  ],
  joinOperators: [
    { label: 'And', value: 'and' },
    { label: 'Or', value: 'or' }
  ]
} as const;

export type DataTableConfig = typeof dataTableConfig;

export type ColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'boolean'
  | 'select'
  | 'multi-select';

export type FilterOperator =
  | 'contains'
  | 'notContains'
  | 'equals'
  | 'notEquals'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'between'
  | 'isEmpty'
  | 'isNotEmpty';

export type JoinOperator = 'and' | 'or';
