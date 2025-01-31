'use client';

import { LensForm } from '../../base/components/lens-form';
import { EditLensFormProps } from '../../base/types';
import { useAssetForm } from '../hooks/use-asset-form';
import { AssetFormFields } from './asset-form-fields';

export function EditAssetForm({
  lensData,
  onSuccess,
  onCancel
}: EditLensFormProps) {
  const { form, isPending, error, onSubmit } = useAssetForm({
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
      <AssetFormFields />
    </LensForm>
  );
}
