'use client';

import { LensForm } from '../../base/components/lens-form';
import { useAssetForm } from '../hooks/use-asset-form';
import { CreateAssetFormProps } from '../types';
import { AssetFormFields } from './asset-form-fields';

export function CreateAssetForm({
  rootId,
  onSuccess,
  onCancel
}: CreateAssetFormProps) {
  const { form, isPending, error, onSubmit } = useAssetForm({
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
      submitLabel="Create Asset"
    >
      <AssetFormFields />
    </LensForm>
  );
}
