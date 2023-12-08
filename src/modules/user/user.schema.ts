import { Utils } from '@/helpers/Utils';
import { ZodObject, ZodRawShape, z } from 'zod';
import { zodToJsonSchema as s } from 'zod-to-json-schema';

const login = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = Utils.schemaHelper({ body: login }, ['User']);
export type LoginInput = z.infer<typeof login>;

const createUser = z.object({
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  middlename: z.string().optional(),
  password: z.string(),
});
export const createUserSchema = Utils.schemaHelper({ body: createUser }, ['User']);
export type CreateUserInput = z.infer<typeof createUser>;
