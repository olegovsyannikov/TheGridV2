'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  CProducts,
  ProductFieldsFragmentFragment
} from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { ProductFormFields } from './product-form-fields';
import { ControlledForm } from '../../../ui/controlled-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UseFormProps } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProductsApi } from '@/lib/rest-api/products';

const dataSchema = z.object({
  products: z.object({
    name: z.string().min(1, 'Product name is required'),
    productType: z.string().optional(),
    description: z.string().optional(),
    productStatus: z.string().optional(),
    isMainProduct: z.string().optional(),
    launchDate: z.string().optional()
  })
});

type FormData = z.infer<typeof dataSchema>;

type CreateProductFormProps = {
  rootId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function CreateProductForm({
  rootId,
  onSuccess,
  onCancel
}: CreateProductFormProps) {
  const client = useRestApiClient();
  const queryClient = useQueryClient();
  const productsApi = useProductsApi(client);
  const { mutate: updateProduct } = useMutation({
    mutationFn: async (data: FormData) => {
      const productData: Partial<CProducts> = {
        name: data.products.name,
        productTypeId: data.products.productType,
        description: data.products.description,
        productStatusId: data.products.productStatus,
        isMainProduct: data.products.isMainProduct === 'true' ? 1 : 0,
        launchDate: data.products.launchDate || ''
      };

      if (!rootId) {
        throw new Error('rootId is required when creating a new product');
      }

      return productsApi.create({ ...productData, rootId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product Created',
        description: 'The product has been created successfully.'
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      throw new Error(error);
    }
  });

  const formDefinition: UseFormProps = {
    resolver: zodResolver(dataSchema),
    defaultValues: {
      products: {
        name: '',
        productType: '',
        description: '',
        productStatus: '',
        isMainProduct: 'false',
        launchDate: ''
      }
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  };

  return (
    <ControlledForm
      formDefinition={formDefinition}
      onSubmit={async data => updateProduct(data)}
      renderFooter={({ isLoading }) => (
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Create Product'}
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => onCancel?.()}
          >
            Cancel
          </Button>
        </div>
      )}
    >
      <ProductFormFields />
    </ControlledForm>
  );
}
