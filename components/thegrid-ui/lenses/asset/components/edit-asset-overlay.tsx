'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditAssetOverlayProps } from '../types';
import { EditAssetForm } from './edit-asset-form';

export function EditAssetOverlay({
  asset,
  triggerNode
}: EditAssetOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${asset?.name}`}
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <EditAssetForm
          asset={asset}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
