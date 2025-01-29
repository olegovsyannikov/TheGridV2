'use client';

import { LensForm } from '../../base/components/lens-form';
import { useAssetForm } from '../hooks/use-asset-form';
import { EditAssetFormProps } from '../types';
import { AssetFormFields } from './asset-form-fields';

export function EditAssetForm({
  asset,
  onSuccess,
  onCancel
}: EditAssetFormProps) {
  const { form, isPending, error, onSubmit } = useAssetForm({
    mode: 'edit',
    asset,
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
      <AssetFormFields />
    </LensForm>
  );
}
