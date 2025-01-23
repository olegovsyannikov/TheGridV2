'use client';

import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditProductForm } from '../forms/product-form/edit-product-form';

type EditProductOverlayProps = {
  product?: ProductFieldsFragmentFragment;
  triggerNode?: React.ReactNode;
};

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
