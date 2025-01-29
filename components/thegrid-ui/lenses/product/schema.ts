import { SchemaDefinition } from '../base/types';

export const productFields: SchemaDefinition = {
  name: {
    type: 'text',
    label: 'Product Name',
    placeholder: 'Enter product name...',
    required: true,
    minLength: 1
  },
  productType: {
    type: 'select',
    label: 'Product Type',
    placeholder: 'Select product type...',
    tgsField: 'products.productType'
  },
  description: {
    type: 'textarea',
    label: 'Product Description',
    placeholder: 'Enter product description...',
    rows: 4
  },
  productStatus: {
    type: 'select',
    label: 'Product Status',
    placeholder: 'Select product status...',
    tgsField: 'products.productStatus'
  },
  isMainProduct: {
    type: 'boolean',
    label: 'Is Main Product',
    placeholder: 'Select if main product...',
    defaultValue: false,
    tgsField: 'products.isMainProduct'
  },
  launchDate: {
    type: 'date',
    label: 'Launch Date',
    placeholder: 'Enter launch date...'
  }
};
