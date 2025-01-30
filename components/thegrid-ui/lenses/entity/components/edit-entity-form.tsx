'use client';

import { LensForm } from '../../base/components/lens-form';
import { EditLensFormProps } from '../../base/types';
import { useEntityForm } from '../hooks/use-entity-form';
import { EntityFormFields } from './entity-form-fields';

export function EditEntityForm({
  lensData,
  onSuccess,
  onCancel
}: EditLensFormProps) {
  const { form, isPending, error, onSubmit } = useEntityForm({
    mode: 'edit',
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
      <EntityFormFields />
    </LensForm>
  );
}
