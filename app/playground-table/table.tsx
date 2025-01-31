'use client';

import * as React from 'react';
import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction
} from '@/components/thegrid-ui/data-table/types';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { DataTableToolbar } from '@/components/thegrid-ui/data-table/data-table-toolbar';
import { type ColumnDef } from '@tanstack/react-table';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
  createdAt: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Create new landing page',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-02-01',
    assignee: 'John Doe',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Fix login bug',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-02-15',
    assignee: 'Jane Smith',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    title: 'Update documentation',
    status: 'done',
    priority: 'low',
    dueDate: '2024-01-30',
    assignee: 'Bob Wilson',
    createdAt: '2024-01-14'
  }
];

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'priority',
    header: 'Priority'
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date'
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee'
  }
];

interface TasksTableProps {}

export function TasksTable({}: TasksTableProps) {
  const filterFields: DataTableFilterField<Task>[] = [
    {
      id: 'title',
      label: 'Title',
      placeholder: 'Filter titles...'
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'Todo', value: 'todo' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Done', value: 'done' }
      ]
    },
    {
      id: 'priority',
      label: 'Priority',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' }
      ]
    }
  ];

  const table = useDataTable({
    data: tasks,
    columns,
    pageCount: Math.ceil(tasks.length / 10),
    filterFields,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    }
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} filterFields={filterFields} />
      <DataTable table={table} />
    </div>
  );
}
