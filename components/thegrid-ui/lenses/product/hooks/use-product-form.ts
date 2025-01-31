import { useRestApiClient } from '@/lib/rest-api/client';
import { useProductsApi } from '@/lib/rest-api/products';
import { useLensForm } from '../../base/hooks/use-lens-form';
import { EditLensFormProps, UseLensFormProps } from '../../base/types';
import { productFields } from '../schema';
import { ProductFormData, productSchema } from '../types';

export function useProductForm(props: UseLensFormProps) {
  const client = useRestApiClient();
  const productsApi = useProductsApi(client);

  const config = {
    tableName: 'products',
    queryKey: ['profile', props.rootId],
    schema: productFields,
    zodSchema: productSchema,
    createMessage: 'The product has been created successfully.',
    updateMessage: 'The product has been updated successfully.'
  };

  return useLensForm<
    ProductFormData,
    NonNullable<EditLensFormProps['lensData']>
  >({
    ...props,
    entity: props.mode === 'edit' ? props.lensData : undefined,
    config,
    api: productsApi
  });
}
