import { useAssetsApi } from '@/lib/rest-api/assets';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useLensForm } from '../../base/hooks/use-lens-form';
import { assetFields } from '../schema';
import { AssetFormData, assetSchema, EditAssetFormProps } from '../types';

interface BaseFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface CreateFormProps extends BaseFormProps {
  mode: 'create';
  rootId?: string;
}

interface EditFormProps extends BaseFormProps {
  mode: 'edit';
  asset?: EditAssetFormProps['asset'];
}

type UseAssetFormProps = CreateFormProps | EditFormProps;

export function useAssetForm(props: UseAssetFormProps) {
  const client = useRestApiClient();
  const assetsApi = useAssetsApi(client);

  const config = {
    tableName: 'assets',
    queryKey: ['assets'],
    schema: assetFields,
    zodSchema: assetSchema,
    createMessage: 'The asset has been created successfully.',
    updateMessage: 'The asset has been updated successfully.'
  };

  return useLensForm<AssetFormData, NonNullable<EditAssetFormProps['asset']>>({
    ...props,
    entity: props.mode === 'edit' ? props.asset : undefined,
    config,
    api: assetsApi
  });
}
