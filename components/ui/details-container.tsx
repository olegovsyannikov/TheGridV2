'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useEventListener } from '@/hooks/use-event-listener';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { ScrollArea } from './scroll-area';

export type DetailsContainerProps = PropsWithChildren<{
  title: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  footer?: React.ReactNode;
}>;

export function DetailsContainer({
  title,
  trigger,
  open: controlledOpen,
  onOpenChange,
  className,
  footer,
  children
}: DetailsContainerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  useEventListener('close-dialog', () => {
    setOpen(false);
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-3xl">
          <DialogHeader className="px-6 py-4">
            <div className="flex items-center justify-between">
              <DialogTitle>{title}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <DialogDescription className="sr-only">
            {title} form dialog
          </DialogDescription>
          <ScrollArea className="max-h-[calc(90vh-14rem)]">
            <div className={cn('p-6', className)}>
              {children}
            </div>
          </ScrollArea>
          {footer && (
            <div className="border-t px-6 py-4">
              {footer}
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger}
      <DrawerContent>
        <DrawerHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <DrawerTitle>{title}</DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <div className={cn('p-6', className)}>
            {children}
          </div>
        </ScrollArea>
        {footer && (
          <div className="border-t px-6 py-4">
            {footer}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

type DetailsContainerContextProps = {
  setOpen: (value: boolean) => void;
  open: boolean;
};

const DetailsContainerContext = createContext<DetailsContainerContextProps | null>(null);

export function useDetailsContainer() {
  const context = useContext(DetailsContainerContext);

  if (!context) {
    throw new Error(
      'useDetailsContainer must be used within a <DetailsContainer />'
    );
  }

  return context;
}
