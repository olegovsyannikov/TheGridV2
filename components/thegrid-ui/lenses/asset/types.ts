import {
  AssetFieldsFragmentFragment,
  Assets
} from '@/lib/graphql/generated/graphql';
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

// Props interfaces
export interface BaseAssetProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface CreateAssetFormProps extends BaseAssetProps {
  rootId?: string;
}

export interface EditAssetFormProps extends BaseAssetProps {
  asset?: AssetFieldsFragmentFragment;
}

export interface CreateAssetOverlayProps {
  rootId?: string;
  triggerNode?: React.ReactNode;
}

export interface EditAssetOverlayProps {
  asset?: AssetFieldsFragmentFragment;
  triggerNode?: React.ReactNode;
}

// Mutation types
export type AssetMutationData = Partial<Assets>;
