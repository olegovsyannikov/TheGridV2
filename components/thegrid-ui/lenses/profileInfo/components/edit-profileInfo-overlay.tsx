'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditLensOverlayProps } from '../../base/types';
import { EditProfileInfoForm } from './edit-profileInfo-form';

export function EditProfileInfoOverlay({
  lensData,
  triggerNode
}: EditLensOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${lensData?.name}`}
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <EditProfileInfoForm
          lensData={lensData}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
