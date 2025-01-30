'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { CreateLensOverlayProps } from '../../base/types';
import { CreateEntityForm } from './create-entity-form';

export function CreateEntityOverlay({
  rootId,
  triggerNode
}: CreateLensOverlayProps) {
  return (
    <ControlledOverlay
      title="Create Entity"
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <CreateEntityForm
          rootId={rootId}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
