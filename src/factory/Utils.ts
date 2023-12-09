import { z } from 'zod';
import { zodToJsonSchema as s } from 'zod-to-json-schema';
import { FastifySchema } from 'fastify';
import { SchemaHelper } from '@/types/SchemaHelper';

export const Utils = {
  /**
   * Converts Zod schemas to Fastify-compatible schemas and adds Swagger tags for grouping.
   *
   * @param obj An object where keys are endpoint names and values are Zod schemas.
   * @param tags An array of tags for Swagger documentation grouping. Defaults to ['default'].
   * @returns A FastifySchema object with the converted schemas and tags.
   */
  schemaHelper: (obj: SchemaHelper, tags: string[] = ['default']): FastifySchema => {
    const fields = Object.entries(obj).reduce(
      (acc, [key, value]) => {
        try {
          acc[key] = Object.keys(value.shape).length ? s(value) : s(z.object({}));
        } catch (error) {
          console.error(`Error processing schema for key ${key}:`, error);
          acc[key] = s(z.object({})); // Fallback to an empty schema in case of error
        }
        return acc;
      },
      {} as { [key: string]: ReturnType<typeof s> }
    );

    return {
      ...{ tags },
      ...fields,
    } as FastifySchema;
  },
};
