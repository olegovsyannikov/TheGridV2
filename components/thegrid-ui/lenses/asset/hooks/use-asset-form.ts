import { useAssetsApi } from '@/lib/rest-api/assets';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useLensForm } from '../../base/hooks/use-lens-form';
import { EditLensFormProps, UseLensFormProps } from '../../base/types';
import { assetFields } from '../schema';
import { AssetFormData, assetSchema } from '../types';

export function useAssetForm(props: UseLensFormProps) {
  const client = useRestApiClient();
  const assetsApi = useAssetsApi(client);

  const config = {
    tableName: 'assets',
    queryKey: ['profile', props.rootId],
    schema: assetFields,
    zodSchema: assetSchema,
    createMessage: 'The asset has been created successfully.',
    updateMessage: 'The asset has been updated successfully.'
  };

  return useLensForm<AssetFormData, NonNullable<EditLensFormProps['lensData']>>(
    {
      ...props,
      entity: props.mode === 'edit' ? props.lensData : undefined,
      config,
      api: assetsApi
    }
  );
}
