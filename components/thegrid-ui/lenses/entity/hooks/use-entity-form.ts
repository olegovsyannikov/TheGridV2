import { useRestApiClient } from '@/lib/rest-api/client';
import { useEntitiesApi } from '@/lib/rest-api/entities';
import { useLensForm } from '../../base/hooks/use-lens-form';
import { EditLensFormProps, UseLensFormProps } from '../../base/types';
import { entityFields } from '../schema';
import { EntityFormData, entitySchema } from '../types';

export function useEntityForm(props: UseLensFormProps) {
  const client = useRestApiClient();
  const entitiesApi = useEntitiesApi(client);

  const config = {
    tableName: 'entities',
    queryKey: ['profile', props.rootId],
    schema: entityFields,
    zodSchema: entitySchema,
    createMessage: 'The entity has been created successfully.',
    updateMessage: 'The entity has been updated successfully.'
  };

  return useLensForm<
    EntityFormData,
    NonNullable<EditLensFormProps['lensData']>
  >({
    ...props,
    entity: props.mode === 'edit' ? props.lensData : undefined,
    config,
    api: entitiesApi
  });
}
