'use client';

import { toast } from '@/components/ui/use-toast';
import { CProducts } from '@/lib/graphql/generated/graphql';
import { RestClient } from '@/lib/rest-api/client';
import { useProductsApi } from '@/lib/rest-api/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const FormSchema = z.object({
  'products.name': z.string().min(1, 'Product name is required'),
  'products.productType': z.string().optional(),
  'products.description': z.string().optional(),
  'products.productStatus': z.string().optional(),
  'products.isMainProduct': z.string().optional(),
  'products.launchDate': z.string().optional()
});

type FormData = z.infer<typeof FormSchema>;

export const useProductForm = (
  client: RestClient,
  productId?: string,
  rootId?: string
) => {
  const queryClient = useQueryClient();
  const productsApi = useProductsApi(client);

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: async (data: FormData) => {
      if (!data['products.name']) {
        throw new Error('Product name is required');
      }

      const productData: Partial<CProducts> = {
        name: data['products.name'],
        productTypeId: data['products.productType'],
        description: data['products.description'],
        productStatusId: data['products.productStatus'],
        isMainProduct: data['products.isMainProduct'] === 'true' ? 1 : 0,
        launchDate: data['products.launchDate'] || ''
      };

      if (!productId) {
        if (!rootId) {
          throw new Error('rootId is required when creating a new product');
        }
        return productsApi.create({ ...productData, rootId });
      }

      return productsApi.update({
        id: productId,
        ...productData
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message
      });
    }
  });

  const handleSubmit = (
    data: FormData,
    options?: { onSuccess?: () => void; onError?: (error: any) => void }
  ) => {
    updateProduct(data, {
      onSuccess: () => {
        options?.onSuccess?.();
      },
      onError: error => {
        options?.onError?.(error);
      }
    });
  };

  return {
    updateProduct: handleSubmit,
    isUpdating,
    FormSchema
  };
};
