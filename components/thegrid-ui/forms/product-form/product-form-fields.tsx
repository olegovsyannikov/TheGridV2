'use client';

import { TgsField } from '../fields/tgs-field';

export function ProductFormFields() {
  return (
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
  );
}
