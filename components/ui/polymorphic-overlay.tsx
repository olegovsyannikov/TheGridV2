import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog';
import { ScrollArea } from './scroll-area';

export type PolymorphicOverlayProps = PropsWithChildren<{
  title: string;
  triggerNode?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  footer?: React.ReactNode;
}>;

export function PolymorphicOverlay({
  title,
  triggerNode,
  className,
  children,
  open,
  onOpenChange
}: PolymorphicOverlayProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{triggerNode}</DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-3xl">
          <DialogHeader className="px-6 py-4">
            <div className="flex items-center justify-between">
              <DialogTitle>{title}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <DialogDescription className="sr-only">
            {title} form dialog
          </DialogDescription>
          <ScrollArea className="max-h-[calc(90vh-14rem)]">
            <div className={cn('p-6', className)}>{children}</div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {triggerNode}
      <DrawerContent>
        <DrawerHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <DrawerTitle>{title}</DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <div className={cn('p-6', className)}>{children}</div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
