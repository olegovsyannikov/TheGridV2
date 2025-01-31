import { useRestApiClient } from '@/lib/rest-api/client';
import { useProfileInfosApi } from '@/lib/rest-api/profileInfos';
import { useLensForm } from '../../base/hooks/use-lens-form';
import { EditLensFormProps, UseLensFormProps } from '../../base/types';
import { profileInfoFields } from '../schema';
import { ProfileInfoFormData, profileInfoSchema } from '../types';

export function useProfileInfoForm(props: UseLensFormProps) {
  const client = useRestApiClient();
  const profileInfosApi = useProfileInfosApi(client);

  const config = {
    tableName: 'profileInfos',
    queryKey: ['profile', props.rootId],
    schema: profileInfoFields,
    zodSchema: profileInfoSchema,
    createMessage: 'The profile has been created successfully.',
    updateMessage: 'The profile has been updated successfully.'
  };

  return useLensForm<
    ProfileInfoFormData,
    NonNullable<EditLensFormProps['lensData']>
  >({
    ...props,
    entity: props.mode === 'edit' ? props.lensData : undefined,
    config,
    api: profileInfosApi
  });
}
