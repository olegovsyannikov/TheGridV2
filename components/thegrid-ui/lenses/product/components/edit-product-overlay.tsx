'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditProductOverlayProps } from '../types';
import { EditProductForm } from './edit-product-form';

export function EditProductOverlay({
  product,
  triggerNode
}: EditProductOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${product?.name}`}
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <EditProductForm
          product={product}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
