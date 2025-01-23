import { UseFormProps, useForm, FormState } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import {
  useState,
  type HTMLAttributes,
  ReactNode,
  PropsWithChildren,
  useEffect
} from 'react';

export type ControlledFormProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    onSubmit: (data: any) => Promise<void>;
    onFormStateChange?: (form: FormState<{ [x: string]: any }>) => void;
    formDefinition: UseFormProps;
    renderFooter: (props: {
      isLoading: boolean;
      isDirty: boolean;
    }) => ReactNode;
  }>;

export function ControlledForm({
  className,
  onSubmit,
  onChange,
  onFormStateChange,
  formDefinition,
  children,
  renderFooter,
  ...props
}: ControlledFormProps) {
  const form = useForm(formDefinition);
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onFormStateChange?.(form.formState);
  }, [form.formState, onFormStateChange]);

  const _onSubmit = async (fields: any) => {
    setIsLoading(true);
    try {
      await onSubmit(fields);
    } catch (error) {
      const typedError = error as Error;
      setErrorMessage(typedError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(_onSubmit)}
          className="flex flex-col space-y-6"
        >
          {children}
          <div className="flex flex-col space-y-2">
            {renderFooter({
              isLoading: isLoading || form.formState.isSubmitting,
              isDirty: form.formState.isDirty
            })}
            {errorMessage && (
              <p className="text-center text-sm font-medium text-destructive">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
