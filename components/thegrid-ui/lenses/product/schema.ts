import { SchemaDefinition } from '../base/types';

export const productFields: SchemaDefinition = {
  name: {
    tgsField: 'products.name',
    type: 'text',
    label: 'Product Name',
    placeholder: 'Enter product name...',
    required: true,
    minLength: 1
  },
  productType: {
    tgsField: 'products.productType',
    type: 'select',
    label: 'Product Type',
    placeholder: 'Select product type...'
  },
  description: {
    tgsField: 'products.description',
    type: 'textarea',
    label: 'Product Description',
    placeholder: 'Enter product description...',
    rows: 4
  },
  productStatus: {
    tgsField: 'products.productStatus',
    type: 'select',
    label: 'Product Status',
    placeholder: 'Select product status...'
  },
  isMainProduct: {
    tgsField: 'products.isMainProduct',
    type: 'boolean',
    label: 'Is Main Product',
    placeholder: 'Select if main product...',
    defaultValue: false
  },
  launchDate: {
    tgsField: 'products.launchDate',
    type: 'date',
    label: 'Launch Date',
    placeholder: 'Enter launch date...'
  }
};
