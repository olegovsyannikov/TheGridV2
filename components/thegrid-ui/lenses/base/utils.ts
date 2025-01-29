import { z } from 'zod';
import { SchemaDefinition } from './types';

export function generateZodSchema(schema: SchemaDefinition) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  for (const [key, field] of Object.entries(schema)) {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'text':
      case 'textarea': {
        let stringSchema = z.string();
        if (field.required) {
          stringSchema = stringSchema.min(1, `${field.label} is required`);
        }
        if (field.minLength) {
          stringSchema = stringSchema.min(
            field.minLength,
            `${field.label} must be at least ${field.minLength} characters`
          );
        }
        if (field.maxLength) {
          stringSchema = stringSchema.max(
            field.maxLength,
            `${field.label} must be at most ${field.maxLength} characters`
          );
        }
        fieldSchema = field.required ? stringSchema : stringSchema.optional();
        break;
      }
      case 'select':
        fieldSchema = field.required ? z.string() : z.string().optional();
        break;
      case 'date':
        fieldSchema = z.string().nullable().optional();
        break;
      case 'boolean':
        fieldSchema = field.required ? z.string() : z.string().optional();
        break;
      default:
        fieldSchema = z.string().optional();
    }

    schemaFields[key] = fieldSchema;
  }

  return z.object(schemaFields);
}

export function generateDefaultValues(schema: SchemaDefinition) {
  const defaults: Record<string, any> = {};

  for (const [key, field] of Object.entries(schema)) {
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'select':
        defaults[key] = '';
        break;
      case 'date':
        defaults[key] = null;
        break;
      case 'boolean':
        defaults[key] = field.defaultValue ? 'true' : 'false';
        break;
    }
  }

  return defaults;
}

export function mapEntityToFormData<T extends Record<string, any>>(
  entity: T | undefined | null,
  schema: SchemaDefinition
): Record<string, any> {
  const formData: Record<string, any> = {};

  for (const [key, field] of Object.entries(schema)) {
    if (!entity) {
      formData[key] = generateDefaultValues(schema)[key];
      continue;
    }

    switch (field.type) {
      case 'boolean':
        formData[key] = entity[key] ? 'true' : 'false';
        break;
      case 'select':
        formData[key] = entity[`${key}Id`] ?? entity[key]?.id ?? '';
        break;
      default:
        formData[key] = entity[key] ?? '';
    }
  }

  return formData;
}

export function mapFormDataToEntity<T extends Record<string, any>>(
  formData: Record<string, any>,
  schema: SchemaDefinition
): Partial<T> {
  const entityData: Record<string, any> = {};

  for (const [key, field] of Object.entries(schema)) {
    if (formData[key] === undefined || formData[key] === '') continue;

    switch (field.type) {
      case 'boolean':
        entityData[key] = formData[key] === 'true' ? 1 : 0;
        break;
      case 'select':
        entityData[`${key}Id`] = formData[key];
        break;
      default:
        entityData[key] = formData[key];
    }
  }

  return entityData as Partial<T>;
}
