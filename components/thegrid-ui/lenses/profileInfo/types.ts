import { ProfileInfos } from '@/lib/graphql/generated/graphql';
import { z } from 'zod';
import { SchemaDataType } from '../base/types';
import { generateZodSchema } from '../base/utils';
import { profileInfoFields } from './schema';

// Generate schema from field definitions
export const profileInfoSchema = z.object({
  profileInfos: generateZodSchema(profileInfoFields)
});

// Types
export type ProfileInfoFormData = z.infer<typeof profileInfoSchema>;
export type ProfileInfoData = SchemaDataType<typeof profileInfoFields>;
export type ProfileInfoMutationData = Partial<ProfileInfos>;
