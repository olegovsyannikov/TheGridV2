'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { type ColumnDef } from '@tanstack/react-table';

interface Deployment {
  id: string;
  deploymentType: string;
  deployedOn: string;
  isOfStandard: string;
}

const deployments: Deployment[] = [
  {
    id: '1',
    deploymentType: 'Mint',
    deployedOn: 'Solana',
    isOfStandard: 'ERC-721'
  },
  {
    id: '2',
    deploymentType: 'Native',
    deployedOn: 'Ethereum',
    isOfStandard: 'ERC-20'
  },
  {
    id: '3',
    deploymentType: 'Other',
    deployedOn: 'Other',
    isOfStandard: 'Other'
  }
];

const columns: ColumnDef<Deployment>[] = [
  {
    accessorKey: 'deploymentType',
    header: 'Deployment Type'
  },
  {
    accessorKey: 'deployedOn',
    header: 'Deployed On'
  },
  {
    accessorKey: 'isOfStandard',
    header: 'Is Of Standard'
  }
];

interface DeploymentsTableProps {}

export function DeploymentsTable({}: DeploymentsTableProps) {
  const table = useDataTable({
    data: deployments,
    columns,
    pageCount: Math.ceil(deployments.length / 10),
    initialState: {
      sorting: [{ id: 'deployedOn', desc: false }],
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    }
  });

  return (
    <div className="space-y-4">
      <DataTable table={table} />
    </div>
  );
}
