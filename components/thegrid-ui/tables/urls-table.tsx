'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { type ColumnDef } from '@tanstack/react-table';

interface Url {
  id: string;
  url: string;
  urlType: 'landing_page' | 'product_page' | 'other';
}

const urls: Url[] = [
  {
    id: '1',
    url: 'https://www.bitconin.com',
    urlType: 'landing_page'
  },
  {
    id: '2',
    url: 'https://www.etheremum.com',
    urlType: 'product_page'
  },
  {
    id: '3',
    url: 'https://www.solyana.com',
    urlType: 'other'
  }
];

const columns: ColumnDef<Url>[] = [
  {
    accessorKey: 'url',
    header: 'Url'
  },
  {
    accessorKey: 'urlType',
    header: 'Url Type'
  }
];

interface UrlsTableProps {}

export function UrlsTable({}: UrlsTableProps) {
  const table = useDataTable({
    data: urls,
    columns,
    pageCount: Math.ceil(urls.length / 10),
    initialState: {
      sorting: [{ id: 'url', desc: false }],
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
