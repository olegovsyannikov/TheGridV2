'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditLensOverlayProps } from '../../base/types';
import { EditProductForm } from './edit-product-form';

export function EditProductOverlay({
  lensData,
  triggerNode
}: EditLensOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${lensData?.name}`}
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <EditProductForm
          lensData={lensData}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
