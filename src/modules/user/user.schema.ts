import { Utils } from '@/helpers/Utils';
import { ZodObject, ZodRawShape, z } from 'zod';
import { zodToJsonSchema as s } from 'zod-to-json-schema';

const login = z.object({
  email: z.string().email(),
  password: z.string({ required_error: 'Password is required' }).min(6),
});

export const loginSchema = Utils.schemaHelper({ body: login }, ['User']);
export type LoginInput = z.infer<typeof login>;

const createUser = z.object({
  email: z.string({ required_error: 'Username is required' }).email(),
  firstname: z.string({ required_error: 'First name is required' }).min(1),
  lastname: z.string({ required_error: 'Last name is required' }).min(1),
  middlename: z.string().optional(),
  password: z.string({ required_error: 'Password is required' }).min(6),
});
export const createUserSchema = Utils.schemaHelper({ body: createUser }, ['User']);
export type CreateUserInput = z.infer<typeof createUser>;
