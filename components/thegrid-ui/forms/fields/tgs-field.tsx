'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { getTgsData, TgsFieldNames } from '@/lib/tgs';
import { SelectField } from './select-field';
import { Input } from '@/components/ui/input';

type TgsSFieldProps = {
  label: string;
  placeholder?: string;
  tgsField: TgsFieldNames;
  fieldName?: string;
};

export function TgsField({
  label,
  placeholder,
  tgsField,
  fieldName
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

  if (tgsData.isDataValid === true) {
    return (
      <>
        {tgsData.is_enum === 'true' && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper label={label} description={tgsData.description}>
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

        {tgsData.is_enum === 'false' && (
          <FormField
            name={tgsField ?? fieldName}
            render={({ field, fieldState }) => (
              <FieldWrapper label={label} description={tgsData.description}>
                <Input
                  placeholder={placeholder}
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
  description
}: {
  children: React.ReactNode;
  label: string;
  description: string;
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
      <FormDescription>{description}</FormDescription>
    </FormItem>
  );
};
