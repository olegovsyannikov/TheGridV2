'use client';

import { LensForm } from '../../base/components/lens-form';
import { EditLensFormProps } from '../../base/types';
import { useProductForm } from '../hooks/use-product-form';
import { ProductFormFields } from './product-form-fields';

export function EditProductForm({
  lensData,
  onSuccess,
  onCancel
}: EditLensFormProps) {
  const { form, isPending, error, onSubmit } = useProductForm({
    mode: 'edit',
    rootId: lensData?.rootId || '',
    lensData,
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
