'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditLensOverlayProps } from '../../base/types';
import { EditEntityForm } from './edit-entity-form';

export function EditEntityOverlay({
  lensData,
  triggerNode
}: EditLensOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${lensData?.name}`}
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <EditEntityForm
          lensData={lensData}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
