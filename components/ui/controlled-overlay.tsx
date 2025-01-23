import { ReactNode, useState } from 'react';
import { PolymorphicOverlay } from './polymorphic-overlay';

export type ControlledOverlayProps = {
  title: string;
  triggerNode: ReactNode;
  render: (props: { closeDialog: () => void }) => ReactNode;
  className?: string;
};

export function ControlledOverlay({
  triggerNode,
  render,
  title
}: ControlledOverlayProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const closeDialog = () => {
    setIsOverlayOpen(false);
  };

  const toggleDialog = (value: boolean) => {
    setIsOverlayOpen(value);
  };

  return (
    <PolymorphicOverlay
      title={title}
      onOpenChange={toggleDialog}
      open={isOverlayOpen}
      triggerNode={triggerNode}
    >
      {render({ closeDialog })}
    </PolymorphicOverlay>
  );
}
