'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditLensOverlayProps } from '../../base/types';
import { EditAssetForm } from './edit-asset-form';

export function EditAssetOverlay({
  lensData,
  triggerNode
}: EditLensOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${lensData?.name}`}
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <EditAssetForm
          lensData={lensData}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
