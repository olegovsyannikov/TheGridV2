import { SchemaDefinition } from '../base/types';

export const profileInfoFields: SchemaDefinition = {
  name: {
    tgsField: 'profileInfos.name',
    type: 'text',
    label: 'Profile Name',
    placeholder: 'Enter product name...',
    required: true,
    minLength: 1
  },
  profileType: {
    tgsField: 'profileInfos.profileType',
    type: 'select',
    label: 'Profile Type',
    placeholder: 'Select profile type...'
  },
  profileStatus: {
    tgsField: 'profileInfos.profileStatus',
    type: 'select',
    label: 'Profile Status',
    placeholder: 'Select profile status...'
  },
  profileSector: {
    tgsField: 'profileInfos.profileSector',
    type: 'select',
    label: 'Profile Sector',
    placeholder: 'Select profile sector...'
  },
  descriptionShort: {
    tgsField: 'profileInfos.descriptionShort',
    type: 'textarea',
    label: 'Short Description',
    placeholder: 'Enter profile description...',
    rows: 4
  },
  descriptionLong: {
    tgsField: 'profileInfos.descriptionLong',
    type: 'textarea',
    label: 'Long Description',
    placeholder: 'Enter profile description...',
    rows: 4
  },
  tagLine: {
    tgsField: 'profileInfos.tagLine',
    type: 'text',
    label: 'Tag Line',
    placeholder: 'Enter tag line...'
  },
  foundingDate: {
    tgsField: 'profileInfos.foundingDate',
    type: 'date',
    label: 'Founding Date',
    placeholder: 'Enter founding date...'
  }
};
