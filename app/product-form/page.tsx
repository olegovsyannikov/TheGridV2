'use client';

import { ProductForm } from '@/components/thegrid-ui/details/product/product-form';

export default function Page() {
  return (
    <main className="w-full">
      <ProductForm
        onSubmit={data => {
          console.log(data);
          alert('success, check console');
        }}
      />
    </main>
  );
}
