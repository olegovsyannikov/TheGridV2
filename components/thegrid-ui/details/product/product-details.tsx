'use client';

import { Button } from '@/components/ui/button';
import { DetailsContainer } from '@/components/ui/details-container';
import { useToast } from '@/components/ui/use-toast';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useState } from 'react';
import { ProductForm } from './product-form';
import { useProductForm } from './use-product-form';

type ProductDetailsProps = {
  product?: ProductFieldsFragmentFragment;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  rootId?: string;
};

export function ProductDetails({
  product,
  trigger,
  open: controlledOpen,
  onOpenChange,
  rootId
}: ProductDetailsProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const client = useRestApiClient();
  const { updateProduct, isUpdating } = useProductForm(client, product?.id, rootId);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  const { toast } = useToast();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const handleSubmit = async (data: any) => {
    if (!rootId && !product) {
      toast({
        title: 'Error',
        description: 'Root ID is required to create a product',
        variant: 'destructive'
      });
      return;
    }

    updateProduct(data, {
      onSuccess: () => {
        toast({
          title: product ? 'Product Updated' : 'Product Created',
          description: product
            ? 'The product has been updated successfully.'
            : 'The new product has been created successfully.'
        });
        setOpen(false);
      }
    });
  };

  return (
    <DetailsContainer
      title={product ? `Edit ${product.name}` : 'Create Product'}
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      footer={
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isUpdating}
            onClick={() => formRef?.requestSubmit()}
          >
            {isUpdating ? 'Saving...' : product ? 'Save Changes' : 'Create Product'}
          </Button>
          <Button
            variant="outline"
            disabled={isUpdating}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <ProductForm
        product={product}
        formRef={setFormRef}
        onSubmit={handleSubmit}
      />
    </DetailsContainer>
  );
}
