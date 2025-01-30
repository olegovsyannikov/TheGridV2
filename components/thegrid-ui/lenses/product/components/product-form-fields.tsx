'use client';

import { TgsField } from '@/components/thegrid-ui/forms/fields/tgs-field';
import { productFields } from '../schema';

export function ProductFormFields() {
  return (
    <div className="flex flex-col gap-8">
      <TgsField
        label={productFields.name.label}
        placeholder={productFields.name.placeholder}
        tgsField={productFields.name.tgsField}
        isRequired={productFields.name.required}
      />
      <div className="flex flex-row gap-4">
        <TgsField
          label={productFields.productType.label}
          placeholder={productFields.productType.placeholder}
          tgsField={productFields.productType.tgsField}
          isRequired={productFields.productType.required}
        />
        <TgsField
          label={productFields.productStatus.label}
          placeholder={productFields.productStatus.placeholder}
          tgsField={productFields.productStatus.tgsField}
          isRequired={productFields.productStatus.required}
        />
      </div>
      <TgsField
        label={productFields.description.label}
        placeholder={productFields.description.placeholder}
        tgsField={productFields.description.tgsField}
        isRequired={productFields.description.required}
      />
      <div className="flex flex-row gap-4">
        <TgsField
          label={productFields.launchDate.label}
          placeholder={productFields.launchDate.placeholder}
          tgsField={productFields.launchDate.tgsField}
          isRequired={productFields.launchDate.required}
        />
        <TgsField
          label={productFields.isMainProduct.label}
          placeholder={productFields.isMainProduct.placeholder}
          tgsField={productFields.isMainProduct.tgsField}
          isRequired={productFields.isMainProduct.required}
        />
      </div>
    </div>
  );
}
