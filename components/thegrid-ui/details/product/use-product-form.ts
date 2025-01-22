'use client';

import { CProducts } from '@/lib/graphql/generated/graphql';
import { RestClient } from '@/lib/rest-api/client';
import { useProductsApi } from '@/lib/rest-api/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const FormSchema = z.object({
  'products.name': z.string().optional(),
  'products.productType': z.string().optional(),
  'products.description': z.string().optional(),
  'products.productStatus': z.string().optional(),
  'products.isMainProduct': z.string().optional(),
  'products.launchDate': z.string().optional()
});

type FormData = z.infer<typeof FormSchema>;

export const useProductForm = (client: RestClient, productId?: string) => {
  const queryClient = useQueryClient();
  const productsApi = useProductsApi(client);

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: async (data: FormData) => {
      const productData: Partial<CProducts> = {
        name: data['products.name'],
        productTypeId: data['products.productType'],
        description: data['products.description'],
        productStatusId: data['products.productStatus'],
        isMainProduct: data['products.isMainProduct'] === 'true' ? 1 : 0,
        launchDate: data['products.launchDate']
      };

      if (!productId) {
        return productsApi.create(productData);
      }

      return productsApi.update({
        id: productId,
        ...productData
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const handleSubmit = (
    data: FormData,
    options?: { onSuccess?: () => void }
  ) => {
    updateProduct(data, {
      onSuccess: () => {
        options?.onSuccess?.();
      }
    });
  };

  return {
    updateProduct: handleSubmit,
    isUpdating,
    FormSchema
  };
};
