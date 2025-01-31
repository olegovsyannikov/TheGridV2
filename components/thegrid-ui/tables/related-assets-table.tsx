'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { type ColumnDef } from '@tanstack/react-table';

interface RelatedAsset {
  id: string;
  asset: string;
  supportType: string;
}

const relatedAssets: RelatedAsset[] = [
  {
    id: '1',
    asset: 'SLN',
    supportType: 'Native'
  },
  {
    id: '2',
    asset: 'ETH',
    supportType: 'Memecoins'
  },
  {
    id: '3',
    asset: 'Other',
    supportType: 'Other'
  }
];

const columns: ColumnDef<RelatedAsset>[] = [
  {
    accessorKey: 'asset',
    header: 'Asset'
  },
  {
    accessorKey: 'supportType',
    header: 'Support Type'
  }
];

interface RelatedAssetsTableProps {}

export function RelatedAssetsTable({}: RelatedAssetsTableProps) {
  const table = useDataTable({
    data: relatedAssets,
    columns,
    pageCount: Math.ceil(relatedAssets.length / 10),
    initialState: {
      sorting: [{ id: 'asset', desc: false }],
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
