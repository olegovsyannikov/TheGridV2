'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { CreateProductOverlayProps } from '../types';
import { CreateProductForm } from './create-product-form';

export function CreateProductOverlay({
  rootId,
  triggerNode
}: CreateProductOverlayProps) {
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
