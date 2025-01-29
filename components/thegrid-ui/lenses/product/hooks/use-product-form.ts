import { useRestApiClient } from '@/lib/rest-api/client';
import { useProductsApi } from '@/lib/rest-api/products';
import { useLensForm } from '../../base/hooks/use-lens-form';
import { productFields } from '../schema';
import { EditProductFormProps, ProductFormData, productSchema } from '../types';

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
  product?: EditProductFormProps['product'];
}

type UseProductFormProps = CreateFormProps | EditFormProps;

export function useProductForm(props: UseProductFormProps) {
  const client = useRestApiClient();
  const productsApi = useProductsApi(client);

  const config = {
    tableName: 'products',
    queryKey: ['products'],
    schema: productFields,
    zodSchema: productSchema,
    createMessage: 'The product has been created successfully.',
    updateMessage: 'The product has been updated successfully.'
  };

  return useLensForm<
    ProductFormData,
    NonNullable<EditProductFormProps['product']>
  >({
    ...props,
    entity: props.mode === 'edit' ? props.product : undefined,
    config,
    api: productsApi
  });
}
