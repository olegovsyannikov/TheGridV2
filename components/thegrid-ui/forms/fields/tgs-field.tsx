'use client';

import { DatePicker } from '@/components/ui/date-picker';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getTgsData, TgsFieldNames } from '@/lib/tgs';
import { SelectField } from './select-field';

type TgsSFieldProps = {
  label: string;
  placeholder?: string;
  tgsField: TgsFieldNames;
  fieldName?: string;
  isRequired?: boolean;
};

export function TgsField({
  label,
  placeholder,
  tgsField,
  fieldName,
  isRequired = false
}: TgsSFieldProps) {
  const tgsData = getTgsData(tgsField);

  if (tgsData.isDataValid === false) {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormMessage>
          There was an error loading the form field for {tgsField}
        </FormMessage>
        <pre>
          <FormMessage>{tgsData.errorMessage}</FormMessage>
        </pre>
      </FormItem>
    );
  }

  const isEnum = tgsData.is_enum === 'true';
  const isTextArea = tgsData.parameter_id.toLowerCase().includes('description');
  const isDate = tgsData.parameter_id.toLowerCase().includes('date');
  const isToggle = tgsData.parameter_id.startsWith('is');
  const isText = !isEnum && !isDate && !isTextArea && !isToggle;

  if (tgsData.isDataValid === true) {
    return (
      <>
        {isEnum && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <SelectField
                  {...field}
                  defaultValue={field.value}
                  placeholder={placeholder}
                  onChange={field.onChange}
                  value={field.value}
                  error={fieldState.error?.message}
                  options={tgsData.possible_values.map(value => ({
                    id: value.id,
                    label: value.name,
                    value: value.id
                  }))}
                />
              </FieldWrapper>
            )}
          />
        )}

        {isText && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <Input
                  placeholder={placeholder}
                  error={fieldState.error?.message}
                  {...field}
                />
              </FieldWrapper>
            )}
          />
        )}

        {isTextArea && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <Textarea
                  placeholder={placeholder}
                  error={fieldState.error?.message}
                  {...field}
                />
              </FieldWrapper>
            )}
          />
        )}

        {isDate && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper
                label={label}
                description={tgsData.description}
                isRequired={isRequired}
              >
                <DatePicker
                  error={fieldState.error?.message}
                  {...field}
                />
              </FieldWrapper>
            )}
          />
        )}


      </>
    );
  }

  return null;
}
const FieldWrapper = ({
  children,
  label,
  description,
  isRequired
}: {
  children: React.ReactNode;
  label: string;
  description: string;
  isRequired?: boolean;
}) => {
  return (
    <FormItem>
      <FormLabel>
        {label}
        {isRequired && <span className="ml-1 text-destructive">*</span>}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
      <FormDescription>{description}</FormDescription>
    </FormItem>
  );
};
