'use client';

import { LensForm } from '../../base/components/lens-form';
import { CreateLensFormProps } from '../../base/types';
import { useAssetForm } from '../hooks/use-asset-form';
import { AssetFormFields } from './asset-form-fields';

export function CreateAssetForm({
  rootId,
  onSuccess,
  onCancel
}: CreateLensFormProps) {
  const { form, isPending, error, onSubmit } = useAssetForm({
    mode: 'create',
    rootId: rootId || '',
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
