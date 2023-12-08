import { ZodObject, ZodRawShape } from 'zod';

export type SchemaHelper = {
  body?: ZodObject<ZodRawShape, any, any>;
  queryString?: ZodObject<ZodRawShape, any, any>;
  params?: ZodObject<ZodRawShape, any, any>;
  headers?: ZodObject<ZodRawShape, any, any>;
};
