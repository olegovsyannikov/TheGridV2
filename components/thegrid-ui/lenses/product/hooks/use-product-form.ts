import { toast } from '@/components/ui/use-toast';
import { ApiError, ApiResponse, useRestApiClient } from '@/lib/rest-api/client';
import { useProductsApi } from '@/lib/rest-api/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  generateDefaultValues,
  mapEntityToFormData,
  mapFormDataToEntity
} from '../../base/types';
import { productFields } from '../schema';
import {
  EditProductFormProps,
  ProductFormData,
  ProductMutationData,
  productSchema
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
  product?: EditProductFormProps['product'];
}

type UseProductFormProps = CreateFormProps | EditFormProps;

export function useProductForm(props: UseProductFormProps) {
  const client = useRestApiClient();
  const queryClient = useQueryClient();
  const productsApi = useProductsApi(client);

  const defaultValues = {
    products:
      props.mode === 'edit' && props.product
        ? mapEntityToFormData(props.product, productFields)
        : generateDefaultValues(productFields)
  };

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const mutation = useMutation<ApiResponse, ApiError, ProductFormData>({
    mutationFn: async (data: ProductFormData) => {
      const productData = mapFormDataToEntity<ProductMutationData>(
        data.products,
        productFields
      );

      if (props.mode === 'create') {
        if (!props.rootId) {
          throw new Error('rootId is required when creating a new product');
        }
        return productsApi.create({ ...productData, rootId: props.rootId });
      } else {
        if (!props.product?.id) {
          throw new Error('productId is required when editing a product');
        }
        return productsApi.update({
          id: props.product.id,
          ...productData
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: props.mode === 'create' ? 'Product Created' : 'Product Updated',
        description:
          props.mode === 'create'
            ? 'The product has been created successfully.'
            : 'The product has been updated successfully.'
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
