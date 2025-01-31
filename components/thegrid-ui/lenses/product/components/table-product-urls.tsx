'use client';

import { TableContainer } from '@/components/thegrid-ui/lenses/base/components/table-container';
import { UrlsTable } from '@/components/thegrid-ui/tables/urls-table';

interface TableProductUrlsProps {}

export function TableProductUrls({}: TableProductUrlsProps) {
  return (
    <TableContainer title="URLs">
      <UrlsTable />
    </TableContainer>
  );
}
