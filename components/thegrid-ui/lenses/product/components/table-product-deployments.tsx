'use client';

import { TableContainer } from '@/components/thegrid-ui/lenses/base/components/table-container';
import { DeploymentsTable } from '@/components/thegrid-ui/tables/deployments-table';

interface TableProductDeploymentsProps {}

export function TableProductDeployments({}: TableProductDeploymentsProps) {
  return (
    <TableContainer title="Product Deployments">
      <DeploymentsTable />
    </TableContainer>
  );
}
