import { z } from 'zod';
import { Utils } from '@/factory/Utils';

const createUser = z.object({
  username: z.string({ required_error: 'Username is required' }).email(),
  firstname: z.string({ required_error: 'First name is required' }).min(1),
  lastname: z.string({ required_error: 'Last name is required' }).min(1),
  middlename: z.string().optional(),
  password: z.string({ required_error: 'Password is required' }).min(6),
});

export const createUserSchema = Utils.schemaHelper({ body: createUser }, ['User']);
export type CreateUserInput = z.infer<typeof createUser>;

export const getallUserSchema = Utils.schemaHelper({}, ['User']);
