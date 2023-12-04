import { z } from 'zod';
import { zodToJsonSchema as s } from 'zod-to-json-schema';

const login = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof login>;
export const loginSchema = {
  body: s(login),
  queryString: s(z.object({})),
  params: s(z.object({})),
  headers: s(z.object({})),
};
