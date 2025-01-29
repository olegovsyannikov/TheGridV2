'use client';

import { TgsField } from '@/components/thegrid-ui/forms/fields/tgs-field';
import { assetFields } from '../schema';

export function AssetFormFields() {
  return (
    <div className="flex flex-col gap-8">
      <TgsField
        label={assetFields.name.label}
        placeholder={assetFields.name.placeholder}
        tgsField={assetFields.name.tgsField}
      />
      <TgsField
        label={assetFields.ticker.label}
        placeholder={assetFields.ticker.placeholder}
        tgsField={assetFields.ticker.tgsField}
      />
      <div className="flex flex-row gap-4">
        <TgsField
          label={assetFields.assetType.label}
          placeholder={assetFields.assetType.placeholder}
          tgsField={assetFields.assetType.tgsField}
        />
        <TgsField
          label={assetFields.assetStatus.label}
          placeholder={assetFields.assetStatus.placeholder}
          tgsField={assetFields.assetStatus.tgsField}
        />
      </div>
      <TgsField
        label={assetFields.description.label}
        placeholder={assetFields.description.placeholder}
        tgsField={assetFields.description.tgsField}
      />
    </div>
  );
}
