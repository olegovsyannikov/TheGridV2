import { Products } from '@/lib/graphql/generated/graphql';
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
export type ProductMutationData = Partial<Products>;
