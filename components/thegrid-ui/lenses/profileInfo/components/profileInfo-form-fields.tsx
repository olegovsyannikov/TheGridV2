'use client';

import { TgsField } from '@/components/thegrid-ui/forms/fields/tgs-field';
import { profileInfoFields } from '../schema';

export function ProfileInfoFormFields() {
  return (
    <div className="flex flex-col gap-8">
      <TgsField
        label={profileInfoFields.name.label}
        placeholder={profileInfoFields.name.placeholder}
        tgsField={profileInfoFields.name.tgsField}
        isRequired={profileInfoFields.name.required}
      />
      <div className="flex flex-row gap-4">
        <TgsField
          label={profileInfoFields.profileType.label}
          placeholder={profileInfoFields.profileType.placeholder}
          tgsField={profileInfoFields.profileType.tgsField}
          isRequired={profileInfoFields.profileType.required}
        />
        <TgsField
          label={profileInfoFields.profileSector.label}
          placeholder={profileInfoFields.profileSector.placeholder}
          tgsField={profileInfoFields.profileSector.tgsField}
          isRequired={profileInfoFields.profileSector.required}
        />
      </div>
      <div className="flex flex-row gap-4">
        <TgsField
          label={profileInfoFields.profileStatus.label}
          placeholder={profileInfoFields.profileStatus.placeholder}
          tgsField={profileInfoFields.profileStatus.tgsField}
          isRequired={profileInfoFields.profileStatus.required}
        />
        <TgsField
          label={profileInfoFields.foundingDate.label}
          placeholder={profileInfoFields.foundingDate.placeholder}
          tgsField={profileInfoFields.foundingDate.tgsField}
          isRequired={profileInfoFields.foundingDate.required}
        />
      </div>
      <TgsField
        label={profileInfoFields.tagLine.label}
        placeholder={profileInfoFields.tagLine.placeholder}
        tgsField={profileInfoFields.tagLine.tgsField}
        isRequired={profileInfoFields.tagLine.required}
      />
      <TgsField
        label={profileInfoFields.descriptionShort.label}
        placeholder={profileInfoFields.descriptionShort.placeholder}
        tgsField={profileInfoFields.descriptionShort.tgsField}
        isRequired={profileInfoFields.descriptionShort.required}
      />
      <TgsField
        label={profileInfoFields.descriptionLong.label}
        placeholder={profileInfoFields.descriptionLong.placeholder}
        tgsField={profileInfoFields.descriptionLong.tgsField}
        isRequired={profileInfoFields.descriptionLong.required}
      />
      <TgsField
        label={profileInfoFields.logo.label}
        placeholder={profileInfoFields.logo.placeholder}
        tgsField={profileInfoFields.logo.tgsField}
        isRequired={profileInfoFields.logo.required}
      />
    </div>
  );
}
