'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { CreateLensOverlayProps } from '../../base/types';
import { CreateProductForm } from './create-product-form';

export function CreateProductOverlay({
  rootId,
  triggerNode
}: CreateLensOverlayProps) {
  return (
    <ControlledOverlay
      title="Create product"
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <CreateProductForm
          rootId={rootId}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
