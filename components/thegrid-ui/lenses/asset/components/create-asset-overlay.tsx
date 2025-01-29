'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { CreateAssetOverlayProps } from '../types';
import { CreateAssetForm } from './create-asset-form';

export function CreateAssetOverlay({
  rootId,
  triggerNode
}: CreateAssetOverlayProps) {
  return (
    <ControlledOverlay
      title="Create Asset"
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <CreateAssetForm
          rootId={rootId}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
