'use client';

import { TableContainer } from '@/components/thegrid-ui/lenses/base/components/table-container';
import { RelatedAssetsTable } from '@/components/thegrid-ui/tables/related-assets-table';

interface TableProductRelatedAssetsProps {}

export function TableProductRelatedAssets({}: TableProductRelatedAssetsProps) {
  return (
    <TableContainer title="Related Assets">
      <RelatedAssetsTable />
    </TableContainer>
  );
}
