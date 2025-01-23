'use client';

import { Form } from '@/components/ui/form';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TgsField } from '../../forms/fields/tgs-field';

const FormSchema = z.object({
  'products.name': z.string().min(1, 'Product name is required'),
  'products.productType': z.string().optional(),
  'products.description': z.string().optional(),
  'products.productStatus': z.string().optional(),
  'products.isMainProduct': z.string().optional(),
  'products.launchDate': z.string().optional()
});

type ProductFormProps = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  product?: ProductFieldsFragmentFragment;
  formRef?: Dispatch<SetStateAction<HTMLFormElement | null>>;
};

export function ProductForm({ onSubmit, product, formRef }: ProductFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      'products.name': product?.name ?? '',
      'products.productType': product?.productType?.id ?? '',
      'products.description': product?.description ?? '',
      'products.productStatus': product?.productStatus?.id ?? '',
      'products.isMainProduct': product?.isMainProduct ? 'true' : 'false',
      'products.launchDate': product?.launchDate ?? ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  function onError(errors: any) {
    console.error('Form validation failed:', errors);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-8">
          <TgsField
            label="Product Name"
            placeholder="Enter product name..."
            tgsField="products.name"
          />
          <div className="flex flex-row gap-4">
            <TgsField
              label="Product Type"
              placeholder="Select product type..."
              tgsField="products.productType"
            />
            <TgsField
              label="Product Status"
              placeholder="Select product status..."
              tgsField="products.productStatus"
            />
          </div>
          <TgsField
            label="Product Description"
            placeholder="Enter product description..."
            tgsField="products.description"
          />
          <div className="flex flex-row gap-4">
            <TgsField
              label="Launch Date"
              placeholder="Enter launch date..."
              tgsField="products.launchDate"
            />
            <TgsField
              label="Is Main Product"
              placeholder="Select if main product..."
              tgsField="products.isMainProduct"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
