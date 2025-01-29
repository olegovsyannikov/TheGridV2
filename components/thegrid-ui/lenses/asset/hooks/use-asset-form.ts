import { toast } from '@/components/ui/use-toast';
import { useAssetsApi } from '@/lib/rest-api/assets';
import { ApiError, ApiResponse, useRestApiClient } from '@/lib/rest-api/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  generateDefaultValues,
  mapEntityToFormData,
  mapFormDataToEntity
} from '../../base/types';
import { assetFields } from '../schema';
import {
  AssetFormData,
  AssetMutationData,
  assetSchema,
  EditAssetFormProps
} from '../types';

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
  const queryClient = useQueryClient();
  const assetsApi = useAssetsApi(client);

  const defaultValues = {
    assets:
      props.mode === 'edit' && props.asset
        ? mapEntityToFormData(props.asset, assetFields)
        : generateDefaultValues(assetFields)
  };

  const form = useForm({
    resolver: zodResolver(assetSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const mutation = useMutation<ApiResponse, ApiError, AssetFormData>({
    mutationFn: async (data: AssetFormData) => {
      const assetData = mapFormDataToEntity<AssetMutationData>(
        data.assets,
        assetFields
      );

      if (props.mode === 'create') {
        if (!props.rootId) {
          throw new Error('rootId is required when creating a new asset');
        }
        return assetsApi.create({ ...assetData, rootId: props.rootId });
      } else {
        if (!props.asset?.id) {
          throw new Error('assetId is required when editing an asset');
        }
        return assetsApi.update({
          id: props.asset.id,
          ...assetData
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast({
        title: props.mode === 'create' ? 'Asset Created' : 'Asset Updated',
        description:
          props.mode === 'create'
            ? 'The asset has been created successfully.'
            : 'The asset has been updated successfully.'
      });
      props.onSuccess?.();
    }
  });

  return {
    form,
    isPending: mutation.isPending,
    error: mutation.error || undefined,
    onSubmit: mutation.mutate
  };
}
