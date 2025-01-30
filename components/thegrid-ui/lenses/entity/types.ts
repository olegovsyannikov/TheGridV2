import { Entities } from '@/lib/graphql/generated/graphql';
import { z } from 'zod';
import { SchemaDataType } from '../base/types';
import { generateZodSchema } from '../base/utils';
import { entityFields } from './schema';

// Generate schema from field definitions
export const entitySchema = z.object({
  entities: generateZodSchema(entityFields)
});

// Types
export type EntityFormData = z.infer<typeof entitySchema>;
export type EntityData = SchemaDataType<typeof entityFields>;
export type EntityMutationData = Partial<Entities>;
