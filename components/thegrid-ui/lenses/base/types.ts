import { TgsFieldNames } from '@/lib/tgs';

export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'boolean';

export interface BaseFieldDefinition {
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  tgsField: TgsFieldNames;
}

export interface TextField extends BaseFieldDefinition {
  type: 'text';
  minLength?: number;
  maxLength?: number;
}

export interface TextAreaField extends BaseFieldDefinition {
  type: 'textarea';
  minLength?: number;
  maxLength?: number;
  rows?: number;
}

export interface SelectField extends BaseFieldDefinition {
  type: 'select';
  options?: { id: string; name: string }[];
}

export interface DateField extends BaseFieldDefinition {
  type: 'date';
  minDate?: Date;
  maxDate?: Date;
}

export interface BooleanField extends BaseFieldDefinition {
  type: 'boolean';
  defaultValue?: boolean;
}

export type FieldDefinition =
  | TextField
  | TextAreaField
  | SelectField
  | DateField
  | BooleanField;

export type SchemaDefinition = Record<string, FieldDefinition>;

export type SchemaDataType<T extends SchemaDefinition> = {
  [K in keyof T]: T[K]['type'] extends 'boolean'
    ? string
    : T[K]['type'] extends 'date'
      ? string | null
      : T[K]['required'] extends true
        ? string
        : string | undefined;
};
