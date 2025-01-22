'use client';

import { Button } from '@/components/ui/button';
import { DetailsContainer } from '@/components/ui/details-container';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useEffect, useState } from 'react';
import { ProductForm } from './product-form';
import { useProductForm } from './use-product-form';

type ProductDetailsProps = {
  product?: ProductFieldsFragmentFragment;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ProductDetails({
  product,
  trigger,
  open: controlledOpen,
  onOpenChange
}: ProductDetailsProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const client = useRestApiClient();
  const { updateProduct, isUpdating } = useProductForm(client, product?.id);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  useEffect(() => {
    console.log('ProductDetails state:', {
      open,
      controlledOpen,
      uncontrolledOpen,
      hasProduct: !!product,
      hasTrigger: !!trigger
    });
  }, [open, controlledOpen, uncontrolledOpen, product, trigger]);

  const handleOpenChange = (newOpen: boolean) => {
    console.log('ProductDetails: handleOpenChange', { newOpen });
    setOpen(newOpen);
  };

  return (
    <DetailsContainer
      title={product ? `Edit ${product.name}` : 'Create Product'}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      footer={
        <Button
          type="submit"
          disabled={isUpdating}
          onClick={() => formRef?.requestSubmit()}
        >
          {isUpdating ? 'Saving...' : 'Save'}
        </Button>
      }
    >
      <ProductForm
        product={product}
        formRef={setFormRef}
        onSubmit={data => {
          console.log('ProductDetails: form submitted', data);
          updateProduct(data, {
            onSuccess: () => {
              console.log('ProductDetails: update successful');
              setOpen(false);
            }
          });
        }}
      />
    </DetailsContainer>
  );
}
