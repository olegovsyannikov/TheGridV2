'use client';

import { LensForm } from '../../base/components/lens-form';
import { useProductForm } from '../hooks/use-product-form';
import { CreateProductFormProps } from '../types';
import { ProductFormFields } from './product-form-fields';

export function CreateProductForm({
  rootId,
  onSuccess,
  onCancel
}: CreateProductFormProps) {
  const { form, isPending, error, onSubmit } = useProductForm({
    mode: 'create',
    rootId,
    onSuccess,
    onCancel
  });

  return (
    <LensForm
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      error={error}
      submitLabel="Create Product"
    >
      <ProductFormFields />
    </LensForm>
  );
}
