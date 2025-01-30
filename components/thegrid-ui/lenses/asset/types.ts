import { Assets } from '@/lib/graphql/generated/graphql';
import { z } from 'zod';
import { SchemaDataType } from '../base/types';
import { generateZodSchema } from '../base/utils';
import { assetFields } from './schema';

// Generate schema from field definitions
export const assetSchema = z.object({
  assets: generateZodSchema(assetFields)
});

// Types
export type AssetFormData = z.infer<typeof assetSchema>;
export type AssetData = SchemaDataType<typeof assetFields>;
export type AssetMutationData = Partial<Assets>;
