import { SchemaDefinition } from '../base/types';

export const entityFields: SchemaDefinition = {
  name: {
    type: 'text',
    label: 'Entity Name',
    placeholder: 'Enter entity name...',
    required: true,
    minLength: 1,
    tgsField: 'entities.name'
  },
  tradeName: {
    type: 'text',
    label: 'Trade Name',
    tgsField: 'entities.tradeName'
  },
  entityType: {
    type: 'select',
    label: 'Entity Type',
    tgsField: 'entities.entityTypes'
  },
  country: {
    type: 'select',
    label: 'Country',
    tgsField: 'entities.country'
  },
  address: {
    type: 'text',
    label: 'Address',
    tgsField: 'entities.address'
  },
  taxIdentificationNumber: {
    type: 'text',
    label: 'Tax Identification Number',
    tgsField: 'entities.taxIdentificationNumber'
  },
  localRegistrationNumber: {
    type: 'text',
    label: 'Local Registration Number',
    tgsField: 'entities.localRegistrationNumber'
  },
  leiNumber: {
    type: 'text',
    label: 'LEI Number',
    tgsField: 'entities.leiNumber'
  },
  dateOfIncorporation: {
    type: 'date',
    label: 'Date of Incorporation',
    tgsField: 'entities.dateOfIncorporation'
  }
};
