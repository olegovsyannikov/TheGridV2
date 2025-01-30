'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { CreateLensOverlayProps } from '../../base/types';
import { CreateAssetForm } from './create-asset-form';

export function CreateAssetOverlay({
  rootId,
  triggerNode
}: CreateLensOverlayProps) {
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
