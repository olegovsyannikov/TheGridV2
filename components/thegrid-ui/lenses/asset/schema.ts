import { SchemaDefinition } from '../base/types';

export const assetFields: SchemaDefinition = {
  name: {
    type: 'text',
    label: 'Asset Name',
    placeholder: 'Enter asset name...',
    required: true,
    minLength: 1,
    tgsField: 'assets.name'
  },
  ticker: {
    type: 'text',
    label: 'Asset Ticker',
    placeholder: 'Enter asset ticker...',
    required: true,
    tgsField: 'assets.ticker'
  },
  description: {
    type: 'textarea',
    label: 'Asset Description',
    placeholder: 'Enter asset description...',
    rows: 4,
    tgsField: 'assets.shortDescription'
  },
  assetType: {
    type: 'select',
    label: 'Asset Type',
    placeholder: 'Select asset type...',
    tgsField: 'assets.assetTypes'
  },
  assetStatus: {
    type: 'select',
    label: 'Asset Status',
    placeholder: 'Select asset status...',
    tgsField: 'assets.assetStatus'
  }
};
