'use client';

import { LensForm } from '../../base/components/lens-form';
import { CreateLensFormProps } from '../../base/types';
import { useEntityForm } from '../hooks/use-entity-form';
import { EntityFormFields } from './entity-form-fields';

export function CreateEntityForm({
  rootId,
  onSuccess,
  onCancel
}: CreateLensFormProps) {
  const { form, isPending, error, onSubmit } = useEntityForm({
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
      submitLabel="Create Entity"
    >
      <EntityFormFields />
    </LensForm>
  );
}
