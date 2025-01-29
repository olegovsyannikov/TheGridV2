'use client';

import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';
import { ApiError } from '@/lib/rest-api/client';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface LensFormProps<TFormData extends FieldValues> {
  form: UseFormReturn<TFormData>;
  onSubmit: (data: TFormData) => void;
  onCancel?: () => void;
  isPending?: boolean;
  error?: ApiError;
  submitLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
}

export function LensForm<TFormData extends FieldValues>({
  form,
  onSubmit,
  onCancel,
  isPending,
  error,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  children
}: LensFormProps<TFormData>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => onSubmit(data))}
        className="flex flex-col space-y-6"
      >
        {children}
        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : submitLabel}
          </Button>
          {onCancel && (
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
          )}
        </div>
        {error && <FormMessage>{error.userMessage}</FormMessage>}
      </form>
    </Form>
  );
}
