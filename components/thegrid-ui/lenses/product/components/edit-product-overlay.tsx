'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditLensOverlayProps } from '../../base/types';
import { EditProductForm } from './edit-product-form';
import { TableProductDeployments } from './table-product-deployments';
import { TableProductUrls } from './table-product-urls';
import { TableProductRelatedAssets } from './table-related-assets';

export function EditProductOverlay({
  lensData,
  triggerNode
}: EditLensOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${lensData?.name}`}
      size="full"
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <div className="flex flex-row gap-16 [&>*:nth-child(1)]:w-1/3 [&>*:nth-child(2)]:w-2/3">
          <EditProductForm
            lensData={lensData}
            onSuccess={closeDialog}
            onCancel={closeDialog}
          />
          <div className="flex flex-col gap-12">
            <TableProductUrls />
            <TableProductDeployments />
            <TableProductRelatedAssets />
          </div>
        </div>
      )}
    />
  );
}
