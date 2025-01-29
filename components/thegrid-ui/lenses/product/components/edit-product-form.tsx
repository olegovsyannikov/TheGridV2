'use client';

import { LensForm } from '../../base/components/lens-form';
import { useProductForm } from '../hooks/use-product-form';
import { EditProductFormProps } from '../types';
import { ProductFormFields } from './product-form-fields';

export function EditProductForm({
  product,
  onSuccess,
  onCancel
}: EditProductFormProps) {
  const { form, isPending, error, onSubmit } = useProductForm({
    mode: 'edit',
    product,
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
      submitLabel="Save Changes"
    >
      <ProductFormFields />
    </LensForm>
  );
}
