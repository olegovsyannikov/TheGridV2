import {
  ProductFieldsFragmentFragment,
  Products
} from '@/lib/graphql/generated/graphql';
import { z } from 'zod';
import { generateZodSchema, SchemaDefinition } from '../base/types';
import { productFields } from './schema';

// Generate schema from field definitions
export const productSchema = z.object({
  products: generateZodSchema(productFields)
});

// Types
export type ProductFormData = z.infer<typeof productSchema>;

// Generate type from schema definition
type SchemaDataType<T extends SchemaDefinition> = {
  [K in keyof T]: T[K]['type'] extends 'boolean'
    ? string // 'true' | 'false' for form values
    : T[K]['type'] extends 'date'
      ? string | null
      : T[K]['required'] extends true
        ? string
        : string | undefined;
};

export type ProductData = SchemaDataType<typeof productFields>;

// Props interfaces
export interface BaseProductProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface CreateProductFormProps extends BaseProductProps {
  rootId?: string;
}

export interface EditProductFormProps extends BaseProductProps {
  product?: ProductFieldsFragmentFragment;
}

export interface CreateProductOverlayProps {
  rootId?: string;
  triggerNode?: React.ReactNode;
}

export interface EditProductOverlayProps {
  product?: ProductFieldsFragmentFragment;
  triggerNode?: React.ReactNode;
}

// Mutation types
export type ProductMutationData = Partial<Products>;
