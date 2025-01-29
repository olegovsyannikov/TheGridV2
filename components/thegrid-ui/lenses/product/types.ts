import {
  ProductFieldsFragmentFragment,
  Products
} from '@/lib/graphql/generated/graphql';
import { z } from 'zod';
import { SchemaDataType } from '../base/types';
import { generateZodSchema } from '../base/utils';
import { productFields } from './schema';

// Generate schema from field definitions
export const productSchema = z.object({
  products: generateZodSchema(productFields)
});

// Types
export type ProductFormData = z.infer<typeof productSchema>;
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
