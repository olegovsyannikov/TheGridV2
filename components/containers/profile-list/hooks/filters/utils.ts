import { createParser } from 'nuqs';
import { z } from 'zod';

export const parseAsId = createParser({
  parse: z.string().parse,
  serialize: String
});

export const validateAndFormatOptions = (
  options:
    | Array<{
        label: string;
        value: string;
        description?: string;
        count?: number;
      }>
    | null
    | undefined
) => {
  if (!options) {
    return [];
  }

  return options;
};

export const mergeConditions = <T extends object>(conditions: T[]): T => {
  if (!conditions.length) {
    return {} as T;
  }

  if (conditions.length === 1) {
    return conditions[0];
  }

  return {
    _and: conditions
  } as T;
};
